'use client';

import React from 'react';
import { Editor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import { CellSelection } from '@tiptap/pm/tables';

interface Props {
  editor: Editor;
}

const Btn = ({
  onClick,
  disabled = false,
  danger = false,
  active = false,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  active?: boolean;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onMouseDown={(e) => {
      e.preventDefault();
      if (!disabled) onClick();
    }}
    disabled={disabled}
    className={[
      'flex items-center gap-1 rounded px-2 py-1 text-xs font-medium whitespace-nowrap transition-colors',
      danger
        ? 'text-red-500 hover:bg-red-50 disabled:opacity-30'
        : active
          ? 'bg-gray-100 text-gray-900'
          : 'text-gray-700 hover:bg-gray-100 disabled:opacity-30',
      disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    ].join(' ')}
  >
    {children}
  </button>
);

const Sep = () => <div className="mx-0.5 h-4 w-px shrink-0 bg-gray-200" />;

// 선택된 셀들이 속한 행이 모두 헤더인지 확인
const isSelectionInHeaderRow = (editor: Editor): boolean => {
  const { selection } = editor.state;
  if (!(selection instanceof CellSelection)) return false;

  const rows = new Set<number>();
  selection.forEachCell((_, pos) => {
    const $pos = editor.state.doc.resolve(pos);
    // tableRow의 pos
    rows.add($pos.before($pos.depth - 1));
  });

  let isHeader = true;
  selection.forEachCell((node) => {
    if (node.type.name !== 'tableHeader') isHeader = false;
  });
  return isHeader;
};

export const TableBubbleMenu = ({ editor }: Props) => {
  const canMerge = editor.can().mergeCells();
  const canSplit = editor.can().splitCell();
  const isHeader = isSelectionInHeaderRow(editor);

  const handleToggleHeader = () => {
    editor.chain().focus().toggleHeaderRow().run();
  };

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={({ editor }) => {
        const { selection } = editor.state;
        return selection instanceof CellSelection;
      }}
    >
      <div
        className="flex items-center rounded-lg border border-gray-200 bg-white px-1 py-1 shadow-lg"
        style={{ zIndex: 50 }}
      >
        {/* 헤더 토글 */}
        <Btn onClick={handleToggleHeader} active={isHeader}>
          <IcHeader /> {isHeader ? '헤더 해제' : '헤더 설정'}
        </Btn>
        <Sep />

        {/* 셀 병합 / 분리 */}
        <Btn onClick={() => editor.chain().focus().mergeCells().run()} disabled={!canMerge}>
          <IcMerge /> 병합
        </Btn>
        <Btn onClick={() => editor.chain().focus().splitCell().run()} disabled={!canSplit}>
          <IcSplit /> 분리
        </Btn>
        <Sep />

        {/* 행 조작 */}
        <Btn onClick={() => editor.chain().focus().addRowBefore().run()}>
          <IcRowBefore /> 위에 행
        </Btn>
        <Btn onClick={() => editor.chain().focus().addRowAfter().run()}>
          <IcRowAfter /> 아래 행
        </Btn>
        <Btn onClick={() => editor.chain().focus().deleteRow().run()} danger>
          <IcDel /> 행 삭제
        </Btn>
        <Sep />

        {/* 열 조작 */}
        <Btn onClick={() => editor.chain().focus().addColumnBefore().run()}>
          <IcColBefore /> 왼쪽 열
        </Btn>
        <Btn onClick={() => editor.chain().focus().addColumnAfter().run()}>
          <IcColAfter /> 오른쪽 열
        </Btn>
        <Btn onClick={() => editor.chain().focus().deleteColumn().run()} danger>
          <IcDel /> 열 삭제
        </Btn>
        <Sep />

        {/* 표 삭제 */}
        <Btn onClick={() => editor.chain().focus().deleteTable().run()} danger>
          <IcTable /> 표 삭제
        </Btn>
      </div>
    </BubbleMenu>
  );
};

// 아이콘

const Ic = ({ d, extra }: { d?: string; extra?: React.ReactNode }) => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
  >
    {d && <path d={d} />}
    {extra}
  </svg>
);

const IcHeader = () => (
  <Ic
    extra={
      <>
        <rect
          x="1"
          y="1"
          width="14"
          height="5"
          rx="0.5"
          fill="currentColor"
          strokeWidth="0"
          opacity="0.3"
        />
        <rect x="1" y="1" width="14" height="14" rx="0.5" />
        <line x1="1" y1="6" x2="15" y2="6" />
      </>
    }
  />
);
const IcMerge = () => (
  <Ic
    extra={
      <>
        <rect x="1" y="1" width="6" height="6" rx="0.5" />
        <rect x="9" y="1" width="6" height="6" rx="0.5" />
        <rect x="1" y="9" width="6" height="6" rx="0.5" />
        <rect x="9" y="9" width="6" height="6" rx="0.5" />
        <path d="M7 4h2M7 12h2M4 7v2M12 7v2" strokeLinecap="round" />
      </>
    }
  />
);
const IcSplit = () => (
  <Ic
    extra={
      <>
        <rect x="1" y="1" width="14" height="14" rx="0.5" />
        <line x1="8" y1="1" x2="8" y2="15" />
        <line x1="1" y1="8" x2="15" y2="8" />
      </>
    }
  />
);
const IcRowBefore = () => (
  <Ic
    extra={
      <>
        <rect x="1" y="7" width="14" height="8" rx="0.5" />
        <path d="M5 3.5h6M8 1v5" strokeLinecap="round" />
      </>
    }
  />
);
const IcRowAfter = () => (
  <Ic
    extra={
      <>
        <rect x="1" y="1" width="14" height="8" rx="0.5" />
        <path d="M5 12.5h6M8 10v5" strokeLinecap="round" />
      </>
    }
  />
);
const IcColBefore = () => (
  <Ic
    extra={
      <>
        <rect x="7" y="1" width="8" height="14" rx="0.5" />
        <path d="M3.5 5v6M1 8h5" strokeLinecap="round" />
      </>
    }
  />
);
const IcColAfter = () => (
  <Ic
    extra={
      <>
        <rect x="1" y="1" width="8" height="14" rx="0.5" />
        <path d="M12.5 5v6M10 8h5" strokeLinecap="round" />
      </>
    }
  />
);
const IcDel = () => <Ic d="M4 4l8 8M12 4l-8 8" />;
const IcTable = () => (
  <Ic
    extra={
      <>
        <rect x="1" y="1" width="14" height="14" rx="1" />
        <line x1="1" y1="5.5" x2="15" y2="5.5" />
        <line x1="5.5" y1="1" x2="5.5" y2="15" />
        <path d="M9 9l4 4M13 9l-4 4" />
      </>
    }
  />
);

'use client';

import React, { useEffect, useRef } from 'react';
import { Editor } from '@tiptap/react';

export type HandleType = 'row' | 'col';

export interface HandleMenuState {
  type: HandleType;
  index: number;
  x: number;
  y: number;
}

interface Props {
  editor: Editor;
  menu: HandleMenuState | null;
  onClose: () => void;
}

const Item = ({
  onClick,
  danger = false,
  children,
}: {
  onClick: () => void;
  danger?: boolean;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onMouseDown={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={[
      'flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs whitespace-nowrap transition-colors',
      danger ? 'text-red-500 hover:bg-red-50' : 'text-gray-700 hover:bg-gray-100',
    ].join(' ')}
  >
    {children}
  </button>
);

export const TableHandleMenu = ({ editor, menu, onClose }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menu) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menu, onClose]);

  if (!menu) return null;

  const { type, index, x, y } = menu;
  const isRow = type === 'row';
  const isHeader = isRow && index === 0;

  const run = (fn: () => void) => {
    fn();
    onClose();
    editor.view.focus();
  };

  return (
    <div
      ref={ref}
      style={{ position: 'fixed', left: x, top: y, zIndex: 100 }}
      className="min-w-[148px] rounded-lg border border-gray-200 bg-white py-1 shadow-xl"
    >
      {isRow ? (
        <>
          {!isHeader && (
            <>
              <Item onClick={() => run(() => editor.chain().focus().addRowBefore().run())}>
                위에 행 추가
              </Item>
            </>
          )}
          <Item onClick={() => run(() => editor.chain().focus().addRowAfter().run())}>
            아래에 행 추가
          </Item>
          {!isHeader && (
            <>
              <div className="my-1 h-px bg-gray-100" />
              <Item onClick={() => run(() => editor.chain().focus().deleteRow().run())} danger>
                행 삭제
              </Item>
            </>
          )}
          <div className="my-1 h-px bg-gray-100" />
          <Item onClick={() => run(() => editor.chain().focus().deleteTable().run())} danger>
            표 삭제
          </Item>
        </>
      ) : (
        <>
          <Item onClick={() => run(() => editor.chain().focus().addColumnBefore().run())}>
            왼쪽에 열 추가
          </Item>
          <Item onClick={() => run(() => editor.chain().focus().addColumnAfter().run())}>
            오른쪽에 열 추가
          </Item>
          <div className="my-1 h-px bg-gray-100" />
          <Item onClick={() => run(() => editor.chain().focus().deleteColumn().run())} danger>
            열 삭제
          </Item>
          <div className="my-1 h-px bg-gray-100" />
          <Item onClick={() => run(() => editor.chain().focus().deleteTable().run())} danger>
            표 삭제
          </Item>
        </>
      )}
      <div className="my-1 h-px bg-gray-100" />
      <Item onClick={onClose}>취소</Item>
    </div>
  );
};

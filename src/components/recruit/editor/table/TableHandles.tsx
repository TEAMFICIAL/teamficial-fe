'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Editor } from '@tiptap/react';
import { HandleMenuState, TableHandleMenu } from './TableHandleMenu';
import { moveTableRow, moveTableCol, getTableInfo } from './tableUtils';

interface Props {
  editor: Editor;
}

interface HandleInfo {
  type: 'row' | 'col';
  index: number;
  rect: DOMRect; // 핸들 버튼 위치용
  isHeader: boolean;
}

// 드래그 상태

interface DragState {
  type: 'row' | 'col';
  fromIndex: number;
  toIndex: number; // hover 중인 대상 인덱스
}

export const TableHandles = ({ editor }: Props) => {
  const [handles, setHandles] = useState<HandleInfo[]>([]);
  const [hoveredHandle, setHoveredHandle] = useState<number | null>(null); // handles 배열 idx
  const [menu, setMenu] = useState<HandleMenuState | null>(null);
  const [drag, setDrag] = useState<DragState | null>(null);

  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDragging = useRef(false);

  // 테이블 DOM에서 행/열 핸들 위치 계산

  const computeHandles = useCallback(() => {
    const dom = editor.view.dom as HTMLElement;
    const tables = dom.querySelectorAll('table');
    if (!tables.length) {
      setHandles([]);
      return;
    }

    // 첫 번째 테이블만 처리
    const table = tables[0] as HTMLTableElement;
    const tableRect = table.getBoundingClientRect();
    const newHandles: HandleInfo[] = [];

    // 행 핸들
    const rows = table.querySelectorAll('tr');
    rows.forEach((tr, i) => {
      const rect = tr.getBoundingClientRect();
      newHandles.push({
        type: 'row',
        index: i,
        rect,
        isHeader: i === 0,
      });
    });

    // 열 핸들
    if (rows.length > 0) {
      const firstRow = rows[0];
      const cells = firstRow.querySelectorAll('th, td');
      cells.forEach((cell, i) => {
        const rect = cell.getBoundingClientRect();
        newHandles.push({
          type: 'col',
          index: i,
          rect,
          isHeader: false,
        });
      });
    }

    setHandles(newHandles);
  }, [editor]);

  // 에디터 업데이트 / 스크롤 시 핸들 재계산
  useEffect(() => {
    const update = () => computeHandles();
    editor.on('update', update);
    editor.on('selectionUpdate', update);
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      editor.off('update', update);
      editor.off('selectionUpdate', update);
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [editor, computeHandles]);

  // 테이블 없으면 핸들 숨김
  useEffect(() => {
    if (!editor.isActive('table')) setHandles([]);
    else computeHandles();
  }, [editor.isActive('table'), computeHandles]);

  // 드래그 중 하이라이트

  useEffect(() => {
    if (!drag) {
      // 모든 하이라이트 제거
      clearHighlights(editor);
      return;
    }
    applyDragHighlight(editor, drag);
  }, [drag, editor]);

  // 마우스 롱프레스 → 드래그, 클릭 → 메뉴

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, handle: HandleInfo) => {
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();

      isDragging.current = false;

      // 해당 행/열에 커서 이동 (메뉴 명령 기준 위치 설정)
      focusCell(editor, handle.type, handle.index);

      // 롱프레스 타이머 (300ms)
      longPressTimer.current = setTimeout(() => {
        isDragging.current = true;
        setDrag({ type: handle.type, fromIndex: handle.index, toIndex: handle.index });
      }, 300);
    },
    [editor],
  );

  const handleMouseUp = useCallback(
    (e: React.MouseEvent, handle: HandleInfo) => {
      e.preventDefault();
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }

      if (isDragging.current && drag) {
        // 드래그 완료 → 이동 실행
        if (drag.fromIndex !== drag.toIndex) {
          if (drag.type === 'row') moveTableRow(editor, drag.fromIndex, drag.toIndex);
          else moveTableCol(editor, drag.fromIndex, drag.toIndex);
        }
        setDrag(null);
        isDragging.current = false;
        return;
      }

      // 클릭 → 메뉴 열기
      const btnRect = e.currentTarget.getBoundingClientRect();
      setMenu({
        type: handle.type,
        index: handle.index,
        x: handle.type === 'row' ? btnRect.right + 4 : btnRect.left,
        y: handle.type === 'row' ? btnRect.top : btnRect.bottom + 4,
      });
    },
    [editor, drag],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent, handle: HandleInfo) => {
      if (!isDragging.current || !drag) return;
      if (handle.type !== drag.type) return;
      // 헤더 행(0)으로 이동 방지
      if (drag.type === 'row' && handle.index === 0) return;
      if (drag.toIndex !== handle.index) {
        setDrag((prev) => (prev ? { ...prev, toIndex: handle.index } : null));
      }
    },
    [drag],
  );

  // 전역 mouseup (드래그 중 핸들 밖에서 손 뗄 때)
  useEffect(() => {
    const onUp = () => {
      if (isDragging.current && drag) {
        if (drag.fromIndex !== drag.toIndex) {
          if (drag.type === 'row') moveTableRow(editor, drag.fromIndex, drag.toIndex);
          else moveTableCol(editor, drag.fromIndex, drag.toIndex);
        }
      }
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
      isDragging.current = false;
      setDrag(null);
    };
    window.addEventListener('mouseup', onUp);
    return () => window.removeEventListener('mouseup', onUp);
  }, [editor, drag]);

  if (!handles.length) return null;

  const rowHandles = handles.filter((h) => h.type === 'row');
  const colHandles = handles.filter((h) => h.type === 'col');

  return (
    <>
      {/* 행 핸들 */}
      {rowHandles.map((h) => {
        const isDragTarget =
          drag?.type === 'row' && drag.toIndex === h.index && drag.fromIndex !== h.index;
        const isDragSource = drag?.type === 'row' && drag.fromIndex === h.index;
        return (
          <div
            key={`row-${h.index}`}
            style={{
              position: 'fixed',
              left: h.rect.left - 20,
              top: h.rect.top,
              height: h.rect.height,
              width: 16,
              zIndex: 40,
            }}
            className="group flex items-center justify-center"
            onMouseDown={(e) => handleMouseDown(e, h)}
            onMouseUp={(e) => handleMouseUp(e, h)}
            onMouseMove={(e) => handleMouseMove(e, h)}
            onMouseEnter={() => setHoveredHandle(handles.indexOf(h))}
            onMouseLeave={() => setHoveredHandle(null)}
          >
            <div
              className={[
                'flex h-5 w-4 cursor-grab items-center justify-center rounded transition-all',
                isDragTarget ? 'bg-primary-100 opacity-100' : '',
                isDragSource ? 'opacity-40' : '',
                !isDragTarget && !isDragSource
                  ? 'opacity-0 group-hover:opacity-100 hover:bg-gray-100'
                  : '',
              ].join(' ')}
            >
              <DragIcon />
            </div>
          </div>
        );
      })}

      {/* 열 핸들 */}
      {colHandles.map((h) => {
        const isDragTarget =
          drag?.type === 'col' && drag.toIndex === h.index && drag.fromIndex !== h.index;
        const isDragSource = drag?.type === 'col' && drag.fromIndex === h.index;
        return (
          <div
            key={`col-${h.index}`}
            style={{
              position: 'fixed',
              left: h.rect.left,
              top: h.rect.top - 20,
              width: h.rect.width,
              height: 16,
              zIndex: 40,
            }}
            className="group flex items-center justify-center"
            onMouseDown={(e) => handleMouseDown(e, h)}
            onMouseUp={(e) => handleMouseUp(e, h)}
            onMouseMove={(e) => handleMouseMove(e, h)}
            onMouseEnter={() => setHoveredHandle(handles.indexOf(h))}
            onMouseLeave={() => setHoveredHandle(null)}
          >
            <div
              className={[
                'flex h-4 w-5 cursor-grab items-center justify-center rounded transition-all',
                isDragTarget ? 'bg-primary-100 opacity-100' : '',
                isDragSource ? 'opacity-40' : '',
                !isDragTarget && !isDragSource
                  ? 'opacity-0 group-hover:opacity-100 hover:bg-gray-100'
                  : '',
              ].join(' ')}
            >
              <DragIcon rotate />
            </div>
          </div>
        );
      })}

      {/* 드래그 시 행/열 하이라이트 오버레이 */}
      {drag && <DragHighlightOverlay editor={editor} drag={drag} handles={handles} />}

      {/* 클릭 드롭다운 메뉴 */}
      <TableHandleMenu editor={editor} menu={menu} onClose={() => setMenu(null)} />
    </>
  );
};

// 드래그 하이라이트 오버레이

const DragHighlightOverlay = ({
  editor,
  drag,
  handles,
}: {
  editor: Editor;
  drag: DragState;
  handles: HandleInfo[];
}) => {
  const targetHandle = handles.find((h) => h.type === drag.type && h.index === drag.toIndex);
  if (!targetHandle || drag.fromIndex === drag.toIndex) return null;

  const isRow = drag.type === 'row';

  // 테이블 전체 rect 구하기
  const dom = editor.view.dom as HTMLElement;
  const table = dom.querySelector('table');
  if (!table) return null;
  const tableRect = table.getBoundingClientRect();

  const style: React.CSSProperties = isRow
    ? {
        position: 'fixed',
        left: tableRect.left,
        top: targetHandle.rect.top,
        width: tableRect.width,
        height: 2,
        zIndex: 39,
      }
    : {
        position: 'fixed',
        left: targetHandle.rect.left,
        top: tableRect.top,
        width: 2,
        height: tableRect.height,
        zIndex: 39,
      };

  return <div style={style} className="bg-primary-500 pointer-events-none opacity-60" />;
};

// ProseMirror 셀에 커서 이동

function focusCell(editor: Editor, type: 'row' | 'col', index: number) {
  const { state, view } = editor;
  const { doc } = state;
  let targetPos: number | null = null;

  doc.descendants((node, pos) => {
    if (targetPos !== null) return false;
    if (node.type.name === 'table') {
      let rowIdx = 0;
      node.forEach((rowNode, rowOffset) => {
        if (targetPos !== null) return;
        if (type === 'row' && rowIdx === index) {
          // 해당 행 첫 번째 셀
          targetPos = pos + rowOffset + 2;
        }
        if (type === 'col') {
          let colIdx = 0;
          rowNode.forEach((cellNode, cellOffset) => {
            if (targetPos !== null) return;
            if (rowIdx === 0 && colIdx === index) {
              targetPos = pos + rowOffset + cellOffset + 2;
            }
            colIdx++;
          });
        }
        rowIdx++;
      });
      return false;
    }
  });

  if (targetPos !== null) {
    const tr = state.tr.setSelection(
      state.selection.constructor.prototype.constructor.near(state.doc.resolve(targetPos)),
    );
    view.dispatch(tr);
  }
}

// 하이라이트 유틸

function clearHighlights(editor: Editor) {
  const dom = editor.view.dom as HTMLElement;
  dom.querySelectorAll('.table-drag-highlight').forEach((el) => {
    el.classList.remove('table-drag-highlight');
  });
}

function applyDragHighlight(editor: Editor, drag: DragState) {
  clearHighlights(editor);
  const dom = editor.view.dom as HTMLElement;
  const table = dom.querySelector('table');
  if (!table) return;

  if (drag.type === 'row') {
    const rows = table.querySelectorAll('tr');
    rows[drag.fromIndex]?.classList.add('table-drag-highlight');
  } else {
    const rows = table.querySelectorAll('tr');
    rows.forEach((row) => {
      const cells = row.querySelectorAll('th, td');
      cells[drag.fromIndex]?.classList.add('table-drag-highlight');
    });
  }
}

// 드래그 핸들 아이콘
const DragIcon = ({ rotate = false }: { rotate?: boolean }) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="currentColor"
    style={rotate ? { transform: 'rotate(90deg)' } : undefined}
    className="text-gray-400"
  >
    <circle cx="3" cy="2" r="1" />
    <circle cx="7" cy="2" r="1" />
    <circle cx="3" cy="5" r="1" />
    <circle cx="7" cy="5" r="1" />
    <circle cx="3" cy="8" r="1" />
    <circle cx="7" cy="8" r="1" />
  </svg>
);

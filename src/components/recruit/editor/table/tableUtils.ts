import { Editor } from '@tiptap/react';
import { Node as PmNode } from '@tiptap/pm/model';

export interface TableInfo {
  tableStart: number;
  tableNode: PmNode;
  rows: number;
  cols: number;
}

export function getTableInfo(editor: Editor): TableInfo | null {
  const { $from } = editor.state.selection;
  for (let depth = $from.depth; depth > 0; depth--) {
    const node = $from.node(depth);
    if (node.type.name === 'table') {
      return {
        tableStart: $from.start(depth),
        tableNode: node,
        rows: node.childCount,
        cols: node.childCount > 0 ? node.child(0).childCount : 0,
      };
    }
  }
  return null;
}

/** 행 이동 (헤더 보호) */
export function moveTableRow(editor: Editor, fromIndex: number, toIndex: number): boolean {
  const info = getTableInfo(editor);
  if (!info) return false;
  const { tableStart, tableNode, rows } = info;
  if (fromIndex === toIndex || fromIndex < 1 || toIndex < 1 || fromIndex >= rows || toIndex >= rows)
    return false;

  const rowNodes: PmNode[] = [];
  tableNode.forEach((row) => {
    rowNodes.push(row);
  });
  const reordered = [...rowNodes];
  const [removed] = reordered.splice(fromIndex, 1);
  reordered.splice(toIndex, 0, removed);

  const newTable = tableNode.type.create(tableNode.attrs, reordered, tableNode.marks);
  const tr = editor.state.tr;
  tr.replaceWith(tableStart - 1, tableStart - 1 + tableNode.nodeSize, newTable);
  editor.view.dispatch(tr);
  return true;
}

/** 열 이동  */
export function moveTableCol(editor: Editor, fromCol: number, toCol: number): boolean {
  const info = getTableInfo(editor);
  if (!info) return false;
  const { tableStart, tableNode, cols } = info;
  if (fromCol === toCol || fromCol < 0 || toCol < 0 || fromCol >= cols || toCol >= cols)
    return false;

  const newRows: PmNode[] = [];
  tableNode.forEach((rowNode) => {
    const cells: PmNode[] = [];
    rowNode.forEach((cell) => {
      cells.push(cell);
    });
    const reordered = [...cells];
    const [removed] = reordered.splice(fromCol, 1);
    reordered.splice(toCol, 0, removed);
    newRows.push(rowNode.type.create(rowNode.attrs, reordered, rowNode.marks));
  });

  const newTable = tableNode.type.create(tableNode.attrs, newRows, tableNode.marks);
  const tr = editor.state.tr;
  tr.replaceWith(tableStart - 1, tableStart - 1 + tableNode.nodeSize, newTable);
  editor.view.dispatch(tr);
  return true;
}

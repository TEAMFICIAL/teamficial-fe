'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import { useEffect, useState } from 'react';
import Toolbar from './Toolbar';
import { handleLink } from './linkUtils';
import { getEditorExtensions } from './editorExtensions';

type EditorProps = {
  editorContent: string;
  onChange: (content: string) => void;
};

const TextContent = ({ editorContent, onChange }: EditorProps) => {
  const [, forceUpdate] = useState(0);

  const editor = useEditor({
    extensions: getEditorExtensions(),
    editorProps: {
      attributes: {
        class:
          'ProseMirror appearance-none min-h-45 w-full bg-white body-4 text-gray-700 focus:outline-none',
      },
    },
    immediatelyRender: false,
    content: editorContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  useEffect(() => {
    if (!editor) return;
    const update = () => forceUpdate((v) => v + 1);
    editor.on('selectionUpdate', update);
    editor.on('transaction', update);
    editor.on('update', update);
    return () => {
      editor.off('selectionUpdate', update);
      editor.off('transaction', update);
      editor.off('update', update);
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-col rounded-2xl border-1 border-gray-300 px-8 pt-4 pb-9">
      <Toolbar editor={editor} onLinkButtonClick={() => handleLink(editor)} />
      <EditorContent editor={editor} className="mt-7" />
    </div>
  );
};

export default TextContent;

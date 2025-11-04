'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { getEditorExtensions } from './editorExtensions';
import Toolbar from './Toolbar';
import { handleLink } from './linkUtils';
import { Control, useController } from 'react-hook-form';
import { RecruitFormType } from '@/libs/schemas/projectSchema';

type Props = {
  control: Control<RecruitFormType>;
  name?: 'content';
};

const TextContent = ({ control, name = 'content' }: Props) => {
  const { field } = useController({ name, control });
  const value = field.value ?? '';
  const onChange = field.onChange as (html: string) => void;

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const [, forceUpdate] = useState(0);

  const editor = useEditor({
    extensions: getEditorExtensions(),
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'ProseMirror appearance-none min-h-45 w-full bg-white body-6 text-gray-700 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      try {
        const html = editor.getHTML();
        onChangeRef.current?.(html);
      } catch {
        // silent
      }
    },
  });

  useEffect(() => {
    return () => editor?.destroy();
  }, [editor]);

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML?.();
    if (typeof value === 'string' && value !== current) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

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

  if (!editor) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-2">
      <div className={`flex flex-col rounded-2xl border-1 border-gray-300 px-8 pt-4 pb-9`}>
        <Toolbar editor={editor} onLinkButtonClick={() => handleLink(editor)} />
        <EditorContent editor={editor} className="mt-7" />
      </div>
    </div>
  );
};

export default TextContent;

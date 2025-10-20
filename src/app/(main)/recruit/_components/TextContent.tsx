'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Image from 'next/image';
import { useEffect, useState } from 'react';
type EditorProps = {
  editorContent: string;
  onChange: (content: string) => void;
};

const TextContent = ({ editorContent, onChange }: EditorProps) => {
  const [, forceUpdate] = useState(0);

  // 텍스트 에디터 초기 설정
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false,
        bulletList: { HTMLAttributes: { class: 'list-disc ml-4' } },
        orderedList: { HTMLAttributes: { class: 'list-decimal ml-4' } },
      }),
      Link.configure({
        autolink: true,
        linkOnPaste: true,
        openOnClick: false, // 편집 중엔 클릭으로 안 열리도록
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer nofollow',
          class: 'underline text-blue-600 hover:opacity-80',
        },
        validate: (href) => /^(https?:\/\/|mailto:|tel:|www\.)/i.test(href),
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'paragraph') {
            return [
              '*최소 50자 이상부터 작성 가능해요',
              '팀원에게 첫인상이 되는 모집글은 꼼꼼히 작성할수록 좋아요',
              '',
              '<작성 예시>',
              '• 어떤 프로젝트인지 소개해주세요',
              '• 누구와, 왜, 어떤 목표로 함께하고 싶은지 작성해주세요',
              '• 어떤 성향의 사람들을 찾고 있는지 작성해주세요',
            ].join('\n');
          }
          return '';
        },
        includeChildren: true,
        showOnlyCurrent: false,
      }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'ProseMirror appearance-none min-h-[150px] w-full bg-white body-4 focus:outline-none',
      },
    },
    content: editorContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const handleLinkButtonClick = () => {
    if (!editor) return;
    const isLinkActive = editor.isActive('link');
    if (isLinkActive) {
      editor.chain().focus().unsetLink?.().run();
      return;
    }

    const url = window.prompt('URL을 입력하세요 (예: https://example.com)');
    if (!url) return;

    let normalized = url.trim();
    if (/^www\./i.test(normalized)) normalized = 'https://' + normalized;

    const valid = /^(https?:\/\/|mailto:|tel:)/i.test(normalized);
    if (!valid) {
      alert('유효한 URL을 입력해주세요 (예: https://example.com, mailto:, tel:, www.)');
      return;
    }

    // 선택한 텍스트가 없으면 URL 텍스트를 삽입하면서 링크 마크 적용
    const selectionEmpty = editor.state.selection.empty;
    if (selectionEmpty) {
      editor
        .chain()
        .focus()
        .insertContent(
          `<a href="${normalized}" target="_blank" rel="noopener noreferrer nofollow">${normalized}</a>`,
        )
        .run();
    } else {
      // 선택 영역이 있으면 선택 영역에 링크 적용
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({
          href: normalized,
          target: '_blank',
          rel: 'noopener noreferrer nofollow',
        })
        .run();
    }
  };

  useEffect(() => {
    if (!editor) return;
    const update = () => forceUpdate((v) => v + 1);
    editor.on('selectionUpdate', update);
    editor.on('transaction', update); // 방향키 이동
    editor.on('update', update); // 실제 내용 수정
    return () => {
      editor.off('selectionUpdate', update);
      editor.off('transaction', update);
      editor.off('update', update);
    };
  }, [editor]);

  if (!editor) return null;
  return (
    <div className="flex flex-col rounded-2xl border-1 border-gray-300 px-8 pt-4 pb-9">
      {/* 에디터 툴바 */}
      {/* TODO : ul 아이콘, h3 아이콘 추가 */}
      {/* TODO : 툴바 컴포넌트화 */}
      <div className="flex w-full gap-6 border-b-1 border-gray-300 px-5 pt-2.5 pb-5">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          title="Heading 1"
          className="cursor-pointer transition-opacity hover:opacity-80"
        >
          <Image
            src={
              editor.isActive('heading', { level: 1 })
                ? '/icons/editor/text-h1-selected.svg'
                : '/icons/editor/text-h1.svg'
            }
            alt="H1"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          title="Heading 2"
          className="cursor-pointer transition-opacity hover:opacity-80"
        >
          <Image
            src={
              editor.isActive('heading', { level: 2 })
                ? '/icons/editor/text-h2-selected.svg'
                : '/icons/editor/text-h2.svg'
            }
            alt="H2"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          title="Heading 3"
          className="cursor-pointer transition-opacity hover:opacity-80"
        >
          <Image
            src={
              editor.isActive('heading', { level: 3 })
                ? '/icons/editor/text-h3-selected.svg'
                : '/icons/editor/text-h3.svg'
            }
            alt="H3"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold (Ctrl+B)"
          className="cursor-pointer transition-opacity hover:opacity-80"
        >
          <Image
            src={
              editor.isActive('bold')
                ? '/icons/editor/text-bold-selected.svg'
                : '/icons/editor/text-bold.svg'
            }
            alt="Bold"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic (Ctrl+I)"
          className="cursor-pointer transition-opacity hover:opacity-80"
        >
          <Image
            src={
              editor.isActive('italic')
                ? '/icons/editor/text-italic-selected.svg'
                : '/icons/editor/text-italic.svg'
            }
            alt="Italic"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title="Underline (Ctrl+U)"
          className="cursor-pointer transition-opacity hover:opacity-80"
        >
          <Image
            src={
              editor.isActive('underline')
                ? '/icons/editor/text-underline-selected.svg'
                : '/icons/editor/text-underline.svg'
            }
            alt="Underline"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet List"
          className="cursor-pointer transition-opacity hover:opacity-80"
        >
          <Image
            src={
              editor.isActive('bulletList')
                ? '/icons/editor/text-ul-selected.svg'
                : '/icons/editor/text-ul.svg'
            }
            alt="Bullet list"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Numbered list"
          className="cursor-pointer transition-opacity hover:opacity-80"
        >
          <Image
            src={
              editor.isActive('orderedList')
                ? '/icons/editor/text-ol-selected.svg'
                : '/icons/editor/text-ol.svg'
            }
            alt="Numbered list"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </button>
        <button
          type="button"
          onClick={handleLinkButtonClick}
          title={editor.isActive('link') ? 'Unlink' : 'Link'}
          className="cursor-pointer transition-opacity hover:opacity-80"
        >
          <Image
            src={
              editor.isActive('link')
                ? '/icons/editor/text-link-selected.svg'
                : '/icons/editor/text-link.svg'
            }
            alt="Link"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </button>
      </div>
      {/* 에디터 본문 */}
      <EditorContent editor={editor} className="mt-7" />
    </div>
  );
};
export default TextContent;

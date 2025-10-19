'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
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
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'ProseMirror shadow appearance-none min-h-[150px] border rounded w-full py-2 px-3 bg-white text-black text-sm mt-0 md:mt-3 leading-tight focus:outline-none',
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
    <div className="flex flex-col gap-9 rounded-2xl border-1 border-gray-300 px-8 py-4">
      <div className="flex w-full gap-6 border-b-1 border-gray-300 ps-5 pt-2.5 pb-5">
        24px 툴바 아이콘 나열
      </div>
      {/* 에디터 본문 */}
      <div className="body-6 text-gray-500">
        *최소 50자 이상부터 작성 가능해요 <br /> 팀원에게 첫인상이 되는 모집글은 꼼꼼히 작성할수록
        좋아요 <br /> <br /> {'<작성 예시>'} <br /> - 어떤 프로젝트인지 소개해주세요 <br /> -
        누구와, 왜, 어떤 목표로 함께하고 싶은지 작성해주세요 <br />- 어떤 성향의 사람들을 찾고
        있는지 작성해주세요
      </div>
    </div>
  );
};
export default TextContent;

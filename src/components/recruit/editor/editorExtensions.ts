import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { TableKit } from '@tiptap/extension-table';

export const getEditorExtensions = () => [
  StarterKit.configure({
    link: false,
    bulletList: { HTMLAttributes: { class: 'list-disc ml-4' } },
    orderedList: { HTMLAttributes: { class: 'list-decimal ml-4' } },
  }),
  TableKit.configure({
    table: {
      resizable: false,
      HTMLAttributes: {
        class: 'border-collapse w-full my-4',
      },
    },
    tableCell: {
      HTMLAttributes: {
        class: 'border border-gray-300 px-3 py-2 text-left',
      },
    },
    tableHeader: {
      HTMLAttributes: {
        class: 'border border-gray-300 px-3 py-2 bg-gray-100 font-semibold text-left',
      },
    },
  }),
  Link.configure({
    autolink: true,
    linkOnPaste: true,
    openOnClick: false,
    HTMLAttributes: {
      target: '_blank',
      rel: 'noopener noreferrer nofollow',
      class: 'underline text-primary-900 hover:opacity-80',
    },
    validate: (href) => /^(https?:\/\/|mailto:|tel:|www\.)/i.test(href),
  }),
  Placeholder.configure({
    placeholder: ({ node, pos, editor }) => {
      const resolvedPos = editor.state.doc.resolve(pos);
      const parent = resolvedPos.parent;
      if (parent.type.name === 'tableCell' || parent.type.name === 'tableHeader') {
        return '';
      }

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
];

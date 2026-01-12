import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';

export const getEditorExtensions = () => [
  StarterKit.configure({
    link: false,
    bulletList: { HTMLAttributes: { class: 'list-disc ml-4' } },
    orderedList: { HTMLAttributes: { class: 'list-decimal ml-4' } },
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
];

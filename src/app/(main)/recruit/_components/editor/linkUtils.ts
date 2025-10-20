import { type Editor } from '@tiptap/react';

export const handleLink = (editor: Editor) => {
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

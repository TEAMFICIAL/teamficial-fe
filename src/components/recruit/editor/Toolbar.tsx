import { Editor } from '@tiptap/react';
import Image from 'next/image';

interface ToolbarProps {
  editor: Editor;
  onLinkButtonClick: () => void;
}

const Toolbar = ({ editor, onLinkButtonClick }: ToolbarProps) => {
  if (!editor) return null;

  return (
    <div className="desktop:px-5 flex w-full flex-wrap gap-x-6 gap-y-4 border-b-1 border-gray-300 pt-2.5 pb-5">
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
        onClick={onLinkButtonClick}
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
  );
};

export default Toolbar;

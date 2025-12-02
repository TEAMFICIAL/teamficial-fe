interface ProfileHeaderProps {
  title?: string;
  handleEdit: () => void;
  handleDelete: () => void;
}

const ProfileHeader = ({ title, handleEdit, handleDelete }: ProfileHeaderProps) => (
  <div className="body-6 mb-3 flex w-full justify-between text-gray-700">
    <p className="cursor-pointer">{title || '새 프로필'}</p>
    <div className="flex gap-4">
      <button onClick={handleEdit} className="cursor-pointer">
        수정하기
      </button>
      <button onClick={handleDelete} className="cursor-pointer text-red-100">
        삭제하기
      </button>
    </div>
  </div>
);

export default ProfileHeader;

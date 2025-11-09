import WorkTimeDropdown from './WorkingTimeDropdown';
import Button from '@/components/common/button/Button';
import LabeledTextarea from './LabeledTextarea';

const ProfileEditContainer = () => {
  return (
    <>
      <LabeledTextarea
        label="프로필 제목 지정하기"
        placeholder="프로필 제목을 입력해주세요"
        className="mb-6"
      />
      <LabeledTextarea label="연락방법" placeholder="Ex. 카카오톡 오픈채팅 링크" className="mb-6" />
      <div className="mb-6 flex flex-col gap-4">
        <p className="title-3 text-gray-900">작업시간</p>
        <WorkTimeDropdown />
      </div>

      <div className="flex flex-col">
        <div>
          <p className="title-3 text-gray-900">나를 소개하는 링크 추가하기</p>
          <p className="body-4 text-gray-700">링크는 최대 3개까지 입력할 수 있어요</p>
        </div>
        {[1, 2, 3].map((_, i) => (
          <LabeledTextarea
            key={i}
            label=""
            placeholder="링크를 입력해주세요"
            iconSrc="/icons/profile-link.svg"
          />
        ))}
      </div>
      <div className="mb-14 flex justify-end">
        <Button className="body-3 bg-primary-900 text-gray-0 mt-[162px] px-8 py-4 disabled:bg-gray-300 disabled:text-gray-600">
          저장하기
        </Button>
      </div>
    </>
  );
};

export default ProfileEditContainer;

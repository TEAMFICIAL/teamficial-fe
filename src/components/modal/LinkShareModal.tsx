import { BaseModalProps } from '@/constants/ModalList';
import BaseModal from '.';
import Image from 'next/image';
import { useToast } from '@/contexts/ToastContext';

const LinkShareModal = ({ isOpen, onClose }: BaseModalProps) => {
  const { addToast } = useToast();

  const handleKakaoShare = () => {
    addToast({ message: '카카오톡 공유 기능은 준비 중입니다.' });
  };

  const handleCopyLink = async () => {
    const uuid = window.location.pathname.split('/').pop();
    const shareUrl = `${window.location.origin}/teampsylog/head/${uuid}`;

    await navigator.clipboard.writeText(shareUrl);
    addToast({ message: '링크가 복사되었습니다.' });
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="desktop:w-115 desktop:pb-0 flex flex-col pb-2">
        <div className="border-b border-b-gray-300 pb-2">
          <p className="body-7 desktop:body-1 text-gray-800">팀피셜록 공유하기</p>
          <p className="body-10 desktop:body-4 text-gray-700">
            사람들에게 나의 소프트스킬 역량을 어필하세요
          </p>
        </div>
        <div className="desktop:gap-7 flex items-center justify-center gap-5 pt-4">
          <button
            onClick={handleKakaoShare}
            className="desktop:gap-2 flex flex-col items-center gap-1"
          >
            <Image src="/images/share-kakao.png" width={48} height={48} alt="카카오톡 공유하기" />
            <p className="body-10 desktop:body-5 text-gray-700">카카오톡</p>
          </button>
          <button
            onClick={handleCopyLink}
            className="desktop:gap-2 flex flex-col items-center gap-1"
          >
            <Image src="/images/share-link.png" width={48} height={48} alt="링크 복사" />
            <p className="body-10 desktop:body-5 text-gray-700">링크복사</p>
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default LinkShareModal;

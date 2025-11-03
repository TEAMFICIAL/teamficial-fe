import Button from '@/components/common/button/Button';
import BaseModal from '..';
import MessageTextarea from './MessageTextarea';
import Profile from './profile/Profile';
import { useState } from 'react';
import Image from 'next/image';
import { PartnerModalProps } from '@/constants/ModalList';

interface ProfileData {
  id: number;
  name: string;
  contact: string;
  workTime: string;
  keywords: string[];
}

const profiles: ProfileData[] = [
  {
    id: 1,
    name: '목마른 햄스터님',
    contact: '팀원이 되면 공개해요',
    workTime: '새벽에 작업하는게 편해요',
    keywords: ['피드백장인', '시간잘지킴', '꼼꼼한'],
  },
];

const PartnerModal = ({ isOpen, onClose }: PartnerModalProps) => {
  const currentProfile = profiles[0];
  const [message, setMessage] = useState('');

  const handleClick = () => {};

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col">
        <div className="flex items-start justify-between">
          <div>
            <span className="title-3 text-gray-800">함께할 사람이 생겼어요!</span>
            <p className="body-6 mb-4 text-gray-700">
              한 번 선택한 결정은 되돌릴 수 없으니 신중하게 선택해주세요
            </p>
          </div>
          <Image
            src={`/icons/close.svg`}
            alt="close"
            width={24}
            height={24}
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
        <Profile profile={currentProfile} />
        <div>
          <MessageTextarea value={message} onChange={setMessage} />
          <div className="flex gap-2">
            <Button className="body-5 bg-gray-300 px-28 py-4 text-gray-800" onClick={handleClick}>
              다음에 함께할래요
            </Button>
            <Button
              className="body-5 bg-primary-900 text-gray-0 hover:bg-primary-700 px-30 py-4"
              onClick={handleClick}
            >
              함께할래요
            </Button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default PartnerModal;

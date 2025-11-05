import ApplyModal from '@/components/modal/apply/ApplyModal';
import ApplyCompleteModal from '@/components/modal/ApplyCompleteModal';
import DeleteModal from '@/components/modal/DeleteModal';
import PartnerModal from '@/components/modal/apply/PartnerModal';
import TeamPsylogCompleteModal from '@/components/modal/TeamPsylogCompleteModal';
import RecruitCompleteModal from '@/components/modal/RecruitCompleteModal';

export interface RecruitCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onListClick?: () => void;
  onDetailClick?: () => void;
}

export interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId?: number;
}

export interface ApplyCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
}

export interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId?: number;
  projectName?: string;
  onConfirm?: () => void;
}

export interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  partnerId?: number;
}

export interface TeamPsylogCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

export const MODAL_COMPONENTS = {
  apply: ApplyModal,
  applyComplete: ApplyCompleteModal,
  delete: DeleteModal,
  partner: PartnerModal,
  teamPsylogComplete: TeamPsylogCompleteModal,
  recruitComplete: RecruitCompleteModal,
};

export type ModalType = keyof typeof MODAL_COMPONENTS;

export interface ModalPropsMap {
  apply: ApplyModalProps;
  applyComplete: ApplyCompleteModalProps;
  delete: DeleteModalProps;
  partner: PartnerModalProps;
  teamPsylogComplete: TeamPsylogCompleteModalProps;
  recruitComplete: RecruitCompleteModalProps;
}

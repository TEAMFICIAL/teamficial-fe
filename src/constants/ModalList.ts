import ApplyModal from '@/components/modal/apply/ApplyModal';
import ApplyCompleteModal from '@/components/modal/ApplyCompleteModal';
import DeleteModal from '@/components/modal/DeleteModal';
import PartnerModal from '@/components/modal/apply/PartnerModal';
import TeamPsylogCompleteModal from '@/components/modal/TeamPsylogCompleteModal';
import RecruitCompleteModal from '@/components/modal/RecruitCompleteModal';
import { RecruitingPosition } from '@/types/project';
import ApplicantFinishModal from '@/components/modal/ApplicantFinishModal';
import ApplicateFinishModal from '@/components/modal/ApplicateFinishModal';
import DeleteProfileModal from '@/components/modal/profile/DeleteProfileModal';
import DeleteProfileCompleteModal from '@/components/modal/profile/DeleteProfileCompleteModal';
import DeleteProfileError from '@/components/modal/profile/DeleteProfileError';
import EditProfileCompleteModal from '@/components/modal/profile/EditProfileCompleteModal';
import TeamPsylogAskModal from '@/components/modal/TeamPsylogAskModal';
import { QuestionFormValues } from '@/libs/schemas/questionFormSchema';

export interface RecruitCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onListClick?: () => void;
  onDetailClick?: () => void;
}

export interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId?: number;
  recruitingPositions?: RecruitingPosition[];
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
  recruitingPostId: number;
  applicationId: number;
}

export interface TeamPsylogCompleteModalProps {
  userName: string;
  isOpen: boolean;
  uuid: string;
  onClose: () => void;
  onConfirm?: () => void;
}

export type TeamPsylogAskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  uuid: string;
  formData: QuestionFormValues;
};

export interface ApplicateFinishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  recruitingPostId?: number;
}

export interface ApplicantFinishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface DeleteProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileId: number;
  profileName: string;
}

export interface DeleteProfileCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileName: string;
}

export interface DeleteProfileErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface EditProfileCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MODAL_COMPONENTS = {
  apply: ApplyModal,
  applyComplete: ApplyCompleteModal,
  delete: DeleteModal,
  partner: PartnerModal,
  teamPsylogComplete: TeamPsylogCompleteModal,
  teamPsylogAsk: TeamPsylogAskModal,
  recruitComplete: RecruitCompleteModal,
  applicateFinish: ApplicateFinishModal,
  applicantFinish: ApplicantFinishModal,
  profileDelete: DeleteProfileModal,
  profileDeleteComplete: DeleteProfileCompleteModal,
  profileDeleteError: DeleteProfileError,
  profileEditComplete: EditProfileCompleteModal,
};

export type ModalType = keyof typeof MODAL_COMPONENTS;

export interface ModalPropsMap {
  apply: ApplyModalProps;
  applyComplete: ApplyCompleteModalProps;
  delete: DeleteModalProps;
  partner: PartnerModalProps;
  teamPsylogComplete: TeamPsylogCompleteModalProps;
  teamPsylogAsk: TeamPsylogAskModalProps;
  recruitComplete: RecruitCompleteModalProps;
  applicateFinish: ApplicateFinishModalProps;
  applicantFinish: ApplicantFinishModalProps;
  profileDelete: DeleteProfileModalProps;
  profileDeleteComplete: DeleteProfileCompleteModalProps;
  profileDeleteError: DeleteProfileErrorModalProps;
  profileEditComplete: EditProfileCompleteModalProps;
}

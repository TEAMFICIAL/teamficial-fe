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
import ProfileDetailModal from '@/components/modal/profile/ProfileDetailModal';
import { ResponseProfile } from '@/types/profile';

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface RecruitCompleteModalProps extends BaseModalProps {
  onListClick?: () => void;
  onDetailClick?: () => void;
}

export interface ApplyModalProps extends BaseModalProps {
  postId?: number;
  recruitingPositions?: RecruitingPosition[];
}

export interface ApplyCompleteModalProps extends BaseModalProps {
  projectName?: string;
}

export interface DeleteModalProps extends BaseModalProps {
  postId?: number;
  projectName?: string;
  onConfirm?: () => void;
}

export interface PartnerModalProps extends BaseModalProps {
  recruitingPostId: number;
  applicationId: number;
}

export interface TeamPsylogCompleteModalProps extends BaseModalProps {
  userName: string;
  uuid: string;
  onConfirm?: () => void;
}

export interface TeamPsylogAskModalProps extends BaseModalProps {
  userName: string;
  uuid: string;
  formData: QuestionFormValues;
}

export interface ApplicateFinishModalProps extends BaseModalProps {
  onConfirm?: () => void;
  recruitingPostId?: number;
}

export interface DeleteProfileModalProps extends BaseModalProps {
  profileId: number;
  profileName: string;
}

export interface DeleteProfileCompleteModalProps extends BaseModalProps {
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

export interface ProfileDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ResponseProfile;
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
  profileDetail: ProfileDetailModal,
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
  applicantFinish: BaseModalProps;
  profileDelete: DeleteProfileModalProps;
  profileDeleteComplete: DeleteProfileCompleteModalProps;
  profileDeleteError: DeleteProfileErrorModalProps;
  profileEditComplete: EditProfileCompleteModalProps;
  profileDetail: ProfileDetailModalProps;
}

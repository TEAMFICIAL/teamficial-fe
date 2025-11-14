import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useModal } from '@/contexts/ModalContext';
import { useCreateProject } from '@/hooks/mutation/useCreateProject';
import { useUpdateProject } from '@/hooks/mutation/useUpdateProject';
import {
  createRecruitFormSchema,
  recruitFormSchema,
  RecruitFormType,
} from '@/libs/schemas/projectSchema';
import { CreateProject, Project } from '@/types/project';
import { PositionType } from '@/utils/position';

type UseRecruitFormProps = {
  mode: 'create' | 'edit';
  initialData?: Project;
  postId?: number;
};

const convertDateFormat = (dateString: string) => {
  if (!dateString) return '';
  return dateString.replace(/\./g, '-');
};

export const useRecruitForm = ({ mode, initialData, postId }: UseRecruitFormProps) => {
  const router = useRouter();
  const { openModal } = useModal();
  const { mutate: createProject } = useCreateProject();
  const { mutate: updateProject } = useUpdateProject();

  const formMethods = useForm<RecruitFormType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(mode === 'edit' ? recruitFormSchema : createRecruitFormSchema),
    defaultValues:
      mode === 'edit' && initialData
        ? {
            title: initialData.title,
            recruitingPositions: initialData.recruitingPositions,
            progressWay: initialData.progressWay,
            startDate: convertDateFormat(initialData.startDate),
            period: initialData.period,
            deadline: convertDateFormat(initialData.deadline),
            contactWay: initialData.contactWay,
            content: initialData.content,
            profileId: undefined,
          }
        : {
            title: '',
            recruitingPositions: [{ position: '' as PositionType, count: 1 }],
            progressWay: undefined,
            startDate: '',
            period: undefined,
            deadline: '',
            contactWay: '',
            content: '',
            profileId: undefined,
          },
  });

  const handleEdit = (formData: RecruitFormType) => {
    if (!postId) return;

    const projectData: Project = {
      title: formData.title,
      recruitingPositions: formData.recruitingPositions,
      progressWay: formData.progressWay!,
      startDate: formData.startDate,
      period: formData.period!,
      deadline: formData.deadline,
      contactWay: formData.contactWay,
      content: formData.content,
      status: initialData?.status || 'OPEN',
    };

    updateProject(
      { postId, project: projectData },
      {
        onSuccess: () => router.push(`/project/${postId}`),
        onError: (error) => console.error('프로젝트 수정 실패:', error),
      },
    );
  };

  const handleCreate = (formData: RecruitFormType) => {
    if (!formData.profileId) {
      console.error('프로필이 선택되지 않았습니다.');
      return;
    }

    const projectData: CreateProject = {
      ...formData,
      profileId: formData.profileId,
      status: 'OPEN',
    };

    createProject(projectData, {
      onSuccess: (response) => {
        openModal('recruitComplete', {
          onListClick: () => router.push('/project'),
          onDetailClick: () => router.push(`/project/${response.postId}`),
        });
      },
      onError: (error) => console.error('프로젝트 생성 실패:', error),
    });
  };

  const onSubmit = (formData: RecruitFormType) => {
    try {
      if (mode === 'edit') {
        handleEdit(formData);
      } else {
        handleCreate(formData);
      }
    } catch (error) {
      console.error('폼 제출 중 오류 발생:', error);
    }
  };

  const onError = (errors: unknown) => {
    console.error('폼 유효성 검사 실패:', errors);
  };

  return {
    ...formMethods,
    onSubmit,
    onError,
  };
};

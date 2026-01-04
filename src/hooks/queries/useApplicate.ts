import { getApplicantProfile } from '@/libs/api/application';
import { ApplicationResponse } from '@/types/application';
import { useQuery } from '@tanstack/react-query';

export const useGetApplicantProfile = ({
  recruitingPostId,
  applicationId,
}: {
  recruitingPostId: number;
  applicationId: number;
}) => {
  return useQuery<ApplicationResponse>({
    queryKey: ['applicantProfile', recruitingPostId, applicationId],
    queryFn: () => getApplicantProfile(recruitingPostId, applicationId),
  });
};

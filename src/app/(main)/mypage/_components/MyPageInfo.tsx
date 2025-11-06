'use client';

import MyPageTitle from './MyPageTitle';
import EmptyApplicantStatus from './applicant/EmptyApplicantStatus';
import EmptyAppliedTeam from './applied/EmptyAppliedTeam';
import InitialProfile from './profile/InitialProfile';
import ProfileSlider from './profile/ProfileSlider';
import AppliedTeamSection from './applied/AppliedTeamsSection';
import ApplicantStatusSection from './applicant/ApplicantStatusSection';
import { useGetProfileList } from '@/hooks/queries/useProfile';
import { useDashboard } from '@/hooks/queries/useDashboard';

const MyPageInfo = () => {
  const { data: profiles } = useGetProfileList();
  const hasProfileData = profiles && profiles.length > 0;

  const { data: dashboard } = useDashboard();
  const myApplications = dashboard?.myApplications ?? [];
  const myRecruitingPost = dashboard?.myRecruitingPost ?? [];

  const hasApplications = myApplications.length > 0;
  const hasRecruitingPosts = myRecruitingPost.length > 0;

  return (
    <>
      <MyPageTitle />
      {hasProfileData ? <ProfileSlider /> : <InitialProfile />}
      {hasApplications ? (
        <AppliedTeamSection applications={myApplications} />
      ) : (
        <EmptyAppliedTeam />
      )}

      {hasRecruitingPosts ? (
        <ApplicantStatusSection recruitings={myRecruitingPost} />
      ) : (
        <EmptyApplicantStatus />
      )}
    </>
  );
};

export default MyPageInfo;

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
import EmptyMyTeam from './myteam/EmptyMyTeam';
import MyTeamSection from './myteam/MyTeamSection';

const MyPageInfo = () => {
  const { data: profiles } = useGetProfileList();
  const hasProfileData = profiles && profiles.length > 0;

  const { data: dashboard } = useDashboard();
  const myApplications = dashboard?.myApplications ?? [];
  const myRecruitingPost = dashboard?.myRecruitingPost ?? [];
  const myTeamResponses = dashboard?.myTeamResponses ?? [];

  const hasApplications = myApplications.length > 0;
  const hasRecruitingPosts = myRecruitingPost.length > 0;
  const hasMyTeamResponses = myTeamResponses.length > 0;

  return (
    <div className="pb-14">
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

      {hasMyTeamResponses ? <MyTeamSection teams={myTeamResponses} /> : <EmptyMyTeam />}
    </div>
  );
};

export default MyPageInfo;

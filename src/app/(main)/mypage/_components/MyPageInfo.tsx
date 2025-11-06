import MyPageTitle from './MyPageTitle';
// import EmptyApplicantStatus from './applicant/EmptyApplicantStatus';
// import EmptyAppliedTeam from './applied/EmptyAppliedTeam';

// import InitialProfile from './profile/InitialProfile';
import ProfileSlider from './profile/ProfileSlider';
import AppliedTeamSection from './applied/AppliedTeamsSection';
import ApplicantStatusSection from './applicant/ApplicantStatusSection';

const MyPageInfo = () => {
  return (
    <>
      <MyPageTitle />
      {/* <InitialProfile /> */}
      <ProfileSlider />
      {/* <EmptyAppliedTeam /> */}
      <AppliedTeamSection />
      {/* <EmptyApplicantStatus /> */}
      <ApplicantStatusSection />
    </>
  );
};

export default MyPageInfo;

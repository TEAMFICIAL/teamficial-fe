import MobileHeader from '@/components/common/MobileHeader';
import ProfileList from './_components/ProfileList';
import ProfileTitle from './_components/ProfileTitle';

const Page = () => {
  return (
    <>
      <MobileHeader title="프로필 관리하기" />
      <div className="tablet:bg-transparent -mx-4 h-full bg-gray-100">
        <ProfileTitle />
        <ProfileList />
      </div>
    </>
  );
};

export default Page;

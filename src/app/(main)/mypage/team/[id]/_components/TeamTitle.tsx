'use client';

import DropdownSmall from '@/components/common/DropdownSmall';
import { MY_TEAM_DROPDOWN } from '@/constants/Dropdown';

interface MyTeamTitleProps {
  teamMemberStatus: string;
  setTeamMemberStatus: (v: string) => void;
}

const MyTeamTitle = ({ teamMemberStatus, setTeamMemberStatus }: MyTeamTitleProps) => {
  return (
    <div className="flex flex-col pb-5">
      <p className="title-2 pt-7 text-gray-900">참여중인 팀</p>
      <p className="body-4 pb-5 text-gray-700">
        {`‘팀피셜 팀원구해요' 모집글을 통해 구성된 팀원입니다`}
      </p>
      <DropdownSmall
        name="recruitStatus"
        value={teamMemberStatus}
        placeholder="모집분야"
        onChange={(v) => setTeamMemberStatus(v)}
        options={MY_TEAM_DROPDOWN}
      />
    </div>
  );
};

export default MyTeamTitle;

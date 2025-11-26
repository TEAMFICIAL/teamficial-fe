import { Keyword } from '@/components/common/Tag';
import { WORKING_TIME_KR } from '@/constants/Translate';
import { ResponseConfirmedProfile } from '@/types/myteam';
import { getPositionLabel } from '@/utils/project/positionLabel';

const MemberInfo = ({ member }: { member: ResponseConfirmedProfile }) => {
  return (
    <div className="flex flex-col">
      <div className="mb-2 flex items-center gap-2">
        <p className="body-1 text-gray-900">{member.userName}</p>
        <div className="body-7 rounded bg-gray-200 px-3 text-gray-700">
          {getPositionLabel(member.position)}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <p className="body-5 whitespace-nowrap text-gray-800">연락수단</p>
        <div className="h-3 w-[1px] bg-gray-700"></div>
        <p className="body-6 max-w-[316px] truncate text-gray-600">
          {member.contactWay || '연락수단을 등록하지 않았습니다'}
        </p>
      </div>

      <div className="flex items-center gap-2 pb-5">
        <p className="body-5 text-gray-800">작업시간</p>
        <div className="h-3 w-[1px] bg-gray-700"></div>
        <p className="body-6 text-gray-600">
          {member.workingTime
            ? `${WORKING_TIME_KR[member.workingTime]}에 작업하는게 편해요`
            : '작업시간대를 선택하지 않았습니다'}
        </p>
      </div>

      <div className="body-7 flex flex-wrap gap-2">
        {member.keywords.map((k, i) => (
          <Keyword
            key={`${k}-${i}`}
            className="bg-gray-0 border border-gray-300 px-4 py-2 text-gray-600"
          >
            #{k}
          </Keyword>
        ))}
      </div>
    </div>
  );
};

export default MemberInfo;

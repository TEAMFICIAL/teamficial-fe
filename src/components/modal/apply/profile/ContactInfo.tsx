// 연락수단 컴포넌트
export const ContactInfo = ({
  contactWay,
  isUrl,
  textSize = 'body-8',
}: {
  contactWay: string;
  isUrl: boolean;
  textSize?: string;
}) => (
  <div className="flex min-w-0 items-center gap-2">
    <p className={`${textSize} flex-shrink-0 text-gray-800`}>연락수단</p>
    <div className="h-3 w-[1px] bg-gray-700"></div>
    {isUrl ? (
      <a
        href={contactWay}
        target="_blank"
        rel="noopener noreferrer"
        className={`${textSize} text-primary-900 max-w-[300px] truncate underline`}
        title={contactWay}
      >
        {contactWay}
      </a>
    ) : (
      <p className={`${textSize} max-w-[300px] truncate text-gray-700`} title={contactWay}>
        {contactWay || '연락수단을 등록하지 않았어요'}
      </p>
    )}
  </div>
);

// 작업시간 컴포넌트
export const WorkingTimeInfo = ({
  workingTime,
  textSize = 'body-8',
}: {
  workingTime?: string;
  textSize?: string;
}) => (
  <div className="flex items-center gap-2">
    <p className={`${textSize} text-gray-800`}>작업시간</p>
    <div className="h-3 w-[1px] bg-gray-700" />
    <p className={`${textSize} text-gray-700`}>
      {workingTime ? `${workingTime}에 작업하는 게 편해요` : '작업시간대를 선택해주세요'}
    </p>
  </div>
);

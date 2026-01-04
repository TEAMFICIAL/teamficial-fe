'use client';

import { useState } from 'react';
import PartDropdown from './PartDropdown';

const QuestionTitle = ({ userName }: { userName: string }) => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-2">
      <div className="tablet:title-3 body-5 tablet:mt-7 tablet:gap-3 mt-6 flex items-center gap-1">
        <PartDropdown selected={selectedPart} onSelect={setSelectedPart} />
        파트에서 본 {userName}님
      </div>
      <p className="tablet:body-6 body-10 text-gray-700">
        각 질문별 원하는 질문을 하나씩 선택하여 응답해보세요
      </p>
    </div>
  );
};

export default QuestionTitle;

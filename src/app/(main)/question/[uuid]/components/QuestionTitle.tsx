'use client';

import { useState } from 'react';
import PartDropdown from './PartDropdown';

const QuestionTitle = () => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-2">
      <div className="title-3 mt-7 flex items-center gap-3">
        <PartDropdown selected={selectedPart} onSelect={setSelectedPart} />
        파트에서 본 민수님
      </div>
      <p className="body-6 text-gray-700">각 질문별 원하는 질문을 하나씩 선택하여 응답해보세요</p>
    </div>
  );
};

export default QuestionTitle;

'use client';

import BaseModal from './index';
import MessageTextarea from './apply/MessageTextarea';

import { useState } from 'react';
import { ReportCommentModalProps } from '@/constants/ModalList';
import { useModal } from '@/contexts/ModalContext';
import QuestionDropdown from '@/app/(main)/question/[uuid]/_components/QuestionDropdown';
import Button from '../common/Button';
import { RequestReportComment } from '@/types/teampsylog';

const REPORT_TYPE_OPTIONS = [
  '비방적인 내용입니다',
  '적합하지 않은 내용의 키워드입니다',
  '기타(직접 입력)',
];

const ReportCommentModal = ({ isOpen, onClose, keywordId }: ReportCommentModalProps) => {
  const { openModal } = useModal();
  const [reportType, setReportType] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [etcInput, setEtcInput] = useState('');
  const [showEtc, setShowEtc] = useState(false);

  const handleTypeChange = (value: string) => {
    setReportType(value);
    if (value === '기타(직접 입력)') {
      setShowEtc(true);
    } else {
      setShowEtc(false);
      setEtcInput('');
    }
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleEtcInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEtcInput(e.target.value);
  };

  const getReportTypeCode = (type: string | null) => {
    switch (type) {
      case '비방적인 내용입니다':
        return 'HATE_SPEECH';
      case '적합하지 않은 내용의 키워드입니다':
        return 'UNSUITABLE_KEYWORD';
      case '기타(직접 입력)':
        return 'OTHER';
      default:
        return '';
    }
  };

  const handleSubmitClick = () => {
    if (keywordId === undefined || keywordId === null) {
      console.warn('keywordId가 정의되지 않았습니다.');
      return;
    }

    const typeCode = getReportTypeCode(reportType);

    const data: RequestReportComment = {
      keywordCommentId: keywordId,
      reportType: typeCode as 'HATE_SPEECH' | 'UNSUITABLE_KEYWORD' | 'OTHER',
      content,
      ...(typeCode === 'OTHER' && etcInput.trim() && { reportEtc: etcInput.trim() }),
    };

    console.log('신고 데이터:', data);
    openModal('reportComplete', { data });
  };

  const isSubmitDisabled =
    content.length > 300 ||
    keywordId === undefined ||
    keywordId === null ||
    !reportType ||
    (reportType === '기타(직접 입력)' ? !etcInput.trim() : false) ||
    !content.trim();

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} paddingClass="tablet:p-6">
      <div className="desktop:items-end flex flex-col gap-4">
        <div className="desktop:w-135 flex flex-col gap-6">
          <div className="flex flex-col">
            <p className="body-5 pb-4">
              신고 유형 <span className="text-red-100">*</span>
            </p>
            <QuestionDropdown
              options={REPORT_TYPE_OPTIONS}
              selected={reportType}
              onSelect={handleTypeChange}
              hasError={false}
              placeholder="신고 유형을 선택해주세요"
            />
            {showEtc && (
              <input
                type="text"
                className="desktop:body-6 body-9 desktop:pl-7 mt-2 rounded-lg border border-gray-300 py-3 pl-4 focus:outline-none"
                placeholder="신고 유형을 입력해주세요"
                value={etcInput}
                onChange={handleEtcInputChange}
                maxLength={50}
              />
            )}
          </div>
          <div className="flex flex-col gap-4">
            <MessageTextarea
              title={
                <>
                  <span>신고 내용 </span>
                  <span className="text-red-100">*</span>
                </>
              }
              placeholder="세부내용을 입력해주세요(300자 이내)"
              value={content}
              onChange={handleContentChange}
              maxLength={300}
            />
          </div>
        </div>
        <Button
          onClick={handleSubmitClick}
          label="제출하기"
          variant={isSubmitDisabled ? 'gray' : 'primary'}
          disabled={isSubmitDisabled}
        />
      </div>
    </BaseModal>
  );
};

export default ReportCommentModal;

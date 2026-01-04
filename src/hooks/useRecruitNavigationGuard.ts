import { useEffect } from 'react';
import { useModal } from '@/contexts/ModalContext';

// 이탈 방지 및 NotFinishModal 처리 전용 커스텀 훅
export function useRecruitNavigationGuard(
  isActive: boolean,
  setIsSubmitting: (v: boolean) => void,
) {
  const { openModal, closeModal } = useModal();

  // 뒤로가기 등 popstate 시 모달
  useEffect(() => {
    if (!isActive) return;

    // 마운트 시 한 번만 pushState
    window.history.pushState(null, '', window.location.pathname);

    const handlePopState = () => {
      openModal('notFinish', {
        onConfirm: () => {
          setIsSubmitting(true);
          closeModal();
          window.history.back();
        },
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isActive, openModal, closeModal, setIsSubmitting]);

  // 새로고침/닫기 시 브라우저 confirm
  useEffect(() => {
    if (!isActive) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isActive]);
}

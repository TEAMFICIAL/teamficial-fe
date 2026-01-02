import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/contexts/ModalContext';

// 이탈 방지 및 NotFinishModal 처리 전용 커스텀 훅
export function useRecruitNavigationGuard(
  isActive: boolean,
  setIsSubmitting: (v: boolean) => void,
) {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  // 뒤로가기 등 popstate 시 모달
  useEffect(() => {
    if (!isActive) return;
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.pathname);
      openModal('notFinish', {
        onConfirm: () => {
          setIsSubmitting(true);
          closeModal();
          setTimeout(() => {
            router.back();
          }, 0);
        },
      });
    };
    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isActive, openModal, closeModal, router, setIsSubmitting]);

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

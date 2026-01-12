import { useState, useEffect } from 'react';

export const useIsAuthor = (writerUserId: number) => {
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    try {
      const userString = localStorage.getItem('user');
      if (!userString) {
        setIsAuthor(false);
        return;
      }

      const userData = JSON.parse(userString);
      const currentUserId = userData?.state?.userId;

      if (!currentUserId) {
        setIsAuthor(false);
        return;
      }

      setIsAuthor(Number(currentUserId) === Number(writerUserId));
    } catch (error) {
      console.error('localStorage 파싱 에러:', error);
      setIsAuthor(false);
    }
  }, [writerUserId]);

  return isAuthor;
};

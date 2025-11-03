import { useState, useEffect } from 'react';

export const useIsAuthor = (profileId: number | undefined) => {
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId || profileId === undefined) {
      setIsAuthor(false);
      return;
    }
    setIsAuthor(Number(userId) === profileId);
  }, [profileId]);

  return isAuthor;
};

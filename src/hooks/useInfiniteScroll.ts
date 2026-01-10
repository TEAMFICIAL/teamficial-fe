import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Filters, useRecruitingPosts } from '@/hooks/queries/useRecruitingPosts';
import { ResponseProject } from '@/types/project';

interface UseInfiniteScrollOptions {
  filters: Filters;
  pageSize?: number;
  initialDisplayCount?: number;
  loadMoreCount?: number;
}

interface UseInfiniteScrollReturn {
  cards: ResponseProject[];
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  ref: (node: Element | null) => void;
  isInitialLoading: boolean;
}

export const useInfiniteScroll = ({
  filters,
  pageSize = 10,
  initialDisplayCount = 5,
  loadMoreCount = 10,
}: UseInfiniteScrollOptions): UseInfiniteScrollReturn => {
  const [allCards, setAllCards] = useState<ResponseProject[]>([]);
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);
  const [hasMore, setHasMore] = useState(true);
  const [mobilePage, setMobilePage] = useState(1);
  const [isFilterChanging, setIsFilterChanging] = useState(false);

  const {
    data: mobileData,
    isLoading: isMobileLoading,
    isError,
  } = useRecruitingPosts(filters, mobilePage, pageSize);

  useEffect(() => {
    setIsFilterChanging(true);
    setMobilePage(1);
    setDisplayCount(initialDisplayCount);
    setAllCards([]);
    setHasMore(true);
  }, [filters, initialDisplayCount]);

  useEffect(() => {
    if (mobileData !== undefined) {
      const newCards = mobileData.content ?? [];
      const isLastPage = mobilePage >= (mobileData.totalPages ?? 1);

      if (mobilePage === 1) {
        setAllCards(newCards);
        setDisplayCount(initialDisplayCount);
        setIsFilterChanging(false);
      } else {
        setAllCards((prev) => {
          const updatedCards = [...prev, ...newCards];
          if (isLastPage) {
            setDisplayCount(updatedCards.length);
          }
          return updatedCards;
        });
      }
      setHasMore(!isLastPage);
    }
  }, [mobileData, mobilePage, initialDisplayCount]);

  useEffect(() => {
    if (isFilterChanging && !isMobileLoading && mobileData !== undefined) {
      setIsFilterChanging(false);
    }
  }, [isFilterChanging, isMobileLoading, mobileData]);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasMore && !isMobileLoading) {
      const nextDisplayCount = Math.min(
        displayCount + loadMoreCount,
        allCards.length + loadMoreCount,
      );
      setDisplayCount(nextDisplayCount);

      if (nextDisplayCount > allCards.length && hasMore) {
        setMobilePage((prev) => prev + 1);
      }
    }
  }, [inView, hasMore, isMobileLoading, displayCount, allCards.length, loadMoreCount]);

  useEffect(() => {
    if (!hasMore && allCards.length > 0 && displayCount < allCards.length) {
      setDisplayCount(allCards.length);
    }
  }, [hasMore, allCards.length, displayCount]);

  const cards = allCards.slice(0, Math.min(displayCount, allCards.length));

  const isInitialLoading =
    (isMobileLoading && mobilePage === 1 && allCards.length === 0) || isFilterChanging;

  return {
    cards,
    isLoading: isMobileLoading,
    isError,
    hasMore,
    ref,
    isInitialLoading,
  };
};

'use client';

import { useState } from 'react';
import Banner from './_components/Banner';
import ButtonContainer from './_components/ButtonContainer';
import RecruitCard from './_components/RecruitCard';
import Pagination from './_components/Pagination';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;
  const dummyCards = Array.from({ length: 22 }, (_, i) => ({
    id: i + 1,
    title: '팀피셜 팀원 구해요',
    hashtag: '#프론트엔드',
    author: '목마른 햄스터',
    date: '2025.10.07',
    duration: '3개월',
    mode: '온/오프라인',
    dday: 14,
  }));
  const totalPages = Math.ceil(dummyCards.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = dummyCards.slice(startIndex, startIndex + cardsPerPage);

  // 상세 프로젝트 페이지 이동
  const router = useRouter();
  const handleCardClick = (id: number) => {
    router.push(`/project/${id}`);
  };

  return (
    <main className="flex flex-col pb-10">
      <div className="py-5">
        <Banner />
      </div>
      <div className="w-full pt-5">
        <ButtonContainer />
      </div>
      <div className="grid grid-cols-3 gap-4 py-5">
        {currentCards.map((card) => (
          <RecruitCard key={card.id} {...card} onClick={() => handleCardClick(card.id)} />
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </main>
  );
};

export default Page;

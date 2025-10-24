'use client';

import { useState } from 'react';
import Banner from './_components/Banner';
import ButtonContainer from './_components/ButtonContainer';
import Pagination from './_components/Pagination';
import RecruitCard from './_components/RecruitCard';

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;
  const dummyCards = Array.from({ length: 22 }, (_, i) => ({
    id: i + 1,
  }));
  const totalPages = Math.ceil(dummyCards.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = dummyCards.slice(startIndex, startIndex + cardsPerPage);

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
          <RecruitCard key={card.id} />
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

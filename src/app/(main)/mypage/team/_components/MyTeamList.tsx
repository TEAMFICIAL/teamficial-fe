import Pagination from '@/components/common/Pagination';
import MyTeamCard from './MyTeamCard';
import { useMyTeams } from '@/hooks/queries/useMyTeams';

interface MyTeamListProps {
  page: number;
  setPage: (page: number) => void;
}

const MyTeamList = ({ page, setPage }: MyTeamListProps) => {
  const { data } = useMyTeams(page - 1, 6);

  const teams = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <>
      <div className="body-6 flex border-b border-gray-300 bg-gray-100 py-4.5">
        <p className="w-25 text-center">순번</p>
        <p className="w-153 text-center">제목 및 내용</p>
        <p className="w-58 text-center">팀원 수</p>
      </div>
      <div className="mb-5 flex flex-col">
        {teams.length > 0 ? (
          teams.map((item, idx) => (
            <MyTeamCard key={item.postId} team={item} index={(page - 1) * 6 + idx + 1} />
          ))
        ) : (
          <p className="py-10 text-center text-gray-500">참여중인 팀이 없습니다.</p>
        )}
      </div>
      <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
    </>
  );
};

export default MyTeamList;

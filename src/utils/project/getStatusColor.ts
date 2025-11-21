export const getStatusColor = (status: string) => {
  switch (status) {
    case '매칭중':
      return 'bg-gray-200 text-gray-700';
    case '매칭 성공':
      return 'bg-blue-50 text-blue-200';
    case '매칭 실패':
      return 'bg-red-10 text-red-100';
    default:
      return 'bg-gray-200 text-gray-700';
  }
};

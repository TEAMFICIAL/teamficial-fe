const mapStatusToEng = (status: string) => {
  switch (status) {
    case '모집중':
      return 'OPEN';
    case '모집 마감':
      return 'CLOSED';
    default:
      return status;
  }
};

export default mapStatusToEng;

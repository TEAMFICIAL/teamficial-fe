interface LineButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const LineButton = ({ children, onClick }: LineButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="body-7 tablet:body-3 tablet:py-2 w-fit cursor-pointer border-b py-1"
    >
      {children}
    </button>
  );
};

export default LineButton;

interface LineButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const LineButton = ({ children, onClick }: LineButtonProps) => {
  return (
    <button type="button" onClick={onClick} className="body-3 w-fit cursor-pointer border-b py-2">
      {children}
    </button>
  );
};

export default LineButton;

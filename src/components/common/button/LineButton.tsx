interface LineButtonProps {
  children: React.ReactNode;
}

const LineButton = ({ children }: LineButtonProps) => {
  return (
    <button type="button" className="body-3 w-fit cursor-pointer border-b py-2">
      {children}
    </button>
  );
};

export default LineButton;

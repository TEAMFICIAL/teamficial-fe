interface LineButtonProps {
  children: React.ReactNode;
}

const LineButton = ({ children }: LineButtonProps) => {
  return <button className="body-3 w-fit border-b-1 py-2">{children}</button>;
};

export default LineButton;

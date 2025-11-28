import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="mx-auto flex w-full justify-center bg-gray-600 px-10 pb-10">
      <div className="flex w-[944px] items-center justify-between">
        <div className="body-6 flex flex-col text-gray-100">
          <Image src="/icons/footer-logo.svg" alt="logo" width={149} height={19} />
          <p className="pb-1">Teamficial@gmail.com</p>
          <p>© 2025.Teamficial. ALL rights reserved.</p>
        </div>
        <div className="flex flex-col justify-end gap-3">
          <div className="flex justify-end gap-3">
            <a href="mailto:Teamficial@gmail.com" aria-label="이메일 문의">
              <Image src="/icons/mail.svg" alt="mail" width={24} height={24} />
            </a>
            <a
              href="https://www.instagram.com/teamficial.official/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="인스타그램"
            >
              <Image src="/icons/instagram.svg" alt="instagram" width={24} height={24} />
            </a>
          </div>
          <div className="body-7 flex gap-4 text-gray-100">
            <p>서비스이용약관</p>
            <p>개인정보처리방침</p>
            <p>광고상품 소개</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

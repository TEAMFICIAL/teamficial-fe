import Image from 'next/image';

const Footer = () => {
  return (
    <>
      <footer className="tablet:hidden">
        <div className="-mx-4 flex flex-col gap-4 bg-gray-100 py-6">
          <div className="body-9 flex justify-between px-4">
            <div className="flex flex-col gap-1">
              <a
                href="https://forms.gle/roAeMsKP9SjdaNQG9"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                문의하기
              </a>
              <a>개인정보처리방침</a>
            </div>
            <div className="flex flex-col gap-1">
              <a>광고상품 소개</a>
              <a>서비스이용약관</a>
            </div>
          </div>
          <div className="flex justify-between px-4">
            <div>
              <p className="body-11 text-gray-500">Teamficial@gmail.com</p>
              <p className="body-11 text-gray-500">© 2025.Teamficial. ALL rights reserved.</p>
            </div>
            <a
              href="https://www.instagram.com/teamficial.official/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="인스타그램"
            >
              <Image
                src="/icons/mobile-instagram.svg"
                alt="instagram"
                width={24}
                height={24}
                className="justify-end"
              />
            </a>
          </div>
        </div>
      </footer>
      <footer className="tablet:flex mx-auto hidden w-full justify-center bg-gray-600 px-10 pb-10">
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
              <a
                href="https://forms.gle/roAeMsKP9SjdaNQG9"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                문의하기
              </a>
              <a>서비스이용약관</a>
              <a>개인정보처리방침</a>
              <a>광고상품 소개</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

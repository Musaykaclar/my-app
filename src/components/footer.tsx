'use client'

import Link from "next/link";
const Footer = () => {
    return (
      <footer className="w-full bg-[#fb7185]  px-6">
        <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
          <div className="flex text-black gap-x-6">
            <Link
              
              aria-label="De Marke Labs on LinkedIn"
              href="https://www.linkedin.com/company/de-marke-labs/"
              className="group"
            >
              {/* LinkedIn Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path
                  fill="#000"
                  d="M22 3.47v17.06c0 .39-.15.76-.43 1.04a1.471 1.471 0 01-1.04.43H3.47a1.47 1.47 0 01-1.04-.43A1.47 1.47 0 012 20.53V3.47c0-.39.15-.76.43-1.04A1.47 1.47 0 013.47 2h17.06c.39 0 .76.15 1.04.43.28.28.43.65.43 1.04ZM7.88 9.65H4.94v9.41h2.94V9.65ZM8.15 6.41c0-.22-.04-.44-.12-.65a1.47 1.47 0 00-.48-.62A1.47 1.47 0 006.41 4.71h-.06a2.14 2.14 0 100 4.29 1.47 1.47 0 001.2-.57c.17-.21.31-.45.4-.71.1-.26.14-.53.14-.81ZM19.06 13.34c0-2.83-1.8-3.93-3.59-3.93-.59-.03-1.17.1-1.69.36a4.47 4.47 0 00-1.3.99h-.08V9.65H9.65v9.41h2.94v-5c-.04-.51.12-1.01.44-1.4.32-.38.77-.63 1.27-.67h.11c.94 0 1.63.59 1.63 2.07v5h2.94v-5.72Z"
                />
              </svg>
            </Link>
  
          </div>
  
          <div className="flex flex-col items-center justify-start">
            <div className="mt-5 flex items-center justify-between gap-5 sm:mt-0 sm:gap-x-20">
              <img
                alt="iyzico"
                loading="lazy"
                width="150"
                height="50"
                src="/images/iyzico_ile_ode_colored_horizontal.129fbb51.png"
                style={{ color: "transparent" }}
              />
              <img
                alt="master-card-visa"
                loading="lazy"
                width="150"
                height="50"
                src="/images/Visa-Mastercard.6ddfec02.webp"
                style={{ color: "transparent" }}
              />
            </div>
            <p className="mt-6 text-center text-sm text-black-500 sm:mt-0 sm:text-left">
              Copyright © 2025{" "}
              <a href="http://demarkelabs.com" className="underline">
                De Marke Labs
              </a>
              , Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  
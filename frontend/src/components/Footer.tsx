import { Link } from "react-router-dom";
import { navigateTo } from "../utils/Constants.js";
import "../styles/stylesheet.css";
import externalLinkIcon from "../assets/svgs/external-link.svg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#3F4A36] text-[#FFFFFF]">
      <div className="flex flex-col xl:grid grid-cols-2 w-full px-[8vw] pt-[6vh] xl:pb-[16vh] pb-[6vh] gap-10">
        <div className="flex flex-col gap-2">
          <Link
            to="/"
            onClick={navigateTo}
            className="block w-fit text-[1.5rem] font-extrabold hover:cursor-pointer tracking-tight"
          >
            Nook
          </Link>
          <p className="opacity-60 font-[875rem] leading-6 max-w-[500px]">
            We help you track rent changes, compare listings, and spot better
            deals before they disappear. Smarter renting starts with knowing
            what changed.
          </p>
          <Link
            to="/settings"
            onClick={navigateTo}
            className="inline gap-x-1.5 items-center justify-center rounded-sm border border-[#FFFFFF] hover:border-[##ffffffd9] hover:shadow-lg px-[1.75rem] py-[0.65rem] mt-2 w-fit inherit bg-[#FFFFFF] hover:bg-[#3F4A36] backdrop-blur text-black hover:text-white text-[0.875rem] font-semibold tracking-tight no-underline cursor-pointer transition"
          >
            Settings
          </Link>
        </div>

        <div className="flex xl:flex-row flex-col justify-between w-fit xl:pt-[38px] pt-0 gap-[40px]">
          <div className="flex flex-col gap-1">
            <h4 className="font-bold ">Find a home</h4>
            <Link
              to="/listings"
              onClick={navigateTo}
              className="opacity-55 underline-offset-6 hover:underline hover:opacity-100 text-nowrap transition"
            >
              Explore listings
            </Link>
            <Link
              to="/watchlist"
              onClick={navigateTo}
              className="opacity-55 underline-offset-6 hover:underline hover:opacity-100 text-nowrap transition"
            >
              My watchlist
            </Link>
            <a
              href="https://www.cbreresidential.com/uk-resi/london-borough-by-borough-report"
              target="_blank"
              rel="noopener noreferrer"
              onClick={navigateTo}
              className="inline-flex items-center gap-1.5 opacity-55 underline-offset-6 hover:underline hover:opacity-100 text-nowrap transition"
            >
              Borough insights
              <img src={externalLinkIcon} alt="" aria-hidden="true" className="shrink-0" />
            </a>
            {/* <Link to="/partners" onClick={navigateTo}>Partners</Link> */}
          </div>

          <div className="flex flex-col gap-1">
            <h4 className="font-bold ">Renter tools</h4>
            <a
              href="https://www.london.gov.uk/programmes-strategies/housing-and-land/renting-home/private-renting/advice-renters"
              target="_blank"
              rel="noopener noreferrer"
              onClick={navigateTo}
              className="inline-flex items-center gap-1.5 opacity-55 underline-offset-6 hover:underline hover:opacity-100 text-nowrap transition"
            >
              Renting guide
              <img src={externalLinkIcon} alt="" aria-hidden="true" className="shrink-0" />
            </a>
            <a
              href="http://mylondon.news/all-about/housing"
              target="_blank"
              rel="noopener noreferrer"
              onClick={navigateTo}
              className="inline-flex items-center gap-1.5 opacity-55 underline-offset-6 hover:underline hover:opacity-100 text-nowrap transition"
            >
              Housing news
              <img src={externalLinkIcon} alt="" aria-hidden="true" className="shrink-0" />
            </a>
            <Link
              to="/calculator"
              onClick={navigateTo}
              className="opacity-55 underline-offset-6 hover:underline hover:opacity-100 text-nowrap transition"
            >
              Rent calculator
            </Link>
          </div>

          <div className="flex flex-col gap-1">
            <h4 className="font-bold ">Nook</h4>
            <Link
              to="/about"
              onClick={navigateTo}
              className="opacity-55 underline-offset-6 hover:underline hover:opacity-100 text-nowrap transition"
            >
              About
            </Link>
            {/* <Link to="/privacy" onClick={navigateTo} className="opacity-55 underline-offset-6 hover:underline hover:opacity-100 text-nowrap transition">Privacy</Link> */}
            <a
              href="https://joycekadibu.com/contact?source=SWE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 opacity-55 underline-offset-6 hover:underline hover:opacity-100 text-nowrap transition"
            >
              Contact
              <img src={externalLinkIcon} alt="" aria-hidden="true" className="shrink-0" />
            </a>
          </div>
        </div>
      </div>

      <hr className="border-top opacity-15 m-0" />

      <div className="md:flex column-reverse items-center justify-between flex-wrap w-full px-[8vw] py-[1.5rem] font-normal font-[#ffffff66] text-[0.8rem] opacity-80 gap-0.5 md:gap-2">
        <p>
          {/* © */}
          Nook Listings ({currentYear})
        </p>
        <a
          href="https://joycekadibu.com/technology"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-6 hover:underline transition"
        >
          Built by Joyce Kadibu
        </a>
      </div>
    </footer>
  );
}

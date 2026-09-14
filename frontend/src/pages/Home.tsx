import { Link } from "react-router-dom";
import { navigateTo } from "../utils/Constants";
import hero from "../assets/nook_hero.jpg";

export default function Home() {
  return (
    <section className="relative flex flex-col min-h-[100vh] justify-end text-[#FFFFFF] overflow-hidden">
      <img
        src={hero}
        alt="Hero"
        className="absolute inset-0 h-full w-full object-cover object-[center_30%] z-10"
      />
      <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.75)_100%)] z-20" />
      <div className="relative px-[8vw] pt-0 pb-[15vh] z-30">
        <h1 className="p-[0px] m-[0px] text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold leading-none tracking-tight">
          Smarter renting starts here
        </h1>
        <p className="mt-2 mb-8 text-[clamp(1rem,1.5vw,1.15rem)] text-[#ffffffd9] leading-tight">
          Compare listings over time so you can find the right place at the best
          possible deal.
        </p>
        <Link
          to="/listings"
          onClick={navigateTo}
          className="inline gap-x-1.5 items-center justify-center border border-[#FFFFFF8C] hover:border-[##ffffffd9] hover:shadow-lg rounded-sm px-[1.2rem] py-[0.65rem] w-fit inherit bg-[#FFFFFF14] hover:bg-[#FFFFFF2E] backdrop-blur text-white text-[0.875rem] font-semibold tracking-tight no-underline cursor-pointer transition"
        >
          Explore listings
        </Link>
      </div>
    </section>
  );
}

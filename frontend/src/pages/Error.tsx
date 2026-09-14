import { Link } from "react-router-dom";
import { navigateTo } from "../utils/Constants";

function Error() {
  return (
    <div className="flex flex-col min-h-[100vh] items-center justify-center text-[#111827]">
      <div className="flex flex-col items-center mt-[125px] mb-[150px]">
        <div className="text-sm text-gray-400 mb-[50px]">/404</div>
        <div className="font-bold text-xl tracking-tight transition-opacity">
          Wrong address!
        </div>
        <div className="text-sm text-gray-400">Find your way back home.</div>
        <Link
          to="/"
          onClick={navigateTo}
          className="inline gap-x-1.5 items-center justify-center border border-[#3F4A36] hover:border-[##ffffffd9] hover:shadow-xl hover:scale-102 rounded-sm px-[1.2rem] py-[0.65rem] mt-[50px] w-fit inherit bg-[#3F4A36] backdrop-blur text-white text-[0.875rem] font-semibold tracking-tight no-underline cursor-pointer transition"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default Error;

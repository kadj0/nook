import cover from "../assets/london-renting.jpg";

export default function About() {
  return (
    <div className="min-h-screen text-[#111827] pt-15 pb-20">
      <div className="px-[8vw] pt-16 pb-12">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="text-sm font-medium text-[#9ca3af] mb-3">/about</p>
          <h1 className="mx-auto max-w-xl text-[clamp(2rem,4.5vw,3rem)] font-extrabold tracking-tight leading-[1.1]">
            Built for renters, not algorithms
          </h1>
        </div>
      </div>
      <div className="mx-auto flex max-w-[760px] flex-col items-center px-[8vw]">
        <div className="w-full max-w-[380px]">
          <div className="aspect-square overflow-hidden rounded border border-[#ede9e6] shadow-sm">
            <img
              src={cover}
              alt="Renting in London"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col mt-10 max-w-[580px] text-center text-[0.95rem] text-[#374151] leading-relaxed  gap-5">
          <p className="">
            Renting can feel rushed and reactive. People often end up juggling
            saved links, screenshots, agent messages, viewing notes, and
            half-remembered prices across different tabs. I built Nook to bring
            that process into one place. It helps renters make sense of the
            London rental market, compare listings more clearly, and spot when a
            property starts to look like a better deal.
            <br />
            <br />
            Enjoy!
            <br />
          </p>
          <a
            href="https://joycekadibu.com/"
            target="blank"
            className="block items-center text-center text-sm font-semibold text-[#111827] hover:text-[#374151] gap-1.5 group transition-colors"
          >
            J x
          </a>
        </div>
      </div>
    </div>
  );
}

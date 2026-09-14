const fakeUser = {
  name: "CBF User",
  email: "demo@cbfacademy.com",
  borough: "Hackney",
  monthlyBudget: 2200,
  bedrooms: "2+",
  savedListings: 4,
  notes: 3,
};

function Settings() {
  return (
    <div className="min-h-screen bg-[#F8F7F2] px-[8vw] pb-20 pt-[calc(75px+4rem)] text-[#111827]">
      <div className="w-full">
        <p className="mb-3 text-sm font-medium text-[#6B7280]">/settings</p>
        <div className="mb-10 border-b border-[#3F4A36]/15 pb-8">
          <div>
            <h1 className="text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.1] tracking-tight">
              Account settings
            </h1>
            <p className="mt-4 max-w-xl text-[0.95rem] leading-6 text-[#4B5563]">
              Set your profile and search preferences for easy browsing.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <section className="rounded-sm border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">Profile</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
                  Name
                </div>
                <div className="mt-1 font-semibold">{fakeUser.name}</div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
                  Email
                </div>
                <div className="mt-1 font-semibold">{fakeUser.email}</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Settings;

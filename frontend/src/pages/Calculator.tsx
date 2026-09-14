import { useState } from "react";
import Tabs from "../components/Tabs/Tabs";
import { Tab } from "../components/Tabs/Tab";
import { Link } from "react-router-dom";
import { navigateTo } from "../utils/Constants";
import currencyPound from "../assets/svgs/currency-pound.svg";

function Calculator() {
  const [monthlyInput, setMonthlyInput] = useState("");
  const [annualInput, setAnnualInput] = useState("");

  const RENTER_MULTIPLIER = 30;
  const GUARANTOR_MULTIPLIER = 36;

  // annual income calculations
  const calculateMonthlyRentFromAnnualIncome = (annualIncome: number) => {
    return Math.round(annualIncome / RENTER_MULTIPLIER);
  };

  const calculateGuarantorAnnualIncomeFromAnnualIncome = (
    annualIncome: number,
  ) => {
    const monthlyRentBudget =
      calculateMonthlyRentFromAnnualIncome(annualIncome);
    return Math.round(monthlyRentBudget * GUARANTOR_MULTIPLIER);
  };

  // monthly rent calculations
  const calculateAnnualIncomeFromMonthlyRent = (monthlyRent: number) => {
    return Math.round(monthlyRent * RENTER_MULTIPLIER);
  };

  const calculateRequiredGuarantorIncomeFromMonthlyRent = (
    monthlyRent: number,
  ) => {
    return Math.round(monthlyRent * GUARANTOR_MULTIPLIER);
  };

  return (
    <div className="text-[#111827] pt-15 pb-20">
      <div className="px-[8vw] pt-16 pb-12">
        <div className="max-w-[760px] mx-auto text-center">
          <p className="text-sm font-medium text-[#9ca3af] mb-3">/calculator</p>
          <h1 className="mx-auto max-w-xl text-[clamp(2rem,4.5vw,3rem)] font-extrabold tracking-tight leading-[1.1]">
            Budget before you browse
          </h1>
        </div>
        <br />
        <div className="max-w-[760px] mx-auto text-center px-[8vw]">
          <p className="text-[0.95rem] text-[#374151] pb-8">
            Estimate what you can afford.
          </p>
          <Tabs>
            <Tab title="Monthly rent">
              <form className="flex flex-col items-center gap-6">
                <label className="input bg-white border border-black">
                  <img src={currencyPound} alt="" aria-hidden="true" className="h-[1em] opacity-50" />
                  <input
                    type="number"
                    value={monthlyInput}
                    onChange={(e) => setMonthlyInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    className="grow bg-white text-black placeholder:text-black"
                    placeholder="Monthly rent"
                  />
                </label>
                <div className="flex flex-col gap-2">
                  <div>
                    <div className="opacity-75">
                      You may need to earn around
                    </div>
                    <div>
                      <span className="font-bold text-[2rem]">
                        £
                        {monthlyInput
                          ? calculateAnnualIncomeFromMonthlyRent(
                              Number(monthlyInput),
                            ).toLocaleString()
                          : 0}
                      </span>
                      <span className="text-sm opacity-60"> / year</span>
                    </div>
                  </div>
                  <div>
                    <div className="opacity-75">
                      A guarantor may need to earn around
                    </div>
                    <div>
                      <span className="font-bold text-[2rem]">
                        £
                        {monthlyInput
                          ? calculateRequiredGuarantorIncomeFromMonthlyRent(
                              Number(monthlyInput),
                            ).toLocaleString()
                          : 0}
                      </span>
                      <span className="text-sm opacity-60"> / year</span>
                    </div>
                  </div>
                </div>
              </form>
            </Tab>
            <Tab title="Annual income">
              <form className="flex flex-col items-center gap-6">
                <label className="input bg-white border border-black">
                  <img src={currencyPound} alt="" aria-hidden="true" className="h-[1em] opacity-50" />
                  <input
                    type="number"
                    value={annualInput}
                    onChange={(e) => setAnnualInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }} 
                    className="grow bg-white text-black placeholder:text-black"
                    placeholder="Annual income"
                  />
                </label>
                <div className="flex flex-col gap-2">
                  <div>
                    <div className="opacity-75">
                      A sensible rent budget is around
                    </div>
                    <div>
                      <span className="font-bold text-[2rem]">
                        £
                        {annualInput
                          ? calculateMonthlyRentFromAnnualIncome(
                              Number(annualInput),
                            ).toLocaleString()
                          : 0}
                      </span>
                      <span className="text-sm opacity-60"> / month</span>
                    </div>
                  </div>
                  <div>
                    <div className="opacity-75">
                      A guarantor may need to earn around
                    </div>
                    <div>
                      <span className="font-bold text-[2rem]">
                        £
                        {annualInput
                          ? calculateGuarantorAnnualIncomeFromAnnualIncome(
                              Number(annualInput),
                            ).toLocaleString()
                          : 0}
                      </span>
                      <span className="text-sm opacity-60"> / year</span>
                    </div>
                  </div>
                </div>
              </form>
            </Tab>
          </Tabs>
          <br />
          <Link
            to="/listings"
            onClick={navigateTo}
            className="flex flex-row items-center text-center justify-center mx-auto border border-[#3F4A36] hover:border-gray-300 hover:shadow-lg rounded-sm px-[1.2rem] py-[0.65rem] w-fit inherit bg-[#3F4A36] hover:bg-[#FFFFFF] backdrop-blur text-white hover:text-black text-[0.875rem] font-semibold tracking-tight no-underline cursor-pointer transition gap-2"
          >
            Budget within this range
          </Link>
          <p className="text-xs pt-8 opacity-50">
            This is a rough guide based on the 30x income rule. It does not
            include bills, council tax, deposit, moving costs, debt, savings, or
            personal spending. Find out more about{" "}
            <a
              href="https://www.rightmove.co.uk/guides/renter/preparing-to-rent/renter-affordability/"
              target="blank"
              className="underline underline-offset-4"
            >
              renter affordability
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Calculator;

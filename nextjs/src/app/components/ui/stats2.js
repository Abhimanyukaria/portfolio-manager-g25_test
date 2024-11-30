'use client'

import { useEffect } from "react";
import { CountUp } from "countup.js";

export default function Stats2() {
  useEffect(() => {
    const numbers = document.querySelectorAll("[countTo]");

    numbers.forEach((number) => {
      const ID = number.getAttribute("id");
      const value = number.getAttribute("countTo");

      let countUp;
      if (number.hasAttribute("data-decimal")) {
        const options = {
          decimalPlaces: 1,
        };
        countUp = new CountUp(ID, value, options);
      } else {
        countUp = new CountUp(ID, value);
      }

      if (!countUp.error) {
        countUp.start();
      } else {
        console.error(countUp.error);
        number.innerHTML = value;
      }
    });
  }, []);

  return (
    <div className="bg-white">
      <div className="container flex flex-col mx-auto bg-white">
        <div className="w-full">
          <div className="container flex flex-col items-center gap-16 mx-auto my-32">
            <div className="grid w-full grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-y-8">
              <div className="flex flex-col items-center">
                <h3 className="text-5xl font-extrabold leading-tight text-center text-dark-grey-900">
                  <span id="countto1" countTo="250"></span>+
                </h3>
                <p className="text-base font-medium leading-7 text-center text-dark-grey-600">
                  Successful Projects
                </p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-5xl font-extrabold leading-tight text-center text-dark-grey-900">
                  $<span id="countto2" countTo="12"></span>m
                </h3>
                <p className="text-base font-medium leading-7 text-center text-dark-grey-600">
                  Annual Revenue Growth
                </p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-5xl font-extrabold leading-tight text-center text-dark-grey-900">
                  <span id="countto3" countTo="2600" data-decimal="1"></span>k+
                </h3>
                <p className="text-base font-medium leading-7 text-center text-dark-grey-600">
                  Global Partners
                </p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-5xl font-extrabold leading-tight text-center text-dark-grey-900">
                  <span id="countto4" countTo="18000"></span>+
                </h3>
                <p className="text-base font-medium leading-7 text-center text-dark-grey-600">
                  Daily Website Visitors
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 my-5">
        <div className="w-full max-w-full sm:w-3/4 mx-auto text-center">
          <p className="text-sm text-slate-500 py-1">
            Tailwind CSS Component from{" "}
            <a
              href="https://www.loopple.com/theme/motion-landing-library?ref=tailwindcomponents"
              className="text-slate-700 hover:text-slate-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              Motion Landing Library
            </a>{" "}
            by{" "}
            <a
              href="https://www.loopple.com"
              className="text-slate-700 hover:text-slate-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              Loopple Builder
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

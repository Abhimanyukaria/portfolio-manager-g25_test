import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <Link href="#updates" className="inline-flex space-x-6" aria-label="Learn about the latest updates">
              <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/10">
                Latest Update
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                <span>New AI-powered insights</span>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </span>
            </Link>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Smart Portfolio Management for Modern Investors
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Take control of your investments with Investalyze. Our advanced analytics and real-time insights help you make informed decisions and maximize returns.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <a
              href="/api/auth/login"
              aria-label="Get started with Investalyze"
            >
              <button class="cssbuttons-io-button"> Get started
                <div class="icon">
                  <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
                </div>
              </button>
            </a>
            
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <img
              src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80&w=2340"
              alt="Screenshot of Investalyze dashboard, showcasing analytics and insights."
              width={2432}
              height={1442}
              loading="lazy"
              className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <a href="#updates" className="inline-flex space-x-6" aria-label="Learn about the latest updates">
              <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/10">
                Latest Update
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                <span>New AI-powered insights</span>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </span>
            </a>
            </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Smart Portfolio Management for Modern Investors
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Take control of your investments with Investalyze. Our advanced analytics and real-time insights help you make informed decisions and maximize returns.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <a
              href="#get-started"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              aria-label="Get started with Investalyze"
            ></a>
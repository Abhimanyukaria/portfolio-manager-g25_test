'use client'

import React from 'react';
import { useState } from 'react';

import Features from '../components/ui/Features';
import Hero from '../components/ui/hero';
import Navbar from '../components/ui/Navbar';
import Stats from '../components/ui/stats';
import Testimonials from '../components/ui/testimonial';

import Link from 'next/link';
import { HeaderJs } from '../components/header';
import Stats2 from '../components/ui/stats2';


function App() {
  return (
    <div>
      <div className=" container2">
        {/* <Navbar /> */}

        <HeaderJs className=" "/>
        <main>
          <Hero />
          <Features />
          <Stats />
          <Testimonials />
          {/* <Stats2/> */}

          {/* CTA Section */}
          <section id="cta" className="bg-teal-600">
            <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ready to transform your investments?
                  <br />
                  Start with Investalyze today.
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-100">
                  Join thousands of investors who trust Investalyze for portfolio management.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
              href="/api/auth/login"
              aria-label="Get started with Investalyze"
            >
              <button className="cssbuttons-io-button"> Get started
                <div className="icon">
                  <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
                </div>
              </button>
            </a>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
              <div className="mt-8 md:order-1 md:mt-0">
                <p className="text-center text-xs leading-5 text-gray-500">
                  &copy; {new Date().getFullYear()} Investalyze. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;



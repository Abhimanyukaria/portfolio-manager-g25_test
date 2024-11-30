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


function App() {
  return (
    <div>
      <div className="bg-white">
        {/* <Navbar /> */}

        <HeaderJs className=""/>
        <main>
          <Hero />
          <Features />
          <Stats />
          <Testimonials />

          {/* CTA Section */}
          <section id="cta" className="bg-indigo-600">
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
                  <Link
                    href="#"
                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Get started
                  </Link>
                  <Link href="#" className="text-sm font-semibold leading-6 text-white">
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
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



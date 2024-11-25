'use client'

import React, { useState,useEffect } from 'react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"

import { useUser } from '@auth0/nextjs-auth0/client';

import Link from 'next/link';


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { ChartBarIcon, MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { Button } from './ui/button'
import { Input } from './ui/input'

import { usePathname } from 'next/navigation'
import { StockSearchJsx } from '@/components/navbar-stock-search';


import { useRouter } from 'next/router'





export function HeaderJs() {

  const { user, error, isLoading } = useUser();

  // const router = useRouter();


  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [dashboard, setDashboard] = useState(false)
  const [stock, setStock] = useState('')

  // useEffect(() => {

  //   window.location.href('/search-stock/'+ stock);
  // }
  // , [stock])


  console.log(stock);

  const pathname = usePathname();
    console.log(pathname);

    useEffect(() => {
      

      if(pathname == '/dashboard') setDashboard(true);
  
    }, [pathname])
 
  useEffect(() => {
    setIsLoggedIn(true);
    // setUserName(user.nickname);/

  }, [user])


  return (
    (<header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            {/* <ChartBarIcon className="h-8 w-8 text-blue-600 mr-2" /> */}
            <img src="/logo.jpeg" className="h-12 w-auto mr-2 -ml-6" />
            <span className="font-bold text-xl text-gray-900 ">INVESTALYZE</span>
          </div>
          
          <div className={`flex items-center space-x-4 text-lg`}>
            <Link href="/dashboard">
            <Button variant="ghost" className={`${dashboard? "text-blue-600 hover:underline": " text-gray-600 hover:text-gray-900 "} text-base `}>
              <ChartBarIcon className={`h-5 w-5 mr-2 `} />
              Dashboard
            </Button>
            </Link>
            
            <StockSearchJsx setStock={setStock}/>
            {/* <div className="relative">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <Input
                type="search"
                placeholder="Search stocks..."
                className="pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div> */}
            
            {isLoggedIn ? (
              <Link href="/profile" >
              <Button   className="bg-black text-gray-100 hover:text-gray-200 hover:ring-2 ring-green-100">
              <UserCircleIcon className="h-5 w-5 mr-2" />
                My Profile
              </Button>
              </Link>
      
            ) : (
              <a href="/api/auth/login" >
              <Button>
                <UserCircleIcon className="h-5 w-5 mr-2" />
                Login
              </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </header>)
  );
}
'use client'

import React, { useState,useEffect } from 'react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"

import { useUser } from '@auth0/nextjs-auth0/client';


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

export function HeaderJs() {

  const { user, error, isLoading } = useUser();


  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('John Doe')

  const toggleLogin = () => {
    
    setIsLoggedIn(!isLoggedIn)
  }

  useEffect(() => {
    setIsLoggedIn(true);
    setUserName(user.nickname);

  }, [user])


  return (
    (<header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <ChartBarIcon className="h-8 w-8 text-blue-600 mr-2" />
            <span className="font-bold text-xl text-gray-900">Investalyze</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <ChartBarIcon className="h-5 w-5 mr-2" />
              Dashboard
            </Button>
            
            <div className="relative">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <Input
                type="search"
                placeholder="Search stocks..."
                className="pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            {isLoggedIn ? (
              <a href="/profile" >
              <Button   className="bg-black text-gray-100 hover:text-gray-200 hover:ring-2 ring-green-100">
                My Profile
              </Button>
              </a>
      
            ) : (
              <Button onClick={toggleLogin}>
                <UserCircleIcon className="h-5 w-5 mr-2" />
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>)
  );
}
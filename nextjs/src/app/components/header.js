'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChartBarIcon, MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline'

export function HeaderJs() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('John Doe')

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn)
  }

  return (
    (<header className="bg-white shadow-sm">
     
    </header>)
  );
}
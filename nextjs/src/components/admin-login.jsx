'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AdminDashboardComponent } from './admin-dashboard'

// Import your AdminDashboard component here
// import AdminDashboard from './admin-dashboard'

export function AdminLoginComponent() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === '123#abcd') {
      setIsAuthenticated(true)
    } else {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000) // Hide error after 3 seconds
    }
  }

  if (isAuthenticated) {
    return <AdminDashboardComponent/>
    // Return your actual AdminDashboard component here
    // return <AdminDashboard />
  }

  return (
    (<div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Dialog open={true}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Admin Login</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required />
            </div>
            {showError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Incorrect password. Please try again.
                </AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>)
  );
}
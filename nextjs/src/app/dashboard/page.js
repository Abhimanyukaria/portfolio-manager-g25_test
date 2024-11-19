'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";

function MoreVerticalIcon(props) {
    return (
      (<svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="5" r="1" />
        <circle cx="12" cy="19" r="1" />
      </svg>)
    );
}

const DashboardJs = () => {
    return (
        (<div className="min-h-screen bg-gray-100 p-8">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Demo Investments - 1</h1>
                <div className="flex gap-2">
                    <Button>Add Investments</Button>
                    <Button variant="outline">
                        <MoreVerticalIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>

        <div className="mb-8 flex items-center justify-between rounded-lg bg-white p-4 shadow">
            <div>
                <div className="text-sm text-gray-500">CURRENT VALUE</div>
                <div className="text-2xl font-bold">₹5.09 Lakh</div>
                <div className="text-sm text-gray-500">₹1.76 Lakh Invested</div>
            </div>
            <div>
                <div className="text-sm text-gray-500">1 DAY</div>
                <div className="text-xl font-bold text-green-500">₹+2,862</div>
                <div className="text-sm text-green-500">0.57%</div>
            </div>
            <div>
                <div className="text-sm text-gray-500">ALL TIME RETURNS</div>
                <div className="text-xl font-bold text-green-500">₹+3.50 Lakh</div>
                <div className="text-sm text-green-500">14.8% p.a.</div>
            </div>
        </div>
        
        <Tabs defaultValue="dashboard" className="mb-8">
            <TabsList>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                <TabsTrigger value="tax-report">Tax Report</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
            </TabsList>
        </Tabs> 

        

        </div>
            
        )
    );
  };
  
  export default DashboardJs;
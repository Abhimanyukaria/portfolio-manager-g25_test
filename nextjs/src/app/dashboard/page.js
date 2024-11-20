'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";

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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>Performance</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <svg viewBox="0 0 100 100" className="h-full w-full">
                    <path
                        d="M0,80 Q20,70 40,75 T80,60 T100,40"
                        fill="none"
                        stroke="#4f46e5"
                        strokeWidth="2" />
                    </svg>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Allocation</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center">
                    <svg width="200" height="200" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="#4f46e5" />
                        <circle cx="50" cy="50" r="30" fill="#ffffff" />
                        <text
                        x="50"
                        y="50"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#4f46e5"
                        fontSize="10">
                        95.6%
                        </text>
                    </svg>
                </div>
                <div className="mt-4 flex justify-between text-sm">
                    <div>Equity 95.6%</div>
                    <div>Debt 0.47%</div>
                    <div>Others 0.93%</div>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Transactions</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="h-[200px]">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                    <rect x="10" y="20" width="10" height="60" fill="#4f46e5" />
                    <rect x="30" y="30" width="10" height="50" fill="#4f46e5" />
                    <rect x="50" y="40" width="10" height="40" fill="#4f46e5" />
                    <rect x="70" y="50" width="10" height="30" fill="#4f46e5" />
                </svg>
            </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Estimated Tax</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="h-[200px]">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                    <rect x="10" y="40" width="80" height="20" fill="#4f46e5" />
                    <rect x="10" y="70" width="40" height="20" fill="#10b981" />
                </svg>
            </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Returns by Investment Type</CardTitle>
            </CardHeader>
            <CardContent>
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="1 Day" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1day">1 Day</SelectItem>
                    <SelectItem value="1week">1 Week</SelectItem>
                    <SelectItem value="1month">1 Month</SelectItem>
                </SelectContent>
            </Select>
            <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                    <span>Mutual Funds</span>
                    <span className="text-green-500">₹+4,562 (1.45%)</span>
                </div>
                <div className="flex justify-between">
                    <span>Stocks</span>
                    <span className="text-red-500">₹-1,700 (-0.92%)</span>
                </div>
            </div>
            </CardContent>
        </Card>

        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>Top Gainers & Losers</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                <h3 className="mb-2 font-semibold">Top Gainers</h3>
                <div className="rounded bg-green-100 p-2">
                    <div className="font-semibold">Axis ELSS Tax Saver-G</div>
                    <div className="text-green-600">₹4,562 (1.45%)</div>
                </div>
                </div>
                <div>
                <h3 className="mb-2 font-semibold">Top Losers</h3>
                <div className="rounded bg-red-100 p-2">
                    <div className="font-semibold">Infosys</div>
                    <div className="text-red-600">₹-1,675 (-0.85%)</div>
                </div>
                </div>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>VR's Analysis</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                <div>
                    <div className="font-semibold">Quality Score</div>
                    <div className="h-2 w-full rounded bg-gray-200">
                        <div className="h-2 w-3/4 rounded bg-green-500"></div>
                    </div>
                </div>
                <div>
                    <div className="font-semibold">Asset Allocation</div>
                    <div>95.6% of your investments are in equities.</div>
                </div>
                <div>
                    <div className="font-semibold">Equity Sector Diversity</div>
                    <div>You have invested a high amount in just one sector. You should be more diversified.</div>
                </div>
                </div>
            </CardContent>
        </Card>

        </div>

        </div>
            
        )
    );
  };
  
  export default DashboardJs;
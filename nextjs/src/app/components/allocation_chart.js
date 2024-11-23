'use client';

import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

// Import necessary Chart.js components
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const AllocationCard = ({ stockDetails ,transactions}) => {
    const [chartData, setChartData] = useState(null);

    console.log("yoyo",stockDetails,transactions);

    useEffect(() => {
        // Extract and calculate industry allocation
        const calculateIndustryAllocations = () => {
            const industryAllocations = {};

            stockDetails.forEach(({ stockId, result }) => {

                
                const industry = result.summaryProfile.industry;
                const marketCap = result.price.marketCap || 0;

                if (industryAllocations[industry]) {
                    industryAllocations[industry] += marketCap;
                } else {
                    industryAllocations[industry] = marketCap;
                }
            });

            
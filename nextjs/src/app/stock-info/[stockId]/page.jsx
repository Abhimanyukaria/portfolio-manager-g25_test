'use client'

import React, { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { StarIcon } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { usePathname } from 'next/navigation';
import MyChart from '@/app/components/MyChart';
import Navbar from '@/app/components/ui/Navbar';
import { HeaderJs } from '@/app/components/header';
import MyLoader from '@/app/components/loader';

import copy from 'clipboard-copy';




import Link from 'next/link';



function calculateLiquidity(summaryDetail) {
    const regularMarketVolume = summaryDetail.regularMarketVolume;
    const averageDailyVolume10Day = summaryDetail.averageDailyVolume10Day;
    const marketCap = summaryDetail.marketCap;
    const regularMarketPrice = summaryDetail.regularMarketPreviousClose;
  
    // Liquidity Ratio
    const liquidityRatio = regularMarketVolume / averageDailyVolume10Day;
  
    // Volume Turnover Ratio
    // const volumeTurnoverRatio = (regularMarketVolume * regularMarketPrice) / marketCap;
  
    return liquidityRatio.toFixed(0);
  }

  function renderStars(value) {
    const starCount = Math.round(value * 5); // Convert percentage (0-1 scale) to stars (1-5)
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`h-6 w-6 ${
              star <= starCount ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  }
  

  


const StockInfo = () => {
  const pathname = usePathname();
  const stockId = pathname.split("/")[2]; // Extract stockId from the URL
  const [stockDetails, setStockDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [insight, setInsight] = useState(null);

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await copy('https://portfolio-manager-g25.vercel.app/stock-info/'+stockId);
      setIsCopied(true);
    } catch (error) {
      console.error('Failed to copy text to clipboard', error);
    }
  };


  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        const response = await fetch('/api/all-stock-details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stockIds: [stockId] }),
        });
        const data = await response.json();
        setStockDetails(data.stockDetails[0]); // Get the first stock detail
        console.log('Fetched stock details:', data.stockDetails[0].result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stock details:', error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    const fetchInsights = async () => {
        try {
          const response = await fetch('/api/insights', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stockId }),
          });
          const data = await response.json();
          setInsight(data);
          console.log('Fetched stock insights:', data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching stock insights:', error);
          setLoading(false);
          
        }
      };



    fetchStockDetails();
    fetchInsights();
  }, [stockId]);

  if (loading) {
    return <MyLoader/>
  }

  if (!stockDetails) {
    return <div>Error fetching stock details</div>;
  }

  // Extract data from the stockDetails response
  const {
    result: { price, summaryDetail, summaryProfile },
  } = stockDetails;

  const liquidityRatio = calculateLiquidity(summaryDetail);


  


  const { instrumentInfo, companySnapshot } = insight || {};


  return (
    <div className=" mx-auto px-4">

        <HeaderJs/>
      <div className="flex justify-between items-center mb-4 mt-6">
        <div>
          <h1 className="text-2xl font-bold">{price.longName || price.shortName}</h1>
          <div className="flex items-center">
            <span className="text-3xl font-bold mr-2">${price.regularMarketPrice.toFixed(2)}</span>
            <span
              className={`${
                price.regularMarketChange > 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {price.regularMarketChange > 0 ? '+' : ''}
              ${price.regularMarketChange.toFixed(2)} (
              {price.regularMarketChangePercent.toFixed(2)}%)
            </span>
          </div>
          <p className="text-sm text-gray-500">
            As on {new Date(price.regularMarketTime).toLocaleString()}
          </p>
        </div>
        <div className='mx-5'>
        <Button onClick={handleCopyClick} variant ={isCopied? "greeny":"blacky"}>
        {isCopied ? 'Copied!' : 'Share Link'}
      </Button>
        </div>
      </div>

       {/* Insights Card */}
   

      {/* Share Price Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{price.longName || price.shortName} Share Price</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div>
              <span className="font-semibold">High:</span> ${summaryDetail.dayHigh.toFixed(2)}
              <span className="font-semibold ml-4">Low:</span> ${summaryDetail.dayLow.toFixed(2)}
             
            </div>
           
          </div>
          <MyChart stockId={stockId} startDate="2019-01-01" />
        </CardContent>
      </Card>

      {/* Stock Range Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Stock Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="font-semibold mb-2">Today&apos;s Range</p>
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{
                      width: `${
                        ((price.regularMarketPrice - summaryDetail.dayLow) /
                          (summaryDetail.dayHigh - summaryDetail.dayLow)) *
                        100
                      }%`,
                    }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  ></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span>${summaryDetail.dayLow.toFixed(2)}</span>
                  <span>${summaryDetail.dayHigh.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div>
              <p className="font-semibold mb-2">52 Week Range</p>
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{
                      width: `${
                        ((price.regularMarketPrice - summaryDetail.fiftyTwoWeekLow) /
                          (summaryDetail.fiftyTwoWeekHigh - summaryDetail.fiftyTwoWeekLow)) *
                        100
                      }%`,
                    }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  ></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span>${summaryDetail.fiftyTwoWeekLow.toFixed(2)}</span>
                  <span>${summaryDetail.fiftyTwoWeekHigh.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div>
              <p className="font-semibold mb-2">Liquidity</p>
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${liquidityRatio*100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                  ></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Low</span>
                  <span>Moderate</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fundamentals */}
      <Card>
        <CardHeader>
          <CardTitle>Fundamentals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Market Cap</p>
              <p className="font-semibold">${summaryDetail.marketCap.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">P/E Ratio</p>
              <p className="font-semibold">{summaryDetail.trailingPE || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">P/B Ratio</p>
              <p className="font-semibold">{summaryDetail.priceToBook || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Industry P/E</p>
              <p className="font-semibold">{summaryDetail.forwardPE || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">ROE</p>
              <p className="font-semibold">42.38%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">ROCE</p>
              <p className="font-semibold">-</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Div. Yield</p>
              <p className="font-semibold">{summaryDetail.dividendYield || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Book Value</p>
              <p className="font-semibold">{summaryDetail.bookValue || 'N/A'}</p>
            </div>
          </div>
        </CardContent>
      </Card>


      <Card className="mb-6 mt-6">
        <CardHeader>
          <CardTitle>Stock Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className=" grid grid-cols-3 gap-4">
            {/* Technical Events */}
            {instrumentInfo?.technicalEvents && (
              <div className='col-span-2'>
                <p className="text-sm text-gray-500">Technical Outlook</p>
                <p className="font-semibold">{instrumentInfo.technicalEvents.shortTermOutlook.stateDescription}</p>
                <p className="text-sm text-gray-500">
                  Short-Term: <span className="font-semibold">{instrumentInfo.technicalEvents.shortTermOutlook.direction}</span>
                </p>
                
                <p className="text-sm text-gray-500">
                  Long-Term: <span className="font-semibold">{instrumentInfo.technicalEvents.longTermOutlook.direction}</span>
                </p>
              </div>
            )}

            {/* Valuation */}
            {instrumentInfo?.valuation && (
              <div>
                <p className="text-sm text-gray-500">Valuation</p>
                <p className="font-semibold">
                  {instrumentInfo.valuation.description} ({instrumentInfo.valuation.discount} discount)
                </p>
              </div>
            )}

            {/* Innovativeness */}
            {companySnapshot?.company?.innovativeness && (
              <div>
                <p className="text-sm text-gray-500">Innovativeness</p>
                {renderStars(companySnapshot.company.innovativeness)}
              </div>
            )}

            {/* Hiring */}
            {companySnapshot?.company?.hiring && (
              <div>
                <p className="text-sm text-gray-500">Hiring Activity</p>
                {renderStars(companySnapshot.company.hiring)}
              </div>
            )}

            {/* Insider Sentiments */}
            {companySnapshot?.company?.insiderSentiments && (
              <div>
                <p className="text-sm text-gray-500">Insider Sentiments</p>
                {renderStars(companySnapshot.company.insiderSentiments)}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Company Profile */}
      <Card className="mb-6 mt-6">
  <CardHeader>
    <CardTitle>Company Details</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-sm text-gray-500">Address</p>
        <p className="font-semibold">
          {`${summaryProfile.address1}, ${summaryProfile.city}, ${summaryProfile.state}, ${summaryProfile.zip}, ${summaryProfile.country}`}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Phone</p>
        <p className="font-semibold">{summaryProfile.phone}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Website</p>
        <Link
          href={summaryProfile.website ?summaryProfile.website :"#"}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-500 hover:underline"
        >
          {summaryProfile.website}
        </Link>
      </div>
      <div>
        <p className="text-sm text-gray-500">Industry</p>
        <p className="font-semibold">{summaryProfile.industry}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Sector</p>
        <p className="font-semibold">{summaryProfile.sector}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Employees</p>
        <p className="font-semibold">{summaryProfile.fullTimeEmployees.toLocaleString()}</p>
      </div>
      <div className="col-span-2">
        <p className="text-sm text-gray-500">Business Summary</p>
        <p className="text-justify">{summaryProfile.longBusinessSummary}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Investor Relations</p>
        <Link
          href={summaryProfile.irWebsite ? summaryProfile.irWebsite : "#" }
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-500 hover:underline"
        >
          Investor Relations Page
        </Link>
      </div>
    </div>
  </CardContent>
</Card>

    </div>
  );
};

export default StockInfo;

import { LineChart, PieChart, Bell, Shield } from 'lucide-react';

export default function Features() {
  const features = [
    {
      name: 'Real-time Analytics',
      description: 'Get instant insights with our advanced real-time analytics dashboard.',
      icon: LineChart,
    },
    {
      name: 'Portfolio Diversification',
      description: 'Smart allocation suggestions to optimize your investment portfolio.',
      icon: PieChart,
    },
    {
      name: 'Instant Alerts',
      description: 'Stay informed with customizable alerts for price movements and market events.',
      icon: Bell,
    },
    {
      name: 'Bank-grade Security',
      description: 'Your investments are protected with enterprise-level security measures.',
      icon: Shield,
    },
  ];

  return (
    <div id="features" className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Advanced Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to manage your portfolio
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Powerful tools and insights to help you make informed investment decisions
          </p>
          
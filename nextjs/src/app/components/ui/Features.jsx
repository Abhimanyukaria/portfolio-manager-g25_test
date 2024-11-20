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
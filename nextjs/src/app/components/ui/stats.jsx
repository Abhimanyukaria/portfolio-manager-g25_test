import { Users, TrendingUp, Award, Shield } from 'lucide-react';
import CountUp from 'react-countup';

const stats = [
  { label: 'Active Users', value: 100000, suffix: 'K+', icon: Users },
  { label: 'Portfolio Growth', value: 32, suffix: '%', icon: TrendingUp },
  { label: 'Industry Awards', value: 15, suffix: '+', icon: Award },
  { label: 'Security Rating', value: 'A+', icon: Shield },
];
export default function Stats() {
    return (
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Trusted by investors worldwide
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Join thousands of successful investors who trust Investalyze
              </p>
            </div>
  
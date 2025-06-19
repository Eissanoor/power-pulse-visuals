
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircularProgress } from './CircularProgress';
import { Info } from 'lucide-react';

export const HealthSummary = () => {
  const healthMetrics = [
    { title: 'Health Index', value: 2.48, max: 5, color: 'text-yellow-600', bgColor: 'bg-yellow-500' },
    { title: 'Criticality Index', value: 3, max: 5, color: 'text-yellow-600', bgColor: 'bg-yellow-500' },
    { title: 'Risk Index', value: 7.44, max: 10, color: 'text-green-600', bgColor: 'bg-green-500' },
  ];

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-800">Health Summary</CardTitle>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
            View All
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-6">
          {healthMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-3">
                <CircularProgress 
                  value={metric.value} 
                  max={metric.max} 
                  size={80}
                  strokeWidth={6}
                  className={metric.bgColor}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-slate-700">{metric.value}</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <h3 className="text-sm font-medium text-slate-600">{metric.title}</h3>
                <Info className="h-3 w-3 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

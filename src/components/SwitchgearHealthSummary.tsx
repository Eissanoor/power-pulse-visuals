
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircularProgress } from './CircularProgress';

export const SwitchgearHealthSummary = () => {
  const healthMetrics = [
    { title: 'Health Index - HI', value: 0.4, max: 5, color: 'text-orange-600', bgColor: 'bg-orange-500', status: 'ALARM' },
    { title: 'Criticality Index - CI', value: 3, max: 5, color: 'text-red-600', bgColor: 'bg-red-500', status: 'NO ALARM' },
    { title: 'Risk Index - RI', value: 1.2, max: 5, color: 'text-green-600', bgColor: 'bg-green-500', status: 'WARN' },
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
              <h3 className="text-sm font-medium text-slate-600 mb-2">{metric.title}</h3>
              <span className={`text-xs px-2 py-1 rounded font-medium ${
                metric.status === 'ALARM' ? 'bg-red-100 text-red-700' :
                metric.status === 'WARN' ? 'bg-orange-100 text-orange-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {metric.status}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

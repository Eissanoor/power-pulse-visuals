
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Info } from 'lucide-react';

export const OilHealthIndex = () => {
  const data = [
    { name: 'Good', value: 40, color: '#22c55e' },
    { name: 'Fair', value: 25, color: '#eab308' },
    { name: 'Poor', value: 20, color: '#f97316' },
    { name: 'Critical', value: 15, color: '#ef4444' },
  ];

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-800">Oil Health Index</CardTitle>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
            View All
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={data}
                    cx={100}
                    cy={100}
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-700">3.3</div>
                  <div className="text-sm text-slate-500">HI</div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Info className="h-4 w-4 text-slate-400" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-red-600 font-semibold text-lg">HI-2: 33.33%</div>
                <div className="text-red-500 text-sm mt-1">Critical Level</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-green-50 p-2 rounded text-center">
                <div className="text-green-700 font-medium">HI-1</div>
                <div className="text-green-600">71.88%</div>
              </div>
              <div className="bg-red-50 p-2 rounded text-center">
                <div className="text-red-700 font-medium">HI-2</div>
                <div className="text-red-600">40%</div>
              </div>
            </div>
            
            <div className="flex items-center gap-1 justify-center">
              <Info className="h-4 w-4 text-slate-400" />
              <span className="text-xs text-slate-500">Action Generated</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Thermometer } from 'lucide-react';

export const TemperatureMonitor = () => {
  const temperatureData = [
    { time: '00:00', temp: 72 },
    { time: '04:00', temp: 74 },
    { time: '08:00', temp: 78 },
    { time: '12:00', temp: 82 },
    { time: '16:00', temp: 85 },
    { time: '20:00', temp: 80 },
    { time: '24:00', temp: 75 },
  ];

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-orange-500" />
          Temperature Monitor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
              <div className="text-orange-600 text-sm font-medium">Current</div>
              <div className="text-orange-700 text-xl font-bold">78°C</div>
            </div>
            <div className="bg-red-50 p-3 rounded-lg border border-red-200">
              <div className="text-red-600 text-sm font-medium">Max Today</div>
              <div className="text-red-700 text-xl font-bold">85°C</div>
            </div>
          </div>
          
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={temperatureData}>
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#64748b' }}
                />
                <YAxis hide />
                <Line 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="#f97316" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

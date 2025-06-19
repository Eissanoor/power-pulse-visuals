
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Gauge, Info } from 'lucide-react';

export const NEIMonitor = () => {
  const neiData = [
    { date: 'Jan', oil: 0.4, paper: 0.3 },
    { date: 'Feb', oil: 0.5, paper: 0.4 },
    { date: 'Mar', oil: 0.3, paper: 0.2 },
    { date: 'Apr', oil: 0.6, paper: 0.5 },
    { date: 'May', oil: 0.4, paper: 0.3 },
  ];

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Gauge className="h-5 w-5 text-blue-500" />
            NEI (Normalized Energy Intensity)
          </CardTitle>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
            View All
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-600">NEI Oil Latest</span>
                <Info className="h-3 w-3 text-slate-400" />
              </div>
              <span className="text-sm text-slate-500">Δ NEI Oil</span>
            </div>
            <div className="text-center py-4">
              <div className="text-3xl font-bold text-slate-700">--</div>
            </div>
            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={neiData}>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#64748b' }}
                  />
                  <YAxis hide />
                  <Line 
                    type="monotone" 
                    dataKey="oil" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-600">NEI Paper Latest</span>
                <Info className="h-3 w-3 text-slate-400" />
              </div>
              <span className="text-sm text-slate-500">Δ NEI Paper</span>
            </div>
            <div className="text-center py-4">
              <div className="text-3xl font-bold text-slate-700">--</div>
            </div>
            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={neiData}>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#64748b' }}
                  />
                  <YAxis hide />
                  <Line 
                    type="monotone" 
                    dataKey="paper" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AlertTriangle, Cable, Zap, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircularProgress } from './CircularProgress';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const PowerCableDashboard = () => {
  const cableData = [
    { time: '00:00', voltage: 22.5 },
    { time: '04:00', voltage: 22.8 },
    { time: '08:00', voltage: 23.2 },
    { time: '12:00', voltage: 23.5 },
    { time: '16:00', voltage: 23.1 },
    { time: '20:00', voltage: 22.9 },
    { time: '24:00', voltage: 22.7 },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 -m-4">
        <div className="max-w-full mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-3xl font-bold text-slate-800">Power Cable Monitoring</h1>
                <p className="text-slate-600 mt-1">Underground power cable health monitoring</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
              <AlertTriangle className="h-5 w-5 text-green-600" />
              <span className="text-green-700 font-medium">ALARMS: 0</span>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cable Health Summary */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Cable className="h-5 w-5 text-blue-500" />
                  Cable Health Index
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="relative mb-4">
                    <CircularProgress 
                      value={8.2} 
                      max={10} 
                      size={120}
                      strokeWidth={8}
                      className="bg-green-500"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-slate-700">8.2</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-slate-600 mb-2">Overall Health</h3>
                  <span className="text-xs px-3 py-1 rounded font-medium bg-green-100 text-green-700">
                    EXCELLENT
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Insulation Resistance */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Insulation Resistance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-800">1.2 GΩ</div>
                    <div className="text-sm text-slate-600">Current Reading</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <div className="text-blue-600 text-sm font-medium">Phase A</div>
                      <div className="text-blue-700 text-lg font-bold">1.1 GΩ</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <div className="text-green-600 text-sm font-medium">Phase B</div>
                      <div className="text-green-700 text-lg font-bold">1.3 GΩ</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Voltage Monitoring */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-500" />
                  Voltage Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cableData}>
                      <XAxis 
                        dataKey="time" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: '#64748b' }}
                      />
                      <YAxis hide />
                      <Line 
                        type="monotone" 
                        dataKey="voltage" 
                        stroke="#8b5cf6" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-800">23.1 kV</div>
                  <div className="text-sm text-slate-600">Current Voltage</div>
                </div>
              </CardContent>
            </Card>

            {/* Cable Details */}
            <Card className="shadow-lg border-0 bg-white lg:col-span-2">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-800">Cable Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <div className="text-sm font-medium text-slate-600 mb-1">Cable Type</div>
                    <div className="text-slate-800">XLPE</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-600 mb-1">Voltage Rating</div>
                    <div className="text-slate-800">25 kV</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-600 mb-1">Length</div>
                    <div className="text-slate-800">2.5 km</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-600 mb-1">Installation Year</div>
                    <div className="text-slate-800">2019</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-800">Maintenance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-green-800 mb-2">Status: Healthy</h4>
                  <div className="text-xs text-green-700">Next inspection due in 6 months</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerCableDashboard;

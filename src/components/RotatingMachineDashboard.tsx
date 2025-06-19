
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AlertTriangle, Activity, Gauge, Thermometer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircularProgress } from './CircularProgress';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const RotatingMachineDashboard = () => {
  const vibrationData = [
    { time: '00:00', vibration: 2.1 },
    { time: '04:00', vibration: 2.3 },
    { time: '08:00', vibration: 2.8 },
    { time: '12:00', vibration: 3.2 },
    { time: '16:00', vibration: 2.9 },
    { time: '20:00', vibration: 2.5 },
    { time: '24:00', vibration: 2.2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Rotating Machine Monitoring</h1>
              <p className="text-slate-600 mt-1">Motor and generator condition monitoring</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <span className="text-yellow-700 font-medium">ALARMS: 2</span>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Machine Health */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Machine Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="relative mb-4">
                  <CircularProgress 
                    value={6.8} 
                    max={10} 
                    size={120}
                    strokeWidth={8}
                    className="bg-yellow-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-slate-700">6.8</span>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-slate-600 mb-2">Overall Health</h3>
                <span className="text-xs px-3 py-1 rounded font-medium bg-yellow-100 text-yellow-700">
                  FAIR
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Vibration Analysis */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Gauge className="h-5 w-5 text-red-500" />
                Vibration Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vibrationData}>
                    <XAxis 
                      dataKey="time" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: '#64748b' }}
                    />
                    <YAxis hide />
                    <Line 
                      type="monotone" 
                      dataKey="vibration" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-800">2.8 mm/s</div>
                  <div className="text-xs text-slate-600">RMS Velocity</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-red-600">HIGH</div>
                  <div className="text-xs text-slate-600">Alert Level</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Temperature Monitoring */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-orange-500" />
                Temperature
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-orange-50 p-3 rounded-lg text-center">
                    <div className="text-orange-600 text-sm font-medium">Bearing A</div>
                    <div className="text-orange-700 text-lg font-bold">78°C</div>
                    <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700">WARN</span>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg text-center">
                    <div className="text-red-600 text-sm font-medium">Bearing B</div>
                    <div className="text-red-700 text-lg font-bold">92°C</div>
                    <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-700">ALARM</span>
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <div className="text-green-600 text-sm font-medium">Stator Winding</div>
                  <div className="text-green-700 text-lg font-bold">65°C</div>
                  <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">NORMAL</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Motor Specifications */}
          <Card className="shadow-lg border-0 bg-white lg:col-span-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800">Motor Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-sm font-medium text-slate-600 mb-1">Motor Type</div>
                  <div className="text-slate-800">Induction Motor</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-600 mb-1">Power Rating</div>
                  <div className="text-slate-800">500 kW</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-600 mb-1">Speed</div>
                  <div className="text-slate-800">1485 RPM</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-600 mb-1">Efficiency</div>
                  <div className="text-slate-800">94.2%</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-600 mb-1">Voltage</div>
                  <div className="text-slate-800">6.6 kV</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-600 mb-1">Current</div>
                  <div className="text-slate-800">52.4 A</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-600 mb-1">Power Factor</div>
                  <div className="text-slate-800">0.89</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-600 mb-1">Load</div>
                  <div className="text-slate-800">85%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Maintenance Alerts */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800">Maintenance Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-red-800 mb-1">Bearing Replacement</h4>
                  <div className="text-xs text-red-700">Bearing B temperature critical</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-yellow-800 mb-1">Vibration Check</h4>
                  <div className="text-xs text-yellow-700">Schedule balancing within 2 weeks</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RotatingMachineDashboard;

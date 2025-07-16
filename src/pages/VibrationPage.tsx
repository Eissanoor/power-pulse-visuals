import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Activity, Gauge, TrendingUp, AlertTriangle } from 'lucide-react';

const VibrationPage = () => {
  const [velocityData, setVelocityData] = useState<Array<{time: string, velocity: number, flow: number}>>([]);
  const [currentVelocity, setCurrentVelocity] = useState(0.4);
  const [currentFlow, setCurrentFlow] = useState(3.1);
  const [todayConsumption, setTodayConsumption] = useState(118.8);
  const [positiveConsumption, setPositiveConsumption] = useState(11466.7);
  const [negativeConsumption, setNegativeConsumption] = useState(0.0);
  const [cumulativeTotal, setCumulativeTotal] = useState(11466.7);

  useEffect(() => {
    // Generate mock vibration data
    const generateData = () => {
      const data = [];
      for (let i = 0; i < 24; i++) {
        data.push({
          time: `${i.toString().padStart(2, '0')}:00`,
          velocity: Math.random() * 1.2 + 0.2,
          flow: Math.random() * 5 + 1
        });
      }
      return data;
    };

    setVelocityData(generateData());
  }, []);

  const tableData = [
    { timestamp: '2025-01-17 17:47:04', flow: 3.1, flowUnit: 'm³/h', velocity: '0.4 m/s', positiveCalc: '11466.7', negativeCalc: '0.0', consumption: '11466.7', unit: 'm³' },
    { timestamp: '2025-01-17 17:46:04', flow: 3.1, flowUnit: 'm³/h', velocity: '0.4 m/s', positiveCalc: '11466.5', negativeCalc: '0.0', consumption: '11466.5', unit: 'm³' },
    { timestamp: '2025-01-17 17:45:04', flow: 3.1, flowUnit: 'm³/h', velocity: '0.4 m/s', positiveCalc: '11466.3', negativeCalc: '0.0', consumption: '11466.3', unit: 'm³' }
  ];

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50 to-teal-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-emerald-800">Watermeter Monitoring</h1>
        <div className="flex items-center gap-4">
          <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium">SYNC</div>
          <div className="text-emerald-700">Location: Lane-03</div>
        </div>
      </div>

      {/* Device Image and Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Device Image */}
        <Card className="lg:row-span-2">
          <CardContent className="p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
                <Gauge className="h-16 w-16 text-white" />
              </div>
              <p className="text-sm text-muted-foreground">Ultrasonic Flow Meter</p>
            </div>
          </CardContent>
        </Card>

        {/* Velocity */}
        <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-100 rounded-lg">
                <Activity className="h-6 w-6 text-cyan-600" />
              </div>
              <div>
                <p className="text-sm text-cyan-600 font-medium">Velocity</p>
                <p className="text-3xl font-bold text-cyan-800">{currentVelocity} m/s</p>
                <p className="text-xs text-cyan-500">Measured Flow</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Flow */}
        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-emerald-600 font-medium">Flow</p>
                <p className="text-3xl font-bold text-emerald-800">{currentFlow} m³/hr</p>
                <p className="text-xs text-emerald-500">Rate Flow</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today Consumption */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Gauge className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Today Consumption</p>
                <p className="text-3xl font-bold text-blue-800">{todayConsumption} m³</p>
                <p className="text-xs text-blue-500">Daily Usage</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Consumption Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">{positiveConsumption} m³</p>
            <p className="text-sm text-muted-foreground">Positive Cumulative</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-600">{negativeConsumption} m³</p>
            <p className="text-sm text-muted-foreground">Negative Cumulative</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{cumulativeTotal} m³</p>
            <p className="text-sm text-muted-foreground">Cumulative Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold text-emerald-600">Consumption</p>
            <p className="text-sm text-muted-foreground">Status</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Velocity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Velocity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={velocityData}>
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#64748b' }}
                  />
                  <YAxis hide />
                  <Area 
                    type="monotone" 
                    dataKey="velocity" 
                    stroke="#06b6d4" 
                    fill="#06b6d4"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Flow Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Flow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={velocityData}>
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#64748b' }}
                  />
                  <YAxis hide />
                  <Area 
                    type="monotone" 
                    dataKey="flow" 
                    stroke="#10b981" 
                    fill="#10b981"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Realtime - last day</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Timestamp</th>
                  <th className="text-left p-3">Flow</th>
                  <th className="text-left p-3">Flow unit</th>
                  <th className="text-left p-3">Velocity</th>
                  <th className="text-left p-3">Positive Cumulative</th>
                  <th className="text-left p-3">Negative Cumulative</th>
                  <th className="text-left p-3">Cumulative Total</th>
                  <th className="text-left p-3">Consumption Unit</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-3">{row.timestamp}</td>
                    <td className="p-3">{row.flow}</td>
                    <td className="p-3">{row.flowUnit}</td>
                    <td className="p-3">{row.velocity}</td>
                    <td className="p-3">{row.positiveCalc}</td>
                    <td className="p-3">{row.negativeCalc}</td>
                    <td className="p-3">{row.consumption}</td>
                    <td className="p-3">{row.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VibrationPage;
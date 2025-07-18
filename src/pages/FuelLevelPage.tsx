import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Fuel, Gauge, TrendingDown, AlertTriangle, BarChart3, Clock } from 'lucide-react';

const FuelLevelPage = () => {
  const [fuelData, setFuelData] = useState<Array<{time: string, level: number, consumption: number}>>([]);
  const [currentLevel, setCurrentLevel] = useState(78);
  const [tankCapacity] = useState(1000); // liters
  const [dailyConsumption, setDailyConsumption] = useState(45.6);
  const [weeklyConsumption, setWeeklyConsumption] = useState(319.2);
  const [monthlyConsumption, setMonthlyConsumption] = useState(1376.8);
  const [estimatedDaysLeft, setEstimatedDaysLeft] = useState(17);

  const [tankStatus, setTankStatus] = useState({
    temperature: 23.5,
    pressure: 1.02,
    lastRefill: '2025-01-10',
    totalRefills: 12,
    efficiency: 94.2
  });

  useEffect(() => {
    // Generate mock fuel level data
    const generateData = () => {
      const data = [];
      let level = 95;
      for (let i = 0; i < 24; i++) {
        level -= Math.random() * 2 + 0.5; // Gradual decrease
        data.push({
          time: `${i.toString().padStart(2, '0')}:00`,
          level: Math.max(level, 10),
          consumption: Math.random() * 3 + 1
        });
      }
      return data;
    };

    setFuelData(generateData());
    
    // Update estimated days left
    const currentFuelAmount = (currentLevel / 100) * tankCapacity;
    const avgDailyConsumption = dailyConsumption;
    setEstimatedDaysLeft(Math.floor(currentFuelAmount / avgDailyConsumption));
  }, [currentLevel, dailyConsumption, tankCapacity]);

  const getFuelLevelColor = (level: number) => {
    if (level >= 50) return "text-green-600";
    if (level >= 25) return "text-yellow-600";
    return "text-red-600";
  };

  const getFuelLevelBgColor = (level: number) => {
    if (level >= 50) return "from-green-50 to-emerald-50 border-green-200";
    if (level >= 25) return "from-yellow-50 to-orange-50 border-yellow-200";
    return "from-red-50 to-pink-50 border-red-200";
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-800">Fuel Level Monitoring System</h1>
        <div className="flex items-center gap-4">
          <Badge variant={currentLevel > 25 ? "default" : "destructive"}>
            {currentLevel > 25 ? "Normal Operation" : "Low Fuel Alert"}
          </Badge>
          <div className="text-blue-700">Tank: DIESEL-001</div>
        </div>
      </div>

      {/* Main Fuel Level Display */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Large Fuel Gauge */}
        <Card className={`lg:col-span-2 bg-gradient-to-br ${getFuelLevelBgColor(currentLevel)}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fuel className="h-6 w-6" />
              Current Fuel Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64">
              <div className="relative w-40 h-40">
                {/* Circular fuel gauge */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted-foreground/20"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(currentLevel / 100) * 251.2} 251.2`}
                    className={currentLevel >= 50 ? "text-green-500" : currentLevel >= 25 ? "text-yellow-500" : "text-red-500"}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${getFuelLevelColor(currentLevel)}`}>
                      {currentLevel}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {Math.round((currentLevel / 100) * tankCapacity)}L / {tankCapacity}L
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-purple-600 font-medium">Estimated Days Left</p>
                  <p className="text-3xl font-bold text-purple-800">{estimatedDaysLeft}</p>
                  <p className="text-xs text-purple-500">At current rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingDown className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-orange-600 font-medium">Daily Consumption</p>
                  <p className="text-3xl font-bold text-orange-800">{dailyConsumption}L</p>
                  <p className="text-xs text-orange-500">Average usage</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Gauge className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-indigo-600 font-medium">Tank Efficiency</p>
                  <p className="text-3xl font-bold text-indigo-800">{tankStatus.efficiency}%</p>
                  <p className="text-xs text-indigo-500">Performance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Consumption Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{dailyConsumption}L</p>
            <p className="text-sm text-muted-foreground">Today's Usage</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{weeklyConsumption}L</p>
            <p className="text-sm text-muted-foreground">This Week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{monthlyConsumption}L</p>
            <p className="text-sm text-muted-foreground">This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">{tankStatus.totalRefills}</p>
            <p className="text-sm text-muted-foreground">Total Refills</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fuel Level Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fuel className="h-5 w-5" />
              Fuel Level Trend (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={fuelData}>
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#64748b' }}
                  />
                  <YAxis hide />
                  <Area 
                    type="monotone" 
                    dataKey="level" 
                    stroke="#3b82f6" 
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Consumption Rate */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Consumption Rate (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={fuelData}>
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#64748b' }}
                  />
                  <YAxis hide />
                  <Line 
                    type="monotone" 
                    dataKey="consumption" 
                    stroke="#f97316" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tank Status Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5" />
            Tank Status & Diagnostics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Physical Parameters</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">Temperature</span>
                  <span className="font-bold">{tankStatus.temperature}°C</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">Pressure</span>
                  <span className="font-bold">{tankStatus.pressure} bar</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">Tank Capacity</span>
                  <span className="font-bold">{tankCapacity}L</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Maintenance Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">Last Refill</span>
                  <span className="font-bold">{tankStatus.lastRefill}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">Total Refills</span>
                  <span className="font-bold">{tankStatus.totalRefills}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">Next Service</span>
                  <span className="font-bold">2025-02-15</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Alerts & Warnings</h3>
              <div className="space-y-3">
                {currentLevel < 25 && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-700">Low Fuel Level</span>
                  </div>
                )}
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-700">System Normal</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-blue-700">Sensor Online</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FuelLevelPage;
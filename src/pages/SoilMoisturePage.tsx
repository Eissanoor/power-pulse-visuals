import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { Droplets, Thermometer, Sun, CloudRain, Sprout, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const SoilMoisturePage = () => {
  const [soilData, setSoilData] = useState<Array<{time: string, moisture: number, temperature: number, ph: number}>>([]);
  const [currentMoisture, setCurrentMoisture] = useState(65.4);
  const [soilTemp, setSoilTemp] = useState(22.8);
  const [phLevel, setPhLevel] = useState(6.8);
  const [irrigationStatus, setIrrigationStatus] = useState('Active');

  const zones = [
    { id: 1, name: 'Zone A - Vegetables', moisture: 68.2, temperature: 23.1, ph: 6.9, status: 'Optimal' },
    { id: 2, name: 'Zone B - Fruits', moisture: 62.8, temperature: 22.5, ph: 6.7, status: 'Good' },
    { id: 3, name: 'Zone C - Herbs', moisture: 45.3, temperature: 24.2, ph: 7.1, status: 'Low' },
    { id: 4, name: 'Zone D - Flowers', moisture: 71.6, temperature: 21.9, ph: 6.5, status: 'Optimal' },
    { id: 5, name: 'Zone E - Greenhouse', moisture: 58.9, temperature: 25.3, ph: 6.8, status: 'Good' },
    { id: 6, name: 'Zone F - Nursery', moisture: 73.4, temperature: 20.8, ph: 6.6, status: 'Optimal' }
  ];

  const weatherData = [
    { day: 'Mon', rainfall: 12, humidity: 68, temperature: 24 },
    { day: 'Tue', rainfall: 8, humidity: 72, temperature: 23 },
    { day: 'Wed', rainfall: 0, humidity: 58, temperature: 26 },
    { day: 'Thu', rainfall: 15, humidity: 75, temperature: 22 },
    { day: 'Fri', rainfall: 3, humidity: 65, temperature: 25 },
    { day: 'Sat', rainfall: 7, humidity: 70, temperature: 24 },
    { day: 'Sun', rainfall: 18, humidity: 80, temperature: 21 }
  ];

  useEffect(() => {
    // Generate mock soil monitoring data
    const generateData = () => {
      const data = [];
      for (let i = 0; i < 24; i++) {
        data.push({
          time: `${i.toString().padStart(2, '0')}:00`,
          moisture: Math.random() * 20 + 50,
          temperature: Math.random() * 8 + 18,
          ph: Math.random() * 2 + 6
        });
      }
      return data;
    };

    setSoilData(generateData());
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Optimal': return 'bg-green-100 text-green-800';
      case 'Good': return 'bg-blue-100 text-blue-800';
      case 'Low': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMoistureLevel = (moisture: number) => {
    if (moisture >= 70) return { level: 'Optimal', color: 'text-green-600' };
    if (moisture >= 50) return { level: 'Good', color: 'text-blue-600' };
    if (moisture >= 30) return { level: 'Low', color: 'text-orange-600' };
    return { level: 'Critical', color: 'text-red-600' };
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-green-800">Soil Moisture Monitoring System</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
            <Sprout className="h-4 w-4" />
            <span className="text-sm font-medium">{irrigationStatus}</span>
          </div>
          <div className="text-sm text-green-700">
            Farm Status: Monitoring 6 zones
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Soil Moisture */}
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Avg Soil Moisture</p>
                <p className="text-3xl font-bold text-blue-800">{currentMoisture}%</p>
                <div className="flex items-center gap-1 mt-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className={`text-sm ${getMoistureLevel(currentMoisture).color}`}>
                    {getMoistureLevel(currentMoisture).level}
                  </span>
                </div>
              </div>
              <Droplets className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        {/* Soil Temperature */}
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Soil Temperature</p>
                <p className="text-3xl font-bold text-orange-800">{soilTemp}°C</p>
                <div className="flex items-center gap-1 mt-2">
                  <Thermometer className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-green-600">Optimal</span>
                </div>
              </div>
              <Thermometer className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        {/* pH Level */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">pH Level</p>
                <p className="text-3xl font-bold text-purple-800">{phLevel}</p>
                <div className="flex items-center gap-1 mt-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">Balanced</span>
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        {/* Irrigation Status */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Irrigation</p>
                <p className="text-2xl font-bold text-green-800">{irrigationStatus}</p>
                <div className="flex items-center gap-1 mt-2">
                  <CloudRain className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">Zone C scheduled</span>
                </div>
              </div>
              <CloudRain className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Zone Status Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sprout className="h-5 w-5" />
            Zone Monitoring Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {zones.map((zone) => (
              <div key={zone.id} className="p-4 border border-green-200 rounded-lg bg-white/50 backdrop-blur-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-sm text-green-800">{zone.name}</h3>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(zone.status)}`}>
                    {zone.status}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600 flex items-center gap-1">
                      <Droplets className="h-3 w-3" />
                      Moisture:
                    </span>
                    <span className="font-medium">{zone.moisture}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-orange-600 flex items-center gap-1">
                      <Thermometer className="h-3 w-3" />
                      Temperature:
                    </span>
                    <span className="font-medium">{zone.temperature}°C</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-600">pH:</span>
                    <span className="font-medium">{zone.ph}</span>
                  </div>
                </div>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${zone.moisture}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Soil Moisture Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5" />
              Soil Moisture Trend (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={soilData}>
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#059669' }}
                  />
                  <YAxis hide />
                  <Area 
                    type="monotone" 
                    dataKey="moisture" 
                    stroke="#059669" 
                    fill="#059669"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Temperature & pH */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              Temperature & pH Levels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={soilData}>
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#dc2626' }}
                  />
                  <YAxis hide />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="#dc2626" 
                    strokeWidth={2}
                    dot={{ fill: '#dc2626', strokeWidth: 2, r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ph" 
                    stroke="#7c3aed" 
                    strokeWidth={2}
                    dot={{ fill: '#7c3aed', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded"></div>
                <span className="text-sm">Temperature (°C)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-600 rounded"></div>
                <span className="text-sm">pH Level</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weather Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5" />
            Weather Impact Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weatherData}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#064e3b' }}
                />
                <YAxis hide />
                <Bar dataKey="rainfall" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="humidity" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm">Rainfall (mm)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-sm">Humidity (%)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Irrigation Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CloudRain className="h-5 w-5" />
              Upcoming Irrigation Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div>
                  <p className="font-medium text-orange-800">Zone C - Herbs</p>
                  <p className="text-sm text-orange-600">Scheduled: Today 18:00</p>
                </div>
                <div className="text-orange-600">
                  <AlertTriangle className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div>
                  <p className="font-medium text-blue-800">Zone B - Fruits</p>
                  <p className="text-sm text-blue-600">Scheduled: Tomorrow 06:00</p>
                </div>
                <div className="text-blue-600">
                  <CloudRain className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <p className="font-medium text-green-800">Zone E - Greenhouse</p>
                  <p className="text-sm text-green-600">Scheduled: Tomorrow 14:00</p>
                </div>
                <div className="text-green-600">
                  <CheckCircle className="h-5 w-5" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-green-800 font-medium">Water Efficiency</span>
                  <span className="text-green-600 font-bold">94.2%</span>
                </div>
                <div className="mt-2 w-full bg-green-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '94.2%' }}></div>
                </div>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-blue-800 font-medium">Crop Health Score</span>
                  <span className="text-blue-600 font-bold">87.5%</span>
                </div>
                <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '87.5%' }}></div>
                </div>
              </div>
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-purple-800 font-medium">System Uptime</span>
                  <span className="text-purple-600 font-bold">99.7%</span>
                </div>
                <div className="mt-2 w-full bg-purple-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '99.7%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SoilMoisturePage;
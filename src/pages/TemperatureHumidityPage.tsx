import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Thermometer, Droplets, TrendingUp, TrendingDown } from 'lucide-react';

interface SensorData {
  _id: string;
  temperature: number;
  humidity: number;
  timestamp: string;
}

const TemperatureHumidityPage = () => {
  const [sensorData, setSensorData] = useState<Array<{time: string, temperature: number, humidity: number}>>([]);
  const [currentTemp, setCurrentTemp] = useState<number>(0);
  const [currentHumidity, setCurrentHumidity] = useState<number>(0);
  const [tempStats, setTempStats] = useState({ min: 0, max: 0, avg: 0 });
  const [humidityStats, setHumidityStats] = useState({ min: 0, max: 0, avg: 0 });
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSensorData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/sensor-data');
      const data = await response.json();
      
      if (data && data.data && Array.isArray(data.data)) {
        const sortedData = [...data.data].sort((a, b) => 
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        
        const formattedData = sortedData.slice(-50).map((item: SensorData) => ({
          time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          temperature: item.temperature,
          humidity: item.humidity
        }));
        
        const latestData = sortedData[sortedData.length - 1];
        const temperatures = sortedData.map(item => item.temperature);
        const humidities = sortedData.map(item => item.humidity);
        
        setCurrentTemp(latestData.temperature);
        setCurrentHumidity(latestData.humidity);
        setTempStats({
          min: Math.min(...temperatures),
          max: Math.max(...temperatures),
          avg: temperatures.reduce((a, b) => a + b, 0) / temperatures.length
        });
        setHumidityStats({
          min: Math.min(...humidities),
          max: Math.max(...humidities),
          avg: humidities.reduce((a, b) => a + b, 0) / humidities.length
        });
        setSensorData(formattedData);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching sensor data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensorData();
    const intervalId = setInterval(fetchSensorData, 3000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading sensor data...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Temperature & Humidity Monitor</h1>
        <div className="text-sm text-muted-foreground">
          Last update: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Current Values */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-medium">Channel 1</p>
                <p className="text-3xl font-bold text-red-700">{currentTemp.toFixed(1)}°C</p>
                <p className="text-xs text-red-500">Last update 9m ago</p>
              </div>
              <Thermometer className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Channel 2</p>
                <p className="text-3xl font-bold text-blue-700">{(currentTemp - 1.9).toFixed(2)}°C</p>
                <p className="text-xs text-blue-500">Last update 9m ago</p>
              </div>
              <Thermometer className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-medium">Channel 3</p>
                <p className="text-3xl font-bold text-red-700">{(currentTemp + 0.2).toFixed(2)}°C</p>
                <p className="text-xs text-red-500">Last update 9m ago</p>
              </div>
              <Thermometer className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Channel 4</p>
                <p className="text-3xl font-bold text-orange-700">{(currentTemp - 0.6).toFixed(2)}°C</p>
                <p className="text-xs text-orange-500">Last update 9m ago</p>
              </div>
              <Thermometer className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temperature Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              Temperature
            </CardTitle>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Min: {tempStats.min.toFixed(2)}°C</span>
              <span>Max: {tempStats.max.toFixed(2)}°C</span>
              <span>Avg: {tempStats.avg.toFixed(2)}°C</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sensorData}>
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#64748b' }}
                  />
                  <YAxis hide />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="#f97316" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Humidity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5" />
              Humidity
            </CardTitle>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Min: {humidityStats.min.toFixed(2)}%</span>
              <span>Max: {humidityStats.max.toFixed(2)}%</span>
              <span>Avg: {humidityStats.avg.toFixed(2)}%</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sensorData}>
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#64748b' }}
                  />
                  <YAxis hide />
                  <Area 
                    type="monotone" 
                    dataKey="humidity" 
                    stroke="#3b82f6" 
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Humidity Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Humidity Gauge</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-48">
              <div className="relative w-32 h-32">
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
                    strokeDasharray={`${(currentHumidity / 100) * 251.2} 251.2`}
                    className="text-blue-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{currentHumidity.toFixed(0)}</div>
                    <div className="text-xs text-muted-foreground">%</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Temperature Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm">Current</span>
              <span className="font-bold">{currentTemp.toFixed(1)}°C</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm">Today's High</span>
              <span className="font-bold text-red-600">{tempStats.max.toFixed(1)}°C</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm">Today's Low</span>
              <span className="font-bold text-blue-600">{tempStats.min.toFixed(1)}°C</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Humidity Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm">Current</span>
              <span className="font-bold">{currentHumidity.toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm">Today's High</span>
              <span className="font-bold text-blue-600">{humidityStats.max.toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm">Today's Low</span>
              <span className="font-bold text-green-600">{humidityStats.min.toFixed(1)}%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TemperatureHumidityPage;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Thermometer } from 'lucide-react';

interface SensorData {
  _id: string;
  temperature: number;
  humidity: number;
  timestamp: string;
}

export const TemperatureMonitor = () => {
  const [temperatureData, setTemperatureData] = useState<Array<{time: string, temp: number}>>([]);
  const [currentTemp, setCurrentTemp] = useState<number>(0);
  const [maxTemp, setMaxTemp] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSensorData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/temperature');
      const data = await response.json();
      
      if (data && data.data && Array.isArray(data.data)) {
        // Sort data by timestamp to ensure chronological order
        const sortedData = [...data.data].sort((a, b) => 
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        
        // Transform the data for the chart
        const formattedData = sortedData.map((item: SensorData) => ({
          time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          temp: item.temperature
        }));
        
        // Get the most recent temperature
        const latestTemp = sortedData.length > 0 ? sortedData[sortedData.length - 1].temperature : 0;
        
        // Find the maximum temperature
        const maxTemperature = Math.max(...sortedData.map(item => item.temperature));
        
        setTemperatureData(formattedData);
        setCurrentTemp(latestTemp);
        setMaxTemp(maxTemperature);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching sensor data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data immediately on component mount
    fetchSensorData();
    
    // Set up interval to fetch data every 3 seconds
    const intervalId = setInterval(fetchSensorData, 3000);
    
    // Clean up the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-orange-500" />
          Temperature Monitor
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <p>Loading sensor data...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                <div className="text-orange-600 text-sm font-medium">Current</div>
                <div className="text-orange-700 text-xl font-bold">{currentTemp.toFixed(1)}°C</div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                <div className="text-red-600 text-sm font-medium">Max Today</div>
                <div className="text-red-700 text-xl font-bold">{maxTemp.toFixed(1)}°C</div>
              </div>
            </div>
            
            <div className="h-32">
              {temperatureData.length > 0 ? (
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
              ) : (
                <div className="flex justify-center items-center h-full">
                  <p>No temperature data available</p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

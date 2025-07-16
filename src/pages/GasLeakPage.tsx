import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { ShieldAlert, TrendingUp, AlertTriangle, CheckCircle, Users, Package } from 'lucide-react';

const GasLeakPage = () => {
  const [gasData, setGasData] = useState<Array<{time: string, level: number}>>([]);
  const [currentLevel, setCurrentLevel] = useState(8543);
  const [totalUsers, setTotalUsers] = useState(7500);
  const [totalPending, setTotalPending] = useState(3300);
  const [salesSummary, setSalesSummary] = useState([
    { month: 'Jan', live: 6000, gas: 4000, diesel: 2000 },
    { month: 'Feb', live: 7000, gas: 4500, diesel: 2500 },
    { month: 'Mar', live: 6500, gas: 4200, diesel: 2800 },
    { month: 'Apr', live: 8000, gas: 5000, diesel: 3000 },
    { month: 'May', live: 7500, gas: 4800, diesel: 2700 },
    { month: 'Jun', live: 8500, gas: 5200, diesel: 3300 },
    { month: 'Jul', live: 8000, gas: 5000, diesel: 3000 }
  ]);

  const pieData = [
    { name: 'Live', value: 4043, color: '#3b82f6' },
    { name: 'Gas', value: 3248, color: '#10b981' },
    { name: 'Diesel', value: 1252, color: '#f59e0b' }
  ];

  useEffect(() => {
    // Generate mock gas level data
    const generateData = () => {
      const data = [];
      for (let i = 0; i < 24; i++) {
        data.push({
          time: `${i.toString().padStart(2, '0')}:00`,
          level: Math.random() * 2000 + 7500
        });
      }
      return data;
    };

    setGasData(generateData());
  }, []);

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Gas Leak Detection Dashboard</h1>
        <div className="flex items-center gap-4">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600">
            + New Order
          </button>
          <div className="text-sm text-muted-foreground">
            Tuesday • 01 Jan • 01 Jan
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Users */}
        <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Total Users</p>
                <p className="text-3xl font-bold text-purple-800">{totalUsers.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">+12%</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        {/* Total Order */}
        <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Total Order</p>
                <p className="text-3xl font-bold text-orange-800">300</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">+8%</span>
                </div>
              </div>
              <Package className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        {/* Total Pending */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Total Pending</p>
                <p className="text-3xl font-bold text-green-800">{totalPending.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">+5%</span>
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        {/* Current Gas Level */}
        <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-medium">Gas Level</p>
                <p className="text-3xl font-bold text-red-800">{currentLevel}</p>
                <div className="flex items-center gap-1 mt-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-yellow-600">Normal</span>
                </div>
              </div>
              <ShieldAlert className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Summary Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesSummary}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <YAxis hide />
                  <Bar dataKey="live" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="gas" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="diesel" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-sm">Live</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm">Gas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span className="text-sm">Diesel</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Summary Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Product Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-4">
              <div className="text-2xl font-bold">{currentLevel}</div>
              <div className="text-sm text-muted-foreground">Total Value</div>
            </div>
            <div className="space-y-2 mt-4">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gas Level Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5" />
            Gas Level Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={gasData}>
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#64748b' }}
                />
                <YAxis hide />
                <Line 
                  type="monotone" 
                  dataKey="level" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Status Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="font-medium text-green-800">System Normal</p>
                <p className="text-sm text-green-600">All sensors operational</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">Warning Level</p>
                <p className="text-sm text-yellow-600">Monitor closely</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-8 w-8 text-blue-600" />
              <div>
                <p className="font-medium text-blue-800">Detection Active</p>
                <p className="text-sm text-blue-600">24/7 monitoring</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GasLeakPage;
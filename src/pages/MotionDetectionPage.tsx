import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Camera, Eye, AlertTriangle, CheckCircle, Users, Clock, Shield, MapPin } from 'lucide-react';

const MotionDetectionPage = () => {
  const [motionData, setMotionData] = useState<Array<{time: string, detections: number, alerts: number}>>([]);
  const [activeZones, setActiveZones] = useState(8);
  const [totalDetections, setTotalDetections] = useState(147);
  const [alertsToday, setAlertsToday] = useState(23);
  const [systemStatus, setSystemStatus] = useState('Active');

  const securityZones = [
    { id: 1, name: 'Main Entrance', status: 'Active', detections: 45, lastMotion: '2 min ago' },
    { id: 2, name: 'Parking Area', status: 'Active', detections: 32, lastMotion: '5 min ago' },
    { id: 3, name: 'Side Gate', status: 'Active', detections: 18, lastMotion: '15 min ago' },
    { id: 4, name: 'Back Yard', status: 'Inactive', detections: 8, lastMotion: '1 hr ago' },
    { id: 5, name: 'Storage Room', status: 'Active', detections: 12, lastMotion: '30 min ago' },
    { id: 6, name: 'Office Building', status: 'Active', detections: 28, lastMotion: '1 min ago' },
    { id: 7, name: 'Warehouse', status: 'Active', detections: 19, lastMotion: '8 min ago' },
    { id: 8, name: 'Emergency Exit', status: 'Active', detections: 5, lastMotion: '45 min ago' }
  ];

  const recentAlerts = [
    { time: '14:23:15', zone: 'Main Entrance', type: 'Motion Detected', severity: 'Normal' },
    { time: '14:18:42', zone: 'Parking Area', type: 'Unauthorized Access', severity: 'High' },
    { time: '14:15:33', zone: 'Office Building', type: 'Motion Detected', severity: 'Normal' },
    { time: '14:12:18', zone: 'Side Gate', type: 'Suspicious Activity', severity: 'Medium' },
    { time: '14:08:55', zone: 'Warehouse', type: 'Motion Detected', severity: 'Normal' }
  ];

  useEffect(() => {
    // Generate mock motion detection data
    const generateData = () => {
      const data = [];
      for (let i = 0; i < 24; i++) {
        data.push({
          time: `${i.toString().padStart(2, '0')}:00`,
          detections: Math.floor(Math.random() * 30) + 5,
          alerts: Math.floor(Math.random() * 8)
        });
      }
      return data;
    };

    setMotionData(generateData());
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Motion Detection System</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">{systemStatus}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Last update: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Active Zones */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Active Zones</p>
                <p className="text-3xl font-bold text-blue-800">{activeZones}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Eye className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-blue-600">Monitoring</span>
                </div>
              </div>
              <Camera className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        {/* Total Detections */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Today's Detections</p>
                <p className="text-3xl font-bold text-green-800">{totalDetections}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Users className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">+12 vs yesterday</span>
                </div>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        {/* Alerts Today */}
        <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Alerts Today</p>
                <p className="text-3xl font-bold text-orange-800">{alertsToday}</p>
                <div className="flex items-center gap-1 mt-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-orange-600">3 high priority</span>
                </div>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        {/* System Uptime */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">System Uptime</p>
                <p className="text-3xl font-bold text-purple-800">99.8%</p>
                <div className="flex items-center gap-1 mt-2">
                  <Clock className="h-4 w-4 text-purple-500" />
                  <span className="text-sm text-purple-600">15 days running</span>
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Motion Detection Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Motion Detection Trends (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={motionData}>
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#64748b' }}
                  />
                  <YAxis hide />
                  <Line 
                    type="monotone" 
                    dataKey="detections" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Zone Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Zone Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={securityZones.slice(0, 6)}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis hide />
                  <Bar 
                    dataKey="detections" 
                    fill="#10b981" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Zones Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Zones Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {securityZones.map((zone) => (
              <div key={zone.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm">{zone.name}</h3>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    zone.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {zone.status}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Detections:</span>
                    <span className="font-medium">{zone.detections}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last motion:</span>
                    <span className="font-medium">{zone.lastMotion}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Recent Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAlerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-mono text-muted-foreground">{alert.time}</div>
                  <div className="font-medium">{alert.zone}</div>
                  <div className="text-sm text-muted-foreground">{alert.type}</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                  {alert.severity}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MotionDetectionPage;
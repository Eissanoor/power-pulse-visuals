import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Volume2, VolumeX, AlertTriangle, Clock, Play, Square, Settings, Bell } from 'lucide-react';

const BuzzerPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [frequency, setFrequency] = useState([2000]);
  const [pattern, setPattern] = useState('continuous');
  const [autoMode, setAutoMode] = useState(true);
  const [testMode, setTestMode] = useState(false);

  const [buzzerStats, setBuzzerStats] = useState({
    totalAlerts: 47,
    todayAlerts: 3,
    avgDailyAlerts: 2.1,
    lastTriggered: '2025-01-17 15:30:22',
    uptime: '15d 8h 42m',
    batteryLevel: 92
  });

  const [alertHistory, setAlertHistory] = useState([
    { id: 1, timestamp: '2025-01-17 15:30:22', type: 'Temperature Alert', duration: '30s', triggered: 'Auto' },
    { id: 2, timestamp: '2025-01-17 12:15:10', type: 'Motion Detection', duration: '15s', triggered: 'Sensor' },
    { id: 3, timestamp: '2025-01-17 09:45:33', type: 'Manual Test', duration: '5s', triggered: 'Manual' },
    { id: 4, timestamp: '2025-01-16 18:20:45', type: 'Low Fuel Alert', duration: '45s', triggered: 'Auto' }
  ]);

  const patternOptions = [
    { value: 'continuous', label: 'Continuous', description: 'Steady sound' },
    { value: 'intermittent', label: 'Intermittent', description: '1s on, 1s off' },
    { value: 'rapid', label: 'Rapid Pulse', description: '0.5s on, 0.5s off' },
    { value: 'sos', label: 'SOS Pattern', description: '3 short, 3 long, 3 short' }
  ];

  const triggerTypes = [
    { type: 'Temperature', enabled: true, threshold: '35°C' },
    { type: 'Motion', enabled: true, threshold: 'Any movement' },
    { type: 'Fuel Level', enabled: true, threshold: '<25%' },
    { type: 'System Error', enabled: true, threshold: 'Any error' }
  ];

  const testBuzzer = () => {
    setTestMode(true);
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
      setTestMode(false);
    }, 3000);
  };

  const manualTrigger = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-amber-50 to-orange-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-amber-800">Buzzer Alert System</h1>
        <div className="flex items-center gap-4">
          <Badge variant={isActive ? "destructive" : autoMode ? "default" : "secondary"}>
            {isActive ? "ALERT ACTIVE" : autoMode ? "Auto Mode" : "Manual Mode"}
          </Badge>
          <div className="text-amber-700">Device: BUZZER-001</div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Controls */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-6 w-6" />
              Buzzer Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Manual Trigger */}
            <div className="flex items-center justify-between p-4 bg-white/70 rounded-lg border">
              <div>
                <h3 className="font-semibold text-lg">Manual Control</h3>
                <p className="text-sm text-muted-foreground">Manually activate/deactivate buzzer</p>
              </div>
              <Button
                onClick={manualTrigger}
                variant={isActive ? "destructive" : "default"}
                size="lg"
                className="flex items-center gap-2"
              >
                {isActive ? <Square className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                {isActive ? "Stop" : "Activate"}
              </Button>
            </div>

            {/* Volume Control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-medium">Volume Level</label>
                <span className="text-sm text-muted-foreground">{volume[0]}%</span>
              </div>
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            {/* Frequency Control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-medium">Frequency</label>
                <span className="text-sm text-muted-foreground">{frequency[0]} Hz</span>
              </div>
              <Slider
                value={frequency}
                onValueChange={setFrequency}
                min={500}
                max={5000}
                step={100}
                className="w-full"
              />
            </div>

            {/* Pattern Selection */}
            <div className="space-y-3">
              <label className="font-medium">Alert Pattern</label>
              <div className="grid grid-cols-2 gap-2">
                {patternOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setPattern(option.value)}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      pattern === option.value 
                        ? 'bg-amber-100 border-amber-300 text-amber-800' 
                        : 'bg-white/70 border-gray-200 hover:bg-amber-50'
                    }`}
                  >
                    <div className="font-medium text-sm">{option.label}</div>
                    <div className="text-xs text-muted-foreground">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Test Button */}
            <div className="pt-4 border-t">
              <Button
                onClick={testBuzzer}
                variant="outline"
                disabled={testMode}
                className="w-full flex items-center gap-2"
              >
                <Bell className="h-4 w-4" />
                {testMode ? "Testing..." : "Test Buzzer (3s)"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Status Panel */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Auto Mode</span>
                <Switch
                  checked={autoMode}
                  onCheckedChange={setAutoMode}
                />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Status</span>
                <Badge variant={isActive ? "destructive" : "secondary"}>
                  {isActive ? "Active" : "Standby"}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Battery Level</span>
                <span className="font-bold text-green-600">{buzzerStats.batteryLevel}%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Uptime</span>
                <span className="font-bold">{buzzerStats.uptime}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-red-600 font-medium">Today's Alerts</p>
                <p className="text-3xl font-bold text-red-800">{buzzerStats.todayAlerts}</p>
                <p className="text-xs text-red-500">Active alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bell className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Alerts</p>
                <p className="text-3xl font-bold text-blue-800">{buzzerStats.totalAlerts}</p>
                <p className="text-xs text-blue-500">All time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Avg Daily</p>
                <p className="text-3xl font-bold text-green-800">{buzzerStats.avgDailyAlerts}</p>
                <p className="text-xs text-green-500">Alerts/day</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Volume2 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">Volume</p>
                <p className="text-3xl font-bold text-purple-800">{volume[0]}%</p>
                <p className="text-xs text-purple-500">Current level</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trigger Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Alert Triggers Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {triggerTypes.map((trigger, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <h4 className="font-medium">{trigger.type}</h4>
                  <p className="text-sm text-muted-foreground">Threshold: {trigger.threshold}</p>
                </div>
                <Switch
                  checked={trigger.enabled}
                  onCheckedChange={() => {
                    // Handle trigger enable/disable
                  }}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alert History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Alert History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Timestamp</th>
                  <th className="text-left p-3">Alert Type</th>
                  <th className="text-left p-3">Duration</th>
                  <th className="text-left p-3">Triggered By</th>
                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {alertHistory.map((alert) => (
                  <tr key={alert.id} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-mono">{alert.timestamp}</td>
                    <td className="p-3">{alert.type}</td>
                    <td className="p-3">{alert.duration}</td>
                    <td className="p-3">
                      <Badge variant={alert.triggered === 'Auto' ? 'default' : alert.triggered === 'Manual' ? 'secondary' : 'outline'}>
                        {alert.triggered}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">Completed</Badge>
                    </td>
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

export default BuzzerPage;
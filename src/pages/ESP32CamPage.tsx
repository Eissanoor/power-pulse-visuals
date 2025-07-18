import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Camera, Wifi, Battery, Monitor, Play, Square, Settings, Download, Eye, EyeOff } from 'lucide-react';

const ESP32CamPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [motionDetected, setMotionDetected] = useState(false);
  const [cameraStats, setCameraStats] = useState({
    fps: 15,
    resolution: '1024x768',
    signalStrength: -45,
    batteryLevel: 87,
    uptime: '2d 14h 32m'
  });

  const [capturedImages, setCapturedImages] = useState([
    { id: 1, timestamp: '2025-01-17 17:45:12', type: 'Motion', size: '2.3MB' },
    { id: 2, timestamp: '2025-01-17 17:30:45', type: 'Scheduled', size: '2.1MB' },
    { id: 3, timestamp: '2025-01-17 17:15:23', type: 'Manual', size: '2.4MB' },
    { id: 4, timestamp: '2025-01-17 17:00:01', type: 'Motion', size: '2.2MB' }
  ]);

  useEffect(() => {
    // Simulate motion detection
    const interval = setInterval(() => {
      setMotionDetected(Math.random() > 0.7);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800">ESP32-CAM Security Monitor</h1>
        <div className="flex items-center gap-4">
          <Badge variant={motionDetected ? "destructive" : "secondary"}>
            {motionDetected ? "Motion Detected" : "Monitoring"}
          </Badge>
          <div className="text-slate-700">Camera: ESP32-001</div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Camera className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">FPS</p>
                <p className="text-2xl font-bold text-blue-800">{cameraStats.fps}</p>
                <p className="text-xs text-blue-500">Frames/sec</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Monitor className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Resolution</p>
                <p className="text-lg font-bold text-green-800">{cameraStats.resolution}</p>
                <p className="text-xs text-green-500">HD Quality</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Wifi className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">Signal</p>
                <p className="text-2xl font-bold text-purple-800">{cameraStats.signalStrength} dBm</p>
                <p className="text-xs text-purple-500">Excellent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Battery className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-orange-600 font-medium">Battery</p>
                <p className="text-2xl font-bold text-orange-800">{cameraStats.batteryLevel}%</p>
                <p className="text-xs text-orange-500">Good Level</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Settings className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Uptime</p>
                <p className="text-lg font-bold text-gray-800">{cameraStats.uptime}</p>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Feed and Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Camera Feed */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Live Camera Feed
              </span>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-red-600">LIVE</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Simulated camera feed */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
              <div className="relative z-10 text-center text-white">
                <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">ESP32-CAM Live Stream</p>
                <p className="text-sm opacity-75">Camera ID: ESP32-001</p>
              </div>
              {/* Recording indicator */}
              {isRecording && (
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  REC
                </div>
              )}
              {/* Motion detection overlay */}
              {motionDetected && (
                <div className="absolute bottom-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                  MOTION DETECTED
                </div>
              )}
            </div>
            
            {/* Camera Controls */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <Button 
                onClick={toggleRecording}
                variant={isRecording ? "destructive" : "default"}
                className="flex items-center gap-2"
              >
                {isRecording ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isRecording ? "Stop Recording" : "Start Recording"}
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Capture
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Camera Settings & Info */}
        <Card>
          <CardHeader>
            <CardTitle>Camera Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Motion Detection</span>
                <Badge variant="secondary">Enabled</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Night Vision</span>
                <Badge variant="secondary">Auto</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Quality</span>
                <Badge variant="secondary">High</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Storage</span>
                <Badge variant="outline">SD Card</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">WiFi Status</span>
                <Badge variant="default">Connected</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Captured Images History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Recent Captures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Timestamp</th>
                  <th className="text-left p-3">Trigger Type</th>
                  <th className="text-left p-3">File Size</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {capturedImages.map((image) => (
                  <tr key={image.id} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-mono">{image.timestamp}</td>
                    <td className="p-3">
                      <Badge 
                        variant={
                          image.type === 'Motion' ? 'destructive' : 
                          image.type === 'Scheduled' ? 'default' : 'secondary'
                        }
                      >
                        {image.type}
                      </Badge>
                    </td>
                    <td className="p-3">{image.size}</td>
                    <td className="p-3">
                      <Badge variant="outline">Saved</Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
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

export default ESP32CamPage;
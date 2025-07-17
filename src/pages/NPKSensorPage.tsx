import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, TrendingUp, Thermometer, Droplets } from 'lucide-react';

const NPKSensorPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">NPK Sensor Monitoring</h1>
          <p className="text-muted-foreground mt-1">Monitor Nitrogen, Phosphorus, and Potassium levels in soil</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nitrogen (N)</CardTitle>
            <Leaf className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65 mg/kg</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last reading
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Phosphorus (P)</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45 mg/kg</div>
            <p className="text-xs text-muted-foreground">
              -1.2% from last reading
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Potassium (K)</CardTitle>
            <Thermometer className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120 mg/kg</div>
            <p className="text-xs text-muted-foreground">
              +3.5% from last reading
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">pH Level</CardTitle>
            <Droplets className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.8</div>
            <p className="text-xs text-muted-foreground">
              Optimal range
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>NPK Sensor Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Sensor Status</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Last Reading</span>
              <span className="text-sm text-muted-foreground">2 minutes ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Battery Level</span>
              <span className="text-sm text-muted-foreground">85%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Connection Quality</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Excellent</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NPKSensorPage;
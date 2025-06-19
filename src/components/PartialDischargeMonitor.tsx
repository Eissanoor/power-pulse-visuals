
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, TrendingUp } from 'lucide-react';

export const PartialDischargeMonitor = () => {
  const sensors = [
    {
      name: 'S1 Status',
      maxAmplitude: { value: 23.45, unit: 'mv', status: 'NORMAL' },
      dischargeRate: { value: 45.67, unit: 'pps', status: 'ALARM' }
    },
    {
      name: 'S2 Status',
      maxAmplitude: { value: 23.45, unit: 'mv', status: 'NORMAL' },
      dischargeRate: { value: 45.67, unit: 'pps', status: 'WARNING' }
    },
    {
      name: 'S3 Status',
      maxAmplitude: { value: 23.45, unit: 'mv', status: 'ALARM' },
      dischargeRate: { value: 45.67, unit: 'pps', status: 'NORMAL' }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ALARM': return 'bg-red-100 text-red-700';
      case 'WARNING': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Partial Discharge
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sensors.map((sensor, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-slate-500" />
                <h4 className="font-medium text-slate-700">{sensor.name}</h4>
                <TrendingUp className="h-4 w-4 text-slate-400 ml-auto" />
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Max. Amplitude</div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-slate-800">
                      {sensor.maxAmplitude.value} <span className="text-sm font-normal">{sensor.maxAmplitude.unit}</span>
                    </span>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${getStatusColor(sensor.maxAmplitude.status)}`}>
                      {sensor.maxAmplitude.status}
                    </span>
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-slate-500 mb-1">Discharge Rate</div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-slate-800">
                      {sensor.dischargeRate.value} <span className="text-sm font-normal">{sensor.dischargeRate.unit}</span>
                    </span>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${getStatusColor(sensor.dischargeRate.status)}`}>
                      {sensor.dischargeRate.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

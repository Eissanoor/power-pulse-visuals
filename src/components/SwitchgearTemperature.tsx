
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, TrendingUp } from 'lucide-react';

export const SwitchgearTemperature = () => {
  const temperatures = [
    { name: 'Ambient', value: 12.3, unit: '°C', status: 'NORMAL', type: 'ambient' },
    { name: 'Ambient', value: 94, unit: '%', status: 'NORMAL', type: 'humidity' },
    { name: 'Max Busbar', value: 76.6, unit: '°C', status: 'ALARM', type: 'busbar' },
    { name: 'Ambient', value: 68.8, unit: '°C', status: 'WARNING', type: 'ambient' }
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
          <Thermometer className="h-5 w-5 text-blue-500" />
          Temperature
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {temperatures.map((temp, index) => (
            <div key={index} className="text-center p-4 border border-slate-200 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Thermometer className={`h-4 w-4 ${
                  temp.type === 'humidity' ? 'text-blue-500' :
                  temp.status === 'ALARM' ? 'text-red-500' :
                  temp.status === 'WARNING' ? 'text-orange-500' : 'text-green-500'
                }`} />
                <TrendingUp className="h-3 w-3 text-slate-400" />
              </div>
              <div className="text-xs text-slate-500 mb-1">{temp.name}</div>
              <div className="text-xl font-bold text-slate-800 mb-2">
                {temp.value} {temp.unit}
              </div>
              <span className={`text-xs px-2 py-1 rounded font-medium ${getStatusColor(temp.status)}`}>
                {temp.status}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SwitchgearDetails = () => {
  const electricalData = [
    { label: 'Power', value: '340 MVA' },
    { label: 'Current', value: '100 kA' },
    { label: 'Voltage', value: '100 kV' },
    { label: 'Load', value: '80%' },
    { label: 'PF', value: '0.86' },
    { label: 'THD', value: '31%' }
  ];

  const details = [
    { label: 'Serial Number', value: '5342141541' },
    { label: 'Manufacturer', value: 'GE' },
    { label: 'Year of Manufacture', value: '2021' },
    { label: 'Maximum RPM', value: '10000' }
  ];

  return (
    <div className="space-y-6">
      {/* Switchgear Image */}
      <Card className="shadow-lg border-0 bg-white">
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <img 
              src="/lovable-uploads/1d5c7233-a81d-4c42-8af6-9af6467270be.png" 
              alt="Switchgear Unit" 
              className="w-full max-w-[200px] mx-auto rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {electricalData.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="font-medium text-slate-600">{item.label}</span>
                <span className="text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Equipment Details */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-slate-800">ES-EE942-01 A13 details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {details.map((detail, index) => (
              <div key={index} className="flex justify-between items-start">
                <span className="text-sm font-medium text-slate-600">{detail.label}</span>
                <span className="text-sm text-slate-800 text-right">{detail.value}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-slate-200">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
              View more
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-slate-800">Recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-sm text-slate-700">Recommendation S1 Status</div>
            <div className="text-sm text-slate-700">Recommendation S2 Status</div>
            <div className="text-sm text-slate-700">Recommendation S2 Status</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

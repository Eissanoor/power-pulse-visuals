
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TransformerDetails = () => {
  const details = [
    { label: 'Nameplate', value: '2' },
    { label: 'Asset Category', value: '2' },
    { label: 'Location', value: 'RICEVITRICE IPPODROM0' },
    { label: 'Associated Substation Tag', value: 'RICEVITRICE IPPODROM0' },
  ];

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-slate-800">TRANSFORMER Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {details.map((detail, index) => (
            <div key={index} className="flex justify-between items-start">
              <span className="text-sm font-medium text-slate-600">{detail.label}</span>
              <span className="text-sm text-slate-800 text-right max-w-[150px]">{detail.value}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-slate-200">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">Latest Expert Recommendation</h4>
            <div className="text-xs text-yellow-700">No Recommendation</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

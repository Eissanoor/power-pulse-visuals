
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export const ActionPanel = () => {
  const actions = [
    {
      id: 1,
      title: "DGA HI Dielectric Action",
      description: "Reliability slightly Reduced. Fair Electric and Thermal Status. Perform Windings Resistance Test within 03 months.",
      priority: "high",
      date: "2024-06-19"
    },
    {
      id: 2,
      title: "DGA HI Thermal Action",
      description: "Solid Insulation has aged heavily. Perform Oil sampling within 06 Months for Dissolved Gases and Oil Analysis.",
      priority: "critical",
      date: "2024-06-18"
    }
  ];

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-slate-800">Action Generated</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action) => (
            <div 
              key={action.id}
              className={`p-3 rounded-lg border-l-4 ${
                action.priority === 'critical' 
                  ? 'bg-red-50 border-red-500' 
                  : 'bg-yellow-50 border-yellow-500'
              }`}
            >
              <div className="flex items-start gap-2">
                <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                  action.priority === 'critical' ? 'text-red-600' : 'text-yellow-600'
                }`} />
                <div className="flex-1">
                  <h4 className={`font-medium text-sm ${
                    action.priority === 'critical' ? 'text-red-800' : 'text-yellow-800'
                  }`}>
                    {action.title}
                  </h4>
                  <p className={`text-xs mt-1 ${
                    action.priority === 'critical' ? 'text-red-700' : 'text-yellow-700'
                  }`}>
                    {action.description}
                  </p>
                  <div className="text-xs text-slate-500 mt-2">{action.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

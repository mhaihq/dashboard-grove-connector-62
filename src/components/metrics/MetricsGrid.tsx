
import React from 'react';
import MetricCard, { MetricProps } from './MetricCard';

interface MetricsGridProps {
  metrics: Array<MetricProps>;
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {metrics.map((metric, index) => (
        <MetricCard 
          key={index}
          title={metric.title}
          status={metric.status}
          icon={metric.icon}
          description={metric.description}
          value={metric.value}
          change={metric.change}
          insights={metric.insights}
        />
      ))}
    </div>
  );
};

export default MetricsGrid;

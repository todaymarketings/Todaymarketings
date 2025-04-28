// src/components/PerformanceChart.jsx
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PerformanceChart = () => {
  const [data] = useState([
    { name: "1", clicks: 400 },
    { name: "5", clicks: 600 },
    { name: "10", clicks: 500 },
    { name: "15", clicks: 800 },
    { name: "20", clicks: 700 },
    { name: "25", clicks: 900 },
    { name: "30", clicks: 800 },
  ]);

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" tick={false} axisLine={false} />
          <YAxis hide={true} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "0.25rem",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            }}
            labelStyle={{
              color: "#4a5568",
              fontWeight: 500,
            }}
          />
          <Line
            type="monotone"
            dataKey="clicks"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: "#3b82f6" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;

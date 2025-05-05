import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const LineChartComponent = ({ data }) => {
  return (
    <div className="line-chart-container" style={{ marginTop: "20px" }}>
      <h2 className="text-xl font-bold mb-4">Product Unit Comparison</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 40, bottom: 20, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis label={{ value: "Units Sold", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value" // Replace with the relevant field from the API
            stroke="#1890ff"
            dot={{ r: 6, stroke: "#1890ff", strokeWidth: 2, fill: "#fff" }}
            activeDot={{ r: 8, stroke: "#1890ff", strokeWidth: 2, fill: "#fff" }}
            name="Units Sold"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
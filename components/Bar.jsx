import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
} from "recharts";

const BarChartComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      const transformedData = res.data.map((item, index) => ({
        name: item.title.substring(0, 10) + "...",
        production: item.price * 10, // mock production in kWh
        yield: item.rating.rate, // specific yield in kWh/kWp
        pr: item.rating.rate * 10, // mock PR (%)
        efficiency: item.rating.count / 10, // mock Efficiency (%)
      }));
      setData(transformedData);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spin className="p-4" size="large" />;

  return (
    <div style={{ width: "100%", height: 500 }}>
      <h2 className="text-xl font-bold mb-4">Multi-Metric Product Chart</h2>
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{ top: 20, right: 40, bottom: 20, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={80} />
          <YAxis yAxisId="left" label={{ value: "kWh / %", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          {/* Bar for Production */}
          <Bar yAxisId="left" dataKey="production" fill="#b39ddb" name="Production (kWh)" />
          {/* Line for Specific Yield with black markers */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="yield"
            stroke="#000" // Black line
            dot={{ r: 6, stroke: "#000", strokeWidth: 2, fill: "#000" }} // Black markers
            activeDot={{ r: 8, stroke: "#000", strokeWidth: 2, fill: "#fff" }} // Highlighted marker on hover
            name="Specific Yield (kWh/kWp)"
          />
          {/* Line for PR */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="pr"
            stroke="#00c49f"
            strokeDasharray="5 5"
            dot={{ r: 4, stroke: "#00c49f", strokeWidth: 2, fill: "#fff" }}
            name="PR (%)"
          />
          {/* Line for Efficiency */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="efficiency"
            stroke="#ff7300"
            strokeDasharray="3 3"
            dot={{ r: 4, stroke: "#ff7300", strokeWidth: 2, fill: "#fff" }}
            name="Efficiency (%)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
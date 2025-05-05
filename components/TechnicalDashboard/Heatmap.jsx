import React, { useEffect, useState } from "react";
import { Tooltip } from "antd"; // Use Ant Design's Tooltip
import axios from "axios";

const deviationColor = (deviation) => {
  if (deviation < -7.5) return "#f4c542"; // Orange
  if (deviation < -5) return "#ffe08a"; // Light Yellow
  if (deviation < -2.5) return "#fff2cc";
  if (deviation < 0) return "#ffffe0";
  return "#ffffff"; // Default
};

const Heatmap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setData(res.data);
    });
  }, []);

  const blocks = ["BLOCK_A", "BLOCK_B"];
  const itemsPerBlock = Math.ceil(data.length / blocks.length);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Product Deviation Heatmap</h2>
      <div className="grid grid-cols-[100px_repeat(5,minmax(0,1fr))] gap-1">
        {blocks.map((block, blockIndex) => (
          <React.Fragment key={block}>
            <div className="flex items-center font-semibold">{block}</div>
            {data
              .slice(blockIndex * itemsPerBlock, (blockIndex + 1) * itemsPerBlock)
              .slice(0, 5)
              .map((item, index) => {
                const deviation = (item.rating.rate - 3) * -1.5; // mock deviation calc
                const yieldValue = item.rating.rate;
                return (
                  <Tooltip
                    key={item.id}
                    title={
                      <div>
                        <div><strong>Block:</strong> {block}</div>
                        <div><strong>Deviation:</strong> {deviation.toFixed(2)}%</div>
                        <div><strong>Yield:</strong> {yieldValue}</div>
                      </div>
                    }
                  >
                    <div
                      className="h-16 flex items-center justify-center border"
                      style={{ backgroundColor: deviationColor(deviation) }}
                    >
                      {deviation.toFixed(2)}
                    </div>
                  </Tooltip>
                );
              })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Heatmap;
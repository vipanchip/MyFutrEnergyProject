import React, { useEffect, useState } from "react";
import { SettingOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Popover } from "antd";

const KPI = ({ isEditing, id }) => {
  const [kpis, setKpis] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setKpis(data.slice(0, 12))) // Display only 12 cards
      .catch((err) => console.error("Failed to fetch KPIs:", err));
  }, []);

  return (
    <div className="row plantCardholder">
      {kpis.map((item, index) => (
        <div
          key={item.id}
          className={`col card-item position-relative ${
            index >= 4 ? "space-top no-margin-bottom" : ""
          }`}
        >
          <div className="inner">
            <div className="item">
              <div className="left">
                <div
                  className="icon"
                  style={{ backgroundColor: "rgb(217, 249, 255)" }}
                />
                <div className="text">
                  {item.title.slice(0, 15)}
                  <Popover
                    title="Product Info"
                    content={item.description}
                    placement="top"
                  >
                    <QuestionCircleOutlined
                      style={{ marginLeft: 8, color: "#999", cursor: "pointer" }}
                    />
                  </Popover>
                </div>
              </div>
              <div className="right">
                ${item.price}
                {isEditing && (
                  <SettingOutlined
                    style={{
                      marginLeft: "10px",
                      cursor: "pointer",
                      color: "#1890ff",
                    }}
                  />
                )}
              </div>
            </div>
            <div className="item">
              <div className="left">
                <div className="icon" style={{ backgroundColor: "#eeeff2" }} />
                <div className="text">Rating: {item.rating.rate}</div>
              </div>
              <div className="right">{item.rating.count} votes</div>
            </div>
          </div>
        </div>
      ))}
      <style jsx>{`
        .row {
          display: flex;
          flex-wrap: wrap;
          margin-right: -0.625rem;
          margin-left: -0.625rem;
          padding-top: 1.5rem;
          padding-bottom: 1.5rem;
        }
        .col {
          padding-right: 0.625rem;
          padding-left: 0.625rem;
          flex-grow: 0;
          flex-shrink: 0;
          flex-basis: calc(25% - 0.625rem);
        }
        .inner {
          padding: 1rem;
          background-color: #fff;
          border-radius: 0.25rem;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 1;
        }
        .item + .item {
          border-top: thin dashed #d9dee4;
          margin-top: 0.625rem;
          padding-top: 0.625rem;
        }
        .left {
          display: flex;
          align-items: center;
        }
        .icon {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin-right: 8px;
        }
        .text {
          font-size: 14px;
          color: #333;
          display: flex;
          align-items: center;
        }
        .right {
          font-weight: bold;
          color: #222;
          font-size: 16px;
          display: flex;
          align-items: center;
        }
        .space-top {
          margin-top: 1rem;
        }
        .no-margin-bottom {
          margin-bottom: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default KPI;

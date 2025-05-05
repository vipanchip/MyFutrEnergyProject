import React from "react";
import { DatePicker, Select } from "antd";
import { BellOutlined, SettingOutlined, ClockCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

const TopBar = ({ uniqueCategories, handleStateChange }) => {
  return (
    <div className="top-bar-container">
      <div className="left-section">
        <div className="just-text">
          RMS Dashboard &gt; <span className="highlight">Technical Dashboard</span>
        </div>
        <div className="synced-status">
          <ClockCircleOutlined style={{ marginRight: "4px" }} />
          Last synced a minute ago
        </div>
      </div>

      <div className="topbar-right">
        <button className="plant-button">Plant On</button>

        {/* Wrapper div for DatePicker with padding */}
        <div className="nav-item datepicker_01">
          <DatePicker className="date-picker" defaultValue={null} format="DD-MM-YYYY" />
        </div>

        <Select
          showSearch
          placeholder="VBL_Sandilla"
          className="site-select"
          optionFilterProp="children"
          onChange={handleStateChange}
          allowClear
        >
          {uniqueCategories.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>

        <div className="icon-buttons">
          <button className="icon-button">
            <SettingOutlined />
          </button>
          <button className="icon-button">
            <BellOutlined />
          </button>
        </div>
      </div>

      <style jsx>{`
        .top-bar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.25rem 0.75rem 1rem;
          background: #fff;
          border-bottom: 1px solid #f0f0f0;
        }
        .left-section {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .just-text {
          font-size: 14px;
          color: #333;
        }
        .highlight {
          color: #0066ff;
          font-weight: 500;
        }
        .synced-status {
          display: flex;
          align-items: center;
          font-size: 12px;
          color: #999;
        }
        .topbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .plant-button {
          background-color: #4fcd36;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
        }
        .plant-button:hover {
          background-color: #45b832;
        }
        .nav-item.datepicker_01 {
          padding-left: 1.5rem; /* Add padding to the wrapper div */
        }
        .date-picker {
          height: 32px; /* Match the height */
          padding: 7px 11px; /* Match the padding */
          background: #ffffff;
          border: 1px solid #d9d9d9;
          box-sizing: border-box;
          font-size: 14px;
          line-height: 1;
          color: rgba(0, 0, 0, 0.88);
        }
        .site-select {
          width: 150px;
        }
        .icon-buttons {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .icon-button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          color: #333;
        }
        .icon-button:hover {
          color: #0066ff;
        }
      `}</style>
    </div>
  );
};

export default TopBar;
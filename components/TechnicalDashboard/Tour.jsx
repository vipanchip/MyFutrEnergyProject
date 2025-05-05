import React, { useState, useEffect } from "react";
import { Modal, Tour } from "antd";

const steps = [
  {
    title: "KPI Section",
    description: "This section shows key performance indicators.",
    target: () => document.getElementById("kpi-cards"),
  },
  {
    title: "Smart Alerts",
    description: "Here are alerts for significant events or statuses.",
    target: () => document.getElementById("smart-alerts"),
  },
  {
    title: "Graphs",
    description: "These graphs display pricing and rating trends.",
    target: () => document.getElementById("graphs-section"),
  },
];

const TourGuide = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);

  useEffect(() => {
    setIsModalVisible(true);
  }, []);

  const startTour = () => {
    setIsModalVisible(false);
    setIsTourOpen(true);
  };

  const declineTour = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        open={isModalVisible}
        closable={false}
        footer={null}
        centered
        maskStyle={{ backdropFilter: "blur(4px)" }}
      >
        <div style={{ textAlign: "center", padding: "10px 0" }}>
          <h3>Want a quick tour?</h3>
          <p>Click below to explore the dashboard features.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
            <button
              onClick={declineTour}
              style={{
                padding: "8px 16px",
                border: "1px solid #d9d9d9",
                background: "#fff",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              No Thanks
            </button>
            <button
              onClick={startTour}
              style={{
                padding: "8px 16px",
                border: "none",
                background: "#1677ff",
                color: "#fff",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Start Tour
            </button>
          </div>
        </div>
      </Modal>

      <Tour open={isTourOpen} onClose={() => setIsTourOpen(false)} steps={steps} />
    </>
  );
};

export default TourGuide;

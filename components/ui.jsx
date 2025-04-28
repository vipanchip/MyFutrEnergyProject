import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TopBar from "../components/TopBar";
import { Card, Spin, Button, Table, Collapse } from "antd";
import {
  EditOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Heatmap from "./Heatmap";
import BarChartComponent from "./Bar";
import LineChartComponent from "./line";
import KPI from "./KPI";

const { Panel } = Collapse;

const alertColumns = [
  {
    title: "Alert Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price) => `$${price.toFixed(2)}`,
  },
];

const UI = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [priceData, setPriceData] = useState([]);
  const [ratingData, setRatingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [alerts, setAlerts] = useState([]);
  const [additionalProducts, setAdditionalProducts] = useState([]);

  const uniqueCategories =
    products.length > 0
      ? [...new Set(products.map((item) => item.category))]
      : [];

  const handleSearch = (value, key) => {
    console.log(`Search for ${value} in ${key}`);
  };

  const handleStateChange = (value) => {
    console.log(`Selected plant: ${value}`);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setAlerts(data.slice(0, 5));
        const shuffledData = data.sort(() => 0.5 - Math.random());
        setAdditionalProducts(shuffledData.slice(0, 5));
        setLoading(false);

        const priceChartData = data.slice(0, 8).map((item, index) => ({
          time: `Product ${index + 1}`,
          value: item.price,
          irradiation: item.price * 10,
        }));

        const ratingChartData = data.slice(0, 8).map((item, index) => ({
          time: `Product ${index + 1}`,
          value: item.rating.count,
        }));

        setPriceData(priceChartData);
        setRatingData(ratingChartData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const priceChartOptions = {
    chart: { type: "line" },
    title: { text: "Product Prices" },
    xAxis: {
      categories: priceData.map((item) => item.time),
      title: { text: "Products" },
    },
    yAxis: { title: { text: "Price (USD)" } },
    series: [
      {
        name: "Price",
        data: priceData.map((item) => item.value),
        color: "#1890ff",
      },
    ],
  };

  const ratingChartOptions = {
    chart: { type: "column" },
    title: { text: "Product Ratings Count" },
    xAxis: {
      categories: ratingData.map((item) => item.time),
      title: { text: "Products" },
    },
    yAxis: { title: { text: "Ratings Count" } },
    series: [
      {
        name: "Ratings Count",
        data: ratingData.map((item) => item.value),
        color: "#52c41a",
      },
    ],
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  const additionalColumns = [
    ...columns,
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: () => (
        <span style={{ color: "green", fontWeight: "bold" }}>Available</span>
      ),
    },
  ];

  return (
    <Layout>
      <TopBar
        uniqueCategories={uniqueCategories}
        handleSearch={handleSearch}
        handleStateChange={handleStateChange}
      />
      <div className="edit-button-container">
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={handleEditClick}
          style={{
            marginTop: "20px",
            backgroundColor: "#1890ff",
            borderColor: "#1890ff",
          }}
        >
          {isEditing ? "Done" : "Edit"}
        </Button>
      </div>

      <KPI isEditing={isEditing} products={products} loading={loading} />

      <div className="smart-alerts-container">
        <Collapse
          expandIcon={({ isActive }) =>
            isActive ? <UpOutlined /> : <DownOutlined />
          }
        >
          <Panel header="Smart Alerts" key="1">
            <Table
              columns={alertColumns}
              dataSource={alerts}
              rowKey="id"
              pagination={false}
            />
          </Panel>
        </Collapse>
      </div>

      <div className="graphs-container">
        <div className="row">
          <div className="col" style={{ width: "100%", maxWidth: "50%" }}>
            <Card title="Product Prices" bordered={false}>
              <HighchartsReact
                highcharts={Highcharts}
                options={priceChartOptions}
              />
            </Card>
          </div>
          <div className="col" style={{ width: "100%", maxWidth: "50%" }}>
            <Card title="Product Ratings Count" bordered={false}>
              <HighchartsReact
                highcharts={Highcharts}
                options={ratingChartOptions}
              />
            </Card>
          </div>
        </div>
      </div>

      <div className="table-container">
        <Card title="Product Details" bordered={false}>
          <Table
            columns={columns}
            dataSource={products}
            rowKey="id"
            pagination={{
              current: currentPage,
              pageSize: 2,
              onChange: (page) => setCurrentPage(page),
            }}
          />
        </Card>
      </div>

      <div className="additional-product-details-container">
        <Card title="Additional Product Details" bordered={false}>
          <div className="row" style={{ marginBottom: "20px" }}>
            <div className="col" style={{ width: "100%", maxWidth: "25%" }}>
              <div className="status-block" style={{ backgroundColor: "#52c41a" }}>
                <h3>34</h3>
                <p>Generating</p>
              </div>
            </div>
            <div className="col" style={{ width: "100%", maxWidth: "25%" }}>
              <div className="status-block" style={{ backgroundColor: "#faad14" }}>
                <h3>0</h3>
                <p>Under Performance</p>
              </div>
            </div>
            <div className="col" style={{ width: "100%", maxWidth: "25%" }}>
              <div className="status-block" style={{ backgroundColor: "#722ed1" }}>
                <h3>0</h3>
                <p>Sleeping</p>
              </div>
            </div>
            <div className="col" style={{ width: "100%", maxWidth: "25%" }}>
              <div className="status-block" style={{ backgroundColor: "#fadb14" }}>
                <h3>0</h3>
                <p>Non Operational</p>
              </div>
            </div>
          </div>
          <Table
            columns={additionalColumns}
            dataSource={additionalProducts}
            rowKey="id"
            pagination={false}
          />
        </Card>
      </div>

      <div className="heatmap-container">
        <Heatmap />
      </div>
      <div className="bar-chart-container">
        <BarChartComponent />
      </div>
      <div className="line-chart-container">
        <LineChartComponent data={priceData} />
      </div>

      <style jsx>{`
        .edit-button-container {
          display: flex;
          justify-content: flex-end;
          padding: 10px 20px;
        }
        .kpi-container,
        .smart-alerts-container,
        .graphs-container,
        .table-container,
        .additional-product-details-container,
        .heatmap-container,
        .bar-chart-container,
        .line-chart-container {
          padding: 20px;
        }
        .status-block {
          text-align: center;
          padding: 20px;
          border-radius: 8px;
          color: white;
          font-weight: bold;
        }
      `}</style>

      <style jsx global>{`
        .row {
          display: flex;
          flex-wrap: wrap;
          margin-right: -0.625rem;
          margin-left: -0.625rem;
        }
        .col {
          padding-right: 0.625rem;
          padding-left: 0.625rem;
        }
        body {
          background-color: #eeeff2;
        }
      `}</style>
    </Layout>
  );
};

export default UI;

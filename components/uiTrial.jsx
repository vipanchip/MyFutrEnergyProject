import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TopBar from "../components/TopBar";
import { Card, Row, Col, Spin, Button, Table, Collapse } from "antd";
import { EditOutlined, SettingOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const { Panel } = Collapse;

// Define alertColumns to avoid errors
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
  const [isEditing, setIsEditing] = useState(false); // State to toggle settings visibility
  const [priceData, setPriceData] = useState([]); // Data for the first chart
  const [ratingData, setRatingData] = useState([]); // Data for the second chart
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [alerts, setAlerts] = useState([]); // Data for Smart Alerts
  const [inverters, setInverters] = useState([]); // Data for Inverter Details

  const uniqueCategories = products.length > 0 
    ? [...new Set(products.map((item) => item.category))] 
    : [];

  const handleSearch = (value, key) => {
    console.log(`Search for ${value} in ${key}`);
  };

  const handleStateChange = (value) => {
    console.log(`Selected plant: ${value}`);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing); // Toggle the editing state
  };

  useEffect(() => {
    // Fetch data from the API
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setAlerts(data.slice(0, 5)); // Use a subset of data for Smart Alerts
        setInverters(data.slice(0, 5)); // Use a subset of data for Inverter Details
        setLoading(false);

        // Process data for charts
        const priceChartData = data.slice(0, 8).map((item, index) => ({
          time: `Product ${index + 1}`,
          value: item.price,
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

  // Highcharts configuration for the first chart (Price Chart)
  const priceChartOptions = {
    chart: {
      type: "line",
    },
    title: {
      text: "Product Prices",
    },
    xAxis: {
      categories: priceData.map((item) => item.time),
      title: {
        text: "Products",
      },
    },
    yAxis: {
      title: {
        text: "Price (USD)",
      },
    },
    series: [
      {
        name: "Price",
        data: priceData.map((item) => item.value),
        color: "#1890ff",
      },
    ],
  };

  // Highcharts configuration for the second chart (Rating Count Chart)
  const ratingChartOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "Product Ratings Count",
    },
    xAxis: {
      categories: ratingData.map((item) => item.time),
      title: {
        text: "Products",
      },
    },
    yAxis: {
      title: {
        text: "Ratings Count",
      },
    },
    series: [
      {
        name: "Ratings Count",
        data: ratingData.map((item) => item.value),
        color: "#52c41a",
      },
    ],
  };

  // Table columns for Product Details
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

  // Table columns for Inverter Details
  const inverterColumns = [
    {
      title: "Inverter ID",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Overloading",
      dataIndex: "overloading",
      key: "overloading",
      render: () => "0%", // Example static data
    },
    {
      title: "DC Load (kW)",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toFixed(2)} kW`,
    },
    {
      title: "Daily Energy",
      dataIndex: "dailyEnergy",
      key: "dailyEnergy",
      render: () => "228 kWh", // Example static data
    },
    {
      title: "Specific Yield",
      dataIndex: "specificYield",
      key: "specificYield",
      render: () => "1.64", // Example static data
    },
    {
      title: "Efficiency",
      dataIndex: "efficiency",
      key: "efficiency",
      render: () => "96.61%", // Example static data
    },
    {
      title: "Daily PR (%)",
      dataIndex: "dailyPR",
      key: "dailyPR",
      render: () => "82.63%", // Example static data
    },
    {
      title: "Peak Power",
      dataIndex: "peakPower",
      key: "peakPower",
      render: () => "83.96 kW", // Example static data
    },
    {
      title: "Active Power",
      dataIndex: "activePower",
      key: "activePower",
      render: () => "83.96 kW", // Example static data
    },
    {
      title: "Downtime",
      dataIndex: "downtime",
      key: "downtime",
      render: () => "0 seconds", // Example static data
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: () => (
        <span style={{ color: "green", fontWeight: "bold" }}>Generating</span>
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
      <div className="kpi-container">
        {loading ? (
          <Spin size="large" />
        ) : (
          <Row gutter={[16, 16]}>
            {products.slice(0, 8).map((product) => (
              <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                <Card
                  title={
                    <div className="card-title">
                      <span className="title-text">{product.title}</span>
                      {isEditing && (
                        <SettingOutlined
                          className="settings-icon"
                          onClick={() => console.log(`Settings clicked for ${product.title}`)}
                        />
                      )}
                    </div>
                  }
                  bordered={false}
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <p>
                    <strong>Price:</strong> ${product.price}
                  </p>
                  <p>
                    <strong>Category:</strong> {product.category}
                  </p>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
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
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card title="Product Prices" bordered={false}>
              <HighchartsReact highcharts={Highcharts} options={priceChartOptions} />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="Product Ratings Count" bordered={false}>
              <HighchartsReact highcharts={Highcharts} options={ratingChartOptions} />
            </Card>
          </Col>
        </Row>
      </div>
      <div className="table-container">
        <Card title="Product Details" bordered={false}>
          <Table
            columns={columns}
            dataSource={products}
            rowKey="id"
            pagination={{
              current: currentPage,
              pageSize: 2, // Show only 2 rows per page
              onChange: (page) => setCurrentPage(page),
            }}
          />
        </Card>
      </div>
      <div className="inverter-details-container">
        <Card title="Inverter Details" bordered={false}>
          <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
            <Col xs={24} sm={12} md={6}>
              <div className="status-block" style={{ backgroundColor: "#52c41a" }}>
                <h3>34</h3>
                <p>Generating</p>
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div className="status-block" style={{ backgroundColor: "#faad14" }}>
                <h3>0</h3>
                <p>Under Performance</p>
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div className="status-block" style={{ backgroundColor: "#722ed1" }}>
                <h3>0</h3>
                <p>Sleeping</p>
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div className="status-block" style={{ backgroundColor: "#fadb14" }}>
                <h3>0</h3>
                <p>Non Operational</p>
              </div>
            </Col>
          </Row>
          <Table
            columns={inverterColumns}
            dataSource={inverters}
            rowKey="id"
            pagination={false}
          />
        </Card>
      </div>
      <style jsx>{`
        .edit-button-container {
          display: flex;
          justify-content: flex-end;
          padding: 10px 20px;
        }
        .kpi-container {
          padding: 20px;
        }
        .smart-alerts-container {
          padding: 20px;
        }
        .graphs-container {
          padding: 20px;
        }
        .table-container {
          padding: 20px;
        }
        .inverter-details-container {
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
    </Layout>
  );
};

export default UI;


import React, { useEffect, useState } from "react";
// import Layout from "../components/Layout";
// import TopBar from "../components/TopBar";
// import { Card, Row, Col, Spin, Button, Table, Collapse } from "antd";
// import { EditOutlined, SettingOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import Heatmap from "./Heatmap"; // Import the Heatmap component
// import BarChartComponent from "./Bar"; // Import the Bar Chart component

// const { Panel } = Collapse;

// // Define alertColumns to avoid errors
// const alertColumns = [
//   {
//     title: "Alert Title",
//     dataIndex: "title",
//     key: "title",
//   },
//   {
//     title: "Category",
//     dataIndex: "category",
//     key: "category",
//   },
//   {
//     title: "Price",
//     dataIndex: "price",
//     key: "price",
//     render: (price) => `$${price.toFixed(2)}`,
//   },
// ];

// const UI = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false); // State to toggle settings visibility
//   const [priceData, setPriceData] = useState([]); // Data for the first chart
//   const [ratingData, setRatingData] = useState([]); // Data for the second chart
//   const [currentPage, setCurrentPage] = useState(1); // Pagination state
//   const [alerts, setAlerts] = useState([]); // Data for Smart Alerts
//   const [additionalProducts, setAdditionalProducts] = useState([]); // Data for Additional Product Details

//   const uniqueCategories = products.length > 0 
//     ? [...new Set(products.map((item) => item.category))] 
//     : [];

//   const handleSearch = (value, key) => {
//     console.log(`Search for ${value} in ${key}`);
//   };

//   const handleStateChange = (value) => {
//     console.log(`Selected plant: ${value}`);
//   };

//   const handleEditClick = () => {
//     setIsEditing(!isEditing); // Toggle the editing state
//   };

//   useEffect(() => {
//     // Fetch data from the API
//     fetch("https://fakestoreapi.com/products")
//       .then((response) => response.json())
//       .then((data) => {
//         setProducts(data);
//         setAlerts(data.slice(0, 5)); // Use a subset of data for Smart Alerts

//         // Shuffle the data and pick 5 random items for Additional Product Details
//         const shuffledData = data.sort(() => 0.5 - Math.random());
//         setAdditionalProducts(shuffledData.slice(0, 5)); // Pick 5 random items

//         setLoading(false);

//         // Process data for charts
//         const priceChartData = data.slice(0, 8).map((item, index) => ({
//           time: `Product ${index + 1}`,
//           value: item.price,
//         }));

//         const ratingChartData = data.slice(0, 8).map((item, index) => ({
//           time: `Product ${index + 1}`,
//           value: item.rating.count,
//         }));

//         setPriceData(priceChartData);
//         setRatingData(ratingChartData);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       });
//   }, []);

//   // Highcharts configuration for the first chart (Price Chart)
//   const priceChartOptions = {
//     chart: {
//       type: "line",
//     },
//     title: {
//       text: "Product Prices",
//     },
//     xAxis: {
//       categories: priceData.map((item) => item.time),
//       title: {
//         text: "Products",
//       },
//     },
//     yAxis: {
//       title: {
//         text: "Price (USD)",
//       },
//     },
//     series: [
//       {
//         name: "Price",
//         data: priceData.map((item) => item.value),
//         color: "#1890ff",
//       },
//     ],
//   };

//   // Highcharts configuration for the second chart (Rating Count Chart)
//   const ratingChartOptions = {
//     chart: {
//       type: "column",
//     },
//     title: {
//       text: "Product Ratings Count",
//     },
//     xAxis: {
//       categories: ratingData.map((item) => item.time),
//       title: {
//         text: "Products",
//       },
//     },
//     yAxis: {
//       title: {
//         text: "Ratings Count",
//       },
//     },
//     series: [
//       {
//         name: "Ratings Count",
//         data: ratingData.map((item) => item.value),
//         color: "#52c41a",
//       },
//     ],
//   };

//   // Table columns for Product Details
//   const columns = [
//     {
//       title: "Title",
//       dataIndex: "title",
//       key: "title",
//     },
//     {
//       title: "Category",
//       dataIndex: "category",
//       key: "category",
//     },
//     {
//       title: "Price",
//       dataIndex: "price",
//       key: "price",
//       render: (price) => `$${price.toFixed(2)}`,
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//       key: "description",
//     },
//   ];

//   // Table columns for Additional Product Details
//   const additionalColumns = [
//     ...columns,
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: () => (
//         <span style={{ color: "green", fontWeight: "bold" }}>Available</span>
//       ),
//     },
//   ];

//   return (
//     <Layout>
//       <TopBar
//         uniqueCategories={uniqueCategories}
//         handleSearch={handleSearch}
//         handleStateChange={handleStateChange}
//       />
//       <div className="edit-button-container">
//         <Button
//           type="primary"
//           icon={<EditOutlined />}
//           onClick={handleEditClick}
//           style={{
//             marginTop: "20px",
//             backgroundColor: "#1890ff",
//             borderColor: "#1890ff",
//           }}
//         >
//           {isEditing ? "Done" : "Edit"}
//         </Button>
//       </div>
//       <div className="kpi-container">
//         {loading ? (
//           <Spin size="large" />
//         ) : (
//           <Row gutter={[16, 16]}>
//             {products.slice(0, 8).map((product) => (
//               <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
//                 <Card
//                   title={
//                     <div className="card-title">
//                       <span className="title-text">{product.title}</span>
//                       {isEditing && (
//                         <SettingOutlined
//                           className="settings-icon"
//                           onClick={() => console.log(`Settings clicked for ${product.title}`)}
//                         />
//                       )}
//                     </div>
//                   }
//                   bordered={false}
//                   style={{
//                     borderRadius: "8px",
//                     boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//                   }}
//                 >
//                   <p>
//                     <strong>Price:</strong> ${product.price}
//                   </p>
//                   <p>
//                     <strong>Category:</strong> {product.category}
//                   </p>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         )}
//       </div>
//       <div className="smart-alerts-container">
//         <Collapse
//           expandIcon={({ isActive }) =>
//             isActive ? <UpOutlined /> : <DownOutlined />
//           }
//         >
//           <Panel header="Smart Alerts" key="1">
//             <Table
//               columns={alertColumns}
//               dataSource={alerts}
//               rowKey="id"
//               pagination={false}
//             />
//           </Panel>
//         </Collapse>
//       </div>
//       <div className="graphs-container">
//         <Row gutter={[16, 16]}>
//           <Col xs={24} md={12}>
//             <Card title="Product Prices" bordered={false}>
//               <HighchartsReact highcharts={Highcharts} options={priceChartOptions} />
//             </Card>
//           </Col>
//           <Col xs={24} md={12}>
//             <Card title="Product Ratings Count" bordered={false}>
//               <HighchartsReact highcharts={Highcharts} options={ratingChartOptions} />
//             </Card>
//           </Col>
//         </Row>
//       </div>
//       <div className="table-container">
//         <Card title="Product Details" bordered={false}>
//           <Table
//             columns={columns}
//             dataSource={products}
//             rowKey="id"
//             pagination={{
//               current: currentPage,
//               pageSize: 2, // Show only 2 rows per page
//               onChange: (page) => setCurrentPage(page),
//             }}
//           />
//         </Card>
//       </div>
//       <div className="additional-product-details-container">
//         <Card title="Additional Product Details" bordered={false}>
//           {/* Colored Status Blocks */}
//           <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
//             <Col xs={24} sm={12} md={6}>
//               <div className="status-block" style={{ backgroundColor: "#52c41a" }}>
//                 <h3>34</h3>
//                 <p>Generating</p>
//               </div>
//             </Col>
//             <Col xs={24} sm={12} md={6}>
//               <div className="status-block" style={{ backgroundColor: "#faad14" }}>
//                 <h3>0</h3>
//                 <p>Under Performance</p>
//               </div>
//             </Col>
//             <Col xs={24} sm={12} md={6}>
//               <div className="status-block" style={{ backgroundColor: "#722ed1" }}>
//                 <h3>0</h3>
//                 <p>Sleeping</p>
//               </div>
//             </Col>
//             <Col xs={24} sm={12} md={6}>
//               <div className="status-block" style={{ backgroundColor: "#fadb14" }}>
//                 <h3>0</h3>
//                 <p>Non Operational</p>
//               </div>
//             </Col>
//           </Row>
//           {/* Table for Additional Product Details */}
//           <Table
//             columns={additionalColumns}
//             dataSource={additionalProducts}
//             rowKey="id"
//             pagination={false}
//           />
//         </Card>
//       </div>
//       {/* Heatmap Component */}
//       <div className="heatmap-container">
//         <Heatmap />
//       </div>
//       {/* Bar Chart Component */}
//       <div className="bar-chart-container">
//         <BarChartComponent />
//       </div>
//       <style jsx>{`
//         .edit-button-container {
//           display: flex;
//           justify-content: flex-end;
//           padding: 10px 20px;
//         }
//         .kpi-container {
//           padding: 20px;
//         }
//         .smart-alerts-container {
//           padding: 20px;
//         }
//         .graphs-container {
//           padding: 20px;
//         }
//         .table-container {
//           padding: 20px;
//         }
//         .additional-product-details-container {
//           padding: 20px;
//         }
//         .heatmap-container {
//           padding: 20px;
//         }
//         .bar-chart-container {
//           padding: 20px;
//         }
//         .status-block {
//           text-align: center;
//           padding: 20px;
//           border-radius: 8px;
//           color: white;
//           font-weight: bold;
//         }
//         .card-title {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }
//         .title-text {
//           flex: 1;
//           margin-right: 10px; /* Space between text and icon */
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }
//         .settings-icon {
//           font-size: 18px;
//           color: #1890ff;
//           cursor: pointer;
//           flex-shrink: 0; /* Prevent the icon from shrinking */
//         }
//         .settings-icon:hover {
//           color: #40a9ff;
//         }
//       `}</style>
//     </Layout>
//   );
// };

// export default UI;




import React, { useEffect, useState } from "react";
// import Layout from "../components/Layout";
// import TopBar from "../components/TopBar";
// import { Card, Row, Col, Spin, Button, Table, Collapse } from "antd";
// import {
//   EditOutlined,
//   SettingOutlined,
//   DownOutlined,
//   UpOutlined,
// } from "@ant-design/icons";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import Heatmap from "./Heatmap";
// import BarChartComponent from "./Bar";
// import LineChartComponent from "./line"; 

// const { Panel } = Collapse;

// const alertColumns = [
//   {
//     title: "Alert Title",
//     dataIndex: "title",
//     key: "title",
//   },
//   {
//     title: "Category",
//     dataIndex: "category",
//     key: "category",
//   },
//   {
//     title: "Price",
//     dataIndex: "price",
//     key: "price",
//     render: (price) => `$${price.toFixed(2)}`,
//   },
// ];

// const UI = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [priceData, setPriceData] = useState([]);
//   const [ratingData, setRatingData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [alerts, setAlerts] = useState([]);
//   const [additionalProducts, setAdditionalProducts] = useState([]);

//   const uniqueCategories =
//     products.length > 0
//       ? [...new Set(products.map((item) => item.category))]
//       : [];

//   const handleSearch = (value, key) => {
//     console.log(`Search for ${value} in ${key}`);
//   };

//   const handleStateChange = (value) => {
//     console.log(`Selected plant: ${value}`);
//   };

//   const handleEditClick = () => {
//     setIsEditing(!isEditing);
//   };

//   useEffect(() => {
//     fetch("https://fakestoreapi.com/products")
//       .then((response) => response.json())
//       .then((data) => {
//         setProducts(data);
//         setAlerts(data.slice(0, 5));
//         const shuffledData = data.sort(() => 0.5 - Math.random());
//         setAdditionalProducts(shuffledData.slice(0, 5));
//         setLoading(false);

//         const priceChartData = data.slice(0, 8).map((item, index) => ({
//           time: `Product ${index + 1}`,
//           value: item.price,
//           irradiation: item.price * 10, // dummy field for line chart
//         }));

//         const ratingChartData = data.slice(0, 8).map((item, index) => ({
//           time: `Product ${index + 1}`,
//           value: item.rating.count,
//         }));

//         setPriceData(priceChartData);
//         setRatingData(ratingChartData);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       });
//   }, []);

//   const priceChartOptions = {
//     chart: {
//       type: "line",
//     },
//     title: {
//       text: "Product Prices",
//     },
//     xAxis: {
//       categories: priceData.map((item) => item.time),
//       title: {
//         text: "Products",
//       },
//     },
//     yAxis: {
//       title: {
//         text: "Price (USD)",
//       },
//     },
//     series: [
//       {
//         name: "Price",
//         data: priceData.map((item) => item.value),
//         color: "#1890ff",
//       },
//     ],
//   };

//   const ratingChartOptions = {
//     chart: {
//       type: "column",
//     },
//     title: {
//       text: "Product Ratings Count",
//     },
//     xAxis: {
//       categories: ratingData.map((item) => item.time),
//       title: {
//         text: "Products",
//       },
//     },
//     yAxis: {
//       title: {
//         text: "Ratings Count",
//       },
//     },
//     series: [
//       {
//         name: "Ratings Count",
//         data: ratingData.map((item) => item.value),
//         color: "#52c41a",
//       },
//     ],
//   };

//   const columns = [
//     {
//       title: "Title",
//       dataIndex: "title",
//       key: "title",
//     },
//     {
//       title: "Category",
//       dataIndex: "category",
//       key: "category",
//     },
//     {
//       title: "Price",
//       dataIndex: "price",
//       key: "price",
//       render: (price) => `$${price.toFixed(2)}`,
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//       key: "description",
//     },
//   ];

//   const additionalColumns = [
//     ...columns,
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: () => (
//         <span style={{ color: "green", fontWeight: "bold" }}>Available</span>
//       ),
//     },
//   ];

//   return (
//     <Layout>
//       <TopBar
//         uniqueCategories={uniqueCategories}
//         handleSearch={handleSearch}
//         handleStateChange={handleStateChange}
//       />
//       <div className="edit-button-container">
//         <Button
//           type="primary"
//           icon={<EditOutlined />}
//           onClick={handleEditClick}
//           style={{
//             marginTop: "20px",
//             backgroundColor: "#1890ff",
//             borderColor: "#1890ff",
//           }}
//         >
//           {isEditing ? "Done" : "Edit"}
//         </Button>
//       </div>
//       <div className="kpi-container">
//         {loading ? (
//           <Spin size="large" />
//         ) : (
//           <Row gutter={[16, 16]}>
//             {products.slice(0, 8).map((product) => (
//               <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
//                 <Card
//                   title={
//                     <div className="card-title">
//                       <span className="title-text">{product.title}</span>
//                       {isEditing && (
//                         <SettingOutlined
//                           className="settings-icon"
//                           onClick={() =>
//                             console.log(`Settings clicked for ${product.title}`)
//                           }
//                         />
//                       )}
//                     </div>
//                   }
//                   bordered={false}
//                   style={{
//                     borderRadius: "8px",
//                     boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//                   }}
//                 >
//                   <p>
//                     <strong>Price:</strong> ${product.price}
//                   </p>
//                   <p>
//                     <strong>Category:</strong> {product.category}
//                   </p>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         )}
//       </div>
//       <div className="smart-alerts-container">
//         <Collapse
//           expandIcon={({ isActive }) =>
//             isActive ? <UpOutlined /> : <DownOutlined />
//           }
//         >
//           <Panel header="Smart Alerts" key="1">
//             <Table
//               columns={alertColumns}
//               dataSource={alerts}
//               rowKey="id"
//               pagination={false}
//             />
//           </Panel>
//         </Collapse>
//       </div>
//       <div className="graphs-container">
//         <Row gutter={[16, 16]}>
//           <Col xs={24} md={12}>
//             <Card title="Product Prices" bordered={false}>
//               <HighchartsReact highcharts={Highcharts} options={priceChartOptions} />
//             </Card>
//           </Col>
//           <Col xs={24} md={12}>
//             <Card title="Product Ratings Count" bordered={false}>
//               <HighchartsReact highcharts={Highcharts} options={ratingChartOptions} />
//             </Card>
//           </Col>
//         </Row>
//       </div>
//       <div className="table-container">
//         <Card title="Product Details" bordered={false}>
//           <Table
//             columns={columns}
//             dataSource={products}
//             rowKey="id"
//             pagination={{
//               current: currentPage,
//               pageSize: 2,
//               onChange: (page) => setCurrentPage(page),
//             }}
//           />
//         </Card>
//       </div>
//       <div className="additional-product-details-container">
//         <Card title="Additional Product Details" bordered={false}>
//           <Row gutter={[0, 0]} style={{ marginBottom: "20px" }}>
//             <Col xs={24} sm={12} md={6}>
//               <div className="status-block" style={{ backgroundColor: "#52c41a" }}>
//                 <h3>34</h3>
//                 <p>Generating</p>
//               </div>
//             </Col>
//             <Col xs={24} sm={12} md={6}>
//               <div className="status-block" style={{ backgroundColor: "#faad14" }}>
//                 <h3>0</h3>
//                 <p>Under Performance</p>
//               </div>
//             </Col>
//             <Col xs={24} sm={12} md={6}>
//               <div className="status-block" style={{ backgroundColor: "#722ed1" }}>
//                 <h3>0</h3>
//                 <p>Sleeping</p>
//               </div>
//             </Col>
//             <Col xs={24} sm={12} md={6}>
//               <div className="status-block" style={{ backgroundColor: "#fadb14" }}>
//                 <h3>0</h3>
//                 <p>Non Operational</p>
//               </div>
//             </Col>
//           </Row>
//           <Table
//             columns={additionalColumns}
//             dataSource={additionalProducts}
//             rowKey="id"
//             pagination={false}
//           />
//         </Card>
//       </div>
//       <div className="heatmap-container">
//         <Heatmap />
//       </div>
//       <div className="bar-chart-container">
//         <BarChartComponent />
//       </div>
//       {/* ✅ Line Chart Component below the Bar Chart */}
//       <div className="line-chart-container">
//         <LineChartComponent data={priceData} />
//       </div>
//       <style jsx>{`
//         .edit-button-container {
//           display: flex;
//           justify-content: flex-end;
//           padding: 10px 20px;
//         }
//         .kpi-container,
//         .smart-alerts-container,
//         .graphs-container,
//         .table-container,
//         .additional-product-details-container,
//         .heatmap-container,
//         .bar-chart-container,
//         .line-chart-container {
//           padding: 20px;
//         }
//         .status-block {
//           text-align: center;
//           padding: 20px;
//           border-radius: 8px;
//           color: white;
//           font-weight: bold;
//         }
//         .card-title {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }
//         .title-text {
//           flex: 1;
//           margin-right: 10px;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }
//         .settings-icon {
//           font-size: 18px;
//           color: #1890ff;
//           cursor: pointer;
//           flex-shrink: 0;
//         }
//         .settings-icon:hover {
//           color: #40a9ff;
//         }
//       `}</style>
//     </Layout>
//   );
// };

// export default UI;



import React, { useEffect, useState } from "react";
// import Layout from "../components/Layout";
// import TopBar from "../components/TopBar";
// import { Card, Row, Col, Spin, Button, Table, Collapse } from "antd";
// import {
//   EditOutlined,
//   SettingOutlined,
//   DownOutlined,
//   UpOutlined,
// } from "@ant-design/icons";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import Heatmap from "./Heatmap";
// import BarChartComponent from "./Bar";
// import LineChartComponent from "./line";
// import KPI from "./KPI";

// const { Panel } = Collapse;

// const alertColumns = [
//   {
//     title: "Alert Title",
//     dataIndex: "title",
//     key: "title",
//   },
//   {
//     title: "Category",
//     dataIndex: "category",
//     key: "category",
//   },
//   {
//     title: "Price",
//     dataIndex: "price",
//     key: "price",
//     render: (price) => `$${price.toFixed(2)}`,
//   },
// ];

// const UI = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [priceData, setPriceData] = useState([]);
//   const [ratingData, setRatingData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [alerts, setAlerts] = useState([]);
//   const [additionalProducts, setAdditionalProducts] = useState([]);

//   const uniqueCategories =
//     products.length > 0
//       ? [...new Set(products.map((item) => item.category))]
//       : [];

//   const handleSearch = (value, key) => {
//     console.log(`Search for ${value} in ${key}`);
//   };

//   const handleStateChange = (value) => {
//     console.log(`Selected plant: ${value}`);
//   };

//   const handleEditClick = () => {
//     setIsEditing(!isEditing);
//   };

//   useEffect(() => {
//     fetch("https://fakestoreapi.com/products")
//       .then((response) => response.json())
//       .then((data) => {
//         setProducts(data);
//         setAlerts(data.slice(0, 5));
//         const shuffledData = data.sort(() => 0.5 - Math.random());
//         setAdditionalProducts(shuffledData.slice(0, 5));
//         setLoading(false);

//         const priceChartData = data.slice(0, 8).map((item, index) => ({
//           time: `Product ${index + 1}`,
//           value: item.price,
//           irradiation: item.price * 10,
//         }));

//         const ratingChartData = data.slice(0, 8).map((item, index) => ({
//           time: `Product ${index + 1}`,
//           value: item.rating.count,
//         }));

//         setPriceData(priceChartData);
//         setRatingData(ratingChartData);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       });
//   }, []);

//   const priceChartOptions = {
//     chart: {
//       type: "line",
//     },
//     title: {
//       text: "Product Prices",
//     },
//     xAxis: {
//       categories: priceData.map((item) => item.time),
//       title: {
//         text: "Products",
//       },
//     },
//     yAxis: {
//       title: {
//         text: "Price (USD)",
//       },
//     },
//     series: [
//       {
//         name: "Price",
//         data: priceData.map((item) => item.value),
//         color: "#1890ff",
//       },
//     ],
//   };

//   const ratingChartOptions = {
//     chart: {
//       type: "column",
//     },
//     title: {
//       text: "Product Ratings Count",
//     },
//     xAxis: {
//       categories: ratingData.map((item) => item.time),
//       title: {
//         text: "Products",
//       },
//     },
//     yAxis: {
//       title: {
//         text: "Ratings Count",
//       },
//     },
//     series: [
//       {
//         name: "Ratings Count",
//         data: ratingData.map((item) => item.value),
//         color: "#52c41a",
//       },
//     ],
//   };

//   const columns = [
//     {
//       title: "Title",
//       dataIndex: "title",
//       key: "title",
//     },
//     {
//       title: "Category",
//       dataIndex: "category",
//       key: "category",
//     },
//     {
//       title: "Price",
//       dataIndex: "price",
//       key: "price",
//       render: (price) => `$${price.toFixed(2)}`,
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//       key: "description",
//     },
//   ];

//   const additionalColumns = [
//     ...columns,
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: () => (
//         <span style={{ color: "green", fontWeight: "bold" }}>Available</span>
//       ),
//     },
//   ];

//   return (
//     <Layout>
//       <TopBar
//         uniqueCategories={uniqueCategories}
//         handleSearch={handleSearch}
//         handleStateChange={handleStateChange}
//       />
//       <div className="edit-button-container">
//         <Button
//           type="primary"
//           icon={<EditOutlined />}
//           onClick={handleEditClick}
//           style={{
//             marginTop: "20px",
//             backgroundColor: "#1890ff",
//             borderColor: "#1890ff",
//           }}
//         >
//           {isEditing ? "Done" : "Edit"}
//         </Button>
//       </div>

//       <KPI isEditing={isEditing} products={products} loading={loading} />

//       <div className="smart-alerts-container">
//         <Collapse
//           expandIcon={({ isActive }) =>
//             isActive ? <UpOutlined /> : <DownOutlined />
//           }
//         >
//           <Panel header="Smart Alerts" key="1">
//             <Table
//               columns={alertColumns}
//               dataSource={alerts}
//               rowKey="id"
//               pagination={false}
//             />
//           </Panel>
//         </Collapse>
//       </div>
//       <div className="graphs-container">
//         <Row gutter={[16, 16]}>
//           <Col xs={24} md={12}>
//             <Card title="Product Prices" bordered={false}>
//               <HighchartsReact
//                 highcharts={Highcharts}
//                 options={priceChartOptions}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} md={12}>
//             <Card title="Product Ratings Count" bordered={false}>
//               <HighchartsReact
//                 highcharts={Highcharts}
//                 options={ratingChartOptions}
//               />
//             </Card>
//           </Col>
//         </Row>
//       </div>
//       <div className="table-container">
//         <Card title="Product Details" bordered={false}>
//           <Table
//             columns={columns}
//             dataSource={products}
//             rowKey="id"
//             pagination={{
//               current: currentPage,
//               pageSize: 2,
//               onChange: (page) => setCurrentPage(page),
//             }}
//           />
//         </Card>
//       </div>
//       <div className="additional-product-details-container">
//         <Card title="Additional Product Details" bordered={false}>
//           <Row gutter={[0, 0]} style={{ marginBottom: "20px" }}>
//             <Col xs={24} sm={12} md={6}>
//               <div
//                 className="status-block"
//                 style={{ backgroundColor: "#52c41a" }}
//               >
//                 <h3>34</h3>
//                 <p>Generating</p>
//               </div>
//             </Col>
//             <Col xs={24} sm={12} md={6}>
//               <div
//                 className="status-block"
//                 style={{ backgroundColor: "#faad14" }}
//               >
//                 <h3>0</h3>
//                 <p>Under Performance</p>
//               </div>
//             </Col>
//             <Col xs={24} sm={12} md={6}>
//               <div
//                 className="status-block"
//                 style={{ backgroundColor: "#722ed1" }}
//               >
//                 <h3>0</h3>
//                 <p>Sleeping</p>
//               </div>
//             </Col>
//             <Col xs={24} sm={12} md={6}>
//               <div
//                 className="status-block"
//                 style={{ backgroundColor: "#fadb14" }}
//               >
//                 <h3>0</h3>
//                 <p>Non Operational</p>
//               </div>
//             </Col>
//           </Row>
//           <Table
//             columns={additionalColumns}
//             dataSource={additionalProducts}
//             rowKey="id"
//             pagination={false}
//           />
//         </Card>
//       </div>
//       <div className="heatmap-container">
//         <Heatmap />
//       </div>
//       <div className="bar-chart-container">
//         <BarChartComponent />
//       </div>
//       <div className="line-chart-container">
//         <LineChartComponent data={priceData} />
//       </div>
//       <style jsx>{`
//         .edit-button-container {
//           display: flex;
//           justify-content: flex-end;
//           padding: 10px 20px;
//         }
//         .kpi-container,
//         .smart-alerts-container,
//         .graphs-container,
//         .table-container,
//         .additional-product-details-container,
//         .heatmap-container,
//         .bar-chart-container,
//         .line-chart-container {
//           padding: 20px;
//         }
//         .status-block {
//           text-align: center;
//           padding: 20px;
//           border-radius: 8px;
//           color: white;
//           font-weight: bold;
//         }
//         .card-title {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }
//         .title-text {
//           flex: 1;
//           margin-right: 10px;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }
//         .settings-icon {
//           font-size: 18px;
//           color: #1890ff;
//           cursor: pointer;
//           flex-shrink: 0;
//         }
//         .settings-icon:hover {
//           color: #40a9ff;
//         }
//       `}</style>
//       <style jsx global>{`
//         body {
//           background-color: #eeeff2;
//         }
//       `}</style>
//     </Layout>
//   );
// };

// export default UI;

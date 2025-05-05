// import React, { useState } from 'react';
// import { Table, Input, Row, Col } from 'antd';
// import { plantData } from '../utils/plantData';
// import styles from '../styles/plant.module.scss';

// const { Search } = Input;

// const PlantTable = () => {
//   const [filteredData, setFilteredData] = useState(plantData);

//   const handleSearch = (value, key) => {
//     const filtered = plantData.filter((plant) =>
//       plant[key].toString().toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredData(filtered);
//   };

//   const columns = [
//     { title: 'ID', dataIndex: 'id', key: 'id' },
//     { title: 'Name', dataIndex: 'name', key: 'name' },
//     { title: 'State', dataIndex: 'state', key: 'state' },
//     { title: 'DC Capacity', dataIndex: 'dcCapacity', key: 'dcCapacity' },
//     { title: 'AC Capacity', dataIndex: 'acCapacity', key: 'acCapacity' },
//     { title: 'Location', dataIndex: 'location', key: 'location' },
//     { title: 'Installation Year', dataIndex: 'installationYear', key: 'installationYear' },
//     { title: 'Status', dataIndex: 'status', key: 'status' },
//   ];

//   return (
//     <div className={styles.container}>
//       <Row gutter={16} className={styles.searchBar}>
//         <Col span={12}>
//           <Search
//             placeholder="Search by Name"
//             onSearch={(value) => handleSearch(value, 'name')}
//             enterButton
//           />
//         </Col>
//         <Col span={12}>
//           <Search
//             placeholder="Search by State"
//             onSearch={(value) => handleSearch(value, 'state')}
//             enterButton
//           />
//         </Col>
//       </Row>
//       <Table columns={columns} dataSource={filteredData} rowKey="id" />
//     </div>
//   );
// };

// export default PlantTable;



// import React, { useState } from 'react';
// import { Table, Input, Row, Col, Select } from 'antd';
// import { plantData } from '../utils/plantData';
// import styles from '../styles/plant.module.scss';
// import _get from 'lodash/get';
// import _upperCase from 'lodash/upperCase';
// import { numFormatter_watts, numFormatter } from '../lib/helper';

// const { Search } = Input;
// const { Option } = Select;

// const PlantTable = () => {
//   const [filteredData, setFilteredData] = useState(plantData);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(5);
//   const [livePowerUnit, setLivePowerUnit] = useState('W');
//   const [poaUnit, setPoaUnit] = useState('Wh/m²');
//   const [productionUnit, setProductionUnit] = useState('Wh');

//   const handleSearch = (value, key) => {
//     const filtered = plantData.filter((plant) =>
//       plant[key].toString().toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredData(filtered);
//     setCurrentPage(1); // Reset to first page on search
//   };

//   const handleStateChange = (value) => {
//     if (value === undefined || value === 'All') {
//       setFilteredData(plantData);
//     } else {
//       const filtered = plantData.filter((plant) =>
//         plant.state.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilteredData(filtered);
//     }
//     setCurrentPage(1); // Reset to first page on state change
//   };

//   const handleUnitChange = (value, key) => {
//     if (key === 'livePower') {
//       setLivePowerUnit(value);
//     } else if (key === 'poa') {
//       setPoaUnit(value);
//     } else if (key === 'production') {
//       setProductionUnit(value);
//     }
//   };

//   const columns = [
//     { title: 'ID', dataIndex: 'id', key: 'id' },
//     { title: 'Name', dataIndex: 'name', key: 'name', fixed: 'left' },
//     { title: 'State', dataIndex: 'state', key: 'state' },
//     {
//       title: 'DC Capacity',
//       dataIndex: 'dcCapacity',
//       key: 'dcCapacity',
//       sorter: (a, b) => parseFloat(a.dcCapacity) - parseFloat(b.dcCapacity),
//       sortDirections: ['ascend', 'descend'],
//       render: (text, record) => (
//         <div className="table-text">
//           {`${_get(record, 'dcCapacity', '--')} ${_upperCase(
//             _get(record, 'dcCapacity.units', null)
//           )}`}
//         </div>
//       ),
//     },
//     {
//       title: 'AC Capacity',
//       dataIndex: 'acCapacity',
//       key: 'acCapacity',
//       sorter: (a, b) => parseFloat(a.acCapacity) - parseFloat(b.acCapacity),
//       sortDirections: ['ascend', 'descend'],
//     },
//     { title: 'Location', dataIndex: 'location', key: 'location' },
//     { title: 'Installation Year', dataIndex: 'installationYear', key: 'installationYear' },
//     { title: 'Status', dataIndex: 'status', key: 'status' },
//     { title: 'AC CUF', dataIndex: 'acCUF', key: 'acCUF' },
//     { title: 'PR', dataIndex: 'pr', key: 'pr' },
//     {
//       title: (
//         <div>
//           Production
//           <Select
//             defaultValue="Wh"
//             onChange={(value) => handleUnitChange(value, 'production')}
//             style={{ width: 80, marginLeft: 8 }}
//           >
//             <Option value="Wh">Wh</Option>
//             <Option value="kWh">kWh</Option>
//             <Option value="MWh">MWh</Option>
//             <Option value="GWh">GWh</Option>
//           </Select>
//         </div>
//       ),
//       dataIndex: 'production',
//       key: 'production',
//       render: (text, record) => (
//         <div className="table-text">
//           {numFormatter(record.production, productionUnit)} {productionUnit}
//         </div>
//       ),
//     },
//     {
//       title: (
//         <div>
//           Live Power
//           <Select
//             defaultValue="W"
//             onChange={(value) => handleUnitChange(value, 'livePower')}
//             style={{ width: 80, marginLeft: 8 }}
//           >
//             <Option value="W">W</Option>
//             <Option value="KW">KW</Option>
//             <Option value="MW">MW</Option>
//             <Option value="GW">GW</Option>
//           </Select>
//         </div>
//       ),
//       dataIndex: 'livePower',
//       key: 'livePower',
//       fixed: 'left',
//       render: (text, record) => (
//         <div className="table-text">
//           {numFormatter_watts(record.livePower, livePowerUnit)} {livePowerUnit}
//         </div>
//       ),
//     },
//     {
//       title: (
//         <div>
//           POA
//           <Select
//             defaultValue="Wh/m²"
//             onChange={(value) => handleUnitChange(value, 'poa')}
//             style={{ width: 80, marginLeft: 8 }}
//           >
//             <Option value="Wh/m²">Wh/m²</Option>
//             <Option value="kWh/m²">kWh/m²</Option>
//             <Option value="MWh/m²">MWh/m²</Option>
//           </Select>
//         </div>
//       ),
//       dataIndex: 'poa',
//       key: 'poa',
//       render: (text, record) => (
//         <div className="table-text">
//           {numFormatter(record.poa, poaUnit)} {poaUnit}
//         </div>
//       ),
//     },
//     { title: 'Specific Yield', dataIndex: 'specificYield', key: 'specificYield' },
//     { title: 'Plant Availability', dataIndex: 'plantAvailability', key: 'plantAvailability' },
//     { title: 'Grid Availability', dataIndex: 'gridAvailability', key: 'gridAvailability' },
//     { title: 'Energy Loss', dataIndex: 'energyLoss', key: 'energyLoss' },
//     { title: 'Revenue', dataIndex: 'revenue', key: 'revenue' },
//   ];

//   // Extract unique states from plantData
//   const uniqueStates = [...new Set(plantData.map((plant) => plant.state))];

//   return (
//     <div className={styles.container}>
//       <Row gutter={16} className={styles.searchBar}>
//         <Col span={12}>
//           <Search
//             placeholder="Search by Name"
//             onSearch={(value) => handleSearch(value, 'name')}
//             enterButton
//           />
//         </Col>
//         <Col span={12}>
//           <Select
//             showSearch
//             placeholder="Search by State"
//             optionFilterProp="children"
//             onChange={handleStateChange}
//             allowClear
//             style={{ width: '100%' }}
//           >
//             <Option value="All">All</Option>
//             {uniqueStates.map((state) => (
//               <Option key={state} value={state}>
//                 {state}
//               </Option>
//             ))}
//           </Select>
//         </Col>
//       </Row>
//       <Table
//         columns={columns}
//         dataSource={filteredData}
//         rowKey="id"
//         scroll={{ x: 'max-content' }}
//         pagination={{
//           current: currentPage,
//           pageSize: pageSize,
//           onChange: (page, pageSize) => {
//             setCurrentPage(page);
//             setPageSize(pageSize);
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default PlantTable;





import React, { useState } from 'react';
import { Table, Input, Row, Col, Select } from 'antd';
import { plantData } from '../../utils/plantData';
import styles from '../styles/plant.module.scss';
import _get from 'lodash/get';
import _upperCase from 'lodash/upperCase';
import { numFormatter_watts, numFormatter } from '../../lib/helper';

const { Search } = Input;
const { Option } = Select;

const PlantTable = () => {
  const [filteredData, setFilteredData] = useState(plantData);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handleSearch = (value, key) => {
    const filtered = plantData.filter((plant) =>
      plant[key].toString().toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleStateChange = (value) => {
    if (value === undefined) {
      setFilteredData(plantData);
    } else {
      const filtered = plantData.filter((plant) =>
        plant.state.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
    setCurrentPage(1); // Reset to first page on state change
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name', fixed: 'left' },
    { title: 'State', dataIndex: 'state', key: 'state' },
    {
      title: 'DC Capacity',
      dataIndex: 'dcCapacity',
      key: 'dcCapacity',
      sorter: (a, b) => parseFloat(a.dcCapacity) - parseFloat(b.dcCapacity),
      sortDirections: ['ascend', 'descend'],
      render: (text, record) => (
        <div className="table-text">
          {`${_get(record, 'dcCapacity', '--')} ${_upperCase(
            _get(record, 'dcCapacity.units', null)
          )}`}
        </div>
      ),
    },
    {
      title: 'AC Capacity',
      dataIndex: 'acCapacity',
      key: 'acCapacity',
      sorter: (a, b) => parseFloat(a.acCapacity) - parseFloat(b.acCapacity),
      sortDirections: ['ascend', 'descend'],
    },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Installation Year', dataIndex: 'installationYear', key: 'installationYear' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'AC CUF', dataIndex: 'acCUF', key: 'acCUF' },
    { title: 'PR', dataIndex: 'pr', key: 'pr' },
    {
      title: 'Production (MWh)',
      dataIndex: 'production',
      key: 'production',
      render: (text, record) => (
        <div className="table-text">
          {numFormatter(record.production, 'MWh')}
        </div>
      ),
    },
    {
      title: 'Live Power (kW)',
      dataIndex: 'livePower',
      key: 'livePower',
      fixed: 'left',
      render: (text, record) => (
        <div className="table-text">
          {numFormatter_watts(record.livePower, 'kW')}
        </div>
      ),
    },
    {
      title: 'POA (kWh/m²)',
      dataIndex: 'poa',
      key: 'poa',
      render: (text, record) => (
        <div className="table-text">
          {numFormatter(record.poa, 'kWh')}
        </div>
      ),
    },
    { title: 'Specific Yield', dataIndex: 'specificYield', key: 'specificYield' },
    { title: 'Plant Availability', dataIndex: 'plantAvailability', key: 'plantAvailability' },
    { title: 'Grid Availability', dataIndex: 'gridAvailability', key: 'gridAvailability' },
    { title: 'Energy Loss', dataIndex: 'energyLoss', key: 'energyLoss' },
    { title: 'Revenue', dataIndex: 'revenue', key: 'revenue' },
  ];

  // Extract unique states from plantData
  const uniqueStates = [...new Set(plantData.map((plant) => plant.state))];

  return (
    <div className={styles.container}>
      <Row gutter={16} className={styles.searchBar}>
        <Col span={12}>
          <Search
            placeholder="Search by Name"
            onSearch={(value) => handleSearch(value, 'name')}
            enterButton
          />
        </Col>
        <Col span={12}>
          <Select
            showSearch
            placeholder="Search by State"
            optionFilterProp="children"
            onChange={handleStateChange}
            allowClear
            style={{ width: '100%' }}
          >
            {uniqueStates.map((state) => (
              <Option key={state} value={state}>
                {state}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        scroll={{ x: 'max-content' }}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          },
        }}
      />
    </div>
  );
};

export default PlantTable;




// import React, { useState, useEffect } from 'react';
// import { Table, Input, Row, Col, Select, Button, Modal } from 'antd';
// import { useRouter } from 'next/router';
// import { plantData } from '../utils/plantData';
// import styles from '../styles/plant.module.scss';
// import _get from 'lodash/get';
// import _upperCase from 'lodash/upperCase';
// import { numFormatter_watts, numFormatter } from '../lib/helper';
// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
// import { PencilFill } from 'react-bootstrap-icons';
// import { BellOutlined, SettingOutlined } from '@ant-design/icons';
// import Layout from './Layout'; // Import Layout component

// const { Search } = Input;
// const { Option } = Select;

// const fixed_table_height = '400px'; // Fallback height

// const calculate_table_height = (bool = false) => {
//   try {
//     if (typeof window !== "undefined") {
//       const window_height = window.innerHeight;
//       const table_el = document.querySelector('.table-holder-zero');

//       if (table_el) {
//         const offset_top = table_el.getBoundingClientRect().top;
//         const topbar_height = 56 + 16;
//         const tabeYOffset = 20 + 24 + topbar_height;
//         const otherOffset = 34 + 34 + 24;
//         const gutterY = bool ? tabeYOffset : tabeYOffset + otherOffset;
//         const table_height = window_height - (offset_top + gutterY);
//         return (table_height > 0 ? table_height : fixed_table_height) + "px";
//       } else {
//         return fixed_table_height;
//       }
//     } else {
//       return fixed_table_height;
//     }
//   } catch (error) {
//     console.log("Error calculating table height:", error);
//     return fixed_table_height;
//   }
// };

// const PlantTable = () => {
//   const [filteredData, setFilteredData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(8);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [currentRecord, setCurrentRecord] = useState(null);
//   const [tableHeight, setTableHeight] = useState(fixed_table_height);
//   const router = useRouter();

//   useEffect(() => {
//     const updateTableHeight = () => {
//       setTableHeight(calculate_table_height());
//     };

//     updateTableHeight();
//     window.addEventListener('resize', updateTableHeight);

//     return () => {
//       window.removeEventListener('resize', updateTableHeight);
//     };
//   }, []);

//   useEffect(() => {
//     fetch('https://fakestoreapi.com/products')
//       .then(response => response.json())
//       .then(data => setFilteredData(data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   const handleSearch = (value, key) => {
//     const filtered = filteredData.filter((item) =>
//       item[key].toString().toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredData(filtered);
//     setCurrentPage(1);
//   };

//   const handleStateChange = (value) => {
//     if (value === undefined) {
//       fetch('https://fakestoreapi.com/products')
//         .then(response => response.json())
//         .then(data => setFilteredData(data))
//         .catch(error => console.error('Error fetching data:', error));
//     } else {
//       const filtered = filteredData.filter((item) =>
//         item.category.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilteredData(filtered);
//     }
//     setCurrentPage(1);
//   };

//   const formatValueWithUnit = (value, unit) => {
//     if (!value || isNaN(value)) return '--';
//     if (value >= 1e6) return `${numFormatter(value / 1e6, 'M')}${unit}`;
//     if (value >= 1e3) return `${numFormatter(value / 1e3, 'k')}${unit}`;
//     return `${numFormatter(value, '')}${unit}`;
//   };

//   const handleEdit = (record) => {
//     setCurrentRecord(record);
//     setIsModalVisible(true);
//   };

//   const handleUpdate = (values) => {
//     const updatedData = filteredData.map((item) =>
//       item.id === currentRecord.id ? { ...item, title: values.title } : item
//     );
//     setFilteredData(updatedData);
//     setIsModalVisible(false);
//   };

//   const columns = [
//     { title: 'ID', dataIndex: 'id', key: 'id' },
//     {
//       title: 'Title',
//       dataIndex: 'title',
//       key: 'title',
//       fixed: 'left',
//       render: (text, record) => (
//         <div className="table-text">
//           {text} <Button type="link" onClick={() => handleEdit(record)}><PencilFill/> </Button>
//         </div>
//       ),
//     },
//     { title: 'Category', dataIndex: 'category', key: 'category' },
//     { title: 'Price', dataIndex: 'price', key: 'price', render: () => null }, // Updated column
//     { title: 'Description', dataIndex: 'description', key: 'description' },
//     { title: 'Item Weight', dataIndex: 'itemWeight', key: 'itemWeight' }, // New column
//   ];

//   const uniqueCategories = [...new Set(filteredData.map((item) => item.category))];

//   return (
//     <Layout>
//       <div className={styles.container}>
//         <div className="top-bar">
//           <Row className="align-items-center p-auto">
//             <Col span={8}>
//               <Search
//                 placeholder="Search by Title"
//                 onSearch={(value) => handleSearch(value, 'title')}
//                 enterButton
//                 style={{ width: '90%' }}
//               />
//             </Col>
//             <Col span={8}>
//               <Select
//                 showSearch
//                 placeholder="Search by Category"
//                 optionFilterProp="children"
//                 onChange={handleStateChange}
//                 allowClear
//                 style={{ width: '90%' }}
//               >
//                 {uniqueCategories.map((category) => (
//                   <Option key={category} value={category}>
//                     {category}
//                   </Option>
//                 ))}
//               </Select>
//             </Col>
//             <Col span={8} className="text-right">
//               <Button type="link" icon={<BellOutlined />} />
//               <Button type="link" icon={<SettingOutlined />} />
//             </Col>
//           </Row>
//         </div>
//         <Button className="btn btn-primary my-3" onClick={() => router.push('/task1/add')}>Add New Entry</Button>
//         <div className="table-holder" style={{ height: tableHeight, overflowY: 'auto' }}>
//           <Table
//             columns={columns}
//             dataSource={filteredData}
//             rowKey="id"
//             scroll={{ x: 'max-content' }}
//             pagination={{
//               current: currentPage,
//               pageSize: pageSize,
//               onChange: (page, pageSize) => {
//                 setCurrentPage(page);
//                 setPageSize(pageSize);
//               },
//             }}
//           />
//         </div>
//         <Modal
//           title="Edit Title"
//           visible={isModalVisible}
//           onCancel={() => setIsModalVisible(false)}
//           footer={null}
//         >
//           <Formik
//             initialValues={{ title: currentRecord ? currentRecord.title : '' }}
//             validationSchema={Yup.object({
//               title: Yup.string().required('Title is required'),
//             })}
//             onSubmit={(values) => {
//               handleUpdate(values);
//             }}
//             enableReinitialize
//           >
//             {({ errors, touched }) => (
//               <Form>
//                 <div className="form-item">
//                   <label htmlFor="title">Title</label>
//                   <Field name="title" type="text" />
//                   {errors.title && touched.title ? (
//                     <div className="error">{errors.title}</div>
//                   ) : null}
//                 </div>
//                 <div className="form-item">
//                   <Button type="primary" htmlType="submit">Update</Button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </Modal>
//       </div>
//       <style jsx>{`
//         .top-bar {
//           background-color: #333; /* Dark grey background color */
//           padding: 5px;
//           border-radius: 5px;
//         }
//       `}</style>
//     </Layout>
//   );
// };

// export default PlantTable;
import React, { useState, useEffect } from 'react';
import { Table, Input, Row, Col, Select, Button, Modal } from 'antd';
import { useRouter } from 'next/router';
import { plantData } from '../utils/plantData';
import styles from '../styles/plant.module.scss';
import _get from 'lodash/get';
import _upperCase from 'lodash/upperCase';
import { numFormatter_watts, numFormatter } from '../lib/helper';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { PencilFill } from 'react-bootstrap-icons';
import { BellOutlined, SettingOutlined } from '@ant-design/icons';
import Layout from './Layout'; // Import Layout component

const { Search } = Input;
const { Option } = Select;

const fixed_table_height = '400px'; // Fallback height

const calculate_table_height = (bool = false) => {
try {
    if (typeof window !== "undefined") {
    const window_height = window.innerHeight;
    const table_el = document.querySelector('.table-holder-zero');

    if (table_el) {
        const offset_top = table_el.getBoundingClientRect().top;
        const topbar_height = 56 + 16;
        const tabeYOffset = 20 + 24 + topbar_height;
        const otherOffset = 34 + 34 + 24;
        const gutterY = bool ? tabeYOffset : tabeYOffset + otherOffset;
        const table_height = window_height - (offset_top + gutterY);
        return (table_height > 0 ? table_height : fixed_table_height) + "px";
    } else {
        return fixed_table_height;
    }
    } else {
    return fixed_table_height;
    }
} catch (error) {
    console.log("Error calculating table height:", error);
    return fixed_table_height;
}
};

const PlantTable = () => {
const [filteredData, setFilteredData] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [pageSize, setPageSize] = useState(8);
const [isModalVisible, setIsModalVisible] = useState(false);
const [currentRecord, setCurrentRecord] = useState(null);
const [tableHeight, setTableHeight] = useState(fixed_table_height);
const [productDetails, setProductDetails] = useState(null);
const router = useRouter();

useEffect(() => {
    const updateTableHeight = () => {
    setTableHeight(calculate_table_height());
    };

    updateTableHeight();
    window.addEventListener('resize', updateTableHeight);

    return () => {
    window.removeEventListener('resize', updateTableHeight);
    };
}, []);

useEffect(() => {
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => setFilteredData(data))
    .catch(error => console.error('Error fetching data:', error));
}, []);

const handleSearch = (value, key) => {
    const filtered = filteredData.filter((item) =>
    item[key].toString().toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
};

const handleStateChange = (value) => {
    if (value === undefined) {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => setFilteredData(data))
        .catch(error => console.error('Error fetching data:', error));
    } else {
    const filtered = filteredData.filter((item) =>
        item.category.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
    }
    setCurrentPage(1);
};

const formatValueWithUnit = (value, unit) => {
    if (!value || isNaN(value)) return '--';
    if (value >= 1e6) return `${numFormatter(value / 1e6, 'M')}${unit}`;
    if (value >= 1e3) return `${numFormatter(value / 1e3, 'k')}${unit}`;
    return `${numFormatter(value, '')}${unit}`;
};

const handleEdit = (record) => {
    setCurrentRecord(record);
    setIsModalVisible(true);
};

const handleUpdate = (values) => {
    const updatedData = filteredData.map((item) =>
    item.id === currentRecord.id ? { ...item, title: values.title } : item
    );
    setFilteredData(updatedData);
    setIsModalVisible(false);
};

const handleTitleClick = async (id) => {
    try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    setProductDetails(data);
    setIsModalVisible(true);
    } catch (error) {
    console.error('Error fetching product details:', error);
    }
};

const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    fixed: 'left',
    render: (text, record) => (
        <div className="table-text">
        <a
            onClick={() => handleTitleClick(record.id)}
            style={{ color: '#1890ff', textDecoration: 'none', cursor: 'pointer' }}
        >
            {text}
        </a>
        <Button
            type="link"
            onClick={() => handleEdit(record)}
            style={{ paddingLeft: '8px' }}
        >
            <PencilFill />
        </Button>
        </div>
    ),
    },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (price) => (price === null || price === undefined ? '--' : price),
    },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Item Weight', dataIndex: 'itemWeight', key: 'itemWeight' },
];

const uniqueCategories = [...new Set(filteredData.map((item) => item.category))];

return (
    <Layout>
    <div className={styles.container}>
        <div className="top-bar">
        <Row className="align-items-center p-auto">
            <Col span={8}>
            <Search
                placeholder="Search by Title"
                onSearch={(value) => handleSearch(value, 'title')}
                enterButton
                style={{ width: '90%' }}
            />
            </Col>
            <Col span={8}>
            <Select
                showSearch
                placeholder="Search by Category"
                optionFilterProp="children"
                onChange={handleStateChange}
                allowClear
                style={{ width: '90%' }}
            >
                {uniqueCategories.map((category) => (
                <Option key={category} value={category}>
                    {category}
                </Option>
                ))}
            </Select>
            </Col>
            <Col span={8} className="text-right">
            <Button type="link" icon={<BellOutlined />} />
            <Button type="link" icon={<SettingOutlined />} />
            </Col>
        </Row>
        </div>
        <Button className="btn btn-primary my-3" onClick={() => router.push('/task1/add')}>Add New Entry</Button>
        <div className="table-holder" style={{ height: tableHeight, overflowY: 'auto' }}>
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
        <Modal
        title="Product Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        >
        {productDetails && (
            <div>
            <p><strong>ID:</strong> {productDetails.id}</p>
            <p><strong>Title:</strong> {productDetails.title}</p>
            <p><strong>Price:</strong> {productDetails.price}</p>
            <p><strong>Description:</strong> {productDetails.description}</p>
            <p><strong>Category:</strong> {productDetails.category}</p>
            <p><strong>Image:</strong> <img src={productDetails.image} alt={productDetails.title} style={{ width: '100px' }} /></p>
            </div>
        )}
        </Modal>
    </div>
    <style jsx>{`
        .top-bar {
        background-color: #333; /* Dark grey background color */
        padding: 5px;
        border-radius: 5px;
        }
    `}</style>
    </Layout>
);
};

export default PlantTable;
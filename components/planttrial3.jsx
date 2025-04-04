import React, { useState, useEffect } from 'react';
import { Table, Input, Row, Col, Select, Button, Modal, message } from 'antd';
import { useRouter } from 'next/router';
import { PencilFill } from 'react-bootstrap-icons';
import { BellOutlined, SettingOutlined } from '@ant-design/icons';
import Layout from './Layout'; // Import Layout component
import styles from '../styles/plant.module.scss';
import { calculate_table_height } from '../utils/utils'; // Import the utility function

const { Search } = Input;
const { Option } = Select;

const fixed_table_height = '400px'; // Fallback height

const PlantTable = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false); // State for Add Modal
  const [currentRecord, setCurrentRecord] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedCategory, setUpdatedCategory] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedItemWeight, setUpdatedItemWeight] = useState('');
  const [newEntry, setNewEntry] = useState({ title: '', price: '', category: '', description: '', itemWeight: '' }); // State for new entry
  const [tableHeight, setTableHeight] = useState(fixed_table_height); // Define tableHeight in state
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
      .then((response) => response.json())
      .then((data) => setFilteredData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleAddNewEntry = () => {
    if (!newEntry.title || !newEntry.price) {
      message.error('Please fill in all required fields.');
      return;
    }

    const newId = filteredData.length > 0 ? Math.max(...filteredData.map((item) => item.id)) + 1 : 1; // Generate a new ID
    const newItem = { ...newEntry, id: newId, isNew: true }; // Mark the new entry as "isNew"

    setFilteredData((prevData) => [...prevData, newItem]); // Add the new entry to the table
    setNewEntry({ title: '', price: '', category: '', description: '', itemWeight: '' }); // Reset the form
    setIsAddModalVisible(false); // Close the modal
    message.success('New entry added successfully!');
  };

  const handleSearch = (value, key) => {
    const filtered = filteredData.filter((item) =>
      item[key].toString().toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleStateChange = (value) => {
    if (value == undefined) {
      fetch('https://fakestoreapi.com/products')
        .then((response) => response.json())
        .then((data) => setFilteredData(data))
        .catch((error) => console.error('Error fetching data:', error));
    } else {
      const filtered = filteredData.filter((item) =>
        item.category.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
    setCurrentPage(1);
  };

  const handleTitleClick = async (id) => {
    const selectedProduct = filteredData.find((item) => item.id == id);

    if (!selectedProduct) {
      message.error('Product not found.');
      return;
    }

    if (selectedProduct.isNew) {
      setProductDetails(selectedProduct);
      setIsModalVisible(true);
    } else {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProductDetails(data);
        setIsModalVisible(true);
      } catch (error) {
        console.error('Error fetching product details:', error);
        message.error('Failed to fetch product details.');
      }
    }
  };

  const handleEdit = (record) => {
    setCurrentRecord(record);
    setUpdatedTitle(record.title);
    setUpdatedPrice(record.price);
    setUpdatedCategory(record.category);
    setUpdatedDescription(record.description);
    setUpdatedItemWeight(record.itemWeight);
    setIsEditModalVisible(true);
  };

  const handleUpdate = async () => {
    // Validation: Ensure no field is empty or null
    if (!updatedTitle.trim() || !updatedPrice || !updatedCategory.trim() || !updatedDescription.trim() || !updatedItemWeight) {
      message.error('All fields are required and cannot be empty.');
      return;
    }

    const updatedProduct = {
      title: updatedTitle,
      price: updatedPrice,
      category: updatedCategory,
      description: updatedDescription,
      itemWeight: updatedItemWeight,
    };

    if (currentRecord.isNew) {
      const updatedData = filteredData.map((item) =>
        item.id == currentRecord.id ? { ...item, ...updatedProduct } : item
      );
      setFilteredData(updatedData);
      setIsEditModalVisible(false);
      message.success('Product updated successfully!');
    } else {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${currentRecord.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedProduct),
        });
        const data = await response.json();
        const updatedData = filteredData.map((item) =>
          item.id == currentRecord.id ? { ...item, ...updatedProduct } : item
        );
        setFilteredData(updatedData);
        setIsEditModalVisible(false);
        message.success('Product updated successfully!');
      } catch (error) {
        console.error('Error updating product:', error);
        message.error('Failed to update product.');
      }
    }
  };

  const handleDelete = async () => {
    if (currentRecord.isNew) {
      const updatedData = filteredData.filter((item) => item.id !== currentRecord.id);
      setFilteredData(updatedData);
      setIsEditModalVisible(false);
      message.success('Product deleted successfully!');
    } else {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${currentRecord.id}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        const updatedData = filteredData.filter((item) => item.id !== currentRecord.id);
        setFilteredData(updatedData);
        setIsEditModalVisible(false);
        message.success('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        message.error('Failed to delete product.');
      }
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <a
          onClick={() => handleTitleClick(record.id)}
          style={{ color: '#1890ff', textDecoration: 'none', cursor: 'pointer' }}
        >
          {text}
        </a>
      ),
    },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => (price == null || price == undefined ? '--' : price),
    },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Item Weight',
      dataIndex: 'itemWeight',
      key: 'itemWeight',
      render: (weight) => (weight == null || weight == undefined ? '--' : `${weight} kg`),
    },
    {
      title: 'Edit',
      key: 'edit',
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => handleEdit(record)}
          style={{ paddingLeft: '8px' }}
        >
          <PencilFill />
        </Button>
      ),
    },
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
        <Button className="btn btn-primary my-3" onClick={() => setIsAddModalVisible(true)}>
          Add New Entry
        </Button>
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
              <p>
                <strong>Image:</strong>{' '}
                <img
                  src={productDetails.image}
                  alt={productDetails.title}
                  style={{ width: '100px' }}
                />
              </p>
            </div>
          )}
        </Modal>
        <Modal
  title="Edit Product"
  visible={isEditModalVisible}
  onCancel={() => setIsEditModalVisible(false)}
  footer={[
    <Button key="delete" type="danger" onClick={handleDelete}>
      Delete
    </Button>,
    <Button
      key="update"
      type="primary"
      onClick={handleUpdate}
      disabled={
        !updatedTitle.trim() ||
        !updatedPrice ||
        !updatedCategory.trim() ||
        !updatedDescription.trim() ||
        !updatedItemWeight
      }
    >
      Update
    </Button>,
  ]}
>
  <div>
    <label>Title:</label>
    <Input
      value={updatedTitle}
      onChange={(e) => setUpdatedTitle(e.target.value)}
      placeholder="Enter new title"
    />
  </div>
  <div style={{ marginTop: '10px' }}>
    <label>
      Price: <span style={{ color: 'red' }}>*</span>
    </label>
    <Input
      type="number"
      value={updatedPrice}
      onChange={(e) => setUpdatedPrice(e.target.value)}
      placeholder="Enter new price"
    />
  </div>
  <div style={{ marginTop: '10px' }}>
    <label>Category:</label>
    <Input
      value={updatedCategory}
      onChange={(e) => setUpdatedCategory(e.target.value)}
      placeholder="Enter new category"
    />
  </div>
  <div style={{ marginTop: '10px' }}>
    <label>Description:</label>
    <Input
      value={updatedDescription}
      onChange={(e) => setUpdatedDescription(e.target.value)}
      placeholder="Enter new description"
    />
  </div>
  <div style={{ marginTop: '10px' }}>
    <label>
      Item Weight: <span style={{ color: 'red' }}>*</span>
    </label>
    <Input
      type="number"
      value={updatedItemWeight}
      onChange={(e) => setUpdatedItemWeight(e.target.value)}
      placeholder="Enter new item weight (kg)"
    />
  </div>
</Modal>
        <Modal
          title="Add New Entry"
          visible={isAddModalVisible}
          onCancel={() => setIsAddModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsAddModalVisible(false)}>
              Cancel
            </Button>,
            <Button key="add" type="primary" onClick={handleAddNewEntry}>
              Add
            </Button>,
          ]}
        >
          <div>
            <label>Title:</label>
            <Input
              value={newEntry.title}
              onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
              placeholder="Enter title"
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <label>Price:</label>
            <Input
              type="number"
              value={newEntry.price}
              onChange={(e) => setNewEntry({ ...newEntry, price: e.target.value })}
              placeholder="Enter price"
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <label>Category:</label>
            <Input
              value={newEntry.category}
              onChange={(e) => setNewEntry({ ...newEntry, category: e.target.value })}
              placeholder="Enter category"
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <label>Description:</label>
            <Input
              value={newEntry.description}
              onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
              placeholder="Enter description"
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <label>Item Weight:</label>
            <Input
              type="number"
              value={newEntry.itemWeight}
              onChange={(e) => setNewEntry({ ...newEntry, itemWeight: e.target.value })}
              placeholder="Enter item weight (kg)"
            />
          </div>
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
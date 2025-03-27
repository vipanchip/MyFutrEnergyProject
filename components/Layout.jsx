import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';
import { Menu, Tooltip } from 'antd';
import { HomeOutlined, PlusCircleOutlined, EyeOutlined, AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const router = useRouter();

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (path) => {
    router.push(path);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={1} className={`sidebar ${collapsed ? 'collapsed' : ''}`} onMouseEnter={handleCollapse} onMouseLeave={handleCollapse}>
          <Menu mode="vertical" theme="dark" className="sidebar-menu" inlineCollapsed={collapsed}>
            <Menu.Item key="toggle" icon={<AppstoreOutlined />} onClick={handleCollapse}>
              {collapsed ? "Expand" : "Collapse"}
            </Menu.Item>
            <Menu.Item key="home" icon={<Tooltip title="Home"><HomeOutlined /></Tooltip>} onClick={() => handleMenuClick('/')}></Menu.Item>
            <Menu.Item key="add" icon={<Tooltip title="Add Entry"><PlusCircleOutlined /></Tooltip>} onClick={() => handleMenuClick('/task1/add')}></Menu.Item>
            <Menu.Item key="view" icon={<Tooltip title="View Entries"><EyeOutlined /></Tooltip>} onClick={() => handleMenuClick('/task1/view')}></Menu.Item>
            <Menu.SubMenu key="sub1" icon={<Tooltip title="Navigation One"><MailOutlined /></Tooltip>}>
              <Menu.Item key="11" onClick={() => handleMenuClick('/path1')}>Option 1</Menu.Item>
              <Menu.Item key="12" onClick={() => handleMenuClick('/path2')}>Option 2</Menu.Item>
              <Menu.Item key="13" onClick={() => handleMenuClick('/path3')}>Option 3</Menu.Item>
              <Menu.Item key="14" onClick={() => handleMenuClick('/path4')}>Option 4</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="sub2" icon={<Tooltip title="Navigation Two"><AppstoreOutlined /></Tooltip>}>
              <Menu.Item key="21" onClick={() => handleMenuClick('/path5')}>Option 1</Menu.Item>
              <Menu.Item key="22" onClick={() => handleMenuClick('/path6')}>Option 2</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="sub3" icon={<Tooltip title="Navigation Three"><SettingOutlined /></Tooltip>}>
              <Menu.Item key="31" onClick={() => handleMenuClick('/path10')}>Option 1</Menu.Item>
              <Menu.Item key="32" onClick={() => handleMenuClick('/path11')}>Option 2</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Col>
        <Col md={11} className="content">
          {children}
        </Col>
      </Row>
      <style jsx>{`
        .sidebar {
          width: 60px;
          transition: width 0.3s;
          background-color: #001529; /* Dark background color for sidebar */
          height: 100vh; /* Full height */
          position: fixed; /* Fixed position */
        }
        .sidebar.collapsed {
          width: 60px;
        }
        .sidebar:hover {
          width: 200px;
        }
        .sidebar-menu {
          height: 100%;
          border-right: 0;
        }
        .content {
          margin-left: 60px;
          transition: margin-left 0.3s;
        }
        .sidebar:hover ~ .content {
          margin-left: 200px;
        }
      `}</style>
    </Container>
  );
};

export default Layout;

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Menu, Tooltip } from 'antd';
import { HomeOutlined, PlusCircleOutlined, EyeOutlined, AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

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
    <div className="container-fluid">
      <div className="row">
        <div className={`col sidebar ${collapsed ? 'collapsed' : ''}`}>
          <Menu
            mode="inline"
            theme="dark"
            className="sidebar-menu"
            inlineCollapsed={collapsed}
          >
            <Menu.Item
              key="toggle"
              icon={<AppstoreOutlined />}
              onClick={handleCollapse}
            >
              {collapsed ? "Expand" : "Collapse"}
            </Menu.Item>
            <Menu.Item
              key="home"
              icon={<Tooltip title="Home"><HomeOutlined /></Tooltip>}
              onClick={() => handleMenuClick('/')}
            />
            <Menu.Item
              key="add"
              icon={<Tooltip title="Add Entry"><PlusCircleOutlined /></Tooltip>}
              onClick={() => handleMenuClick('/task1/add')}
            />
            <Menu.Item
              key="view"
              icon={<Tooltip title="View Entries"><EyeOutlined /></Tooltip>}
              onClick={() => handleMenuClick('/task1/view')}
            />
            <Menu.SubMenu
              key="sub1"
              icon={<Tooltip title="Navigation One"><MailOutlined /></Tooltip>}
              title={!collapsed && "Navigation One"}
            >
              <Menu.Item key="11" onClick={() => handleMenuClick('/path1')}>Option 1</Menu.Item>
              <Menu.Item key="12" onClick={() => handleMenuClick('/path2')}>Option 2</Menu.Item>
              <Menu.Item key="13" onClick={() => handleMenuClick('/path3')}>Option 3</Menu.Item>
              <Menu.Item key="14" onClick={() => handleMenuClick('/path4')}>Option 4</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="sub2"
              icon={<Tooltip title="Navigation Two"><AppstoreOutlined /></Tooltip>}
              title={!collapsed && "Navigation Two"}
            >
              <Menu.Item key="21" onClick={() => handleMenuClick('/path5')}>Option 1</Menu.Item>
              <Menu.Item key="22" onClick={() => handleMenuClick('/path6')}>Option 2</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="sub3"
              icon={<Tooltip title="Navigation Three"><SettingOutlined /></Tooltip>}
              title={!collapsed && "Navigation Three"}
            >
              <Menu.Item key="31" onClick={() => handleMenuClick('/path10')}>Option 1</Menu.Item>
              <Menu.Item key="32" onClick={() => handleMenuClick('/path11')}>Option 2</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </div>
        <div className="col content">
          {children}
        </div>
      </div>

      <style jsx>{`
        .container-fluid {
          width: 100%;
          padding-right: 0;
          padding-left: 0;
          margin-right: auto;
          margin-left: auto;
        }
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
        .sidebar {
          width: 60px;
          transition: width 0.3s;
          background-color: #001529;
          height: 10vh;
          position: fixed;
        }
        .sidebar.collapsed {
          width: 60px;
          padding: 0 !important;
        }
        .sidebar-menu {
          height: 100%;
          border-right: 0;
        }
        .content {
          margin-left: 60px;
          transition: margin-left 0.3s;
          flex: 1;
          padding: 0rem;
        }
      `}</style>
    </div>
  );
};

export default Layout;

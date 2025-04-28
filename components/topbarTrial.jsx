import React from 'react';
import { Input, Select, Button } from 'antd';
import { BellOutlined, SettingOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

const TopBar = ({ uniqueCategories, handleSearch, handleStateChange }) => {
  return (
    <div className="top-bar">
      <div className="row align-items-center">
        <div className="col-md-4">
          <Search
            placeholder="Search by Title"
            onSearch={(value) => handleSearch(value, 'title')}
            enterButton
            style={{ width: '90%' }}
          />
        </div>
        <div className="col-md-4">
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
        </div>
        <div className="col-md-4 text-right">
          <Button type="link" icon={<BellOutlined />} />
          <Button type="link" icon={<SettingOutlined />} />
        </div>
      </div>
      <style jsx>{`
        .top-bar {
          background-color: #333; /* Dark grey background color */
          padding: 5px;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default TopBar;
import React from 'react';
// import { Input, Select, Button, DatePicker } from 'antd';
// import { BellOutlined, SettingOutlined } from '@ant-design/icons';

// const { Search } = Input;
// const { Option } = Select;

// const TopBar = ({ uniqueCategories, handleSearch, handleStateChange }) => {
//   return (
//     <div className="top-bar">
//       <div className="row align-items-center">
//         {/* Left Section */}
//         <div className="col-md-4">
//           <Search
//             placeholder="Search by Title"
//             onSearch={(value) => handleSearch(value, 'title')}
//             enterButton
//             style={{ width: '90%' }}
//           />
//         </div>

//         {/* Center Section */}
//         <div className="col-md-4 text-center">
//           <DatePicker style={{ marginRight: '10px' }} />
//           <Select
//             showSearch
//             placeholder="Select Plant"
//             optionFilterProp="children"
//             onChange={handleStateChange}
//             allowClear
//             style={{ width: '150px' }}
//           >
//             {uniqueCategories.map((category) => (
//               <Option key={category} value={category}>
//                 {category}
//               </Option>
//             ))}
//           </Select>
//         </div>

//         {/* Right Section */}
//         <div className="col-md-4 text-right">
//           <Button type="primary" style={{ marginRight: '10px' }}>
//             Plant On
//           </Button>
//           <Button type="link" icon={<SettingOutlined />} />
//           <Button type="link" icon={<BellOutlined />} />
//         </div>
//       </div>
//       <style jsx>{`
//         .top-bar {
//           background-color: #f5f5f5; /* Light grey background color */
//           padding: 10px 20px;
//           border-radius: 5px;
//           box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default TopBar;
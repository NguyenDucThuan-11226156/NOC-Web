import React, { useState } from 'react';
import { Row, Col, Input, Select, Dropdown, Menu } from 'antd';
import './Search.css';

const { Search } = Input;
const { Option } = Select;

function SearchRow({ onSearch }) {
  const [filters, setFilters] = useState({
    keyword: '',
    organization: '',
    specialization: '',
    education: '',
    industry: '',
    other: ''
  });

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
    console.log(filters);
  };

  const specializationMenu = (
    <Menu onClick={({ key }) => handleChange('specialization', key)}>
      <Menu.SubMenu key="spec1" title="Hướng nghiệp">
        <Menu.Item key="spec1-sub1">Option 1</Menu.Item>
        <Menu.Item key="spec1-sub2">Option 2</Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="spec2">Kĩ năng mềm</Menu.Item>
      <Menu.Item key="spec3">Công tác Đoàn Hội/CLB</Menu.Item>
    </Menu>
  );

  return (
    <Row className='searchRow' gutter={[16, 16]} justify="space-between" align='center'>
      <Col span={24}>
        <Search
          className='searchBar'
          placeholder="Nhập từ khóa..."
          enterButton="Tìm kiếm"
          size="large"
          onSearch={handleSearch}
          onChange={(e) => handleChange('keyword', e.target.value)}
        />
      </Col>
      <Col span={4}>
        <Select
          className='searchBar-select'
          placeholder="Doanh nghiệp/Tổ chức"
          size="large"
          style={{ width: '100%' }}
          onChange={(value) => handleChange('organization', value)}
        >
          <Option value="org1">Giáo dục bậc đại học</Option>
          <Option value="org2">Giáo dục sau đại học</Option>
          <Option value="org3">Doanh nghiệp trong nước</Option>
          <Option value="org4">Doanh nghiệp nước ngoài</Option>
          <Option value="org5">Cơ quan nhà nước</Option>
          <Option value="org6">Dự án/ Tổ chức phi chính phủ</Option>
          <Option value="org7">Freelancer</Option>
          <Option value="other">Khác</Option>
        </Select>
      </Col>
      <Col span={4}>
        <Dropdown overlay={specializationMenu}>
          <Select
            className='searchBar-select'
            placeholder="Chuyên môn"
            size="large"
            style={{ width: '100%' }}
          >
            <Option value="spec1">Hướng nghiệp</Option>
            <Option value="spec2">Kĩ năng mềm</Option>
            <Option value="spec3">Công tác Đoàn Hội/CLB</Option>
          </Select>
        </Dropdown>
      </Col>
      <Col span={4}>
        <Select
          className='searchBar-select'
          placeholder="Học vấn"
          size="large"
          style={{ width: '100%' }}
          onChange={(value) => handleChange('education', value)}
        >
          <Option value="edu1">Cử nhân</Option>
          <Option value="edu2">Thạc sĩ</Option>
          <Option value="edu3">Nghiên cứu sinh</Option>
          <Option value="edu4">Tiến sĩ</Option>
          <Option value="edu5">Giáo sư/ Phó giáo sư</Option>
        </Select>
      </Col>
      <Col span={4}>
        <Select
          className='searchBar-select'
          placeholder="Ngành học"
          size="large"
          style={{ width: '100%' }}
          onChange={(value) => handleChange('industry', value)}
        >
          <Option value="ind1">Kinh tế</Option>
          <Option value="ind2">Quản trị kinh doanh</Option>
          <Option value="ind3">Truyền thông/Marketing</Option>
          <Option value="ind4">Nhân sự</Option>
          <Option value="ind5">Tài chính/Ngân hàng</Option>
          <Option value="ind6">Kế toán/Kiểm toán</Option>
          <Option value="ind7">Du lịch và khách sạn</Option>
          <Option value="ind8">Ngôn ngữ và xã hội</Option>
          <Option value="ind9">Công nghệ/Máy tính</Option>
        </Select>
      </Col>
      <Col span={4}>
        <Select
          className='searchBar-select'
          placeholder="Khác"
          size="large"
          style={{ width: '100%' }}
          onChange={(value) => handleChange('other', value)}
        >
          <Option value="other1">Other1</Option>
          <Option value="other2">Other2</Option>
        </Select>
      </Col>
    </Row>
  );
}

export default SearchRow;

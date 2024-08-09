import React, { useState } from "react";
import { Row, Col, Input, Select, Dropdown, Menu } from "antd";
import "./Search.css";

const { Search } = Input;
const { Option } = Select;

function SearchRow({
  onSearch,
  domains,
  enterprises,
  specialization,
  studies,
}) {
  const [filters, setFilters] = useState({
    keyword: "",
    organization: "",
    specialization: "",
    education: "",
    industry: "",
    other: "",
  });

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
    console.log(filters);
  };

  // const specializationMenu = (
  //   <Menu onClick={({ key }) => handleChange("specialization", key)}>
  //     <Menu.SubMenu key="spec1" title="Hướng nghiệp">
  //       <Menu.Item key="spec1-sub1">Option 1</Menu.Item>
  //       <Menu.Item key="spec1-sub2">Option 2</Menu.Item>
  //     </Menu.SubMenu>
  //     <Menu.Item key="spec2">Kĩ năng mềm</Menu.Item>
  //     <Menu.Item key="spec3">Công tác Đoàn Hội/CLB</Menu.Item>
  //   </Menu>
  // );

  return (
    <Row
      className="searchRow"
      gutter={[16, 16]}
      justify="space-between"
      align="center"
    >
      <Col span={24}>
        <Search
          className="searchBar"
          placeholder="Nhập từ khóa..."
          enterButton="Tìm kiếm"
          size="large"
          onSearch={handleSearch}
          onChange={(e) => handleChange("keyword", e.target.value)}
        />
      </Col>
      <Col span={4}>
        <Select
          className="searchBar-select"
          placeholder="Doanh nghiệp/Tổ chức"
          size="large"
          style={{ width: "100%" }}
          onChange={(value) => handleChange("organization", value)}
        >
          {enterprises.map((enterprise) => (
            <Option value={enterprise._id}>{enterprise.description}</Option>
          ))}
        </Select>
      </Col>
      <Col span={4}>
        <Select
          className="searchBar-select"
          placeholder="Chuyên môn"
          size="large"
          style={{ width: "100%" }}
        >
          {specialization.map((spe) => (
            <Option value={spe._id}>{spe.description}</Option>
          ))}
        </Select>
      </Col>
      <Col span={4}>
        <Select
          className="searchBar-select"
          placeholder="Học vấn"
          size="large"
          style={{ width: "100%" }}
          onChange={(value) => handleChange("education", value)}
        >
          {studies.map((study) => (
            <Option value={study._id}>{study.description}</Option>
          ))}
        </Select>
      </Col>
      <Col span={4}>
        <Select
          className="searchBar-select"
          placeholder="Ngành học"
          size="large"
          style={{ width: "100%" }}
          onChange={(value) => handleChange("industry", value)}
        >
          {domains.map((domain) => (
            <Option value={domain._id}>{domain.description}</Option>
          ))}
        </Select>
      </Col>
      <Col span={4}>
        <Select
          className="searchBar-select"
          placeholder="Khác"
          size="large"
          style={{ width: "100%" }}
          onChange={(value) => handleChange("other", value)}
        >
          <Option value="other1">Other1</Option>
          <Option value="other2">Other2</Option>
        </Select>
      </Col>
    </Row>
  );
}

export default SearchRow;

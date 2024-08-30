import { Col, Input, Row, Select } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import React, { useState } from "react";
import "./Search.css";

const { Search } = Input;
const { Option } = Select;

function SearchRow({
  onSearch,
  domains,
  enterprises,
  specialization,
  studies,
  loading, // Receive loading state as a prop
}) {
  const [filters, setFilters] = useState({
    keyword: "",
    organization: "",
    specialization: "",
    education: "",
    industry: "",
  });

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  return (
    <Row
      className="searchRow"
      gutter={[16, 16]}
      justify='space-between'
      align="center"
    >
      <Col xs={24} xl={24} lg={24}>
        <Search
          className="searchBar"
          placeholder="Nhập từ khóa..."
          enterButton={loading ? <SearchOutlined  /> : "Tìm kiếm"}
          size="large"
          onSearch={handleSearch}
          onChange={(e) => handleChange("keyword", e.target.value)}
          loading={loading} // Loading state for the search button
        />
      </Col>
      <Col xs={24} xl={6} lg={12} md={12}>
        <Select
          className="searchBar-select"
          placeholder="Doanh nghiệp/Tổ chức"
          size="large"
          style={{ width: "100%" }}
          onChange={(value) => handleChange("organization", value)}
        >
          {enterprises.map((enterprise) => (
            <Option key={enterprise.id} value={enterprise.description}>
              {enterprise.description}
            </Option>
          ))}
        </Select>
      </Col>
      <Col xs={24} xl={6} lg={12} md={12}>
        <Select
          className="searchBar-select"
          placeholder="Chuyên môn"
          size="large"
          onChange={(value) => handleChange("specialization", value)}
          style={{ width: "100%" }}
        >
          {specialization.map((spe) => (
            <Option key={spe.id} value={spe.description}>
              {spe.description}
            </Option>
          ))}
        </Select>
      </Col>
      <Col xs={24} xl={6} lg={12} md={12}>
        <Select
          className="searchBar-select"
          placeholder="Học vấn"
          size="large"
          style={{ width: "100%" }}
          onChange={(value) => handleChange("education", value)}
        >
          {studies.map((study) => (
            <Option key={study.id} value={study.description}>
              {study.description}
            </Option>
          ))}
        </Select>
      </Col>
      <Col xs={24} xl={6} lg={12} md={12}>
        <Select
          className="searchBar-select"
          placeholder="Ngành học"
          size="large"
          style={{ width: "100%" }}
          onChange={(value) => handleChange("industry", value)}
        >
          {domains.map((domain) => (
            <Option key={domain.id} value={domain.description}>
              {domain.description}
            </Option>
          ))}
        </Select>
      </Col>
    </Row>
  );
}

export default SearchRow;

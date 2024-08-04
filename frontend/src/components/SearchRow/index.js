import React, { useState } from 'react';
import { Row, Col, Input, Select } from 'antd';

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

    return (
        <Row gutter={[16, 16]} justify="center" style={{ margin: '20px 0' }}>
            <Col span={8}>
                <Search
                    placeholder="Nhập từ khóa..."
                    enterButton="Tìm kiếm"
                    size="large"
                    onSearch={handleSearch}
                    onChange={(e) => handleChange('keyword', e.target.value)}
                />
            </Col>
            <Col span={3}>
                <Select
                    placeholder="Doanh nghiệp/Tổ chức"
                    size="large"
                    style={{ width: '100%' }}
                    onChange={(value) => handleChange('organization', value)}
                >
                    <Option value="org1">Org1</Option>
                    <Option value="org2">Org2</Option>
                </Select>
            </Col>
            <Col span={3}>
                <Select
                    placeholder="Chuyên môn"
                    size="large"
                    style={{ width: '100%' }}
                    onChange={(value) => handleChange('specialization', value)}
                >
                    <Option value="spec1">Spec1</Option>
                    <Option value="spec2">Spec2</Option>
                </Select>
            </Col>
            <Col span={3}>
                <Select
                    placeholder="Học vấn"
                    size="large"
                    style={{ width: '100%' }}
                    onChange={(value) => handleChange('education', value)}
                >
                    <Option value="edu1">Edu1</Option>
                    <Option value="edu2">Edu2</Option>
                </Select>
            </Col>
            <Col span={3}>
                <Select
                    placeholder="Ngành học"
                    size="large"
                    style={{ width: '100%' }}
                    onChange={(value) => handleChange('industry', value)}
                >
                    <Option value="ind1">Ind1</Option>
                    <Option value="ind2">Ind2</Option>
                </Select>
            </Col>
            <Col span={3}>
                <Select
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

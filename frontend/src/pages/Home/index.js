import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner";
import SearchRow from "../../components/SearchRow";
import Mentor from "../../components/Mentor";
import { Layout, Pagination } from "antd";
import mockMentors from "../../mockMentors";
import { post } from "../../utils/request";
const { Content } = Layout;

function Home() {
  const [mentors, setMentors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

  useEffect(() => {
    // Simulate fetching data from API
    post("/api/v1/mentors/list", {
      limit: 20,
      page: 2,
    }).then((res) => {
      console.log(res);
    });

    setMentors(mockMentors);
  }, []);

  const handleSearch = (filters) => {
    // For now, we'll just filter the mock data locally
    const filteredMentors = mockMentors.filter((mentor) => {
      return (
        (filters.keyword ? mentor.name.includes(filters.keyword) : true) &&
        (filters.organization
          ? mentor.organization === filters.organization
          : true) &&
        (filters.specialization
          ? mentor.specialization === filters.specialization
          : true) &&
        (filters.education ? mentor.education === filters.education : true) &&
        (filters.industry ? mentor.industry === filters.industry : true) &&
        (filters.other ? mentor.other === filters.other : true)
      );
    });
    setMentors(filteredMentors);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentMentors = mentors.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Layout>
      <Content>
        <Banner />
        <SearchRow onSearch={handleSearch} />
        <Mentor mentors={currentMentors} />
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={mentors.length}
          onChange={handlePageChange}
          style={{ textAlign: "center", margin: "20px" }}
        />
      </Content>
    </Layout>
  );
}

export default Home;

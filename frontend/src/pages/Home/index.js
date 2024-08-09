import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner";
import SearchRow from "../../components/SearchRow";
import Mentor from "../../components/Mentor";
import { Layout, Pagination } from "antd";
import mockMentors from "../../mockMentors";
import { postMentorList } from "../../services/mentorsServices";
import { limit } from "../../constant";
const { Content } = Layout;

function Home() {
  const [total, setTotal] = useState(0);
  const [mentors, setMentors] = useState([]);
  const [domains, setDomains] = useState([]);
  const [enterprises, setEnterprises] = useState([]);
  const [specialization, setSpecialization] = useState([]);
  const [studies, setStudies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  useEffect(() => {
    const offset = {
      limit: limit,
      page: currentPage,
    };
    const fetchApi = async () => {
      const result = await postMentorList(offset);
      //   console.log(offset);
      console.log(result);
      setMentors(result.mentors);
      setDomains(result.domains);
      setEnterprises(result.enterprises);
      setSpecialization(result.specialization);
      setStudies(result.studies);
      setTotal(result.total);
    };
    fetchApi();
  }, [currentPage]);

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
        <SearchRow
          onSearch={handleSearch}
          domains={domains}
          enterprises={enterprises}
          specialization={specialization}
          studies={studies}
        />
        <Mentor mentors={currentMentors} />
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={handlePageChange}
          style={{ textAlign: "center", marginTop: "20px" }}
        />
      </Content>
    </Layout>
  );
}

export default Home;

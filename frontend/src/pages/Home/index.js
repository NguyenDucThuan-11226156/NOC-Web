import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner";
import SearchRow from "../../components/SearchRow";
import Mentor from "../../components/Mentor";
import { Layout, Pagination } from "antd";
import { postMentorList } from "../../services/mentorsServices";
import { limit } from "../../constant";
import { post } from "../../utils/request";
const { Content } = Layout;

function Home() {
  const [total, setTotal] = useState(0);
  const [mentors, setMentors] = useState([]);
  const [domains, setDomains] = useState([]);
  const [enterprises, setEnterprises] = useState([]);
  const [specialization, setSpecialization] = useState([]);
  const [studies, setStudies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(limit);
  useEffect(() => {
    const offset = {
      limit: limit,
      page: currentPage,
    };
    const fetchApi = async () => {
      const result = await postMentorList(offset);
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
    post("/api/v1/mentors/filter", {
      keyword: filters.keyword,
      organization: filters.organization,
      specialization: filters.specialization,
      education: filters.education,
      domain: filters.industry,
    }).then((res) => {
      setMentors(res.mentors);
      setTotal(res.mentors.length);
    });
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
        {/* <Mentor mentors={currentMentors} /> */}
        <Mentor mentors={mentors} />
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

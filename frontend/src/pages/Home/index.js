import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner";
import SearchRow from "../../components/SearchRow";
import Mentor from "../../components/Mentor";
import { Layout, Pagination, Skeleton } from "antd";
import { postMentorList } from "../../services/mentorsServices";
import { limit } from "../../constant";
import { post } from "../../utils/request";
import PinnedMentor from "../../components/PinnedMentor";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const offset = {
      limit: limit,
      page: currentPage,
    };
    const fetchApi = async () => {
      setLoading(true);
      try {
        const result = await postMentorList(offset);
        setMentors(result.mentors);
        setDomains(result.domains);
        setEnterprises(result.enterprises);
        setSpecialization(result.specialization);
        setStudies(result.studies);
        setTotal(result.total);
      } catch (error) {
        console.error("Error fetching mentor list:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, [currentPage]);

  const handleSearch = async (filters) => {
    setLoading(true);
    try {
      const res = await post("/api/v1/mentors/filter", {
        keyword: filters.keyword,
        organization: filters.organization,
        specialization: filters.specialization,
        education: filters.education,
        industry: filters.industry,
      });
      setMentors(res.mentors);
      setTotal(res.mentors.length);
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setLoading(false);
    }
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
        {loading ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : (
          <>
            <Banner />
            <PinnedMentor />
            <SearchRow
              onSearch={handleSearch}
              domains={domains}
              enterprises={enterprises}
              specialization={specialization}
              studies={studies}
              loading={loading} // Pass loading state to SearchRow
            />
            <Mentor mentors={currentMentors} loading={loading} />
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={total}
              onChange={handlePageChange}
              style={{ textAlign: "center", marginTop: "20px" }}
            />
          </>
        )}
      </Content>
    </Layout>
  );
}

export default Home;
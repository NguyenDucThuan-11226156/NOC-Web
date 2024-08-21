import React, { useEffect, useState } from "react";
import TableDomain from "../../components/TableDomain";
import TableEnterprise from "../../components/TableEnterprise";
import TableStudy from "../../components/TableStudy";
import TableSpecialization from "../../components/TableSpecialization";
import axios from "axios";
import { API } from "../../../constant";
import { Button } from "antd";
import CategoryModal from "./CategoryModal";

const CreateCategory = () => {
  const [domains, setDomains] = useState([]);
  const [enterprises, setEnterprises] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [studies, setStudies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryType, setCategoryType] = useState("");

  const fetchCategories = async () => {
    const res = await axios.get(`${API}/api/v1/admin/listCategory`);
    setDomains(res.data.domains);
    setEnterprises(res.data.enterprises);
    setSpecializations(res.data.specialization);
    setStudies(res.data.studies);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await axios.get(API + "/api/v1/admin/listCategory");
      setDomains(res.data.domains);
      setEnterprises(res.data.enterprises);
      setSpecializations(res.data.specialization);
      setStudies(res.data.studies);
    };
    fetchAPI();
  }, []);

  const openModal = (type) => {
    setCategoryType(type);
    setModalVisible(true);
  };

  return (
    <>
      <div>
        <div>
          <Button onClick={() => openModal("domain")}>Create Domain</Button>
          <TableDomain domains={domains} />
        </div>
        <div>
          <Button onClick={() => openModal("enterprise")}>
            Create Enterprise
          </Button>
          <TableEnterprise enterprises={enterprises} />
        </div>
        <div>
          <Button onClick={() => openModal("specialization")}>
            Create Specialization
          </Button>
          <TableSpecialization specializations={specializations} />
        </div>
        <div>
          <Button onClick={() => openModal("study")}>Create Study</Button>
          <TableStudy studies={studies} />
        </div>
      </div>
      <CategoryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        categoryType={categoryType}
        fetchCategories={fetchCategories}
      />
    </>
  );
};

export default CreateCategory;

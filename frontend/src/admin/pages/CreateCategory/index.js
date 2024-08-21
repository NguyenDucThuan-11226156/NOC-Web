import React, { useEffect, useState } from "react";
import TableDomain from "../../components/TableDomain";
import TableEnterprise from "../../components/TableEnterprise";
import TableStudy from "../../components/TableStudy";
import TableSpecialization from "../../components/TableSpecialization";
import axios from "axios";
import { API } from "../../../constant";
import { Button } from "antd";
import CategoryModal from "./CategoryModal";
import './Categories.css';

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
    fetchCategories();
  }, []);

  const openModal = (type) => {
    setCategoryType(type);
    setModalVisible(true);
  };

  return (
    <>
      <div>
        <div className="categories-item">
          <h2 className="categories-title">Domain</h2>
          <Button onClick={() => openModal("domain")} className="categories-create-btn">Create Domain</Button>
          <TableDomain domains={domains} fetchCategories={fetchCategories} />
        </div>
        <div>
          <Button onClick={() => openModal("enterprise")}>
            Create Enterprise
          </Button>
          <TableEnterprise enterprises={enterprises} fetchCategories={fetchCategories} />
        </div>
        <div>
          <Button onClick={() => openModal("specialization")}>
            Create Specialization
          </Button>
          <TableSpecialization specializations={specializations} fetchCategories={fetchCategories} />
        </div>
        <div className="categories-item">
          <h2 className="categories-title">Studies</h2>
          <Button onClick={() => openModal("study")} className="categories-create-btn">Create Study</Button>
          <TableStudy studies={studies} fetchCategories={fetchCategories} />
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

import React, { useEffect, useState } from "react";
import TableDomain from "../../components/TableDomain";
import TableEnterprise from "../../components/TableEnterprise";
import TableStudy from "../../components/TableStudy";
import TableSpecialization from "../../components/TableSpecialization";
import axios from "axios";
import { API } from "../../../constant";
import { Badge, Button } from "antd";
const CreateCategory = () => {
  // Cần thêm sửa xóa của mỗi bảng + Css thêm
  const [domains, setDomains] = useState([]);
  const [enterprises, setEnterprises] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [studies, setStudies] = useState([]);
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
  return (
    <>
      <div>
        <div>
          <Button>Create Domain</Button>
          <TableDomain domains={domains} />
        </div>
        <div>
          <Button>Create Enterprise</Button>
          <TableEnterprise enterprises={enterprises} />
        </div>
        <div>
          <Button>Create Specialization</Button>
          <TableSpecialization specializations={specializations} />
        </div>
        <div>
          <Button>Create Study</Button>
          <TableStudy studies={studies} />
        </div>
      </div>
    </>
  );
};

export default CreateCategory;

import React from "react";
import TableDomain from "../../components/TableDomain";
import TableEnterprise from "../../components/TableEnterprise";
import TableStudy from "../../components/TableStudy";
import TableSpecialization from "../../components/TableSpecialization";

const CreateCategory = () => {
  // Cần thêm sửa xóa của mỗi bảng + Css thêm
  return (
    <>
      <div>
        <div>
          <p>Create Domain</p>
          <TableDomain />
        </div>
        <div>
          <p>Create Enterprise</p>
          <TableEnterprise />
        </div>
        <div>
          <p>Create Study</p>
          <TableStudy />
        </div>
        <div>
          <p>Create Specialization</p>
          <TableSpecialization />
        </div>
      </div>
    </>
  );
};

export default CreateCategory;

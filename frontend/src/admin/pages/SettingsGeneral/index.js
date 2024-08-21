import React from "react";
import TableDomain from "../../components/TableDomain";
import TableEnterprise from "../../components/TableEnterprise";
import TableStudy from "../../components/TableStudy";
import TableSpecialization from "../../components/TableSpecialization";

const SettingGeneral = () => {
  // Cần thêm sửa xóa của mỗi bảng + Css thêm
  return (
    <>
      <div>
        <div>Avatar Default</div>
        <button>Edit</button>
      </div>
      <div>
        <div>Home Banner </div>
        <button>Edit</button>
      </div>
      <div>
        <div>User Banner </div>
        <button>Edit</button>
      </div>
    </>
  );
};

export default SettingGeneral;

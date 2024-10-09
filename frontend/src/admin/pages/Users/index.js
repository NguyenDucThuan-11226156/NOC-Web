import { API } from "../../../constant";
import axios from "axios";
import CommonUtils from "../../../utils/CommonUtils";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons"; // Correct import

function Users() {
  const handleOnClickExport = async () => {
    try {
      let res = await axios.get(`${API}/api/v1/admin/excel`);

      if (res && res.data && res.data.data) {
        await CommonUtils.exportExcel(
          res.data.data,
          "Danh sách Users",
          "ListUsers"
        );
      }
    } catch (error) {
      console.error("Error exporting Excel:", error);
    }
  };

  return (
    <Button
      onClick={handleOnClickExport}
      type="primary"
      icon={<DownloadOutlined />}
      style={{ marginBottom: 5 }}
    >
      Excel
    </Button>
  );
}

export default Users;

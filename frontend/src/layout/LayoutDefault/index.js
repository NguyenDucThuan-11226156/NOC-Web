import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import HeaderDefault from "./HeaderDefault";
import { Outlet } from "react-router-dom";
import FooterDefault from "./FooterDefault";
import './LayoutDefault.css'
function LayoutDefault() {
  return (
    <>
      <Layout>
        <HeaderDefault />
        <Content>
          <Outlet />
        </Content>
        <FooterDefault />
      </Layout>
    </>
  );
}
export default LayoutDefault;

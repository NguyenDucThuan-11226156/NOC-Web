import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import HeaderDefault from "./HeaderDefault";
import { Outlet } from "react-router-dom";
function LayoutDefault() {
  return (
    <>
      <Layout>
        <HeaderDefault />
        <Content>
          <Outlet />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
}
export default LayoutDefault;

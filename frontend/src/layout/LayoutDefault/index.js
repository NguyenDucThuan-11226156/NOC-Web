import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
function LayoutDefault() {
    return (
        <>
            <Layout >
                <Header className="layout-default__header">
                    <div className="layout-default__logo"></div>
                </Header>
                <Content >Content</Content>
                <Footer >Footer</Footer>
            </Layout>
        </>
    )
}
export default LayoutDefault;
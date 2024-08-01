import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
function LayoutDefault() {
    return (
        <>
            <Layout >
                <Header >Header</Header>
                <Content >Content</Content>
                <Footer >Footer</Footer>
            </Layout>
        </>
    )
}
export default LayoutDefault;
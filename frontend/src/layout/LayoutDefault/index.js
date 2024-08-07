import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import HeaderDefault from "./HeaderDefault";
import { Outlet } from "react-router-dom";
import FooterDefault from "./FooterDefault";
import React, { useState, useEffect } from "react";
import RatingModal from "../../components/RatingModal";

function LayoutDefault() {
  const [isRatingModalVisible, setRatingModalVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRatingModalVisible(true);
    }, 60000); // 1 minute delay u can change the time in order to do the css thx u nganhoang

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  const handleRatingModalClose = () => {
    setRatingModalVisible(false);
  };

  return (
    <>
      <Layout>
        <HeaderDefault />
        <Content>
          <Outlet />
        </Content>
        <FooterDefault />
        <RatingModal visible={isRatingModalVisible} onClose={handleRatingModalClose} />
      </Layout>
    </>
  );
}

export default LayoutDefault;

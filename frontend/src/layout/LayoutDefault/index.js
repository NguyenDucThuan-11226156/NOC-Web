import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import HeaderDefault from "./HeaderDefault";
import { Outlet } from "react-router-dom";
import FooterDefault from "./FooterDefault";
import React, { useState, useEffect } from "react";
import RatingModal from "../../components/RatingModal";
import { useCookies } from "react-cookie";

function LayoutDefault() {
  const [isRatingModalVisible, setRatingModalVisible] = useState(false);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (cookies.token) { // Check if user is logged in
      const timer = setTimeout(() => {
        setRatingModalVisible(true);
      }, 60000); // 1 minute delay

      return () => clearTimeout(timer); // Clean up the timer on component unmount
    }
  }, [cookies.token]);

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
        {cookies.token && ( // Conditionally render the RatingModal
          <RatingModal visible={isRatingModalVisible} onClose={handleRatingModalClose} />
        )}
      </Layout>
    </>
  );
}

export default LayoutDefault;

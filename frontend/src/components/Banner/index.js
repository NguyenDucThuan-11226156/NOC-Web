import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import axios from "axios";
import { API } from "../../constant"; // Adjust the import path
import "./Banner.css";

function Banner() {
  const [bgImage, setBgImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBannerImage = async () => {
      try {
        const response = await axios.get(`${API}/api/v1/admin/getSettings`);

        if (response.data.code === 200) {
          const data = response.data.data[0];
          const imageUrl = `${data.homeBanner}`; // Construct the full URL
          setBgImage(imageUrl);
          setLoading(false);
        } else {
          console.error("Failed to fetch settings data");
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch settings", error);
        setLoading(false);
      }
    };

    fetchBannerImage();
  }, []);

  const bannerStyle = {
    backgroundImage: `url("${bgImage}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "183px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: "white",
    margin: "40px 33px",
    textAlign: "center",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  };

  return (
    <>
      {loading ? (
        <div className="banner-container">
          <Skeleton.Image
            style={{ width: "100%", height: "183px", margin: "40px 33px" }}
          />
        </div>
      ) : (
        <div className="banner-container" style={bannerStyle}>
          <h1 className="bannerStyle-title">NEU DAILY MENTORING</h1>
          <p className="bannerStyle-desc">
            Kickstart Your Future: The NEU Mentoring Journey Begins
          </p>
        </div>
      )}
    </>
  );
}

export default Banner;

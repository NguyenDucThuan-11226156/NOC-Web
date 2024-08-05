import { useEffect, useState } from "react";
import './Banner.css'

function Banner() {



    // Waiting for background image from BE ----------------

    // const [bgImage, setBgImage] = useState('')

    useEffect(() => {
        fetch('')
            .then(res => res.json())
            .then(data => {
                // setBgImage(data.image);
            })
    }, [])
    const bannerStyle = {
        // backgroundImage: `url(${bgImage});`,
        
        backgroundImage: 'url(https://scontent-gru1-2.xx.fbcdn.net/v/t39.30808-6/365479304_1085978075706519_4811970991520067017_n.jpg?stp=dst-jpg_s600x600&_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGnBnEAPFOdwiLuDuaaPHGDsC0aF82kWE2wLRoXzaRYTRdT39CW0HbTm0ojAR13JpjG0XLqHBlFn85RS6UuHQgp&_nc_ohc=vEoknpj2TLMQ7kNvgHNYEyY&_nc_ht=scontent-gru1-2.xx&oh=00_AYAosmdBZGLpz-rFg6nHdsJOamHt9QSvEA3fnPC13jdsow&oe=66B4F428)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '183px',
        width: '1380px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: 'white',
        margin: '40px 33px',
        textAlign: 'center',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
    };

    return (

        <>

            <div style={bannerStyle}>
                <h1 className="bannerStyle-title">NEU DAILY MENTORING</h1>
                <p className="bannerStyle-desc">Thông tin của dự án (Có thể là một châm ngôn giống VINFAST: Việt Nam - Phong cách - An toàn - Thông minh)</p>
            </div>
        </>
    )
}
export default Banner;
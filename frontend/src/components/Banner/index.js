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
        
        backgroundImage: 'url(https://scontent-gru1-1.xx.fbcdn.net/v/t39.30808-6/454470876_462550420093624_2661456546069939952_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=cQxN1WBM1ioQ7kNvgHFLA--&_nc_ht=scontent-gru1-1.xx&oh=00_AYDkqEa0v-E9vBszP6yma9Tl0tPkSa9ZXhHiBlYmVJEuWA&oe=66BCE91E)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '183px',
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
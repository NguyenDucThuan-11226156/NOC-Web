import React from 'react';
import Banner from "../../components/Banner";
import './Info.css';

function Info() {
    return (
        <>
            <Banner />
            <div className="info-container">
                <section className="about-section">
                    <h2>Thông tin</h2>
                    <h2>Advertising Vietnam</h2>
                    <p>Founded in 2017, Advertising Vietnam is a media publisher which focuses on advertising, communications, and marketing. We serve news and campaigns in Vietnam and the global market. Our audiences are mainly people working in advertising agencies. We also own the largest advertising jobsite in Vietnam, AdJob, which is more than 23,000 users and partners with 400 ads agencies.</p>
                </section>
                <section className="mission-section">
                    <h2>OUR MISSION</h2>
                    <p>lorem</p>
                </section>
                <section className="network-section">
                    <h2>OUR NETWORK</h2>
                    <p>We position the company as an ecosystem in the advertising industry with a variety of services such as:</p>
                    <ul>
                        <li><strong>Publisher:</strong> Advertising Vietnam</li>
                        <li><strong>Job Portal:</strong> adJob.asia</li>
                        <li><strong>Agency Finder:</strong> timagency.info</li>
                    </ul>
                </section>
                <section className="contact-section">
                    <h2>CONTACT</h2>
                    <p>For more information about recruitment, press release, PR articles, media support, and more, please contact us at <a href="mailto:info@advertisingvietnam.com">info@advertisingvietnam.com</a></p>
                    <div>
                        <h3>Facebook Fanpage</h3>
                        <ul>
                            <li>Cuộc sống Agency</li>
                            <li>Advertising Vietnam</li>
                            <li>Quảng cáo Remix</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Facebook Group</h3>
                        <p>Cộng đồng Marketing & Advertising</p>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Info;

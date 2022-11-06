import './Footer.css';
import LogoWebsite from '~/Layout/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
    return (
        <footer className="footer-distributed">
            <div className="footer-left">
                {/* <h3>logo</h3> */}
                <div className="logo">
                    <LogoWebsite />
                </div>

                <p className="footer-links">
                    <a href={'https://github.com/Vainres/Disaster-forecast'} className="link-1">
                        Home
                    </a>

                    <a href={'https://github.com/Vainres/Disaster-forecast'}>Blog</a>

                    <a href={'https://github.com/Vainres/Disaster-forecast'}>About</a>

                    <a href={'https://github.com/Vainres/Disaster-forecast'}>Contact</a>
                </p>

                <p className="footer-team-name">CTY TNHH 3 Thành Viên</p>
            </div>
            <div className="footer-center">
                <div>
                    <i className="fa-solid fa-location-dot"></i>
                    <p>
                        <span>KTX Khu B</span> Dĩ An, Bình Dương
                    </p>
                </div>

                <div>
                    <i className="fa fa-phone"></i>
                    <p>0907097598</p>
                </div>

                <div>
                    <i className="fa fa-envelope"></i>
                    <p>
                        <a href={'mailto:19521898@gm.uit.edu.vn'}>19521898@gm.uit.edu.vn</a>
                    </p>
                </div>
            </div>

            <div className="footer-right">
                <p className="footer-company-about">
                    <span>About Us</span>
                    Làm vì đam mê
                </p>

                <div className="footer-icons">
                    <a href={'https://github.com/Vainres/Disaster-forecast'}>
                        <i className="fa-brands fa-facebook"></i>
                    </a>
                    <a href={'https://github.com/Vainres/Disaster-forecast'}>
                        <i className="fa-brands fa-twitter"></i>
                    </a>
                    <a href={'https://github.com/Vainres/Disaster-forecast'}>
                        <i className="fa-brands fa-slack"></i>
                    </a>
                    <a href={'https://github.com/Vainres/Disaster-forecast'}>
                        <i className="fa-brands fa-github"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

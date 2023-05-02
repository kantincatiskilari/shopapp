import './footer.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function Footer() {
    return (
        <div className="footerContainer">
            <footer className="footer">
                <div className="footerSectionContainer">
                    <div className="footerSection">
                        <div className="footerSectionTitle">HELP</div>
                        <div className="footerSectionItem">1-234-567-8900</div>
                        <div className="footerSectionItem">1-234-567-5900</div>
                        <div className="footerSectionItem">help@e-commerce.com</div>
                        <div className="footerSectionItem">Contact Us</div>
                    </div>
                    <div className="footerSection">
                        <div className="footerSectionTitle">SHOP</div>
                        <div className="footerSectionItem">Men's Shoes</div>
                        <div className="footerSectionItem">Women's Shoes</div>
                        <div className="footerSectionItem">Socks</div>
                        <div className="footerSectionItem">Gifts</div>
                    </div>
                    <div className="footerSection">
                        <div className="footerSectionTitle">COMPANY</div>
                        <div className="footerSectionItem">Stores</div>
                        <div className="footerSectionItem">Our Story</div>
                        <div className="footerSectionItem">Our Vision</div>
                        <div className="footerSectionItem">Our Mission</div>
                        <div className="footerSectionItem">On Press</div>
                    </div>
                </div>
                <div className="footerSocialMedia">
                    <div className="footerSocialMediaTitle">
                        Follow us in Social Media!
                    </div>
                    <div className="footerSocialMediaIcons">
                        <div className="footerSocialMediaIcon">
                            <InstagramIcon />
                        </div>
                        <div className="footerSocialMediaIcon">
                            <TwitterIcon />
                        </div>
                        <div className="footerSocialMediaIcon">
                            <YouTubeIcon />
                        </div>
                        <div className="footerSocialMediaIcon">
                            <FacebookIcon />
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    © 2023 e-Commerce. All rights reserved.
                </div>
            </footer>
        </div>
    )
}

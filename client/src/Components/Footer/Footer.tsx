import LinkedInIcon from '../../assets/linkedin-svgrepo-com.svg'
import GmailIcon from '../../assets/gmail-svgrepo-com.svg'
import GitHubIcon from '../../assets/github-svgrepo-com (1).svg'
import './Footer.css'

const Footer = () => {
    return(
        <div className="Footer">
            <h3 id="contact-section">Contact Me</h3>
            <span onClick={() => window.open('https://www.linkedin.com/in/cadenmcarthur/', '_blank')}>
                <img src={LinkedInIcon} alt="LinkedIn" className="footer-icon" />
            </span>
            <span onClick={() => window.open('mailto: caden.mcarthur@gmail.com')}>
                <img src={GmailIcon} alt='Gmail' className="footer-icon" />
            </span>
            <span onClick={() => window.open('https://github.com/cmac2112', '_blank')}>
                <img src={GitHubIcon} alt='GitHub' className="footer-icon" />
            </span>
        </div>
    )
}

export default Footer
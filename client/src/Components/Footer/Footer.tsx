import LinkedInIcon from "../../assets/linkedin-svgrepo-com.svg";
import GmailIcon from "../../assets/gmail-svgrepo-com.svg";
import GitHubIcon from "../../assets/github-svgrepo-com (1).svg";

interface SocialLinkProps {
  href: string;
  icon: string;
  alt: string;
  external?: boolean;
}

const SocialLink = ({ href, icon, alt, external = true }: SocialLinkProps) => (
  <a
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    aria-label={alt}
    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcf0d]/40 hover:bg-[#ffcf0d]/10 hover:shadow-[0_8px_24px_rgba(255,207,13,0.15)] sm:h-14 sm:w-14"
  >
    <img src={icon} alt="" className="h-6 w-6 sm:h-7 sm:w-7" />
  </a>
);

const Footer = () => {
  return (
    <footer className="mt-12 flex w-full flex-col items-center gap-3 border-t border-white/10 px-4 py-10 text-center">
      <h3 id="contact-section" className="m-0 text-xl font-semibold text-white sm:text-2xl">
        Contact Me
      </h3>
      <p className="m-0 max-w-md text-sm text-white/50">
        Feel free to reach out &mdash; I'm always happy to chat about new opportunities or projects.
      </p>
      <div className="mt-2 flex items-center justify-center gap-4">
        <SocialLink href="https://www.linkedin.com/in/cadenmcarthur/" icon={LinkedInIcon} alt="LinkedIn" />
        <SocialLink href="mailto:caden.mcarthur@gmail.com" icon={GmailIcon} alt="Email" external={false} />
        <SocialLink href="https://github.com/cmac2112" icon={GitHubIcon} alt="GitHub" />
      </div>
    </footer>
  );
};

export default Footer;

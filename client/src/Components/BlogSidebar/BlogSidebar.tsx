import "./BlogSidebar.css";
import { Link } from "react-router-dom"
import { CompiledSidebarLinks } from "../../Helpers/DefaultExplorer";
//sidebar to contain links to all of my blogs
//page will need to uniquely render the markup

//for desktop this will live permenantly on the left side
//for mobile it will need to slde out and take up the entire page

//will need to make use of useEffects to load the links from db and display as dates + topic

//ex: 2025-12-05: Some topic

interface BlogSidebarProps{
  IsMobile: boolean
}

const BlogSidebar:React.FC<BlogSidebarProps> = ({ IsMobile }) => {
  return (
    <div className={`${IsMobile ? "mobile-sidebar-container" : "sidebar-container"}`}>
      <div className={`${IsMobile ? "mobile-header-container" : "sidebar-header-container"}`}>
        <h3 className={`${IsMobile ? "mobile-header" : "sidebar-header"}`}>Latest Posts</h3>
            <ul className={`${IsMobile ? "mobile-sidebar-list" : "sidebar-list"} `}>
            {CompiledSidebarLinks.map((link) => (
              <li className="sidebar-list-item" key={link.Id}>
                <Link to={`/Blog/${link.Id}`}>
                  {link.Date.slice(0, 10)}
                  <br /> {link.Topic}
                </Link>
              </li>
            ))}
          </ul>
      </div>
    </div>
  );
};

export default BlogSidebar;

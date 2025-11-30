import "./BlogSidebar.css";
import LoadingSpinner from "../Spinners/LoadingSpinner";
import SimpleButton from "../SimpleButton/SimpleButton";
import { useObbyViewer } from "../../Contexts/ObbyViewerContext";
//sidebar to contain links to all of my blogs
//page will need to uniquely render the markup

//for desktop this will live permenantly on the left side
//for mobile it will need to slde out and take up the entire page

//will need to make use of useEffects to load the links from db and display as dates + topic

//ex: 2025-12-05: Some topic

const BlogSidebar = () => {
  const {sidebarLoading, sidebarError, sidebarLinks, refreshSidebar } = useObbyViewer();

  return (
    <div className="sidebar-container">
      <div className="sidebar-header-container">
        <h3 className="sidebar-header">Latest Posts</h3>
        {sidebarLoading ? (
          <div className="sidebar-flex">
          <LoadingSpinner />
          </div>
        ) : (
          <ul className="sidebar-list">
            {sidebarLinks.map((link) => (
              <li className="sidebar-list-item" key={link.Id}>
                <a href={`/my-blog/${link.Id}`}>
                  {link.Date.slice(0, 10)}
                  <br /> {link.Topic}
                </a>
              </li>
            ))}
          </ul>
        )}
        {sidebarError ? (
          <div className="sidebar-flex">
            {" "}
            <p style={{ color: "red" }}>failed to load blog links</p>
            <SimpleButton
              label="Retry"
              onClickCallback={refreshSidebar}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default BlogSidebar;

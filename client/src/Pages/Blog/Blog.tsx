import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import "./Blog.css";
import BlogSidebar from "../../Components/BlogSidebar/BlogSidebar";
import type { BlogContent } from "../../Helpers/DefaultExplorer"
import { GetBlogContentById } from "../../Helpers/DefaultExplorer";
import ObsidianViewer from "../../Components/ObsidianViewer/ObsidianViewer";
import LoadingSpinner from "../../Components/Spinners/LoadingSpinner";


const Blog = () => {
  const [fadingIn, setFadingIn] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [blogContent, setBlogContent] = useState<BlogContent>();
  const fetchBlog = async () => {
    try {
      

      const item: BlogContent | undefined = GetBlogContentById(id);
      if(!item){
        setError(true);
      }else{
        setBlogContent(item)
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFadingIn(true);
    const timeout = setTimeout(() => setFadingIn(false), 500); // match animation duration
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    fetchBlog();
  }, [id]);
  return (
    <div className="blog-container ">
      <Layout>
        <div className={`my-blog-flex-container ${fadingIn ? "fade-in" : ""}`}>
          <div className="blog-sidebar-container">
            <BlogSidebar />
          </div>
          <div className="obsidian-blog-col">
            <div className="blog-content">
              {loading ? (
                <LoadingSpinner />
              ) : error ? (
                <div className="blog-text">
                  <p>
                    Error loading blog entry
                  </p>
                </div>
              ) : blogContent ? (
                
                  
                  <div className="blog-text" style={{whiteSpace: "pre-wrap"}} dangerouslySetInnerHTML={{ __html: blogContent.Text}}>
                    
                  </div>
                
              ) : null}
            </div>
            <div className="obsidian-container">
              <ObsidianViewer />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Blog;

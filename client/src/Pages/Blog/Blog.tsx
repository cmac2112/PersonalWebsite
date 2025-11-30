import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import "./Blog.css";
import BlogSidebar from "../../Components/BlogSidebar/BlogSidebar";
import axios from "axios";
import ObsidianViewer from "../../Components/ObsidianViewer/ObsidianViewer";
import LoadingSpinner from "../../Components/Spinners/LoadingSpinner";
interface BlogContent {
  Id: string;
  Text: string;
  Links: string[];
  Topic: string;
  date: string;
}

const Blog = () => {
  const [fadingIn, setFadingIn] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [blogContent, setBlogContent] = useState<BlogContent>();
  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError(false);
      //if Id is not provdided then we need to select from the top
      let url;
      if (id === undefined) {
        url = `${import.meta.env.VITE_URL_DEV}/api/blog/latest`;
      } else {
        url = `${import.meta.env.VITE_URL_DEV}/api/blog/${id}`;
      }
      const response = await axios.get(url);
      if (response.status === 200) {
        setBlogContent({
          Id: response.data.id,
          Text: response.data.text,
          Links: response.data.links,
          Topic: response.data.topic,
          date: response.data.date,
        });
      } else {
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
  }, []);
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
                <>
                  <div className="blog-header-containter">
                    <h2 className="blog-header">{blogContent.Topic}</h2>
                  </div>
                  <div className="blog-text" style={{whiteSpace: "pre-wrap"}} dangerouslySetInnerHTML={{ __html: blogContent.Text}}>
                    
                  </div>
                </>
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

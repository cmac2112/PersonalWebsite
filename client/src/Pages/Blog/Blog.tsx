import React, {useEffect, useState} from 'react'
import Layout from '../../Components/Layout/Layout'
import "./Blog.css"
import BlogSidebar from '../../Components/BlogSidebar/BlogSidebar'
const Blog = () => {
  const [fadingIn, setFadingIn] = useState<boolean>(false)
    useEffect(() => {
      setFadingIn(true);
      const timeout = setTimeout(() => setFadingIn(false), 500); // match animation duration
      return () => clearTimeout(timeout);
    },[])
  return (
    <div className='blog-container '>
    <Layout>
      <div className={`my-blog-flex-container ${fadingIn ? "fade-in" : ""}`}>
        <div className='blog-sidebar-container'>
      <BlogSidebar />
      </div>
    <div className='blog-content'>
      <div className='blog-header-containter'>
        <h2 className='blog-header'>Blog Title Placeholder</h2>
      </div>
      <div className='blog-text'>
        <p>this is a test of text this is a test of text this is a test of text this is a test of text this is a test of text this is a test of text this is a test of text this is a test of text this is a test of text this is a test of text this is a test of text this is a test of text this is a test of text this is a test of text this is a test of text this is a test of text this is a test of text</p>
        <p>this is a test of text</p>
        <p>this is a test of text</p>
        <p>this is a test of text</p>
        <p>this is a test of text</p>

      </div>
      </div>
    </div>
    </Layout>
    </div>
  )
}

export default Blog

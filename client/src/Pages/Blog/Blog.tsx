import React from 'react'
import Layout from '../../Components/Layout/Layout'
import { useNavigate } from 'react-router-dom'
const Blog = () => {
    const navigate = useNavigate();
  return (
    <Layout handleRestartAnimation={() => navigate("/")}>
    <div className='my-blog-container'>
      <p>my blog area: future wip</p>
    </div>
    </Layout>
  )
}

export default Blog

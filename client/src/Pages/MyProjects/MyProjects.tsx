import React from 'react'
import Layout from '../../Components/Layout/Layout'
import { useNavigate } from 'react-router-dom'
const MyProjects = () => {
    const navigate = useNavigate();
  return (
    <Layout handleRestartAnimation={() => navigate("/")}>
    <div className='my-projects-container'>
      <p>my projects</p>
    </div>
    </Layout>
  )
}

export default MyProjects

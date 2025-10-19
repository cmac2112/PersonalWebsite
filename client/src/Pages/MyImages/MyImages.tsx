import React from 'react'
import Layout from '../../Components/Layout/Layout'
import { useNavigate } from 'react-router-dom'
const MyImages = () => {
    const navigate = useNavigate();
  return (
    <Layout handleRestartAnimation={() => navigate("/")}>
    <div className='image-gallery-container'>
      <p>test</p>
    </div>
    </Layout>
  )
}

export default MyImages

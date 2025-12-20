import React, { useEffect } from 'react'
import Layout from '../../Components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
const MyProjects = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if(!section){
      return;
    }

    const ele = document.getElementById(section.replace("-","").replace(" ", "").toLowerCase());
    if(ele){
      ele.scrollIntoView({ behavior: "smooth", block: "start"});
    }else{
      navigate("/bad-route")
    }

  }, [section])
  return (
    <Layout>
    <div className='my-projects-container'>
      <p>my projects</p>
      <p>my projects</p>
      <p>my projects</p>
      <p>my projects</p>
      <p>my projects</p><p>my projects</p>
      <p>my projects</p>
      <p>my projects</p>
      <p>my projects</p>
      <p>my projects</p>
      <p>my projects</p>
      <p>my projects</p>
      <p>my projects</p>
      <p>my projects</p>
      <p>my projects</p>
      <p>my projects</p>
      <p>my projects</p>
      <p>my projects</p>
      <p>my projects</p>
      <p>my projects</p>
      <p>my projects</p>
      <p>my projects</p>
      <section id="skywatch">
        <p>this is the skywatch section</p>
      </section>
      <p>my projects</p><p>my projects</p><p>my projects</p><p>my projects</p><p>my projects</p><p>my projects</p><p>my projects</p><p>my projects</p><p>my projects</p>
      
    </div>
    </Layout>
  )
}

export default MyProjects

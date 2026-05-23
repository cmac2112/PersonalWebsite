import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../Components/Layout/Layout'
import patrick from "../../assets/patrick.gif"
const MyImages = () => {
  return (
    <Layout>
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <p>Nothing here yet....</p>
      <img src={patrick} />
      <div className='w-full flex justify-center py-10'>
      <Link to={'/home'}>Go Home</Link>
      </div>
    </div>
    </Layout>
  )
}

export default MyImages

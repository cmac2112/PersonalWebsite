import React from 'react'
import Layout from '../../Components/Layout/Layout'
import "./BadRoute.css"
import patrick from "../../assets/patrick.gif"
const BadRoute = () => {
  return (
    <div className='bad-route-container'>
    <Layout>
            <div className='bad-route-text'>
            <h2>404</h2>
            <p>Looks like theres nothing here!</p>
            <p>If you got here by clicking a link in the blog I'm sorry I misguided you :(</p>
            <img src={patrick} alt="Patrick Star looking confused on the 404 page" />
            <a href="/home">Take me home down country roads</a>
                </div>
                
    </Layout>
    </div>
      
    
  )
}

export default BadRoute

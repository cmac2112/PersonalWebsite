import { useEffect } from 'react'
import Layout from '../../Components/Layout/Layout'
import { useParams } from 'react-router-dom'
const MyProjects = () => {
  const { section } = useParams();
  useEffect(() => {
    if(!section){
      return;
    }

    const ele = document.getElementById(section.replace("-","").replace(" ", "").toLowerCase());
    if(ele){
      ele.scrollIntoView({ behavior: "smooth", block: "start"});
    }
  }, [section])
  return (
    <Layout>
    <div className='my-projects-container'>
     <p>nothing here.... yet</p>
    </div>
    </Layout>
  )
}

export default MyProjects

import React, { useEffect, useState } from 'react'
import "./BlogSidebar.css"
import axios from 'axios';
//sidebar to contain links to all of my blogs
//page will need to uniquely render the markup

//for desktop this will live permenantly on the left side
//for mobile it will need to slde out and take up the entire page

//will need to make use of useEffects to load the links from db and display as dates + topic

//ex: 2025-12-05: Some topic

interface SidebarLink{
  Id: string,
  Topic: string, // string displayed in li
  Date: string,

}

const BlogSidebar = () => {
const [Loading, setLoading] = useState<boolean>(true);


const [error, setError] = useState<boolean>(false);

const [data, setData] = useState<SidebarLink[]>([]);



const fetchLogs = async () => {
  try{
    const response = await axios.get(`${import.meta.env.VITE_URL_DEV}/api/blogs`);
    //console.log(response)
    if(response.status === 200){
      const formatted: SidebarLink[] = response.data.blogs.map((item: any) => ({
        Id: item.id,
        Topic: item.topic,
        Date: item.date,
      }))

      setData(formatted)
    }
  }catch(err){
    setError(true)
  }finally{
    setLoading(false);
  }

}

useEffect(() => {
  fetchLogs();
}, [])

  return (
    <div className='sidebar-container'>
      <div className='sidebar-header-container'>
        <h3 className='sidebar-header'>Latest Posts</h3>
        {Loading ?
        <p>loading...</p> :
        
        <ul className='sidebar-list'>
          {data.map(link => (
            <li className='sidebar-list-item' key={link.Id}><a href={`/my-blog/${link.Id}`}>{link.Date.slice(0, 10)}<br/> {link.Topic}</a></li>
          ))}
        </ul>
}
          {error ? <p style={{color: "red"}}>failed to load blog links</p> : <></>}
      </div>
    </div>
  )
}

export default BlogSidebar

import React, { useEffect, useState } from 'react'
import './lecture.css'

import axios from 'axios'
import { server } from '../../main'
import Loading from '../../components/loading/Loading'
import { CourseData } from '../../context/CourseContext'
import { useParams } from 'react-router-dom'

const Lecture = ({ user }) => {
    const [lectures, setLectures] =useState([])
    const [lecture, setLecture] = useState([])
    const [loading, setLoading] =useState(true)
    const [lecLoading, setLecLoading] = useState(false)
    const {Course} = CourseData()
    const[show, setShow] = useState(false)
    const params = useParams();



    async function fetchLectures (id) {
       
        try {
            
            const {data} = await axios.get(`${server}/api/lectures/${Course._id}`,{
                headers:{
                   token: localStorage.getItem("token")
                   
                },
            }
                
            );
           
            setLectures(data.lectures)
            setLoading(false)
            console.log(data);
           
           
            
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    useEffect((e)=>{
       
        fetchLectures()
        
      
    },[])
   

    async function fetchLecture (id) {
        setLecLoading(true)
        try {
            const {data} = await axios.get(`${server}/api/lecture/${id}`,{
                headers:{
                    token: localStorage.getItem("token")
                
                },
                
            });
            
            setLecture(data.lecture)
            setLecLoading(false)
           
           

        } catch (error) {
            console.log(error)
            setLecLoading(false)
            
        }
    }

   
  return (
   
    <>
        
            {loading ? <Loading /> : <>
                <div className="lecture-page">

                <div className="left">
                    {
                        lecLoading ? <Loading /> : <>
                            {
                                lecture.video ? <div key={lecture.id}>
                                
                                      <video src={`${server}/${lecture.video}}`} 
                                    width={"100%"}
                                    controls 
                                    controlsList="nodownload "

                                     disablePictureInPicture
                                     disableRemotePlayback
                                     autoPlay>
                                    </video>
                                    <h1>{lecture.title}</h1>
                                    <h3>{lecture.description}</h3>

                                    
                                    
                                   
                                    
                                   
                                    
                             
                                </div> :<h1>Please Select a lecture</h1>
                                
                            }
                                
                            </>         
                     
                    } 

                    
                </div>
                <div className="right">
                    {user && user.role ==="admin" && (
                        <button className='common-btn' onClick={()=>setShow(show)}>
                        {show ? "close":"Add Lecture +"}</button>
                        ) }

                    {
                        show && (<div className="lecture-form">
                            <h2>Add Lecture</h2>
                            <form>
                                <label htmlFor="text">Title</label>
                                <input type="text" required />

                                <label htmlFor="text">Description</label>
                                <input type="text" required />

                                <input type="file" placeholder="choose video" required/>
                                <button type="submit" className='common-btn'> Add</button>
                            </form>
                        </div>)
                    }

                    {
                        lectures && lectures.length>0 ? lectures.map((e,i)=>(
                            <>
                                <div onClick={()=>fetchLecture(e._id)}
                                 key={i}
                                 className={`lecture-number ${lecture._id === e._id && "active"}`}>
                                    {i+1}.{e.title}
                                </div>
                                {
                                    user && user === "admin" && (<button className="common-btn" style={{background: "red" }}>delete {e.title}</button>)
                                }
                            </>
                        )) : <p>No lectures yet</p>
                    }
                </div>
                </div>
            </>
            }
        
    </>
  )
}


export default Lecture
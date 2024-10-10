import React from 'react'
import './courses.css'
import {  CourseData } from '../../context/CourseContext'
import CourseCard from '../../components/coursecard/CourseCard'


const Courses = () => {
 
  const {Courses} = CourseData()
    console.log( Courses )
    
  return (
    <div>
    <div className="courses">
        <h2>Available Courses</h2>
    
    <div className="course-container">
        {
          Courses && Courses.length>0 ? 
            Courses.map((e)=>
                <CourseCard key={e._id} course={e}/>)
             : <p>No Courses yet!</p>
             
        }
        
    </div>
    </div>
    </div>
  )
  
}

export default Courses
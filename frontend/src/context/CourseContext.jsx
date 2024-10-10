import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";


const CourseContext = createContext()

export const CourseContextProvider = ({children}) => {
    const [Courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [Course, setCourse]   = useState([])
    const [mycourse, setMyCourse] = useState([])
   
    

    async function fetchCourses () {
        try {
            const {data} = await axios.get(`${server}/api/course/all`)
            console.log("Data fetched:", data);

            setCourses(data.Courses)

            setLoading(false)
           
        } catch (error) {
            console.log("Error fetching data:",error)
            setLoading(false)
        }
    }

    async function fetchCourse(id) {
        try {
            const {data} = await axios.get(`${server}/api/course/${id}`)
            console.log("Data fetched:", data);
            setCourse(data.Course)
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    async function fetchMyCourse() {
        try {
            const {data} = await axios.get(`${server}/api/mycourse`,{
                headers: {
                    token : localStorage.getItem("token")
                }
            })

            
            setMyCourse(data.Courses) 
        } catch (error) {
            console.log(error)
        }
    }
                  
    useEffect(()=>{
        fetchCourses(Courses)
        fetchMyCourse()
    }, [])
    console.log(Courses)
    return( <CourseContext.Provider value={{
         Courses,
         loading ,
         fetchCourses, 
         fetchCourse, 
         Course, 
         mycourse, 
         fetchMyCourse 
         }}>
    {children}
    
    </CourseContext.Provider>
    )
    

}
 
export const CourseData = () => useContext(CourseContext)
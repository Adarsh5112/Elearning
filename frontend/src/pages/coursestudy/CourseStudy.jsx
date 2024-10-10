import React, { useEffect } from 'react'
import './coursestudy.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CourseData } from '../../context/CourseContext'
import { server } from '../../main'

const CourseStudy = ({ user }) => {
    const params = useParams()

    const { fetchCourse, Course } = CourseData()
    const navigate = useNavigate()

    if(user && user.role !== "admin" && !user.subscription.includes(params.id))
        return navigate('/')

    useEffect(() => {
        fetchCourse(params.id)
    }, [])
  return (
    <>
        {
            Course && <div className="course-study-page">
                <img src={`${server}/${Course.image}`} alt="" width={350} />
                <h2>{Course.title}</h2>
                <h4>{Course.description}</h4>
                <h5>By - {Course.createdBy} </h5>
                <h5>Duration - {Course.duration} weeks </h5>
                <Link to={`/lectures/${Course.id}`}>
                    <h2> Lectures</h2>
                </Link>
            </div>
        }
    </>
  )
}

export default CourseStudy
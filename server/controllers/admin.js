
import tryCatch from "../middleware/tryCatch.js";
import { courses } from "../models/courses.js";
import { Lecture } from "../models/Lecture.js";
import {rm} from 'fs';
import {promisify} from 'util';
import fs from 'fs';
import User from '../models/userModel.js'


export const createCourse = tryCatch(async(req,res)=>{
    const {title, description, category, createdBy, duration, price}= req.body

    const image = req.file;

    await courses.create({
        title,
        description,
        category,
        createdBy,
        image: image?.path,
        duration,
        price,
    });

    res.status(201).json({
        message: "Course Created Succesfully"
    });
})

export const addLectures = tryCatch(async(req,res) => {
    const course = await courses.findById(req.params.id);

    if(!course)
        return res.status(404).json({
    
    message: "No Course with this id"
        });
    
        const {title,description} =req.body

        const file = req.file

        const lecture = await Lecture.create({
            title,
            description,
            video: file?.path,
            course: course._id,

        });
       res .status(201).json({
        message: "Lecture Added",
        lecture,
       })
})

export const deleteLecture = tryCatch(async(req,res) => {
    const lecture = await Lecture.findById(req.params.id)

    rm(lecture.video,()=>{
        console.log("video deleted")
    })

    await lecture.deleteOne()

    res.json({ message: "Lecture Deleted" })
});

const unlinkAsync = promisify(fs.unlink)

export const deleteCourse = tryCatch(async(req,res) => {
    const Course = await courses.findById(req.params.id)

    const lectures = await Lecture.find({course: Course._id})

    await Promise.all(
        lectures.map(async(lecture) => {
            await unlinkAsync(lecture.video);
            console.log("video deleted")
        })
    )
    rm(Course.image,() => {
        console.log("Image Deleted")
    });

    await Lecture.find({course: req.params.id}).deleteMany()

    await Course.deleteOne()

    await User.updateMany({},{$pull:{subscription: req.params.id }});

    res.json({
        message: "Course Deleted"
    });
})

export const getAllStats = tryCatch(async(req,res) => {
    const totalCourses = (await courses.find()).length
    const totalLectures = (await courses.find()).length
    const totalUsers = (await courses.find()).length

    const stats = {
        totalCourses,
        totalLectures,
        totalUsers,
    };

    res.json({
        stats,
    })
})
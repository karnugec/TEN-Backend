import {Router} from 'express'
import { createCourse,getallcourses,getcoursesByID } from '../controllers/courseControllers.js';

const courseRoute = Router()
courseRoute.post('/course',createCourse)
courseRoute.get('/courses',getallcourses)
courseRoute.get('/coursedetails/:id',getcoursesByID)

export default courseRoute;
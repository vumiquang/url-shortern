import { Router } from 'express'
import urlRoute from './url.route'

const router = Router() 
router.use(urlRoute)

export default router

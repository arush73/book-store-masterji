import { Router } from 'express'

const router = Router()

import { placeOrder, getOrders, getOrderDetails } from '../controllers/orders.controller.js'

router.route('/orders').post(placeOrder).get(getOrders)
router.route('/orders/:id').get(getOrderDetails) // order details

export default router

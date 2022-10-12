const express = require('express')
const router = express.Router();
const { getOrderModelByDate, getAll, getById, postNewOrder, editOrder, deleteOrderById } = require('../controllers/order.controller')
const OrderModel = require('../models/orders')


//get all orders 
router.get('/', getAll)

//get data by date
router.get('/date_range', getOrderModelByDate)


//post new order
router.post('/', postNewOrder)

router.get('/:id', getById)

// edit order
router.put('/:id', editOrder)

//delete order by id
router.delete('/:id', deleteOrderById)



module.exports = { orderRouter: router };
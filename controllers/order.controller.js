
const OrderModel = require('../models/orders');
const ObjectId = require('mongoose').Types.ObjectId


//get all orders 
exports.getAll = async (req, res) => {
    await OrderModel.find({}).populate('user').exec((err, orders) => {
        (!err) ? res.send(orders)
            : console.log('error in get all Orders: ' + JSON.stringify(err, undefined, 2))
    })
}

//get by id
exports.getById = (req, res) => {
    (!ObjectId.isValid(req.params.id)) && res.status(400).send(`No Order given id :  ${req.params.id}`);

    OrderModel.findById(req.params.id).populate('user').exec((err, order) => {
        (!err) ? res.send(order)
            : console.log('error in get Order by id : ' + JSON.stringify(err, undefined, 2))

    })
}

// get orders by use//********************************************************************************************** */
exports.getOrdersByUser = async(req, res) => {
    await OrderModel.find({user: req.query}).populate('user').exec((err, posts) => {
        (!err)? res.json(posts) : res.status(500).json(err.message)
    })
}


//get data by date
exports.getOrderModelByDate = async (req, res) => {

    try {
        //get dates from req.query 
        let { startDate, endDate } = req.query;

        //1. check that date is not empty
        if (startDate === '' || endDate === '') {
            return res.status(400).json({
                status: 'failure',
                message: 'Please ensure you pick two dates'
            })
        }


        //3. Query database using Mongoose
        const OrderModels = await OrderModel.find({
            date: {
                $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
                $lt: new Date(new Date(endDate).setHours(23, 59, 59))
            }
            //////////////////////////////////////////////////////////////////1
        }).populate('user').exec()

        //4. Handle responses
        if (!OrderModels) {
            return res.status(404).json({
                status: 'failure',
                message: 'Could not retrieve OrderModels'
            })
        }

        res.status(200).json({
            data: OrderModels
        })

    } catch (error) {
        return res.status(500).json({
            status: 'failure',
            error: error.message
        })
    }
}


//post new order

exports.postNewOrder = (req, res) => {
    var order = new OrderModel({
        user: req.body.user,
        date: new Date(),
        status: req.body.status,
        amount: req.body.amount,
        action: req.body.action,
        room: req.body.room,
        ext: req.body.ext,

    });
    order.save((err, order) => {
        (!err) ? res.send(order)
            : console.log('error in post Order: ' + JSON.stringify(err, undefined, 2))

    })
}



// edit order
exports.editOrder = (req, res) => {
    (!ObjectId.isValid(req.params.id)) && res.status(400).send(`No Order given id :  ${req.params.id}`);

    var order = {
        user: req.body.user,
        date: new Date(),
        status: req.body.status,
        amount: req.body.amount,
        action: req.body.action,
        room: req.body.amount,
        ext: req.body.amount,

    }


    OrderModel.findByIdAndUpdate(req.params.id, { $set: order }, { new: true },
        (err, order) => {
            (!err) ? res.send(order)
                : console.log('error in update Order: ' + JSON.stringify(err, undefined, 2))
        })
}

// delete order by id
exports.deleteOrderById = (req, res) => {
    (!ObjectId.isValid(req.params.id)) && res.status(400).send(`No Order given id :  ${req.params.id}`);

    OrderModel.findByIdAndRemove(req.params.id, (err, order) => {
        (!err) ? res.send(order)
            : console.log('error in update Order: ' + JSON.stringify(err, undefined, 2))
    })
}
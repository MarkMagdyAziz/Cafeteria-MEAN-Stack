const mongoose = require("mongoose");

const OrderSchema =  new mongoose.Schema({
    date: { type: Date, required: true },
    status: { type: String, required: true },
    amount: { type: Number,required: true },
    action: { type: String, required: true },
    room: { type: Number, required: true },
    ext: { type: Number, required: true },

  },
    { timestamps: true }

);

const OrderModel = mongoose.model('order', OrderSchema)

module.exports = OrderModel;

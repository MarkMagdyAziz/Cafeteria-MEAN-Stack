const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, required: true },
  status: { type: String, required: true },
  amount: { type: Number, required: true },
  action: { type: String },
  room: { type: Number, required: true },
  ext: { type: Number, required: true },

},
  { timestamps: true }

);


const OrderModel = mongoose.model('order', OrderSchema)

module.exports = OrderModel;

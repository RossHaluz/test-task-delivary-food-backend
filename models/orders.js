const { required } = require('joi')
const {Schema, model} = require('mongoose')

const OrderSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true
    }
})

const OrderModel = model('order', OrderSchema)

module.exports = {
    OrderModel
}
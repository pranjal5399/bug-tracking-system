const mongoose=require('mongoose');
const Schema=mongoose.Schema();

const ticketSchema=new Schema({
    name: { type: String, required: true },

    creation:{type: Date, default:Date.now},
})

module.exports=mongoose.model("Ticket", ticketSchema);
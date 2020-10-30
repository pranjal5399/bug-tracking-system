const mongoose=require('mongoose');
const Schema=mongoose.Schema();

const projectSchema=new Schema({
    title: { type: String, required: true },
    description: {type: String, required: true},
    workers:[{type:mongoose.ObjectId, ref:'User'}],
    tickets:[{type:mongoose.ObjectId, ref:'Ticket'}],
    creation:{type: Date, default:Date.now},
})

module.exports=mongoose.model("Project", projectSchema);
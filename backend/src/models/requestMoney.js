import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    upi:{
        type: String,
    },
    metamask:{
        type: String,
    },
    requests:[
        {
            amount: {type: String, required: true},
            sender: {type: String, required: true},
            name: {type: String, require: true}
        }
    ]
},
{timestamps: true});

const requestMoney = mongoose.model("requestMoney", requestSchema);
export default requestMoney; 
import payments from "../models/payments.js";

export const paymentsWrite = async (req,res) => {
    try {
        const date = req.body.date;
        const to = req.body.to;
        const keyword = req.body.keyword;
        const amt = req.body.amt;
        const coin = req.body.coin;
        const sender = req.body.sender; // primary key

        const result = await payments.insertMany({
            'date': date,
            'toUPI': to,
            'keyword': keyword,
            'amount': amt,
            'sender': sender,
            'coin': coin,
        });
        console.log("paymentsWrite: " + result);
        return res.json(result.data);
    } catch (error) {
        throw new Error(`failed due to ${error}`);
    }
}

export const paymentsRead = async (req,res) => {
    try {
        const sender = req.body.sender;

        const result = await payments.find({
            'sender': sender,
        });
        console.log(result);
        return res.json(result);
    } catch (error) {
        throw new Error(error);
    }
}
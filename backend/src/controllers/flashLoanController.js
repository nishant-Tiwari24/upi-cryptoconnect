import FLHistory from "../models/FLHistory.js";

// export const FLStatusRead = async (req,res) => {
//     try {
//         const addr = req.body.arenaAddress;
//         const data = await FLStatus.find({'arenaAddress': addr});
//         console.log(data[0].status);
//         return res.json(data[0].status);
//     } catch (error) {
//         console.log("Error in FLStatusRead: " + error);
//         return res.json('failed');
//     }
// }

// export const FLStatusWrite = async (req,res) => {
//     try {
//         const addr = req.body.arenaAddress;
//         const status = req.body.status;
//         const data = await FLStatus.insertMany({'arenaAddress': addr, 'status': status});
//         console.log(data);
//         return res.json("success");
//     } catch (error) {
//         console.log("Error in FLStatusWrite: " + error);
//         return res.json("failed");
//     }
// }

export const FLHistoryRead = async (req,res) => {
    try {
        const addr = req.body.address;
        const date = req.body.date;
        const token = req.body.token;
        const loan = req.body.amt;
        const pl = req.body.pft;

        const data = await FLHistory.find({'address':addr});
        console.log(data);
        return res.json(data);
        
    } catch (error) {
        console.log("Error in FLHistoryRead: " + error);
        return res.json("failed");
    }
}

export const FLHistoryWrite = async (req,res) => {
    try {
        const addr = req.body.address;
        const date = req.body.date;
        const token = req.body.token;
        const loan = req.body.amt;
        const pl = req.body.pft;

        const data = await FLHistory.insertMany({'address':addr, "date": date, "token": token, "loan": loan, "pl": pl});
        console.log(data);
        return res.json({"status":'success',"data":data});
        
    } catch (error) {
        console.log("Error in FLHistoryWrite: " + error);
        return res.json("failed");
    }
}

import dotenv from 'dotenv';
dotenv.config();

//  keys and constants
// const mongoURI = process.env.MONGO_URI;
const mongoURI = "sefasf";
const jwtSecret = 'AWFHWVFIEWQFV42523';
// const currencyApiKey = process.env.CURRENCY_API_KEY;
const currencyApiKey = "sdfadsf";
// const cryptoApiKey = process.env.CRYPTO_API_KEY;
const cryptoApiKey = "sdfasdf";
const razorpay_key_id = "rzp_test_j1evu9RVxuBdwx";
const razorpay_key_secret = "wSau6JRBrjKLS5DlX5HZaBJE";


export { 
    mongoURI, 
    jwtSecret, 
    currencyApiKey, 
    cryptoApiKey,
    razorpay_key_id, 
    razorpay_key_secret,
};

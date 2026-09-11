import dotenv from "dotenv";

dotenv.config();

if(!process.env.MONGO_URI){
    throw new Error('MONGO_URI must be defined in env file.');
}
if(!process.env.JWT_SECRET){
    throw new Error('JWT_SECRET must be defined in env file.');
}
const config = {
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "15m"
}

export default config;
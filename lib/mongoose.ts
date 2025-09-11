import mongoose from "mongoose";

const MONGO_URL = process.env.MONGODB_URL;

if (!MONGO_URL) {
    throw new Error('❌ MONGODB_URL is not defined in environment variables');
}

let isConnected = false;

export const connectDB = async () => {
    if (isConnected) return;

    try {
        const db = await mongoose.connect(MONGO_URL, {
            dbName: 'polling-site'
        });

        isConnected = !!db.connections[0].readyState;
    } catch (err) {
        throw err;
    }
};

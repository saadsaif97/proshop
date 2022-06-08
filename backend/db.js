import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`MongoDB Connected Successfully: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(`ERROR: ${error.message}`.red.underline.bold)
    }
}

export default connectDB
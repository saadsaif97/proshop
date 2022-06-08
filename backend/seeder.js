import Order from './models/orderModel.js';
import Product from './models/productModel.js';
import User from './models/userModel.js';
import colors from 'colors';
import connectDB from './db.js';
import dotenv from 'dotenv';
import products from './data/products.js';
import users from './data/users.js';

dotenv.config()
connectDB()

const importData = async () => {
    try {
        await User.deleteMany()
        await Order.deleteMany()
        await Product.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id
        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }
        })
        await Product.insertMany(sampleProducts)

        console.log('Data imported!'.green.inverse)
        process.exit()
    } catch (error) {
        console.log(`Error: ${error.message}`.red.inverse)
        process.exit(1)
    }
}

const destroyedData = async () => {
    try {
        await User.deleteMany()
        await Order.deleteMany()
        await Product.deleteMany()

        console.log('Data destroyed!'.red.inverse)
        process.exit()
    } catch (error) {
        console.log(`Error: ${error.message}`.red.inverse)
        process.exit(1)
    }
}


if (process.argv[2] === '-d') {
    destroyedData()
} else {
    importData()
}
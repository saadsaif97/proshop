import bcrypt from "bcryptjs"

const users = [
    {
        name: 'Admin User',
        email: 'admin@test.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Jhon Doe',
        email: 'jhon@test.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Jane Doe',
        email: 'jane@test.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users 
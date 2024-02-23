import { DataTypes } from 'sequelize'
import { sequelize } from '..'

const Login = sequelize.define('login', {
    email: {
        type: DataTypes.STRING(100),
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
},
    {
        timestamps: false
    }
);

export { Login }
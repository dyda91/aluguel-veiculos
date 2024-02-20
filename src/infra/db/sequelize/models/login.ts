import { DataTypes } from 'sequelize'
import { sequelize } from '..'

const Login = sequelize.define('login', {
    email: {
        type: DataTypes.STRING(36),
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING(36),
        allowNull: true
    },
},
    {
        timestamps: false
    }
);

export { Login }
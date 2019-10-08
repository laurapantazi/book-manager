module.exports = (sequelize, DataTypes) => {
    var user = sequelize.define('user',{
        user_id: { 
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        firstname: {
            type: DataTypes.STRING,
            validate: {is: ["^[a-z]+$",'i']}
        },
        lastname:  {
            type: DataTypes.STRING,
            validate: {is: ["^[a-z]+$",'i']}
        },
        username:  {
            type: DataTypes.STRING,
            validate: {isAlphanumeric: true},
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            isEmail: true
        } 
    },{
        freezeTableName: true
    })
    return user
}
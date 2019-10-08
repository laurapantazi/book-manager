module.exports = (sequelize, DataTypes) => {
    var book = sequelize.define('book',{
        book_id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING
        },
        author:  {
            type: DataTypes.STRING
        },
        country:  {
            type: DataTypes.STRING
        },
        language:  {
            type: DataTypes.STRING
        },
        pages:  {
            type: DataTypes.STRING,
            validate: {isAlphanumeric: true},
            unique: true
        },
        year:  {
            type: DataTypes.STRING,
            validate: {isAlphanumeric: true},
            unique: true
        }
    },{
        freezeTableName: true
    })
    return book
}
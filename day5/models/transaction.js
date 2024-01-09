module.exports = (sequelize, DataTypes) => {
    const transaction = sequelize.define('transaction', 
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: DataTypes.INTEGER,
            shipping_dock_id:  DataTypes.INTEGER,
            amount: DataTypes.INTEGER,
            discount: DataTypes.INTEGER,
            tax: DataTypes.INTEGER,
            total: DataTypes.INTEGER,
            notes: DataTypes.STRING,
            status : {
                type: DataTypes.ENUM,
                values: ['paid', 'not paid'],
                defaultValue: 'not paid'
            }

        },
        
        {
            timestamps: true,
            freezeTableName: true,
            tableName: "transacation",
        },
        {
            underscoredAll: false,
            underscored: false,
        }
    )

    return transaction
}
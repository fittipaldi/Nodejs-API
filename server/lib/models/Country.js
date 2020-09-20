module.exports = (sequelize, DataTypes) => {
    const Country = sequelize.define('Country', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        country_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        updated_at: {
            type: 'TIMESTAMP',
            allowNull: false,
            defaultValue: sequelize.literal('current_timestamp')
        },
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'country',
    });
    return Country;
};
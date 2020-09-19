module.exports = (sequelize, DataTypes) => {
    const SoccerMatch = sequelize.define('SoccerMatch', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        date_time: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        team_a: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        team_z: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        updated_at: {
            type: 'TIMESTAMP',
            allowNull: false,
            defaultValue: sequelize.literal('current_timestamp')
        },
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'soccer_match',
    });

    SoccerMatch.associate = function (models) {
        SoccerMatch.belongsTo(models.SoccerTeam, {foreignKey: 'team_a', targetKey: 'id', as: 'team_a_data'});
        SoccerMatch.belongsTo(models.SoccerTeam, {foreignKey: 'team_z', targetKey: 'id', as: 'team_z_data'});
    };

    return SoccerMatch;
};
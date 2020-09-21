const sequelize = require('../models').sequelize;

module.exports.getMatchesByTeam = (team_id, limit, offset) => {

    limit = (typeof limit != 'undefined' && limit) ? parseInt(limit) : 50;
    offset = (typeof offset != 'undefined' && offset) ? parseInt(offset) : 0;

    const sql = `
        SELECT 
            sm.*,
            st_a.id AS team_a_data_id,
            st_a.name AS team_a_data_name,
            st_a.country AS team_a_data_country,
            st_a.flag_icon AS team_a_data_flag_icon,
            st_a.status AS team_a_data_status,
            st_a.updated_at AS team_a_data_updated_at,
            st_z.id AS team_z_data_id,
            st_z.name AS team_z_data_name,
            st_z.country AS team_z_data_country,
            st_z.flag_icon AS team_z_data_flag_icon,
            st_z.status AS team_z_data_status,
            st_z.updated_at AS team_z_data_updated_at
        FROM soccer_match AS sm
        LEFT JOIN soccer_team AS st_a ON (sm.team_a = st_a.id) 
        LEFT JOIN soccer_team AS st_z ON (sm.team_z = st_z.id)  
        WHERE st_a.id = :team_id OR st_z.id = :team_id 
        ORDER BY sm.date_time ASC
        LIMIT :limit OFFSET :offset ;
    `;

    return sequelize.query(sql, {
        replacements: {team_id, limit, offset},
        type: sequelize.QueryTypes.SELECT
    });
};
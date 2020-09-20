require('dotenv').config();
let request = require('supertest');
const urlAPI = 'localhost:' + process.env.PORT;
request = request(urlAPI);
const API_TOKEN = '4A36C7F5D51F0DB74EAFADB20D40167B';

describe('Soccer Team Test', () => {

    it('getting all teams', (done) => {
        request.get('/soccer-team/all')
            .set('Authorization', 'Bearer ' + API_TOKEN)
            .expect(200)
            .end((err, res) => {
                console.log(res.body);
                if (err) {
                    return done(err);
                }
                if (!res.body.status) {
                    return done(err);
                }
                done();
            })
    });

});

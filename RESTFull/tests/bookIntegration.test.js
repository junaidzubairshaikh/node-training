require('should');

const request = require('supertest');
const mongoose = require('mongoose');
const Book = require('../src/models/books');
const app = require('../app');
const agent = request.agent(app);

process.env.ENV = 'TEST';

describe('Integration Test', () => {
    it('Should allow a book to be posted and return', (done) => {
        const book = { title: 'Hello', author: 'Junaid', genre: 'horror' };

        agent.post('/api/books')
            .send(book)
            .expect(200)
            .end((err, result) => {
                result.body.read.should.not.equal('false');
                result.body.should.have.property('_id');
                done();
            })
    })


    afterEach((done) => {
        Book.deleteMany({}).exec();
        done();
    })

    after((done) => {
        mongoose.connection.close();
        app.server.close();
        done();
    })
})


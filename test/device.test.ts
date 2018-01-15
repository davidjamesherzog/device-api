import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET devices', () => {

  it('responds with JSON array', () => {
    return chai.request(app).get('/api/devices')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(4);
      });
  });

  it('should include phone', () => {
    return chai.request(app).get('/api/devices')
      .then(res => {
        let phone = res.body.find(device => device.name === 'Phone');
        expect(phone).to.exist;
        expect(phone).to.have.all.keys([
          'id',
          'name',
          'desc',
          'os',
          'dhcp',
          'ip',
          'network',
          'mac'
        ]);
      });
  });

  describe('GET api/devices/:id', () => {

    it('responds with single JSON object', () => {
      return chai.request(app).get('/api/devices/1')
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
        });
    });

    it('should return tablet', () => {
      return chai.request(app).get('/api/devices/3')
        .then(res => {
          expect(res.body.device.name).to.equal('Tablet');
        });
    });

  });

  describe('POST api/devices', () => {

    it('responds with single JSON object', () => {

      let device = {
        desc: 'Linux VM',
        dhcp: false,
        id: 1,
        ip: '192.168.1.105',
        name: 'Docker',
        mac: '1F:2E:3D:4C:5B:6A',
        os: 'Linux',
      }

      return chai.request(app).post('/api/devices').send(device)
        .then(res => {
          expect(res.status).to.equal(201);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body.id).to.equal(5);
          expect(res.body.desc).to.equal(device.desc);
          expect(res.body.dhcp).to.equal(device.dhcp);
          expect(res.body.ip).to.equal(device.ip);
          expect(res.body.name).to.equal(device.name);
          expect(res.body.mac).to.equal(device.mac);
          expect(res.body.os).to.equal(device.os);
        });
    });

  });

});

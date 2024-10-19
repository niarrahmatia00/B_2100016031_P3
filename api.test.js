import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';

describe('API Testing', () => {
  // Pengujian GET (mengambil semua item)
  it('should return all items', (done) => {
    request(app)
      .get('/api/items')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.at.least(1);
        expect(res.status).to.equal(200);
        done();
      });
  });

  // Pengujian POST (membuat item baru)
  it('should create a new item', (done) => {
    const newItem = { name: 'Item 3' };

    request(app)
      .post('/api/items')
      .send(newItem)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('name', 'Item 3');
        done();
      });
  });

  // Pengujian DELETE (Latihan 1)
  it('should delete an item by id', (done) => {
    const itemId = 1; // ID item yang akan dihapus

    request(app)
      .delete(`/api/items/${itemId}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Item deleted successfully');
        done();
      });
  });

  // Pengujian PUT (Latihan 2)
  it('should update an item by id', (done) => {
    const itemId = 2; // ID item yang akan diperbarui
    const updatedData = { name: 'Updated Item' }; // Data baru

    request(app)
      .put(`/api/items/${itemId}`)
      .send(updatedData)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id', itemId);
        expect(res.body).to.have.property('name', 'Updated Item');
        done();
      });
  });
});

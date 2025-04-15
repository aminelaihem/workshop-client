const supertest = require('supertest');
const mongoose = require('mongoose');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { app, server } = require('../app'); 
const Product = require('../models/productModel');
const Accessory = require('../models/accessoryModel');
const connectDB = require('../services/connectDB');


describe('POST /products', () => {
    beforeAll(async () => { await connectDB(); });
    beforeEach(async () => { await Product.deleteMany({}); await Accessory.deleteMany({}) });
    afterAll(async () => { 
        await mongoose.disconnect(); 
        server.close();
    });

    it('should return 403 if the name is empty', async() => {
        const response = await supertest(app)
            .post('/products')
            .send({
                attributes: [{name: 'coque', option: 'bleue'}],
                price: 245,
            });

        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe("L'un des champs est vide !");
    });

    it('should return 403 if the attributes is empty', async() => {
        const response = await supertest(app)
            .post('/products')
            .send({
                name: 'Console',
                price: 245,
            });

        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe("L'un des champs est vide !");
    });

    it('should return 403 if the price is empty', async() => {
        const response = await supertest(app)
            .post('/products')
            .send({
                attributes: [{name: 'coque', option: 'bleue'}],
                name: 'Console',
            });

        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe("L'un des champs est vide !");
    });

    it('should return 403 if the product is already in the database', async() => {
        await Product.create({
            name: 'Console',
            price: 245,
            attributes: [ {name: 'coque', option: 'bleue'},]
        })
        const response = await supertest(app)
            .post('/products')
            .send({
                name: 'Console',
                price: 245,
                attributes: [ {name: 'coque', option: 'bleue'},]
            });

        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe("Le produit existe déjà !");
    });

    it('should return 403 if the accessory is not found in the database', async() => {
        const response = await supertest(app)
            .post('/products')
            .send({
                name: 'Console',
                price: 245,
                attributes: [ {name: 'coque', option: 'bleue'},]
            });

        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe("L'accessoire coque n'existe pas");
    });

    it('should return 403 if the options is not found for the accessory', async() => {
        await Accessory.create({
            name: 'Coque',
            options: ['bleu', 'vert'],
            price: 23
        });

        const response = await supertest(app)
            .post('/products')
            .send({
                name: 'Console',
                price: 245,
                attributes: [ {name: 'Coque', option: 'black'},]
            });

        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe("L'option black n'existe pas pour cet accessoire");
    });

    // it('should return 201 if the product is created succeffully', async() => {
    //     await Accessory.create({
    //         name: 'Coque',
    //         options: ['bleu', 'vert'],
    //         price: 23
    //     });

    //     const response = await supertest(app)
    //         .post('/products')
    //         .send({
    //             name: 'Console',
    //             price: 245,
    //             attributes: [ {name: 'Coque', option: 'vert'},]
    //         });

    //     expect(response.statusCode).toBe(201);
    //     expect(response.body.message).toBe("L'option black n'existe pas pour cet accessoire");
    // });
    
    
});

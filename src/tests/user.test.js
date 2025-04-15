const supertest = require('supertest');
const mongoose = require('mongoose');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { app, server } = require('../app'); 
const User = require('../models/userModel');
const connectDB = require('../services/connectDB');

//docker compose run node npm test

describe('Users controller', () => {
    beforeAll(async () => { await connectDB(); });
    
    afterAll(async () => { 
        await mongoose.disconnect(); 
        server.close();
    });

    describe('POST /users/login', () => {
        beforeEach(async () => { await User.deleteMany({}); });
    
        it('should return 404 if the user is not found', async () => {
            const response = await supertest(app)
                .post('/users/login')
                .send({
                    email: 'inconnu@gmail.com',
                    password: 'test',
                });
    
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toBe('Email ou password incorrect');
        });
    
        it('should return 401 if the password is not correct', async () => {
            const hashedPassword = await argon2.hash('test');
            await User.create({
                email: 'test@gmail.com',
                password: hashedPassword,
            });
    
            const response = await supertest(app)
                .post('/users/login')
                .send({
                    email: 'test@gmail.com',
                    password: 'motdepasseincorrect',
                });
    
            expect(response.statusCode).toBe(401);
            expect(response.body.message).toBe('Email ou password incorrect');
        });
    
        it('should return 201 if the user is logged', async () => {
            const hashedPassword = await argon2.hash('test');
            await User.create({
                email: 'test@gmail.com',
                password: hashedPassword,
            });
    
            const response = await supertest(app)
                .post('/users/login')
                .send({
                    email: 'test@gmail.com',
                    password: 'test',
                });
    
            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('token');
    
            const decodedToken = jwt.verify(response.body.token, process.env.JWT_KEY);
            expect(decodedToken.email).toBe('test@gmail.com');
        });
    
        it('should return 500 if error service', async () => {
            jest.spyOn(User, 'findOne').mockImplementationOnce(() => {
                throw new Error('Erreur serveur');
            });
    
            const response = await supertest(app)
                .post('/users/login')
                .send({
                    email: 'test@gmail.com',
                    password: 'motdepassecorrect',
                });
    
            expect(response.statusCode).toBe(500);
            expect(response.body.message).toBe('Une erreur s\'est produite lors du traitement');
        });
    });

    describe('POST /users/register', () => {
        it('should return 403 if the email is empty', async() => {
            const response = await supertest(app)
                .post('/users/register')
                .send({
                    password: 'test',
                });
    
            expect(response.statusCode).toBe(403);
            expect(response.body.message).toBe('Tous les champs sont requis.');
        });
        
        it('should return 403 if the password is empty', async() => {
            const response = await supertest(app)
                .post('/users/register')
                .send({
                    email: 'sarahotmane@gmail.com',
                });
    
            expect(response.statusCode).toBe(403);
            expect(response.body.message).toBe('Tous les champs sont requis.');
        });

        it('should return 403 if the email is not correct', async() => {
            const response = await supertest(app)
                .post('/users/register')
                .send({
                    email: 'sarahotmane',
                    password: 'test'
                });
    
            expect(response.statusCode).toBe(403);
            expect(response.body.message).toBe('Format d\'email invalide.');
        });

        // it('should return 409 if the email is already used', async() => {
        //     await User.create({
        //         email: 'sarah@gmail.com',
        //         password: 'motdepasse',
        //     });

        //     const response = await supertest(app)
        //         .post('/users/register')
        //         .send({
        //             email: 'sarah@gmail.com',
        //             password: 'motdepasse',
        //         });
    
        //     expect(response.statusCode).toBe(409);
        //     expect(response.body.message).toBe('Cet email existe déjà.');
        // });

        // it('should return 201 when creating a new user', async() => {
        //     const response = await supertest(app)
        //         .post('/users/register')
        //         .send({
        //             email: 'sarah@gmail.com',
        //             password: 'motdepasse',
        //         });
    
        //     expect(response.statusCode).toBe(201);
        //     expect(response.body.message).toBe('Utilisateur créé avec succès.');
        // });
    });
    
});


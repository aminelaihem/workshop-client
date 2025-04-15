const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/userModel');

const jwtMiddleware = require('../middelwares/jwtMiddleware');



/*
    loginAUser :

    Fonction qui permet à une personne de se connecter à son compte user

    Elle prend en entrée : Un email et un mot de passe ${email} , ${password}

    Les vérifications : 
        - Vérifier que l'utilisateur existe dans la base de donnée
        - Vérifier que le mot de passe fournis est le bon


    Reponses: 
        201 : connexion au compte user. 
            la fonction retourne le token user: ${token} 
        401 : Accès refusé : Mot de passe incorrect
        404 : Utilisateur non trouvé
        500 : Erreur lors du traitement de donnée
*/
exports.loginAUser = async(req, res) =>{
    try {
        const user = await User.findOne({email: req.body.email});

        if(!user){
            res.status(404).json({message: "Email ou password incorrect"});
            return;
        }else{
            const passwordMatch = await argon2.verify(user.password, req.body.password);

            if(user.email == req.body.email && passwordMatch){
                const userData = {
                    email: user.email
                }

                const token = await jwt.sign(userData, process.env.JWT_KEY, {expiresIn: '20h'});
                res.status(201).json({token});
            }else{
                res.status(401).json({message: 'Email ou password incorrect'});
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Une erreur s\'est produite lors du traitement'});
    }
}



exports.registerAUser = async(req, res) =>{
    try {
        const { email, password } = req.body;

        // Check for missing fields
        if (!email || !password) {
            return res.status(403).json({ message: 'Tous les champs sont requis.' });
        }

        // Check for valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(403).json({ message: 'Format d\'email invalide.' });
        }

        // Vérification de l'existence de l'email
        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(409).json({ message: 'Cet email existe déjà.' });
        }

        // Hachage du mot de passe
        const hashedPassword = await argon2.hash(password);

        // Création de l'utilisateur
        const newUser = new User({
            email: email,
            password: hashedPassword,
        });
        await newUser.save();

        res.status(201).json({ message: `Utilisateur créé avec succès.`});
    } 
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.' });
    }
};
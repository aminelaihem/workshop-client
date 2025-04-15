const Product = require('../models/productModel');
const Accessory = require('../models/accessoryModel');
require('dotenv').config();
const axios = require('axios');

exports.createAProduct = async(req, res) =>{
    try {
        const {name, attributes, price} = req.body;

        if(!name || !attributes || !price){
            res.status(403).json({message: "L'un des champs est vide !"});
            return;
        }

        const product = await Product.findOne({name: name});
        if(product){
            res.status(403).json({message: "Le produit existe déjà !"});
            return
        }


        // recup chaque attribut et verifier sil existe dans la bdd avec son option
        // for (const attribut of attributes) {
        //     const accessory = await Accessory.findOne({name: attribut.name});

        //     //vérifier que l accessoire existe
        //     if(!accessory){
        //         res.status(403).json({message: `L'accessoire ${attribut.name} n'existe pas`});
        //         return
        //     }

        //     //verifier que l option existe
        //     if (!accessory.options.includes(attribut.option)) {
        //         res.status(403).json({ message: `L'option ${attribut.option} n'existe pas pour cet accessoire` });
        //         return;
        //     }
        // }

        const newProduct = new Product({
            name,
            attributes,
            price
        });
        await newProduct.save();


        const description = attributes
            .map(attribute => {
                return Object.entries(attribute)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(', ');
                })
            .join(';');

        const formData = {
            name: name,
            regular_price: price.toString(),
            description: description,
            stock_quantity: 1,
            manage_stock: true,
        }

        console.log(formData);

        const response = await axios.post('https://api-retrometroid.devprod.fr/wp-json/wc/v3/products', formData, {
            auth: {
                username: process.env.API_KEY,
                password: process.env.API_SECRET
            }
        });
        console.log(response.data);
        res.status(201).json({ID : response.data.id});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Une erreur s\'est produite lors du traitement'});
    }
}
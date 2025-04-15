
const Accessory = require('../models/accessoryModel');


exports.createAnAccessory = async(req, res) =>{
    try {
        const {name, options, price, facultatif} = req.body;
        if(!name || !options || !price){
            res.status(403).json({message: "L'un des champs est vide !"});
            return
        }

        const accessory = await Accessory.findOne({name: name});
        if(accessory){
            res.status(403).json({message: "Vous avez déja créer cet accessoire !"});
            return;
        }

        const newAccessory = new Accessory({
            name,
            options,
            price,
            facultatif
        });
        
        await newAccessory.save();
        res.status(201).json({message: "Accessoire créé avec succès"});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Une erreur s\'est produite lors du traitement'});
    }
}


exports.getAllAccessory = async(req, res) =>{
    try {
        const accessories = await Accessory.find();
        if(accessories.length === 0){
            res.status(404).json({message: 'Auncun accessoire créé'});
            return;
        }
        res.status(200).json(accessories);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Une erreur s\'est produite lors du traitement'});
    }
}

exports.getAnAccessory = async(req, res) =>{
    try {
        const accessory = await Accessory.findOne( {name: req.params.name} );
        if(!accessory){
            res.status(404).json({message: 'Accessoire non trouvé'});
            return;
        }
        res.status(200).json(accessory);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Une erreur s\'est produite lors du traitement'});
    }
}
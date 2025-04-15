const Console = require('../models/consoleModel');


exports.createAConsole = async(req, res) =>{
    try {
        const {name, price} = req.body;
        if(!name || !price){
            res.status(403).json({message: "L'un des champs est vide !"});
            return
        }

        const console = await Console.findOne({name: name});
        if(console){
            res.status(403).json({message: "Vous avez déja créer cette console !"});
            return;
        }

        const newConsole = new Console({
            name,
            price
        });
        
        await newConsole.save();
        res.status(201).json({message: "Console créée avec succès"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Une erreur s\'est produite lors du traitement'});
    }
}
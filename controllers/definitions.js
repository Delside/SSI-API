const Definition = require('../models/definition');
const mongoose = require('mongoose');
exports.definitions_get_all = (req, res, next)=>{
    Definition.find()
    .then((docs) =>{
        res.status(200).json({
            wiadomosc: 'Lista wszystkich definicji',
            info: docs
        });
    })
    .catch(err => res.status(500).json({error: err})) ;  
};
exports.definitions_create = (req, res, next)=>{
    console.log(req.file);
    const definition = new Definition({
        _id: new mongoose.Types.ObjectId(),
        term: req.body.term,
        explication: req.body.explication,
        definition: req.body.definition,
        author: req.body.author
    })
    definition.save()
    .then((docs) =>{
        res.status(200).json({
            wiadomosc: 'Dodano nową definicję: ',
            info: definition
        });
    })
    .catch(err => res.status(500).json({error: err}));
    
};


exports.definitions_get = (req, res, next)=>{
    const id = req.params.definitionId;
    Definition.findById(id)
    .then(doc => {
        res.status(200).json({
            wiadomosc: 'Szczegóły definicji ',
            info: doc
        });
    })
    .catch(err => res.status(500).json({error: err}));    
};
exports.definitions_update = (req, res, next)=>{
    const id = req.params.definitionId;
    Definition.findByIdAndUpdate(id, { term: req.body.term, explication: req.body.explication, definition: req.body.definition, author: req.body.author}, 
        {new: true})
    .then(doc =>{
        res.status(200).json({
            wiadomosc: 'Zmiana definicji ',
            info: doc
        });
    })
    .catch(err => res.status(500).json({error: err}))  
};
exports.definitions_delete = (req, res, next)=>{
    const id = req.params.definitionId;
    Definition.findByIdAndDelete(id)
    .then(doc => {
        res.status(200).json({
            wiadomosc: 'Usunięcie definicji  ',
            info : doc
        });
    })
    .catch(err => res.status(500).json({error: err}))   
};
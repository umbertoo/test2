import express from 'express';
const router = express.Router();

import Note from '../models/Note';
import Label from '../models/Label';
import Color from '../models/Color';

//read all
router.get('/api/notes', (req, res)=> {
    const {offset, limit} = req.query;
    Note.findAll({
        offset: parseInt(offset) || null,
        limit: parseInt(limit) || null,
        order: [['createdAt', 'DESC']],
        include: [{model: Label, through: {attributes: []} }]
    })
    .then(notes=> res.json(notes)).catch(err=> console.log(err));
});
//read by label
router.get('/api/labels/:name/notes', (req, res)=> {
    const {offset, limit} = req.query;

    Label.findOne({where: {name: req.params.name}})
    .then(label =>
        label.getNotes({
            offset: parseInt(offset) || null,
            limit: parseInt(limit) || null,
            order: [['createdAt', 'DESC']],
            include: [{ model: Label, through: {attributes: []} }]
        })
    )
    .then(notes => {
        res.json(notes);
    }).catch(err=> console.log(err));

});

//read
router.get('/api/notes/:id', (req, res)=> {
    Note.findOne({
        where: {id: req.params.id},
        include: [{
            model: Label, through: {
                attributes: []
            }
        }]
    }).then(note=> res.json(note)).catch(err=> console.log(err));
});
//create
router.post('/api/notes/', (req, res)=> {
    Note.create({text: req.body.text, title: req.body.title, colorId:req.body.colorId})

    .then(note=> {
        if(req.body.labels!== undefined){
            note.setLabels(req.body.labels).then(()=> res.json(note));
        }

    },err=>res.status(500).json(err));
});
//update
router.put('/api/notes/:id', (req, res)=> {

    var body = {
        color: req.body.color,
        title: req.body.title,
        colorId:req.body.colorId
    };
    if (req.body.text) body.text= req.body.text;


    Note.update(body, {where: {id: req.params.id}, include: [Label]})
    .then(num  => Note.findOne({where: {id: req.params.id}, include: [Label]}))
    .then(note => {
        if (req.body.labels !== undefined) {
            note.setLabels(req.body.labels).then(()=> res.json(note));
        } else {
            res.json(note);
        }
    })
    .catch(err=>res.status(500).json(err));

});
//delete
router.delete('/api/notes/:id', (req, res)=> {
    Note.destroy({where: {id: req.params.id}})
    .then(note=> res.json(note));
});
//find
router.get('/api/notes/search/:text', (req, res)=> {
    var text = req.params.text;
    Note.findAndCountAll({where: {text: text}})
    .then(note=> res.json(note));
});


//read all
router.get('/api/labels', (req, res)=> {
    Label.findAll({order: [['name']],}).then(labels=> res.json(labels));
});

//read
router.get('/api/labels/:id', (req, res)=> {
    Label.findById(req.params.id).then(label=> res.json(label)).catch(err=> console.log(err));
});
//create
router.post('/api/labels/', (req, res)=> {
    Label.create({name: req.body.name}).then(label=> res.json(label));
});
//update
router.put('/api/labels/:id', (req, res)=> {
    Label.update({
        name: req.body.name
    }, {where: {id: req.params.id}}).then(label=> res.json(label));
});
//delete
router.delete('/api/labels/:id', (req, res)=> {
    Label.destroy({where: {id: req.params.id}}).then(label=> res.json(label));
});
//find
router.get('/api/labels/search/:name', (req, res)=> {
    var name = req.params.name;
    Label.findAndCountAll({where: {name: name}}).then(label=> res.json(label));
});




//read all
router.get('/api/colors', (req, res)=> {
    Color.findAll().then(colors=> res.json(colors));
});



export default router;

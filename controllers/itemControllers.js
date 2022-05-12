const Item = require('../models/Item');

module.exports.get_items = (req, res) => {
    Item.find().sort({date: -1}).then(items => res.json(items));
}

module.exports.post_item = (req, res) => {
    const newItem = new Item(req.body);
    newItem.save()
    .then(item => res.json(item))
    .catch(err => res.status(400).send(err));
}

module.exports.update_item = (req, res) => {
    Item.findByIdAndUpdate({_id: req.params.id}, req.body, { runValidators: true })
    .then((item) => {
        if(!item) return res.status(404).json({msg: 'No item found for given id'});

        Item.findOne({_id: req.params.id})
        .then(item => res.json(item))
        .catch(err => res.status(400).send(err));
    })
    .catch(err => res.status(400).send(err));
}

module.exports.delete_item = (req, res) => {
    Item.findByIdAndDelete({_id: req.params.id})
    .then(item => {
        if(!item) return res.status(404).send({msg: 'No record found for given id'});
        res.json({success: item, msg: 'Item deleted'});
    });
}
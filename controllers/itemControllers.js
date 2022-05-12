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
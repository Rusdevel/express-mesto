const Card = require('../models/card');

const getCards = (req, res) => Card.find({})
  .then((cards) => {
    res.status(200).send(cards);
  })
  .catch((err) => {
    console.log(err);
  });

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  return Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      console.log(err);
    });
};

const deleteCard = (req, res) => Card.findByIdAndRemove({ owner: req.user._id, _id: req.params.id })
  .then((card) => {
    if (!card) {
      return res.status(404).send({ message: 'Карточка c данныйм id не найдена' });
    }
    return res.status(200).send('Карточка удалена');
  })
  .catch((err) => {
    console.log(err);
  });

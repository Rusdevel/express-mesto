const Card = require('../models/card');
// показать все карточки
const getCards = (req, res) => Card.find({})
  .then((cards) => {
    res.status(200).send(cards);
  })
  .catch((err) => {
    res.status(500).send({ message: `Ошибка ${err.message}` });
  });

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  return Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные для создания карточки',
        });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const deleteCard = (req, res) => Card.findByIdAndRemove(req.params.cardId)
  .then((card) => {
    if (!card) {
      return res.status(404).send({ message: 'Карточка c данныйм id не найдена' });
    }
    return res.status(200).send('Карточка удалена');
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({
        message: 'Переданы некорректные данные для удалении карточки',
      });
    } else {
      res.status(500).send({ message: err.message });
    }
  });

// обновление лайков
const likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((card) => {
      res.status(200).send(card);
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданны некоректные данные для постановки лайка' });
      } if (err.message === 'NotFound') {
        res.status(404).send({ message: 'карточка с указанным id не найдена' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};
//  удаление лайка
const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((card) => {
      res.status(200).send(card);
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданны некоректные данные для снятия лайка' });
      }
      if (err.message === 'NotFound') {
        res.status(404).send({ message: 'карточка с указанным id не найдена' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};

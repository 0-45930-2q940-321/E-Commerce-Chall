const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{
        model: ProductTag,
        attributes: ['product_id'],
        include: {
          model: Product,
          attributes: ['product_name']
        }
      }]
  })
  .then(productData => res.json(productData))
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: ProductTag,
        attributes: ['product_id'],
        include: {
          model: Product,
          attributes: ['product_name']
        }
    }]
  })
  .then(productData => res.json(productData))
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(productData => res.status(200).json(productData))
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(productData => res.json(productData))
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(productData => res.json(productData))
});

module.exports = router;

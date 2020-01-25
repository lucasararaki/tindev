const express = require('express');
const multer = require('multer');
// const uploadConfig = require('./config/upload');

const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

const routes = express.Router();
// const upload = multer(uploadConfig);

routes.get('/health', (req, res) => {
  res.json({
    message: 'Ok boss',
    data: null
  });
});

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);

// routes.post('/posts/:id/like', LikeController.store)

module.exports = routes;
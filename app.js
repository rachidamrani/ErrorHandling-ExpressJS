// Simplify your code by using an error handling middleware
const express = require('express');
const app = express();
const handleErrors = require('./middlewares/handleErrors');
const { BadRequest } = require('./utils/errors');
const port = 3000;

app.use(express.json());

app.post('/', async (req, res, next) => {
  const { title, author } = req.body;

  try {
    if (!title || !author) {
      throw new BadRequest('Missing required field: title or author');
    }

    const post = await db.post.insert({ title, author });
    res.json(post);
  } catch (error) {
    next(error);
  }
});

app.use(handleErrors);

app.listen(port, () => console.log(`Server running on ${port}`));

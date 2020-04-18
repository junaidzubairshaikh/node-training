function booksController(Book) {
  function post(req, res) {
    if (!req.body.title) {
      res.status(400);
      return res.send('Title is required');
    }
    const book = new Book(req.body);
    book.save();
    res.status(201);
    return res.json(book);
  }
  function get(req, res) {
    Book.find((err, data) => {
      if (err) {
        return res.send(err)
      }
      // console.log('REQ>>>>>>>>>>>>>>>>>>>>>>>>>>', req);

      const books = data.map((book) => {
        const newBook = book.toJSON();
        newBook.links = {};
        newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`
        return newBook;
      })
      return res.json(books);
    })
  }

  function getById(req, res) {
    const newBook = req.book.toJSON();
    newBook.links = {};
    newBook.links.self = `http://${req.header.header}/api/books/${req.book._id}`
    return res.json(newBook);
  }

  function update(req, res) {
    const { book } = req;
    book.title = req.body.title;
    book.author = req.body.author;
    book.genre = req.body.genre;
    bookread = req.body.read;
    book.save();
    return res.json(book);
  }

  function patchUpdate(req, res) {
    const { book } = req;
    if (req.body._id) {
      delete req.body._id;
    }
    Object.entries(req.body).forEach((item) => {
      const key = item[0];
      const value = item[1];

      book[key] = value;
    });
    req.book.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json(book);
    })
  }

  function remove(req, res) {
    req.book.remove((err) => {
      if (err) {
        return res.send(err);
      }
      return res.sendStatus(204);
    })
  }

  return {
    post,
    get,
    getById,
    update,
    patchUpdate,
    remove
  }
}

module.exports = booksController;
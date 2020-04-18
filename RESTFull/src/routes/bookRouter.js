const express = require('express');
const booksController = require('../controllers/booksController');
function routes(Book) {
    const router = express.Router();
    const controller = booksController(Book);
    router.route('/books')
        .post(controller.post)
        .get(controller.get);

    router.use('/books/:bookid', (req, res, next) => {
        Book.findById(req.params.bookid, (err, book) => {
            if (err) {
                return res.send('Not Found');
            }
            if (book) {
                req.book = book;
                return next();
            }
            return res.sendStatus(404);
        });
    })

    router.route('/books/:bookid')
        .get(controller.getById)
        .put(controller.update)
        .patch(controller.patchUpdate)
        .delete(controller.remove);

    return router;
}

module.exports = routes;
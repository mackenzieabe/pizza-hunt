const router = require('express').Router();
const {
    addComment,
    removeComment,
    addReply,
    removeReply
  } = require('../../controllers/comment-controller');

// /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

router
  .route('/:pizzaId/:commentId')
  .put(addReply)
  .delete(removeComment)

// /api/comments/<pizzaId>/<commentId>/<replyId>
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);
//Again, we're trying to model the routes in a RESTful manner, so as a best practice we should include the ids of the parent resources in the endpoint. It's kind of like saying, "Go to this pizza, then look at this particular comment, then delete this one reply."

module.exports = router;
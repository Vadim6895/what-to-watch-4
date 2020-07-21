
const parseReview = (reviewRAW) => ({
  text: reviewRAW.comment,
  date: new Date(reviewRAW.date),
  id: reviewRAW.id,
  rating: reviewRAW.rating,
  name: {
    id: reviewRAW.user.id,
    name: reviewRAW.user.name,
  }
});

const parseReviews = (reviewsRAW) => {
  return reviewsRAW.map(parseReview);
};

export {parseReviews};

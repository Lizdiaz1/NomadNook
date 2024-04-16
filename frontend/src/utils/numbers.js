export const calculateAverageRating = (reviews) => {
    const totalStars = reviews.reduce((acc, review) => acc + review.stars, 0);
    return (totalStars / reviews.length).toFixed(2);
  };

  export const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

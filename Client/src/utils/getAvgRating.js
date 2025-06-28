export default function getAvgRating(ratingArr) {
  if (!ratingArr || ratingArr.length === 0) return 0;

  const total = ratingArr.reduce((acc, curr) => acc + curr.rating, 0);
  const average = total / ratingArr.length;

  return average.toFixed(1);
}

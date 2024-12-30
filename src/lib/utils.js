export function formatDate(date) {
  return new Date(date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function generateImageUrl(id) {
  return `https://tomorinengineeroffice.com/data/${id}.png`;
}

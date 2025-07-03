export function formatDate(input) {
  const date = new Date(input);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function randomHash() {
  const randomHex = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');

  return randomHex;
}

export function generateRandomPageId() {
  return Math.floor(1000 + Math.random() * 9000); // 4-digit number
}

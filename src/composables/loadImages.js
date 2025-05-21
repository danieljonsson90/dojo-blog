export function loadImages() {
  const req = require.context(
    '@/assets/images',
    false,
    /\.(png|jpe?g||JPE?G|svg)$/
  );
  return req.keys().map(req);
}

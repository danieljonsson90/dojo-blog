export function loadImages() {
  const images = import.meta.glob('@/assets/images/*.(png|jpe?g||JPE?G|svg)', {
    eager: true,
  });
  return images;
}

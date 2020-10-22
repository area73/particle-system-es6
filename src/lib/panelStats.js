import Stats from './stats';
const stats = Stats();
// eslint-disable-next-line functional/immutable-data
stats.dom.style.left = '80px';
document.body.appendChild(stats.dom);
function animate() {
  stats.update();
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

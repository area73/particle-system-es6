import Stats from "./stats.js";
let stats = Stats();
stats.dom.style.left = '80px';
document.body.appendChild(stats.dom);
function animate() {
  stats.update();
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

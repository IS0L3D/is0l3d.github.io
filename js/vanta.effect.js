document.addEventListener('DOMContentLoaded', function () {
  const fx = VANTA.GLOBE({
    el: "#vanta-globe",
    mouseControls: false,
    touchControls: false,
    gyroControls: false,
    minHeight: 200,
    minWidth: 200,
    scale: 1.0,
    scaleMobile: 1.0,
    xOffset: 0.0,
    yOffset: 0.0,
    size: 1.2,
    color: 0x0077ff,
    color2: 0xff7700,
    backgroundColor: 0x000000
  });

  if (fx.linesMesh3) fx.cont2.remove(fx.linesMesh3);

  const origUpdate = fx.onUpdate.bind(fx);
  fx.onUpdate = function () {
    origUpdate();
    if (this.sphere && this.sphere.material) {
      this.sphere.material.color.setHex(0xffffff);
    }
  };
});

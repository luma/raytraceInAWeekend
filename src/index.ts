import Viewport from "./Viewport";

let viewport: Viewport;

function setup() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas) {
    throw new Error('Please add a canvas element to the body with an id of "canvas"');
  }
  viewport = Viewport.create(canvas, 640, 480);

  const renderBtn = document.getElementById("renderBtn");
  if (!renderBtn) {
    throw new Error('Please add a render button element to the body with an id of "renderBtn"');
  }

  renderBtn.addEventListener("click", render);
}

function render() {
  const nx = viewport.width;
  const ny = viewport.height;
  const id = viewport.imageData;
  let index = 0;

  for (let j = ny - 1; j >= 0; j--) {
    for (let i = 0; i < nx; i++) {
      const r = i / nx;
      const g = j / ny;
      const b = 0.2;
      const ir = Math.trunc(255.99 * r);
      const ig = Math.trunc(255.99 * g);
      const ib = Math.trunc(255.99 * b);

      id.data[index    ] = ir;
      id.data[index + 1] = ig;
      id.data[index + 2] = ib;
      index += 4;
    }
  }

  viewport.imageData = id;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setup);
} else {
  setup();
}

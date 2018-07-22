
const devicePixelRatio =
typeof window !== "undefined" && window.devicePixelRatio
  ? window.devicePixelRatio : 1;

/**
 * Viewport is a simple abstraction over a Canvas element that
 * makes access to the pixel data slightly easier.
 *
 * As with Canvas elements themselves, you should get the
 * Viewport's imageData and update the pixels inside the `data`
 * property, then push the pixel data back into the Viewport.
 *
 * It is way more efficient to batch multiple pixel changes
 * into a single imageData update rather than performing
 * a single update to imageData.data and then pushing the
 * result into canvas for each pixel.
 *
 * @example
 * Construct a Viewport and write a single red pixel into it.
 *
 * ```
 * const viewport = Viewport.create(canvasElem, 640, 480);
 * const imageData = viewport.imageData;
 * console.log(`Image data dimensions. Width: ` +
 *  `${imageData.width} Height: ${imageData.height}`);
 *
 * const x = 100;
 * const y = 50;
 *
 * // Write a red pixel to X,Y
 * const i = y * (imageData.width * 4) + x * 4;
 * imageData.data[i  ] = 255        // red
 * imageData.data[i+1] = 0          // green
 * imageData.data[i+2] = 0          // blue
 * imageData.data[i+3] = 255        // alpha
 *
 * // update the viewport's imageData, cause
 * viewport.imageData = imageData;
 * ```
 */
export default class Viewport {

  get width(): number {
    return parseInt(this.canvas.style.width || "", 10);
  }

  get height(): number {
    return parseInt(this.canvas.style.height || "", 10);
  }
  /**
   * Constructs a Surface.
   *
   * @example
   * Construct a Viewport of a particular size using an existing Canvas element
   *
   * ```
   * const viewport = Viewport.create(canvasElem, 640, 480);
   * ```
   *
   * @param {DomElement} [parentNode=document.body] The parent node to attach the new canvas element to
   * @param {Number}     width                      The desired canvas width
   * @param {Number}     height                     The desired canvas height
   * @param {Number} [pixelRatio=devicePixelRatio]  The pixel ratio to use. This defaults,
   *                                                and usually the default will be fine.
   * @returns {Surface}                             The newly created Surface
   */
  public static create(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    pixelRatio: number = devicePixelRatio,
  ) {
    return new Viewport(canvas, width, height, pixelRatio);
  }

  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;

  constructor(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    pixelRatio: number = devicePixelRatio,
  ) {
    if (!canvas) {
      throw new Error("You must provide a valid Canvas to the Viewport");
    }

    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Could not get a valid 2d context for the canvas");
    }

    this.ctx = ctx;
    this.setSize(width, height, pixelRatio);
    this.fill("white");
  }

  /**
   * Clears the surface.
   */
  public clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Fills the entire surface with a specific style.
   *
   * Options for the fillStyle are:
   * * **color:** A DOMString parsed as CSS <color> value.
   * * **gradient:** A CanvasGradient object (a linear or radial gradient).
   * * **pattern:** A CanvasPattern object (a repetitive image).
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle for more info
   *
   */
  public fill(fillStyle: string | CanvasGradient | CanvasPattern) {
    this.ctx.fillStyle = fillStyle;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Retrieves the raw image data from the underlying canvas context.
   *
   * The return type is documented at https://developer.mozilla.org/en-US/docs/Web/API/ImageData.
   *
   * @example Retrieve the raw image data for the underlying Canvas
   *
   * ```
   * const imageData = viewport.imageData;
   * console.log(`Image data dimensions. Width: ` +
   *  `${imageData.width} Height: ${imageData.height}`);
   *
   * const x = 100;
   * const y = 50;
   *
   * // Write a red pixel to X,Y
   * const i = y * (imageData.width * 4) + x * 4;
   * imageData.data[i  ] = 255        // red
   * imageData.data[i+1] = 0          // green
   * imageData.data[i+2] = 0          // blue
   * imageData.data[i+3] = 255        // alpha
   *
   * // update the viewport's imageData, cause
   * viewport.imageData = imageData;
   * ```
   *
   * @returns {ImageData} The raw image data.
   */
  public get imageData(): ImageData {
    return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Overwrites the existing image data, doing this will cause the image data to
   * be rendered in the canvas.
   *
   * Set the `imageData` getter for a full example.
   *
   * @param {ImageData} imageData The imageData to write into the underlying canvas.
   *
   */
  public set imageData(imageData: ImageData) {
    this.ctx.putImageData(imageData, 0, 0);
  }

  /**
   * Resize a canvas and canvas context.
   *
   * @param {number}                    width       The desired canvas width
   * @param {number}                    height      The desired canvas height
   * @param {number}                    pixelRatio  The device pixel ratio
   * @private
   */
  private setSize(width: number, height: number, pixelRatio: number) {
    // Our canvas display size is just width and height, but our canvas backing store
    // is the same multiplied by the pixelRatio so we can support Retina and other
    // high DPI displays.
    this.canvas.style.width = width + "px";
    this.canvas.style.height = height + "px";
    this.canvas.width = width * pixelRatio;
    this.canvas.height = height * pixelRatio;

    // Adjust our transform to account for our upscaled canvas
    this.ctx.scale(pixelRatio, pixelRatio);
  }
}

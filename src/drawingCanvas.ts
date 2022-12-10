export class drawLine {
  #ctx: CanvasRenderingContext2D
  #thickness: number = 2
  #drawing: boolean = false
  #canvasData: ImageData | null = null
  constructor(ctx: CanvasRenderingContext2D, thickness?: number) {
    this.#ctx = ctx
    this.#thickness = thickness || this.#thickness
  }
  setDrawing(drawing: boolean) {
    this.#drawing = drawing
    if (!drawing) {
      this.#ctx.closePath()
    }
  }
  getDrawing() {
    return this.#drawing
  }
  setThickness(thickness: number) {
    this.#thickness = thickness
  }
  getThickness() {
    return this.#thickness
  }
  setCanvasData(data: ImageData) {
    this.#canvasData = data
  }
  getCanvasData() {
    return this.#canvasData
  }
  drawLine(x: number, y: number, color: string = 'black') {
    this.#ctx.lineWidth = this.#thickness
    this.#ctx.strokeStyle = color
    this.#ctx.lineCap = 'round'
    this.#ctx.lineJoin = 'round'
    this.#ctx.lineTo(x, y)
    this.#ctx.stroke()
  }
  startDrawing(x: number, y: number) {
    this.#drawing = true
    this.#ctx.beginPath()
    this.#ctx.moveTo(x, y)
  }
}

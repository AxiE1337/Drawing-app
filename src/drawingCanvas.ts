export class Draw {
  #ctx: CanvasRenderingContext2D
  #thickness: number = 2
  #isDrawing: boolean = false
  #canvasData: ImageData[] = []
  #color: string = 'black'
  constructor(ctx: CanvasRenderingContext2D, thickness?: number) {
    this.#ctx = ctx
    this.#thickness = thickness || this.#thickness
  }
  setIsDrawing(drawing: boolean) {
    this.#isDrawing = drawing
    if (!drawing) {
      this.#ctx.closePath()
    }
  }
  getIsDrawing() {
    return this.#isDrawing
  }
  setThickness(thickness: number) {
    this.#thickness = thickness
  }
  getThickness() {
    return this.#thickness
  }
  setCanvasData(data: ImageData) {
    this.#canvasData?.push(data)
  }
  getCanvasData(index?: number) {
    if (index === -1) {
      if (this.#canvasData.length > 1) {
        this.#canvasData.length -= 1
      }
    }
    return this.#canvasData.at(-1)
  }
  drawLine(x: number, y: number) {
    this.#ctx.lineWidth = this.#thickness
    this.#ctx.strokeStyle = this.#color
    this.#ctx.lineCap = 'round'
    this.#ctx.lineJoin = 'round'
    this.#ctx.lineTo(x, y)
    this.#ctx.stroke()
  }
  startDrawing(x: number, y: number) {
    this.#isDrawing = true
    this.#ctx.beginPath()
    this.#ctx.moveTo(x, y)
    this.drawLine(x, y)
  }
}

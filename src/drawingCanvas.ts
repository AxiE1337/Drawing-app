export class Draw {
  #ctx: CanvasRenderingContext2D
  #thickness: number = 2
  #isDrawing: boolean = false
  #canvasData: ImageData[] = []
  #color: string = 'black'
  constructor(ctx: CanvasRenderingContext2D) {
    this.#ctx = ctx
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
  setColor(color: string) {
    this.#color = color
  }
  setCanvasData(data: ImageData) {
    this.#canvasData?.push(data)
  }
  getCanvasData(index?: number) {
    if (index === -1) {
      this.#canvasData.pop()
    }
    return this.#canvasData.at(-1)
  }
  #eraser(eraser: string) {
    if (eraser === 'on') {
      return (this.#ctx.globalCompositeOperation = 'destination-out')
    } else {
      return (this.#ctx.globalCompositeOperation = 'source-over')
    }
  }
  drawLine(x: number, y: number, eraser: string) {
    this.#ctx.lineWidth = this.#thickness
    this.#ctx.strokeStyle = this.#color
    this.#ctx.lineCap = 'round'
    this.#ctx.lineJoin = 'round'
    this.#ctx.lineTo(x, y)
    this.#ctx.stroke()
    this.#eraser(eraser)
  }
  startDrawing(x: number, y: number, eraser: string) {
    this.#isDrawing = true
    this.#eraser(eraser)
    this.#ctx.beginPath()
    this.drawLine(x, y, eraser)
  }
}

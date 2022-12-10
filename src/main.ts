import './styles/index.scss'
import { drawLine } from './drawingCanvas'
const inputRange = document.querySelector('#thicknessRange') as HTMLInputElement

let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let line: drawLine

window.onload = () => {
  canvas = document.querySelector('#canvas') as HTMLCanvasElement
  ctx = canvas.getContext('2d', {
    willReadFrequently: true,
  }) as CanvasRenderingContext2D

  canvas.height = window.innerHeight - 100
  canvas.width = window.innerWidth - 100

  line = new drawLine(ctx)

  canvas.addEventListener('mousedown', (e) => {
    line.startDrawing(
      e.clientX - canvas.offsetLeft,
      e.clientY - canvas.offsetTop
    )
  })
  canvas.addEventListener('mousemove', (e) => {
    if (!line.getDrawing()) {
      return
    }
    line.drawLine(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
  })
  canvas.addEventListener('mouseup', () => {
    line.setDrawing(false)
    line.setCanvasData(ctx.getImageData(0, 0, canvas.width, canvas.height))
  })

  inputRange.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement
    line.setThickness(+target.value)
  })
}

window.addEventListener('resize', () => {
  canvas.height = window.innerHeight - 100
  canvas.width = window.innerWidth - 100
  if (line.getCanvasData()) {
    ctx.putImageData(line.getCanvasData() as ImageData, 0, 0)
  }
})

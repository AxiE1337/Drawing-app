import './styles/index.scss'
import { Draw } from './drawingCanvas'
const inputRange = document.querySelector('#thicknessRange') as HTMLInputElement

let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let draw: Draw

window.onload = () => {
  canvas = document.querySelector('#canvas') as HTMLCanvasElement
  ctx = canvas.getContext('2d', {
    willReadFrequently: true,
  }) as CanvasRenderingContext2D

  canvas.height = window.innerHeight - 100
  canvas.width = window.innerWidth - 100

  draw = new Draw(ctx)

  canvas.addEventListener('mousedown', (e) => {
    draw.startDrawing(
      e.clientX - canvas.offsetLeft,
      e.clientY - canvas.offsetTop
    )
  })
  canvas.addEventListener('mousemove', (e) => {
    if (!draw.getIsDrawing()) {
      return
    }
    draw.drawLine(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
  })
  canvas.addEventListener('mouseup', () => {
    draw.setIsDrawing(false)
    draw.setCanvasData(ctx.getImageData(0, 0, canvas.width, canvas.height))
  })

  inputRange.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement
    draw.setThickness(+target.value)
  })

  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'z') {
      ctx.putImageData(draw.getCanvasData(-1) as ImageData, 0, 0)
    }
  })
}

window.addEventListener('resize', () => {
  canvas.height = window.innerHeight - 100
  canvas.width = window.innerWidth - 100
  if (draw.getCanvasData()) {
    ctx.putImageData(draw.getCanvasData() as ImageData, 0, 0)
  }
})

import './styles/index.scss'
import { Draw } from './drawingCanvas'
const inputRange = document.querySelector('#thicknessRange') as HTMLInputElement
const colorInput = document.querySelector('#colorInput') as HTMLInputElement
const bgColorInput = document.querySelector('#bgColorInput') as HTMLInputElement
const eraser = document.querySelector('#eraser') as HTMLInputElement
const undoBtn = document.querySelector('#undoBtn') as HTMLButtonElement

let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let draw: Draw

window.onload = () => {
  canvas = document.querySelector('#canvas') as HTMLCanvasElement
  ctx = canvas.getContext('2d', {
    willReadFrequently: true,
  }) as CanvasRenderingContext2D

  canvas.height = window.innerHeight - 50
  canvas.width = window.innerWidth

  draw = new Draw(ctx)

  canvas.addEventListener('mousedown', (e) => {
    return draw.startDrawing(
      e.clientX - canvas.offsetLeft,
      e.clientY - canvas.offsetTop,
      eraser.value
    )
  })

  canvas.addEventListener('mousemove', (e) => {
    if (!draw.getIsDrawing()) {
      return
    }
    return draw.drawLine(
      e.clientX - canvas.offsetLeft,
      e.clientY - canvas.offsetTop,
      eraser.value
    )
  })

  canvas.addEventListener('mouseup', () => {
    draw.setIsDrawing(false)
    draw.setCanvasData(ctx.getImageData(0, 0, canvas.width, canvas.height))
  })

  eraser.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement
    if (target.value === 'off') {
      target.value = 'on'
    } else {
      target.value = 'off'
    }
  })

  inputRange.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement
    draw.setThickness(+target.value)
  })

  colorInput.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement
    draw.setColor(target.value)
  })

  bgColorInput.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement
    canvas.style.backgroundColor = target.value
  })

  const undoHandler = () => {
    const imgData = draw.getCanvasData(-1) as ImageData
    if (!imgData) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      return ctx.putImageData(
        ctx.getImageData(0, 0, canvas.width, canvas.height),
        0,
        0
      )
    }
    ctx.putImageData(imgData, 0, 0)
  }

  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'z') {
      undoHandler()
    }
  })

  undoBtn.addEventListener('click', () => {
    undoHandler()
  })
}

window.addEventListener('resize', () => {
  canvas.height = window.innerHeight - 100
  canvas.width = window.innerWidth
  const imgData = draw.getCanvasData() as ImageData
  if (imgData) {
    ctx.putImageData(imgData, 0, 0)
  }
})

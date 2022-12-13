import './styles/index.scss'
import { Draw } from './drawingCanvas'
import { setData, getData, deleteData } from './storage'
const inputRange = document.querySelector('#thicknessRange') as HTMLInputElement
const colorInput = document.querySelector('#colorInput') as HTMLInputElement
const bgColorInput = document.querySelector('#bgColorInput') as HTMLInputElement
const eraser = document.querySelector('#eraser') as HTMLInputElement
const undoBtn = document.querySelector('#undoBtn') as HTMLButtonElement
const clearBtn = document.querySelector('#clearBtn') as HTMLButtonElement
const downloadBtn = document.querySelector('#downloadBtn') as HTMLButtonElement

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

  const storageImg = new Image()
  storageImg.src = getData('canvas') as string
  storageImg.onload = () => {
    ctx.drawImage(storageImg, 0, 0)
  }

  const storageThickness = getData('thickness') || '2'
  const storageColor = getData('color') || '#222222'
  const storageBgColor = getData('bgColor') || '#FFFFFF'

  draw = new Draw(ctx, storageThickness, storageColor)

  inputRange.value = storageThickness
  colorInput.value = storageColor
  bgColorInput.value = storageBgColor
  canvas.style.backgroundColor = storageBgColor

  const startDrawing = (e: MouseEvent) => {
    return draw.startDrawing(
      e.clientX - canvas.offsetLeft,
      e.clientY - canvas.offsetTop,
      eraser.value
    )
  }

  const drawing = (e: MouseEvent) => {
    if (!draw.getIsDrawing()) {
      return
    }
    return draw.drawLine(
      e.clientX - canvas.offsetLeft,
      e.clientY - canvas.offsetTop,
      eraser.value
    )
  }

  const endDrawing = () => {
    draw.setIsDrawing(false)
    draw.setCanvasData(ctx.getImageData(0, 0, canvas.width, canvas.height))
    setData('canvas', canvas.toDataURL())
  }

  canvas.addEventListener('mousedown', startDrawing)
  canvas.addEventListener('mousemove', drawing)
  canvas.addEventListener('mouseup', endDrawing)

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
    draw.setThickness(target.value)
    setData('thickness', target.value)
  })

  colorInput.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement
    draw.setColor(target.value)
    setData('color', target.value)
  })

  bgColorInput.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement
    canvas.style.backgroundColor = target.value
    setData('bgColor', target.value)
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
    setData('canvas', canvas.toDataURL())
  }

  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'z') {
      undoHandler()
    }
  })

  undoBtn.addEventListener('click', () => {
    undoHandler()
  })

  clearBtn.addEventListener('click', () => {
    deleteData('canvas')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  })

  downloadBtn.addEventListener('click', () => {
    const imgData = canvas.toDataURL()
    const a = document.createElement('a') as HTMLAnchorElement
    document.body.appendChild(a)
    a.href = imgData
    a.download = 'canvas.png'
    a.click()
    document.body.removeChild(a)
  })
}

window.addEventListener('resize', () => {
  canvas.height = window.innerHeight - 50
  canvas.width = window.innerWidth
  const imgData = draw.getCanvasData() as ImageData
  if (imgData) {
    ctx.putImageData(imgData, 0, 0)
  }
})

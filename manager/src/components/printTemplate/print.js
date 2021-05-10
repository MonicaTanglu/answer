import html2canvas from 'html2canvas'
import printJS from 'print-js'
function dataURLToBlob(dataurl) {
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}
export default {
  getImage: (divDomId, cb) => {
    let canvasID = document.getElementById(divDomId)
    canvasID.style.width = '800px'
    html2canvas(canvasID).then((canvas) => {
      canvasID.style.width = '100%'
      let dom = document.body.appendChild(canvas)
      dom.style.display = 'none'
      document.body.removeChild(dom)
      let blob = dataURLToBlob(dom.toDataURL('image/png'))
      cb(URL.createObjectURL(blob))
    })
  }
}

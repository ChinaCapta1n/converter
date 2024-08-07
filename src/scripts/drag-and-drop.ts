const oInput = document.querySelector<HTMLInputElement>("#input-selector");
const oPreview = document.querySelector<HTMLDivElement>('#preview > ul');

const init = () => {
  bindEvent();
}

const IMAGE_TYPES = {
  'image/jpeg': 'image/jpeg',
  'image/png': 'image/png',
  'image/webp': 'image/webp'
}
let imageFile: any;
let quality: number = 0.4;
let originalImageLength: string = '';
let percent: string = '';


function bindEvent() {
  oInput!.addEventListener('dragenter', onDragenter);
  oInput!.addEventListener('dragleave', onDragleave);
  oInput!.addEventListener('change', onChange);
}

function onDragenter(e: DragEvent) {
  e.preventDefault();
  (e.target as HTMLElement).classList.add('dragenter');
}

function onDragleave(e: DragEvent) {
  (e.target as HTMLElement).classList.remove('dragenter');
}

function onChange(e: Event) {
  const target = e.target as HTMLInputElement;
  imageFile = target.files;
  const { type } = imageFile[0];

  if (!Object.values(IMAGE_TYPES).includes(type)) {
    alert('请选择正确格式图片');
    return;
  }

  toDataUrl(imageFile[0], type);
}

function toDataUrl(fileTarget: File, type: string) {
  const reader = new FileReader();

  reader.onload = (e) => {
    const image = new Image();
    const result: string = e.target?.result as string;
    image.src = result;
    image.onload = () => {
      originalImageLength = result;
      toCanvas(image, type);
    }
  }

  reader.readAsDataURL(fileTarget);
}

function toCanvas(image: HTMLImageElement, type: string) {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.drawImage(image, 0, 0, image.width, image.height);

  doComperss(canvas, type, image.width, image.height);
}

function doComperss(canvas: HTMLCanvasElement, type: string, width: number, height: number) {
  const compressedImage = canvas.toDataURL(type, quality);
  const image = new Image();
  image.width = width;
  image.height = height;
  image.src = compressedImage;

  calculateSize(compressedImage);

  image.onload = () => {
    insertIntoHtml(image, compressedImage)
  }
}

function calculateSize(compressedImage: string) {
  percent = (compressedImage.length / originalImageLength.length * 100).toFixed(2) + '%';
}

function insertIntoHtml(image: HTMLImageElement, compressedImage: string) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  const p = document.createElement('p');
  p.innerText = '已压缩 ' + percent;
  a.href = compressedImage;
  a.innerText = '下载';
  a.download = 'true';
  li.appendChild(image);
  li.appendChild(p);
  li.appendChild(a);
  oPreview?.appendChild(li);
}

init();
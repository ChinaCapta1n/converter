(() => {
  const oImageFileSelector = document.querySelector('#imageFileSelector');
  const oOriginImagePreview = document.querySelector('#originImagePreview');
  const oCompressImagePreview = document.querySelector('#compressedImagePreview');
  const reader = new FileReader();

  let imageFile = null;
  let quality = 30;
  let compressedImageSource = '';


  const IMAGE_TYPES = {
    'image/jpeg': 'image/jpeg',
    'image/png': 'image/png',
    'image/webp': 'image/webp'
  }

  const init = () => {
    bindEvent();
  }

  function bindEvent () {
    oImageFileSelector.addEventListener('change', handleFileSelectorChange, false);
  }

  function handleFileSelectorChange(e) {
    imageFile = e.target.files[0];
    
    if(!imageFile || !IMAGE_TYPES[imageFile.type]) {
      alert('请选择正确格式的图片');
      setImageFileEmpty(); // 即使选择不支持类型，也依然会被选取，必须手动清空
      return;
    }

    setImagePreview(imageFile);
  }

  function setImageFileEmpty() {
    oImageFileSelector.value = '';
    imageFile = null;

    setPreviewVisible(oOriginImagePreview, false);
    setPreviewVisible(oCompressImagePreview, false);
  }

  function setImagePreview(imageFile) {
    if(imageFile instanceof File) {
      reader.onload = async () => {
        const originImageSource = reader.result;
        await createCompressedImage({
          imageSource: originImageSource,
          quality,
          type: imageFile.type
        })

        oOriginImagePreview.src = originImageSource;
        oCompressImagePreview.src = compressedImageSource;
        setPreviewVisible(oOriginImagePreview, true);
        setPreviewVisible(oCompressImagePreview, true);
      }

      reader.readAsDataURL(imageFile);
    }
  }

  function createCompressedImage({ imageSource, type }) {
    const canvas = document.createElement('canvas');
    const image = document.createElement('img');
    const ctx = canvas.getContext('2d');

    image.src = imageSource;

    return new Promise((resolve) => {
      image.onload = () => {
        const imageWidth = image.width;
        const imageHeight = image.height;
    
        canvas.width = imageWidth;
        canvas.height = imageHeight;
    
        ctx.drawImage(image, 0, 0, imageWidth, imageHeight);
    
        doCompress(canvas, imageSource, type);
        resolve(compressedImageSource);
      }
    })
  }

  function doCompress(canvas, imageSource, type) {
    compressedImageSource = canvas.toDataURL(type, quality / 100);

    if(compressedImageSource.length >= imageSource.length && quality > 10) {
      quality -= 10;
      doCompress(canvas, imageSource, type);
    }
  }

  function setPreviewVisible(node, visible) {
    switch(visible) {
      case true:
        node.classList.remove('hide');
        node.classList.add('show');
        break;
      case false:
        node.classList.remove('show');
        node.classList.add('hide');
        break;
    }
  }

  init();
})();
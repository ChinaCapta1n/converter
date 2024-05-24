(() => {

    const canvas = document.querySelector('canvas');
    const downloadLink = document.querySelector('#download');

    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = './image/Shopping.jpg';

    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imgData = canvas.toDataURL('image/webp', 1.0);

        downloadLink.download = 'output_image.webp';
        downloadLink.href = imgData;
        downloadLink.click();
    }

})();
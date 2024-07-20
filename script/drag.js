(() => {

  const imageFileSelector = document.querySelector('.imageFileSelector');

  const init = () => {
    bindEvent();
  }

  function bindEvent() {
    imageFileSelector.addEventListener('dragenter', onDragEnter, false);
    imageFileSelector.addEventListener('dragover', onDragOver, false);
    imageFileSelector.addEventListener('dragleave', onDragLeave, false);
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  function onDragEnter(e) {
    e.target.classList.add('dragenter');
  }

  function onDragLeave(e) {
    e.target.classList.remove('dragenter');
  }

  init();
})();
document.addEventListener('DOMContentLoaded', () => {
    const canvas = new fabric.Canvas('canvas')

    const changeCanvasColor = (color) => {
        canvas.backgroundColor = color;
        canvas.renderAll();
    }

    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#C0C0C0', '#800000', '#008000', '#000080'];

    colors.forEach((color) => {
        const colorButton = document.createElement('div');
        colorButton.classList.add('color-button');
        colorButton.style.backgroundColor = color;
        colorButton.addEventListener('click', () => changeCanvasColor(color));
        document.querySelector('.btn-container').appendChild(colorButton);
      });

    const downloadButton = document.createElement('button');
    downloadButton.innerText = 'Download';
    downloadButton.addEventListener('click', () => {
    const dataURL = canvas.toDataURL({ format: 'png' });
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas.png';
    link.click();
  });
  document.body.appendChild(downloadButton);



// text routes functionality
const addTextButton = document.createElement('button');
  addTextButton.innerText = 'Add Text';
  addTextButton.addEventListener('click', () => {
    const defaultText = new fabric.IText('Default Text', {
      left: canvas.width / 2,
      top: canvas.height / 2,
      fontSize: 20,
      textAlign: 'center',
    });

    canvas.add(defaultText);
  });
  textMenu.appendChild(addTextButton);

  const fontSizeDropdown = document.createElement('select');
  fontSizeDropdown.addEventListener('change', () => {
    const selectedFontSize = fontSizeDropdown.value;
    const activeObject = canvas.getActiveObject();

    if (activeObject && activeObject.type === 'i-text') {
      activeObject.set('fontSize', parseInt(selectedFontSize, 10));
      canvas.renderAll();
    }
  });

  for (let i = 10; i <= 60; i += 10) {
    const option = document.createElement('option');
    option.value = i;
    option.text = `${i}px`;
    fontSizeDropdown.appendChild(option);
  }

  textMenu.appendChild(fontSizeDropdown);

  const trashIcon = document.createElement('span');
  trashIcon.innerHTML = '&#128465;';
  trashIcon.classList.add('trash-icon');
  trashIcon.addEventListener('click', () => {
    const activeObject = canvas.getActiveObject();

    if (activeObject) {
      canvas.remove(activeObject);
    }
  });
  textMenu.appendChild(trashIcon);

  document.body.appendChild(textMenu);

    
})
const myDiv = document.getElementById('main');
const customContextMenu = document.getElementById('customContextMenu');
const menuItems = customContextMenu.querySelectorAll('li a');

myDiv.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  customContextMenu.style.left = event.clientX + 'px';
  customContextMenu.style.top = event.clientY + 'px';
  customContextMenu.style.display = 'block';
});

document.addEventListener('click', (event) => {
  if (!customContextMenu.contains(event.target)) {
    customContextMenu.style.display = 'none';
  }
});

menuItems.forEach(item => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    customContextMenu.style.display = 'none';
  });
});

const element = document.getElementById('footer');
element.addEventListener('contextmenu', function(event) {
  event.preventDefault();
});

//moving iframe
let isDragging = false;
let offsetX, offsetY;
let isFullscreen = false;

const iframeContainer = document.getElementById('iframe-container');
const iframeHeader = document.getElementById('iframe-header');
const toggleButton = document.getElementById('toggle-iframe');
const fullscreenButton = document.querySelector('.fullscreen-button');


iframeHeader.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - iframeContainer.offsetLeft;
  offsetY = e.clientY - iframeContainer.offsetTop;
});

window.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    const maxX = window.innerWidth - iframeContainer.offsetWidth;
    const maxY = window.innerHeight - iframeContainer.offsetHeight;

    iframeContainer.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
    iframeContainer.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
  }
});

window.addEventListener('mouseup', () => {
  isDragging = false;
});

function openIframe() {
  iframeContainer.style.display = 'block';
  toggleButton.textContent = 'List';
  toggleButton.onclick = closeIframe;
}

function closeIframe() {
  iframeContainer.style.display = 'none';
  toggleButton.textContent = 'List';
  toggleButton.onclick = openIframe;
}

toggleButton.onclick = openIframe;


function toggleFullscreen() {
  isFullscreen = !isFullscreen;
  iframeContainer.classList.toggle('fullscreen-mode', isFullscreen);

  if (isFullscreen) {
    fullscreenButton.textContent = "Exit Fullscreen";
  } else {
    fullscreenButton.textContent = "Fullscreen";
  }
}
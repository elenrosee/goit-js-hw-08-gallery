export default [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  galleryContainer: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxBackdrop: document.querySelector('.lightbox__overlay'),
  lightboxCloseButton: document.querySelector('.lightbox__button'),
  lightboxImage: document.querySelector('.lightbox__image'),
};

import { default as Gallery } from './gallery-items.js';

const galleryMarkup = createGalleryMarkup(Gallery);
refs.galleryContainer.insertAdjacentHTML('afterbegin', galleryMarkup);

refs.galleryContainer.addEventListener('click', openModalWindow);
refs.lightboxCloseButton.addEventListener('click', closeModalWindow);
refs.lightboxBackdrop.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', changeImage);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModalWindow();
  }
});

function createGalleryMarkup(pictures) {
  return pictures
    .map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
    <a class="gallery__link"
      href="${original}" >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
    })
    .join('');
}

function openModalWindow(event) {
  event.preventDefault();
  if (event.target.classList.contains('gallery__image')) {
    refs.lightbox.classList.add('is-open');

    refs.lightboxImage.src = event.target.dataset.source;
    refs.lightboxImage.alt = event.target.alt;
  }
}

function closeModalWindow() {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImage.src = '';
  refs.lightboxImage.alt = '';
}

function changeImage(e) {
  const imgSrc = getImageSrc(Gallery);

  let newIndex = imgSrc.indexOf(refs.lightboxImage.src);

  if (newIndex < 0) {
    return;
  }

  if (e.key === 'ArrowLeft') {
    newIndex -= 1;
    if (newIndex === -1) {
      newIndex = imgSrc.length - 1;
    }
  } else if (e.key === 'ArrowRight') {
    newIndex += 1;
    if (newIndex === imgSrc.length) {
      newIndex = 0;
    }
  }

  refs.lightboxImage.src = imgSrc[newIndex];
}

function getImageSrc(images) {
  const imgSrc = [];

  for (const img of images) {
    imgSrc.push(img.original);
  }

  return imgSrc;
}

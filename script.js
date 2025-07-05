let currentGalleryImages = [];
let currentImageIndex = -1;

document.querySelectorAll('.gallery').forEach(gallery => {
  gallery.querySelectorAll('.gallery-img').forEach((img, idx, imgs) => {
    img.addEventListener('click', function() {
      currentGalleryImages = Array.from(gallery.querySelectorAll('.gallery-img'));
      currentImageIndex = idx;
      document.getElementById('lightbox-img').src = this.src;
      
      // Get title if it exists
      const titleElement = this.nextElementSibling;
      const title = titleElement && titleElement.classList.contains('gallery-title') ? titleElement.textContent : '';
      document.getElementById('lightbox-title').textContent = title;
      
      // Get description if it exists
      const descriptionElement = titleElement ? titleElement.nextElementSibling : null;
      const description = descriptionElement && descriptionElement.classList.contains('gallery-description') ? descriptionElement.textContent : '';
      document.getElementById('lightbox-description').textContent = description;
      
      document.getElementById('lightbox').style.display = 'flex';
    });
  });
});

document.getElementById('lightbox-close').onclick = function() {
  document.getElementById('lightbox').style.display = 'none';
  document.getElementById('lightbox-img').src = '';
  document.getElementById('lightbox-title').textContent = '';
  document.getElementById('lightbox-description').textContent = '';
  currentGalleryImages = [];
  currentImageIndex = -1;
};

document.getElementById('lightbox').onclick = function(e) {
  if (e.target === this) {
    this.style.display = 'none';
    document.getElementById('lightbox-img').src = '';
    document.getElementById('lightbox-title').textContent = '';
    document.getElementById('lightbox-description').textContent = '';
    currentGalleryImages = [];
    currentImageIndex = -1;
  }
};

document.addEventListener('keydown', function(e) {
  const lightbox = document.getElementById('lightbox');
  if (lightbox.style.display === 'flex') {
    if (e.key === 'Escape') {
      lightbox.style.display = 'none';
      document.getElementById('lightbox-img').src = '';
      document.getElementById('lightbox-title').textContent = '';
      document.getElementById('lightbox-description').textContent = '';
      currentGalleryImages = [];
      currentImageIndex = -1;
    } else if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && currentGalleryImages.length > 0) {
      if (e.key === 'ArrowLeft') {
        currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
      } else if (e.key === 'ArrowRight') {
        currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
      }
      const currentImg = currentGalleryImages[currentImageIndex];
      document.getElementById('lightbox-img').src = currentImg.src;
      
      // Get title if it exists
      const titleElement = currentImg.nextElementSibling;
      const title = titleElement && titleElement.classList.contains('gallery-title') ? titleElement.textContent : '';
      document.getElementById('lightbox-title').textContent = title;
      
      // Get description if it exists
      const descriptionElement = titleElement ? titleElement.nextElementSibling : null;
      const description = descriptionElement && descriptionElement.classList.contains('gallery-description') ? descriptionElement.textContent : '';
      document.getElementById('lightbox-description').textContent = description;
    }
  }
});

// Gallery expand/collapse functionality
function toggleGallery(button) {
  const gallery = button.previousElementSibling;
  const isExpanded = gallery.classList.contains('expanded');
  
  if (isExpanded) {
    gallery.classList.remove('expanded');
    button.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5" stroke="#b48cae" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    button.setAttribute('aria-label', button.getAttribute('aria-label').replace('הסתר', 'הצג'));
  } else {
    gallery.classList.add('expanded');
    button.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 14l5-5 5 5" stroke="#b48cae" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    button.setAttribute('aria-label', button.getAttribute('aria-label').replace('הצג', 'הסתר'));
  }
}

// Mobile swipe functionality for lightbox only
let lightboxStartX = 0;
let lightboxStartY = 0;

// Handle lightbox touch start
document.getElementById('lightbox').addEventListener('touchstart', function(e) {
  if (window.innerWidth > 600) return; // Only on mobile
  lightboxStartX = e.touches[0].clientX;
  lightboxStartY = e.touches[0].clientY;
});

// Handle lightbox touch move
document.getElementById('lightbox').addEventListener('touchmove', function(e) {
  if (window.innerWidth > 600) return; // Only on mobile
  e.preventDefault(); // Prevent default scrolling
});

// Handle lightbox touch end
document.getElementById('lightbox').addEventListener('touchend', function(e) {
  if (window.innerWidth > 600) return; // Only on mobile
  
  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;
  const diffX = lightboxStartX - endX;
  const diffY = lightboxStartY - endY;
  
  // Check if it's a horizontal swipe (not vertical)
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
    if (diffX > 0) {
      // Swipe left - next image
      currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
    } else {
      // Swipe right - previous image
      currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    }
    
    const currentImg = currentGalleryImages[currentImageIndex];
    document.getElementById('lightbox-img').src = currentImg.src;
    
    // Get title if it exists
    const titleElement = currentImg.nextElementSibling;
    const title = titleElement && titleElement.classList.contains('gallery-title') ? titleElement.textContent : '';
    document.getElementById('lightbox-title').textContent = title;
    
    // Get description if it exists
    const descriptionElement = titleElement ? titleElement.nextElementSibling : null;
    const description = descriptionElement && descriptionElement.classList.contains('gallery-description') ? descriptionElement.textContent : '';
    document.getElementById('lightbox-description').textContent = description;
  }
}); 
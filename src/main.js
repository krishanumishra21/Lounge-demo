// Import styles
import './styles/main.css';

// Import modules
import { 
  initLoungeParticles, 
  initHeroBuilding 
} from './modules/three-scene.js';

import { initTourBookingForm } from './modules/booking.js';

import { 
  initRenovationSlider, 
  initFloorPlanExplorer 
} from './modules/components.js';

// ==========================================================================
// Initialization & Preloader Manager
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.getElementById('loader-progress-fill');
  const loader = document.getElementById('lounge-loader');
  
  let progress = 0;
  
  // Simulate loading bars
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 12) + 6;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      setTimeout(() => {
        if (loader) {
          loader.style.opacity = '0';
          loader.style.visibility = 'hidden';
        }
      }, 500);
    }
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  }, 70);

  // Initialize all modular elements
  initLoungeNavigation();
  initLoungeThreeScenes();
  initFloorPlanExplorer();
  initRenovationSlider();
  initTourBookingForm();
});

// ==========================================================================
// Sticky Header & Mobile responsive nav drawer
// ==========================================================================
function initLoungeNavigation() {
  const header = document.querySelector('.lounge-header');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll handler for header sticky shrink
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile navigation drawer toggle
  const toggleMenu = () => {
    menuToggle?.classList.toggle('active');
    navMenu?.classList.toggle('active');
    document.body.classList.toggle('overflow-hidden');
  };

  menuToggle?.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu?.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
}

// ==========================================================================
// 3D Particles & Building Model Initialization
// ==========================================================================
function initLoungeThreeScenes() {
  // Champagne particles
  initLoungeParticles('lounge-bg-canvas');
  
  // Twisted architectural tower inside Hero section
  initHeroBuilding('hero-3d-canvas-container');
}

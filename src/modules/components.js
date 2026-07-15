// ==========================================================================
// 1. Before/After Renovation Slider
// ==========================================================================
export function initRenovationSlider() {
  const slider = document.getElementById('lounge-slider');
  const handle = document.getElementById('lounge-slider-handle');
  const overlay = document.getElementById('lounge-slider-overlay');
  const beforeImage = overlay?.querySelector('.before-image');

  if (!slider || !handle || !overlay || !beforeImage) return;

  let isSliding = false;

  const syncImageSize = () => {
    const w = slider.getBoundingClientRect().width;
    beforeImage.style.width = `${w}px`;
  };

  syncImageSize();
  window.addEventListener('resize', syncImageSize);

  const moveSlider = (clientX) => {
    const rect = slider.getBoundingClientRect();
    const x = clientX - rect.left;
    let pct = (x / rect.width) * 100;
    pct = Math.max(0, Math.min(100, pct));

    handle.style.left = `${pct}%`;
    overlay.style.width = `${pct}%`;
  };

  const startSliding = (e) => {
    isSliding = true;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    moveSlider(x);
  };

  const slide = (e) => {
    if (!isSliding) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    moveSlider(x);
  };

  handle.addEventListener('mousedown', startSliding);
  slider.addEventListener('mousedown', startSliding);
  handle.addEventListener('touchstart', startSliding, { passive: true });
  slider.addEventListener('touchstart', startSliding, { passive: true });

  window.addEventListener('mousemove', slide);
  window.addEventListener('touchmove', slide, { passive: true });
  window.addEventListener('mouseup', () => isSliding = false);
  window.addEventListener('touchend', () => isSliding = false);
}

// ==========================================================================
// 2. Interactive Floor Plans SVG Blueprints Explorer
// ==========================================================================
const floorBlueprints = {
  studio: `
    <svg viewBox="0 0 400 400" fill="none" stroke="currentColor" stroke-width="1.5">
      <!-- Outer walls -->
      <rect x="20" y="20" width="360" height="360" stroke-width="3" rx="4"/>
      
      <!-- Interior Divisions -->
      <!-- Bath -->
      <line x1="20" y1="140" x2="160" y2="140" />
      <line x1="160" y1="20" x2="160" y2="140" />
      
      <!-- Living Area -->
      <line x1="20" y1="260" x2="240" y2="260" />
      
      <!-- Balcony Terrace -->
      <rect x="280" y="20" width="100" height="200" stroke-dasharray="4" />
      <text x="330" y="115" font-size="10" fill="currentColor" text-anchor="middle" transform="rotate(-90 330 115)">TERRACE</text>

      <!-- Labels -->
      <text x="90" y="80" font-size="11" fill="currentColor" text-anchor="middle">MASTER BATH</text>
      <text x="90" y="200" font-size="11" fill="currentColor" text-anchor="middle">KITCHEN / DINING</text>
      <text x="130" y="320" font-size="12" fill="currentColor" text-anchor="middle">EXECUTIVE SUITE LOUNGE</text>
      
      <!-- Details -->
      <!-- Bed outline -->
      <rect x="40" y="290" width="60" height="70" stroke-dasharray="2" />
      <text x="70" y="330" font-size="9" fill="currentColor" text-anchor="middle" opacity="0.6">KING BED</text>
      
      <!-- Grid overlay for technical blueprint look -->
      <line x1="0" y1="200" x2="400" y2="200" opacity="0.1" stroke-dasharray="2"/>
      <line x1="200" y1="0" x2="200" y2="400" opacity="0.1" stroke-dasharray="2"/>
    </svg>
  `,
  duplex: `
    <svg viewBox="0 0 400 400" fill="none" stroke="currentColor" stroke-width="1.5">
      <!-- Outer Walls -->
      <polygon points="20,20 380,20 380,300 280,300 280,380 20,380" stroke-width="3" />
      
      <!-- Main partitions -->
      <line x1="200" y1="20" x2="200" y2="380" />
      <line x1="20" y1="180" x2="380" y2="180" />
      
      <!-- Staircase symbol (critical for duplex!) -->
      <g stroke-width="1">
        <rect x="175" y="200" width="50" height="120" />
        <line x1="175" y1="220" x2="225" y2="220" />
        <line x1="175" y1="240" x2="225" y2="240" />
        <line x1="175" y1="260" x2="225" y2="260" />
        <line x1="175" y1="280" x2="225" y2="280" />
        <line x1="175" y1="300" x2="225" y2="300" />
        <text x="200" y="212" font-size="7" fill="currentColor" text-anchor="middle">STAIRS UP</text>
      </g>

      <!-- Labels -->
      <text x="110" y="100" font-size="11" fill="currentColor" text-anchor="middle">MASTER SUITE A</text>
      <text x="290" y="100" font-size="11" fill="currentColor" text-anchor="middle">DOUBLE BEDROOM B</text>
      <text x="100" y="290" font-size="11" fill="currentColor" text-anchor="middle">GRAND LOUNGE</text>
      <text x="290" y="250" font-size="11" fill="currentColor" text-anchor="middle">DINING ROOM</text>
      
      <!-- Bathrooms -->
      <rect x="280" y="320" width="80" height="50" />
      <text x="320" y="350" font-size="9" fill="currentColor" text-anchor="middle">POWDER RM</text>

      <line x1="0" y1="200" x2="400" y2="200" opacity="0.1" stroke-dasharray="2"/>
      <line x1="200" y1="0" x2="200" y2="400" opacity="0.1" stroke-dasharray="2"/>
    </svg>
  `,
  penthouse: `
    <svg viewBox="0 0 400 400" fill="none" stroke="currentColor" stroke-width="1.5">
      <!-- Circular wrap outer wall (luxury penthouse wrap style) -->
      <circle cx="200" cy="200" r="180" stroke-width="3" />
      
      <!-- Central Lift / Core elevator lobby -->
      <rect x="150" y="150" width="100" height="100" stroke-width="2" />
      <line x1="150" y1="200" x2="250" y2="200" />
      <line x1="200" y1="150" x2="200" y2="250" />
      <text x="200" y="195" font-size="9" fill="currentColor" text-anchor="middle">EXPRESS</text>
      <text x="200" y="215" font-size="9" fill="currentColor" text-anchor="middle">ELEVATOR</text>

      <!-- Radial partition lines going from core to outer circular walls -->
      <line x1="150" y1="150" x2="73" y2="73" />
      <line x1="250" y1="150" x2="327" y2="73" />
      <line x1="150" y1="250" x2="73" y2="327" />
      <line x1="250" y1="250" x2="327" y2="327" />

      <!-- Surrounding luxury amenities -->
      <text x="200" y="70" font-size="12" fill="currentColor" text-anchor="middle" font-weight="600">SKY DINING SUITE</text>
      <text x="320" y="200" font-size="11" fill="currentColor" text-anchor="middle" font-weight="600">MASTER SUITE A</text>
      <text x="200" y="340" font-size="12" fill="currentColor" text-anchor="middle" font-weight="600">PANORAMIC LIVING LOBBY</text>
      <text x="80" y="200" font-size="11" fill="currentColor" text-anchor="middle" font-weight="600">CRYOSPA / SAUNA</text>

      <!-- Heated plunge pool overlay on terrace -->
      <path d="M 50,200 A 150,150 0 0,1 200,50 L 200,100 A 100,100 0 0,0 100,200 Z" fill="rgba(229,193,88,0.05)" stroke="currentColor" stroke-dasharray="3" />
      <text x="120" y="110" font-size="8" fill="currentColor" text-anchor="middle" opacity="0.7">INFINITY PLUNGE POOL</text>
      
      <line x1="0" y1="200" x2="400" y2="200" opacity="0.1" stroke-dasharray="2"/>
      <line x1="200" y1="0" x2="200" y2="400" opacity="0.1" stroke-dasharray="2"/>
    </svg>
  `
};

const floorTexts = {
  studio: {
    title: 'Grand Studio Executive',
    text: 'Perfect for executives. Features open-concept kitchen lounge, dedicated study enclave, master bath, and a 200 sq.ft. private terrace overviewing city parks.'
  },
  duplex: {
    title: 'Imperial Duplex Suite',
    text: 'A gorgeous double-height mezzanine layout featuring a floating spiral staircase, 3 complete master bedrooms, automated home theatre enclaves, and floor-to-ceiling glass panel walls.'
  },
  penthouse: {
    title: 'Royal Sky Penthouse',
    text: 'The ultimate luxury full-floor wrap-around suite. Offers private express elevator secure portals, 5 spacious bedrooms, integrated sauna massage chambers, and a wrapping infinity deck plunge pool.'
  }
};

export function initFloorPlanExplorer() {
  const container = document.getElementById('floor-svg-container');
  const buttons = document.querySelectorAll('.floor-btn');
  const label = document.getElementById('floor-tag-badge');
  const detailTitle = document.getElementById('floor-detail-title');
  const detailText = document.getElementById('floor-detail-text');

  if (!container) return;

  const setFloor = (floorKey) => {
    // Inject active SVG content
    container.innerHTML = floorBlueprints[floorKey] || '';
    
    // Update Badge Label
    if (label) {
      label.textContent = floorKey.charAt(0).toUpperCase() + floorKey.slice(1) + ' Layout';
    }

    // Update details card texts
    const info = floorTexts[floorKey];
    if (info && detailTitle && detailText) {
      detailTitle.textContent = info.title;
      detailText.textContent = info.text;
    }
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const floorKey = btn.getAttribute('data-floor');
      setFloor(floorKey);
    });
  });

  // Load default studio blueprint
  setFloor('studio');
}

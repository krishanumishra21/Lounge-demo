import * as THREE from 'three';

// ==========================================================================
// ProceduralTwisting Architectural Tower Generator
// ==========================================================================
export function createTwistingTower() {
  const towerGroup = new THREE.Group();
  
  // Materials: Sleek gold-accented structural metal and transparent structural glass
  const steelMaterial = new THREE.MeshStandardMaterial({
    color: 0xaa7c11, // Dark Bronze Gold
    metalness: 0.95,
    roughness: 0.15
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.08,
    metalness: 0.05,
    transmission: 0.82, // High transparency
    thickness: 1.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide
  });

  // 1. Build concrete foundation block
  const foundationGeom = new THREE.BoxGeometry(2.4, 0.25, 2.4);
  const foundation = new THREE.Mesh(foundationGeom, steelMaterial);
  foundation.position.y = -1.6;
  towerGroup.add(foundation);

  // 2. Stack twisting modular floor plates
  const floorCount = 12;
  const floorHeight = 0.28;
  const floorWidth = 1.35;
  const rotationOffsetPerFloor = 0.08; // Twisting effect

  for (let i = 0; i < floorCount; i++) {
    const floorGroup = new THREE.Group();
    floorGroup.position.y = -1.4 + (i * floorHeight);
    
    // Twist rotation
    floorGroup.rotation.y = i * rotationOffsetPerFloor;
    
    // Core pillar column
    const coreGeom = new THREE.CylinderGeometry(0.18, 0.18, floorHeight, 8);
    const core = new THREE.Mesh(coreGeom, steelMaterial);
    floorGroup.add(core);
    
    // Outer glass facade box
    const facadeGeom = new THREE.BoxGeometry(floorWidth, floorHeight - 0.02, floorWidth);
    const facade = new THREE.Mesh(facadeGeom, glassMaterial);
    floorGroup.add(facade);

    // Structural frame borders
    const borderGeom = new THREE.BoxGeometry(floorWidth + 0.02, 0.02, floorWidth + 0.02);
    const topBorder = new THREE.Mesh(borderGeom, steelMaterial);
    topBorder.position.y = floorHeight / 2;
    floorGroup.add(topBorder);

    // Random internal window lights glow
    if (Math.random() > 0.4) {
      const windowLightGeom = new THREE.BoxGeometry(0.3, floorHeight - 0.06, 0.02);
      const windowLightMaterial = new THREE.MeshBasicMaterial({
        color: 0xe5c158, // Golden light
        transparent: true,
        opacity: 0.6
      });
      const winLight = new THREE.Mesh(windowLightGeom, windowLightMaterial);
      winLight.position.set((Math.random() - 0.5) * 0.8, 0, 0.68);
      floorGroup.add(winLight);
    }
    
    towerGroup.add(floorGroup);
  }

  // 3. Spire Crown top
  const spireGeom = new THREE.ConeGeometry(0.12, 0.8, 8);
  const spire = new THREE.Mesh(spireGeom, steelMaterial);
  spire.position.y = -1.4 + (floorCount * floorHeight) + 0.35;
  towerGroup.add(spire);

  towerGroup.scale.set(1.4, 1.4, 1.4);
  return towerGroup;
}

// ==========================================================================
// 1. Golden Champagne Particles Background
// ==========================================================================
export function initLoungeParticles(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const width = window.innerWidth;
  const height = window.innerHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
  camera.position.z = 18;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Particles Setup
  const particleCount = 180;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const randomSpeeds = [];

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 36;
    positions[i + 1] = (Math.random() - 0.5) * 28;
    positions[i + 2] = (Math.random() - 0.5) * 15;

    randomSpeeds.push({
      x: (Math.random() - 0.5) * 0.003,
      y: Math.random() * 0.005 + 0.004, // upward drifting
      z: (Math.random() - 0.5) * 0.003
    });
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Circular texture
  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
  grad.addColorStop(0, 'rgba(229, 193, 88, 0.75)');
  grad.addColorStop(0.3, 'rgba(229, 193, 88, 0.35)');
  grad.addColorStop(1, 'rgba(229, 193, 88, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 16, 16);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.PointsMaterial({
    size: 0.35,
    transparent: true,
    opacity: 0.45,
    map: texture,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Mouse Parallax variables
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.01;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.01;
  });

  // Render animation loop
  const animate = () => {
    requestAnimationFrame(animate);

    const pos = particles.geometry.attributes.position;
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      pos.array[idx + 1] += randomSpeeds[i].y; // rise
      pos.array[idx] += randomSpeeds[i].x;
      pos.array[idx + 2] += randomSpeeds[i].z;

      // Reset when particle goes above screen height
      if (pos.array[idx + 1] > 14) {
        pos.array[idx + 1] = -14;
        pos.array[idx] = (Math.random() - 0.5) * 36;
      }
    }
    pos.needsUpdate = true;

    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;

    particles.rotation.y = targetX * 0.04;
    particles.rotation.x = -targetY * 0.04;

    renderer.render(scene, camera);
  };
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// ==========================================================================
// 2. Interactive Building / Spire Model inside Hero
// ==========================================================================
export function initHeroBuilding(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const scene = new THREE.Scene();
  const width = container.clientWidth;
  const height = container.clientHeight;

  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  camera.position.set(0, 0.8, 6.2);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  // Warm Amber key light
  const keyLight = new THREE.DirectionalLight(0xe5c158, 1.8);
  keyLight.position.set(5, 6, 4);
  scene.add(keyLight);

  // White Rim light from behind
  const rimLight = new THREE.DirectionalLight(0xffffff, 1.2);
  rimLight.position.set(-5, 2, -3);
  scene.add(rimLight);

  // Generate Twisting tower mesh group
  const tower = createTwistingTower();
  scene.add(tower);

  // Rotation and Drag variables
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let targetRotation = { x: 0.15, y: -0.5 }; // starting angle
  let autoRotationSpeed = 0.005;

  const getCoords = (e) => e.touches ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : { x: e.clientX, y: e.clientY };

  const startDrag = (e) => {
    isDragging = true;
    previousMousePosition = getCoords(e);
  };

  const moveDrag = (e) => {
    if (!isDragging) return;
    const coords = getCoords(e);
    const delta = {
      x: coords.x - previousMousePosition.x,
      y: coords.y - previousMousePosition.y
    };

    targetRotation.y += delta.x * 0.006;
    targetRotation.x += delta.y * 0.006;
    targetRotation.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, targetRotation.x));

    previousMousePosition = coords;
  };

  container.addEventListener('mousedown', startDrag);
  container.addEventListener('touchstart', startDrag, { passive: true });
  window.addEventListener('mousemove', moveDrag);
  window.addEventListener('touchmove', moveDrag, { passive: true });
  window.addEventListener('mouseup', () => isDragging = false);
  window.addEventListener('touchend', () => isDragging = false);

  // Zoom slider overlay listener (Mouse wheel)
  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    camera.position.z += e.deltaY * 0.004;
    camera.position.z = Math.max(4.0, Math.min(10.0, camera.position.z));
  }, { passive: false });

  // Animation Loop
  const animate = () => {
    requestAnimationFrame(animate);

    if (!isDragging) {
      targetRotation.y += autoRotationSpeed;
    }

    // Apply smoothed rotation
    tower.rotation.y += (targetRotation.y - tower.rotation.y) * 0.07;
    tower.rotation.x += (targetRotation.x - tower.rotation.x) * 0.07;

    renderer.render(scene, camera);
  };
  animate();

  // Resize Handler
  const observer = new ResizeObserver(entries => {
    for (let entry of entries) {
      const w = entry.contentRect.width;
      const h = entry.contentRect.height;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
  });
  observer.observe(container);
}

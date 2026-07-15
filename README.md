# Aura Heights — Luxury Residences & Private Lounge

Aura Heights is a state-of-the-art, visually striking, and highly interactive landing page for an exclusive real estate development featuring luxury sky residences and a private member lounge. Designed with a premium dark gold theme, it delivers an immersive experience using interactive 3D graphics and responsive modern styling.

👑 **Live Demo on Vercel:** [https://lounge-demo-pink.vercel.app](https://lounge-demo-pink.vercel.app)

---

## 🌟 Key Features

- **Interactive 3D Building Model:** An interactive 3D skyscraper model rendered in the hero section using **Three.js** that users can drag to rotate and scroll to zoom.
- **Dynamic 3D Particle Background:** A floating particle simulation in the background creating an atmosphere of elegance.
- **Interactive Floor Layout Explorer:** A stylized layout floor selector that dynamically showcases details of the Sky Lounge, Penthouse Suite, and Premier Residence.
- **Before-and-After Suite Slider:** A sliding visual comparisons module displaying architectural shell updates and fully-furnished interiors.
- **Interactive Booking Form:** A fully validated reservation form to request private tours or private lounge memberships, featuring automated validations and success alerts.
- **Premium Real Estate Branding:** Stylized Cinzel/Montserrat typography, curated HSL gold color schemes, and modern layout structures.
- **Fully Responsive:** Sleek, adaptive layout designed for mobile, tablet, and desktop screens.
- **SEO Optimized:** Out-of-the-box SEO tags and semantic HTML5 structures.

---

## 🛠️ Technology Stack

- **Core:** HTML5, Vanilla CSS, ES6+ JavaScript
- **Bundler & Build Tool:** [Vite](https://vite.dev) (Vite 8)
- **3D Graphics:** [Three.js](https://threejs.org/)
- **Animations:** [GSAP (GreenSock)](https://greensock.com/gsap/) & [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Deployment:** [Vercel](https://vercel.com)

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org) (v18 or higher recommended) installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/krishanumishra21/Lounge-demo.git
   cd Lounge-demo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser to view the application.

### Production Build

To compile the application into static assets optimized for production:

```bash
npm run build
```

This compiles all files into the `dist/` directory, ready to be served by any static host.

---

## 🌎 Deployment

This project is configured to automatically deploy on **Vercel** with every push to the `main` branch. 

To deploy manually via the Vercel CLI:
```bash
npx vercel --prod
```

---

## 📄 License

This project is licensed under the MIT License. Feel free to use and customize it!

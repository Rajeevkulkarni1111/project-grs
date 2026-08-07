# GRS | Friendship Day Experience ✨

> A cinematic, interactive Friendship Day web application handcrafted for **Rashmi Sharma** by **Rajeev**.

---

## 🌟 Overview

**GRS | Friendship Day** is a handcrafted, multi-stage interactive web journey built to celebrate memories, laughter, and friendship. Featuring cinematic intro animations, a 3D envelope stage, interactive choices, a story timeline, video showcases, and a peaceful closing finale, the application provides an immersive and unforgettable experience.

---

## 🛠️ Features & Interactive Flow

### 1. ☀️ Cinematic Landing Hero
* **Animated Morning Sky**: Glowing sun sunrise effect, floating cloud animations, and ambient sparkles.
* **Dynamic Entrance**: Sequenced letter drop animation for the title `GRS`, personalized greeting, and interactive **"Tap To Begin ✨"** action.

### 2. ✉️ Interactive 3D Envelope & Choice
* **Realistic Unfolding**: 3D envelope with paper textures, depth shadows, flap unsealing, and letter extraction.
* **Humorous "NO" Interaction**: Clicking "NO" triggers a funny angry envelope animation and custom modal overlay with playful banter (`🤬 Yeee !`).
* **Flash "YES" Transition**: Clicking "YES" triggers a camera flash screen effect to seamlessly reveal the next phase.

### 3. 📸 Memory Timeline (Chapters I – VI)
* **Visual Storytelling**: 6 chapter memory cards highlighting milestones with alternating photo frames and handwritten-style memory cards.
* **Chapters Included**:
  * **Chapter I**: *The Beginning ✨* – Humari First Photo
  * **Chapter II**: *Night Owl Vibes ☕* – 3 AM Gossip Sessions
  * **Chapter III**: *Pure Chaos 💫* – Laughing Till It Hurts
  * **Chapter IV**: *uff..!!* – Side By Side
  * **Chapter V**: *Unshakable Support 🛡* – Unapologetically Us
  * **Chapter VI**: *From clg to Bengaluru Till infinity and Beyond 🚀* – Besties For Life
* **Fallback Protection**: Automatic photo fallback placeholders to ensure seamless viewing on any device or network state.

### 4. 🎬 Video Journey
* **Dual Video Frames**: Two dedicated video experience sections showcasing *"Our Beginning"* and *"Our Latest Memory"*.
* **Custom Styling**: Framed video players with personalized memory captions and smooth navigation controls (**Next Video ▶** and **Finish ✨**).

### 5. 🌅 Final Scene
* **Peaceful Finale**: Elegant closing hero scene displaying *"Happy Friendship Day Rashmi Sharma"*, heartfelt note, and signature sign-off by **Chaitu**.

---

## 💻 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Markup** | HTML5 (Semantic structure, accessibility `aria-` labels) |
| **Styling** | Vanilla CSS3 (Custom variables, glassmorphism, responsive grid/flexbox) |
| **Typography** | Google Fonts (`Caveat`, `Cormorant Garamond`, `Poppins`) |
| **Animations** | GSAP 3.12.5 (GreenSock Animation Platform) + CSS Keyframes |
| **Logic** | Vanilla JavaScript (Modular ES6 architecture) |

---

## 📁 Project Structure

```
GRS_BFFDay/
├── index.html          # Main HTML entry point & document structure
├── DEVLOG.md           # Development log & sprint history
├── README.md           # Project documentation
├── css/
│   ├── style.css       # Core design tokens, layout & section styling
│   ├── animations.css  # Keyframe animations & ambient effects
│   └── responsive.css  # Breakpoint overrides (Mobile/Tablet/Desktop)
├── js/
│   ├── main.js         # Master scene controller & sequence logic
│   ├── envelope.js     # Envelope 3D physics, flap & modal timelines
│   ├── timeline.js     # Scroll & timeline card animations
│   ├── ending.js       # Video sequence & final scene transitions
│   └── animations.js   # Custom animation helpers
└── assets/
    ├── images/         # Memory photos (photo1.jpeg - photo6.jpeg)
    └── videos/         # Memory videos (video1.mp4, video2.mp4)
```

---

## 🚀 How to Run Locally

Since this is a lightweight static web application, no build process or node modules are required.

### Quick Start:
1. **Clone or Download** the repository to your local machine.
2. Open `index.html` directly in any modern web browser **OR** serve using a local development server:

```bash
# Using VS Code Live Server extension or npx serve:
npx serve .
```
3. Open `http://localhost:3000` (or the provided port) in your browser.

---

## ⚡ Performance & Quality

* **60 FPS Hardware Acceleration**: Built primarily using CSS `transform` and `opacity` to eliminate layout thrashing.
* **Responsive Design**: Tested and optimized across Mobile, Tablet, Laptop, and Desktop screens.
* **Keyboard Accessible**: Keyboard navigation support for interactive elements.

---

##  Credits

Crafted with love by **Rajeev** for **Rashmi Sharma** on **Friendship Day**. ✨
# Naf3ly Tools (نفعلي)

> **Free, bilingual, privacy-first web utilities platform for students, graduates, and professionals.**
> Runs 100% in your browser with zero logins, zero paid APIs, and instant client-side performance.

---

## 🌟 Project Overview

**Naf3ly Tools (نفعلي للحلول)** is a modern, responsive web application engineered to solve daily academic and productivity problems. Whether you need to calculate your semester GPA across university grading scales, build a job-ready bilingual CV with print-to-PDF export, organize your study calendar, calculate complex percentages and discounts, or analyze text word count and reading time, Naf3ly does it directly inside your browser.

- **No User Accounts or Passwords Required**: All calculations run locally in the client session.
- **Privacy by Design**: Sensitive user information (e.g. CV details, study tasks) never touches an external server.
- **Fully Bilingual (Arabic & English)**: Complete native RTL/LTR layout and comprehensive translation strings.
- **Light & Dark Theme**: Working toggle with persistence via `localStorage`.
- **Search Engine & AdSense Ready**: Prepared with valid metadata, Open Graph tags, XML sitemap, `robots.txt`, and reserved compliant ad containers.

---

## 🚀 Implemented Tools & Features

| Tool | Route | Key Features |
| :--- | :--- | :--- |
| **GPA & CGPA Calculator** | `/tools/gpa-calculator` | Configurable 4.0 and 5.0 scales, course credits, quality points formula breakdown, cumulative GPA tab, institutional disclaimer. |
| **CV / Resume Builder** | `/tools/cv-builder` | Personal details, experience, education, skills, projects, live preview, Arabic RTL / English LTR toggle, browser print-to-PDF layout. |
| **Study & Task Planner** | `/tools/study-planner` | Add/delete study tasks, subjects, due dates, priority tags, completion rate progress bar, persistent browser storage. |
| **Percentage Calculator** | `/tools/percentage-calculator` | 4 modes: What is X% of Y, X is what % of Y, Percentage increase/decrease, Discount & savings calculator. |
| **Word & Character Counter**| `/tools/word-counter` | Live word count, characters with/without spaces, sentences, paragraphs, reading and speaking times, text case utilities. |
| **All Tools Directory** | `/tools` | Instant live search filter, category tags (Education, Career, Math, Text), tool status cards. |

---

## 🛠️ Technologies Used

- **React 18**: Component-based UI architecture with standard hooks (`useState`, `useEffect`, `useMemo`, `useContext`).
- **Vite 6**: Ultra-fast next-generation frontend bundler and development server.
- **React Router 6 (`react-router-dom`)**: Declarative client-side routing with clean URLs and 404 handling.
- **Lucide React**: Clean, accessible vector icons for the user interface.
- **CSS3 with Design Tokens (CSS Variables)**: Custom design system supporting light/dark themes and RTL/LTR text flow.

---

## 💻 Beginner Setup & Installation Guide

Follow these exact steps to run and build Naf3ly Tools on your computer.

### Step 1: Prerequisites
Make sure you have **Node.js** (version 18 or newer) installed on your system:
- Download Node.js from [nodejs.org](https://nodejs.org/).
- Verify installation by opening your terminal or PowerShell and typing:
  ```bash
  node -v
  ```

### Step 2: Open Project in Visual Studio Code
Open the project directory in VS Code or your terminal:
```bash
cd "path/to/naf3ly-tools"
```

### Step 3: Install Dependencies
Download and install the required packages:
```bash
npm install
```
*(On Windows PowerShell, if script execution is restricted, run `cmd.exe /c "npm install"`).*

### Step 4: Run the Development Server
Start the local server with hot module reloading:
```bash
npm run dev
```
Open your browser and navigate to the address shown in the terminal (typically `http://localhost:3000` or `http://localhost:5173`).

### Step 5: Build for Production
To create an optimized, minified production build ready to host anywhere:
```bash
npm run build
```
This generates the standalone `dist/` directory containing the HTML, CSS, and JavaScript files.

### Step 6: Preview the Production Build Locally
To test how your production build will behave on a live server:
```bash
npm run preview
```

---

## 📁 Project Architecture & File Structure

```text
naf3ly-tools/
├── public/
│   ├── favicon.svg          # Custom scalable SVG brand icon
│   ├── robots.txt           # Search engine indexing rules
│   ├── sitemap.xml          # Production XML sitemap with all 12 routes
│   ├── _redirects           # Cloudflare Pages / Netlify SPA fallback
│   └── 404.html             # GitHub Pages client-side redirect fallback
├── src/
│   ├── assets/              # Static assets and icons
│   ├── components/          # Reusable UI elements
│   │   ├── Header.jsx       # Sticky header with navigation and toggles
│   │   ├── Footer.jsx       # Multi-column footer with disclaimer and links
│   │   ├── Logo.jsx         # Scalable vector logo component
│   │   ├── ToolCard.jsx     # Card component for tools directory & homepage
│   │   ├── SearchBar.jsx    # Real-time search input with clear trigger
│   │   ├── LanguageSwitcher.jsx # AR / EN switch button
│   │   ├── ThemeToggle.jsx  # Light / Dark mode button
│   │   └── AdBannerSlot.jsx # Compliant future AdSense container
│   ├── context/
│   │   ├── LanguageContext.jsx # Language state, RTL/LTR, localStorage
│   │   └── ThemeContext.jsx    # Light/Dark theme state, localStorage
│   ├── data/
│   │   └── tools.js         # Central registry of tool metadata & categories
│   ├── hooks/
│   │   └── usePageMeta.js   # Dynamic page title, description & canonical tags
│   ├── i18n/
│   │   └── translations.js  # Bilingual Arabic and English dictionary
│   ├── layouts/
│   │   └── MainLayout.jsx   # Common layout wrapper with Header and Footer
│   ├── pages/
│   │   ├── Home.jsx         # Homepage with hero, search, features, and FAQ
│   │   ├── Tools.jsx        # Tools directory with category filtering
│   │   ├── WordCounter.jsx  # Tool 1: Live word and character counter
│   │   ├── PercentageCalculator.jsx # Tool 2: 4-mode percentage calculator
│   │   ├── GPACalculator.jsx # Tool 3: Configurable semester/CGPA calculator
│   │   ├── StudyPlanner.jsx # Tool 4: Task planner with local persistence
│   │   ├── CVBuilder.jsx    # Tool 5: Resume builder with live preview & print
│   │   ├── About.jsx        # Mission, privacy principles, and roadmap
│   │   ├── Contact.jsx      # Feedback form and email support
│   │   ├── PrivacyPolicy.jsx # Reviewable privacy policy template
│   │   ├── TermsOfUse.jsx   # Reviewable terms of service template
│   │   └── NotFound.jsx     # Custom 404 page with tool suggestions
│   ├── styles/
│   │   ├── variables.css    # Colors, shadows, borders, dark theme tokens
│   │   └── global.css       # Global layout, typography, print styles
│   ├── App.jsx              # Main React Router configuration
│   └── main.jsx             # React entry point with providers
├── index.html               # Main HTML entry with Google Fonts & JSON-LD
├── vite.config.js           # Vite configuration
├── package.json             # NPM dependencies and scripts
└── README.md                # Project documentation
```

---

## 🎨 How to Customize

### 1. Changing Brand Name and Colors
- **Colors**: Open `src/styles/variables.css` and modify `--color-primary` (currently `#2563eb`), `--color-accent` (`#0d9488`), and the dark mode tokens under `[data-theme="dark"]`.
- **Brand Name**: Edit `brandName` and `brandTagline` inside `src/i18n/translations.js`.

### 2. Updating Favicon & Logo
- Replace `public/favicon.svg` with your custom vector file.
- The in-app SVG logo is defined in `src/components/Logo.jsx`.

### 3. Adding a New Tool
1. Create your component in `src/pages/MyNewTool.jsx`.
2. Add the tool route to `src/App.jsx`.
3. Register the tool metadata in `src/data/tools.js` (title, description, category, icon, tags). It will automatically appear on the homepage, all tools directory, and search bar!

---

## 🚀 Free Hosting & Deployment Guide

Naf3ly Tools is a purely static front-end application with no server dependencies. You can host it 100% free on several providers.

### Option A: Cloudflare Pages (Recommended)
1. Push your project to GitHub.
2. Sign in to [Cloudflare Pages](https://pages.cloudflare.com/).
3. Click **Create a project** -> **Connect to Git** -> Select your repository.
4. Set Build Settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**. Cloudflare automatically honors `public/_redirects` for React Router URLs.

### Option B: Netlify
1. Log in to [Netlify](https://www.netlify.com/).
2. Drag and drop your `dist/` folder into Netlify, or connect your Git repository.
3. Build command: `npm run build`, Output directory: `dist`.

### Option C: GitHub Pages
1. Install `gh-pages`: `npm install -D gh-pages`
2. Add to `package.json` scripts: `"deploy": "gh-pages -d dist"`
3. Run `npm run build && npm run deploy`
*(The included `public/404.html` and receiver script in `index.html` ensure clean URL reloading on GitHub Pages).*

### Connecting a Custom Domain
All aforementioned providers allow connecting a custom domain (e.g. `naf3ly.com`) for free with automated SSL certificates. Follow the DNS instructions provided in your host's dashboard (typically adding CNAME or A records).

---

## 📢 Advertising & AdSense Compliance Guidelines

Naf3ly Tools has been designed to comply with Google AdSense best practices:
- **No Deceptive Click Placements**: Ad slots are placed comfortably below or alongside tool interfaces without obstructing buttons or input fields.
- **Transparent Layout**: Ad zones are designated cleanly without fake ad banners or misleading simulated interactions.
- **Privacy & Cookie Disclosure**: The privacy policy template contains explicit third-party cookie notifications required by Google when monetizing via AdSense.
- *Notice*: AdSense approval depends entirely on Google’s site quality review, unique value, and compliance checks. Creating ad slots does not guarantee advertising approval.

---

## ⚠️ Known Limitations & Future Roadmap

- **Client-Side Rendering (CSR)**: Because the app is rendered via React client-side, initial indexing on search engines that do not execute JavaScript quickly may take longer. For large-scale organic traffic growth, generating static HTML prerendered pages (e.g., via SSG) can be considered.
- **Device Synchronization**: Data saved in the Study Planner and CV Builder resides in the user's specific browser `localStorage`. It does not sync automatically across multiple devices (which ensures complete user privacy without accounts).
- **Future Enhancements**:
  - Export CV as DOCX format in addition to PDF.
  - Add GPA grade scale presets for specific Arab universities (e.g., KSU, Cairo University, KFUPM).
  - Add text diff comparison and plagiarism percentage estimators.

---

## 📄 License
This project is open-source and free for personal and educational use.

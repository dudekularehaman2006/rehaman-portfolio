# 🚀 Dudekula Rehaman — Interactive Engineering Portfolio

> **Computer Science & Engineering • Cloud Computing • DevOps • Software Engineering • Open to Opportunities**

An interactive personal engineering portfolio built for **Dudekula Rehaman**, combining a futuristic cyber-inspired interface with hands-on technical demonstrations.

The portfolio goes beyond a traditional resume website by including **interactive engineering simulators, a browser-based CLI terminal, cloud cost optimization concepts, algorithm visualizations, cybersecurity demonstrations, 3D UI interactions, and responsive frontend engineering.**

---

## 🌐 Live Portfolio

### 🔗 [https://rehaman-portfolio.vercel.app/](https://rehaman-portfolio.vercel.app/)

The portfolio is deployed on **Vercel** and connected to the GitHub repository for continuous deployment.

**Source Code:**  
[https://github.com/dudekularehaman2006/rehaman-portfolio](https://github.com/dudekularehaman2006/rehaman-portfolio)

---

## 📂 Project Directory Structure

```text
rehaman-portfolio/
│
├── index.html                   # Main portfolio application
├── README.md                    # Project documentation
│
└── assets/
    ├── css/
    │   ├── main.css             # Main design system, layouts and responsive styles
    │   ├── cyber-theme.css      # Cyber-themed UI components and visual effects
    │   ├── interactive-labs.css # Interactive engineering simulator styles
    │   └── terminal.css         # Terminal interface and matrix effects
    │
    └── js/
        ├── sound-effects.js        # Native Web Audio API sound effects
        ├── particle-canvas.js      # Interactive particle background
        ├── interactive-terminal.js # Browser-based CLI terminal
        ├── simulators.js            # Interactive engineering simulators
        ├── project-modals.js        # Project information modals
        └── main.js                  # Main UI logic, animations and interactions
```

---

# ⚡ Key Interactive Features

## 1. ☁️ SkyDeploy — AWS S3 Cost Optimizer Simulator

An interactive cloud cost optimization simulator demonstrating how AWS S3 lifecycle policies can reduce storage costs.

### Features

- Interactive storage volume configuration
- Object version count configuration
- Retention period controls
- S3 Standard vs Glacier cost comparison
- Estimated annual savings calculation
- AWS Boto3 lifecycle policy generation
- Interactive cost analysis

### Concepts Demonstrated

`AWS S3` · `Lifecycle Policies` · `Cloud Cost Optimization` · `Boto3`

---

## 2. 💿 Disk Scheduling Algorithm Visualizer

An interactive visualization of operating-system disk scheduling algorithms.

### Supported Algorithms

- FCFS — First Come First Serve
- SSTF — Shortest Seek Time First
- SCAN
- C-SCAN

The simulator allows users to configure disk requests and visualize disk-head movement using an HTML5 Canvas while calculating seek-related performance metrics.

### Concepts Demonstrated

`Data Structures` · `Algorithms` · `Operating Systems` · `HTML5 Canvas` · `Algorithm Visualization`

---

## 3. 🛡️ CyberShield AI — Threat Scanner Simulator

An interactive cybersecurity demonstration covering common security-analysis scenarios.

### Demonstrations

- Phishing URL analysis
- AWS IAM policy analysis
- Password entropy evaluation
- Security-oriented prompt testing

### Concepts Demonstrated

`Cybersecurity` · `AWS IAM` · `Threat Analysis` · `Password Security` · `AI-assisted Security`

---

# 🖥️ Interactive CLI Terminal

The portfolio includes a browser-based command-line interface designed to simulate a developer terminal.

### Available Commands

```text
help
whoami
skills
projects
project <id>
matrix
resume
certs
contact
theme <name>
sudo hire
clear
```

### Terminal Features

- Command parser
- Command history
- Up/Down arrow navigation
- Tab auto-completion
- Keyboard interaction
- Project exploration
- Resume access
- Theme switching
- Matrix-style visual effect

### 🟢 Easter Egg

Try:

```text
matrix
```

to activate the animated digital-code effect.

---

# 🪪 3D Interactive Hologram ID Card

The portfolio includes an interactive 3D identity card that responds to mouse movement.

### Features

- Perspective-based 3D tilt
- Dynamic lighting effects
- Interactive mouse tracking
- Academic information
- Engineering profile information

The component demonstrates frontend interaction using CSS transformations and JavaScript.

---

# 🔊 Web Audio Synthesizer

The interface includes lightweight futuristic sound effects generated directly through the browser's **Web Audio API**.

### Features

- Native browser audio synthesis
- No external audio assets required
- Interactive sound toggle
- Persistent sound preference using `localStorage`

---

# 📄 Resume Integration

The portfolio includes direct access to the current resume through the Resume section.

Users can view or download the resume directly from the portfolio.

> Resume access is provided through the portfolio's dedicated Resume section.

---

# 🧠 Engineering Philosophy

The portfolio also presents several engineering principles that guide the projects and technical work:

### 🔐 Security by Design

Considering security requirements while designing systems instead of treating security as an afterthought.

### ☁️ Cost-Aware Cloud Architecture

Designing cloud systems with attention to resource usage, scalability, reliability, and operational cost.

### 🧮 Algorithmic Rigor

Understanding the computational complexity and trade-offs behind algorithms rather than treating them as black boxes.

### 🔗 Decoupled Systems

Designing components with clear responsibilities and interfaces to improve maintainability and scalability.

---

# 🎨 Theme Engine

The portfolio supports multiple visual themes:

- 🔵 Cyber Cyan
- 🟢 Matrix Emerald
- 🟣 Electric Violet

The theme system provides a different visual experience while maintaining the same underlying application structure.

---

# 🛠️ Technology Stack

| Technology | Usage |
|---|---|
| HTML5 | Semantic structure and application markup |
| CSS3 | Responsive layouts, animations and visual design |
| JavaScript | Application logic and interactivity |
| HTML5 Canvas | Algorithm and particle visualizations |
| Web Audio API | Browser-generated sound effects |
| LocalStorage | Client-side preference persistence |
| Git | Version control |
| GitHub | Source code management |
| Vercel | Production deployment |

---

# 📊 Engineering Areas Demonstrated

This portfolio combines concepts from multiple areas of Computer Science:

```text
Cloud Computing
      │
      ├── AWS S3
      ├── Cloud Cost Optimization
      └── IAM Concepts
           
DevOps
      │
      ├── Git
      ├── GitHub
      └── Continuous Deployment

Software Engineering
      │
      ├── JavaScript
      ├── Responsive UI
      ├── Modular Assets
      └── Browser APIs

Computer Science
      │
      ├── Data Structures
      ├── Algorithms
      └── Operating Systems

Security
      │
      ├── IAM
      ├── Threat Analysis
      └── Password Security
```

---

# 📁 Project Architecture

The project follows a lightweight static frontend architecture.

```text
                    ┌─────────────────────┐
                    │      index.html     │
                    │   Portfolio UI      │
                    └──────────┬──────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ▼              ▼              ▼
          ┌──────────┐   ┌──────────┐   ┌────────────┐
          │   CSS    │   │    JS    │   │   Canvas   │
          │ Styling  │   │ Logic    │   │ Visuals    │
          └──────────┘   └──────────┘   └────────────┘
                │              │              │
                └──────────────┼──────────────┘
                               ▼
                    ┌─────────────────────┐
                    │     Web Browser     │
                    └─────────────────────┘
```

---

# ⚡ Run Locally

This is a static frontend project and does **not** require Node.js, npm, Maven, or a backend server.

## Clone the Repository

```bash
git clone https://github.com/dudekularehaman2006/rehaman-portfolio.git
```

## Enter the Project

```bash
cd rehaman-portfolio
```

## Option 1 — Open Directly

Open:

```text
index.html
```

in a modern browser.

## Option 2 — Run a Local Server

If Python is installed:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

---

# 🚀 Production Deployment

The portfolio is deployed using **Vercel**.

### Deployment Architecture

```text
┌─────────────────────┐
│   Local Development │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│        Git          │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│       GitHub        │
│  Source Repository  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│       Vercel        │
│ Continuous Deploy   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Production Website  │
└─────────────────────┘
```

### Production URL

🔗 **[https://rehaman-portfolio.vercel.app/](https://rehaman-portfolio.vercel.app/)**

### Repository

🔗 **[https://github.com/dudekularehaman2006/rehaman-portfolio](https://github.com/dudekularehaman2006/rehaman-portfolio)**

---

# 🔄 Continuous Deployment

The GitHub repository is connected to Vercel.

Whenever changes are pushed to the `main` branch:

```text
git add .
      ↓
git commit
      ↓
git push
      ↓
GitHub
      ↓
Vercel
      ↓
New Production Deployment
```

This allows the live portfolio to stay synchronized with the GitHub repository.

---

# 🎯 Project Goals

The primary goal of this project is to create a portfolio that demonstrates technical ability through **working interactive experiences**, rather than relying only on written descriptions.

The project focuses on:

- Building interactive web experiences
- Demonstrating Computer Science concepts
- Showcasing cloud and DevOps interests
- Presenting engineering projects
- Practicing frontend architecture
- Using Git and GitHub effectively
- Deploying a production website
- Maintaining a continuously deployable project

---

# 📌 Quick Links

| Resource | Link |
|---|---|
| 🌐 Live Portfolio | [rehaman-portfolio.vercel.app](https://rehaman-portfolio.vercel.app/) |
| 💻 GitHub Repository | [rehaman-portfolio](https://github.com/dudekularehaman2006/rehaman-portfolio) |

---

# 👨‍💻 Author

**Dudekula Rehaman**

Computer Science & Engineering Student

Interested in:

`Cloud Computing` · `DevOps` · `AWS` · `Linux` · `Software Engineering`

---

> **Build. Understand. Demonstrate. Deploy.**

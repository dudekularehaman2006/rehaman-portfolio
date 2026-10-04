/**
 * INTERACTIVE CYBER COMMAND CENTER / CLI TERMINAL
 * Full CLI simulator with command parsing, history, tab-completion,
 * matrix rain easter egg, and system control.
 */

(function () {
  const terminalOverlay = document.getElementById('terminal-overlay');
  const terminalInput = document.getElementById('term-input');
  const terminalHistory = document.getElementById('term-history');
  const terminalCloseBtn = document.getElementById('term-close-btn');
  const terminalOpenBtns = document.querySelectorAll('.open-terminal-btn');
  const matrixCanvas = document.getElementById('matrix-canvas');

  let historyList = [];
  let historyIndex = -1;
  let matrixInterval = null;

  const COMMANDS = {
    help: 'List all available terminal commands',
    whoami: 'Display profile & engineering background for Dudekula Rehaman',
    skills: 'Display categorized technical mastery matrix',
    projects: 'List production projects and system architectures',
    project: 'Inspect project details. Usage: project [skydeploy|cybershield|disksim]',
    certs: 'Show verified industry certifications & training',
    edu: 'View academic background & university records',
    contact: 'Display direct communication channels & coordinates',
    resume: 'Download latest official engineering resume PDF',
    matrix: 'Toggle cyberpunk digital matrix rain mode',
    theme: 'Change UI theme palette. Usage: theme [cyan|matrix|violet]',
    clear: 'Clear terminal screen buffer',
    'sudo hire': 'Execute immediate candidate acquisition protocol'
  };

  // Open & Close Modal
  function openTerminal() {
    terminalOverlay.classList.add('open');
    window.soundEngine?.playModal();
    setTimeout(() => terminalInput.focus(), 100);
  }

  function closeTerminal() {
    terminalOverlay.classList.remove('open');
    window.soundEngine?.playClick();
  }

  terminalOpenBtns.forEach(btn => btn.addEventListener('click', openTerminal));
  if (terminalCloseBtn) terminalCloseBtn.addEventListener('click', closeTerminal);

  terminalOverlay.addEventListener('click', (e) => {
    if (e.target === terminalOverlay) closeTerminal();
  });

  // Matrix Rain Engine
  function toggleMatrixRain() {
    if (!matrixCanvas) return;
    const isActive = matrixCanvas.classList.toggle('active');

    if (isActive) {
      const ctx = matrixCanvas.getContext('2d');
      matrixCanvas.width = window.innerWidth;
      matrixCanvas.height = window.innerHeight;

      const chars = '01ABCDEF0123456789$#%&*<>{}[]λΩμ§';
      const fontSize = 14;
      const columns = Math.floor(matrixCanvas.width / fontSize);
      const drops = Array(columns).fill(1);

      matrixInterval = setInterval(() => {
        ctx.fillStyle = 'rgba(4, 7, 12, 0.08)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

        ctx.fillStyle = '#00f5d4';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = chars.charAt(Math.floor(Math.random() * chars.length));
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }, 33);
      return '>> Matrix rain initialized. Enter "matrix" again to deactivate.';
    } else {
      if (matrixInterval) clearInterval(matrixInterval);
      const ctx = matrixCanvas.getContext('2d');
      ctx.clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
      return '>> Matrix rain terminated. Normal display restored.';
    }
  }

  // Command Execution
  function executeCommand(rawCmd) {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    historyList.push(trimmed);
    historyIndex = historyList.length;

    // Echo input
    appendOutput(`rehaman@cyber-terminal:~$ ${trimmed}`, 'highlight');

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    switch (cmd) {
      case 'help':
        let helpText = 'Available Cyber Commands:\n';
        for (let [k, v] of Object.entries(COMMANDS)) {
          helpText += `  \x1b[36m${k.padEnd(14)}\x1b[0m - ${v}\n`;
        }
        appendOutput(helpText, 'info');
        break;

      case 'whoami':
        appendOutput(
`======================================================
DUDEKULA REHAMAN | Core Computer Science & Systems Engineer
======================================================
Location:       Punjab (University) • Andhra Pradesh (Native), India
Education:      Bachelor of Technology (B.Tech) in CSE, LPU
Academic Rank:  CGPA: 7.95/10
Internship:     CloudCraft (Cloud Computing & DevOps)
Profile:        Core Computer Science & Engineering student with strong
                foundation in algorithms, cloud infrastructure & full-stack.
Status:         Open for all Software Engineering & Systems roles.`, 'info');
        break;

      case 'skills':
        appendOutput(
`TECHNICAL SKILLS MATRIX:
• Languages:       Python, C++, SQL, JavaScript (ES6+), HTML5, CSS3
• Cloud & Infra:   AWS (EC2, S3, IAM, VPC, RDS, Lambda), Apache CloudStack
• DevOps & Tools:  Docker, Git, GitHub, Linux/Ubuntu, CI/CD, MySQL
• Architecture:    REST API, Boto3 SDK, Flask Backend, System Hardening
• Soft Skills:     Analytical Thinking, Problem Solving, Teamwork`, 'success');
        break;

      case 'projects':
        appendOutput(
`FEATURED PRODUCTION PROJECTS:
[1] skydeploy    - AWS S3 Lifecycle & Versioning Cost Optimizer (Flask/Boto3/MySQL)
[2] cybershield  - AI-Powered Cybersecurity Assistant (Groq LLaMA 3.1/Flask/React)
[3] disksim      - Advanced Disk Scheduling OS Simulator (FCFS/SSTF/SCAN/C-SCAN)

Type "project <id>" to view full architectural details.`, 'info');
        break;

      case 'project':
        if (!arg) {
          appendOutput('Usage: project [skydeploy | cybershield | disksim]', 'error');
        } else if (arg.includes('sky') || arg === '1') {
          appendOutput(
`PROJECT: SkyDeploy – AWS S3 Lifecycle & Versioning Cost Optimizer
- Stack: Python, Flask, AWS S3, Boto3, MySQL, Bootstrap
- Features: 7 core storage features, version restoration, automated lifecycle policies.
- Impact: 5-metric cost dashboard tracking file counts, storage, active versions, monthly spend and projected savings.`, 'success');
          window.openProjectModal?.('skydeploy');
        } else if (arg.includes('cyber') || arg === '2') {
          appendOutput(
`PROJECT: CyberShield AI – AI Cybersecurity Assistant
- Stack: Python, Flask, Groq LLaMA 3.1 API, React, Render, GitHub Pages
- Features: 3-layer decoupled architecture, phishing detection, malware defense guidance.
- Impact: Tested with 50+ security queries; sub-second LLM inference via Groq cloud.`, 'success');
          window.openProjectModal?.('cybershield');
        } else if (arg.includes('disk') || arg === '3') {
          appendOutput(
`PROJECT: Advanced Disk Scheduling Simulator
- Stack: HTML5, CSS3, JavaScript ES6+, OS Principles, Data Structures
- Features: Interactive comparison of FCFS, SSTF, SCAN, and C-SCAN.
- Impact: O(n log n) seek execution, real-time recalculation of head seek time & throughput.`, 'success');
          window.openProjectModal?.('disksim');
        } else {
          appendOutput(`Unknown project identifier "${arg}". Available: skydeploy, cybershield, disksim`, 'error');
        }
        break;

      case 'certs':
        appendOutput(
`VERIFIED CERTIFICATIONS & ACCREDITATIONS:
• AWS Academy Cloud Practitioner          [May 2026]
• DevOps Certification – GeeksforGeeks    [July 2026]
• C++ Fundamentals – Infosys Springboard  [August 2025]
• SQL Essentials – Infosys Springboard    [August 2026]`, 'success');
        break;

      case 'edu':
        appendOutput(
`ACADEMIC CREDENTIALS:
1. Lovely Professional University (July 2024 – Present)
   - Bachelor of Technology (B.Tech) in Computer Science and Engineering
   - Core CSE Discipline • Open For All Software Domains | CGPA: 7.95
2. SreeVidya Junior College (May 2024)
   - Intermediate (MPC) • Proddatur, Andhra Pradesh | Score: 90%
3. Jeevan Jyothi High School (April 2022)
   - Secondary School Certificate (SSC) • Proddatur, Andhra Pradesh | Score: 87%`, 'info');
        break;

      case 'contact':
        appendOutput(
`COMMUNICATION COORDINATES:
• Email:      rehamandudekula77@gmail.com
• Phone:      +91 8688803746
• LinkedIn:   https://www.linkedin.com/in/dudekula-rehaman-523788321/
• GitHub:     https://github.com/dudekularehaman2006`, 'highlight');
        break;

      case 'resume':
        appendOutput('Triggering direct resume download protocol...', 'success');
        window.soundEngine?.playSuccess();
        const driveDirect = 'https://drive.google.com/uc?export=download&id=1_aTO5HzmB3VFalkCwZp41Kcx_EbTfN6x';
        window.open(driveDirect, '_blank');
        break;

      case 'matrix':
        const res = toggleMatrixRain();
        appendOutput(res, 'success');
        break;

      case 'theme':
        if (arg === 'matrix') {
          document.body.className = 'theme-matrix';
          appendOutput('Theme switched to Matrix Emerald.', 'success');
        } else if (arg === 'violet') {
          document.body.className = 'theme-violet';
          appendOutput('Theme switched to Electric Violet.', 'success');
        } else if (arg === 'cyan' || arg === 'default') {
          document.body.className = '';
          appendOutput('Theme restored to Cyber Cyan.', 'success');
        } else {
          appendOutput('Valid themes: cyan, matrix, violet', 'error');
        }
        break;

      case 'clear':
        terminalHistory.innerHTML = '';
        return;

      case 'sudo':
        if (arg === 'hire') {
          window.soundEngine?.playSuccess();
          appendOutput(
`[SUCCESS] ROOT ACCESS GRANTED!
>> Candidate: Dudekula Rehaman
>> Availability: Immediate / High-Priority
>> Action: Preparing welcome packet. Direct line: +91 8688803746
>> Email: rehamandudekula77@gmail.com
>> Thank you for choosing top-tier engineering talent!`, 'success');
        } else {
          appendOutput(`sudo: ${arg}: command not recognized. Try "sudo hire"`, 'error');
        }
        break;

      default:
        appendOutput(`Command not found: "${cmd}". Type "help" for a list of valid commands.`, 'error');
    }
  }

  function appendOutput(text, type = '') {
    const div = document.createElement('div');
    div.className = `term-line-output ${type}`;
    div.innerText = text;
    terminalHistory.appendChild(div);
    terminalHistory.scrollTop = terminalHistory.scrollHeight;
  }

  // Key Listeners
  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      window.soundEngine?.playKey();

      if (e.key === 'Enter') {
        const val = terminalInput.value;
        terminalInput.value = '';
        executeCommand(val);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyList.length > 0 && historyIndex > 0) {
          historyIndex--;
          terminalInput.value = historyList[historyIndex] || '';
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < historyList.length - 1) {
          historyIndex++;
          terminalInput.value = historyList[historyIndex] || '';
        } else {
          historyIndex = historyList.length;
          terminalInput.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const cur = terminalInput.value.toLowerCase().trim();
        const match = Object.keys(COMMANDS).find(c => c.startsWith(cur));
        if (match) terminalInput.value = match;
      }
    });
  }

  // Global Keyboard Shortcuts (~ or ` opens terminal, Esc closes)
  window.addEventListener('keydown', (e) => {
    if (e.key === '`' || e.key === '~') {
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        if (terminalOverlay.classList.contains('open')) closeTerminal();
        else openTerminal();
      }
    } else if (e.key === 'Escape') {
      if (terminalOverlay.classList.contains('open')) closeTerminal();
    }
  });

  window.openTerminalModal = openTerminal;
})();

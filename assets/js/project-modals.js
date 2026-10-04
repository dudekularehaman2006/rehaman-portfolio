/**
 * PROJECT ARCHITECTURE DEEP-DIVE MODALS & TOAST NOTIFICATION SYSTEM
 * Provides architectural diagrams, engineering hurdle breakdowns, and metrics.
 */

(function () {
  const modalOverlay = document.getElementById('deepdive-modal-overlay');
  const modalTitle = document.getElementById('modal-project-title');
  const modalSubtitle = document.getElementById('modal-project-sub');
  const modalFlowDiagram = document.getElementById('modal-flow-diagram');
  const modalProblem = document.getElementById('modal-problem-desc');
  const modalSolution = document.getElementById('modal-solution-desc');
  const modalMetrics = document.getElementById('modal-metrics-grid');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  const PROJECT_DATA = {
    skydeploy: {
      title: 'SkyDeploy: AWS S3 Lifecycle & Versioning Cost Optimizer',
      subtitle: 'Cloud Computing & DevOps Architecture • June – July 2026',
      nodes: [
        { title: 'Frontend UI', sub: 'Bootstrap 5 Client' },
        { title: 'Flask REST API', sub: 'Python Backend' },
        { title: 'Boto3 AWS SDK', sub: 'IAM Authenticated' },
        { title: 'Amazon S3 & MySQL', sub: 'Lifecycle Tiering' }
      ],
      problem: 'Uncontrolled enterprise cloud storage costs caused by orphaned object versions, unconfigured retention policies, and lack of real-time visibility into bucket storage classes across AWS accounts.',
      solution: 'Engineered a full-stack automated storage platform featuring 7 core capabilities: version recovery, automated lifecycle transition policies from Standard to Glacier, IAM security roles, and a 5-metric financial health dashboard.',
      metrics: [
        { val: '5 Metrics', label: 'Storage & Cost Dashboard' },
        { val: 'Up to 70%', label: 'Cloud Storage Cost Reduction' },
        { val: '100%', label: 'Version Recovery Reliability' }
      ]
    },
    cybershield: {
      title: 'CyberShield AI: AI-Powered Cybersecurity Assistant',
      subtitle: 'Zero-Latency LLM Inference & Threat Detection • April 2026',
      nodes: [
        { title: 'React Frontend', sub: 'GitHub Pages Hosted' },
        { title: 'Flask API Proxy', sub: 'Render Cloud Deployment' },
        { title: 'Groq Cloud Engine', sub: 'LLaMA 3.1 Inference' },
        { title: 'Threat Intelligence', sub: 'Real-Time Heuristics' }
      ],
      problem: 'High response latency, API throttling, and high infrastructure expenses when deploying real-time cybersecurity threat awareness, malware analysis, and phishing defense to everyday users.',
      solution: 'Constructed an ultra-fast, 3-layer decoupled architecture utilizing the Groq LLaMA 3.1 LLM inference API via Flask. Configured production CI/CD pipelines, robust rate-limiting, CORS handling, and fallback resilience.',
      metrics: [
        { val: '50+ Tests', label: 'Security Query Benchmarks' },
        { val: '< 600ms', label: 'Average Token Response Latency' },
        { val: 'Dual Host', label: 'GitHub Pages + Render PaaS' }
      ]
    },
    disksim: {
      title: 'Advanced Disk Scheduling Simulator',
      subtitle: 'Operating Systems Algorithmic Benchmarking • February 2026',
      nodes: [
        { title: 'Input Interface', sub: 'Dynamic Head & Queue' },
        { title: 'Scheduling Core', sub: 'FCFS / SSTF / SCAN / C-SCAN' },
        { title: 'Math Engine', sub: 'O(n log n) Seek Calc' },
        { title: 'Visualizer Canvas', sub: 'Interactive Head Plotting' }
      ],
      problem: 'Abstract operating systems disk scheduling concepts (FCFS, SSTF, SCAN, C-SCAN) lack visual clarity, making it difficult to benchmark seek-time overhead, request starvation risks, and elevator algorithm behavior.',
      solution: 'Developed an interactive web-based simulator executing four core OS scheduling algorithms with accurate cylinder movement calculations, customizable disk parameters (0-199 cylinders), and real-time seek path visualization.',
      metrics: [
        { val: '4 Algorithms', label: 'FCFS, SSTF, SCAN, C-SCAN' },
        { val: 'O(n log n)', label: 'Algorithmic Complexity' },
        { val: 'Real-Time', label: 'Interactive Canvas Plotting' }
      ]
    }
  };

  function openProjectModal(projectId) {
    const data = PROJECT_DATA[projectId];
    if (!data || !modalOverlay) return;

    modalTitle.innerText = data.title;
    modalSubtitle.innerText = data.subtitle;
    modalProblem.innerText = data.problem;
    modalSolution.innerText = data.solution;

    // Render nodes
    modalFlowDiagram.innerHTML = '';
    data.nodes.forEach((node, i) => {
      const nodeEl = document.createElement('div');
      nodeEl.className = 'arch-node';
      nodeEl.innerHTML = `
        <div class="arch-node-title">${node.title}</div>
        <div class="arch-node-sub">${node.sub}</div>
      `;
      modalFlowDiagram.appendChild(nodeEl);

      if (i < data.nodes.length - 1) {
        const arrow = document.createElement('div');
        arrow.className = 'arch-arrow';
        arrow.innerText = '➔';
        modalFlowDiagram.appendChild(arrow);
      }
    });

    // Render metrics
    modalMetrics.innerHTML = '';
    data.metrics.forEach(m => {
      const box = document.createElement('div');
      box.className = 'deepdive-stat-box';
      box.innerHTML = `
        <div class="stat-box-val">${m.val}</div>
        <div class="stat-box-label">${m.label}</div>
      `;
      modalMetrics.appendChild(box);
    });

    modalOverlay.classList.add('open');
    window.soundEngine?.playModal();
  }

  function closeProjectModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('open');
      window.soundEngine?.playClick();
    }
  }

  document.querySelectorAll('.open-deepdive-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project');
      openProjectModal(id);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeProjectModal();
    });
  }

  window.openProjectModal = openProjectModal;

  // ==========================================
  // TOAST NOTIFICATION SYSTEM
  // ==========================================
  const toastContainer = document.getElementById('toast-container');

  window.showToast = function (message, type = 'info') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'cyber-toast';
    toast.innerHTML = `
      <span style="color: var(--primary-glow); font-size: 1.1rem;">⚡</span>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };
})();

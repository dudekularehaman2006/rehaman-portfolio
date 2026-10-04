/**
 * LIVE ENGINEERING SIMULATORS & INTERACTIVE LABS
 * 1. SkyDeploy AWS S3 Lifecycle & Cost Optimizer
 * 2. Advanced Disk Scheduling Algorithm Visualizer (FCFS, SSTF, SCAN, C-SCAN)
 * 3. CyberShield AI Threat Scanner (Groq LLaMA 3.1 Engine)
 */

(function () {
  // Tab Switching
  const tabBtns = document.querySelectorAll('.lab-tab-btn');
  const tabPanels = document.querySelectorAll('.lab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      window.soundEngine?.playClick();
      const targetId = btn.getAttribute('data-target');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');

      if (targetId === 'lab-disksim') {
        setTimeout(runDiskSimulation, 100);
      }
    });
  });

  // ===================================================================
  // LAB 1: SKYDEPLOY S3 COST & LIFECYCLE OPTIMIZER
  // ===================================================================
  const sliderStorage = document.getElementById('s3-storage-slider');
  const sliderVersions = document.getElementById('s3-versions-slider');
  const sliderDays = document.getElementById('s3-days-slider');

  const valStorage = document.getElementById('val-s3-storage');
  const valVersions = document.getElementById('val-s3-versions');
  const valDays = document.getElementById('val-s3-days');

  const displayStandardCost = document.getElementById('s3-standard-cost');
  const displayOptimizedCost = document.getElementById('s3-optimized-cost');
  const displaySavingsPercent = document.getElementById('s3-savings-percent');
  const displayAnnualSavings = document.getElementById('s3-annual-savings');
  const policyCodeBlock = document.getElementById('s3-policy-code');
  const copyPolicyBtn = document.getElementById('copy-policy-btn');

  function calculateS3Savings() {
    if (!sliderStorage) return;

    const storageGB = parseInt(sliderStorage.value, 10);
    const versions = parseInt(sliderVersions.value, 10);
    const transitionDays = parseInt(sliderDays.value, 10);

    if (valStorage) valStorage.innerText = `${storageGB.toLocaleString()} GB`;
    if (valVersions) valVersions.innerText = `${versions} versions`;
    if (valDays) valDays.innerText = `${transitionDays} days`;

    // AWS Pricing (US East standard estimates)
    // S3 Standard: $0.023 / GB / month
    // S3 Glacier Flexible: $0.0036 / GB / month
    const totalRawGB = storageGB * versions;
    const monthlyStandard = totalRawGB * 0.023;

    // In SkyDeploy lifecycle optimization:
    // 1 active version stays on S3 Standard ($0.023/GB)
    // Previous (versions - 1) transition to Glacier after specified days ($0.0036/GB)
    const activeGB = storageGB;
    const historicalGB = storageGB * (versions - 1);
    const monthlyOptimized = (activeGB * 0.023) + (historicalGB * 0.0036);

    const monthlySaved = Math.max(0, monthlyStandard - monthlyOptimized);
    const annualSaved = monthlySaved * 12;
    const pctSaved = monthlyStandard > 0 ? Math.round((monthlySaved / monthlyStandard) * 100) : 0;

    if (displayStandardCost) displayStandardCost.innerText = `$${monthlyStandard.toFixed(2)}/mo`;
    if (displayOptimizedCost) displayOptimizedCost.innerText = `$${monthlyOptimized.toFixed(2)}/mo`;
    if (displaySavingsPercent) displaySavingsPercent.innerText = `${pctSaved}% SAVED`;
    if (displayAnnualSavings) displayAnnualSavings.innerText = `+$${Math.round(annualSaved).toLocaleString()} / year projected`;

    if (policyCodeBlock) {
      policyCodeBlock.innerText = JSON.stringify({
        "Rules": [
          {
            "ID": "SkyDeploy-Automated-Cost-Optimizer",
            "Status": "Enabled",
            "Filter": { "Prefix": "production-data/" },
            "NoncurrentVersionTransitions": [
              {
                "NoncurrentDays": transitionDays,
                "StorageClass": "GLACIER"
              }
            ],
            "NoncurrentVersionExpiration": {
              "NoncurrentDays": transitionDays + 365
            }
          }
        ]
      }, null, 2);
    }
  }

  [sliderStorage, sliderVersions, sliderDays].forEach(slider => {
    if (slider) {
      slider.addEventListener('input', () => {
        window.soundEngine?.playHover();
        calculateS3Savings();
      });
    }
  });

  if (copyPolicyBtn) {
    copyPolicyBtn.addEventListener('click', () => {
      if (policyCodeBlock) {
        navigator.clipboard.writeText(policyCodeBlock.innerText);
        window.soundEngine?.playSuccess();
        window.showToast?.('AWS Boto3 Lifecycle Policy JSON copied to clipboard!', 'success');
      }
    });
  }

  // ===================================================================
  // LAB 2: ADVANCED DISK SCHEDULING SIMULATOR
  // ===================================================================
  const diskHeadInput = document.getElementById('disk-head-input');
  const diskRequestsInput = document.getElementById('disk-requests-input');
  const diskAlgoSelect = document.getElementById('disk-algo-select');
  const runDiskBtn = document.getElementById('run-disk-btn');

  const diskTotalSeek = document.getElementById('disk-total-seek');
  const diskAvgSeek = document.getElementById('disk-avg-seek');
  const diskSeqOutput = document.getElementById('disk-seq-output');
  const diskCanvas = document.getElementById('disk-seek-canvas');

  function calculateDiskScheduling(initialHead, requests, algo, maxCylinders = 199) {
    let sequence = [initialHead];
    let totalHeadMovements = 0;
    let reqs = [...requests];

    if (algo === 'FCFS') {
      sequence = [initialHead, ...reqs];
    } else if (algo === 'SSTF') {
      let current = initialHead;
      let remaining = [...reqs];
      while (remaining.length > 0) {
        let closestIdx = 0;
        let minDiff = Math.abs(current - remaining[0]);
        for (let i = 1; i < remaining.length; i++) {
          let diff = Math.abs(current - remaining[i]);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = i;
          }
        }
        current = remaining.splice(closestIdx, 1)[0];
        sequence.push(current);
      }
    } else if (algo === 'SCAN') {
      // Moves towards upper cylinder 199, then reverses
      let left = reqs.filter(r => r < initialHead).sort((a, b) => b - a);
      let right = reqs.filter(r => r >= initialHead).sort((a, b) => a - b);
      sequence = [initialHead, ...right];
      if (right.length > 0 && Math.max(...reqs) < maxCylinders) {
        sequence.push(maxCylinders);
      }
      sequence = sequence.concat(left);
    } else if (algo === 'C-SCAN') {
      // Moves to 199, wraps around to 0, then continues upwards
      let left = reqs.filter(r => r < initialHead).sort((a, b) => a - b);
      let right = reqs.filter(r => r >= initialHead).sort((a, b) => a - b);
      sequence = [initialHead, ...right, maxCylinders, 0, ...left];
    }

    // Compute seek count
    for (let i = 0; i < sequence.length - 1; i++) {
      totalHeadMovements += Math.abs(sequence[i] - sequence[i + 1]);
    }

    const avgSeek = (totalHeadMovements / requests.length).toFixed(1);
    return { sequence, totalHeadMovements, avgSeek };
  }

  function drawDiskCanvas(sequence, maxCylinders = 199) {
    if (!diskCanvas) return;
    const ctx = diskCanvas.getContext('2d');
    const w = diskCanvas.width = diskCanvas.offsetWidth;
    const h = diskCanvas.height = diskCanvas.offsetHeight;

    ctx.clearRect(0, 0, w, h);

    // Padding
    const padX = 24;
    const padY = 24;
    const usableW = w - padX * 2;
    const usableH = h - padY * 2;

    // Draw background track gridlines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    [0, 50, 100, 150, 199].forEach(pos => {
      const x = padX + (pos / maxCylinders) * usableW;
      ctx.beginPath();
      ctx.moveTo(x, padY);
      ctx.lineTo(x, h - padY);
      ctx.stroke();
    });

    if (sequence.length < 2) return;

    // Plot Seek Trace Line
    const activeColor = getComputedStyle(document.body).getPropertyValue('--primary-glow').trim() || '#00f5d4';
    ctx.strokeStyle = activeColor;
    ctx.lineWidth = 2.5;
    ctx.shadowBlur = 10;
    ctx.shadowColor = activeColor;

    ctx.beginPath();
    sequence.forEach((cyl, i) => {
      const x = padX + (cyl / maxCylinders) * usableW;
      const y = padY + (i / (sequence.length - 1)) * usableH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw Cylinder Nodes
    sequence.forEach((cyl, i) => {
      const x = padX + (cyl / maxCylinders) * usableW;
      const y = padY + (i / (sequence.length - 1)) * usableH;

      ctx.beginPath();
      ctx.arc(x, y, i === 0 ? 6 : 4, 0, Math.PI * 2);
      ctx.fillStyle = i === 0 ? '#ff007f' : '#ffffff';
      ctx.fill();

      // Number label
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText(cyl, x - 8, y - 8);
    });
  }

  function runDiskSimulation() {
    if (!diskHeadInput || !diskRequestsInput || !diskAlgoSelect) return;

    const head = parseInt(diskHeadInput.value, 10) || 50;
    const reqs = diskRequestsInput.value
      .split(',')
      .map(x => parseInt(x.trim(), 10))
      .filter(x => !isNaN(x) && x >= 0 && x <= 199);

    const algo = diskAlgoSelect.value;
    const result = calculateDiskScheduling(head, reqs, algo);

    if (diskTotalSeek) diskTotalSeek.innerText = `${result.totalHeadMovements} cyl`;
    if (diskAvgSeek) diskAvgSeek.innerText = `${result.avgSeek} cyl`;
    if (diskSeqOutput) diskSeqOutput.innerText = result.sequence.join(' ➔ ');

    drawDiskCanvas(result.sequence);
    window.soundEngine?.playLaser();
  }

  if (runDiskBtn) runDiskBtn.addEventListener('click', runDiskSimulation);
  if (diskAlgoSelect) diskAlgoSelect.addEventListener('change', runDiskSimulation);

  // ===================================================================
  // LAB 3: CYBERSHIELD AI THREAT SCANNER
  // ===================================================================
  const aiQueryInput = document.getElementById('ai-query-input');
  const aiSubmitBtn = document.getElementById('ai-submit-btn');
  const aiStreamContent = document.getElementById('ai-stream-content');
  const threatBadge = document.getElementById('threat-level-badge');
  const samplePrompts = document.querySelectorAll('.sample-prompt-pill');

  const KNOWLEDGE_RESPONSES = {
    phishing: {
      level: 'CRITICAL',
      badgeClass: 'critical',
      text: 
`[ANALYSIS REPORT: CYBERSHIELD THREAT ENGINE v3.1]
=========================================================
Target: Suspected Credential Harvester Phishing URL
Pattern Match: Typosquatting domain targeting authentication flow.

FINDINGS:
1. Domain "paypa1-security.xyz" detected with character spoofing ("1" replacing "l").
2. High-urgency manipulative psychology ("Account locked!").
3. Missing EV certificate and invalid SPF/DKIM verification.

MITIGATION PROTOCOL:
• Block egress HTTP/HTTPS traffic to destination IP at gateway.
• Invalidate active session tokens for potentially compromised accounts.
• Enforce FIDO2 / WebAuthn hardware-bound MFA across infrastructure.
• Ingest indicators into CloudWatch / Security Hub threat feeds.`
    },
    iam: {
      level: 'AUDIT PASSED',
      badgeClass: 'low',
      text: 
`[ANALYSIS REPORT: AWS IAM LEAST-PRIVILEGE AUDIT]
=========================================================
Topic: Boto3 S3 Storage Lifecycle Pipeline Architecture

SECURITY HARDENING BLUEPRINT:
1. Principle of Least Privilege (PoLP):
   - Never use "s3:*" wildcard actions or AdministratorAccess.
   - Restrict PutObject, GetObject, and PutLifecycleConfiguration strictly to resource ARN: "arn:aws:s3:::skydeploy-vault/*".
2. Encryption at Rest & In-Transit:
   - Enforce "aws:SecureTransport": "true" via bucket policy (Deny HTTP).
   - Require SSE-KMS with customer-managed keys for sensitive payloads.
3. IAM Role Delegation:
   - Use IAM Instance Roles or ECS Task Execution Roles; never hardcode AWS credentials in Flask config.`
    },
    password: {
      level: 'HIGH RISK',
      badgeClass: 'medium',
      text: 
`[ANALYSIS REPORT: CREDENTIAL ENTROPY AUDIT]
=========================================================
Comparison: "Pass123!" vs "Kx9#mQ$8vL2!pZ"

ENTROPY BREAKDOWN:
• Candidate 1 ("Pass123!"):
  - Entropy: ~28 bits (Trivial dictionary mask attack).
  - Crack Time: < 350 milliseconds against modern GPU hash clusters (Hashcat / RTX 4090).
  - Vulnerability: Common word root + sequential digits.

• Candidate 2 ("Kx9#mQ$8vL2!pZ"):
  - Entropy: ~94.8 bits (High cryptanalytic security).
  - Crack Time: > 10,000 centuries under exhaustive brute-force.
  - Recommended Storage: Argon2id or bcrypt (cost factor >= 12) with unique salt.`
    },
    disk: {
      level: 'OPTIMIZED',
      badgeClass: 'low',
      text: 
`[ANALYSIS REPORT: OS KERNEL DISK SCHEDULER]
=========================================================
Topic: Algorithmic Request Queue Congestion & Seek Optimality

SYSTEM ARCHITECTURE ANALYSIS:
1. Starvation Vulnerability in SSTF:
   - High local request clusters cause distant requests to experience severe starvation.
2. SCAN / C-SCAN Elevator Resilience:
   - Guaranteed bounded wait time: C-SCAN provides uniform latency variance across all track cylinders (0 to 199).
3. Production Recommendation:
   - For I/O heavy workloads, couple C-SCAN with deadline scheduling to prevent read request timeouts.`
    }
  };

  let typewriterInterval = null;

  function streamAiResponse(analysis) {
    if (typewriterInterval) clearInterval(typewriterInterval);
    if (!aiStreamContent) return;

    if (threatBadge) {
      threatBadge.innerText = analysis.level;
      threatBadge.className = `threat-level-badge ${analysis.badgeClass}`;
    }

    aiStreamContent.innerText = '';
    let i = 0;
    const fullText = analysis.text;

    window.soundEngine?.playClick();

    typewriterInterval = setInterval(() => {
      if (i < fullText.length) {
        aiStreamContent.innerText += fullText.charAt(i);
        aiStreamContent.scrollTop = aiStreamContent.scrollHeight;
        if (i % 6 === 0) window.soundEngine?.playKey();
        i++;
      } else {
        clearInterval(typewriterInterval);
        window.soundEngine?.playSuccess();
      }
    }, 12);
  }

  function handleAiQuery() {
    const text = (aiQueryInput?.value || '').toLowerCase();
    if (!text.trim()) return;

    if (text.includes('phish') || text.includes('paypal') || text.includes('url')) {
      streamAiResponse(KNOWLEDGE_RESPONSES.phishing);
    } else if (text.includes('iam') || text.includes('aws') || text.includes('boto3') || text.includes('cloud')) {
      streamAiResponse(KNOWLEDGE_RESPONSES.iam);
    } else if (text.includes('password') || text.includes('strength') || text.includes('entropy')) {
      streamAiResponse(KNOWLEDGE_RESPONSES.password);
    } else {
      streamAiResponse(KNOWLEDGE_RESPONSES.disk);
    }
  }

  samplePrompts.forEach(p => {
    p.addEventListener('click', () => {
      const queryType = p.getAttribute('data-type');
      if (aiQueryInput) aiQueryInput.value = p.innerText;
      if (KNOWLEDGE_RESPONSES[queryType]) {
        streamAiResponse(KNOWLEDGE_RESPONSES[queryType]);
      }
    });
  });

  if (aiSubmitBtn) aiSubmitBtn.addEventListener('click', handleAiQuery);
  if (aiQueryInput) {
    aiQueryInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleAiQuery();
    });
  }

  // Initial calculations
  calculateS3Savings();
  setTimeout(runDiskSimulation, 400);
})();

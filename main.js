/* ============================================================
   zharkov@sec — interactive logic & 3D threat intelligence
   ============================================================ */
'use strict';

const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================================================
   1. MATRIX RAIN BACKGROUND
   ============================================================ */
(function matrixRain() {
  const canvas = $('#matrix');
  if (!canvas || REDUCED) return;
  const ctx = canvas.getContext('2d');
  const CHARS = 'アイウエオカキクケコサシスセソ0123456789ABCDEF<>/\\{}[]$#@+=*';
  let cols, drops, fontSize = 14;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: cols }, () => Math.random() * -60);
    ctx.fillStyle = '#04070a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  resize();
  window.addEventListener('resize', resize);

  setInterval(() => {
    ctx.fillStyle = 'rgba(4,7,10,0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + 'px JetBrains Mono, monospace';
    for (let i = 0; i < cols; i++) {
      const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      ctx.fillStyle = Math.random() > 0.975 ? '#aaffe0' : '#00ff9c';
      ctx.fillText(ch, x, y);
      if (y > canvas.height && Math.random() > 0.976) drops[i] = 0;
      drops[i]++;
    }
  }, 55);
})();

/* ============================================================
   2. i18n — HTML is the RU source of truth, EN lives here
   ============================================================ */
const TITLES = {
  ru: 'Алексей Жарков — Security Engineer / SOC / DFIR',
  en: 'Aleksei Zharkou — Security Engineer / SOC / DFIR'
};

const EN = {
  nav_home: 'about',
  nav_skills: 'skills',
  nav_projects: 'projects',
  nav_radar: '3d-radar',
  nav_exp: 'experience',
  nav_contact: 'contact',
  status_open: 'open to work',

  hero_kicker: 'root@zharkov: personal information-security hub',
  hero_name: 'ALEKSEI ZHARKOU',
  hero_sub: 'I build low-false-positive detections, investigate multi-stage intrusions and automate security with code. Blue Team / DFIR · Pentest · DevSecOps.',
  hero_cta1: 'projects',
  hero_cta_radar: '3d-radar',
  hero_cv: 'resume RU',
  hero_cta2: 'contact',

  stat1: 'open-source security projects',
  stat2: 'pytest tests in CI',
  stat3: 'hosts in the SOC lab',
  stat4: 'false positives (PipeShield)',

  about_title: 'cat about.txt',
  about_p1: 'Hands-on security engineer: DFIR incident response, Wazuh SIEM SOC monitoring, infrastructure & Active Directory penetration testing, Python DevSecOps tooling. Author of open-source detection engines ThreatPulse, PipeShield and Log Sentinel — with mathematical false-positive suppression (Shannon entropy), multi-layer log correlation, Threat Intelligence enrichment and native OASIS SARIF 2.1.0 / Wazuh CDB integration.',
  about_p2: 'Five years of clinical psychology and university teaching — a deep grasp of the human factor (social engineering, phishing, insiders), cool head during critical incidents and the skill of explaining technical reports to non-technical leadership.',
  about_li1: 'low-false-positive detections: Shannon entropy, multi-signal correlation;',
  about_li2: 'investigations "from web shell to Domain Admin" with a full evidence chain;',
  about_li3: 'AI-native development: directing Claude / Copilot agents with mandatory test verification.',

  id_name: 'Aleksei Zharkou',
  id_role: 'Security Engineer · SOC · DFIR · Pentest',
  id_base: 'base', id_base_v: 'Minsk, BY · remote / relocation',
  id_focus: 'focus', id_focus_v: 'Blue Team · AD Pentest · DevSecOps',
  id_stack: 'stack', id_stack_v: 'Python · Wazuh · Linux · AD',

  skills_title: 'nmap --arsenal -A', skills_sub: '// what I work with',
  sk1_t: 'Offensive Security &amp; AD',
  sk1_b1: 'Active Directory attacks', sk1_b2: 'Web / AppSec', sk1_b3: 'Password attacks',
  sk2_t: 'Blue Team, SOC &amp; DFIR',
  sk2_b1: 'DFIR &amp; forensics', sk2_b2: 'Detection engineering', sk2_b3: 'SIEM monitoring',
  sk3_t: 'DevSecOps &amp; Tooling',
  sk3_b1: 'Python', sk3_b2: 'SAST / secret detection', sk3_b3: 'CI/CD security',
  sk4_t: 'Networks &amp; SysAdmin',
  sk4_b1: 'Linux', sk4_b2: 'Windows / AD admin', sk4_b3: 'Networks',
  std_title: 'ls /standards',

  proj_title: 'ls -la ~/projects', proj_sub: '// flagship work',
  p1_tag: 'Threat Intelligence &amp; SOC IOC enrichment · Wazuh CDB Ready',
  p1_li1: 'multi-IOC triage: IPv4/IPv6, domains, URLs, MD5/SHA1/SHA256 hashes, defang/refang;',
  p1_li2: 'offline heuristics: RFC 1918 / bogon filter, DGA botnets via Shannon entropy H(X)&gt;3.6, Tor exit nodes;',
  p1_li3: '0–100 threat scoring, MITRE ATT&amp;CK mapping, AbuseIPDB, Wazuh CDB export + SQLite cache.',
  ph_tag: 'Multi-Vector Low-Interaction Honeypot &amp; SOC Telemetry Engine',
  ph_li1: 'HTTP + SSH traps: emulates vulnerable services (/.env, /wp-login, SSO) & isolated virtual Bash shell;',
  ph_li2: '0–100 threat scoring, Shannon entropy calculation, ThreatPulse enrichment & MITRE ATT&CK mapping;',
  ph_li3: 'standalone stdlib asyncio web dashboard, dynamic Wazuh CDB / Suricata rules & Telegram alerts.',
  p2_tag: 'DevSecOps SAST / CI-CD / JS Bundle Recon scanner',
  p2_li1: 'hybrid secret detection: provider regexes + Shannon entropy H(X)&gt;3.8 → −90% false positives;',
  p2_li2: 'JsReconAnalyzer: hidden /admin API routes, DOM-XSS sinks (innerHTML/eval), RFC1918 leaks behind WAF, .map SourceMaps;',
  p2_li3: 'CIS Docker Benchmarks, GitHub Actions audit, OASIS SARIF 2.1.0 export + HTML dashboard.',
  p3_tag: 'multi-layer log correlation for Linux / Web / Windows-Sysmon',
  p3_li1: 'zero-dependency engine: auth.log / systemd, Apache access.log, Windows Security / Sysmon / WER;',
  p3_li2: '10 rules: web shells, SSH/RDP brute-force, Kerberoasting 0x17, AS-REP Roasting, PtH, Sysmon ID 10 (LSASS);',
  p3_li3: 'MITRE ATT&amp;CK ⇄ Wazuh rule mapping, JSON export + interactive HTML dashboard.',
  p4_ver: 'investigation',
  p4_tag: 'DMZ web server &amp; Active Directory compromise — full teardown',
  p4_li1: 'obfuscated web shell backdoor.php → root: Apache built with -DBIG_SECURITY_HOLE, /etc/shadow stolen;',
  p4_li2: 'WER AppCrash forensics: recovered deleted CVE-2019-0623 exploit, mimikatz via \\\\tsclient, CVE-2019-1458;',
  p4_li3: '21-host SIEM lab: Wazuh agents + auditd + FIM whodata + Fail2ban + TheHive escalation.',
  p5_t: 'AD Pentest Report <span class="ver">PTES / NIST</span>',
  p5_tag: 'enterprise domain pentest: from SMB share to Domain Admin in &lt; 4 hours',
  p5_li1: 'chain: open SMB share with SSH keys (CVSS 9.8) → Kerberoasting (RC4) → NTLM Relay → GenericAll via BloodHound CE;',
  p5_li2: 'verified PoCs, CVSS v3.1 scoring, MITRE ATT&amp;CK mapping;',
  p5_li3: 'hardening roadmap: SMB signing, LAPS, gMSA, relay-attack defenses.',
  p6_tag: 'Python Security OOP engine with cryptographic FIM (SHA-256)',
  p6_li1: 'strict validation, input sanitization and PII masking;',
  p6_li2: 'SHA-256 File Integrity Monitoring: real-time profile change tracking;',
  p6_li3: 'security unit tests: edge cases, sanitization, tamper resistance.',
  p9_ver: '9 lab works',
  p9_tag: 'SOC practice portfolio on a 21-host lab (VK Cloud &amp; Proxmox)',
  p9_li1: 'monitoring stack deployment: Wazuh SIEM + Suricata IDS + ELK/Winlogbeat — agents, FIM, custom rules;',
  p9_li2: 'network segmentation & iptables hardening, incident drills: brute-force, web attacks, lateral movement;',
  p9_li3: 'every work is a full report: topology, detection screenshots, MITRE ATT&amp;CK mapping.',
  link_demo: 'Demo', link_report: 'Report', link_radar: '3D Radar',

  radar_title: '3d-threat-radar --realtime',
  radar_sub: '// global telemetry: ThreatPulse + Wazuh SIEM',
  radar_desc: 'Interactive 3D threat globe. Live telemetry of Tor relays, DGA botnets, and malware beacons intercepted by ThreatPulse heuristics in real-time.',
  radar_stream_title: 'LIVE THREAT STREAM (INTERCEPTED IOCs)',
  radar_inspector_lbl: 'INTERCEPTED INDICATOR (IOC):',
  btn_focus_minsk: '🎯 Focus Minsk SOC',
  btn_pause: '⏸️ Pause',
  btn_play: '▶️ Play',
  btn_reset: '🔄 Reset View',

  exp_title: 'tail -f ~/history.log', exp_sub: '// experience &amp; education',
  now: 'present', now2: 'present',
  exp1_t: 'Cybersecurity Practitioner &amp; Open-Source Developer',
  exp1_o: 'Independent · security projects &amp; labs',
  exp1_p: 'Building and shipping open-source detection tools (PipeShield, Log Sentinel, ThreatPulse, MyProfile) with AI-assisted workflows, automated CI testing and production-grade PTES / NIST reports.',
  exp1_n: 'focus: SOC / DFIR · AD Pentest · DevSecOps tooling',
  exp2_t: 'Clinical Psychologist',
  exp2_o: 'Minsk Regional Clinical Center · private practice',
  exp2_p: 'Diagnostics, crisis counselling, high emotional load. Strict confidential reporting and personal-data protection.',
  exp2_n: 'security link: human layer — phishing, social engineering, insiders, incident stress resilience',
  exp3_t: 'University Lecturer',
  exp3_o: 'Baranavichy State University',
  exp3_p: 'Academic courses, practical seminars, research publications.',
  exp3_n: 'security link: security-awareness training, clear reporting for C-level',
  exp4_t: '“Cybersecurity Specialist 2.0” Professional Program',
  exp4_o: 'professional program',
  exp4_p: 'Infrastructure pentest, Active Directory security, SOC monitoring & incident response (Wazuh, TheHive, Sysmon), Linux/Windows administration, networking, Python. 100% completed, final DFIR diploma defended.',
  exp5_t: 'Psychology: Bachelor (2020) + Master (2021)',
  exp5_o: 'Baranavichy State University',
  exp5_p: 'Diagnostics and research publications — the analytical foundation that now strengthens investigation phases and social-engineering scenarios.',

  ct_title: './connect.sh --secure', ct_sub: '// communication channels',
  c_phone: 'Phone',
  c_loc: 'Location', c_loc_v: 'Minsk, Belarus · remote / relocation',
  ct_banner: 'Looking for: Junior SOC Analyst (L1/L2) · DFIR · Junior Pentester · Junior DevSecOps. I reply fast.',
  ct_btn: 'discuss an offer',
  term_title: 'guest@zharkov: interactive_shell',
  term_ph: "type 'help' and hit Enter",
  f_top: '↑ top'
};

const I18N = (() => {
  const ru = {};
  $$('[data-i18n]').forEach(el => { ru[el.dataset.i18n] = el.innerHTML; });
  const ph = {};
  $$('[data-i18n-ph]').forEach(el => { ph[el.dataset.i18nPh] = el.placeholder; });
  let lang = 'ru';

  function apply(newLang) {
    if (newLang !== 'ru' && newLang !== 'en') return;
    lang = newLang;
    $$('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const val = (lang === 'en' ? EN[key] : ru[key]) ?? ru[key];
      if (val !== undefined) el.innerHTML = val;
    });
    $$('[data-i18n-ph]').forEach(el => {
      const key = el.dataset.i18nPh;
      el.placeholder = (lang === 'en' ? EN[key] : ph[key]) ?? ph[key];
    });
    document.documentElement.lang = lang;
    document.title = TITLES[lang];
    const g = $('.glitch');
    if (g) g.dataset.text = g.textContent.trim();
    $$('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    TypedRoles.restart();
  }
  return { apply, get lang() { return lang; } };
})();

$$('.lang-btn').forEach(btn => btn.addEventListener('click', () => I18N.apply(btn.dataset.lang)));

/* ============================================================
   3. TABS
   ============================================================ */
const Tabs = (() => {
  const PANELS = ['home', 'skills', 'projects', 'radar', 'experience', 'contact'];
  let current = 'home';

  function activate(id, pushHash = true) {
    if (!PANELS.includes(id)) id = 'home';
    current = id;
    $$('.panel').forEach(p => p.classList.toggle('active', p.dataset.panel === id));
    $$('.tab-btn').forEach(b => {
      const on = b.dataset.tab === id;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', String(on));
    });
    window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' });
    if (pushHash && location.hash !== '#' + id) history.replaceState(null, '', '#' + id);
    document.dispatchEvent(new CustomEvent('tab:change', { detail: id }));
  }

  $$('.tab-btn').forEach(b => b.addEventListener('click', () => activate(b.dataset.tab)));
  $$('[data-tab-link]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    activate(a.dataset.tabLink);
  }));
  window.addEventListener('hashchange', () => activate(location.hash.slice(1), false));
  document.addEventListener('keydown', e => {
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const i = PANELS.indexOf(current);
    const next = e.key === 'ArrowRight' ? (i + 1) % PANELS.length : (i - 1 + PANELS.length) % PANELS.length;
    activate(PANELS[next]);
  });

  activate(location.hash.slice(1) || 'home', false);
  return { activate, get current() { return current; } };
})();

/* ============================================================
   4. TYPED ROLES
   ============================================================ */
const TypedRoles = (() => {
  const ROLES = {
    ru: ['Security Engineer', 'SOC Analyst · Blue Team / DFIR', 'Junior Penetration Tester', 'DevSecOps · Detection Engineering'],
    en: ['Security Engineer', 'SOC Analyst · Blue Team / DFIR', 'Junior Penetration Tester', 'DevSecOps · Detection Engineering']
  };
  const el = $('#typed');
  let roleIdx = 0, charIdx = 0, deleting = false, timer;

  function tick() {
    const list = ROLES[I18N.lang];
    const role = list[roleIdx % list.length];
    if (!deleting) {
      charIdx++;
      el.textContent = role.slice(0, charIdx);
      if (charIdx === role.length) { deleting = true; timer = setTimeout(tick, 1900); return; }
      timer = setTimeout(tick, 55 + Math.random() * 45);
    } else {
      charIdx--;
      el.textContent = role.slice(0, charIdx);
      if (charIdx === 0) { deleting = false; roleIdx++; timer = setTimeout(tick, 420); return; }
      timer = setTimeout(tick, 26);
    }
  }
  function start() { if (!el || REDUCED) { if (el) el.textContent = ROLES[I18N.lang][0]; return; } clearTimeout(timer); roleIdx = 0; charIdx = 0; deleting = false; tick(); }
  return { restart: start, start };
})();

/* ============================================================
   5. REVEAL ON SCROLL + COUNTERS + SKILL BARS
   ============================================================ */
(function reveals() {
  const els = $$('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in-view')); return; }

  function animateCounters(scope) {
    scope.querySelectorAll('[data-count]').forEach(n => {
      if (n.dataset.done) return;
      n.dataset.done = '1';
      const target = parseFloat(n.dataset.count);
      const prefix = n.dataset.prefix || '';
      const suffix = n.dataset.suffix || '';
      const dur = 1300, t0 = performance.now();
      function step(t) {
        const p = Math.min((t - t0) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        n.textContent = prefix + Math.round(target * ease) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in-view');
      animateCounters(en.target);
      io.unobserve(en.target);
    });
  }, { threshold: 0.12 });
  els.forEach(e => io.observe(e));
})();

/* ============================================================
   6. TILT CARDS
   ============================================================ */
(function tilt() {
  if (REDUCED || window.matchMedia('(pointer: coarse)').matches) return;
  $$('[data-tilt]').forEach(card => {
    let raf = null;
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-2px)`;
      });
    });
    card.addEventListener('mouseleave', () => {
      if (raf) cancelAnimationFrame(raf);
      card.style.transform = '';
      card.style.transition = 'transform .4s ease';
      setTimeout(() => card.style.transition = '', 400);
    });
  });
})();

/* ============================================================
   7. MARQUEE — duplicate content for a seamless loop
   ============================================================ */
(function marquee() {
  const track = $('#marquee-track');
  if (track) track.innerHTML += track.innerHTML;
})();

/* ============================================================
   8. 3D CYBER THREAT RADAR GLOBE (POWERED BY THREATPULSE)
   ============================================================ */
const ThreatGlobe = (() => {
  let initialized = false;
  let renderer, camera, scene, globeGroup;
  let autoRotate = true;
  let targetRotationX = 0.35;
  let targetRotationY = -0.55;
  let isDragging = false;
  let prevMouseX = 0, prevMouseY = 0;

  const NODES = {
    minsk: { id: 'minsk', name: 'Minsk [SOC Hub]', country: 'Belarus', lat: 53.90, lon: 27.56, role: 'defender', color: 0x00ff9c, ip: '10.244.0.12 (Internal Lab)', desc: 'Primary Defender SOC SIEM & ThreatPulse Engine' },
    frankfurt: { id: 'frankfurt', name: 'Frankfurt [Tor Relay]', country: 'Germany', lat: 50.11, lon: 8.68, role: 'attacker', color: 0xff3b5c, ip: '185.220.101.5', desc: 'Known Malicious Tor Exit Node probing DMZ port 443' },
    tokyo: { id: 'tokyo', name: 'Tokyo [DGA C2 Beacon]', country: 'Japan', lat: 35.67, lon: 139.65, role: 'attacker', color: 0xffd166, ip: 'xkjqpw987dfghk123498.top', desc: 'Algorithmic Domain Generation (DGA) entropy H=4.18' },
    sanfrancisco: { id: 'sanfrancisco', name: 'San Francisco [Cloud Edge]', country: 'USA', lat: 37.77, lon: -122.41, role: 'cloud', color: 0x00d4ff, ip: '104.21.48.91 (Cloudflare)', desc: 'Reverse Proxy & Public CDN Gateway' },
    saopaulo: { id: 'saopaulo', name: 'São Paulo [Ransomware C2]', country: 'Brazil', lat: -23.55, lon: -46.63, role: 'attacker', color: 0xff3b5c, ip: '177.136.250.88', desc: 'WannaCry Kill-switch Callback Beacon Attempt' },
    singapore: { id: 'singapore', name: 'Singapore [Web Shell Host]', country: 'Singapore', lat: 1.35, lon: 103.81, role: 'attacker', color: 0xff3b5c, ip: '103.253.144.10', desc: 'Obfuscated PHP Web Shell staging IP' },
    london: { id: 'london', name: 'London [SIEM Collector]', country: 'UK', lat: 51.50, lon: -0.12, role: 'defender', color: 0x00ff9c, ip: '51.15.42.180 (Wazuh Forwarder)', desc: 'Regional Centralized Syslog & Auditd Aggregator' },
    sydney: { id: 'sydney', name: 'Sydney [Target DB]', country: 'Australia', lat: -33.86, lon: 151.20, role: 'relay', color: 0x00d4ff, ip: '139.130.4.5', desc: 'Exfiltration telemetry canary honeytoken' }
  };

  const ATTACK_ARCS = [
    { from: 'frankfurt', to: 'minsk', color: 0xff3b5c, speed: 0.007, ioc: '185.220.101.5', type: 'Tor Exit Node Scan', entropy: '1.24 (Clean IP)', score: '92/100', wazuh: '185.220.101.5:threat_tor:high_risk:block', cat: 'CRITICAL THREAT' },
    { from: 'tokyo', to: 'minsk', color: 0xffd166, speed: 0.005, ioc: 'xkjqpw987dfghk123498.top', type: 'DGA Domain Beacon', entropy: '4.18 (DGA ALERT)', score: '88/100', wazuh: 'xkjqpw987dfghk123498.top:threat_dga:entropy_4.18:block', cat: 'HIGH RISK' },
    { from: 'saopaulo', to: 'london', color: 0xff3b5c, speed: 0.004, ioc: '177.136.250.88', type: 'Ransomware C2 Beacon', entropy: '0.98 (IP)', score: '96/100', wazuh: '177.136.250.88:threat_ransomware_c2:critical', cat: 'CRITICAL THREAT' },
    { from: 'singapore', to: 'minsk', color: 0xff3b5c, speed: 0.006, ioc: '103.253.144.10', type: 'Web Shell Brute-Force', entropy: '1.15 (IP)', score: '82/100', wazuh: '103.253.144.10:threat_webshell_bruteforce:block', cat: 'HIGH RISK' },
    { from: 'sanfrancisco', to: 'tokyo', color: 0x00d4ff, speed: 0.004, ioc: '104.21.48.91', type: 'Cloudflare Edge Proxy', entropy: '1.02 (Bogon Sanitized)', score: '15/100', wazuh: '104.21.48.91:proxy_edge:whitelisted', cat: 'BENIGN / PROXY' },
    { from: 'minsk', to: 'sydney', color: 0x00ff9c, speed: 0.005, ioc: '10.244.0.12', type: 'ThreatPulse Honeytoken Sync', entropy: '0.85 (RFC 1918)', score: '0/100', wazuh: '10.244.0.0/16:private_bogon:allow', cat: 'DEFENDER SYNC' }
  ];

  const arcObjects = [];
  const GLOBE_RADIUS = 100;

  function isLand(lat, lon) {
    if (lat > 35 && lat < 71 && lon > -10 && lon < 42) return true;
    if (lat > 10 && lat < 72 && lon >= 42 && lon < 145) return true;
    if (lat > 14 && lat < 72 && lon > -168 && lon < -52) return true;
    if (lat > -56 && lat <= 12 && lon > -82 && lon < -34) return true;
    if (lat > -35 && lat < 37 && lon > -18 && lon < 52) return true;
    if (lat > -44 && lat < -10 && lon > 112 && lon < 155) return true;
    if (lat > 30 && lat < 46 && lon > 129 && lon < 146) return true;
    if (lat > 50 && lat < 60 && lon > -11 && lon < 2) return true;
    return false;
  }

  function latLonToVec3(lat, lon, radius = GLOBE_RADIUS) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -(radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  }

  function updateInspector(arcDef) {
    if (!arcDef) return;
    const iocEl = $('#inspectorIoc');
    const routeEl = $('#inspectorRoute');
    const entropyEl = $('#inspectorEntropy');
    const scoreEl = $('#inspectorScore');
    const wazuhEl = $('#inspectorWazuh');
    const verdictEl = $('#inspectorVerdict');
    const cliEl = $('#inspectorCliCmd');
    const timeEl = $('#inspectorTime');

    if (iocEl) iocEl.textContent = arcDef.ioc;
    if (routeEl) {
      const src = NODES[arcDef.from].name;
      const dst = NODES[arcDef.to].name;
      routeEl.textContent = `${src} ➔ ${dst}`;
    }
    if (entropyEl) entropyEl.textContent = `H(X) = ${arcDef.entropy}`;
    if (scoreEl) scoreEl.textContent = arcDef.score;
    if (wazuhEl) wazuhEl.textContent = arcDef.wazuh;
    if (verdictEl) {
      verdictEl.textContent = arcDef.cat;
      if (arcDef.cat.includes('CRITICAL')) {
        verdictEl.style.background = 'rgba(255, 59, 92, 0.2)';
        verdictEl.style.color = '#ff3b5c';
        verdictEl.style.borderColor = 'rgba(255, 59, 92, 0.4)';
      } else if (arcDef.cat.includes('HIGH')) {
        verdictEl.style.background = 'rgba(255, 209, 102, 0.2)';
        verdictEl.style.color = '#ffd166';
        verdictEl.style.borderColor = 'rgba(255, 209, 102, 0.4)';
      } else {
        verdictEl.style.background = 'rgba(0, 255, 156, 0.2)';
        verdictEl.style.color = '#00ff9c';
        verdictEl.style.borderColor = 'rgba(0, 255, 156, 0.4)';
      }
    }
    if (cliEl) cliEl.textContent = `threat-pulse ${arcDef.ioc} --format wazuh-cdb`;
    if (timeEl) timeEl.textContent = new Date().toLocaleTimeString();
  }

  function addStreamItem(arcDef) {
    const streamContainer = $('#threatStreamList');
    if (!streamContainer) return;
    const item = document.createElement('div');
    item.className = 'threat-stream-item';
    const isCrit = arcDef.cat.includes('CRITICAL');
    const color = isCrit ? '#ff3b5c' : (arcDef.cat.includes('HIGH') ? '#ffd166' : '#00d4ff');
    item.innerHTML = `
      <div style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:72%;">
        <span style="color:${color}; font-weight:700;">[${arcDef.type}]</span>
        <span style="color:#c7d8d0; margin-left:4px;">${arcDef.ioc}</span>
      </div>
      <span style="color:#5f7a70; font-size:0.72rem;">${new Date().toLocaleTimeString()}</span>
    `;
    item.onclick = () => updateInspector(arcDef);
    streamContainer.insertBefore(item, streamContainer.firstChild);
    while (streamContainer.children.length > 5) {
      streamContainer.removeChild(streamContainer.lastChild);
    }
  }

  function init() {
    const container = $('#globe3d');
    if (!container || typeof THREE === 'undefined') return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 540;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1500);
    camera.position.z = 285;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Planet Core
    const coreGeo = new THREE.SphereGeometry(GLOBE_RADIUS - 0.4, 36, 36);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x050b09, transparent: true, opacity: 0.96 });
    globeGroup.add(new THREE.Mesh(coreGeo, coreMat));

    // Lat/Lon coordinate grid rings
    const gridMat = new THREE.LineBasicMaterial({ color: 0x1b2b26, transparent: true, opacity: 0.35 });
    for (let lat = -60; lat <= 60; lat += 30) {
      const r = GLOBE_RADIUS * Math.cos(lat * Math.PI / 180);
      const y = GLOBE_RADIUS * Math.sin(lat * Math.PI / 180);
      const ringGeo = new THREE.BufferGeometry();
      const pts = [];
      for (let a = 0; a <= 360; a += 10) {
        const rad = a * Math.PI / 180;
        pts.push(new THREE.Vector3(r * Math.cos(rad), y, r * Math.sin(rad)));
      }
      ringGeo.setFromPoints(pts);
      globeGroup.add(new THREE.Line(ringGeo, gridMat));
    }
    for (let lon = 0; lon < 360; lon += 45) {
      const rad = lon * Math.PI / 180;
      const pts = [];
      for (let lat = -90; lat <= 90; lat += 5) {
        const phi = lat * Math.PI / 180;
        pts.push(new THREE.Vector3(
          GLOBE_RADIUS * Math.cos(phi) * Math.sin(rad),
          GLOBE_RADIUS * Math.sin(phi),
          GLOBE_RADIUS * Math.cos(phi) * Math.cos(rad)
        ));
      }
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
      globeGroup.add(new THREE.Line(lineGeo, gridMat));
    }

    // Outer Glow
    const atmosGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.06, 32, 32);
    const atmosMat = new THREE.MeshBasicMaterial({ color: 0x00ff9c, transparent: true, opacity: 0.06, side: THREE.BackSide });
    globeGroup.add(new THREE.Mesh(atmosGeo, atmosMat));

    // Starfield Dust
    const starGeo = new THREE.BufferGeometry();
    const starCoords = [];
    for (let i = 0; i < 260; i++) {
      starCoords.push((Math.random() - 0.5) * 800, (Math.random() - 0.5) * 800, -150 + Math.random() * -400);
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starCoords, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x00d4ff, size: 1.3, transparent: true, opacity: 0.4 });
    scene.add(new THREE.Points(starGeo, starMat));

    // Continental Matrix
    const dotCoords = [], dotColors = [];
    for (let lat = -70; lat <= 70; lat += 2.8) {
      for (let lon = -180; lon <= 180; lon += 2.8) {
        if (isLand(lat, lon)) {
          const jLat = lat + (Math.random() - 0.5) * 0.7;
          const jLon = lon + (Math.random() - 0.5) * 0.7;
          const v = latLonToVec3(jLat, jLon, GLOBE_RADIUS + 0.5);
          dotCoords.push(v.x, v.y, v.z);
          if (Math.random() > 0.4) {
            dotColors.push(0.0, 1.0, 0.61); // #00ff9c
          } else {
            dotColors.push(0.0, 0.83, 1.0); // #00d4ff
          }
        }
      }
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotCoords, 3));
    dotGeo.setAttribute('color', new THREE.Float32BufferAttribute(dotColors, 3));
    const dotMat = new THREE.PointsMaterial({ size: 1.8, vertexColors: true, transparent: true, opacity: 0.85 });
    globeGroup.add(new THREE.Points(dotGeo, dotMat));

    // Nodes & Pillars
    Object.values(NODES).forEach(node => {
      const pos = latLonToVec3(node.lat, node.lon, GLOBE_RADIUS + 0.8);
      const sGeo = new THREE.SphereGeometry(1.6, 12, 12);
      const sMat = new THREE.MeshBasicMaterial({ color: node.color });
      const mesh = new THREE.Mesh(sGeo, sMat);
      mesh.position.copy(pos);
      globeGroup.add(mesh);

      const normal = pos.clone().normalize();
      const beamLen = node.role === 'defender' ? 14 : 9;
      const beamGeo = new THREE.CylinderGeometry(0.3, 0.6, beamLen, 6);
      beamGeo.translate(0, beamLen / 2, 0);
      const beamMat = new THREE.MeshBasicMaterial({ color: node.color, transparent: true, opacity: 0.75 });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.copy(pos);
      beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
      globeGroup.add(beam);
    });

    // Attack Arcs
    arcObjects.length = 0;
    ATTACK_ARCS.forEach(arcDef => {
      const srcNode = NODES[arcDef.from];
      const dstNode = NODES[arcDef.to];
      const p1 = latLonToVec3(srcNode.lat, srcNode.lon, GLOBE_RADIUS);
      const p2 = latLonToVec3(dstNode.lat, dstNode.lon, GLOBE_RADIUS);
      const dist = p1.distanceTo(p2);
      
      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      const altitude = GLOBE_RADIUS + dist * 0.38;
      mid.normalize().multiplyScalar(altitude);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const points = curve.getPoints(45);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
      const curveMat = new THREE.LineBasicMaterial({ color: arcDef.color, transparent: true, opacity: 0.55 });
      const arcLine = new THREE.Line(curveGeo, curveMat);
      globeGroup.add(arcLine);

      const partGeo = new THREE.SphereGeometry(1.4, 8, 8);
      const partMat = new THREE.MeshBasicMaterial({ color: arcDef.color });
      const projectile = new THREE.Mesh(partGeo, partMat);
      globeGroup.add(projectile);

      arcObjects.push({
        def: arcDef,
        curve: curve,
        projectile: projectile,
        progress: Math.random(),
        speed: arcDef.speed
      });
    });

    // Mouse / Touch Controls
    container.addEventListener('pointerdown', (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      container.style.cursor = 'grabbing';
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotationY += deltaX * 0.005;
      targetRotationX += deltaY * 0.005;
      targetRotationX = Math.max(-1.2, Math.min(1.2, targetRotationX));
    });

    window.addEventListener('pointerup', () => {
      isDragging = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('wheel', (e) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.15;
      camera.position.z = Math.max(180, Math.min(380, camera.position.z));
    }, { passive: false });

    // Seed initial items & inspector
    ATTACK_ARCS.forEach(addStreamItem);
    updateInspector(ATTACK_ARCS[0]);

    // Simulated alerts
    let arcCycleIdx = 0;
    setInterval(() => {
      arcCycleIdx = (arcCycleIdx + 1) % ATTACK_ARCS.length;
      const arc = ATTACK_ARCS[arcCycleIdx];
      addStreamItem(arc);
      if (arcObjects[arcCycleIdx]) {
        arcObjects[arcCycleIdx].progress = 0;
      }
    }, 4200);

    // Render loop
    function animate() {
      requestAnimationFrame(animate);
      if (autoRotate && !isDragging) {
        targetRotationY += 0.0016;
      }
      globeGroup.rotation.y += (targetRotationY - globeGroup.rotation.y) * 0.08;
      globeGroup.rotation.x += (targetRotationX - globeGroup.rotation.x) * 0.08;

      arcObjects.forEach(item => {
        item.progress += item.speed;
        if (item.progress > 1) item.progress = 0;
        const pt = item.curve.getPoint(item.progress);
        item.projectile.position.copy(pt);
      });

      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', handleResize);
    initialized = true;
  }

  function handleResize() {
    const container = $('#globe3d');
    if (!container || !renderer || !camera) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w > 0 && h > 0) {
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
  }

  function focusNode(nodeId) {
    const node = NODES[nodeId];
    if (!node) return;
    targetRotationY = -(node.lon + 180) * (Math.PI / 180) - Math.PI / 2;
    targetRotationX = (node.lat) * (Math.PI / 180) * 0.6;
    autoRotate = false;
    updateInspector(ATTACK_ARCS[0]);
  }

  function toggleRotation() {
    autoRotate = !autoRotate;
    const btn = $('#btnToggleRotate');
    if (btn) btn.textContent = autoRotate ? (I18N.lang === 'ru' ? '⏸️ Пауза' : '⏸️ Pause') : (I18N.lang === 'ru' ? '▶️ Запуск' : '▶️ Play');
  }

  function resetView() {
    targetRotationX = 0.35;
    targetRotationY = -0.55;
    if (camera) camera.position.z = 285;
    autoRotate = true;
    const btn = $('#btnToggleRotate');
    if (btn) btn.textContent = I18N.lang === 'ru' ? '⏸️ Пауза' : '⏸️ Pause';
  }

  function onTabShow() {
    if (!initialized) init();
    else setTimeout(handleResize, 60);
  }

  document.addEventListener('tab:change', e => {
    if (e.detail === 'radar') onTabShow();
  });
  if (Tabs.current === 'radar') onTabShow();

  return {
    init,
    onTabShow,
    focusNode,
    toggleRotation,
    resetView
  };
})();

window.focusRadarNode = (id) => ThreatGlobe.focusNode(id);
window.toggleRadarRotation = () => ThreatGlobe.toggleRotation();
window.resetRadarView = () => ThreatGlobe.resetView();

/* ============================================================
   9. INTERACTIVE TERMINAL
   ============================================================ */
const Terminal = (() => {
  const body = $('#term-body'), input = $('#term-input');
  if (!body || !input) return null;
  let booted = false;
  const history = [];
  let hIdx = -1;

  function print(text, cls = '') {
    const div = document.createElement('div');
    div.className = 'term-line' + (cls ? ' ' + cls : '');
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
    return div;
  }
  function printLines(lines) {
    lines.forEach(([t, c]) => print(t, c || ''));
  }
  function L(t, c) { return [t, c]; }

  const RESP = {
    ru: {
      welcome: [
        L('zharkov interactive shell [v2.1.0] — соединение установлено.', 'term-ok'),
        L("подсказка: введи 'help' и нажми Enter.", 'term-dim')
      ],
      help: [
        L('доступные команды:'),
        L('  whoami      → профиль и статус специалиста'),
        L('  cv          → ссылки на печатные резюме RU и CV EN'),
        L('  skills      → сводка по арсеналу'),
        L('  projects    → ключевые open-source разработки (PyPI)'),
        L('  radar       → переключиться на 3D-радар угроз'),
        L('  contact     → как со мной связаться'),
        L('  social      → github / linkedin / telegram'),
        L('  nmap        → безопасное сканирование localhost'),
        L('  sudo hire   → офферная воронка'),
        L('  clear       → очистить экран')
      ],
      whoami: [
        L('Aleksei Zharkou — Security Engineer (SOC/DFIR · Pentest · DevSecOps)'),
        L('Минск, Беларусь · удалёнка / гибрид / релокация'),
        L('статус: OPEN TO WORK', 'term-ok')
      ],
      cv: [
        L('Алексей Жарков — Резюме и портфолио:'),
        L('  [RU Резюме] → https://voobrazhenie21-lab.github.io/cv.html', 'term-ok'),
        L('  [EN CV]     → https://voobrazhenie21-lab.github.io/cv-en.html', 'term-ok'),
        L('Совет: печать в PDF доступна через браузер по Ctrl + P.', 'term-dim')
      ],
      skills: [
        L('offensive ..... nmap · bloodhound · mimikatz · impacket · kerberoasting'),
        L('defensive ..... wazuh siem · suricata · elk · thehive · sysmon · dfir'),
        L('devsecops ..... python · pytest · sast · sarif · cis benchmarks'),
        L('net/sys ....... tcp/ip · vlan · wireshark · linux · windows server/ad')
      ],
      projects: [
        L('01 ThreatPulse   — TI & IOC enrichment CLI (PyPI: threatpulse-cli) · 18 tests', 'term-ok'),
        L('   → pip install threatpulse-cli | pypi.org/project/threatpulse-cli/'),
        L('02 HoneyNet      — Multi-Vector Honeypot (HTTP/SSH) & SOC Dashboard · 21 tests', 'term-ok'),
        L('   → github.com/Voobrazhenie21-lab/honeynet'),
        L('03 PipeShield    — DevSecOps SAST scanner (−90% FP) · 33 tests'),
        L('04 Log Sentinel  — log correlation engine · 10 rules'),
        L('05 DFIR acme.skb — full breach investigation · 21 hosts'),
        L('06 AD Pentest    — PTES report · Domain Admin < 4h'),
        L('07 MyProfile     — Python Security OOP engine · FIM SHA-256'),
        L('08 AD Sentinel   — AD Posture Auditor (Kerberoasting / AS-REP / Delegations) · 18 tests'),
        L('09 SOC Labs      — 9 практических: Wazuh · Suricata · ELK · IR · стенд 21 хост'),
        L('→ github.com/Voobrazhenie21-lab', 'term-cyan')
      ],
      radar: [
        L('Переключение на 3D-радар киберугроз...'),
        L('Глобальная телеметрия: ThreatPulse TI Engine + Wazuh SIEM', 'term-ok')
      ],
      contact: [
        L('telegram → @Voobrazhenie_20'),
        L('email ..... lyosha.zharkov.98@mail.ru'),
        L('phone ..... +375 (29) 554-80-55')
      ],
      social: [
        L('github .... github.com/Voobrazhenie21-lab'),
        L('pypi ...... pypi.org/project/threatpulse-cli/'),
        L('linkedin .. linkedin.com/in/aleksei-zharkou'),
        L('telegram .. t.me/Voobrazhenie_20'),
        L('portfolio . voobrazhenie21-lab.github.io')
      ],
      ls: [L('about  skills  projects  radar  experience  contact  cv.html  cv-en.html')],
      nmap: [
        L('$ nmap -sV --top-ports 4 localhost'),
        L('22/tcp   open  ssh'), L('80/tcp   open  http'),
        L('443/tcp  open  https'), L('1337/tcp open  elite'),
        L('Nmap done: 1 host up. легенды не сканируют сами себя.', 'term-dim')
      ],
      sudoOk: [
        L('[sudo] password for recruiter: ********'),
        L('ACCESS GRANTED. Офферная воронка инициализирована.', 'term-ok'),
        L('Aleksei выйдет на работу примерно через 2 недели. HR уведомлён. GG.', 'term-ok')
      ],
      sudoFail: [L('guest не входит в sudoers. Инцидент будет задокументирован. (подсказка: sudo hire)')],
      exit: [L('выхода нет. есть только вкладки. (используй стрелки ← →)', 'term-err')],
      notFound: cmd => [L(`command not found: ${cmd}. попробуй 'help'`, 'term-err')]
    },
    en: {
      welcome: [
        L('zharkov interactive shell [v2.1.0] — connection established.', 'term-ok'),
        L("hint: type 'help' and hit Enter.", 'term-dim')
      ],
      help: [
        L('available commands:'),
        L('  whoami      → engineer profile and status'),
        L('  cv          → printable CV links (RU & EN)'),
        L('  skills      → tech arsenal summary'),
        L('  projects    → featured open-source repos (PyPI)'),
        L('  radar       → switch to 3D cyber threat radar'),
        L('  contact     → how to reach me'),
        L('  social      → github / linkedin / telegram / pypi'),
        L('  nmap        → safe localhost scan'),
        L('  sudo hire   → try it'),
        L('  clear       → wipe the screen')
      ],
      whoami: [
        L('Aleksei Zharkou — Security Engineer (SOC/DFIR · Pentest · DevSecOps)'),
        L('Minsk, Belarus · remote / hybrid / relocation'),
        L('status: OPEN TO WORK', 'term-ok')
      ],
      cv: [
        L('Aleksei Zharkou — Curriculum Vitae / Resume:'),
        L('  [RU Resume] → https://voobrazhenie21-lab.github.io/cv.html', 'term-ok'),
        L('  [EN CV]     → https://voobrazhenie21-lab.github.io/cv-en.html', 'term-ok'),
        L('Tip: direct PDF export available via browser (Ctrl + P).', 'term-dim')
      ],
      skills: [
        L('offensive ..... nmap · bloodhound · mimikatz · impacket · kerberoasting'),
        L('defensive ..... wazuh siem · suricata · elk · thehive · sysmon · dfir'),
        L('devsecops ..... python · pytest · sast · sarif · cis benchmarks'),
        L('net/sys ....... tcp/ip · vlan · wireshark · linux · windows server/ad')
      ],
      projects: [
        L('01 ThreatPulse   — TI & IOC enrichment CLI (PyPI: threatpulse-cli) · 18 tests', 'term-ok'),
        L('   → pip install threatpulse-cli | pypi.org/project/threatpulse-cli/'),
        L('02 HoneyNet      — Multi-Vector Honeypot (HTTP/SSH) & SOC Dashboard · 21 tests', 'term-ok'),
        L('   → github.com/Voobrazhenie21-lab/honeynet'),
        L('03 PipeShield    — DevSecOps SAST scanner (−90% FP) · 33 tests'),
        L('04 Log Sentinel  — log correlation engine · 10 rules'),
        L('05 DFIR acme.skb — full breach investigation · 21 hosts'),
        L('06 AD Pentest    — PTES report · Domain Admin < 4h'),
        L('07 MyProfile     — Python Security OOP engine · FIM SHA-256'),
        L('08 AD Sentinel   — AD Posture Auditor (Kerberoasting / AS-REP / Delegations) · 18 tests'),
        L('09 SOC Labs      — 9 hands-on works: Wazuh · Suricata · ELK · IR · 21-host lab'),
        L('→ github.com/Voobrazhenie21-lab', 'term-cyan')
      ],
      radar: [
        L('Switching to 3D Cyber Threat Radar...'),
        L('Global telemetry: ThreatPulse TI Engine + Wazuh SIEM', 'term-ok')
      ],
      contact: [
        L('telegram → @Voobrazhenie_20'),
        L('email ..... lyosha.zharkov.98@mail.ru'),
        L('phone ..... +375 (29) 554-80-55')
      ],
      social: [
        L('github .... github.com/Voobrazhenie21-lab'),
        L('pypi ...... pypi.org/project/threatpulse-cli/'),
        L('linkedin .. linkedin.com/in/aleksei-zharkou'),
        L('telegram .. t.me/Voobrazhenie_20'),
        L('portfolio . voobrazhenie21-lab.github.io')
      ],
      ls: [L('about  skills  projects  radar  experience  contact  cv.html  cv-en.html')],
      nmap: [
        L('$ nmap -sV --top-ports 4 localhost'),
        L('22/tcp   open  ssh'), L('80/tcp   open  http'),
        L('443/tcp  open  https'), L('1337/tcp open  elite'),
        L('Nmap done: 1 host up. legends do not scan themselves.', 'term-dim')
      ],
      sudoOk: [
        L('[sudo] password for recruiter: ********'),
        L('ACCESS GRANTED. Offer pipeline initialized.', 'term-ok'),
        L('Aleksei will join your team in ~2 weeks. HR notified. GG.', 'term-ok')
      ],
      sudoFail: [L('guest is not in the sudoers file. This incident will be reported. (hint: sudo hire)')],
      exit: [L('there is no escape. there are only tabs. (use ← → arrow keys)', 'term-err')],
      notFound: cmd => [L(`command not found: ${cmd}. try 'help'`, 'term-err')]
    }
  };

  function exec(raw) {
    const cmd = raw.trim();
    if (!cmd) return;
    print(cmd, 'term-cmd');
    history.push(cmd); hIdx = history.length;
    const R = RESP[I18N.lang];
    const [name, ...args] = cmd.toLowerCase().split(/\s+/);
    switch (name) {
      case 'help': case '?': printLines(R.help); break;
      case 'whoami': printLines(R.whoami); break;
      case 'cv': case 'resume': printLines(R.cv); break;
      case 'skills': printLines(R.skills); break;
      case 'projects': case 'ls': name === 'ls' ? printLines(R.ls) : printLines(R.projects); break;
      case 'radar': case 'globe': printLines(R.radar); Tabs.activate('radar'); break;
      case 'contact': printLines(R.contact); break;
      case 'social': printLines(R.social); break;
      case 'nmap': printLines(R.nmap); break;
      case 'sudo': args[0] === 'hire' ? printLines(R.sudoOk) : printLines(R.sudoFail); break;
      case 'exit': case 'quit': printLines(R.exit); break;
      case 'date': print(new Date().toString()); break;
      case 'clear': case 'cls': body.innerHTML = ''; break;
      default: printLines(R.notFound(name));
    }
  }

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') { exec(input.value); input.value = ''; }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (hIdx > 0) input.value = history[--hIdx] || ''; }
    else if (e.key === 'ArrowDown') { e.preventDefault(); if (hIdx < history.length - 1) input.value = history[++hIdx] || ''; else { hIdx = history.length; input.value = ''; } }
  });
  $('.term-window').addEventListener('click', () => input.focus());

  function boot() {
    if (booted) return;
    booted = true;
    printLines(RESP[I18N.lang].welcome);
  }
  document.addEventListener('tab:change', e => { if (e.detail === 'contact') boot(); });
  if (Tabs.current === 'contact') boot();
  return { boot };
})();

/* ============================================================
   10. PRELOADER — boot sequence
   ============================================================ */
(function preloader() {
  const pre = $('#preloader'), box = $('#boot-lines');
  if (!pre || !box) return;
  const LINES = {
    ru: [
      '[BOOT] zharkov-sec OS v2.1.0',
      '> mounting /dev/portfolio ............ [ OK ]',
      '> loading modules: siem.dfir.pentest.devsecops ... [ OK ]',
      '> threat intelligence: ThreatPulse TI active ... [ OK ]',
      '> entropy check: H(X) = 4.21 bits/char ... [ OK ]',
      '> access granted. welcome, guest'
    ],
    en: [
      '[BOOT] zharkov-sec OS v2.1.0',
      '> mounting /dev/portfolio ............ [ OK ]',
      '> loading modules: siem.dfir.pentest.devsecops ... [ OK ]',
      '> threat intelligence: ThreatPulse TI active ... [ OK ]',
      '> entropy check: H(X) = 4.21 bits/char ... [ OK ]',
      '> access granted. welcome, guest'
    ]
  };
  const lang = (localStorage.getItem('az-lang') || 'ru');
  const lines = LINES[lang] || LINES.ru;
  let i = 0, finished = false;

  function finish() {
    if (finished) return;
    finished = true;
    pre.classList.add('done');
    setTimeout(() => pre.remove(), 650);
    TypedRoles.start();
  }
  function typeLine() {
    if (finished) return;
    if (i >= lines.length) { setTimeout(finish, 480); return; }
    const div = document.createElement('div');
    div.textContent = '';
    box.appendChild(div);
    const text = lines[i];
    let c = 0;
    (function typeChar() {
      if (finished) return;
      div.textContent = text.slice(0, ++c);
      if (c < text.length) setTimeout(typeChar, 9);
      else { div.textContent += (i < lines.length - 1 ? '  ' : ''); i++; setTimeout(typeLine, 190); }
    })();
  }
  setTimeout(typeLine, 250);
  $('#boot-skip').addEventListener('click', finish);
  pre.addEventListener('click', finish);
  setTimeout(finish, 6000);
})();

/* ============================================================
   11. MISC — to-top, saved language
   ============================================================ */
(function misc() {
  const saved = localStorage.getItem('az-lang');
  if (saved && saved !== 'ru') I18N.apply(saved);
  $$('.lang-btn').forEach(b => b.addEventListener('click', () => localStorage.setItem('az-lang', b.dataset.lang)));
  const toTop = $('#to-top');
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' }));
})();

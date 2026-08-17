/* ==========================================================================
   RUCHIR KHANDELWAL PORTFOLIO - INTERACTIVE APPLICATION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // Set Current Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Clear any existing stored theme attribute
  localStorage.removeItem('rk-portfolio-theme');
  document.documentElement.removeAttribute('data-theme');

  /* --------------------------------------------------------------------------
     1. PROJECT CATEGORY FILTERING TABS
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.tab-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     3. PROJECT DETAILS MODAL DIALOG
     -------------------------------------------------------------------------- */
  const projectModal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  const projectDetailsMap = {
    'sales-dashboard': {
      title: 'Sales Dashboard Analytics',
      subtitle: 'Real-time sales performance, metric tracking, and dataset visualizer',
      tags: ['Next.js 14', 'Supabase', 'Recharts', 'Tailwind CSS', 'TypeScript'],
      description: 'A modern data analytics dashboard designed for monitoring sales pipelines, order volumes, revenue distribution, and customer retention metrics in real time.',
      highlights: [
        'Interactive Recharts line charts, bar graphs, and metric breakdown cards',
        'Supabase backend integration with authentication & real-time sync',
        'Responsive layout tuned with Tailwind CSS and modular UI components',
        'Built for high efficiency and crisp data visualization'
      ],
      github: '#',
      demo: 'https://ruchir-sales-dashboard.vercel.app/'
    },
    'nyay-saathi': {
      title: 'Nyay Saathi - AI Legal Awareness Platform',
      subtitle: 'Legal awareness & document risk-analysis empowering citizens',
      tags: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Web APIs', 'Legal AI'],
      description: 'An accessible legal platform that breaks down complex legal contracts, identifies hidden risks, and provides plain-language explanations of Indian law rights.',
      highlights: [
        'Automated document risk highlighter for contract review',
        'Multi-lingual legal assistant interface tailored for accessibility',
        'Instant advice matching for citizen queries and legal rights',
        'Hosted publicly on GitHub Pages'
      ],
      github: 'https://github.com/ruchir58',
      demo: 'https://sucky-codes.github.io/nyay-saathi/'
    },
    'ar-glasses': {
      title: 'AR Glasses Virtual Try-On Interface',
      subtitle: 'Augmented reality glass interaction and face tracking simulation',
      tags: ['HTML5', 'CSS3', 'Advanced JS', 'Computer Vision', 'AR Web'],
      description: 'Web-based simulation and testing interface developed for augmented reality glass interactions, enabling users to test frame placements and virtual overlays.',
      highlights: [
        'Interactive virtual eyeglass frame testing viewport',
        'Smooth dynamic rotation and scaling based on facial landmark alignment',
        'Lightweight browser execution without requiring external heavy software downloads',
        'Open-source repository on GitHub'
      ],
      github: 'https://github.com/ruchir58/AR-Glasses-Try-on',
      demo: null
    },
    'dukaan-saathi': {
      title: 'Dukaan Saathi - Merchant Order Manager',
      subtitle: 'Smart order management & conversational CRM for Indian shopkeepers',
      tags: ['JavaScript', 'Node.js', 'Web APIs', 'Database Sync', 'Messaging'],
      description: 'A tailored order management platform created to assist local store owners with digitized inventory logging, customer chat ordering, and sales summaries.',
      highlights: [
        'Conversational interface for quick order entries and updates',
        'Automated receipt generation and customer ledger tracking',
        'Minimalistic mobile-first design built for low latency',
        'Designed for shopkeepers navigating digital commerce'
      ],
      github: 'https://github.com/ruchir58/--Saathi',
      demo: null
    },
    'f1-booking': {
      title: 'Formula 1 Ticket Booking Platform',
      subtitle: 'Grandstand seat selection, circuit discovery, and race countdowns',
      tags: ['HTML5', 'CSS3'],
      description: 'A feature-rich Formula 1 ticket reservation web application offering circuit details, grandstand views, seat tier selection, and checkout simulation.',
      highlights: [
        'Interactive circuit grandstand selector with pricing tiers',
        'Live countdown timers for upcoming Grand Prix weekends',
        'Seamless multi-step checkout user flow with state persistence',
        'Modern motorsport aesthetic with high contrast UI'
      ],
      github: 'https://github.com/ruchir58/F1',
      demo: 'https://ruchir58.github.io/F1/'
    },
    'mintly': {
      title: 'Mintly - Digital Asset Platform',
      subtitle: 'Modern platform for digital asset minting, analytics, and dynamic tracking',
      tags: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Vercel'],
      description: 'Mintly is a modern, high-performance web platform built to provide an intuitive interface for digital asset minting, portfolio monitoring, and transaction management.',
      highlights: [
        'Sleek responsive web layout tuned for seamless digital asset interactions',
        'Real-time transaction & minting status updates',
        'Deployed on Vercel for high speed, reliability, and edge optimization',
        'Interactive UI powered by modern component architecture'
      ],
      github: '#',
      demo: 'https://mintly-ten.vercel.app/'
    },
    'data-scraping': {
      title: 'Data Exploration & Web Scraping Toolkit',
      subtitle: 'Automated web scraping pipeline, dataset cleaning, and exploratory data analysis',
      tags: ['Python', 'BeautifulSoup', 'Pandas', 'Data Analysis', 'Web Scraping'],
      description: 'An end-to-end data engineering repository focusing on automated web extraction, HTML structure parsing, cleaning unstructured data into structured DataFrames, and statistical data visualization.',
      highlights: [
        'Automated HTTP request handling and HTML element parsing using BeautifulSoup',
        'Data cleaning and transformation workflows utilizing Pandas DataFrames',
        'Exploratory Data Analysis (EDA) uncovering key dataset patterns and distributions',
        'Open-source repository hosted on GitHub'
      ],
      github: 'https://github.com/ruchir58/Data-Exploration-Webscrapping',
      demo: null
    }
  };

  document.querySelectorAll('.project-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      const data = projectDetailsMap[id];
      if (!data) return;

      modalBody.innerHTML = `
        <h3 class="gradient-text" style="font-size: 1.75rem; margin-bottom: 0.25rem;">${data.title}</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.25rem;">${data.subtitle}</p>

        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.5rem;">
          ${data.tags.map(t => `<span class="tag" style="color: var(--accent-primary); border-color: var(--accent-primary);">${t}</span>`).join('')}
        </div>

        <div style="background: var(--bg-tertiary); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 1.5rem;">
          <p style="line-height: 1.6; color: var(--text-main);">${data.description}</p>
        </div>

        <h4 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: var(--text-main);">Key Features & Architecture:</h4>
        <ul style="padding-left: 1.25rem; margin-bottom: 2rem; color: var(--text-muted); line-height: 1.8;">
          ${data.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>

        <div style="display: flex; gap: 1rem;">
          ${data.demo ? `<a href="${data.demo}" target="_blank" rel="noopener" class="btn btn-primary" style="padding: 0.6rem 1.25rem; font-size: 0.9rem;"><i class="fa-solid fa-external-link"></i> Live Demo</a>` : ''}
          ${data.github && data.github !== '#' ? `<a href="${data.github}" target="_blank" rel="noopener" class="btn btn-secondary" style="padding: 0.6rem 1.25rem; font-size: 0.9rem;"><i class="fa-brands fa-github"></i> GitHub Code</a>` : ''}
        </div>
      `;

      projectModal.classList.add('active');
      projectModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  const certificateDetailsMap = {
    'azure-az900': {
      title: 'Microsoft Azure Fundamentals (AZ-900)',
      subtitle: 'Official Microsoft Certification | Exam Ref #: 50949803 | Candidate ID: 29443133 | Date: May 18, 2026',
      tags: ['Azure', 'Cloud Architecture', 'Governance', 'AZ-900', 'Microsoft'],
      description: 'Official Microsoft certification demonstrating foundational knowledge of cloud services, Azure architecture, security, privacy, compliance, and cloud governance. Issued via Certiport & Pearson VUE.',
      highlights: [
        'Describe Cloud Concepts: 95% Score',
        'Describe Azure Architecture and Services: 60% Score',
        'Describe Azure Management and Governance: 59% Score',
        'Final Examination Result: PASS (Score 714 / 1000)',
        'Exam Reference #: 50949803 | ID: 29443133'
      ],
      link: 'https://www.linkedin.com/in/ruchir-khandelwal-7923333b1?utm_source=share_via&utm_content=profile&utm_medium=member_android'
    },
    'kaggle-pandas': {
      title: 'Kaggle - Pandas Data Analysis Certification',
      subtitle: 'Kaggle Learn Verified Certificate | Issued May 30, 2026',
      tags: ['Pandas', 'Python', 'Data Analytics', 'Kaggle', 'Data Wrangling'],
      description: 'Verified certification in Python Pandas for high-performance data manipulation, indexing, grouping, aggregation, data cleaning, reshaping, and dataset transformations.',
      highlights: [
        'Mastery of Pandas DataFrames & Series indexing techniques',
        'Advanced data aggregation, groupby operations, and pivoting',
        'Data cleaning, missing value strategies, and type conversions',
        'Instructors: Aleksey Bilogur & Alexis Cook (Head of Kaggle Learn)'
      ],
      link: 'https://www.linkedin.com/in/ruchir-khandelwal-7923333b1?utm_source=share_via&utm_content=profile&utm_medium=member_android'
    },
    'kaggle-sql': {
      title: 'Kaggle - Advanced SQL Certification',
      subtitle: 'Kaggle Learn Verified Certificate | Issued June 3, 2026',
      tags: ['Advanced SQL', 'BigQuery', 'Database Design', 'CTEs', 'Kaggle'],
      description: 'Certified expertise in complex SQL querying, multi-table joins, CTEs (Common Table Expressions), analytical window functions, subqueries, and Google BigQuery query optimization.',
      highlights: [
        'Writing complex CTEs and analytical SQL window functions',
        'Optimizing large dataset queries on Google BigQuery',
        'Advanced database joining, filtering, and data partitioning',
        'Instructor: Alexis Cook (Head of Kaggle Learn)'
      ],
      link: 'https://www.linkedin.com/in/ruchir-khandelwal-7923333b1?utm_source=share_via&utm_content=profile&utm_medium=member_android'
    },
    'kaggle-mlexplain': {
      title: 'Kaggle - Machine Learning Explainability',
      subtitle: 'Kaggle Learn Verified Certificate | Issued June 4, 2026',
      tags: ['ML Explainability', 'SHAP Values', 'Model Interpretability', 'Python', 'Kaggle'],
      description: 'Specialized certification in interpretable machine learning techniques, feature importance scoring, SHAP (SHapley Additive exPlanations) values, Partial Dependence Plots (PDPs), and debugging black-box models.',
      highlights: [
        'Permutation Feature Importance for model feature scoring',
        'Partial Dependence Plots (PDPs) to visualize feature impact',
        'SHAP values for individual prediction explanations & global model insights',
        'Instructors: Dan Becker & Alexis Cook (Head of Kaggle Learn)'
      ],
      link: 'https://www.linkedin.com/in/ruchir-khandelwal-7923333b1?utm_source=share_via&utm_content=profile&utm_medium=member_android'
    }
  };

  document.querySelectorAll('.cert-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      const data = certificateDetailsMap[id];
      if (!data) return;

      modalBody.innerHTML = `
        <h3 class="gradient-text" style="font-size: 1.75rem; margin-bottom: 0.25rem;">${data.title}</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.25rem;">${data.subtitle}</p>

        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.5rem;">
          ${data.tags.map(t => `<span class="tag" style="color: var(--accent-primary); border-color: var(--accent-primary);">${t}</span>`).join('')}
        </div>

        <div style="background: var(--bg-tertiary); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 1.5rem;">
          <p style="line-height: 1.6; color: var(--text-main);">${data.description}</p>
        </div>

        <h4 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: var(--text-main);">Score Breakdown & Highlights:</h4>
        <ul style="padding-left: 1.25rem; margin-bottom: 2rem; color: var(--text-muted); line-height: 1.8;">
          ${data.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>

        <div style="display: flex; gap: 1rem;">
          <a href="${data.link}" target="_blank" rel="noopener" class="btn btn-primary" style="padding: 0.6rem 1.25rem; font-size: 0.9rem;"><i class="fa-brands fa-linkedin"></i> View on LinkedIn</a>
        </div>
      `;

      projectModal.classList.add('active');
      projectModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) closeModal();
  });

  /* --------------------------------------------------------------------------
     4. DEVELOPER CLI TERMINAL SANDBOX WIDGET
     -------------------------------------------------------------------------- */
  const terminalForm = document.getElementById('terminalForm');
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');

  const commandResponses = {
    'help': `
Available Commands:
- <span style="color: #ec4899;">projects</span>    : List featured engineering projects
- <span style="color: #ec4899;">skills</span>      : Display technical skill set & stack
- <span style="color: #ec4899;">certificates</span>: View official certifications & credentials
- <span style="color: #ec4899;">stats</span>       : View key milestones & community stats
- <span style="color: #ec4899;">contact</span>     : View email address and social links
- <span style="color: #ec4899;">whoami</span>      : Developer profile overview
- <span style="color: #ec4899;">clear</span>       : Clear terminal output screen
`,
    'certificates': `
Certifications & Credentials (13 Total):
1. Microsoft Azure Fundamentals (AZ-900) [Score: 95% Cloud Concepts | PASS]
2. Kaggle - Pandas Data Analysis
3. Kaggle - Advanced SQL (BigQuery)
4. Kaggle - Machine Learning Explainability (SHAP Values)
5. 9+ Additional Certifications published on LinkedIn Profile
`,
    'stats': `
Milestones & Highlights:
- Repositories : 7+
- LinkedIn     : 300+ Connections
- Certificates : 13
- Community    : Member of "Easy Knowledge Club"
`,
    'projects': `
Featured Projects:
1. Sales Dashboard [Next.js 14, Supabase, Recharts | Live Demo: https://ruchir-sales-dashboard.vercel.app/]
2. Nyay Saathi [AI Legal Awareness Platform]
3. AR Glass Testing [Virtual Try-on & Vision Simulation]
4. Dukaan Saathi [Merchant CRM & Order Manager]
5. F1 Ticket Booking [HTML5, CSS3 | Live Demo: https://ruchir58.github.io/F1/]
6. Mintly [Digital Asset Platform | Live Demo: https://mintly-ten.vercel.app/]
7. Data Exploration & Web Scraping [Python, BeautifulSoup, Pandas | GitHub: https://github.com/ruchir58/Data-Exploration-Webscrapping]
`,
    'skills': `
Technical Stack & Skills:
- Skills: Model Training, NumPy, Pandas, Matplotlib, Data Pipelines, AI Agent Orchestration
- Core Languages: Python, HTML, CSS, Java, C, JavaScript (ES6+), SQL
- Tools & Platforms: Google Antigravity, Google AI Studio, VS Code, Git & GitHub, IntelliJ IDEA
`,
    'contact': `
Contact Details:
- Email: <a href="mailto:ruchirkhandelwal26@gmail.com" style="color: #38bdf8; text-decoration: underline;">ruchirkhandelwal26@gmail.com</a>
- GitHub: <a href="https://github.com/ruchir58" target="_blank" style="color: #38bdf8; text-decoration: underline;">github.com/ruchir58</a>
- LinkedIn: <a href="https://www.linkedin.com/in/ruchir-khandelwal-7923333b1?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" style="color: #38bdf8; text-decoration: underline;">linkedin.com/in/ruchir-khandelwal</a>
`,
    'whoami': `
Developer Profile:
Name: Ruchir Khandelwal
Role: AI/ML Developer & Full-Stack Engineer
Core Stack: Python, HTML, CSS, Next.js, AI Agent Frameworks
Milestones: 7+ Repos, 300+ Connections, 13 Certificates, Member of Easy Knowledge Club
Status: Available for exciting technical roles & collaborations
`
  };

  terminalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cmd = terminalInput.value.trim().toLowerCase();
    if (!cmd) return;

    // Append input line
    const userLine = document.createElement('div');
    userLine.className = 'terminal-line';
    userLine.innerHTML = `<span class="terminal-prompt">ruchir@dev:~$</span> <span>${escapeHtml(cmd)}</span>`;
    terminalOutput.appendChild(userLine);

    if (cmd === 'clear') {
      terminalOutput.innerHTML = `
        <div class="terminal-line">Terminal output cleared.</div>
        <div class="terminal-line">Type <span style="color: var(--accent-primary); font-weight: 600;">help</span> to view available commands.</div>
      `;
    } else if (commandResponses[cmd]) {
      const respLine = document.createElement('div');
      respLine.className = 'terminal-line';
      respLine.style.color = '#e2e8f0';
      respLine.innerHTML = commandResponses[cmd];
      terminalOutput.appendChild(respLine);
    } else {
      const errLine = document.createElement('div');
      errLine.className = 'terminal-line';
      errLine.style.color = '#ef4444';
      errLine.textContent = `Command not recognized: '${cmd}'. Type 'help' for options.`;
      terminalOutput.appendChild(errLine);
    }

    terminalInput.value = '';
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  });

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /* --------------------------------------------------------------------------
     5. COPY TO CLIPBOARD & TOAST NOTIFICATIONS
     -------------------------------------------------------------------------- */
  async function copyTextToClipboard(text) {
    // Strategy 1: Modern Clipboard API
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.warn('Clipboard API writeText failed, using fallback:', err);
      }
    }

    // Strategy 2: Fail-safe visible off-screen DOM selection fallback
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.width = '2em';
      textArea.style.height = '2em';
      textArea.style.padding = '0';
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
      textArea.style.background = 'transparent';
      textArea.style.opacity = '0.01';
      textArea.setAttribute('readonly', '');

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      textArea.setSelectionRange(0, 99999);

      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) return true;
    } catch (err) {
      console.warn('document.execCommand copy failed:', err);
    }

    return false;
  }

  async function handleCopyAction(btn, textToCopy) {
    if (!textToCopy) return;

    const success = await copyTextToClipboard(textToCopy);
    if (success) {
      const textSpan = btn.querySelector('span');
      const icon = btn.querySelector('i');
      const originalText = textSpan ? textSpan.textContent : 'Copy';
      const originalIcon = icon ? icon.className : 'fa-regular fa-copy';

      btn.classList.add('copied');
      if (textSpan) textSpan.textContent = 'Copied!';
      if (icon) icon.className = 'fa-solid fa-check';

      showToast(`Copied "${textToCopy}" to clipboard! ✨`);

      setTimeout(() => {
        btn.classList.remove('copied');
        if (textSpan) textSpan.textContent = originalText;
        if (icon) icon.className = originalIcon;
      }, 2000);
    } else {
      showToast(`Text selected: "${textToCopy}". Use Ctrl+C to copy.`);
    }
  }

  // Copy Buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const textToCopy = btn.getAttribute('data-copy');
      handleCopyAction(btn, textToCopy);
    });
  });

  // Direct click on text target (e.g. email address text)
  document.querySelectorAll('.copy-target').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const textToCopy = el.getAttribute('data-copy');
      const parentCard = el.closest('.contact-card');
      const btn = parentCard ? parentCard.querySelector('.copy-btn') : el;
      handleCopyAction(btn, textToCopy);
    });
  });

  const toastContainer = document.getElementById('toastContainer');
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      toast.style.transition = 'all 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  /* --------------------------------------------------------------------------
     6. BACK TO TOP BUTTON & SCROLL HIGHLIGHTING
     -------------------------------------------------------------------------- */
  const backToTopBtn = document.getElementById('backToTop');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Back to top visibility
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Scroll spy active nav link
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});

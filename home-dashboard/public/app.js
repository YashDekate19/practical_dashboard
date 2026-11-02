
// State Variables
let practicals = [];
let statuses = {};
let currentFilter = 'all';
let searchQuery = '';
let autoRefreshTimer = null;


// DOM Elements
const container = document.getElementById('practicalsContainer');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearch');
const filterPills = document.querySelectorAll('.filter-pill');
const activeServicesCount = document.getElementById('activeServicesCount');


// Modal Elements
const viewerModal = document.getElementById('viewerModal');
const viewerFrame = document.getElementById('viewerFrame');
const modalBadge = document.getElementById('modalBadge');
const modalTitle = document.getElementById('modalTitle');
const modalUrlText = document.getElementById('modalUrlText');
const modalReloadBtn = document.getElementById('modalReloadBtn');
const modalExternalLink = document.getElementById('modalExternalLink');
const modalCloseBtn = document.getElementById('modalCloseBtn');


// Initialize Dashboard
document.addEventListener('DOMContentLoaded', async () => {

  setupEventListeners();

  await loadPracticals();

  await refreshStatus();

  startAutoRefresh();

});


// Setup Event Listeners
function setupEventListeners() {

  // Search Input
  searchInput.addEventListener('input', (e) => {

    searchQuery = e.target.value.toLowerCase().trim();

    clearSearchBtn.style.display =
      searchQuery ? 'block' : 'none';

    renderCards();

  });


  // Clear Search
  clearSearchBtn.addEventListener('click', () => {

    searchInput.value = '';
    searchQuery = '';

    clearSearchBtn.style.display = 'none';

    renderCards();

  });


  // Filter Buttons
  filterPills.forEach(pill => {

    pill.addEventListener('click', () => {

      filterPills.forEach(p =>
        p.classList.remove('active')
      );

      pill.classList.add('active');

      currentFilter = pill.getAttribute('data-filter');

      renderCards();

    });

  });


  // Modal Controls
  modalCloseBtn.addEventListener('click', closeModal);


  // Reload Preview
  modalReloadBtn.addEventListener('click', () => {

    const src = viewerFrame.src;

    viewerFrame.src = '';

    viewerFrame.src = src;

  });


  // Close Modal on Outside Click
  viewerModal.addEventListener('click', (e) => {

    if (e.target === viewerModal) {
      closeModal();
    }

  });


  // Escape Key to Close Modal
  document.addEventListener('keydown', (e) => {

    if (e.key === 'Escape') {
      closeModal();
    }

  });

}


// Load Practical Details from Backend
async function loadPracticals() {

  try {

    const res = await fetch('/api/practicals');

    if (!res.ok) {
      throw new Error('Failed to load practicals definition');
    }

    practicals = await res.json();

    renderCards();

  } catch (error) {

    console.error('Error loading practicals:', error);

    container.innerHTML = `
      <div class="empty-state">
        <p>
          Could not load practicals list.
          Please ensure the dashboard server is running.
        </p>
      </div>
    `;

  }

}


// Check Live Status from Backend
async function refreshStatus() {

  try {

    const res = await fetch('/api/status');

    if (!res.ok) {
      throw new Error('Status endpoint error');
    }

    statuses = await res.json();

    updateLiveMetrics();

    renderCards();

  } catch (error) {

    console.warn('Status check unreachable:', error);

  }

}


// Automatic Status Refresh
function startAutoRefresh() {

  if (autoRefreshTimer) {
    clearInterval(autoRefreshTimer);
  }

  autoRefreshTimer = setInterval(async () => {

    await refreshStatus();

  }, 7000);

}


// Update Live Status Metrics
function updateLiveMetrics() {

  let readyCount = 0;

  for (const key in statuses) {

    if (statuses[key].status.startsWith('Ready')) {
      readyCount++;
    }

  }

  activeServicesCount.textContent =
    `${readyCount} / ${practicals.length || 6} Ready`;

}


// Render Practical Cards
function renderCards() {

  if (!practicals || practicals.length === 0) {
    return;
  }


  const filtered = practicals.filter(p => {

    // Category Filter
    if (
      currentFilter !== 'all' &&
      p.type !== currentFilter
    ) {
      return false;
    }


    // Search Filter
    if (searchQuery) {

      const matchTitle =
        p.title.toLowerCase().includes(searchQuery);

      const matchSubtitle =
        p.subtitle.toLowerCase().includes(searchQuery);

      const matchDesc =
        p.description.toLowerCase().includes(searchQuery);

      const matchTech =
        p.tech.some(t =>
          t.toLowerCase().includes(searchQuery)
        );

      const matchFolder =
        p.folder.toLowerCase().includes(searchQuery);


      return (
        matchTitle ||
        matchSubtitle ||
        matchDesc ||
        matchTech ||
        matchFolder
      );

    }

    return true;

  });


  // No Results Found
  if (filtered.length === 0) {

    container.innerHTML = `
      <div class="empty-state">

        <p>
          No practicals match your search
          "${escapeHtml(searchQuery)}".
        </p>

        <button
          class="btn btn-secondary btn-sm"
          onclick="clearFilters()"
          style="margin-top:12px;"
        >
          Reset Filters
        </button>

      </div>
    `;

    return;

  }


  // Display Cards
  container.innerHTML = filtered
    .map(p => createCardHtml(p))
    .join('');


  attachCardEvents();

}


// Clear Search and Filters
function clearFilters() {

  searchInput.value = '';

  searchQuery = '';

  currentFilter = 'all';


  filterPills.forEach(p =>
    p.classList.remove('active')
  );

  filterPills[0].classList.add('active');


  renderCards();

}


// Create Practical Card HTML
function createCardHtml(p) {

  const currentStatus = statuses[p.id] || {

    status: 'Checking...',

    badgeClass: 'badge-stopped',

    details: 'Waiting for heartbeat response'

  };


  // Status Badge
  const statusBadge = `

    <span class="status-badge ${currentStatus.badgeClass}">

      <span class="status-dot"></span>

      <span>${currentStatus.status}</span>

    </span>

  `;


  // Technology Badges
  const techBadges = p.tech.map(t => `

    <span class="tech-tag">
      ${escapeHtml(t)}
    </span>

  `).join('');


  // Practical URL
  let openUrl = p.externalUrl;

  let isExternalService =
    p.type === 'fullstack' || p.type === 'vite';


  return `

    <article class="practical-card" data-id="${p.id}">


      <!-- Card Header -->
      <div class="card-top">

        <div class="badge-group">

          <span class="pr-number-badge">
            ${p.number}
          </span>

          <span class="type-pill ${p.type}">

            ${
              p.type === 'static'
                ? 'Static Web'
                : p.type === 'fullstack'
                  ? 'Flask + DB'
                  : 'React Vite'
            }

          </span>

        </div>

        ${statusBadge}

      </div>


      <!-- Card Title -->
      <div class="card-title-group">

        <h2 class="card-title">
          ${escapeHtml(p.title)}
        </h2>

        <div class="card-subtitle">
          ${escapeHtml(p.subtitle)}
        </div>

      </div>


      <!-- Card Description -->
      <p class="card-description">
        ${escapeHtml(p.description)}
      </p>


      <!-- Technologies -->
      <div class="card-tech-list">

        ${techBadges}

      </div>


      <!-- Practical Information -->
      <div class="card-meta-box">

        <div class="meta-row">

          <span class="meta-label">
            Location
          </span>

          <span class="meta-value">
            ${escapeHtml(p.folder)}
          </span>

        </div>


        <div class="meta-row">

          <span class="meta-label">
            Port / Target
          </span>

          <span class="meta-value">
            ${escapeHtml(p.port)}
          </span>

        </div>


        <div class="meta-status-text">

          ${escapeHtml(currentStatus.details)}

        </div>

      </div>


      <!-- Card Actions -->
      <div class="card-actions">

        <div class="primary-actions">


          <!-- Open Practical -->
          <a
            href="${openUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary open-practical-btn"
            data-id="${p.id}"
            id="openBtn-${p.id}"
          >

            <svg width="15" height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2">

              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>

              <polyline points="15 3 21 3 21 9"></polyline>

              <line x1="10" y1="14" x2="21" y2="3"></line>

            </svg>

            <span>Open Practical</span>

          </a>


          <!-- Preview Button -->
          <button
            class="btn btn-secondary preview-btn"
            data-id="${p.id}"
            id="previewBtn-${p.id}"
          >

            <svg width="15" height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2">

              <rect x="2" y="3" width="20" height="14"
                rx="2" ry="2"></rect>

              <line x1="8" y1="21" x2="16" y2="21"></line>

              <line x1="12" y1="17" x2="12" y2="21"></line>

            </svg>

            <span>Preview</span>

          </button>

        </div>


        <!-- Service Controls -->
        ${
          p.serviceKey ? `

            <div class="service-controls">

              ${
                currentStatus.isLive
                  ? `

                    <button
                      class="btn btn-sm btn-danger service-stop-btn"
                      data-service="${p.serviceKey}"
                    >
                      Stop Service
                    </button>

                  `
                  : `

                    <button
                      class="btn btn-sm btn-success service-start-btn"
                      data-service="${p.serviceKey}"
                    >
                      Start Service
                    </button>

                  `
              }


              <button
                class="btn btn-sm btn-outline copy-cmd-btn"
                data-cmd="${escapeHtml(p.command)}"
                title="Copy Run Command"
              >
                Copy Command
              </button>

            </div>

          ` : ''
        }

      </div>

    </article>

  `;

}


// Attach Card Event Listeners
function attachCardEvents() {


  // Preview Practical
  document.querySelectorAll('.preview-btn')
    .forEach(btn => {

      btn.addEventListener('click', () => {

        const id = btn.getAttribute('data-id');

        const practical = practicals.find(
          p => p.id === id
        );

        if (practical) {
          openModal(practical);
        }

      });

    });


  // Start Service
  document.querySelectorAll('.service-start-btn')
    .forEach(btn => {

      btn.addEventListener('click', async () => {

        const service = btn.getAttribute('data-service');

        btn.textContent = 'Starting...';

        btn.disabled = true;


        try {

          const res = await fetch(
            `/api/service/${service}/start`,
            { method: 'POST' }
          );

          const data = await res.json();

          showToast(
            data.message || 'Service start command dispatched'
          );


          setTimeout(async () => {

            await refreshStatus();

          }, 2000);


        } catch (err) {

          showToast(
            'Failed to start service: ' + err.message
          );

          btn.disabled = false;

        }

      });

    });


  // Stop Service
  document.querySelectorAll('.service-stop-btn')
    .forEach(btn => {

      btn.addEventListener('click', async () => {

        const service = btn.getAttribute('data-service');

        btn.textContent = 'Stopping...';

        btn.disabled = true;


        try {

          const res = await fetch(
            `/api/service/${service}/stop`,
            { method: 'POST' }
          );

          const data = await res.json();

          showToast('Service stopped');


          setTimeout(async () => {

            await refreshStatus();

          }, 1500);


        } catch (err) {

          showToast(
            'Failed to stop service: ' + err.message
          );

          btn.disabled = false;

        }

      });

    });


  // Copy Run Command
  document.querySelectorAll('.copy-cmd-btn')
    .forEach(btn => {

      btn.addEventListener('click', () => {

        const cmd = btn.getAttribute('data-cmd');


        navigator.clipboard.writeText(cmd)

          .then(() => {

            showToast(`Copied: ${cmd}`);

          })

          .catch(() => {

            showToast(`Command: ${cmd}`);

          });

      });

    });

}


// Open Practical Preview Modal
function openModal(p) {

  let url = p.entryPath;

  const currentStatus = statuses[p.id];


  // Practical 6 Preview Fallback
  if (
    p.id === 'pr6' &&
    (!currentStatus || !currentStatus.isLive) &&
    p.previewUrl
  ) {

    url = p.previewUrl;

  }


  modalBadge.textContent = p.number;

  modalTitle.textContent = p.title;

  modalUrlText.textContent = url;

  modalExternalLink.href = url;

  viewerFrame.src = url;

  viewerModal.style.display = 'flex';

}


// Close Preview Modal
function closeModal() {

  viewerModal.style.display = 'none';

  viewerFrame.src = '';

}


// Show Toast Notification
function showToast(message) {

  const existing = document.querySelector('.toast');

  if (existing) {
    existing.remove();
  }


  const toast = document.createElement('div');

  toast.className = 'toast';

  toast.textContent = message;

  document.body.appendChild(toast);


  setTimeout(() => {

    toast.style.opacity = '0';

    toast.style.transition = 'opacity 0.3s ease';


    setTimeout(() => {

      toast.remove();

    }, 300);

  }, 2800);

}


// HTML Escape Helper
function escapeHtml(str) {

  if (!str) return '';

  return String(str)

    .replace(/&/g, '&amp;')

    .replace(/</g, '&lt;')

    .replace(/>/g, '&gt;')

    .replace(/"/g, '&quot;')

    .replace(/'/g, '&#039;');

}

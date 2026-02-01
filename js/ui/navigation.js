import { NOTIFICATION_TYPES } from '../config.js';

// Loading indicator
export function showLoading(message = 'Loading...') {
    // Remove existing overlay if any
    hideLoading();

    const overlay = document.createElement('div');
    overlay.id = 'loadingOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99999;
        backdrop-filter: blur(3px);
    `;

    overlay.innerHTML = `
        <div class="text-center text-white">
            <div class="spinner-border spinner-border-lg text-primary mb-3" role="status"></div>
            <h5 class="mb-2">${message}</h5>
            <p class="text-muted mb-0">Loading data from GitHub Pages...</p>
            <div class="progress mt-3" style="width: 300px; margin: 0 auto;">
                <div id="loadingProgress" class="progress-bar progress-bar-striped progress-bar-animated" style="width: 0%"></div>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    // Animate progress bar
    let progress = 0;
    const progressInterval = setInterval(() => {
        if (progress < 50) {
            progress += 50;
            const progressBar = document.getElementById('loadingProgress');
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }
        }
    }, 0);

    // Store interval ID to clear later
    overlay.dataset.intervalId = progressInterval;
}

export function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        // Clear progress animation
        if (overlay.dataset.intervalId) {
            clearInterval(parseInt(overlay.dataset.intervalId));
        }
        overlay.remove();
    }
}

export function updateLoadingProgress(percent) {
    const progressBar = document.getElementById('loadingProgress');
    if (progressBar) {
        progressBar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
    }
}

// Notification system
export function showNotification(message, type = NOTIFICATION_TYPES.INFO, duration = 5000) {
    const types = {
        [NOTIFICATION_TYPES.SUCCESS]: { class: 'alert-success', icon: 'fas fa-check-circle' },
        [NOTIFICATION_TYPES.ERROR]: { class: 'alert-danger', icon: 'fas fa-exclamation-circle' },
        [NOTIFICATION_TYPES.WARNING]: { class: 'alert-warning', icon: 'fas fa-exclamation-triangle' },
        [NOTIFICATION_TYPES.INFO]: { class: 'alert-info', icon: 'fas fa-info-circle' }
    };

    const config = types[type] || types[NOTIFICATION_TYPES.INFO];

    // Remove existing notifications
    const existingAlerts = document.querySelectorAll('.notification-alert');
    existingAlerts.forEach(alert => {
        if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
        }
    });

    const alertDiv = document.createElement('div');
    alertDiv.className = `notification-alert alert ${config.class} alert-dismissible fade show`;
    alertDiv.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 10000;
        min-width: 300px;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        border: none;
    `;

    alertDiv.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="${config.icon} me-2 fs-5"></i>
            <div class="flex-grow-1">${message}</div>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;

    document.body.appendChild(alertDiv);

    // Auto remove after duration
    if (duration > 0) {
        setTimeout(() => {
            if (alertDiv.parentNode) {
                const bsAlert = new bootstrap.Alert(alertDiv);
                bsAlert.close();
            }
        }, duration);
    }

    return alertDiv;
}

// Initialize Bootstrap tooltips
export function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}
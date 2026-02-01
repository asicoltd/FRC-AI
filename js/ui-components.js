// UI Components and rendering
class UIComponents {
    // Initialize Bootstrap tooltips
    static initTooltips() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Load company selector
    static async loadCompanySelector() {
        await dataManager.autoDiscoverCompanies();
        const navbar = document.querySelector('.navbar .container-fluid');
        if (navbar) {
            if (navbar.querySelector('#companyDropdown')) return;

            const selectorHTML = `
                <div class="dropdown ms-3">
                    <button class="btn btn-outline-light dropdown-toggle" type="button" 
                            id="companyDropdown" data-bs-toggle="dropdown"
                            data-bs-toggle="tooltip" title="Switch Company">
                        <i class="fas fa-building me-2"></i>Company ${appState.currentCompanyId}
                    </button>
                    <ul class="dropdown-menu" id="companyList">
                        ${appState.availableCompanies.map(id => `
                            <li>
                                <a class="dropdown-item ${id === appState.currentCompanyId ? 'active' : ''}" 
                                   href="#" onclick="dataManager.switchCompany(${id})">
                                    <i class="fas fa-building me-2"></i>Company ${id}
                                    ${id === appState.currentCompanyId ? '<i class="fas fa-check ms-2"></i>' : ''}
                                </a>
                            </li>
                        `).join('')}
                        <li><hr class="dropdown-divider"></li>
                        <li>
                            <a class="dropdown-item" href="#" onclick="refreshCompanyList()">
                                <i class="fas fa-sync me-2"></i>Refresh Company List
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" onclick="addNewCompanyDialog()">
                                <i class="fas fa-plus me-2"></i>Add New Company
                            </a>
                        </li>
                    </ul>
                </div>
            `;

            const brand = navbar.querySelector('.navbar-brand');
            if (brand) {
                brand.insertAdjacentHTML('afterend', selectorHTML);
            }

            this.initTooltips();
        }
    }

    // Update company selector UI
    static updateCompanySelector(companyId) {
        const dropdownButton = document.getElementById('companyDropdown');
        const dropdownItems = document.querySelectorAll('#companyList .dropdown-item');

        if (dropdownButton) {
            dropdownButton.innerHTML = `<i class="fas fa-building me-2"></i>Company ${companyId}`;
        }

        dropdownItems.forEach(item => {
            item.classList.remove('active');
            if (item.textContent.includes(`Company ${companyId}`)) {
                item.classList.add('active');
            }
        });
    }

    // Update company header with real data
    static updateCompanyHeader(companyId) {
        const header = document.querySelector('.company-header');
        if (!header) return;

        const companyData = appState.allJSONData[2];
        if (!companyData) return;

        const profile = companyData.frc_analysis_report?.entity?.entity_profile;

        header.innerHTML = `
            <div class="row align-items-center">
                <div class="col-md-8">
                    <h2 class="mb-2">${profile?.legal_name || `Company ${companyId}`}</h2>
                    <p class="mb-1">${profile?.trade_name || ''}</p>
                    <p class="mb-0">Registration: ${profile?.registration_number || 'N/A'}</p>
                </div>
                <div class="col-md-4 text-end">
                    <span class="badge ${profile?.listing_status === 'Listed' ? 'bg-success' : 'bg-secondary'} fs-6">
                        ${profile?.listing_status || 'Unknown'}
                    </span>
                    <p class="mt-2 mb-0">FYE: ${profile?.financial_year_end || 'N/A'}</p>
                    <p class="mb-0">Data Source: GitHub Pages</p>
                </div>
            </div>
        `;
    }

    // Add debug button
    static addDebugButton() {
        const navbar = document.querySelector('.navbar .container-fluid');
        if (!navbar) return;

        if (navbar.querySelector('[onclick="showDebugInfo()"]')) return;

        const debugBtn = `
            <button class="btn btn-outline-light btn-sm ms-2" onclick="showDebugInfo()" 
                    data-bs-toggle="tooltip" title="Debug Information">
                <i class="fas fa-bug"></i>
            </button>
        `;

        const companyDropdown = navbar.querySelector('.dropdown');
        if (companyDropdown) {
            companyDropdown.insertAdjacentHTML('afterend', debugBtn);
        }
    }

    // Add test button
    static addTestButton() {
        const navbar = document.querySelector('.navbar .container-fluid');
        if (!navbar) return;

        if (navbar.querySelector('[onclick="testAllUrls()"]')) return;

        const testBtn = `
            <button class="btn btn-outline-warning btn-sm ms-2" onclick="testAllUrls()" 
                    data-bs-toggle="tooltip" title="Test All URLs">
                <i class="fas fa-wifi"></i>
            </button>
        `;

        const debugBtn = navbar.querySelector('[onclick="showDebugInfo()"]');
        if (debugBtn) {
            debugBtn.insertAdjacentHTML('afterend', testBtn);
        }
    }

    // Update active sidebar item
    static updateActiveSidebarItem(section) {
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeItem = document.querySelector(`.sidebar-item[onclick*="${section}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }

    // Get main content container
    static getMainContent() {
        return document.getElementById('mainContent');
    }
}

// Refresh company list
async function refreshCompanyList() {
    await dataManager.autoDiscoverCompanies();
    const dropdown = document.getElementById('companyList');
    if (dropdown) {
        dropdown.innerHTML = `
            ${appState.availableCompanies.map(id => `
                <li><a class="dropdown-item ${id === appState.currentCompanyId ? 'active' : ''}" 
                       href="#" onclick="dataManager.switchCompany(${id})">Company ${id}</a></li>
            `).join('')}
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" onclick="refreshCompanyList()">
                <i class="fas fa-sync me-2"></i>Refresh List
            </a></li>
        `;
    }
    Notifications.show(`Found ${appState.availableCompanies.length} companies`, 'info');
}
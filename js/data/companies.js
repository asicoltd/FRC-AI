import { GITHUB_PAGES_BASE } from '../config.js';
import { loadJSONData } from './loader.js';
import { showNotification, showLoading, hideLoading, updateLoadingProgress } from '../ui/notifications.js';
import { setUrlParameter } from '../utilities.js';

// Global company management
export let currentCompanyId = 1;
export let availableCompanies = [];

// Load company selector
export async function loadCompanySelector() {
    let companies = [];
    let i = 1;

    while (true) {
        const url = `${GITHUB_PAGES_BASE}/${i}/1.json`;
        try {
            const response = await fetch(url);

            if (!response.ok) {
                console.log(`🚫 No more JSON files found at ${url}`);
                break;
            }

            const companyData = await response.json();
            companies.push(i);
            console.log(`📋 Found company ${i}`);

        } catch (error) {
            console.log(`⚠️ Error fetching ${url}:`, error);
            break;
        }

        i++;
    }

    availableCompanies = companies;
    console.log('✅ All available companies:', availableCompanies);

    // Add company selector to navbar
    const navbar = document.querySelector('.navbar .container-fluid');
    if (navbar) {
        // Check if selector already exists
        if (navbar.querySelector('#companyDropdown')) return;

        const selectorHTML = `
            <div class="dropdown ms-3">
                <button class="btn btn-outline-light dropdown-toggle" type="button" 
                        id="companyDropdown" data-bs-toggle="dropdown"
                        data-bs-toggle="tooltip" title="Switch Company">
                    <i class="fas fa-building me-2"></i>Company ${currentCompanyId}
                </button>
                <ul class="dropdown-menu" id="companyList">
                    ${availableCompanies.map(id => `
                        <li>
                            <a class="dropdown-item ${id === currentCompanyId ? 'active' : ''}" 
                               href="#" onclick="switchCompany(${id})">
                                <i class="fas fa-building me-2"></i>Company ${id}
                                ${id === currentCompanyId ? '<i class="fas fa-check ms-2"></i>' : ''}
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

        // Insert after the brand
        const brand = navbar.querySelector('.navbar-brand');
        if (brand) {
            brand.insertAdjacentHTML('afterend', selectorHTML);
        }

        // Initialize tooltips
        initTooltips();
    }
}

// Switch between companies
export async function switchCompany(companyId) {
    if (companyId === currentCompanyId) return;

    // Update global state
    currentCompanyId = companyId;

    // Update URL and storage
    localStorage.setItem('frc_last_company_id', companyId.toString());
    setUrlParameter('company', companyId);

    // Show loading
    showLoading(`Loading data for Company ${companyId}...`);

    try {
        // Load company data
        await loadCompanyData(companyId);
        
        // Update UI
        updateCompanySelector(companyId);
        
        // Refresh current view
        const currentSection = document.querySelector('.sidebar-item.active')?.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
        if (currentSection) {
            loadSection(currentSection);
        } else {
            loadDashboard();
        }
        
        showNotification(`Switched to Company ${companyId}`, 'success');
    } catch (error) {
        console.error('Error switching company:', error);
        showNotification('Failed to load company data', 'error');
    } finally {
        hideLoading();
    }
}

// Update company selector UI
export function updateCompanySelector(companyId) {
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
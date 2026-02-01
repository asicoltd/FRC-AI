// Import all necessary modules
import { GITHUB_PAGES_BASE, DEFAULT_COMPANY_ID } from './config.js';
import { loadCompanySelector, switchCompany, currentCompanyId, availableCompanies } from './data/companies.js';
import { allJSONData, loadJSONData, checkCompanyExists } from './data/loader.js';
import { loadDashboard, filterCompanies } from './modules/dashboard.js';
import { loadEntityProfile } from './modules/entity.js';
import { loadFinancialStatements } from './modules/financial.js';
import { loadComplianceMatrix } from './modules/compliance.js';
import { loadAuditGovernance } from './modules/audit.js';
import { loadMaterialDepartures } from './modules/risk.js';
import { loadSkepticism } from './modules/skepticism.js';
import { loadDataImport } from './modules/data-import.js';
import { loadReportGenerator } from './modules/reports.js';
import { showNotification, initTooltips, showLoading, hideLoading, updateLoadingProgress } from './ui/notifications.js';
import { getUrlParameter, setUrlParameter, formatNumber } from './utilities.js';

// Make functions available globally for HTML onclick handlers
window.allJSONData = allJSONData;
window.currentCompanyId = currentCompanyId;
window.availableCompanies = availableCompanies;

// Export functions to window object
window.switchCompany = switchCompany;
window.loadSection = loadSection;
window.loadDashboard = loadDashboard;
window.loadEntityProfile = loadEntityProfile;
window.loadFinancialStatements = loadFinancialStatements;
window.loadFinancialAnalysis = () => loadFinancialStatements();
window.loadComplianceMatrix = loadComplianceMatrix;
window.loadAuditGovernance = loadAuditGovernance;
window.loadMaterialDepartures = loadMaterialDepartures;
window.loadRiskAssessment = () => loadMaterialDepartures();
window.loadSkepticism = loadSkepticism;
window.loadDataImport = loadDataImport;
window.loadReportGenerator = loadReportGenerator;
window.filterCompanies = filterCompanies;
window.formatNumber = formatNumber;

// Initialize FontAwesome
function initializeFontAwesome() {
    const script = document.createElement('script');
    script.src = 'https://kit.fontawesome.com/a076d05399.js';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
}

// Function to load company data
async function loadCompanyData(companyId) {
    showLoading(`Loading data for Company ${companyId}...`);

    // Update global state
    window.currentCompanyId = companyId;

    // Update URL and storage
    localStorage.setItem('frc_last_company_id', companyId.toString());
    setUrlParameter('company', companyId);

    console.log(`📂 Starting to load data for company ${companyId}`);

    let loadedCount = 0;
    const totalFiles = 26;

    // Load files with progress tracking
    for (let i = 1; i <= totalFiles; i++) {
        try {
            updateLoadingProgress((i - 1) / totalFiles * 100);
            const data = await loadJSONData(companyId, i);
            if (data) {
                allJSONData[i] = data;
                loadedCount++;
                console.log(`✅ Loaded file ${i}.json`);
            }
        } catch (error) {
            console.error(`🚨 Error loading file ${i}.json:`, error);
        }
    }

    updateLoadingProgress(100);
    hideLoading();

    console.log(`📊 Loaded ${loadedCount}/${totalFiles} files for Company ${companyId}`);

    if (loadedCount > 0) {
        // Cache the loaded data
        localStorage.setItem(`frc_company_${companyId}_data`, JSON.stringify({
            data: allJSONData,
            timestamp: new Date().toISOString()
        }));

        showNotification(`Loaded ${loadedCount} files for Company ${companyId}`, 'success');
        return true;
    } else {
        showNotification(`❌ No data found for Company ${companyId}`, 'error');
        return false;
    }
}

// Navigation function
function loadSection(section) {
    // Update active sidebar item
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.sidebar-item').classList.add('active');

    // Load section content
    switch (section) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'entity':
            loadEntityProfile();
            break;
        case 'financial-statements':
        case 'financial-analysis':
            loadFinancialStatements();
            break;
        case 'compliance':
            loadComplianceMatrix();
            break;
        case 'audit-governance':
            loadAuditGovernance();
            break;
        case 'material-departures':
        case 'risk-assessment':
            loadMaterialDepartures();
            break;
        case 'skepticism':
            loadSkepticism();
            break;
        case 'data-import':
            loadDataImport();
            break;
        case 'report-generator':
            loadReportGenerator();
            break;
        default:
            loadDashboard();
    }
}

// Initialize the application
async function initializeApp() {
    console.log('🚀 FRC Portal Initializing...');

    // Initialize FontAwesome
    initializeFontAwesome();

    // Initialize Bootstrap components
    initTooltips();

    // Check URL for company parameter
    const urlCompanyId = getUrlParameter('company');
    if (urlCompanyId && !isNaN(parseInt(urlCompanyId))) {
        window.currentCompanyId = parseInt(urlCompanyId);
    } else {
        // Check localStorage for last company
        const savedCompanyId = localStorage.getItem('frc_last_company_id');
        if (savedCompanyId && !isNaN(parseInt(savedCompanyId))) {
            window.currentCompanyId = parseInt(savedCompanyId);
        }
    }

    // Load company selector
    await loadCompanySelector();

    // Load company data
    await loadCompanyData(window.currentCompanyId);

    // Initialize dashboard
    loadDashboard();

    console.log('✅ FRC Portal Initialized');
    showNotification('FRC Portal Ready', 'success', 2000);
}

// DOM Ready
document.addEventListener('DOMContentLoaded', function () {
    // Initialize the app
    initializeApp();
});

// Export for testing
export { loadSection, loadCompanyData };
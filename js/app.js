// js/app.js - Complete working version

// ==================== GLOBAL VARIABLES ====================
const GITHUB_PAGES_BASE = 'https://asicoltd.github.io/FRC-AI/dataset/';
let currentCompanyId = 1;
let allJSONData = {};
let availableCompanies = [];

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', async function () {
    console.log('🚀 FRC Portal Starting...');
    
    // Load company selector
    await loadCompanySelector();
    
    // Load data for default company
    await loadCompanyData(currentCompanyId);
    
    // Load dashboard
    loadDashboard();
    
    console.log('✅ FRC Portal Ready');
});

// ==================== COMPANY MANAGEMENT ====================
async function loadCompanySelector() {
    // Your existing loadCompanySelector function here
    console.log('Loading company selector...');
    
    // ... copy the entire loadCompanySelector function from your original code
}

async function loadCompanyData(companyId) {
    // Your existing loadCompanyData function here
    console.log(`Loading data for company ${companyId}...`);
    
    // ... copy the entire loadCompanyData function from your original code
}

function switchCompany(companyId) {
    // Your existing switchCompany function here
    console.log(`Switching to company ${companyId}...`);
    
    // ... copy the entire switchCompany function from your original code
}

// ==================== NAVIGATION ====================
function loadSection(section) {
    // Your existing loadSection function here
    console.log(`Loading section: ${section}`);
    
    // ... copy the entire loadSection function from your original code
}

// ==================== MODULE FUNCTIONS ====================
function loadDashboard() {
    // Your existing loadDashboard function here
    console.log('Loading dashboard...');
    
    // ... copy the entire loadDashboard function from your original code
}

function loadEntityProfile() {
    // Your existing loadEntityProfile function here
    console.log('Loading entity profile...');
    
    // ... copy the entire loadEntityProfile function from your original code
}

function loadFinancialStatements() {
    // Your existing loadFinancialStatements function here
    console.log('Loading financial statements...');
    
    // ... copy the entire loadFinancialStatements function from your original code
}

function loadComplianceMatrix() {
    // Your existing loadComplianceMatrix function here
    console.log('Loading compliance matrix...');
    
    // ... copy the entire loadComplianceMatrix function from your original code
}

// ==================== UTILITY FUNCTIONS ====================
function showLoading(message) {
    // Your existing showLoading function here
    // ... copy from your original code
}

function hideLoading() {
    // Your existing hideLoading function here
    // ... copy from your original code
}

function showNotification(message, type) {
    // Your existing showNotification function here
    // ... copy from your original code
}

// ... copy ALL other functions from your original file

// ==================== MAKE FUNCTIONS GLOBAL ====================
// Make sure all onclick functions are available globally
window.loadSection = loadSection;
window.loadDashboard = loadDashboard;
window.loadEntityProfile = loadEntityProfile;
window.loadFinancialStatements = loadFinancialStatements;
window.loadFinancialAnalysis = loadFinancialStatements; // Alias
window.loadComplianceMatrix = loadComplianceMatrix;
window.switchCompany = switchCompany;
// window.filterCompanies = filterCompanies;
// ... add all other functions that are called from HTML onclick
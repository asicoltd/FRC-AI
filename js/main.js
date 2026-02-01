// Main application entry point
class App {
    static async initialize() {
        console.log('🚀 FRC Portal Initializing...');

        // Initialize Bootstrap components
        UIComponents.initTooltips();

        // Check URL for company parameter
        const urlCompanyId = Helpers.getUrlParameter('company');
        if (urlCompanyId && !isNaN(parseInt(urlCompanyId))) {
            appState.currentCompanyId = parseInt(urlCompanyId);
        } else {
            // Check localStorage for last company
            const savedCompanyId = localStorage.getItem('frc_last_company_id');
            if (savedCompanyId && !isNaN(parseInt(savedCompanyId))) {
                appState.currentCompanyId = parseInt(savedCompanyId);
            }
        }

        // Save current company ID
        localStorage.setItem('frc_last_company_id', appState.currentCompanyId.toString());
        Helpers.setUrlParameter('company', appState.currentCompanyId);

        // Load company selector
        await UIComponents.loadCompanySelector();

        // Try to load cached data first
        await dataManager.loadCachedData();

        // Then load fresh data
        await dataManager.loadCompanyData(appState.currentCompanyId);

        // Initialize dashboard
        Dashboard.load();

        // Add debug/test buttons
        UIComponents.addDebugButton();
        UIComponents.addTestButton();

        console.log('✅ FRC Portal Initialized');
        Notifications.show('FRC Portal Ready', 'success', 2000);
    }
}

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the app
    App.initialize();

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const urlCompanyId = Helpers.getUrlParameter('company');
        if (urlCompanyId && parseInt(urlCompanyId) !== appState.currentCompanyId) {
            dataManager.switchCompany(parseInt(urlCompanyId));
        }
    });
});

// Debug functions
function showDebugInfo() {
    console.log('App State:', appState);
    console.log('Available Companies:', appState.availableCompanies);
    console.log('Loaded JSON Files:', Object.keys(appState.allJSONData).length);
    
    Notifications.show(`
        <strong>Debug Info:</strong><br>
        Company: ${appState.currentCompanyId}<br>
        Files Loaded: ${Object.keys(appState.allJSONData).length}/26<br>
        Available Companies: ${appState.availableCompanies.length}
    `, 'info', 10000);
}

function testAllUrls() {
    Loading.show('Testing all URLs...');
    
    const promises = appState.availableCompanies.map(async (companyId) => {
        const url = `${CONFIG.GITHUB_PAGES_BASE}${companyId}/1.json`;
        try {
            const response = await fetch(url, { method: 'HEAD' });
            return { companyId, status: response.ok ? 'OK' : 'Failed' };
        } catch {
            return { companyId, status: 'Error' };
        }
    });

    Promise.all(promises).then(results => {
        Loading.hide();
        
        const ok = results.filter(r => r.status === 'OK').length;
        const failed = results.filter(r => r.status === 'Failed').length;
        const error = results.filter(r => r.status === 'Error').length;
        
        Notifications.show(`
            <strong>URL Test Results:</strong><br>
            Total Companies: ${results.length}<br>
            ✅ OK: ${ok}<br>
            ⚠️ Failed: ${failed}<br>
            ❌ Error: ${error}
        `, 'info', 10000);
    });
}

window.showDebugInfo = showDebugInfo;
window.testAllUrls = testAllUrls;
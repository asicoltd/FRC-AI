// Data management functions
class DataManager {
    constructor() {
        this.githubBase = CONFIG.GITHUB_PAGES_BASE;
    }

    // Load JSON data for specific company and file
    async loadJSONData(companyId, fileNumber) {
        try {
            const url = `${this.githubBase}${companyId}/${fileNumber}.json`;
            console.log('Loading:', url);

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error loading company ${companyId}, file ${fileNumber}:`, error);
            return null;
        }
    }

    // Load all data for a company
    async loadCompanyData(companyId) {
        Loading.show(`Loading data for Company ${companyId}...`);

        // Reset data for current company
        appState.allJSONData = {};
        appState.currentCompanyId = companyId;

        // Update URL and storage
        localStorage.setItem('frc_last_company_id', companyId.toString());
        Helpers.setUrlParameter('company', companyId);

        // Update company selector
        UIComponents.updateCompanySelector(companyId);

        console.log(`📂 Starting to load data for company ${companyId}`);

        let loadedCount = 0;
        const totalFiles = CONFIG.TOTAL_JSON_FILES;

        // Load files with progress tracking
        for (let i = 1; i <= totalFiles; i++) {
            try {
                Loading.updateProgress((i - 1) / totalFiles * 100);

                const data = await this.loadJSONData(companyId, i);
                if (data) {
                    appState.allJSONData[i] = data;
                    loadedCount++;
                    console.log(`✅ Loaded file ${i}.json`);
                } else {
                    console.log(`❌ Failed to load file ${i}.json`);
                }
            } catch (error) {
                console.error(`🚨 Error loading file ${i}.json:`, error);
            }
        }

        Loading.updateProgress(100);
        Loading.hide();

        console.log(`📊 Loaded ${loadedCount}/${totalFiles} files for Company ${companyId}`);

        if (loadedCount > 0) {
            // Cache the loaded data
            localStorage.setItem(`frc_company_${companyId}_data`, JSON.stringify({
                data: appState.allJSONData,
                timestamp: new Date().toISOString()
            }));

            // Update company header
            UIComponents.updateCompanyHeader(companyId);

            // Show success notification
            const successMessage = loadedCount === totalFiles
                ? `✅ Successfully loaded all ${totalFiles} files for Company ${companyId}`
                : `⚠️ Loaded ${loadedCount}/${totalFiles} files for Company ${companyId}`;

            Notifications.show(successMessage, loadedCount === totalFiles ? 'success' : 'warning');
            return true;
        } else {
            Notifications.show(`❌ No data found for Company ${companyId}`, 'error');
            return false;
        }
    }

    // Check if company exists
    async checkCompanyExists(companyId) {
        try {
            const response = await fetch(`${this.githubBase}${companyId}/1.json`, { method: 'HEAD' });
            return response.ok;
        } catch {
            return false;
        }
    }

    // Auto-discover companies
    async autoDiscoverCompanies(maxCheck = 10) {
        const promises = [];

        for (let i = 1; i <= maxCheck; i++) {
            promises.push(this.checkCompanyExists(i));
        }

        const results = await Promise.all(promises);
        appState.availableCompanies = results.filter((exists, index) => exists).map((_, index) => index + 1);
        console.log('Auto-discovered companies:', appState.availableCompanies);
    }

    // Switch between companies
    async switchCompany(companyId) {
        if (companyId === appState.currentCompanyId) return;

        // Save current data if needed
        if (Object.keys(appState.allJSONData).length > 0) {
            localStorage.setItem(`company_${appState.currentCompanyId}_data`, JSON.stringify(appState.allJSONData));
        }

        // Load new company data
        const success = await this.loadCompanyData(companyId);

        if (success) {
            // Reload current view
            if (appState.currentSection) {
                SectionManager.loadSection(appState.currentSection);
            } else {
                Dashboard.load();
            }
        }
    }

    // Load cached data
    async loadCachedData() {
        const cacheKey = `frc_company_${appState.currentCompanyId}_data`;
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
            try {
                const parsed = JSON.parse(cachedData);
                if (parsed.data && parsed.timestamp) {
                    const ageHours = (new Date() - new Date(parsed.timestamp)) / (1000 * 60 * 60);

                    if (ageHours < 24) {
                        appState.allJSONData = parsed.data;
                        console.log(`📦 Loaded cached data (${ageHours.toFixed(1)} hours old)`);
                        return true;
                    }
                }
            } catch (error) {
                console.log('❌ Cache parse error:', error);
            }
        }
        return false;
    }
}

// Initialize DataManager
window.dataManager = new DataManager();
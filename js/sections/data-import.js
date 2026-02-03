// Data Import Section
class DataImport {
    static load() {
        appState.currentSection = 'data-import';
        UIComponents.updateActiveSidebarItem('data-import');

        const content = `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 class="section-title mb-0">Data Import & Management</h3>
                    <p class="text-muted mb-0 small">Manage JSON data files and company information</p>
                </div>
                <div>
                    <span class="badge bg-info fs-6 px-3 py-2 me-2">
                        <i class="fas fa-building me-1"></i>Company ${appState.currentCompanyId}
                    </span>
                    <button class="btn btn-success me-2" onclick="DataImport.refreshCompanyData()" id="refreshBtn">
                        <i class="fas fa-sync me-2"></i> Refresh Data
                    </button>
                    <button class="btn btn-primary" onclick="DataImport.syncAllData()">
                        <i class="fas fa-database me-2"></i> Sync All Data
                    </button>
                </div>
            </div>
            
            <!-- Stats Overview -->
            <div class="row mb-4">
                <div class="col-md-3">
                    <div class="dashboard-card stats-card bg-primary text-white">
                        <div class="stats-icon">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <div class="stats-content">
                            <h3 id="loadedFilesCount">0</h3>
                            <p class="mb-0">Files Loaded</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-card stats-card bg-success text-white">
                        <div class="stats-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="stats-content">
                            <h3 id="totalFilesCount">${CONFIG.TOTAL_JSON_FILES}</h3>
                            <p class="mb-0">Total Files</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-card stats-card bg-warning text-white">
                        <div class="stats-icon">
                            <i class="fas fa-building"></i>
                        </div>
                        <div class="stats-content">
                            <h3>${appState.availableCompanies.length}</h3>
                            <p class="mb-0">Companies</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-card stats-card bg-info text-white">
                        <div class="stats-icon">
                            <i class="fas fa-server"></i>
                        </div>
                        <div class="stats-content">
                            <h3>${appState.currentCompanyId}</h3>
                            <p class="mb-0">Current ID</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-8">
                    <div class="dashboard-card">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h5 class="mb-0">
                                <i class="fas fa-database me-2 text-primary"></i>
                                JSON Data Structure - Company ${appState.currentCompanyId}
                            </h5>
                            <div class="btn-group" role="group">
                                <button class="btn btn-sm btn-outline-primary" onclick="DataImport.loadAllFiles()">
                                    <i class="fas fa-redo me-1"></i> Load All
                                </button>
                                <button class="btn btn-sm btn-outline-success" onclick="DataImport.exportAllData()">
                                    <i class="fas fa-download me-1"></i> Export All
                                </button>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-hover table-sm">
                                <thead class="table-light">
                                    <tr>
                                        <th width="80">#</th>
                                        <th>File Name</th>
                                        <th width="200">Data Category</th>
                                        <th width="120">Status</th>
                                        <th>Source URL</th>
                                    </tr>
                                </thead>
                                <tbody id="jsonFilesTable">
                                    <!-- Dynamic content will be loaded here -->
                                </tbody>
                            </table>
                        </div>
                        <div class="mt-3 d-flex justify-content-between align-items-center">
                            <small class="text-muted">
                                <i class="fas fa-info-circle me-1"></i>
                                Data source: ${CONFIG.GITHUB_PAGES_BASE}${appState.currentCompanyId}/
                            </small>
                            <div class="btn-group" role="group">
                                <button class="btn btn-sm btn-outline-secondary" onclick="DataImport.clearAllData()">
                                    <i class="fas fa-trash me-1"></i> Clear All
                                </button>
                                <button class="btn btn-sm btn-outline-info" onclick="DataImport.validateAllData()">
                                    <i class="fas fa-check me-1"></i> Validate All
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-4">
                    <!-- Company Management Card -->
                    <div class="dashboard-card mb-4">
                        <h5 class="mb-3">
                            <i class="fas fa-building me-2 text-primary"></i>
                            Company Management
                        </h5>
                        
                        <div class="mb-4">
                            <label class="form-label fw-bold">
                                <i class="fas fa-exchange-alt me-1"></i>Switch Company
                            </label>
                            <div class="input-group">
                                <select class="form-select" id="companySelect" onchange="DataImport.switchCompanyFromSelect(this.value)">
                                    ${appState.availableCompanies.map(id => `
                                        <option value="${id}" ${id === appState.currentCompanyId ? 'selected' : ''}>
                                            Company ${id} ${id === appState.currentCompanyId ? '(Current)' : ''}
                                        </option>
                                    `).join('')}
                                </select>
                                <button class="btn btn-outline-primary" type="button" onclick="DataImport.reloadCurrentCompany()">
                                    <i class="fas fa-redo"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="mb-4">
                            <label class="form-label fw-bold">
                                <i class="fas fa-plus-circle me-1"></i>Add New Company
                            </label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="newCompanyId" 
                                       placeholder="Enter Company ID" min="1" max="999">
                                <button class="btn btn-primary" type="button" onclick="DataImport.addNewCompany()">
                                    <i class="fas fa-plus me-1"></i> Add
                                </button>
                            </div>
                            <small class="form-text text-muted">Enter a new company ID to load its data</small>
                        </div>
                        
                        <div class="mb-3">
                            <label class="form-label fw-bold">
                                <i class="fas fa-upload me-1"></i>Import Local JSON
                            </label>
                            <div class="input-group">
                                <input type="file" class="form-control" id="localJsonFile" 
                                       accept=".json" multiple onchange="DataImport.handleLocalFileUpload()">
                                <button class="btn btn-outline-success" type="button" onclick="document.getElementById('localJsonFile').click()">
                                    <i class="fas fa-folder-open"></i>
                                </button>
                            </div>
                            <small class="form-text text-muted">Upload local JSON files for analysis</small>
                        </div>
                        
                        <div class="alert alert-info">
                            <div class="d-flex">
                                <div class="flex-shrink-0">
                                    <i class="fas fa-info-circle fa-lg mt-1"></i>
                                </div>
                                <div class="flex-grow-1 ms-3">
                                    <h6 class="alert-heading">Data Source Information</h6>
                                    <p class="mb-0 small">Data is loaded from GitHub Pages. Each company has ${CONFIG.TOTAL_JSON_FILES} JSON files containing financial and compliance data.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Quick Actions Card -->
                    <div class="dashboard-card">
                        <h5 class="mb-3">
                            <i class="fas fa-bolt me-2 text-warning"></i>
                            Quick Actions
                        </h5>
                        <div class="row g-2">
                            <div class="col-6">
                                <button class="btn btn-outline-primary w-100 mb-2" onclick="DataImport.checkDataCompleteness()">
                                    <i class="fas fa-clipboard-check me-1"></i> Check Completeness
                                </button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-outline-success w-100 mb-2" onclick="DataImport.backupCurrentData()">
                                    <i class="fas fa-save me-1"></i> Backup Data
                                </button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-outline-warning w-100 mb-2" onclick="DataImport.verifyDataIntegrity()">
                                    <i class="fas fa-shield-alt me-1"></i> Verify Integrity
                                </button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-outline-danger w-100 mb-2" onclick="DataImport.resetToDefault()">
                                    <i class="fas fa-undo me-1"></i> Reset Default
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Data Preview Modal (hidden until needed) -->
            <div class="modal fade" id="dataPreviewModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">JSON Data Preview</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <div class="btn-group" role="group">
                                    <button class="btn btn-sm btn-outline-primary" onclick="DataImport.copyJSONToClipboard()">
                                        <i class="fas fa-copy me-1"></i> Copy
                                    </button>
                                    <button class="btn btn-sm btn-outline-success" onclick="DataImport.downloadJSON()">
                                        <i class="fas fa-download me-1"></i> Download
                                    </button>
                                </div>
                            </div>
                            <pre id="jsonPreview" class="bg-light p-3 rounded" style="max-height: 500px; overflow: auto;"></pre>
                        </div>
                    </div>
                </div>
            </div>
        `;

        UIComponents.getMainContent().innerHTML = content;
        this.loadJSONFilesStatus();
        this.updateStats();
    }

    static updateStats() {
        const loadedCount = Object.keys(appState.allJSONData).filter(key => appState.allJSONData[key] !== null).length;
        document.getElementById('loadedFilesCount').textContent = loadedCount;
    }

    static loadJSONFilesStatus() {
        const files = [];

        for (let i = 1; i <= CONFIG.TOTAL_JSON_FILES; i++) {
            const data = appState.allJSONData[i];
            const status = data ? 'Loaded' : 'Missing';
            const url = `${CONFIG.GITHUB_PAGES_BASE}${appState.currentCompanyId}/${i}.json`;
            const category = CONFIG.CATEGORIES[i] || 'Unknown';
            const fileSize = data ? JSON.stringify(data).length : 0;
            const formattedSize = this.formatFileSize(fileSize);

            files.push({
                id: i,
                name: `${i}.json`,
                category: category,
                status: status,
                url: url,
                size: formattedSize,
                data: data
            });
        }

        const table = document.getElementById('jsonFilesTable');
        if (table) {
            table.innerHTML = '';

            files.forEach(file => {
                let statusBadge = '';
                let rowClass = '';

                if (file.status === 'Loaded') {
                    statusBadge = '<span class="badge bg-success"><i class="fas fa-check me-1"></i>Loaded</span>';
                    rowClass = 'table-success';
                } else {
                    statusBadge = '<span class="badge bg-danger"><i class="fas fa-times me-1"></i>Missing</span>';
                    rowClass = 'table-danger';
                }

                table.innerHTML += `
                    <tr class="${rowClass}">
                        <td class="fw-bold">${file.id}</td>
                        <td>
                            <div class="d-flex align-items-center">
                                <i class="fas fa-file-code text-primary me-2"></i>
                                <div>
                                    <strong>${file.name}</strong><br>
                                    <small class="text-muted">${file.size}</small>
                                </div>
                            </div>
                        </td>
                        <td>
                            <span class="badge bg-info">${file.category}</span>
                        </td>
                        <td>${statusBadge}</td>
                        <td>
                            <a href="${file.url}" target="_blank" class="text-decoration-none" data-bs-toggle="tooltip" title="${file.url}">
                                <small class="text-truncate d-inline-block" style="max-width: 150px;">
                                    <i class="fas fa-external-link-alt me-1"></i>${file.url.substring(file.url.lastIndexOf('/') + 1)}
                                </small>
                            </a>
                        </td>
                            </div>
                        </td>
                    </tr>
                `;
            });
        }

        // Initialize tooltips
        this.initializeTooltips();
    }

    static formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    static async loadSingleFile(fileNumber) {
        const btn = document.querySelector(`button[onclick="DataImport.loadSingleFile(${fileNumber})"]`);
        if (btn) {
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;
        }

        Loading.show(`Loading file ${fileNumber}.json...`);
        const data = await dataManager.loadJSONData(appState.currentCompanyId, fileNumber);
        Loading.hide();

        if (btn) {
            btn.innerHTML = '<i class="fas fa-redo"></i>';
            btn.disabled = false;
        }

        if (data) {
            appState.allJSONData[fileNumber] = data;
            Notifications.show(`File ${fileNumber}.json loaded successfully`, 'success');
            this.loadJSONFilesStatus();
            this.updateStats();
        } else {
            Notifications.show(`Failed to load file ${fileNumber}.json`, 'error');
        }
    }

    static async loadAllFiles() {
        const btn = document.querySelector('button[onclick="DataImport.loadAllFiles()"]');
        if (btn) {
            btn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Loading...';
            btn.disabled = true;
        }

        Loading.show('Loading all JSON files...');
        let successCount = 0;

        for (let i = 1; i <= CONFIG.TOTAL_JSON_FILES; i++) {
            const data = await dataManager.loadJSONData(appState.currentCompanyId, i);
            if (data) {
                appState.allJSONData[i] = data;
                successCount++;
            }
        }

        Loading.hide();

        if (btn) {
            btn.innerHTML = '<i class="fas fa-redo me-1"></i>Load All';
            btn.disabled = false;
        }

        this.loadJSONFilesStatus();
        this.updateStats();

        if (successCount === CONFIG.TOTAL_JSON_FILES) {
            Notifications.show(`All ${successCount} files loaded successfully`, 'success');
        } else {
            Notifications.show(`${successCount} out of ${CONFIG.TOTAL_JSON_FILES} files loaded`,
                successCount > 0 ? 'warning' : 'error');
        }
    }

    static viewJSONData(fileNumber) {
        const data = appState.allJSONData[fileNumber];
        if (data) {
            const jsonString = JSON.stringify(data, null, 2);
            const preview = document.getElementById('jsonPreview');
            if (preview) {
                preview.textContent = jsonString;
                const modal = new bootstrap.Modal(document.getElementById('dataPreviewModal'));
                modal.show();
            }
        }
    }

    static copyJSONToClipboard() {
        const jsonText = document.getElementById('jsonPreview')?.textContent;
        if (jsonText) {
            navigator.clipboard.writeText(jsonText).then(() => {
                Notifications.show('JSON copied to clipboard', 'success');
            }).catch(err => {
                Notifications.show('Failed to copy JSON', 'error');
            });
        }
    }

    static downloadJSON() {
        const jsonText = document.getElementById('jsonPreview')?.textContent;
        if (jsonText) {
            const blob = new Blob([jsonText], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `company-${appState.currentCompanyId}-data.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            Notifications.show('JSON file downloaded', 'success');
        }
    }

    static async refreshCompanyData() {
        const btn = document.getElementById('refreshBtn');
        if (btn) {
            btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Refreshing...';
            btn.disabled = true;
        }

        const success = await dataManager.loadCompanyData(appState.currentCompanyId);

        if (btn) {
            btn.innerHTML = '<i class="fas fa-sync me-2"></i>Refresh Data';
            btn.disabled = false;
        }

        if (success) {
            this.loadJSONFilesStatus();
            this.updateStats();
            Notifications.show('Company data refreshed successfully', 'success');
        } else {
            Notifications.show('Failed to refresh company data', 'error');
        }
    }

    static async switchCompanyFromSelect(companyId) {
        if (companyId === appState.currentCompanyId.toString()) return;

        Loading.show(`Switching to Company ${companyId}...`);
        const success = await dataManager.switchCompany(parseInt(companyId));
        Loading.hide();

        if (success) {
            this.load();
            Notifications.show(`Switched to Company ${companyId}`, 'success');
        }
    }

    static async reloadCurrentCompany() {
        await this.refreshCompanyData();
    }

    static async addNewCompany() {
        const newIdInput = document.getElementById('newCompanyId');
        if (!newIdInput) return;

        const newId = newIdInput.value;
        if (!newId || isNaN(newId)) {
            Notifications.show('Please enter a valid company ID', 'error');
            return;
        }

        const companyId = parseInt(newId);

        if (companyId === appState.currentCompanyId) {
            Notifications.show('This company is already loaded', 'info');
            return;
        }

        if (appState.availableCompanies.includes(companyId)) {
            await dataManager.switchCompany(companyId);
            newIdInput.value = '';
            Notifications.show(`Switched to Company ${companyId}`, 'success');
            return;
        }

        // Check if company exists
        Loading.show(`Checking Company ${companyId}...`);
        const exists = await dataManager.checkCompanyExists(companyId);
        Loading.hide();

        if (exists) {
            appState.availableCompanies.push(companyId);
            appState.availableCompanies.sort((a, b) => a - b);
            await dataManager.switchCompany(companyId);
            newIdInput.value = '';
            Notifications.show(`Added and switched to Company ${companyId}`, 'success');
        } else {
            Notifications.show(`Company ${companyId} not found on GitHub`, 'warning');
        }
    }

    static handleLocalFileUpload() {
        const fileInput = document.getElementById('localJsonFile');
        const files = fileInput.files;

        if (files.length === 0) return;

        Loading.show('Processing uploaded files...');

        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    const fileName = file.name.replace('.json', '');
                    const fileNumber = parseInt(fileName);

                    if (!isNaN(fileNumber) && fileNumber >= 1 && fileNumber <= CONFIG.TOTAL_JSON_FILES) {
                        appState.allJSONData[fileNumber] = data;
                        Notifications.show(`Local file ${file.name} imported successfully`, 'success');
                    } else {
                        Notifications.show(`File ${file.name} has invalid name format`, 'warning');
                    }
                } catch (error) {
                    Notifications.show(`Failed to parse ${file.name}: ${error.message}`, 'error');
                }
            };
            reader.readAsText(file);
        });

        Loading.hide();
        fileInput.value = '';
        setTimeout(() => {
            this.loadJSONFilesStatus();
            this.updateStats();
        }, 500);
    }

    static exportAllData() {
        const allData = {};
        for (let i = 1; i <= CONFIG.TOTAL_JSON_FILES; i++) {
            if (appState.allJSONData[i]) {
                allData[i] = appState.allJSONData[i];
            }
        }

        const jsonString = JSON.stringify(allData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `company-${appState.currentCompanyId}-complete-data.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        Notifications.show('All data exported successfully', 'success');
    }

    static clearAllData() {
        if (confirm('Are you sure you want to clear all loaded data? This cannot be undone.')) {
            for (let i = 1; i <= CONFIG.TOTAL_JSON_FILES; i++) {
                appState.allJSONData[i] = null;
            }
            this.loadJSONFilesStatus();
            this.updateStats();
            Notifications.show('All data cleared', 'info');
        }
    }

    static validateAllData() {
        let validCount = 0;
        let invalidCount = 0;

        for (let i = 1; i <= CONFIG.TOTAL_JSON_FILES; i++) {
            if (appState.allJSONData[i]) {
                try {
                    JSON.stringify(appState.allJSONData[i]); // Test if valid JSON
                    validCount++;
                } catch (error) {
                    invalidCount++;
                }
            } else {
                invalidCount++;
            }
        }

        Notifications.show(
            `Validation complete: ${validCount} valid, ${invalidCount} invalid/missing`,
            invalidCount === 0 ? 'success' : 'warning'
        );
    }

    static validateFile(fileNumber) {
        const data = appState.allJSONData[fileNumber];
        if (!data) {
            Notifications.show(`File ${fileNumber}.json is not loaded`, 'error');
            return;
        }

        try {
            JSON.stringify(data); // Test if valid JSON
            Notifications.show(`File ${fileNumber}.json is valid JSON`, 'success');
        } catch (error) {
            Notifications.show(`File ${fileNumber}.json has invalid JSON: ${error.message}`, 'error');
        }
    }

    static checkDataCompleteness() {
        const loadedFiles = Object.keys(appState.allJSONData).filter(key => appState.allJSONData[key] !== null).length;
        const percentage = Math.round((loadedFiles / CONFIG.TOTAL_JSON_FILES) * 100);

        if (percentage === 100) {
            Notifications.show('All files are loaded (100% complete)', 'success');
        } else {
            Notifications.show(`Data completeness: ${percentage}% (${loadedFiles}/${CONFIG.TOTAL_JSON_FILES} files)`,
                percentage > 50 ? 'warning' : 'error');
        }
    }

    static backupCurrentData() {
        localStorage.setItem(`backup_company_${appState.currentCompanyId}`, JSON.stringify(appState.allJSONData));
        Notifications.show('Data backed up to local storage', 'success');
    }

    static verifyDataIntegrity() {
        // Check for basic data integrity
        const issues = [];

        for (let i = 1; i <= CONFIG.TOTAL_JSON_FILES; i++) {
            const data = appState.allJSONData[i];
            if (data) {
                // Check if data has required structure
                if (!data.frc_analysis_report && !data.entity) {
                    issues.push(`File ${i}.json: Missing frc_analysis_report or entity structure`);
                }

                // Check for empty objects
                if (JSON.stringify(data) === '{}') {
                    issues.push(`File ${i}.json: Empty object`);
                }
            }
        }

        if (issues.length === 0) {
            Notifications.show('Data integrity check passed', 'success');
        } else {
            Notifications.show(`Found ${issues.length} integrity issues`, 'warning');
            console.log('Integrity issues:', issues);
        }
    }

    static resetToDefault() {
        if (confirm('Are you sure you want to reset to default settings? This will clear all data.')) {
            appState.currentCompanyId = 1;
            appState.availableCompanies = [1];
            for (let i = 1; i <= CONFIG.TOTAL_JSON_FILES; i++) {
                appState.allJSONData[i] = null;
            }
            this.load();
            Notifications.show('Reset to default settings', 'info');
        }
    }

    static syncAllData() {
        Loading.show('Syncing all data sections...');
        setTimeout(() => {
            this.refreshCompanyData();
            setTimeout(() => {
                Loading.hide();
                Notifications.show('Data synchronization completed', 'success');
            }, 1000);
        }, 500);
    }

    static initializeTooltips() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
}

window.DataImport = DataImport;
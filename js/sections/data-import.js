// Data Import Section
class DataImport {
    static load() {
        appState.currentSection = 'data-import';
        UIComponents.updateActiveSidebarItem('data-import');
        
        const content = `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="section-title">Data Import & Management</h3>
                <div>
                    <span class="badge bg-info me-2">Company ${appState.currentCompanyId}</span>
                    <button class="btn btn-success me-2" onclick="DataImport.refreshCompanyData()">
                        <i class="fas fa-sync me-2"></i> Refresh Data
                    </button>
                    <button class="btn btn-primary" onclick="DataImport.syncAllData()">
                        <i class="fas fa-sync me-2"></i> Sync All Data
                    </button>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-8">
                    <div class="dashboard-card">
                        <h5><i class="fas fa-database me-2 text-primary"></i>JSON Data Structure - Company ${appState.currentCompanyId}</h5>
                        <div class="table-responsive">
                            <table class="table table-sm">
                                <thead>
                                    <tr>
                                        <th>File</th>
                                        <th>Data Category</th>
                                        <th>Status</th>
                                        <th>Source URL</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="jsonFilesTable">
                                    <!-- Dynamic content will be loaded here -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-4">
                    <div class="dashboard-card">
                        <h5><i class="fas fa-building me-2 text-primary"></i>Company Management</h5>
                        <div class="mb-3">
                            <label class="form-label">Switch Company</label>
                            <select class="form-select" id="companySelect" onchange="dataManager.switchCompany(this.value)">
                                ${appState.availableCompanies.map(id => `
                                    <option value="${id}" ${id === appState.currentCompanyId ? 'selected' : ''}>Company ${id}</option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Add New Company</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="newCompanyId" placeholder="Company ID">
                                <button class="btn btn-outline-primary" onclick="DataImport.addNewCompany()">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="alert alert-info small">
                            <i class="fas fa-info-circle me-2"></i>
                            Data is loaded from: ${CONFIG.GITHUB_PAGES_BASE}${appState.currentCompanyId}/
                        </div>
                    </div>
                </div>
            </div>
        `;

        UIComponents.getMainContent().innerHTML = content;
        this.loadJSONFilesStatus();
    }

    static loadJSONFilesStatus() {
        const files = [];

        for (let i = 1; i <= CONFIG.TOTAL_JSON_FILES; i++) {
            const data = appState.allJSONData[i];
            const status = data ? 'Loaded' : 'Missing';
            const url = `${CONFIG.GITHUB_PAGES_BASE}${appState.currentCompanyId}/${i}.json`;

            files.push({
                id: i,
                name: `${i}.json`,
                category: CONFIG.CATEGORIES[i] || 'Unknown',
                status: status,
                url: url
            });
        }

        const table = document.getElementById('jsonFilesTable');
        if (table) {
            table.innerHTML = '';

            files.forEach(file => {
                let statusBadge = '';
                if (file.status === 'Loaded') {
                    statusBadge = '<span class="badge bg-success">Loaded</span>';
                } else {
                    statusBadge = '<span class="badge bg-danger">Missing</span>';
                }

                table.innerHTML += `
                    <tr>
                        <td>${file.name}</td>
                        <td>${file.category}</td>
                        <td>${statusBadge}</td>
                        <td>
                            <a href="${file.url}" target="_blank" class="text-decoration-none">
                                <small>${file.url.substring(0, 40)}...</small>
                            </a>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary" onclick="DataImport.loadSingleFile(${file.id})">
                                <i class="fas fa-redo"></i>
                            </button>
                            ${file.status === 'Loaded' ? `
                                <button class="btn btn-sm btn-outline-info ms-1" onclick="DataImport.viewJSONData(${file.id})">
                                    <i class="fas fa-eye"></i>
                                </button>
                            ` : ''}
                        </td>
                    </tr>
                `;
            });
        }
    }

    static async loadSingleFile(fileNumber) {
        Loading.show(`Loading file ${fileNumber}.json...`);
        const data = await dataManager.loadJSONData(appState.currentCompanyId, fileNumber);
        Loading.hide();

        if (data) {
            appState.allJSONData[fileNumber] = data;
            Notifications.show(`File ${fileNumber}.json loaded successfully`, 'success');
            this.loadJSONFilesStatus();
        } else {
            Notifications.show(`Failed to load file ${fileNumber}.json`, 'error');
        }
    }

    static viewJSONData(fileNumber) {
        const data = appState.allJSONData[fileNumber];
        if (data) {
            const jsonString = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        }
    }

    static async refreshCompanyData() {
        const success = await dataManager.loadCompanyData(appState.currentCompanyId);
        if (success) {
            this.load();
            Notifications.show('Company data refreshed successfully', 'success');
        }
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
        
        // Check if company exists
        Loading.show(`Checking Company ${companyId}...`);
        const exists = await dataManager.checkCompanyExists(companyId);
        Loading.hide();

        if (exists) {
            if (!appState.availableCompanies.includes(companyId)) {
                appState.availableCompanies.push(companyId);
                appState.availableCompanies.sort((a, b) => a - b);
            }
            await dataManager.switchCompany(companyId);
            Notifications.show(`Switched to Company ${companyId}`, 'success');
        } else {
            Notifications.show(`Company ${companyId} not found on GitHub`, 'warning');
        }
    }

    static syncAllData() {
        Notifications.show('Data synchronization across all sections would begin.', 'info');
    }
}

window.DataImport = DataImport;
// Compliance Section
class Compliance {
    static load() {
        appState.currentSection = 'compliance';
        UIComponents.updateActiveSidebarItem('compliance');
        
        const content = `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="section-title">IFRS Compliance Review</h3>
                <div>
                    <button class="btn btn-outline-primary me-2" onclick="Compliance.updateComplianceStatus()">
                        <i class="fas fa-sync me-2"></i> Update Status
                    </button>
                    <button class="btn btn-primary" onclick="Compliance.exportComplianceMatrix()">
                        <i class="fas fa-download me-2"></i> Export Matrix
                    </button>
                </div>
            </div>
            
            <div class="row mb-4">
                <div class="col-md-3">
                    <div class="dashboard-card text-center">
                        <div class="metric-label">Compliant</div>
                        <div class="metric-value text-success">27</div>
                        <small>Standards</small>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-card text-center">
                        <div class="metric-label">Partial</div>
                        <div class="metric-value text-warning">8</div>
                        <small>Standards</small>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-card text-center">
                        <div class="metric-label">Non-Compliant</div>
                        <div class="metric-value text-danger">7</div>
                        <small>Standards</small>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-card text-center">
                        <div class="metric-label">Not Applicable</div>
                        <div class="metric-value text-info">15</div>
                        <small>Standards</small>
                    </div>
                </div>
            </div>
            
            <div class="dashboard-card">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="mb-0">Compliance Matrix</h5>
                    <div class="d-flex">
                        <input type="text" class="form-control form-control-sm me-2" placeholder="Search standards..." id="complianceSearch">
                        <select class="form-select form-select-sm w-auto" id="complianceFilter">
                            <option value="all">All Status</option>
                            <option value="compliant">Compliant</option>
                            <option value="partial">Partially Compliant</option>
                            <option value="noncompliant">Non-Compliant</option>
                            <option value="na">Not Applicable</option>
                        </select>
                    </div>
                </div>
                
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead class="table-light">
                            <tr>
                                <th>Standard Code</th>
                                <th>Standard Name</th>
                                <th>Applicability</th>
                                <th>Compliance Status</th>
                                <th>Page Reference</th>
                                <th>Issues Identified</th>
                            </tr>
                        </thead>
                        <tbody id="complianceTable">
                            <!-- Dynamic content will be loaded here -->
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="row mt-4">
                <div class="col-md-6">
                    <div class="dashboard-card">
                        <h5>Key Standards Detailed Check</h5>
                        <div id="keyStandardsAccordion" class="accordion">
                            <!-- Dynamic accordion will be loaded here -->
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="dashboard-card">
                        <h5>Material Departures Summary</h5>
                        <div class="list-group">
                            <div class="list-group-item list-group-item-danger">
                                <div class="d-flex w-100 justify-content-between">
                                    <h6 class="mb-1">IFRS 15 - Revenue Recognition</h6>
                                    <small>High Risk</small>
                                </div>
                                <p class="mb-1">Five-step model not properly applied to long-term contracts</p>
                                <small>Pages 45-48 of Financial Statements</small>
                            </div>
                            <div class="list-group-item list-group-item-warning">
                                <div class="d-flex w-100 justify-content-between">
                                    <h6 class="mb-1">IAS 24 - Related Parties</h6>
                                    <small>Medium Risk</small>
                                </div>
                                <p class="mb-1">Incomplete disclosure of transactions with key management personnel</p>
                                <small>Page 112 of Financial Statements</small>
                            </div>
                            <div class="list-group-item list-group-item-warning">
                                <div class="d-flex w-100 justify-content-between">
                                    <h6 class="mb-1">IAS 37 - Provisions</h6>
                                    <small>Medium Risk</small>
                                </div>
                                <p class="mb-1">Onerous contracts provision understated</p>
                                <small>Page 89 of Financial Statements</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        UIComponents.getMainContent().innerHTML = content;
        this.loadComplianceData();
    }

    static loadComplianceData() {
        const complianceData = [
            { code: 'IAS 1', name: 'Presentation of Financial Statements', applicability: 'Yes', status: 'Compliant', page: '1-5', issues: '' },
            { code: 'IAS 2', name: 'Inventories', applicability: 'Yes', status: 'Compliant', page: '15-18', issues: '' },
            { code: 'IAS 8', name: 'Accounting Policies', applicability: 'Yes', status: 'Partial', page: '8-10', issues: 'Hierarchy not fully applied' },
            { code: 'IAS 10', name: 'Events After Reporting Period', applicability: 'Yes', status: 'Compliant', page: '112', issues: '' },
            { code: 'IAS 12', name: 'Income Taxes', applicability: 'Yes', status: 'Partial', page: '45-50', issues: 'Deferred tax disclosure incomplete' },
            { code: 'IAS 16', name: 'Property, Plant & Equipment', applicability: 'Yes', status: 'Compliant', page: '20-30', issues: '' },
            { code: 'IAS 24', name: 'Related Party Disclosures', applicability: 'Yes', status: 'Non-Compliant', page: '110-112', issues: 'Incomplete disclosures' },
            { code: 'IFRS 9', name: 'Financial Instruments', applicability: 'Yes', status: 'Partial', page: '60-70', issues: 'ECL model not fully implemented' },
            { code: 'IFRS 15', name: 'Revenue from Contracts', applicability: 'Yes', status: 'Non-Compliant', page: '40-45', issues: 'Five-step model not applied' },
            { code: 'IFRS 16', name: 'Leases', applicability: 'Yes', status: 'Compliant', page: '75-80', issues: '' }
        ];

        const table = document.getElementById('complianceTable');
        table.innerHTML = '';

        complianceData.forEach(item => {
            let statusBadge = '';
            if (item.status === 'Compliant') {
                statusBadge = '<span class="compliance-badge badge-compliant">Compliant</span>';
            } else if (item.status === 'Partial') {
                statusBadge = '<span class="compliance-badge badge-partial">Partial</span>';
            } else {
                statusBadge = '<span class="compliance-badge badge-noncompliant">Non-Compliant</span>';
            }

            table.innerHTML += `
                <tr>
                    <td>${item.code}</td>
                    <td>${item.name}</td>
                    <td>${item.applicability}</td>
                    <td>${statusBadge}</td>
                    <td>${item.page}</td>
                    <td>${item.issues}</td>
                </tr>
            `;
        });
    }

    static updateComplianceStatus() {
        Notifications.show('Compliance status update would refresh all compliance checks.', 'info');
    }

    static exportComplianceMatrix() {
        Notifications.show('Compliance matrix would be exported to Excel.', 'info');
    }
}

window.Compliance = Compliance;
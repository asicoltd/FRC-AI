// Compliance Section
class Compliance {
    static async load() {
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
                        <div class="metric-value text-success" id="compliantCount">0</div>
                        <small>Standards</small>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-card text-center">
                        <div class="metric-label">Partial</div>
                        <div class="metric-value text-warning" id="partialCount">0</div>
                        <small>Standards</small>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-card text-center">
                        <div class="metric-label">Non-Compliant</div>
                        <div class="metric-value text-danger" id="nonCompliantCount">0</div>
                        <small>Standards</small>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-card text-center">
                        <div class="metric-label">Not Applicable</div>
                        <div class="metric-value text-info" id="naCount">0</div>
                        <small>Standards</small>
                    </div>
                </div>
            </div>
            
            <div class="dashboard-card">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="mb-0">Compliance Matrix</h5>
                    <div class="d-flex">
                        <input type="text" class="form-control form-control-sm me-2" placeholder="Search standards..." id="complianceSearch" onkeyup="Compliance.filterTable()">
                        <select class="form-select form-select-sm w-auto" id="complianceFilter" onchange="Compliance.filterTable()">
                            <option value="all">All Status</option>
                            <option value="Compliant">Compliant</option>
                            <option value="Partially Compliant">Partially Compliant</option>
                            <option value="Non-Compliant">Non-Compliant</option>
                            <option value="Not Applicable">Not Applicable</option>
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
                                <th>Actions</th>
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
                        <div id="materialDeparturesList" class="list-group">
                            <!-- Dynamic content will be loaded here -->
                        </div>
                    </div>
                </div>
            </div>
        `;

        UIComponents.getMainContent().innerHTML = content;
        await this.loadComplianceData();
    }

    static async loadComplianceData() {
        try {
            // Get data from appState
            const data12 = appState.allJSONData[12];
            const data24 = appState.allJSONData[24];
            
            if (!data12 || !data12.frc_analysis_report) {
                throw new Error('No compliance data found');
            }
            
            const complianceMatrix = data12.frc_analysis_report.entity?.phase_3_ifrs_compliance_detailed?.detailed_ifrs_compliance_matrix;
            
            if (!complianceMatrix || complianceMatrix.length === 0) {
                this.loadStaticFallbackData();
                return;
            }
            
            this.renderComplianceTable(complianceMatrix);
            this.updateSummaryCounts(complianceMatrix);
            this.loadMaterialDepartures(data24);
            this.loadKeyStandardsDetails();
            
        } catch (error) {
            console.error('Error loading compliance data:', error);
            Notifications.show('Error loading compliance data. Using fallback data.', 'error');
            this.loadStaticFallbackData();
        }
    }

    static renderComplianceTable(complianceMatrix) {
        const table = document.getElementById('complianceTable');
        table.innerHTML = '';
        
        let counts = {
            compliant: 0,
            partial: 0,
            nonCompliant: 0,
            na: 0
        };

        complianceMatrix.forEach((item, index) => {
            if (!item.standard_code || !item.standard_name) return;
            
            const status = item.compliance_status || 'Not Assessed';
            let statusBadge = '';
            
            switch(status.toLowerCase()) {
                case 'compliant':
                    statusBadge = '<span class="badge bg-success">Compliant</span>';
                    counts.compliant++;
                    break;
                case 'partially compliant':
                    statusBadge = '<span class="badge bg-warning text-dark">Partial</span>';
                    counts.partial++;
                    break;
                case 'non-compliant':
                    statusBadge = '<span class="badge bg-danger">Non-Compliant</span>';
                    counts.nonCompliant++;
                    break;
                case 'not applicable':
                    statusBadge = '<span class="badge bg-info">N/A</span>';
                    counts.na++;
                    break;
                default:
                    statusBadge = `<span class="badge bg-secondary">${status}</span>`;
            }

            const applicability = item.applicability ? 'Yes' : 'No';
            const pageRef = item.page_reference || 'N/A';
            const issues = item.material_departures && item.material_departures.length > 0 
                ? item.material_departures.join('; ') 
                : item.reason_of_the_status || '';

            table.innerHTML += `
                <tr data-status="${status}" data-index="${index}">
                    <td>${item.standard_code}</td>
                    <td>${item.standard_name}</td>
                    <td>${applicability}</td>
                    <td>${statusBadge}</td>
                    <td>${pageRef}</td>
                    <td>${issues}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="Compliance.viewStandardDetails(${index})">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

        // Update summary counts in the UI
        document.getElementById('compliantCount').textContent = counts.compliant;
        document.getElementById('partialCount').textContent = counts.partial;
        document.getElementById('nonCompliantCount').textContent = counts.nonCompliant;
        document.getElementById('naCount').textContent = counts.na;
    }

    static viewStandardDetails(index) {
        const data12 = appState.allJSONData[12];
        const complianceMatrix = data12.frc_analysis_report.entity?.phase_3_ifrs_compliance_detailed?.detailed_ifrs_compliance_matrix;
        
        if (!complianceMatrix || !complianceMatrix[index]) {
            Notifications.show('Standard details not found', 'error');
            return;
        }
        
        const standard = complianceMatrix[index];
        
        // Create modal content
        const modalContent = `
            <div class="modal-header">
                <h5 class="modal-title">${standard.standard_code} - ${standard.standard_name}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table class="table table-sm">
                    <tbody>
                        <tr>
                            <th style="width: 30%">Standard Code:</th>
                            <td>${standard.standard_code || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Standard Name:</th>
                            <td>${standard.standard_name || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Applicability:</th>
                            <td>${standard.applicability ? 'Yes' : 'No'}</td>
                        </tr>
                        <tr>
                            <th>Compliance Status:</th>
                            <td>${standard.compliance_status || 'Not Assessed'}</td>
                        </tr>
                        <tr>
                            <th>Page Reference:</th>
                            <td>${standard.page_reference || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Reason for Status:</th>
                            <td>${standard.reason_of_the_status || 'N/A'}</td>
                        </tr>
                        ${standard.status_reference ? `
                        <tr>
                            <th>Status Reference:</th>
                            <td>${standard.status_reference}</td>
                        </tr>` : ''}
                        ${standard.ias_1_para_19_24_implication ? `
                        <tr>
                            <th>IAS 1 Implication:</th>
                            <td>${standard.ias_1_para_19_24_implication}</td>
                        </tr>` : ''}
                    </tbody>
                </table>
                
                ${standard.material_departures && standard.material_departures.length > 0 ? `
                <div class="mt-3">
                    <h6>Material Departures:</h6>
                    <ul class="list-group list-group-flush">
                        ${standard.material_departures.map(departure => `
                            <li class="list-group-item">${departure}</li>
                        `).join('')}
                    </ul>
                </div>` : ''}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        `;
        
        UIComponents.showModal(modalContent, 'standardDetailsModal');
    }

    static updateSummaryCounts(complianceMatrix) {
        const counts = {
            compliant: 0,
            partial: 0,
            nonCompliant: 0,
            na: 0
        };

        complianceMatrix.forEach(item => {
            const status = item.compliance_status || 'Not Assessed';
            switch(status.toLowerCase()) {
                case 'compliant': counts.compliant++; break;
                case 'partially compliant': counts.partial++; break;
                case 'non-compliant': counts.nonCompliant++; break;
                case 'not applicable': counts.na++; break;
            }
        });

        document.getElementById('compliantCount').textContent = counts.compliant;
        document.getElementById('partialCount').textContent = counts.partial;
        document.getElementById('nonCompliantCount').textContent = counts.nonCompliant;
        document.getElementById('naCount').textContent = counts.na;
    }

    static loadKeyStandardsDetails() {
        try {
            // Load data from multiple JSON files for key standards
            const data7 = appState.allJSONData[7];
            const data8 = appState.allJSONData[8];
            const data9 = appState.allJSONData[9];
            const data10 = appState.allJSONData[10];
            const data11 = appState.allJSONData[11];
            
            const accordion = document.getElementById('keyStandardsAccordion');
            accordion.innerHTML = '';

            if (!data7 || !data8 || !data9 || !data10 || !data11) {
                accordion.innerHTML = '<div class="alert alert-warning">Key standards data not available</div>';
                return;
            }

            // Combine all standards data
            const allStandards = {
                ...data7?.frc_analysis_report?.entity?.phase_3_ifrs_compliance_detailed?.key_standards_compliance_check,
                ...data8?.frc_analysis_report?.entity?.phase_3_ifrs_compliance_detailed?.key_standards_compliance_check,
                ...data9?.frc_analysis_report?.entity?.phase_3_ifrs_compliance_detailed?.key_standards_compliance_check,
                ...data10?.frc_analysis_report?.entity?.phase_3_ifrs_compliance_detailed?.key_standards_compliance_check,
                ...data11?.frc_analysis_report?.entity?.phase_3_ifrs_compliance_detailed?.key_standards_compliance_check
            };

            // Create accordion items for each standard
            Object.entries(allStandards).forEach(([key, standard], index) => {
                if (standard && typeof standard === 'object') {
                    const standardName = key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                    const isApplicable = standard.applicable !== false;
                    
                    let complianceStatus = 'Not Assessed';
                    let issues = standard.reason_of_the_status || '';
                    
                    if (standard.compliance_status) {
                        complianceStatus = standard.compliance_status;
                    } else if (standard.reason_of_the_status) {
                        if (standard.reason_of_the_status.includes('Non-Compliant')) {
                            complianceStatus = 'Non-Compliant';
                        } else if (standard.reason_of_the_status.includes('Partial')) {
                            complianceStatus = 'Partially Compliant';
                        } else if (standard.reason_of_the_status.includes('Compliant')) {
                            complianceStatus = 'Compliant';
                        }
                    }

                    let statusClass = 'secondary';
                    switch(complianceStatus.toLowerCase()) {
                        case 'compliant': statusClass = 'success'; break;
                        case 'partially compliant': statusClass = 'warning'; break;
                        case 'non-compliant': statusClass = 'danger'; break;
                        case 'not applicable': statusClass = 'info'; break;
                    }

                    accordion.innerHTML += `
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="heading${index}">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                                        data-bs-target="#collapse${index}" aria-expanded="false" 
                                        aria-controls="collapse${index}">
                                    <div class="d-flex justify-content-between align-items-center w-100">
                                        <span>${standardName}</span>
                                        <span class="badge bg-${statusClass}">${complianceStatus}</span>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapse${index}" class="accordion-collapse collapse" 
                                 aria-labelledby="heading${index}" data-bs-parent="#keyStandardsAccordion">
                                <div class="accordion-body">
                                    <p><strong>Applicable:</strong> ${isApplicable ? 'Yes' : 'No'}</p>
                                    ${issues ? `<p><strong>Issues:</strong> ${issues}</p>` : ''}
                                    ${standard.status_reference ? `<p><strong>Reference:</strong> ${standard.status_reference}</p>` : ''}
                                    ${this.getStandardDetails(standard)}
                                </div>
                            </div>
                        </div>
                    `;
                }
            });
        } catch (error) {
            console.error('Error loading key standards:', error);
            document.getElementById('keyStandardsAccordion').innerHTML = 
                '<div class="alert alert-warning">Unable to load detailed standards information.</div>';
        }
    }

    static getStandardDetails(standard) {
        let details = '';
        const excludeKeys = ['applicable', 'reason_of_the_status', 'status_reference', 'compliance_status'];
        
        Object.entries(standard).forEach(([key, value]) => {
            if (!excludeKeys.includes(key) && value !== undefined && value !== null && value !== '') {
                const formattedKey = key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                details += `<p><strong>${formattedKey}:</strong> ${value}</p>`;
            }
        });
        
        return details;
    }

    static loadMaterialDepartures(data24) {
        try {
            if (!data24 || !data24.frc_analysis_report) {
                throw new Error('No material departures data found');
            }
            
            const departures = data24.frc_analysis_report.entity?.phase_5_synthesis_and_findings?.consolidated_material_departures;
            
            const list = document.getElementById('materialDeparturesList');
            list.innerHTML = '';
            
            if (!departures || departures.length === 0) {
                list.innerHTML = '<div class="alert alert-info">No material departures found.</div>';
                return;
            }
            
            departures.forEach((departure, index) => {
                if (!departure.ifrs_standard) return;
                
                let riskClass = 'warning';
                if (departure.materiality_assessment?.toLowerCase().includes('high')) {
                    riskClass = 'danger';
                } else if (departure.materiality_assessment?.toLowerCase().includes('low')) {
                    riskClass = 'info';
                }
                
                list.innerHTML += `
                    <div class="list-group-item list-group-item-${riskClass}">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">${departure.ifrs_standard}</h6>
                            <div>
                                <small class="me-2">${departure.materiality_assessment || 'Unassessed Risk'}</small>
                                <button class="btn btn-sm btn-outline-light" onclick="Compliance.viewDepartureDetails(${index})">
                                    <i class="fas fa-info-circle"></i>
                                </button>
                            </div>
                        </div>
                        <p class="mb-1">${departure.nature_of_departure || 'No description provided'}</p>
                        <small>${departure.page_reference ? `Pages ${departure.page_reference}` : 'No page reference'}</small>
                        ${departure.financial_impact_estimate ? 
                          `<br><small><strong>Financial Impact:</strong> ${departure.financial_impact_estimate}</small>` : ''}
                    </div>
                `;
            });
        } catch (error) {
            console.error('Error loading material departures:', error);
            document.getElementById('materialDeparturesList').innerHTML = 
                '<div class="alert alert-warning">Unable to load material departures.</div>';
        }
    }

    static viewDepartureDetails(index) {
        const data24 = appState.allJSONData[24];
        const departures = data24.frc_analysis_report.entity?.phase_5_synthesis_and_findings?.consolidated_material_departures;
        
        if (!departures || !departures[index]) {
            Notifications.show('Departure details not found', 'error');
            return;
        }
        
        const departure = departures[index];
        
        const modalContent = `
            <div class="modal-header">
                <h5 class="modal-title">Material Departure: ${departure.ifrs_standard}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table class="table table-sm">
                    <tbody>
                        <tr>
                            <th style="width: 40%">Departure ID:</th>
                            <td>${departure.departure_id || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>IFRS Standard:</th>
                            <td>${departure.ifrs_standard || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Nature of Departure:</th>
                            <td>${departure.nature_of_departure || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Page Reference:</th>
                            <td>${departure.page_reference || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Financial Impact:</th>
                            <td>${departure.financial_impact_estimate || 'Not quantified'}</td>
                        </tr>
                        <tr>
                            <th>Materiality Assessment:</th>
                            <td>${departure.materiality_assessment || 'Not assessed'}</td>
                        </tr>
                        <tr>
                            <th>IAS 1 Implication:</th>
                            <td>${departure.ias_1_para_19_24_implication || 'N/A'}</td>
                        </tr>
                        ${departure.extract_from_fs ? `
                        <tr>
                            <th>FS Extract:</th>
                            <td><pre class="mb-0" style="font-size: 0.9em">${departure.extract_from_fs}</pre></td>
                        </tr>` : ''}
                        <tr>
                            <th>Corrective Action:</th>
                            <td>${departure.corrective_action_required || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Regulatory Reporting:</th>
                            <td>${departure.regulatory_reporting_required ? 'Required' : 'Not Required'}</td>
                        </tr>
                        ${departure.regulatory_body ? `
                        <tr>
                            <th>Regulatory Body:</th>
                            <td>${departure.regulatory_body}</td>
                        </tr>` : ''}
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        `;
        
        UIComponents.showModal(modalContent, 'departureDetailsModal');
    }

    static filterTable() {
        const searchText = document.getElementById('complianceSearch').value.toLowerCase();
        const filterValue = document.getElementById('complianceFilter').value;
        const rows = document.querySelectorAll('#complianceTable tr');
        
        let visibleCount = 0;
        
        rows.forEach(row => {
            const rowText = row.textContent.toLowerCase();
            const rowStatus = row.getAttribute('data-status') || '';
            
            const matchesSearch = searchText === '' || rowText.includes(searchText);
            const matchesFilter = filterValue === 'all' || rowStatus === filterValue;
            
            if (matchesSearch && matchesFilter) {
                row.style.display = '';
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });
        
        // Update summary to show filtered count
        if (searchText || filterValue !== 'all') {
            const summary = document.querySelector('.section-title');
            if (summary) {
                summary.innerHTML = `IFRS Compliance Review <span class="badge bg-info">${visibleCount} shown</span>`;
            }
        }
    }

    static loadStaticFallbackData() {
        // Fallback data if JSON loading fails
        const fallbackData = [
            { 
                standard_code: 'IAS 1', 
                standard_name: 'Presentation of Financial Statements', 
                applicability: true, 
                compliance_status: 'Compliant',
                page_reference: '1-5',
                reason_of_the_status: ''
            },
            { 
                standard_code: 'IAS 2', 
                standard_name: 'Inventories', 
                applicability: true, 
                compliance_status: 'Compliant',
                page_reference: '15-18',
                reason_of_the_status: ''
            },
            { 
                standard_code: 'IAS 8', 
                standard_name: 'Accounting Policies', 
                applicability: true, 
                compliance_status: 'Partially Compliant',
                page_reference: '8-10',
                reason_of_the_status: 'Hierarchy not fully applied'
            },
            { 
                standard_code: 'IAS 10', 
                standard_name: 'Events After Reporting Period', 
                applicability: true, 
                compliance_status: 'Compliant',
                page_reference: '112',
                reason_of_the_status: ''
            },
            { 
                standard_code: 'IAS 12', 
                standard_name: 'Income Taxes', 
                applicability: true, 
                compliance_status: 'Partially Compliant',
                page_reference: '45-50',
                reason_of_the_status: 'Deferred tax disclosure incomplete'
            }
        ];
        
        this.renderComplianceTable(fallbackData);
    }

    static updateComplianceStatus() {
        Notifications.show('Compliance status update would refresh all compliance checks.', 'info');
        // In a real implementation, this would trigger a re-analysis
        this.loadComplianceData();
    }

    static exportComplianceMatrix() {
        // Get current filtered rows
        const visibleRows = [];
        const table = document.getElementById('complianceTable');
        const headers = [];
        
        // Add header
        table.querySelectorAll('thead th').forEach(th => {
            const headerText = th.textContent;
            // Skip Actions column
            if (!headerText.includes('Actions')) {
                headers.push(headerText);
            }
        });
        
        // Add data rows (only visible ones)
        table.querySelectorAll('tbody tr').forEach(tr => {
            if (tr.style.display !== 'none') {
                const cells = [];
                tr.querySelectorAll('td').forEach((td, index) => {
                    // Skip Actions column (last one)
                    if (index < 6) {
                        // Remove HTML from badge and get text content
                        const div = document.createElement('div');
                        div.innerHTML = td.innerHTML;
                        const text = div.textContent || div.innerText || '';
                        cells.push(`"${text.replace(/"/g, '""')}"`);
                    }
                });
                visibleRows.push(cells.join(','));
            }
        });
        
        if (visibleRows.length === 0) {
            Notifications.show('No data to export', 'warning');
            return;
        }
        
        const csvContent = [headers.join(',')].concat(visibleRows).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `compliance_matrix_${new Date().toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        Notifications.show('Compliance matrix exported to CSV', 'success');
    }
}

// Add this helper function to UIComponents if not exists
if (typeof UIComponents !== 'undefined' && !UIComponents.showModal) {
    UIComponents.showModal = function(content, modalId = 'genericModal') {
        // Remove existing modal if any
        const existingModal = document.getElementById(modalId);
        if (existingModal) {
            existingModal.remove();
        }
        
        const modalHTML = `
            <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        ${content}
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const modal = new bootstrap.Modal(document.getElementById(modalId));
        modal.show();
        
        // Clean up when modal is hidden
        document.getElementById(modalId).addEventListener('hidden.bs.modal', function () {
            this.remove();
        });
    };
}

window.Compliance = Compliance;
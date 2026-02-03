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
                        <i class="fas fa-sync me-2"></i> Refresh Data
                    </button>
                    <button class="btn btn-primary" onclick="Compliance.exportComplianceMatrix()">
                        <i class="fas fa-download me-2"></i> Export Matrix
                    </button>
                </div>
            </div>
            
            <!-- Regulatory Compliance Status -->
            <div class="row mb-4">
                <div class="col-md-12">
                    <div class="dashboard-card">
                        <h5>Regulatory Compliance Overview</h5>
                        <div class="row" id="regulatoryComplianceCards">
                            <!-- Dynamic regulatory cards will be loaded here -->
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Compliance Summary Cards -->
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
            
            <!-- Main Compliance Table -->
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
            
            <!-- Detailed Sections -->
            <div class="row mt-4">
                <div class="col-md-6">
                    <div class="dashboard-card">
                        <h5>Key Standards Detailed Analysis</h5>
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
            
            <!-- Reporting Framework Analysis -->
            <div class="row mt-4">
                <div class="col-md-12">
                    <div class="dashboard-card">
                        <h5>Reporting Framework Analysis</h5>
                        <div id="reportingFrameworkAnalysis">
                            <!-- Dynamic content will be loaded here -->
                        </div>
                    </div>
                </div>
            </div>
        `;

        UIComponents.getMainContent().innerHTML = content;
        await this.loadAllComplianceData();
    }

    static async loadAllComplianceData() {
        try {
            // Show loading state
            Notifications.show('Loading compliance data...', 'info');
            
            // Load all compliance data from different JSON files
            await this.loadRegulatoryCompliance();
            await this.loadReportingFramework();
            await this.loadMainComplianceMatrix();
            await this.loadMaterialDepartures();
            await this.loadKeyStandardsAnalysis();
            await this.loadProfessionalSkepticism();
            await this.loadAuditGovernance();
            
            Notifications.show('Compliance data loaded successfully', 'success');
            
        } catch (error) {
            console.error('Error loading compliance data:', error);
            Notifications.show('Error loading compliance data', 'error');
            this.loadStaticFallbackData();
        }
    }

    static async loadRegulatoryCompliance() {
        try {
            const data5 = appState.allJSONData[5];
            if (!data5 || !data5.frc_analysis_report) return;
            
            const regulators = data5.frc_analysis_report.entity?.phase_1_foundational_checks?.regulatory_landscape?.applicable_regulators;
            const framework = data5.frc_analysis_report.entity?.phase_1_foundational_checks?.reporting_framework;
            
            const container = document.getElementById('regulatoryComplianceCards');
            container.innerHTML = '';
            
            if (framework) {
                container.innerHTML += `
                    <div class="col-md-4 mb-3">
                        <div class="card h-100 border-${framework.compliance_assessment === 'Partially Compliant' ? 'warning' : 'success'}">
                            <div class="card-body">
                                <h6 class="card-title">Reporting Framework</h6>
                                <p class="card-text">
                                    <strong>Framework:</strong> ${framework.disclosed_framework || 'N/A'}<br>
                                    <strong>Status:</strong> 
                                    <span class="badge bg-${framework.compliance_assessment === 'Partially Compliant' ? 'warning' : 'success'}">
                                        ${framework.compliance_assessment || 'N/A'}
                                    </span>
                                </p>
                                <p class="card-text small">${framework.reason_of_the_status || ''}</p>
                            </div>
                        </div>
                    </div>
                `;
            }
            
            if (regulators && regulators.length > 0) {
                regulators.forEach(regulator => {
                    if (regulator.regulator_name && regulator.compliance_status !== 'Not Applicable') {
                        let badgeClass = 'secondary';
                        switch(regulator.compliance_status) {
                            case 'Compliant': badgeClass = 'success'; break;
                            case 'Partially Compliant': badgeClass = 'warning'; break;
                            case 'Non-Compliant': badgeClass = 'danger'; break;
                        }
                        
                        container.innerHTML += `
                            <div class="col-md-4 mb-3">
                                <div class="card h-100 border-${badgeClass}">
                                    <div class="card-body">
                                        <h6 class="card-title">${regulator.regulator_name}</h6>
                                        <p class="card-text">
                                            <strong>Status:</strong> 
                                            <span class="badge bg-${badgeClass}">
                                                ${regulator.compliance_status || 'N/A'}
                                            </span>
                                        </p>
                                        ${regulator.reason_for_non_compliance ? 
                                            `<p class="card-text small text-muted">${regulator.reason_for_non_compliance}</p>` : ''}
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                });
            }
            
        } catch (error) {
            console.error('Error loading regulatory compliance:', error);
        }
    }

    static async loadReportingFramework() {
        try {
            const data5 = appState.allJSONData[5];
            if (!data5 || !data5.frc_analysis_report) return;
            
            const framework = data5.frc_analysis_report.entity?.phase_1_foundational_checks?.reporting_framework;
            const container = document.getElementById('reportingFrameworkAnalysis');
            
            if (framework) {
                container.innerHTML = `
                    <div class="row">
                        <div class="col-md-6">
                            <table class="table table-sm">
                                <tbody>
                                    <tr>
                                        <th>Disclosed Framework:</th>
                                        <td>${framework.disclosed_framework || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <th>Notes Reference:</th>
                                        <td>${framework.notes_reference || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <th>Compliance Assessment:</th>
                                        <td>
                                            <span class="badge bg-${framework.compliance_assessment === 'Partially Compliant' ? 'warning' : 'success'}">
                                                ${framework.compliance_assessment || 'N/A'}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-6">
                            ${framework.discrepancies_identified && framework.discrepancies_identified.length > 0 ? `
                                <div class="alert alert-warning">
                                    <h6>Discrepancies Identified:</h6>
                                    <ul class="mb-0">
                                        ${framework.discrepancies_identified.map(d => `<li>${d}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    <div class="mt-3">
                        <strong>Actual Standards Applied:</strong>
                        <div class="mt-2">
                            ${framework.actual_standards_applied && framework.actual_standards_applied.length > 0 ? 
                                framework.actual_standards_applied.map(standard => 
                                    `<span class="badge bg-light text-dark me-1 mb-1">${standard}</span>`
                                ).join('') : 
                                '<span class="text-muted">No standards specified</span>'
                            }
                        </div>
                    </div>
                `;
            }
            
        } catch (error) {
            console.error('Error loading reporting framework:', error);
        }
    }

    static async loadMainComplianceMatrix() {
        try {
            const data12 = appState.allJSONData[12];
            if (!data12 || !data12.frc_analysis_report) {
                throw new Error('No compliance matrix data found');
            }
            
            const complianceMatrix = data12.frc_analysis_report.entity?.phase_3_ifrs_compliance_detailed?.detailed_ifrs_compliance_matrix;
            
            if (!complianceMatrix || complianceMatrix.length === 0) {
                this.loadStaticFallbackData();
                return;
            }
            
            this.renderComplianceTable(complianceMatrix);
            this.updateSummaryCounts(complianceMatrix);
            
        } catch (error) {
            console.error('Error loading compliance matrix:', error);
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
                    <td class="small">${issues.substring(0, 100)}${issues.length > 100 ? '...' : ''}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="Compliance.viewStandardDetails(${index})" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

        // Update summary counts
        document.getElementById('compliantCount').textContent = counts.compliant;
        document.getElementById('partialCount').textContent = counts.partial;
        document.getElementById('nonCompliantCount').textContent = counts.nonCompliant;
        document.getElementById('naCount').textContent = counts.na;
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

    static async loadMaterialDepartures() {
        try {
            const data24 = appState.allJSONData[24];
            if (!data24 || !data24.frc_analysis_report) return;
            
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
                        <div class="d-flex w-100 justify-content-between align-items-start">
                            <div class="flex-grow-1">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h6 class="mb-1">${departure.ifrs_standard}</h6>
                                    <small class="text-${riskClass}">${departure.materiality_assessment || 'Medium Risk'}</small>
                                </div>
                                <p class="mb-1 small">${departure.nature_of_departure || 'No description provided'}</p>
                                <div class="d-flex justify-content-between align-items-center mt-2">
                                    <small class="text-muted">${departure.page_reference ? `Page ${departure.page_reference}` : 'No reference'}</small>
                                    <button class="btn btn-sm btn-outline-${riskClass}" onclick="Compliance.viewDepartureDetails(${index})">
                                        <i class="fas fa-info-circle me-1"></i>Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            
        } catch (error) {
            console.error('Error loading material departures:', error);
            document.getElementById('materialDeparturesList').innerHTML = 
                '<div class="alert alert-warning">Unable to load material departures.</div>';
        }
    }

    static async loadKeyStandardsAnalysis() {
        try {
            // Collect all key standards data from multiple JSON files
            const standardsData = {};
            
            // Get data from JSON 7-11
            for (let i = 7; i <= 11; i++) {
                const data = appState.allJSONData[i];
                if (data && data.frc_analysis_report) {
                    const keyStandards = data.frc_analysis_report.entity?.phase_3_ifrs_compliance_detailed?.key_standards_compliance_check;
                    if (keyStandards) {
                        Object.assign(standardsData, keyStandards);
                    }
                }
            }
            
            const accordion = document.getElementById('keyStandardsAccordion');
            accordion.innerHTML = '';

            if (Object.keys(standardsData).length === 0) {
                accordion.innerHTML = '<div class="alert alert-info">No key standards analysis available.</div>';
                return;
            }

            // Sort standards alphabetically
            const sortedStandards = Object.entries(standardsData).sort((a, b) => 
                a[0].localeCompare(b[0])
            );

            sortedStandards.forEach(([key, standard], index) => {
                if (standard && typeof standard === 'object') {
                    const standardName = key.split('_')
                        .map(word => word.toUpperCase())
                        .join(' ');
                    
                    const isApplicable = standard.applicable !== false;
                    
                    let complianceStatus = 'Not Assessed';
                    let issues = standard.reason_of_the_status || '';
                    
                    if (standard.compliance_status) {
                        complianceStatus = standard.compliance_status;
                    } else if (issues) {
                        if (issues.includes('Non-Compliant')) {
                            complianceStatus = 'Non-Compliant';
                        } else if (issues.includes('Partial')) {
                            complianceStatus = 'Partially Compliant';
                        } else if (issues.includes('Compliant')) {
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
                                        <span class="fw-bold">${standardName}</span>
                                        <span class="badge bg-${statusClass}">${complianceStatus}</span>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapse${index}" class="accordion-collapse collapse" 
                                 aria-labelledby="heading${index}" data-bs-parent="#keyStandardsAccordion">
                                <div class="accordion-body">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <p><strong>Applicable:</strong> ${isApplicable ? 'Yes' : 'No'}</p>
                                            ${standard.status_reference ? 
                                                `<p><strong>Reference:</strong> ${standard.status_reference}</p>` : ''}
                                        </div>
                                        <div class="col-md-6">
                                            ${issues ? 
                                                `<div class="alert alert-${statusClass === 'warning' ? 'warning' : 'light'}">
                                                    <strong>Assessment:</strong> ${issues}
                                                </div>` : ''}
                                        </div>
                                    </div>
                                    ${this.getStandardDetailsHTML(standard)}
                                </div>
                            </div>
                        </div>
                    `;
                }
            });
            
        } catch (error) {
            console.error('Error loading key standards:', error);
            accordion.innerHTML = '<div class="alert alert-warning">Unable to load key standards analysis.</div>';
        }
    }

    static getStandardDetailsHTML(standard) {
        const excludeKeys = ['applicable', 'reason_of_the_status', 'status_reference', 'compliance_status'];
        const details = [];
        
        Object.entries(standard).forEach(([key, value]) => {
            if (!excludeKeys.includes(key) && value !== undefined && value !== null && value !== '') {
                const formattedKey = key.split('_')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                details.push({ key: formattedKey, value });
            }
        });
        
        if (details.length === 0) return '';
        
        return `
            <div class="mt-3">
                <h6>Detailed Analysis:</h6>
                <table class="table table-sm">
                    <tbody>
                        ${details.map(detail => `
                            <tr>
                                <td style="width: 40%"><strong>${detail.key}:</strong></td>
                                <td>${detail.value}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    static async loadProfessionalSkepticism() {
        try {
            const data23 = appState.allJSONData[23];
            if (!data23 || !data23.frc_analysis_report) return;
            
            // This data can be used for additional insights if needed
            const skepticismData = data23.frc_analysis_report.entity?.professional_skepticism_application;
            // Could add a separate section for professional skepticism findings
            
        } catch (error) {
            console.error('Error loading professional skepticism:', error);
        }
    }

    static async loadAuditGovernance() {
        try {
            const data14 = appState.allJSONData[14];
            if (!data14 || !data14.frc_analysis_report) return;
            
            // This data can be used for governance compliance insights
            const auditReport = data14.frc_analysis_report.entity?.phase_4_audit_governance_verification?.audit_report_analysis;
            const governance = data14.frc_analysis_report.entity?.phase_4_audit_governance_verification?.corporate_governance_review;
            
        } catch (error) {
            console.error('Error loading audit governance:', error);
        }
    }

    static viewStandardDetails(index) {
        const data12 = appState.allJSONData[12];
        const complianceMatrix = data12.frc_analysis_report.entity?.phase_3_ifrs_compliance_detailed?.detailed_ifrs_compliance_matrix;
        
        if (!complianceMatrix || !complianceMatrix[index]) {
            Notifications.show('Standard details not found', 'error');
            return;
        }
        
        const standard = complianceMatrix[index];
        
        const modalContent = `
            <div class="modal-header">
                <h5 class="modal-title">${standard.standard_code} - ${standard.standard_name}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        <table class="table table-sm">
                            <tbody>
                                <tr>
                                    <th>Standard Code:</th>
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
                                    <td>
                                        <span class="badge bg-${standard.compliance_status === 'Compliant' ? 'success' : 
                                                                 standard.compliance_status === 'Partially Compliant' ? 'warning' : 
                                                                 standard.compliance_status === 'Non-Compliant' ? 'danger' : 'secondary'}">
                                            ${standard.compliance_status || 'Not Assessed'}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Page Reference:</th>
                                    <td>${standard.page_reference || 'N/A'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-md-6">
                        ${standard.reason_of_the_status ? `
                            <div class="alert ${standard.compliance_status === 'Non-Compliant' ? 'alert-danger' : 
                                                standard.compliance_status === 'Partially Compliant' ? 'alert-warning' : 'alert-info'}">
                                <strong>Assessment:</strong><br>
                                ${standard.reason_of_the_status}
                            </div>
                        ` : ''}
                    </div>
                </div>
                
                ${standard.material_departures && standard.material_departures.length > 0 ? `
                <div class="mt-3">
                    <h6>Material Departures:</h6>
                    <div class="list-group">
                        ${standard.material_departures.map(departure => `
                            <div class="list-group-item list-group-item-danger">
                                <div class="d-flex w-100 justify-content-between">
                                    <span>${departure}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>` : ''}
                
                ${standard.status_reference ? `
                <div class="mt-3">
                    <strong>Status Reference:</strong>
                    <p class="mb-0">${standard.status_reference}</p>
                </div>` : ''}
                
                ${standard.ias_1_para_19_24_implication ? `
                <div class="mt-3">
                    <strong>IAS 1 Paragraph 19-24 Implication:</strong>
                    <p class="mb-0">${standard.ias_1_para_19_24_implication}</p>
                </div>` : ''}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        `;
        
        UIComponents.showModal(modalContent, 'standardDetailsModal');
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
                <div class="row">
                    <div class="col-md-6">
                        <table class="table table-sm">
                            <tbody>
                                <tr>
                                    <th>Departure ID:</th>
                                    <td>${departure.departure_id || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <th>IFRS Standard:</th>
                                    <td>${departure.ifrs_standard || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <th>Page Reference:</th>
                                    <td>${departure.page_reference || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <th>Materiality:</th>
                                    <td>
                                        <span class="badge bg-${departure.materiality_assessment?.includes('High') ? 'danger' : 
                                                                 departure.materiality_assessment?.includes('Low') ? 'info' : 'warning'}">
                                            ${departure.materiality_assessment || 'Medium'}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-md-6">
                        ${departure.financial_impact_estimate ? `
                            <div class="alert alert-warning">
                                <strong>Financial Impact:</strong><br>
                                ${departure.financial_impact_estimate}
                            </div>
                        ` : ''}
                    </div>
                </div>
                
                <div class="mt-3">
                    <h6>Nature of Departure:</h6>
                    <p>${departure.nature_of_departure || 'No description provided'}</p>
                </div>
                
                ${departure.extract_from_fs ? `
                <div class="mt-3">
                    <h6>Financial Statement Extract:</h6>
                    <div class="bg-light p-3 rounded">
                        <pre class="mb-0" style="white-space: pre-wrap;">${departure.extract_from_fs}</pre>
                    </div>
                </div>` : ''}
                
                ${departure.ias_1_para_19_24_implication ? `
                <div class="mt-3">
                    <h6>IAS 1 Implication:</h6>
                    <p>${departure.ias_1_para_19_24_implication}</p>
                </div>` : ''}
                
                <div class="mt-3">
                    <h6>Remediation Required:</h6>
                    <p>${departure.corrective_action_required || 'Not specified'}</p>
                </div>
                
                ${departure.regulatory_reporting_required ? `
                <div class="mt-3 alert alert-danger">
                    <h6>⚠️ Regulatory Reporting Required</h6>
                    <p class="mb-0">This departure requires reporting to: ${departure.regulatory_body || 'regulatory authorities'}</p>
                </div>` : ''}
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
                summary.innerHTML = `IFRS Compliance Review <span class="badge bg-info ms-2">${visibleCount} shown</span>`;
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
                reason_of_the_status: 'Hierarchy not fully applied',
                material_departures: ['Policy selection not properly justified']
            }
        ];
        
        this.renderComplianceTable(fallbackData);
        
        // Show warning
        Notifications.show('Using fallback compliance data. Actual JSON data may not be loaded.', 'warning');
    }

    static updateComplianceStatus() {
        // Refresh all compliance data
        this.loadAllComplianceData();
        Notifications.show('Compliance data refreshed', 'info');
    }

    static exportComplianceMatrix() {
        try {
            // Get current filtered rows
            const visibleRows = [];
            const table = document.getElementById('complianceTable');
            const headers = ['Standard Code', 'Standard Name', 'Applicability', 'Compliance Status', 'Page Reference', 'Issues Identified'];
            
            // Add data rows (only visible ones)
            table.querySelectorAll('tbody tr').forEach(tr => {
                if (tr.style.display !== 'none') {
                    const cells = [];
                    // Get text content from each cell (excluding actions column)
                    tr.querySelectorAll('td').forEach((td, index) => {
                        if (index < 6) { // Skip actions column
                            const text = td.textContent || td.innerText || '';
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
            link.setAttribute('download', `Compliance_Matrix_${new Date().toISOString().slice(0,10)}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            Notifications.show('Compliance matrix exported successfully', 'success');
            
        } catch (error) {
            console.error('Export error:', error);
            Notifications.show('Failed to export compliance matrix', 'error');
        }
    }
}

window.Compliance = Compliance;
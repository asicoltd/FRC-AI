// Simplified Compliance Section
class Compliance {
    static load() {
        appState.currentSection = 'compliance';
        UIComponents.updateActiveSidebarItem('compliance');
        
        const content = `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="section-title">IFRS Compliance Status</h3>
                <div>
                    <button class="btn btn-outline-primary me-2" onclick="Compliance.refreshData()">
                        <i class="fas fa-sync me-2"></i> Refresh
                    </button>
                    <button class="btn btn-primary" onclick="Compliance.exportData()">
                        <i class="fas fa-download me-2"></i> Export
                    </button>
                </div>
            </div>
            
            <!-- Summary Cards -->
            <div class="row mb-4">
                <div class="col-md-3">
                    <div class="dashboard-card text-center">
                        <div class="metric-label">Total Standards</div>
                        <div class="metric-value text-primary" id="totalStandards">0</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-card text-center">
                        <div class="metric-label">Compliant</div>
                        <div class="metric-value text-success" id="compliantCount">0</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-card text-center">
                        <div class="metric-label">Partial/Issues</div>
                        <div class="metric-value text-warning" id="partialCount">0</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-card text-center">
                        <div class="metric-label">Non-Compliant</div>
                        <div class="metric-value text-danger" id="nonCompliantCount">0</div>
                    </div>
                </div>
            </div>
            
            <!-- Compliance Table -->
            <div class="dashboard-card">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="mb-0">Compliance Matrix</h5>
                    <div class="d-flex" style="gap: 10px;">
                        <input type="text" class="form-control form-control-sm" 
                               placeholder="Search standards..." 
                               id="complianceSearch"
                               onkeyup="Compliance.filterTable()">
                        <select class="form-select form-select-sm" 
                                id="statusFilter" 
                                onchange="Compliance.filterTable()"
                                style="width: 150px;">
                            <option value="all">All Status</option>
                            <option value="Compliant">Compliant</option>
                            <option value="Partially Compliant">Partial</option>
                            <option value="Non-Compliant">Non-Compliant</option>
                            <option value="Not Applicable">Not Applicable</option>
                        </select>
                    </div>
                </div>
                
                <div class="table-responsive">
                    <table class="table table-hover table-sm">
                        <thead>
                            <tr>
                                <th width="15%">Standard</th>
                                <th width="10%">Category</th>
                                <th width="10%">Applicable</th>
                                <th width="15%">Status</th>
                                <th>Assessment / Reason</th>
                                <th width="10%">Reference</th>
                            </tr>
                        </thead>
                        <tbody id="complianceTableBody">
                            <tr>
                                <td colspan="6" class="text-center text-muted py-4">
                                    <i class="fas fa-spinner fa-spin me-2"></i>Loading compliance data...
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <div class="text-muted small" id="tableInfo">0 standards shown</div>
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-secondary" onclick="Compliance.prevPage()">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <button class="btn btn-outline-secondary" onclick="Compliance.nextPage()">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Regulatory Compliance -->
            <div class="row mt-4">
                <div class="col-md-12">
                    <div class="dashboard-card">
                        <h5 class="mb-3">Regulatory Compliance Summary</h5>
                        <div id="regulatoryCompliance" class="row">
                            <div class="col-md-12">
                                <div class="alert alert-info">
                                    <i class="fas fa-spinner fa-spin me-2"></i>Loading regulatory compliance data...
                                </div>
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
        try {
            // Collect all standards from JSON sections 7-11
            const allStandards = {};
            
            for (let i = 7; i <= 11; i++) {
                const sectionData = appState.allJSONData[i];
                if (sectionData?.frc_analysis_report?.entity?.phase_3_ifrs_compliance_detailed?.key_standards_compliance_check) {
                    const standards = sectionData.frc_analysis_report.entity.phase_3_ifrs_compliance_detailed.key_standards_compliance_check;
                    Object.assign(allStandards, standards);
                }
            }
            
            // Convert to array and process
            const standardsArray = Object.entries(allStandards).map(([key, standard]) => {
                const category = this.getCategory(key);
                const standardCode = this.getStandardCode(key, standard);
                const standardName = this.getStandardName(key);
                const applicable = standard.applicable !== false;
                const status = this.getComplianceStatus(standard);
                const reason = this.getReason(standard);
                const reference = standard.status_reference || standard.page_reference || '';
                
                return {
                    id: key,
                    code: standardCode,
                    name: standardName,
                    category: category,
                    applicable: applicable,
                    status: status,
                    reason: reason,
                    reference: reference,
                    rawData: standard
                };
            });
            
            // Sort by category and code
            standardsArray.sort((a, b) => {
                const categoryOrder = { 'IFRS': 1, 'IAS': 2, 'IFRIC': 3, 'SIC': 4 };
                const orderA = categoryOrder[a.category] || 5;
                const orderB = categoryOrder[b.category] || 5;
                
                if (orderA !== orderB) return orderA - orderB;
                return a.code.localeCompare(b.code);
            });
            
            // Store globally for filtering/pagination
            window.complianceStandards = standardsArray;
            window.currentPage = 1;
            window.itemsPerPage = 20;
            
            // Render table and update counts
            this.renderTable();
            this.updateCounts(standardsArray);
            this.loadRegulatoryCompliance();
            
        } catch (error) {
            console.error('Error loading compliance data:', error);
            document.getElementById('complianceTableBody').innerHTML = `
                <tr>
                    <td colspan="6" class="text-center text-danger py-4">
                        <i class="fas fa-exclamation-triangle me-2"></i>
                        Error loading compliance data. Please try again.
                    </td>
                </tr>
            `;
        }
    }

    static renderTable() {
        const standards = window.complianceStandards || [];
        const currentPage = window.currentPage || 1;
        const itemsPerPage = window.itemsPerPage || 20;
        
        // Calculate pagination
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageStandards = standards.slice(startIndex, endIndex);
        
        const tbody = document.getElementById('complianceTableBody');
        
        if (!standards.length) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center text-muted py-4">
                        No compliance data available.
                    </td>
                </tr>
            `;
            return;
        }
        
        // Render table rows
        let rowsHTML = '';
        
        pageStandards.forEach((standard, index) => {
            const rowNumber = startIndex + index + 1;
            
            // Determine badge colors
            const statusBadge = this.getStatusBadge(standard.status);
            const applicableBadge = standard.applicable ? 
                '<span class="badge bg-success">Yes</span>' : 
                '<span class="badge bg-secondary">No</span>';
            
            rowsHTML += `
                <tr onclick="Compliance.showDetails('${standard.id}')" style="cursor: pointer;">
                    <td>
                        <div class="fw-bold">${standard.code}</div>
                        <small class="text-muted">${standard.name}</small>
                    </td>
                    <td><span class="badge bg-light text-dark">${standard.category}</span></td>
                    <td>${applicableBadge}</td>
                    <td>${statusBadge}</td>
                    <td>
                        <div class="standard-reason" style="max-height: 60px; overflow: hidden;">
                            ${standard.reason || '<span class="text-muted">No assessment provided</span>'}
                        </div>
                    </td>
                    <td>
                        ${standard.reference ? 
                            `<small class="text-muted">${standard.reference}</small>` : 
                            '<span class="text-muted">-</span>'
                        }
                    </td>
                </tr>
            `;
        });
        
        tbody.innerHTML = rowsHTML;
        
        // Update table info
        const totalItems = standards.length;
        const infoText = `Showing ${startIndex + 1}-${Math.min(endIndex, totalItems)} of ${totalItems} standards`;
        document.getElementById('tableInfo').textContent = infoText;
    }

    static filterTable() {
        const searchTerm = document.getElementById('complianceSearch').value.toLowerCase();
        const statusFilter = document.getElementById('statusFilter').value;
        
        const standards = window.complianceStandards || [];
        
        // Filter standards
        const filteredStandards = standards.filter(standard => {
            // Search filter
            const matchesSearch = !searchTerm || 
                standard.code.toLowerCase().includes(searchTerm) ||
                standard.name.toLowerCase().includes(searchTerm) ||
                standard.category.toLowerCase().includes(searchTerm);
            
            // Status filter
            const matchesStatus = statusFilter === 'all' || standard.status === statusFilter;
            
            return matchesSearch && matchesStatus;
        });
        
        // Update global standards for rendering
        window.filteredStandards = filteredStandards;
        window.currentPage = 1;
        
        // Re-render table with filtered data
        const originalStandards = window.complianceStandards;
        window.complianceStandards = filteredStandards;
        this.renderTable();
        window.complianceStandards = originalStandards; // Restore original
        
        // Update counts for filtered results
        const compliantCount = filteredStandards.filter(s => s.status === 'Compliant').length;
        const partialCount = filteredStandards.filter(s => s.status === 'Partially Compliant').length;
        const nonCompliantCount = filteredStandards.filter(s => s.status === 'Non-Compliant').length;
        
        document.getElementById('totalStandards').textContent = filteredStandards.length;
        document.getElementById('compliantCount').textContent = compliantCount;
        document.getElementById('partialCount').textContent = partialCount;
        document.getElementById('nonCompliantCount').textContent = nonCompliantCount;
    }

    static getCategory(key) {
        if (key.startsWith('ifrs_')) return 'IFRS';
        if (key.startsWith('ias_')) return 'IAS';
        if (key.startsWith('ifric_')) return 'IFRIC';
        if (key.startsWith('sic_')) return 'SIC';
        return 'Other';
    }

    static getStandardCode(key, standard) {
        if (standard.standard_code) return standard.standard_code;
        
        const parts = key.split('_');
        if (parts.length >= 2) {
            const prefix = parts[0].toUpperCase();
            const number = parts[1];
            return `${prefix} ${number}`;
        }
        
        return key.toUpperCase().replace(/_/g, ' ');
    }

    static getStandardName(key) {
        return key.split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
            .replace('Ifrs', 'IFRS')
            .replace('Ias', 'IAS')
            .replace('Ifric', 'IFRIC')
            .replace('Sic', 'SIC');
    }

    static getComplianceStatus(standard) {
        if (standard.compliance_status) return standard.compliance_status;
        if (standard.reason_of_the_status) {
            const reason = standard.reason_of_the_status.toLowerCase();
            if (reason.includes('non-compliant')) return 'Non-Compliant';
            if (reason.includes('partial') || reason.includes('partially')) return 'Partially Compliant';
            if (reason.includes('compliant')) return 'Compliant';
            if (reason.includes('not applicable') || reason.includes('n/a')) return 'Not Applicable';
        }
        return standard.applicable === false ? 'Not Applicable' : 'Not Assessed';
    }

    static getReason(standard) {
        if (standard.reason_of_the_status) return standard.reason_of_the_status;
        
        // Try to extract reason from other fields
        const reasonFields = ['compliance', 'assessment', 'issues', 'discrepancies'];
        for (const field in standard) {
            if (reasonFields.some(rf => field.toLowerCase().includes(rf))) {
                const value = standard[field];
                if (value && value !== 'N/A' && value !== '') {
                    return String(value).length > 200 ? 
                        String(value).substring(0, 200) + '...' : 
                        String(value);
                }
            }
        }
        
        return '';
    }

    static getStatusBadge(status) {
        switch(status) {
            case 'Compliant':
                return '<span class="badge bg-success">Compliant</span>';
            case 'Partially Compliant':
                return '<span class="badge bg-warning">Partial</span>';
            case 'Non-Compliant':
                return '<span class="badge bg-danger">Non-Compliant</span>';
            case 'Not Applicable':
                return '<span class="badge bg-info">N/A</span>';
            default:
                return '<span class="badge bg-secondary">Not Assessed</span>';
        }
    }

    static updateCounts(standards) {
        const total = standards.length;
        const compliant = standards.filter(s => s.status === 'Compliant').length;
        const partial = standards.filter(s => s.status === 'Partially Compliant').length;
        const nonCompliant = standards.filter(s => s.status === 'Non-Compliant').length;
        
        document.getElementById('totalStandards').textContent = total;
        document.getElementById('compliantCount').textContent = compliant;
        document.getElementById('partialCount').textContent = partial;
        document.getElementById('nonCompliantCount').textContent = nonCompliant;
    }

    static prevPage() {
        if (window.currentPage > 1) {
            window.currentPage--;
            this.renderTable();
        }
    }

    static nextPage() {
        const totalItems = window.complianceStandards?.length || 0;
        const totalPages = Math.ceil(totalItems / window.itemsPerPage);
        
        if (window.currentPage < totalPages) {
            window.currentPage++;
            this.renderTable();
        }
    }

    static showDetails(standardId) {
        // Find the standard
        const standards = window.complianceStandards || [];
        const standard = standards.find(s => s.id === standardId);
        
        if (!standard) return;
        
        // Create modal content
        const modalContent = `
            <div class="modal-header">
                <h5 class="modal-title">${standard.code} - ${standard.name}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <table class="table table-sm">
                    <tr>
                        <th width="30%">Standard Code:</th>
                        <td>${standard.code}</td>
                    </tr>
                    <tr>
                        <th>Standard Name:</th>
                        <td>${standard.name}</td>
                    </tr>
                    <tr>
                        <th>Category:</th>
                        <td><span class="badge bg-light text-dark">${standard.category}</span></td>
                    </tr>
                    <tr>
                        <th>Applicable:</th>
                        <td>${standard.applicable ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                        <th>Compliance Status:</th>
                        <td>${this.getStatusBadge(standard.status)}</td>
                    </tr>
                    <tr>
                        <th>Reference:</th>
                        <td>${standard.reference || 'Not specified'}</td>
                    </tr>
                </table>
                
                <div class="mt-3">
                    <h6>Assessment Details:</h6>
                    <div class="alert alert-${standard.status === 'Non-Compliant' ? 'danger' : 
                                             standard.status === 'Partially Compliant' ? 'warning' : 
                                             'info'}">
                        ${standard.reason || 'No detailed assessment provided.'}
                    </div>
                </div>
                
                ${this.getAdditionalDetails(standard.rawData)}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        `;
        
        UIComponents.showModal(modalContent, 'standardDetailsModal');
    }

    static getAdditionalDetails(rawData) {
        if (!rawData || typeof rawData !== 'object') return '';
        
        const excludeKeys = ['applicable', 'reason_of_the_status', 'status_reference', 
                           'compliance_status', 'standard_code', 'standard_name', 'page_reference'];
        
        const details = [];
        
        for (const [key, value] of Object.entries(rawData)) {
            if (!excludeKeys.includes(key) && 
                value !== undefined && 
                value !== null && 
                value !== '' && 
                value !== 'N/A') {
                
                const formattedKey = key.split('_')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                
                let displayValue = value;
                if (Array.isArray(value)) {
                    displayValue = value.join(', ');
                }
                
                details.push({ key: formattedKey, value: displayValue });
            }
        }
        
        if (details.length === 0) return '';
        
        return `
            <div class="mt-3">
                <h6>Additional Information:</h6>
                <table class="table table-sm table-striped">
                    <tbody>
                        ${details.map(detail => `
                            <tr>
                                <td width="40%"><strong>${detail.key}:</strong></td>
                                <td>${detail.value}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    static loadRegulatoryCompliance() {
        try {
            const section5 = appState.allJSONData[5];
            if (!section5?.frc_analysis_report) return;
            
            const regulators = section5.frc_analysis_report.entity?.phase_1_foundational_checks?.regulatory_landscape?.applicable_regulators;
            const framework = section5.frc_analysis_report.entity?.phase_1_foundational_checks?.reporting_framework;
            
            const container = document.getElementById('regulatoryCompliance');
            if (!container) return;
            
            let html = '';
            
            if (framework) {
                const statusClass = framework.compliance_assessment === 'Compliant' ? 'success' : 
                                   framework.compliance_assessment === 'Partially Compliant' ? 'warning' : 'danger';
                
                html += `
                    <div class="col-md-6 mb-3">
                        <div class="card h-100">
                            <div class="card-body">
                                <h6 class="card-title">
                                    <i class="fas fa-file-alt me-2"></i>
                                    ${framework.disclosed_framework || 'IFRS'}
                                </h6>
                                <div class="mt-2">
                                    <span class="badge bg-${statusClass}">
                                        ${framework.compliance_assessment || 'Not Assessed'}
                                    </span>
                                    ${framework.reason_of_the_status ? 
                                        `<div class="mt-2 small">${framework.reason_of_the_status}</div>` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
            
            if (regulators && regulators.length > 0) {
                regulators.forEach(regulator => {
                    if (regulator.regulator_name && regulator.compliance_status !== 'Not Applicable') {
                        const statusClass = regulator.compliance_status === 'Compliant' ? 'success' : 
                                           regulator.compliance_status === 'Partially Compliant' ? 'warning' : 'secondary';
                        
                        html += `
                            <div class="col-md-6 mb-3">
                                <div class="card h-100">
                                    <div class="card-body">
                                        <h6 class="card-title">
                                            <i class="fas fa-gavel me-2"></i>
                                            ${regulator.regulator_name}
                                        </h6>
                                        <div class="mt-2">
                                            <span class="badge bg-${statusClass}">
                                                ${regulator.compliance_status || 'Not Assessed'}
                                            </span>
                                            ${regulator.reason_for_non_compliance ? 
                                                `<div class="mt-2 small text-muted">${regulator.reason_for_non_compliance}</div>` : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                });
            }
            
            container.innerHTML = html || '<div class="col-md-12"><div class="alert alert-info">No regulatory compliance data available.</div></div>';
            
        } catch (error) {
            console.error('Error loading regulatory compliance:', error);
            document.getElementById('regulatoryCompliance').innerHTML = `
                <div class="col-md-12">
                    <div class="alert alert-warning">
                        <i class="fas fa-exclamation-triangle me-2"></i>
                        Unable to load regulatory compliance data.
                    </div>
                </div>
            `;
        }
    }

    static refreshData() {
        this.loadComplianceData();
        Notifications.show('Compliance data refreshed', 'info');
    }

    static exportData() {
        try {
            const standards = window.complianceStandards || [];
            
            const headers = ['Standard Code', 'Standard Name', 'Category', 'Applicable', 'Status', 'Assessment', 'Reference'];
            const rows = standards.map(standard => [
                standard.code,
                standard.name,
                standard.category,
                standard.applicable ? 'Yes' : 'No',
                standard.status,
                standard.reason || '',
                standard.reference || ''
            ]);
            
            const csvContent = [
                headers.join(','),
                ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
            ].join('\n');
            
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            const date = new Date().toISOString().slice(0, 10);
            
            link.href = url;
            link.setAttribute('download', `Compliance_Matrix_${date}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            Notifications.show('Compliance data exported successfully', 'success');
            
        } catch (error) {
            console.error('Export error:', error);
            Notifications.show('Failed to export compliance data', 'error');
        }
    }
}

window.Compliance = Compliance;
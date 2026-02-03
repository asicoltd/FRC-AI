// Material Departures Section
class MaterialDepartures {
    static load() {
        appState.currentSection = 'material-departures';
        UIComponents.updateActiveSidebarItem('material-departures');
        
        // Get data from JSON
        const section24 = appState.allJSONData[24]; // Material departures data
        const section25 = appState.allJSONData[25]; // Risk assessment data
        const section5 = appState.allJSONData[5];   // Regulatory compliance data
        
        // Extract data
        const departuresData = section24?.frc_analysis_report?.entity?.phase_5_synthesis_and_findings?.consolidated_material_departures || [];
        const nonComplianceData = section24?.frc_analysis_report?.entity?.phase_5_synthesis_and_findings?.non_compliance_with_laws_regulations || [];
        const riskData = section25?.frc_analysis_report?.entity?.phase_5_synthesis_and_findings?.holistic_risk_factor_synthesis || {};
        
        // Get regulatory data from section 5
        const regulatoryLandscape = section5?.frc_analysis_report?.entity?.phase_1_foundational_checks?.regulatory_landscape || {};
        const applicableRegulators = regulatoryLandscape.applicable_regulators || [];
        
        // Function to create dynamic table from array data
        const createDynamicTable = (data, tableId, title, emptyMessage = 'No data available') => {
            if (!data || data.length === 0) {
                return `
                    <div class="dashboard-card">
                        <h5>${title}</h5>
                        <div class="text-center text-muted py-4">
                            <i class="fas fa-database fa-2x mb-3"></i>
                            <p>${emptyMessage}</p>
                        </div>
                    </div>
                `;
            }
            
            // Get all unique keys from all objects
            const allKeys = [...new Set(data.flatMap(item => Object.keys(item)))];
            
            // Generate table headers
            const headers = allKeys.map(key => 
                `<th>${this.formatKey(key)}</th>`
            ).join('');
            
            // Generate table rows
            const rows = data.map(item => {
                const cells = allKeys.map(key => {
                    const value = item[key];
                    return `<td>${this.formatValue(key, value)}</td>`;
                }).join('');
                return `<tr>${cells}</tr>`;
            }).join('');
            
            return `
                <div class="dashboard-card">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5 class="mb-0">${title} (${data.length})</h5>
                        <button class="btn btn-sm btn-outline-secondary" onclick="MaterialDepartures.toggleTable('${tableId}')">
                            <i class="fas fa-columns"></i> Toggle Columns
                        </button>
                    </div>
                    <div class="table-responsive" style="max-height: 400px; overflow-y: auto;">
                        <table class="table table-hover table-sm" id="${tableId}">
                            <thead>
                                <tr>${headers}</tr>
                            </thead>
                            <tbody>${rows}</tbody>
                        </table>
                    </div>
                </div>
            `;
        };
        
        // Function to create nested object table
        const createNestedObjectTable = (data, tableId, title, emptyMessage = 'No data available') => {
            if (!data || Object.keys(data).length === 0) {
                return `
                    <div class="dashboard-card">
                        <h5>${title}</h5>
                        <div class="text-center text-muted py-4">
                            <i class="fas fa-database fa-2x mb-3"></i>
                            <p>${emptyMessage}</p>
                        </div>
                    </div>
                `;
            }
            
            // Generate table for nested object
            const rows = Object.entries(data).map(([key, value]) => {
                const formattedValue = this.formatNestedValue(value);
                return `
                    <tr>
                        <td class="fw-bold" width="30%">${this.formatKey(key)}</td>
                        <td>${formattedValue}</td>
                    </tr>
                `;
            }).join('');
            
            return `
                <div class="dashboard-card">
                    <h5>${title}</h5>
                    <div class="table-responsive" style="max-height: 400px; overflow-y: auto;">
                        <table class="table table-hover table-sm" id="${tableId}">
                            <tbody>${rows}</tbody>
                        </table>
                    </div>
                </div>
            `;
        };

        const content = `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="section-title">Material Departures & Non-Compliance</h3>
                <div>
                    <button class="btn btn-outline-danger me-2" onclick="MaterialDepartures.addNewDeparture()">
                        <i class="fas fa-plus me-2"></i> Add Departure
                    </button>
                    <button class="btn btn-primary" onclick="MaterialDepartures.generateComplianceReport()">
                        <i class="fas fa-file-pdf me-2"></i> Generate Report
                    </button>
                </div>
            </div>
            
            <div class="row">
                <!-- Material Departures Section -->
                <div class="col-md-12 mb-4">
                    ${createDynamicTable(
                        departuresData, 
                        'materialDeparturesTable',
                        'Material Departures from IFRS',
                        'No material departures found in Section 24'
                    )}
                </div>
                
                <!-- Non-Compliance Section -->
                <div class="col-md-12 mb-4">
                    ${createDynamicTable(
                        nonComplianceData,
                        'nonComplianceTable',
                        'Non-Compliance with Laws & Regulations',
                        'No non-compliance issues found in Section 24'
                    )}
                </div>
            </div>
            
            <!-- Risk Assessment Section -->
            <div class="row mb-4">
                <div class="col-md-12">
                    <div class="dashboard-card">
                        <h5><i class="fas fa-chart-network me-2 text-primary"></i>Holistic Risk Factor Synthesis</h5>
                        
                        <!-- Financial Risks -->
                        <div class="mb-4">
                            <h6>Financial Risks Assessment</h6>
                            ${createNestedObjectTable(
                                riskData.financial_risks_from_analysis,
                                'financialRisksTable',
                                ''
                            )}
                        </div>
                        
                        <!-- Operational Risks -->
                        <div class="mb-4">
                            <h6>Operational Risks Assessment</h6>
                            ${createNestedObjectTable(
                                riskData.operational_risks,
                                'operationalRisksTable',
                                ''
                            )}
                        </div>
                        
                        <!-- Compliance Risks -->
                        <div class="mb-4">
                            <h6>Compliance Risks Assessment</h6>
                            ${createNestedObjectTable(
                                riskData.compliance_risks,
                                'complianceRisksTable',
                                ''
                            )}
                        </div>
                        
                        <!-- Key Audit Matters Synthesis -->
                        <div class="mb-4">
                            <h6>Key Audit Matters Synthesis</h6>
                            ${createNestedObjectTable(
                                riskData.key_audit_matters_synthesis,
                                'kamSynthesisTable',
                                ''
                            )}
                        </div>
                        
                        <!-- Overall Risk Assessment -->
                        <div class="mb-0">
                            <h6>Overall Integrated Risk Assessment</h6>
                            ${createNestedObjectTable(
                                riskData.overall_integrated_risk_assessment,
                                'overallRiskTable',
                                ''
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Regulatory Compliance Section -->
            <div class="row">
                <div class="col-md-12">
                    <div class="dashboard-card">
                        <h5><i class="fas fa-balance-scale me-2 text-primary"></i>Regulatory Compliance Status</h5>
                        <div class="table-responsive">
                            <table class="table table-hover table-sm">
                                <thead>
                                    <tr>
                                        <th>Regulator</th>
                                        <th>Compliance Status</th>
                                        <th>Reason for Status</th>
                                        <th>Notes Reference</th>
                                        <th>Specific Disclosures Found</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${applicableRegulators.map(regulator => `
                                        <tr>
                                            <td class="fw-bold">${this.formatValue('regulator_name', regulator.regulator_name)}</td>
                                            <td>
                                                <span class="badge ${this.getComplianceBadge(regulator.compliance_status)}">
                                                    ${this.formatValue('compliance_status', regulator.compliance_status)}
                                                </span>
                                            </td>
                                            <td>${this.formatValue('reason_for_non_compliance', regulator.reason_for_non_compliance)}</td>
                                            <td>${this.formatValue('notes_reference', regulator.notes_reference)}</td>
                                            <td>
                                                ${regulator.specific_disclosures_found && regulator.specific_disclosures_found.length > 0 ?
                                                    `<ul class="mb-0 small">${regulator.specific_disclosures_found.map(item => 
                                                        `<li>${item}</li>`
                                                    ).join('')}</ul>` :
                                                    'None specified'
                                                }
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Summary Statistics -->
            <div class="row mt-4">
                <div class="col-md-3">
                    <div class="dashboard-card">
                        <div class="d-flex align-items-center">
                            <div class="me-3">
                                <span class="dashboard-stat-icon danger">
                                    <i class="fas fa-exclamation-circle"></i>
                                </span>
                            </div>
                            <div>
                                <h3 class="mb-0">${departuresData.length}</h3>
                                <p class="small mb-0">Material Departures</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-card">
                        <div class="d-flex align-items-center">
                            <div class="me-3">
                                <span class="dashboard-stat-icon warning">
                                    <i class="fas fa-gavel"></i>
                                </span>
                            </div>
                            <div>
                                <h3 class="mb-0">${nonComplianceData.length}</h3>
                                <p class="small mb-0">Regulatory Issues</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-card">
                        <div class="d-flex align-items-center">
                            <div class="me-3">
                                <span class="dashboard-stat-icon info">
                                    <i class="fas fa-chart-line"></i>
                                </span>
                            </div>
                            <div>
                                <h3 class="mb-0">${this.getRiskLevelCount(riskData, 'Moderate')}</h3>
                                <p class="small mb-0">Moderate Risks</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-card">
                        <div class="d-flex align-items-center">
                            <div class="me-3">
                                <span class="dashboard-stat-icon ${riskData.compliance_risks?.consolidated_compliance_risk_level === 'High' ? 'danger' : 
                                                               riskData.compliance_risks?.consolidated_compliance_risk_level === 'Moderate' ? 'warning' : 
                                                               'success'}">
                                    <i class="fas fa-shield-alt"></i>
                                </span>
                            </div>
                            <div>
                                <h3 class="mb-0">${this.formatRiskLevel(riskData.compliance_risks?.consolidated_compliance_risk_level)}</h3>
                                <p class="small mb-0">Compliance Risk Level</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Data Explorer -->
            <div class="row mt-4">
                <div class="col-md-12">
                    <div class="dashboard-card">
                        <h5><i class="fas fa-search me-2 text-primary"></i>JSON Data Explorer</h5>
                        <div class="mb-3">
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-sm btn-outline-primary" onclick="MaterialDepartures.viewRawJSON('section24', 'Section 24: Material Departures')">
                                    Section 24
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-primary" onclick="MaterialDepartures.viewRawJSON('section25', 'Section 25: Risk Assessment')">
                                    Section 25
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-primary" onclick="MaterialDepartures.viewRawJSON('section5', 'Section 5: Regulatory Compliance')">
                                    Section 5
                                </button>
                            </div>
                        </div>
                        <pre id="jsonExplorer" class="bg-dark text-light p-3 rounded" style="max-height: 300px; overflow: auto; display: none;"></pre>
                    </div>
                </div>
            </div>
        `;

        UIComponents.getMainContent().innerHTML = content;
        
        // Initialize tooltips
        setTimeout(() => {
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }, 100);
    }

    // Helper method to format keys for display
    static formatKey(key) {
        if (!key) return '';
        
        // Replace underscores with spaces
        let formatted = key.replace(/_/g, ' ');
        
        // Capitalize first letter of each word
        formatted = formatted.replace(/\b\w/g, l => l.toUpperCase());
        
        // Handle special cases
        const specialCases = {
            'Ifrs': 'IFRS',
            'Ias': 'IAS',
            'Bsec': 'BSEC',
            'Frc': 'FRC',
            'Frca': 'FRCA',
            'Id': 'ID',
            'Fs': 'Financial Statements',
            'Ppe': 'PPE',
            'Kam': 'KAM'
        };
        
        Object.entries(specialCases).forEach(([short, long]) => {
            formatted = formatted.replace(new RegExp(`\\b${short}\\b`, 'gi'), long);
        });
        
        return formatted;
    }

    // Helper method to format values for display
    static formatValue(key, value) {
        if (value === undefined || value === null) {
            return '<span class="text-muted fst-italic">Not specified</span>';
        }
        
        if (Array.isArray(value)) {
            if (value.length === 0) {
                return '<span class="text-muted fst-italic">Empty array</span>';
            }
            return `<div class="small">${value.map(item => 
                `<div class="mb-1">• ${this.formatValue(key, item)}</div>`
            ).join('')}</div>`;
        }
        
        if (typeof value === 'object') {
            return `<div class="small">${Object.entries(value).map(([k, v]) =>
                `<div><strong>${this.formatKey(k)}:</strong> ${this.formatValue(k, v)}</div>`
            ).join('')}</div>`;
        }
        
        if (typeof value === 'boolean') {
            return value ? 
                '<span class="badge bg-success">Yes</span>' : 
                '<span class="badge bg-secondary">No</span>';
        }
        
        if (typeof value === 'string') {
            // Check for specific keys that might need special formatting
            if (key.toLowerCase().includes('risk') || key.toLowerCase().includes('severity')) {
                return this.formatRiskBadge(value);
            }
            
            if (key.toLowerCase().includes('materiality')) {
                return this.formatMaterialityBadge(value);
            }
            
            if (key.toLowerCase().includes('compliance')) {
                return this.formatComplianceBadge(value);
            }
            
            // Check if it's a URL or file path
            if (value.match(/^(http|https|ftp|www)|\.[a-z]{2,4}$/i)) {
                return `<a href="${value}" target="_blank" class="text-decoration-none">
                    <i class="fas fa-external-link-alt me-1"></i>Link
                </a>`;
            }
            
            // Check if it's a page reference
            if (value.toLowerCase().includes('page') || value.toLowerCase().includes('note')) {
                return `<span class="badge bg-info">${value}</span>`;
            }
            
            // Check if it's currency
            if (value.match(/^(BDT|USD|EUR|GBP)\s*\d+/i) || value.match(/^\d+[\d,]*\s*(BDT|USD|EUR|GBP)?$/i)) {
                return `<span class="fw-bold text-primary">${value}</span>`;
            }
        }
        
        // Default: return as-is
        return value.toString();
    }

    // Helper to format nested values
    static formatNestedValue(value) {
        if (Array.isArray(value)) {
            return value.length > 0 ? 
                `<ul class="mb-0 small">${value.map(item => `<li>${item}</li>`).join('')}</ul>` :
                '<span class="text-muted fst-italic">No items</span>';
        }
        
        if (typeof value === 'object' && value !== null) {
            return this.formatValue('', value);
        }
        
        return this.formatValue('', value);
    }

    // Format risk badges
    static formatRiskBadge(riskLevel) {
        const risk = riskLevel?.toLowerCase() || '';
        if (risk.includes('high')) {
            return '<span class="badge bg-danger">High Risk</span>';
        } else if (risk.includes('moderate') || risk.includes('medium')) {
            return '<span class="badge bg-warning">Moderate Risk</span>';
        } else if (risk.includes('low')) {
            return '<span class="badge bg-success">Low Risk</span>';
        } else {
            return `<span class="badge bg-secondary">${riskLevel}</span>`;
        }
    }

    // Format materiality badges
    static formatMaterialityBadge(materiality) {
        const mat = materiality?.toLowerCase() || '';
        if (mat.includes('material')) {
            return '<span class="badge bg-danger">Material</span>';
        } else if (mat.includes('significant')) {
            return '<span class="badge bg-warning">Significant</span>';
        } else if (mat.includes('immaterial')) {
            return '<span class="badge bg-success">Immaterial</span>';
        } else {
            return `<span class="badge bg-info">${materiality}</span>`;
        }
    }

    // Format compliance badges
    static formatComplianceBadge(compliance) {
        const comp = compliance?.toLowerCase() || '';
        if (comp.includes('compliant') && !comp.includes('non')) {
            return '<span class="badge bg-success">Compliant</span>';
        } else if (comp.includes('partial')) {
            return '<span class="badge bg-warning">Partially Compliant</span>';
        } else if (comp.includes('non')) {
            return '<span class="badge bg-danger">Non-Compliant</span>';
        } else if (comp.includes('not applicable') || comp.includes('n/a')) {
            return '<span class="badge bg-secondary">Not Applicable</span>';
        } else {
            return `<span class="badge bg-info">${compliance}</span>`;
        }
    }

    // Get compliance badge class
    static getComplianceBadge(complianceStatus) {
        if (!complianceStatus) return 'bg-secondary';
        
        const status = complianceStatus.toLowerCase();
        if (status.includes('compliant') && !status.includes('non') && !status.includes('partial')) {
            return 'bg-success';
        } else if (status.includes('partial')) {
            return 'bg-warning';
        } else if (status.includes('non')) {
            return 'bg-danger';
        } else if (status.includes('to be assessed') || status.includes('n/a')) {
            return 'bg-info';
        }
        return 'bg-secondary';
    }

    // Count risk levels
    static getRiskLevelCount(riskData, level) {
        let count = 0;
        if (!riskData) return count;
        
        // Check all consolidated risk levels
        Object.values(riskData).forEach(section => {
            if (section && typeof section === 'object') {
                Object.values(section).forEach(value => {
                    if (typeof value === 'string' && value.toLowerCase().includes(level.toLowerCase())) {
                        count++;
                    }
                });
            }
        });
        
        return count;
    }

    // Format risk level for display
    static formatRiskLevel(level) {
        if (!level) return 'N/A';
        return this.formatRiskBadge(level).replace(/<\/?span[^>]*>/g, '').replace(/ class="[^"]*"/g, '');
    }

    // Toggle table column visibility
    static toggleTable(tableId) {
        const table = document.getElementById(tableId);
        if (!table) return;
        
        const headers = table.querySelectorAll('th');
        const rows = table.querySelectorAll('tbody tr');
        
        // Toggle even-numbered columns (starting from 0 index, so odd columns visually)
        headers.forEach((header, index) => {
            if (index % 2 === 1) { // Toggle every other column
                header.classList.toggle('d-none');
                rows.forEach(row => {
                    const cells = row.querySelectorAll('td');
                    if (cells[index]) {
                        cells[index].classList.toggle('d-none');
                    }
                });
            }
        });
    }

    // View raw JSON
    static viewRawJSON(sectionKey, title) {
        const sections = {
            'section24': appState.allJSONData[24],
            'section25': appState.allJSONData[25],
            'section5': appState.allJSONData[5]
        };
        
        const data = sections[sectionKey];
        const explorer = document.getElementById('jsonExplorer');
        
        if (explorer) {
            if (explorer.style.display === 'none') {
                explorer.innerHTML = `<h6 class="mb-2">${title}</h6>\n` + 
                                   JSON.stringify(data, null, 2);
                explorer.style.display = 'block';
            } else {
                explorer.style.display = 'none';
            }
        }
    }

    static addNewDeparture() {
        // Implementation for adding new departure
        Notifications.show('Add new departure functionality would open here.', 'info');
    }

    static generateComplianceReport() {
        // Implementation for generating report
        Notifications.show('Generating comprehensive compliance report...', 'info');
        setTimeout(() => {
            Notifications.show('Report generated successfully!', 'success');
        }, 1500);
    }
}

window.MaterialDepartures = MaterialDepartures;

// Add CSS for enhanced tables
const style = document.createElement('style');
style.textContent = `
    .dashboard-stat-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
    }
    .dashboard-stat-icon.danger { background-color: rgba(220, 53, 69, 0.1); color: #dc3545; }
    .dashboard-stat-icon.warning { background-color: rgba(255, 193, 7, 0.1); color: #ffc107; }
    .dashboard-stat-icon.info { background-color: rgba(23, 162, 184, 0.1); color: #17a2b8; }
    .dashboard-stat-icon.success { background-color: rgba(40, 167, 69, 0.1); color: #28a745; }
    
    /* Table styling */
    .table-hover tbody tr:hover {
        background-color: rgba(0, 123, 255, 0.05);
    }
    
    .table-sm th, .table-sm td {
        padding: 0.5rem;
        font-size: 0.875rem;
    }
    
    .table thead th {
        border-bottom: 2px solid #dee2e6;
        background-color: #f8f9fa;
        position: sticky;
        top: 0;
        z-index: 10;
    }
    
    /* Badge enhancements */
    .badge {
        font-size: 0.75em;
        padding: 0.25em 0.6em;
        font-weight: 600;
    }
    
    /* JSON Explorer */
    pre#jsonExplorer {
        font-size: 0.8rem;
        line-height: 1.4;
    }
    
    pre#jsonExplorer .string { color: #98c379; }
    pre#jsonExplorer .number { color: #d19a66; }
    pre#jsonExplorer .boolean { color: #56b6c2; }
    pre#jsonExplorer .null { color: #c678dd; }
    pre#jsonExplorer .key { color: #61afef; }
    
    /* Responsive tables */
    @media (max-width: 768px) {
        .table-responsive {
            font-size: 0.8rem;
        }
        
        .badge {
            font-size: 0.65em;
            padding: 0.2em 0.5em;
        }
    }
    
    /* Column toggle animation */
    th, td {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Add JSON syntax highlighting
document.addEventListener('DOMContentLoaded', function() {
    function syntaxHighlight(json) {
        if (!json) return '';
        
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            let cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    // Apply syntax highlighting to existing JSON explorer
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                const explorer = document.getElementById('jsonExplorer');
                if (explorer && explorer.textContent && !explorer.innerHTML.includes('span class')) {
                    explorer.innerHTML = syntaxHighlight(explorer.textContent);
                }
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
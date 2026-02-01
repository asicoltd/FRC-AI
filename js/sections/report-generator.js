// Report Generator Section
class ReportGenerator {
    static load() {
        appState.currentSection = 'report-generator';
        UIComponents.updateActiveSidebarItem('report-generator');
        
        const content = `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="section-title">FRC Report Generator</h3>
                <div>
                    <button class="btn btn-success me-2" onclick="ReportGenerator.generateFullReport()">
                        <i class="fas fa-file-pdf me-2"></i> Generate Full Report
                    </button>
                    <button class="btn btn-primary" onclick="ReportGenerator.previewReport()">
                        <i class="fas fa-eye me-2"></i> Preview Report
                    </button>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-8">
                    <div class="dashboard-card">
                        <h5><i class="fas fa-cogs me-2 text-primary"></i>Report Configuration</h5>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label class="form-label">Report Type</label>
                                <select class="form-select" id="reportType">
                                    <option value="full">Full Analysis Report</option>
                                    <option value="executive">Executive Summary</option>
                                    <option value="compliance">Compliance Only</option>
                                    <option value="risk">Risk Assessment Only</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Format</label>
                                <select class="form-select" id="reportFormat">
                                    <option value="pdf">PDF Document</option>
                                    <option value="word">Word Document</option>
                                    <option value="excel">Excel Workbook</option>
                                    <option value="html">HTML Report</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label class="form-label">Sections to Include</label>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="sec1" checked>
                                        <label class="form-check-label" for="sec1">Executive Summary</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="sec2" checked>
                                        <label class="form-check-label" for="sec2">Entity Context</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="sec3" checked>
                                        <label class="form-check-label" for="sec3">Financial Analysis</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="sec4" checked>
                                        <label class="form-check-label" for="sec4">IFRS Compliance</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="sec5" checked>
                                        <label class="form-check-label" for="sec5">Audit & Governance</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="sec6" checked>
                                        <label class="form-check-label" for="sec6">Material Departures</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="sec7" checked>
                                        <label class="form-check-label" for="sec7">Risk Assessment</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="sec8" checked>
                                        <label class="form-check-label" for="sec8">Recommendations</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label class="form-label">Custom Report Title</label>
                            <input type="text" class="form-control" id="reportTitle" value="FRC Analysis Report - [Company Name]">
                        </div>
                        
                        <div class="mb-3">
                            <label class="form-label">Additional Notes</label>
                            <textarea class="form-control" id="additionalNotes" rows="3" placeholder="Add any specific instructions or notes for the report..."></textarea>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-4">
                    <div class="dashboard-card">
                        <h5><i class="fas fa-history me-2 text-primary"></i>Recent Reports</h5>
                        <div class="list-group">
                            <div class="list-group-item">
                                <div class="d-flex w-100 justify-content-between">
                                    <h6 class="mb-1">Full Analysis Report</h6>
                                    <small>Yesterday</small>
                                </div>
                                <p class="mb-1 small">45 pages, PDF format</p>
                                <button class="btn btn-sm btn-outline-primary mt-1" onclick="ReportGenerator.downloadReport('full')">Download</button>
                            </div>
                            <div class="list-group-item">
                                <div class="d-flex w-100 justify-content-between">
                                    <h6 class="mb-1">Executive Summary</h6>
                                    <small>3 days ago</small>
                                </div>
                                <p class="mb-1 small">12 pages, Word format</p>
                                <button class="btn btn-sm btn-outline-primary mt-1" onclick="ReportGenerator.downloadReport('executive')">Download</button>
                            </div>
                            <div class="list-group-item">
                                <div class="d-flex w-100 justify-content-between">
                                    <h6 class="mb-1">Compliance Matrix</h6>
                                    <small>1 week ago</small>
                                </div>
                                <p class="mb-1 small">Excel workbook</p>
                                <button class="btn btn-sm btn-outline-primary mt-1" onclick="ReportGenerator.downloadReport('compliance')">Download</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="dashboard-card">
                        <h5><i class="fas fa-palette me-2 text-primary"></i>Branding Options</h5>
                        <div class="mb-3">
                            <label class="form-label">Include FRC Logo</label>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="includeLogo" checked>
                                <label class="form-check-label" for="includeLogo">Yes</label>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Confidentiality Level</label>
                            <select class="form-select" id="confidentiality">
                                <option value="public">Public</option>
                                <option value="confidential" selected>Confidential</option>
                                <option value="strictly-confidential">Strictly Confidential</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Include Signature</label>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="includeSignature" checked>
                                <label class="form-check-label" for="includeSignature">Yes</label>
                            </div>
                        </div>
                        <button class="btn btn-outline-primary w-100" onclick="ReportGenerator.configureReport()">
                            <i class="fas fa-sliders-h me-2"></i> Configure Advanced Options
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h5><i class="fas fa-rocket me-2 text-primary"></i>Quick Generate Options</h5>
                <div class="row">
                    <div class="col-md-3">
                        <button class="btn btn-outline-primary w-100 mb-2" onclick="ReportGenerator.generateExecutiveSummary()">
                            <i class="fas fa-file-alt me-2"></i> Executive Summary
                        </button>
                    </div>
                    <div class="col-md-3">
                        <button class="btn btn-outline-warning w-100 mb-2" onclick="ReportGenerator.generateComplianceReport()">
                            <i class="fas fa-clipboard-check me-2"></i> Compliance Report
                        </button>
                    </div>
                    <div class="col-md-3">
                        <button class="btn btn-outline-danger w-100 mb-2" onclick="ReportGenerator.generateRiskReport()">
                            <i class="fas fa-exclamation-triangle me-2"></i> Risk Report
                        </button>
                    </div>
                    <div class="col-md-3">
                        <button class="btn btn-outline-success w-100 mb-2" onclick="ReportGenerator.generateRecommendations()">
                            <i class="fas fa-bullseye me-2"></i> Recommendations
                        </button>
                    </div>
                </div>
            </div>
        `;

        UIComponents.getMainContent().innerHTML = content;
    }

    static generateFullReport() {
        Notifications.show('Full FRC report generation would begin.', 'info');
    }

    static previewReport() {
        Notifications.show('Report preview would open in new window.', 'info');
    }

    static generateExecutiveSummary() {
        Notifications.show('Executive summary report generation would begin.', 'info');
    }

    static generateComplianceReport() {
        Notifications.show('Compliance report generation would begin.', 'info');
    }

    static generateRiskReport() {
        Notifications.show('Risk assessment report generation would begin.', 'info');
    }

    static generateRecommendations() {
        Notifications.show('Recommendations report generation would begin.', 'info');
    }

    static downloadReport(type) {
        Notifications.show(`Downloading ${type} report...`, 'info');
    }

    static configureReport() {
        Notifications.show('Advanced report configuration options would open.', 'info');
    }
}

window.ReportGenerator = ReportGenerator;
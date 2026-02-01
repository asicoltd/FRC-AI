// Audit & Governance Section
class AuditGovernance {
    static load() {
        appState.currentSection = 'audit-governance';
        UIComponents.updateActiveSidebarItem('audit-governance');
        
        const content = `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="section-title">Audit & Governance Assessment</h3>
                <button class="btn btn-primary" onclick="AuditGovernance.loadEnhancedAuditAnalysis()">
                    <i class="fas fa-search-plus me-2"></i> Detailed Analysis
                </button>
            </div>
            
            <div class="row">
                <div class="col-md-8">
                    <div class="dashboard-card">
                        <h5><i class="fas fa-file-signature me-2 text-primary"></i>Audit Report Analysis</h5>
                        <div class="row">
                            <div class="col-md-6">
                                <table class="table table-borderless">
                                    <tr>
                                        <th width="50%">Audit Firm:</th>
                                        <td id="auditFirm">ABC & Co. Chartered Accountants</td>
                                    </tr>
                                    <tr>
                                        <th>Audit Tenure:</th>
                                        <td>5 years</td>
                                    </tr>
                                    <tr>
                                        <th>Rotation Compliance:</th>
                                        <td><span class="badge bg-success">Compliant</span></td>
                                    </tr>
                                    <tr>
                                        <th>Opinion Type:</th>
                                        <td><span class="badge bg-warning">Modified with Emphasis of Matter</span></td>
                                    </tr>
                                </table>
                            </div>
                            <div class="col-md-6">
                                <div class="alert alert-warning">
                                    <h6><i class="fas fa-exclamation-circle me-2"></i>Material Uncertainty</h6>
                                    <p class="mb-0">Going concern uncertainty related to debt covenant compliance</p>
                                </div>
                                <div class="alert alert-info">
                                    <h6><i class="fas fa-clipboard-list me-2"></i>Key Audit Matters: 3</h6>
                                    <p class="mb-0">Revenue recognition, inventory valuation, related party transactions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="dashboard-card">
                        <h5><i class="fas fa-user-tie me-2 text-primary"></i>Corporate Governance Review</h5>
                        <div class="row">
                            <div class="col-md-4">
                                <h6>Board Structure</h6>
                                <div class="mb-2">
                                    <span class="badge bg-success me-1">Independent: 40%</span>
                                    <span class="badge bg-warning me-1">Expertise: Medium</span>
                                </div>
                                <p class="small">Board composition meets minimum requirements but lacks industry-specific expertise.</p>
                            </div>
                            <div class="col-md-4">
                                <h6>Committee Effectiveness</h6>
                                <div class="mb-2">
                                    <span class="badge bg-success me-1">Audit: Active</span>
                                    <span class="badge bg-warning me-1">Risk: Limited</span>
                                </div>
                                <p class="small">Audit committee meets regularly but risk committee activities are minimal.</p>
                            </div>
                            <div class="col-md-4">
                                <h6>Internal Controls</h6>
                                <div class="mb-2">
                                    <span class="badge bg-warning me-1">Effectiveness: Moderate</span>
                                </div>
                                <p class="small">Management assessment indicates weaknesses in IT controls.</p>
                                </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-4">
                    <div class="dashboard-card">
                        <h5><i class="fas fa-balance-scale me-2 text-primary"></i>BSEC Governance Code Compliance</h5>
                        <div class="mb-3">
                            <div class="d-flex justify-content-between mb-1">
                                <span>Overall Compliance Score</span>
                                <span>72%</span>
                            </div>
                            <div class="progress" style="height: 10px;">
                                <div class="progress-bar bg-warning" style="width: 72%"></div>
                            </div>
                        </div>
                        
                        <div class="accordion" id="governanceAccordion">
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#governance1">
                                        Major Non-Compliances (3)
                                    </button>
                                </h2>
                                <div id="governance1" class="accordion-collapse collapse">
                                    <div class="accordion-body">
                                        <ul class="mb-0">
                                            <li>Director independence disclosures incomplete</li>
                                            <li>Remuneration policy not fully disclosed</li>
                                            <li>Risk management framework documentation lacking</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#governance2">
                                        Partial Compliances (5)
                                    </button>
                                </h2>
                                <div id="governance2" class="accordion-collapse collapse">
                                    <div class="accordion-body">
                                        <ul class="mb-0">
                                            <li>Board diversity policy</li>
                                            <li>Stakeholder engagement</li>
                                            <li>Whistleblower policy implementation</li>
                                            <li>IT governance framework</li>
                                            <li>Succession planning</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="dashboard-card">
                        <h5><i class="fas fa-shield-alt me-2 text-primary"></i>ISA Compliance Check</h5>
                        <div class="mb-3">
                            <span class="badge bg-success me-1">ISA 700: Compliant</span>
                            <span class="badge bg-success me-1">ISA 705: Compliant</span>
                            <span class="badge bg-warning">ISA 570: Modified</span>
                        </div>
                        <p class="small mb-0">Audit report structure complies with ISA requirements. Emphasis of matter paragraph appropriately included for going concern uncertainty.</p>
                    </div>
                </div>
            </div>
        `;

        UIComponents.getMainContent().innerHTML = content;
    }

    static loadEnhancedAuditAnalysis() {
        Notifications.show('Enhanced audit analysis view would open.', 'info');
    }
}

window.AuditGovernance = AuditGovernance;
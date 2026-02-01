// Risk Assessment Section
class RiskAssessment {
    static load() {
        appState.currentSection = 'risk-assessment';
        UIComponents.updateActiveSidebarItem('risk-assessment');
        
        const content = `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="section-title">Integrated Risk Assessment</h3>
                <div>
                    <button class="btn btn-outline-primary me-2" onclick="RiskAssessment.updateRiskAssessment()">
                        <i class="fas fa-redo me-2"></i> Reassess
                    </button>
                    <button class="btn btn-primary" onclick="RiskAssessment.exportRiskMatrix()">
                        <i class="fas fa-download me-2"></i> Export Matrix
                    </button>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-4">
                    <div class="dashboard-card danger text-center">
                        <div class="metric-label">High Risk Areas</div>
                        <div class="metric-value">8</div>
                        <div class="mt-2">
                            <p class="small mb-1">• Revenue recognition</p>
                            <p class="small mb-1">• Going concern</p>
                            <p class="small mb-0">• Debt covenant compliance</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="dashboard-card warning text-center">
                        <div class="metric-label">Medium Risk Areas</div>
                        <div class="metric-value">12</div>
                        <div class="mt-2">
                            <p class="small mb-1">• Inventory valuation</p>
                            <p class="small mb-1">• Related party transactions</p>
                            <p class="small mb-0">• Tax compliance</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="dashboard-card success text-center">
                        <div class="metric-label">Low Risk Areas</div>
                        <div class="metric-value">15</div>
                        <div class="mt-2">
                            <p class="small mb-1">• Property, plant & equipment</p>
                            <p class="small mb-1">• Share capital</p>
                            <p class="small mb-0">• Cash equivalents</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h5><i class="fas fa-project-diagram me-2"></i>Risk Factor Synthesis</h5>
                <div class="row">
                    <div class="col-md-4">
                        <h6>Financial Risks</h6>
                        <div class="list-group">
                            <div class="list-group-item">
                                <div class="d-flex justify-content-between">
                                    <span>Liquidity risk</span>
                                    <span class="risk-indicator risk-high"></span>
                                </div>
                            </div>
                            <div class="list-group-item">
                                <div class="d-flex justify-content-between">
                                    <span>Credit risk</span>
                                    <span class="risk-indicator risk-medium"></span>
                                </div>
                            </div>
                            <div class="list-group-item">
                                <div class="d-flex justify-content-between">
                                    <span>Market risk</span>
                                    <span class="risk-indicator risk-low"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <h6>Operational Risks</h6>
                        <div class="list-group">
                            <div class="list-group-item">
                                <div class="d-flex justify-content-between">
                                    <span>Internal controls</span>
                                    <span class="risk-indicator risk-medium"></span>
                                </div>
                            </div>
                            <div class="list-group-item">
                                <div class="d-flex justify-content-between">
                                    <span>Business continuity</span>
                                    <span class="risk-indicator risk-medium"></span>
                                </div>
                            </div>
                            <div class="list-group-item">
                                <div class="d-flex justify-content-between">
                                    <span>Supply chain</span>
                                    <span class="risk-indicator risk-low"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <h6>Compliance Risks</h6>
                        <div class="list-group">
                            <div class="list-group-item">
                                <div class="d-flex justify-content-between">
                                    <span>IFRS compliance</span>
                                    <span class="risk-indicator risk-high"></span>
                                </div>
                            </div>
                            <div class="list-group-item">
                                <div class="d-flex justify-content-between">
                                    <span>Tax compliance</span>
                                    <span class="risk-indicator risk-medium"></span>
                                </div>
                            </div>
                            <div class="list-group-item">
                                <div class="d-flex justify-content-between">
                                    <span>Regulatory filings</span>
                                    <span class="risk-indicator risk-low"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h5><i class="fas fa-chart-bar me-2"></i>Risk Heat Map</h5>
                <canvas id="riskHeatMap" height="100"></canvas>
            </div>
            
            <div class="dashboard-card">
                <h5><i class="fas fa-tasks me-2"></i>FRCA Priority Actions</h5>
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Priority</th>
                                <th>Action Required</th>
                                <th>Responsible</th>
                                <th>Timeline</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="table-danger">
                                <td>Critical</td>
                                <td>Address going concern uncertainties</td>
                                <td>Board of Directors</td>
                                <td>Immediate</td>
                                <td><span class="badge bg-danger">Not Started</span></td>
                            </tr>
                            <tr class="table-danger">
                                <td>High</td>
                                <td>Correct IFRS 15 revenue recognition</td>
                                <td>CFO & Finance Team</td>
                                <td>30 days</td>
                                <td><span class="badge bg-warning">In Progress</span></td>
                            </tr>
                            <tr class="table-warning">
                                <td>Medium</td>
                                <td>Enhance related party disclosures</td>
                                <td>Company Secretary</td>
                                <td>60 days</td>
                                <td><span class="badge bg-secondary">Pending</span></td>
                            </tr>
                            <tr class="table-warning">
                                <td>Medium</td>
                                <td>Strengthen internal controls</td>
                                <td>Internal Audit</td>
                                <td>90 days</td>
                                <td><span class="badge bg-secondary">Pending</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        UIComponents.getMainContent().innerHTML = content;
        this.renderRiskCharts();
    }

    static renderRiskCharts() {
        const riskCtx = document.getElementById('riskHeatMap')?.getContext('2d');
        if (riskCtx) {
            new Chart(riskCtx, {
                type: 'radar',
                data: {
                    labels: ['Financial Risk', 'Operational Risk', 'Compliance Risk', 'Strategic Risk', 'Reputational Risk'],
                    datasets: [{
                        label: 'Current Risk Level',
                        data: [8, 6, 9, 5, 7],
                        backgroundColor: 'rgba(244, 67, 54, 0.2)',
                        borderColor: '#f44336',
                        pointBackgroundColor: '#f44336'
                    }, {
                        label: 'Industry Average',
                        data: [5, 5, 5, 5, 5],
                        backgroundColor: 'rgba(33, 150, 243, 0.2)',
                        borderColor: '#2196f3',
                        pointBackgroundColor: '#2196f3'
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 10
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Risk Heat Map Comparison'
                        }
                    }
                }
            });
        }
    }

    static updateRiskAssessment() {
        Notifications.show('Risk assessment recalculation would begin.', 'info');
    }

    static exportRiskMatrix() {
        Notifications.show('Risk matrix would be exported.', 'info');
    }
}

window.RiskAssessment = RiskAssessment;
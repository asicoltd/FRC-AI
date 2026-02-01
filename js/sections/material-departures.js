// Material Departures Section
class MaterialDepartures {
    static load() {
        appState.currentSection = 'material-departures';
        UIComponents.updateActiveSidebarItem('material-departures');
        
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
            
            <div class="dashboard-card danger">
                <h5><i class="fas fa-exclamation-triangle me-2"></i>Critical Material Departures</h5>
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr class="table-danger">
                                <th>ID</th>
                                <th>IFRS Standard</th>
                                <th>Nature of Departure</th>
                                <th>Financial Impact</th>
                                <th>Materiality</th>
                                <th>Corrective Action</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>DEPT-001</td>
                                <td>IFRS 15</td>
                                <td>Revenue recognized before performance obligations satisfied</td>
                                <td>BDT 45,000,000</td>
                                <td><span class="badge bg-danger">Material</span></td>
                                <td>Restate revenue recognition policy</td>
                                <td><span class="badge bg-warning">Pending</span></td>
                            </tr>
                            <tr>
                                <td>DEPT-002</td>
                                <td>IAS 24</td>
                                <td>Incomplete related party transaction disclosures</td>
                                <td>BDT 12,500,000</td>
                                <td><span class="badge bg-danger">Material</span></td>
                                <td>Provide full disclosure in notes</td>
                                <td><span class="badge bg-warning">Pending</span></td>
                            </tr>
                            <tr>
                                <td>DEPT-003</td>
                                <td>IAS 37</td>
                                <td>Provision for onerous contracts understated</td>
                                <td>BDT 8,200,000</td>
                                <td><span class="badge bg-warning">Material</span></td>
                                <td>Recalculate and adjust provision</td>
                                <td><span class="badge bg-warning">Pending</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="dashboard-card warning">
                <h5><i class="fas fa-gavel me-2"></i>Non-Compliance with Laws & Regulations</h5>
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr class="table-warning">
                                <th>Compliance ID</th>
                                <th>Law/Regulation</th>
                                <th>Section Violated</th>
                                <th>Nature of Breach</th>
                                <th>Severity</th>
                                <th>Potential Penalties</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>COMP-001</td>
                                <td>Companies Act 1994</td>
                                <td>Section 184</td>
                                <td>Inadequate director's report disclosures</td>
                                <td><span class="risk-indicator risk-medium"></span> Medium</td>
                                <td>Fine up to BDT 50,000</td>
                            </tr>
                            <tr>
                                <td>COMP-002</td>
                                <td>Financial Reporting Act 2015</td>
                                <td>Section 12</td>
                                <td>Failure to apply IFRS as adopted in Bangladesh</td>
                                <td><span class="risk-indicator risk-high"></span> High</td>
                                <td>Fine up to BDT 500,000</td>
                            </tr>
                            <tr>
                                <td>COMP-003</td>
                                <td>Income Tax Act 2023</td>
                                <td>Section 75</td>
                                <td>Transfer pricing documentation inadequate</td>
                                <td><span class="risk-indicator risk-medium"></span> Medium</td>
                                <td>Adjustments + 20% penalty</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="row mt-4">
                <div class="col-md-6">
                    <div class="dashboard-card">
                        <h5><i class="fas fa-chart-pie me-2"></i>Departures by Standard</h5>
                        <canvas id="departuresChart" height="200"></canvas>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="dashboard-card">
                        <h5><i class="fas fa-calendar-alt me-2"></i>Remediation Timeline</h5>
                        <div class="timeline">
                            <div class="timeline-item">
                                <h6>Immediate Actions (0-30 days)</h6>
                                <p class="small mb-1">• Restate IFRS 15 revenue recognition</p>
                                <p class="small mb-0">• Complete IAS 24 disclosures</p>
                            </div>
                            <div class="timeline-item">
                                <h6>Short-term Actions (30-90 days)</h6>
                                <p class="small mb-1">• Enhance internal controls</p>
                                <p class="small mb-0">• Update accounting policies manual</p>
                            </div>
                            <div class="timeline-item">
                                <h6>Medium-term Actions (90-180 days)</h6>
                                <p class="small mb-1">• Implement IFRS 9 ECL model</p>
                                <p class="small mb-0">• Enhance governance framework</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        UIComponents.getMainContent().innerHTML = content;
        this.renderDeparturesChart();
    }

    static renderDeparturesChart() {
        const departuresCtx = document.getElementById('departuresChart')?.getContext('2d');
        if (departuresCtx) {
            new Chart(departuresCtx, {
                type: 'bar',
                data: {
                    labels: ['IFRS 15', 'IAS 24', 'IAS 37', 'IFRS 9', 'IAS 16'],
                    datasets: [{
                        label: 'Number of Issues',
                        data: [5, 3, 2, 2, 1],
                        backgroundColor: ['#f44336', '#ff9800', '#ffeb3b', '#4caf50', '#2196f3']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Material Departures by Standard'
                        }
                    }
                }
            });
        }
    }

    static addNewDeparture() {
        Notifications.show('Modal for adding new material departure would open.', 'info');
    }

    static generateComplianceReport() {
        Notifications.show('Compliance report generation would start.', 'info');
    }
}

window.MaterialDepartures = MaterialDepartures;
// Professional Skepticism Section
class Skepticism {
    static load() {
        appState.currentSection = 'skepticism';
        UIComponents.updateActiveSidebarItem('skepticism');
        
        const content = `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="section-title">Professional Skepticism Application</h3>
            </div>
            
            <div class="dashboard-card">
                <h5><i class="fas fa-search me-2 text-primary"></i>Management Assertions Challenged</h5>
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Assertion Area</th>
                                <th>Management Claim</th>
                                <th>Evidence Sought</th>
                                <th>Evidence Found</th>
                                <th>Corroboration Level</th>
                                <th>Conclusion</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Revenue Recognition</td>
                                <td>All performance obligations satisfied at point of sale</td>
                                <td>Contract terms, delivery evidence, customer acceptance</td>
                                <td>Partial - missing customer acceptance for 15% of revenue</td>
                                <td><span class="badge bg-warning">Moderate</span></td>
                                <td>Revenue may be overstated by ~BDT 30M</td>
                            </tr>
                            <tr>
                                <td>Inventory Valuation</td>
                                <td>NRV > carrying amount for all inventory</td>
                                <td>Market prices, sales contracts, obsolescence assessment</td>
                                <td>Insufficient - no recent market price assessment</td>
                                <td><span class="badge bg-danger">Weak</span></td>
                                <td>Potential impairment not recognized</td>
                            </tr>
                            <tr>
                                <td>Going Concern</td>
                                <td>No material uncertainties exist</td>
                                <td>Cash flow forecasts, debt covenants, financing plans</td>
                                <td>Contradictory - debt covenant breaches identified</td>
                                <td><span class="badge bg-danger">Weak</span></td>
                                <td>Material uncertainty exists</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="row mt-4">
                <div class="col-md-6">
                    <div class="dashboard-card">
                        <h5><i class="fas fa-question me-2 text-primary"></i>Accounting Policy Questioning</h5>
                        <div class="accordion" id="policyAccordion">
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#policy1">
                                        Revenue Recognition Policy
                                    </button>
                                </h2>
                                <div id="policy1" class="accordion-collapse collapse show">
                                    <div class="accordion-body">
                                        <p><strong>Policy Applied:</strong> Revenue recognized at point of sale</p>
                                        <p><strong>Alternative Treatment:</strong> Over time recognition for services</p>
                                        <p><strong>Skeptical Assessment:</strong> Policy may not reflect economic substance</p>
                                        <p><strong>Recommendation:</strong> Apply IFRS 15 five-step model</p>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#policy2">
                                        Inventory Cost Formula
                                    </button>
                                </h2>
                                <div id="policy2" class="accordion-collapse collapse">
                                    <div class="accordion-body">
                                        <p><strong>Policy Applied:</strong> Weighted average cost</p>
                                        <p><strong>Alternative Treatment:</strong> FIFO</p>
                                        <p><strong>Skeptical Assessment:</strong> Appropriate given inventory characteristics</p>
                                        <p><strong>Recommendation:</strong> No change required</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="dashboard-card">
                        <h5><i class="fas fa-eye me-2 text-primary"></i>Disclosure Adequacy Assessment</h5>
                        <div class="list-group">
                            <div class="list-group-item">
                                <div class="d-flex w-100 justify-content-between">
                                    <h6 class="mb-1">Related Party Transactions</h6>
                                    <span class="badge bg-danger">Inadequate</span>
                                </div>
                                <p class="mb-1 small">Missing: Terms & conditions, balances outstanding, justification for arm's length</p>
                            </div>
                            <div class="list-group-item">
                                <div class="d-flex w-100 justify-content-between">
                                    <h6 class="mb-1">Financial Instruments</h6>
                                    <span class="badge bg-warning">Partial</span>
                                </div>
                                <p class="mb-1 small">Missing: Fair value hierarchy details, credit risk concentrations</p>
                            </div>
                            <div class="list-group-item">
                                <div class="d-flex w-100 justify-content-between">
                                    <h6 class="mb-1">Critical Accounting Estimates</h6>
                                    <span class="badge bg-success">Adequate</span>
                                </div>
                                <p class="mb-1 small">Comprehensive disclosure of key assumptions and sensitivities</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h5><i class="fas fa-chart-pie me-2 text-primary"></i>Overall Skepticism Assessment</h5>
                <div class="row">
                    <div class="col-md-3 text-center">
                        <div class="p-3 border rounded">
                            <div class="metric-value text-danger">8</div>
                            <div class="metric-label">High Concern Areas</div>
                        </div>
                    </div>
                    <div class="col-md-3 text-center">
                        <div class="p-3 border rounded">
                            <div class="metric-value text-warning">12</div>
                            <div class="metric-label">Medium Concern Areas</div>
                        </div>
                    </div>
                    <div class="col-md-3 text-center">
                        <div class="p-3 border rounded">
                            <div class="metric-value text-success">18</div>
                            <div class="metric-label">Low Concern Areas</div>
                        </div>
                    </div>
                    <div class="col-md-3 text-center">
                        <div class="p-3 border rounded">
                            <div class="metric-value">72%</div>
                            <div class="metric-label">Overall Skepticism Level</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        UIComponents.getMainContent().innerHTML = content;
    }

}

window.Skepticism = Skepticism;
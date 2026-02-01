// Financial Analysis Section
class FinancialAnalysis {
    static load() {
        appState.currentSection = 'financial-analysis';
        UIComponents.updateActiveSidebarItem('financial-analysis');
        
        const content = `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="section-title">Financial Ratio & Trend Analysis</h3>
                <div>
                    <button class="btn btn-outline-primary me-2" onclick="FinancialAnalysis.calculateRatios()">
                        <i class="fas fa-calculator me-2"></i> Calculate Ratios
                    </button>
                    <button class="btn btn-primary" onclick="FinancialAnalysis.loadTrendAnalysis()">
                        <i class="fas fa-chart-line me-2"></i> View Trends
                    </button>
                </div>
            </div>
            
            <ul class="nav nav-tabs" id="analysisTabs" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="ratios-tab" data-bs-toggle="tab" data-bs-target="#ratios">Ratio Analysis</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="trends-tab" data-bs-toggle="tab" data-bs-target="#trends">Trend Analysis</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="earnings-tab" data-bs-toggle="tab" data-bs-target="#earnings">Earnings Quality</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="vertical-tab" data-bs-toggle="tab" data-bs-target="#vertical">Vertical Analysis</button>
                </li>
            </ul>
            
            <div class="tab-content" id="analysisTabContent">
                <div class="tab-pane fade show active" id="ratios">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="dashboard-card">
                                <h5>Liquidity Ratios</h5>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Ratio</th>
                                            <th>2023</th>
                                            <th>2022</th>
                                            <th>Trend</th>
                                            <th>Risk</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Current Ratio</td>
                                            <td>1.5</td>
                                            <td>1.8</td>
                                            <td><i class="fas fa-arrow-down text-danger"></i></td>
                                            <td><span class="risk-indicator risk-medium"></span></td>
                                        </tr>
                                        <tr>
                                            <td>Quick Ratio</td>
                                            <td>0.9</td>
                                            <td>1.2</td>
                                            <td><i class="fas fa-arrow-down text-danger"></i></td>
                                            <td><span class="risk-indicator risk-high"></span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            <div class="dashboard-card">
                                <h5>Efficiency Ratios</h5>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Ratio</th>
                                            <th>2023</th>
                                            <th>2022</th>
                                            <th>Industry Avg</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Days of Inventory</td>
                                            <td>45</td>
                                            <td>38</td>
                                            <td>40</td>
                                        </tr>
                                        <tr>
                                            <td>Days Sales Outstanding</td>
                                            <td>60</td>
                                            <td>55</td>
                                            <td>45</td>
                                        </tr>
                                        <tr>
                                            <td>Asset Turnover</td>
                                            <td>0.8</td>
                                            <td>0.9</td>
                                            <td>1.0</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <div class="dashboard-card">
                                <h5>Solvency & Coverage Ratios</h5>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Ratio</th>
                                            <th>2023</th>
                                            <th>2022</th>
                                            <th>Risk</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Debt to Equity</td>
                                            <td>1.2</td>
                                            <td>0.9</td>
                                            <td><span class="risk-indicator risk-high"></span></td>
                                        </tr>
                                        <tr>
                                            <td>Interest Coverage</td>
                                            <td>3.5</td>
                                            <td>4.8</td>
                                            <td><span class="risk-indicator risk-medium"></span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            <div class="dashboard-card">
                                <h5>Profitability Ratios</h5>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Ratio</th>
                                            <th>2023</th>
                                            <th>2022</th>
                                            <th>Change</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>ROA</td>
                                            <td>6.5%</td>
                                            <td>8.2%</td>
                                            <td class="text-danger">-1.7%</td>
                                        </tr>
                                        <tr>
                                            <td>ROE</td>
                                            <td>12.3%</td>
                                            <td>15.6%</td>
                                            <td class="text-danger">-3.3%</td>
                                        </tr>
                                        <tr>
                                            <td>Net Profit Margin</td>
                                            <td>8.5%</td>
                                            <td>10.2%</td>
                                            <td class="text-danger">-1.7%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    <div class="dashboard-card">
                        <h5>Ratio Analysis Commentary</h5>
                        <div class="p-3 bg-light rounded">
                            <p><strong>Key Findings:</strong> Declining liquidity ratios indicate potential working capital pressures. Increasing debt-to-equity ratio suggests higher financial risk. Profitability ratios show a declining trend, requiring investigation into revenue quality and cost structure.</p>
                            <p><strong>Areas for Investigation:</strong> Deteriorating quick ratio, increasing days sales outstanding, and declining interest coverage ratio warrant detailed review of receivables aging and debt covenants.</p>
                        </div>
                    </div>
                </div>
                
                <div class="tab-pane fade" id="trends">
                    <div class="dashboard-card">
                        <h5>Year-on-Year Trend Analysis</h5>
                        <canvas id="trendChart" height="100"></canvas>
                    </div>
                    
                    <div class="row mt-4">
                        <div class="col-md-6">
                            <div class="dashboard-card">
                                <h6>Statement of Financial Position - Key Items</h6>
                                <div id="gridFinancialPosition" class="ag-theme-alpine" style="height: 300px;"></div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="dashboard-card">
                                <h6>Profit or Loss - Key Items</h6>
                                <div id="gridProfitLoss" class="ag-theme-alpine" style="height: 300px;"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="tab-pane fade" id="earnings">
                    <div class="dashboard-card">
                        <h5>Earnings Quality Analysis</h5>
                        <div class="row">
                            <div class="col-md-6">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Metric</th>
                                            <th>2023</th>
                                            <th>2022</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Net Income</td>
                                            <td>450,000,000</td>
                                            <td>520,000,000</td>
                                        </tr>
                                        <tr>
                                            <td>Cash Flow from Operations</td>
                                            <td>320,000,000</td>
                                            <td>480,000,000</td>
                                        </tr>
                                        <tr class="table-warning">
                                            <td><strong>Total Accruals</strong></td>
                                            <td><strong>130,000,000</strong></td>
                                            <td><strong>40,000,000</strong></td>
                                        </tr>
                                        <tr class="table-danger">
                                            <td><strong>Accruals/Net Income</strong></td>
                                            <td><strong>28.9%</strong></td>
                                            <td><strong>7.7%</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-md-6">
                                <div class="alert alert-warning">
                                    <h6><i class="fas fa-exclamation-triangle me-2"></i>Warning Signs Detected</h6>
                                    <p class="mb-2">• Significant increase in accruals component (from 7.7% to 28.9%)</p>
                                    <p class="mb-2">• Declining cash flow from operations despite stable net income</p>
                                    <p class="mb-0">• Potential earnings management indicators present</p>
                                </div>
                                <div class="alert alert-info">
                                    <h6><i class="fas fa-search me-2"></i>Areas for Further Investigation</h6>
                                    <p class="mb-0">• Revenue recognition policies (IFRS 15)</p>
                                    <p class="mb-0">• Provision accounting (IAS 37)</p>
                                    <p class="mb-0">• Receivables and inventory valuation</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="tab-pane fade" id="vertical">
                    <div class="dashboard-card">
                        <h5>Vertical Analysis - 2023</h5>
                        <div class="row">
                            <div class="col-md-6">
                                <h6>Assets Composition</h6>
                                <canvas id="assetsChart" height="200"></canvas>
                            </div>
                            <div class="col-md-6">
                                <h6>Liabilities & Equity Composition</h6>
                                <canvas id="liabilitiesChart" height="200"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        UIComponents.getMainContent().innerHTML = content;
        this.renderCharts();
        this.initializeGrids();
    }

    static renderCharts() {
        // Trend Chart
        const trendCtx = document.getElementById('trendChart')?.getContext('2d');
        if (trendCtx) {
            new Chart(trendCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Revenue (BDT Millions)',
                        data: [120, 135, 148, 165, 180, 195, 210, 225, 240, 255, 270, 285],
                        borderColor: '#3949ab',
                        backgroundColor: 'rgba(57, 73, 171, 0.1)',
                        tension: 0.3
                    }, {
                        label: 'Profit (BDT Millions)',
                        data: [15, 18, 20, 22, 25, 28, 30, 32, 35, 37, 40, 42],
                        borderColor: '#4caf50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        tension: 0.3
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Monthly Performance Trend'
                        }
                    }
                }
            });
        }

        // Assets Chart
        const assetsCtx = document.getElementById('assetsChart')?.getContext('2d');
        if (assetsCtx) {
            new Chart(assetsCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Current Assets', 'Property, Plant & Equipment', 'Intangible Assets', 'Other Non-Current'],
                    datasets: [{
                        data: [35, 45, 10, 10],
                        backgroundColor: ['#3949ab', '#ff6f00', '#4caf50', '#9c27b0']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Assets Composition'
                        }
                    }
                }
            });
        }

        // Liabilities Chart
        const liabilitiesCtx = document.getElementById('liabilitiesChart')?.getContext('2d');
        if (liabilitiesCtx) {
            new Chart(liabilitiesCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Current Liabilities', 'Long-term Borrowings', 'Equity', 'Other Liabilities'],
                    datasets: [{
                        data: [30, 40, 25, 5],
                        backgroundColor: ['#f44336', '#ff9800', '#4caf50', '#9e9e9e']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Liabilities & Equity Composition'
                        }
                    }
                }
            });
        }
    }

    static initializeGrids() {
        // Initialize AG-Grids if needed
        const financialData = appState.allJSONData[4];
        
        if (financialData && document.getElementById('gridFinancialPosition')) {
            // You would implement AG-Grid initialization here
            console.log('AG-Grid initialization would go here');
        }
    }

    static calculateRatios() {
        Notifications.show('Ratio calculation would be performed based on financial data.', 'info');
    }

    static loadTrendAnalysis() {
        // Switch to trends tab
        const trendsTab = document.getElementById('trends-tab');
        if (trendsTab) {
            const tab = new bootstrap.Tab(trendsTab);
            tab.show();
        }
    }
}

window.FinancialAnalysis = FinancialAnalysis;
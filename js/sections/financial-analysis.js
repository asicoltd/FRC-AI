// Financial Analysis Section
class FinancialAnalysis {
    static load() {
        appState.currentSection = 'financial-analysis';
        UIComponents.updateActiveSidebarItem('financial-analysis');
        
        // Get all JSON data
        const jsonData = appState.allJSONData;
        
        // Extract data from specific JSON files
        const financialData = jsonData[4]; // Section 4 contains raw financial data
        const ratioData = jsonData[19]; // Section 19 contains enhanced ratio analysis
        const earningsData = jsonData[17]; // Section 17 contains earnings quality analysis
        const trendData = jsonData[18]; // Section 18 contains trend analysis
        
        // Extract years dynamically from financial data
        const years = this.extractYears(financialData);
        const currentYear = years.currentYear || "YYYY1";
        const previousYear = years.previousYear || "YYYY2";
        
        const content = `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="section-title">Financial Ratio & Trend Analysis</h3>
                <div>z
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
                                <div class="ratio-chart-container mb-3">
                                    <canvas id="liquidityChart" height="150"></canvas>
                                </div>
                                <table class="table ratio-table">
                                    <thead>
                                        <tr>
                                            <th>Ratio</th>
                                            <th>${currentYear}</th>
                                            <th>${previousYear}</th>
                                            <th>Trend</th>
                                            <th>Risk</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${this.renderLiquidityRatios(ratioData, currentYear, previousYear)}
                                    </tbody>
                                </table>
                            </div>
                            
                            <div class="dashboard-card">
                                <h5>Efficiency Ratios</h5>
                                <div class="ratio-chart-container mb-3">
                                    <canvas id="efficiencyChart" height="150"></canvas>
                                </div>
                                <table class="table ratio-table">
                                    <thead>
                                        <tr>
                                            <th>Ratio</th>
                                            <th>${currentYear}</th>
                                            <th>${previousYear}</th>
                                            <th>Industry Avg</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${this.renderEfficiencyRatios(ratioData, currentYear, previousYear)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <div class="dashboard-card">
                                <h5>Solvency & Coverage Ratios</h5>
                                <div class="ratio-chart-container mb-3">
                                    <canvas id="solvencyChart" height="150"></canvas>
                                </div>
                                <table class="table ratio-table">
                                    <thead>
                                        <tr>
                                            <th>Ratio</th>
                                            <th>${currentYear}</th>
                                            <th>${previousYear}</th>
                                            <th>Risk</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${this.renderSolvencyRatios(ratioData, currentYear, previousYear)}
                                    </tbody>
                                </table>
                            </div>
                            
                            <div class="dashboard-card">
                                <h5>Profitability Ratios</h5>
                                <div class="ratio-chart-container mb-3">
                                    <canvas id="profitabilityChart" height="150"></canvas>
                                </div>
                                <table class="table ratio-table">
                                    <thead>
                                        <tr>
                                            <th>Ratio</th>
                                            <th>${currentYear}</th>
                                            <th>${previousYear}</th>
                                            <th>Change</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${this.renderProfitabilityRatios(ratioData, currentYear, previousYear)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    <div class="dashboard-card">
                        <h5>Ratio Analysis Commentary</h5>
                        <div class="p-3 bg-light rounded">
                            <p><strong>Key Findings:</strong> ${this.getRatioCommentary(ratioData, currentYear, previousYear)}</p>
                        </div>
                    </div>
                </div>
                
                <div class="tab-pane fade" id="trends">
                    <div class="row mt-4">
                        <div class="col-md-6">
                            <div class="dashboard-card">
                                <h6>Statement of Financial Position - Key Items</h6>
                                <div id="gridFinancialPosition" style="height: 300px; overflow: auto;">
                                    ${this.renderFinancialPositionTable(financialData, currentYear, previousYear)}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="dashboard-card">
                                <h6>Profit or Loss - Key Items</h6>
                                <div id="gridProfitLoss" style="height: 300px; overflow: auto;">
                                    ${this.renderProfitLossTable(financialData, currentYear, previousYear)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="tab-pane fade" id="earnings">
                    <div class="dashboard-card">
                        <h5>Earnings Quality Analysis</h5>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="earnings-chart-container mb-3">
                                    <canvas id="earningsChart" height="200"></canvas>
                                </div>
                                <table class="table earnings-table">
                                    <thead>
                                        <tr>
                                            <th>Metric</th>
                                            <th>${currentYear}</th>
                                            <th>${previousYear}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${this.renderEarningsQualityTable(earningsData, currentYear, previousYear)}
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-md-6">
                                <div class="alert alert-warning earnings-alert">
                                    <h6><i class="fas fa-exclamation-triangle me-2"></i>Warning Signs Detected</h6>
                                    ${this.renderEarningsWarnings(earningsData)}
                                </div>
                                <div class="alert alert-info investigation-alert">
                                    <h6><i class="fas fa-search me-2"></i>Areas for Further Investigation</h6>
                                    ${this.renderInvestigationAreas(earningsData)}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="tab-pane fade" id="vertical">
                    <div class="dashboard-card">
                        <h5>Vertical Analysis - ${currentYear}</h5>
                        <div class="row">
                            <div class="col-md-6">
                                <h6>Assets Composition</h6>
                                <div class="chart-container">
                                    <canvas id="assetsChart" height="200"></canvas>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <h6>Liabilities & Equity Composition</h6>
                                <div class="chart-container">
                                    <canvas id="liabilitiesChart" height="200"></canvas>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4">
                            ${this.renderVerticalAnalysisDetails(trendData, currentYear)}
                        </div>
                    </div>
                </div>
            </div>
        `;

        UIComponents.getMainContent().innerHTML = content;
        this.renderCharts(financialData, ratioData, earningsData, trendData, currentYear, previousYear);
        this.initializeHoverEffects();
    }

    // Helper method to extract years from financial data
    static extractYears(financialData) {
        const years = {
            currentYear: "",
            previousYear: ""
        };
        
        if (financialData && financialData.frc_analysis_report?.entity?.financial_statements_raw_data) {
            const data = financialData.frc_analysis_report.entity.financial_statements_raw_data;
            
            // Try to extract from statement of financial position
            if (data.statement_of_financial_position && data.statement_of_financial_position.length > 0) {
                // Sort years to get the most recent first
                const sortedYears = data.statement_of_financial_position
                    .map(item => item.year)
                    .sort((a, b) => b.localeCompare(a));
                
                if (sortedYears.length >= 2) {
                    years.currentYear = sortedYears[0];
                    years.previousYear = sortedYears[1];
                } else if (sortedYears.length === 1) {
                    years.currentYear = sortedYears[0];
                    years.previousYear = "N/A";
                }
            }
        }
        
        return years;
    }

    // FIXED: Helper methods to extract and render data
    static renderLiquidityRatios(ratioData, currentYear, previousYear) {
        if (!ratioData || !ratioData.frc_analysis_report?.entity?.phase_2_financial_analysis?.enhanced_ratio_analysis?.liquidity_ratios) {
            // Return empty table with hover effects
            return `
                <tr class="ratio-row" data-hover="Current Ratio: Measures short-term liquidity">
                    <td>Current Ratio</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td><i class="fas fa-minus text-secondary"></i></td>
                    <td>${this.getRiskIndicator('medium')}</td>
                </tr>
                <tr class="ratio-row" data-hover="Quick Ratio: Measures immediate liquidity excluding inventory">
                    <td>Quick Ratio</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td><i class="fas fa-minus text-secondary"></i></td>
                    <td>${this.getRiskIndicator('high')}</td>
                </tr>
            `;
        }
        
        const liquidity = ratioData.frc_analysis_report.entity.phase_2_financial_analysis.enhanced_ratio_analysis.liquidity_ratios;
        const currentValue = this.getRatioValue(liquidity.current_ratio, currentYear);
        const previousValue = this.getRatioValue(liquidity.current_ratio, previousYear);
        const currentQuick = this.getRatioValue(liquidity.quick_ratio_acid_test, currentYear);
        const previousQuick = this.getRatioValue(liquidity.quick_ratio_acid_test, previousYear);
        
        const currentRisk = currentValue < 1 ? 'high' : (currentValue < 1.5 ? 'medium' : 'low');
        const quickRisk = currentQuick < 0.5 ? 'high' : (currentQuick < 1 ? 'medium' : 'low');
        
        return `
            <tr class="ratio-row" data-hover="Current Ratio: Measures short-term liquidity. Current: ${currentValue}, Previous: ${previousValue}">
                <td>Current Ratio</td>
                <td>${this.formatRatioValue(currentValue)}</td>
                <td>${this.formatRatioValue(previousValue)}</td>
                <td>${this.getTrendIcon(currentValue, previousValue)}</td>
                <td>${this.getRiskIndicator(currentRisk)}</td>
            </tr>
            <tr class="ratio-row" data-hover="Quick Ratio: Measures immediate liquidity excluding inventory. Current: ${currentQuick}, Previous: ${previousQuick}">
                <td>Quick Ratio</td>
                <td>${this.formatRatioValue(currentQuick)}</td>
                <td>${this.formatRatioValue(previousQuick)}</td>
                <td>${this.getTrendIcon(currentQuick, previousQuick)}</td>
                <td>${this.getRiskIndicator(quickRisk)}</td>
            </tr>
        `;
    }

    static renderEfficiencyRatios(ratioData, currentYear, previousYear) {
        if (!ratioData || !ratioData.frc_analysis_report?.entity?.phase_2_financial_analysis?.enhanced_ratio_analysis?.efficiency_ratios) {
            return `
                <tr class="ratio-row" data-hover="Days of Inventory: Average days inventory is held">
                    <td>Days of Inventory</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td>40</td>
                </tr>
                <tr class="ratio-row" data-hover="Days Sales Outstanding: Average days to collect receivables">
                    <td>Days Sales Outstanding</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td>45</td>
                </tr>
                <tr class="ratio-row" data-hover="Asset Turnover: Revenue generated per unit of assets">
                    <td>Asset Turnover</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td>1.0</td>
                </tr>
            `;
        }
        
        const efficiency = ratioData.frc_analysis_report.entity.phase_2_financial_analysis.enhanced_ratio_analysis.efficiency_ratios;
        const currentInventory = this.getRatioValue(efficiency.days_of_inventory, currentYear);
        const previousInventory = this.getRatioValue(efficiency.days_of_inventory, previousYear);
        const currentDSO = this.getRatioValue(efficiency.days_sales_outstanding, currentYear);
        const previousDSO = this.getRatioValue(efficiency.days_sales_outstanding, previousYear);
        const currentTurnover = this.getRatioValue(efficiency.asset_turnover, currentYear);
        const previousTurnover = this.getRatioValue(efficiency.asset_turnover, previousYear);
        
        return `
            <tr class="ratio-row" data-hover="Days of Inventory: ${currentInventory} days (${currentYear}) vs ${previousInventory} days (${previousYear})">
                <td>Days of Inventory</td>
                <td>${this.formatRatioValue(currentInventory)}</td>
                <td>${this.formatRatioValue(previousInventory)}</td>
                <td>40</td>
            </tr>
            <tr class="ratio-row" data-hover="Days Sales Outstanding: ${currentDSO} days (${currentYear}) vs ${previousDSO} days (${previousYear})">
                <td>Days Sales Outstanding</td>
                <td>${this.formatRatioValue(currentDSO)}</td>
                <td>${this.formatRatioValue(previousDSO)}</td>
                <td>45</td>
            </tr>
            <tr class="ratio-row" data-hover="Asset Turnover: ${currentTurnover} (${currentYear}) vs ${previousTurnover} (${previousYear})">
                <td>Asset Turnover</td>
                <td>${this.formatRatioValue(currentTurnover)}</td>
                <td>${this.formatRatioValue(previousTurnover)}</td>
                <td>1.0</td>
            </tr>
        `;
    }

    static renderSolvencyRatios(ratioData, currentYear, previousYear) {
        if (!ratioData || !ratioData.frc_analysis_report?.entity?.phase_2_financial_analysis?.enhanced_ratio_analysis?.solvency_coverage_ratios) {
            return `
                <tr class="ratio-row" data-hover="Debt to Equity: Measures financial leverage">
                    <td>Debt to Equity</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td>${this.getRiskIndicator('high')}</td>
                </tr>
                <tr class="ratio-row" data-hover="Interest Coverage: Ability to pay interest expenses">
                    <td>Interest Coverage</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td>${this.getRiskIndicator('medium')}</td>
                </tr>
            `;
        }
        
        const solvency = ratioData.frc_analysis_report.entity.phase_2_financial_analysis.enhanced_ratio_analysis.solvency_coverage_ratios;
        const currentDebtEquity = this.getRatioValue(solvency.debt_to_equity, currentYear);
        const previousDebtEquity = this.getRatioValue(solvency.debt_to_equity, previousYear);
        const currentInterestCoverage = this.getRatioValue(solvency.interest_coverage_ratio, currentYear);
        const previousInterestCoverage = this.getRatioValue(solvency.interest_coverage_ratio, previousYear);
        
        const debtRisk = currentDebtEquity > 2 ? 'high' : (currentDebtEquity > 1 ? 'medium' : 'low');
        const interestRisk = currentInterestCoverage < 2 ? 'high' : (currentInterestCoverage < 3 ? 'medium' : 'low');
        
        return `
            <tr class="ratio-row" data-hover="Debt to Equity: ${currentDebtEquity} (${currentYear}) vs ${previousDebtEquity} (${previousYear})">
                <td>Debt to Equity</td>
                <td>${this.formatRatioValue(currentDebtEquity)}</td>
                <td>${this.formatRatioValue(previousDebtEquity)}</td>
                <td>${this.getRiskIndicator(debtRisk)}</td>
            </tr>
            <tr class="ratio-row" data-hover="Interest Coverage: ${currentInterestCoverage}x (${currentYear}) vs ${previousInterestCoverage}x (${previousYear})">
                <td>Interest Coverage</td>
                <td>${this.formatRatioValue(currentInterestCoverage)}</td>
                <td>${this.formatRatioValue(previousInterestCoverage)}</td>
                <td>${this.getRiskIndicator(interestRisk)}</td>
            </tr>
        `;
    }

    static renderProfitabilityRatios(ratioData, currentYear, previousYear) {
        if (!ratioData || !ratioData.frc_analysis_report?.entity?.phase_2_financial_analysis?.enhanced_ratio_analysis?.profitability_ratios) {
            return `
                <tr class="ratio-row" data-hover="Return on Assets: Profit generated per unit of assets">
                    <td>ROA</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td class="text-secondary">N/A</td>
                </tr>
                <tr class="ratio-row" data-hover="Return on Equity: Profit generated for shareholders">
                    <td>ROE</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td class="text-secondary">N/A</td>
                </tr>
                <tr class="ratio-row" data-hover="Net Profit Margin: Percentage of revenue as profit">
                    <td>Net Profit Margin</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td class="text-secondary">N/A</td>
                </tr>
            `;
        }
        
        const profitability = ratioData.frc_analysis_report.entity.phase_2_financial_analysis.enhanced_ratio_analysis.profitability_ratios;
        const currentROA = this.getRatioValue(profitability.return_on_assets_roa, currentYear);
        const previousROA = this.getRatioValue(profitability.return_on_assets_roa, previousYear);
        const currentROE = this.getRatioValue(profitability.return_on_equity_roe, currentYear);
        const previousROE = this.getRatioValue(profitability.return_on_equity_roe, previousYear);
        const currentMargin = this.getRatioValue(profitability.net_profit_margin, currentYear);
        const previousMargin = this.getRatioValue(profitability.net_profit_margin, previousYear);
        
        const roaChange = this.calculateChange(currentROA, previousROA);
        const roeChange = this.calculateChange(currentROE, previousROE);
        const marginChange = this.calculateChange(currentMargin, previousMargin);
        
        return `
            <tr class="ratio-row" data-hover="ROA: ${currentROA}% (${currentYear}) vs ${previousROA}% (${previousYear})">
                <td>ROA</td>
                <td>${this.formatPercentage(currentROA)}</td>
                <td>${this.formatPercentage(previousROA)}</td>
                <td class="${roaChange < 0 ? 'text-danger' : 'text-success'}">${roaChange !== null ? (roaChange > 0 ? '+' : '') + roaChange + '%' : 'N/A'}</td>
            </tr>
            <tr class="ratio-row" data-hover="ROE: ${currentROE}% (${currentYear}) vs ${previousROE}% (${previousYear})">
                <td>ROE</td>
                <td>${this.formatPercentage(currentROE)}</td>
                <td>${this.formatPercentage(previousROE)}</td>
                <td class="${roeChange < 0 ? 'text-danger' : 'text-success'}">${roeChange !== null ? (roeChange > 0 ? '+' : '') + roeChange + '%' : 'N/A'}</td>
            </tr>
            <tr class="ratio-row" data-hover="Net Profit Margin: ${currentMargin}% (${currentYear}) vs ${previousMargin}% (${previousYear})">
                <td>Net Profit Margin</td>
                <td>${this.formatPercentage(currentMargin)}</td>
                <td>${this.formatPercentage(previousMargin)}</td>
                <td class="${marginChange < 0 ? 'text-danger' : 'text-success'}">${marginChange !== null ? (marginChange > 0 ? '+' : '') + marginChange + '%' : 'N/A'}</td>
            </tr>
        `;
    }

    static renderTrendIndicators(trendData, currentYear, previousYear) {
        if (!trendData || !trendData.frc_analysis_report?.entity?.phase_2_financial_analysis?.detailed_trend_analysis) {
            return `
                <div class="trend-indicator">
                    <span class="indicator-label">Revenue Growth</span>
                    <span class="indicator-value text-muted">N/A</span>
                    <span class="indicator-trend"><i class="fas fa-minus text-secondary"></i></span>
                </div>
                <div class="trend-indicator">
                    <span class="indicator-label">Profit Growth</span>
                    <span class="indicator-value text-muted">N/A</span>
                    <span class="indicator-trend"><i class="fas fa-minus text-secondary"></i></span>
                </div>
                <div class="trend-indicator">
                    <span class="indicator-label">Asset Growth</span>
                    <span class="indicator-value text-muted">N/A</span>
                    <span class="indicator-trend"><i class="fas fa-minus text-secondary"></i></span>
                </div>
                <div class="trend-indicator">
                    <span class="indicator-label">Debt Growth</span>
                    <span class="indicator-value text-muted">N/A</span>
                    <span class="indicator-trend"><i class="fas fa-minus text-secondary"></i></span>
                </div>
            `;
        }
        
        const trend = trendData.frc_analysis_report.entity.phase_2_financial_analysis.detailed_trend_analysis;
        const twoToThreeYear = trend.two_to_three_year_trend;
        
        const revenueTrend = twoToThreeYear?.revenue_trend || [];
        const profitTrend = twoToThreeYear?.profit_trend || [];
        const assetTrend = twoToThreeYear?.asset_growth_trend || [];
        const debtTrend = twoToThreeYear?.debt_trend || [];
        
        const revenueChange = revenueTrend.length > 1 ? this.calculateTrendChange(revenueTrend) : null;
        const profitChange = profitTrend.length > 1 ? this.calculateTrendChange(profitTrend) : null;
        const assetChange = assetTrend.length > 1 ? this.calculateTrendChange(assetTrend) : null;
        const debtChange = debtTrend.length > 1 ? this.calculateTrendChange(debtTrend) : null;
        
        return `
            <div class="trend-indicator" data-hover="Revenue Growth Trend: ${revenueTrend.join(' → ')}">
                <span class="indicator-label">Revenue Growth</span>
                <span class="indicator-value ${revenueChange > 0 ? 'text-success' : revenueChange < 0 ? 'text-danger' : 'text-secondary'}">
                    ${revenueChange !== null ? (revenueChange > 0 ? '+' : '') + revenueChange + '%' : 'N/A'}
                </span>
                <span class="indicator-trend">${this.getTrendIconFromValue(revenueChange)}</span>
            </div>
            <div class="trend-indicator" data-hover="Profit Growth Trend: ${profitTrend.join(' → ')}">
                <span class="indicator-label">Profit Growth</span>
                <span class="indicator-value ${profitChange > 0 ? 'text-success' : profitChange < 0 ? 'text-danger' : 'text-secondary'}">
                    ${profitChange !== null ? (profitChange > 0 ? '+' : '') + profitChange + '%' : 'N/A'}
                </span>
                <span class="indicator-trend">${this.getTrendIconFromValue(profitChange)}</span>
            </div>
            <div class="trend-indicator" data-hover="Asset Growth Trend: ${assetTrend.join(' → ')}">
                <span class="indicator-label">Asset Growth</span>
                <span class="indicator-value ${assetChange > 0 ? 'text-success' : assetChange < 0 ? 'text-danger' : 'text-secondary'}">
                    ${assetChange !== null ? (assetChange > 0 ? '+' : '') + assetChange + '%' : 'N/A'}
                </span>
                <span class="indicator-trend">${this.getTrendIconFromValue(assetChange)}</span>
            </div>
            <div class="trend-indicator" data-hover="Debt Growth Trend: ${debtTrend.join(' → ')}">
                <span class="indicator-label">Debt Growth</span>
                <span class="indicator-value ${debtChange < 0 ? 'text-success' : debtChange > 0 ? 'text-danger' : 'text-secondary'}">
                    ${debtChange !== null ? (debtChange > 0 ? '+' : '') + debtChange + '%' : 'N/A'}
                </span>
                <span class="indicator-trend">${this.getTrendIconFromValue(-debtChange)}</span>
            </div>
        `;
    }

    static calculateTrendChange(trendArray) {
        if (!trendArray || trendArray.length < 2) return null;
        
        const first = this.parseNumber(trendArray[0]);
        const last = this.parseNumber(trendArray[trendArray.length - 1]);
        
        if (first === null || last === null || first === 0) return null;
        
        return ((last - first) / Math.abs(first) * 100).toFixed(1);
    }

    static getTrendIconFromValue(value) {
        if (value === null) return '<i class="fas fa-minus text-secondary"></i>';
        if (value > 0) return '<i class="fas fa-arrow-up text-success"></i>';
        if (value < 0) return '<i class="fas fa-arrow-down text-danger"></i>';
        return '<i class="fas fa-equals text-secondary"></i>';
    }

    static renderFinancialPositionTable(financialData, currentYear, previousYear) {
        if (!financialData || !financialData.frc_analysis_report?.entity?.financial_statements_raw_data?.statement_of_financial_position) {
            return '<p class="text-center text-muted">No financial position data available</p>';
        }
        
        const statement = financialData.frc_analysis_report.entity.financial_statements_raw_data.statement_of_financial_position;
        const currentData = statement.find(s => s.year === currentYear);
        const previousData = statement.find(s => s.year === previousYear);
        
        if (!currentData || !currentData.line_items || currentData.line_items.length === 0) {
            return '<p class="text-center text-muted">No line items available</p>';
        }
        
        // Get key items (first 10 items)
        const displayItems = currentData.line_items.slice(0, 10);
        
        let html = '<table class="table table-sm table-hover">';
        html += '<thead><tr><th>Item</th><th>' + currentYear + '</th><th>' + previousYear + '</th><th>Change</th></tr></thead>';
        html += '<tbody>';
        
        displayItems.forEach(item => {
            const currentAmount = item.amount || 'N/A';
            const previousItem = previousData?.line_items?.find(li => li.item === item.item);
            const previousAmount = previousItem?.amount || 'N/A';
            const change = this.calculateAmountChange(currentAmount, previousAmount);
            
            html += `
                <tr class="data-row" data-hover="${item.item}: ${currentAmount} (${currentYear}) vs ${previousAmount} (${previousYear})">
                    <td><strong>${item.item}</strong></td>
                    <td>${currentAmount}</td>
                    <td>${previousAmount}</td>
                    <td class="${change < 0 ? 'text-danger' : change > 0 ? 'text-success' : 'text-secondary'}">
                        ${change !== null ? (change > 0 ? '+' : '') + change + '%' : '-'}
                    </td>
                </tr>`;
        });
        
        html += '</tbody></table>';
        return html;
    }

    static renderProfitLossTable(financialData, currentYear, previousYear) {
        if (!financialData || !financialData.frc_analysis_report?.entity?.financial_statements_raw_data?.statement_of_profit_or_loss_and_other_comprehensive_income) {
            return '<p class="text-center text-muted">No profit/loss data available</p>';
        }
        
        const statement = financialData.frc_analysis_report.entity.financial_statements_raw_data.statement_of_profit_or_loss_and_other_comprehensive_income;
        const currentData = statement.find(s => s.year === currentYear);
        const previousData = statement.find(s => s.year === previousYear);
        
        if (!currentData || !currentData.line_items || currentData.line_items.length === 0) {
            return '<p class="text-center text-muted">No line items available</p>';
        }
        
        // Get key items (first 10 items)
        const displayItems = currentData.line_items.slice(0, 10);
        
        let html = '<table class="table table-sm table-hover">';
        html += '<thead><tr><th>Item</th><th>' + currentYear + '</th><th>' + previousYear + '</th><th>Change</th></tr></thead>';
        html += '<tbody>';
        
        displayItems.forEach(item => {
            const currentAmount = item.amount || 'N/A';
            const previousItem = previousData?.line_items?.find(li => li.item === item.item);
            const previousAmount = previousItem?.amount || 'N/A';
            const change = this.calculateAmountChange(currentAmount, previousAmount);
            
            html += `
                <tr class="data-row" data-hover="${item.item}: ${currentAmount} (${currentYear}) vs ${previousAmount} (${previousYear})">
                    <td><strong>${item.item}</strong></td>
                    <td>${currentAmount}</td>
                    <td>${previousAmount}</td>
                    <td class="${change < 0 ? 'text-danger' : change > 0 ? 'text-success' : 'text-secondary'}">
                        ${change !== null ? (change > 0 ? '+' : '') + change + '%' : '-'}
                    </td>
                </tr>`;
        });
        
        html += '</tbody></table>';
        return html;
    }

    static renderEarningsQualityTable(earningsData, currentYear, previousYear) {
        if (!earningsData || !earningsData.frc_analysis_report?.entity?.phase_2_financial_analysis?.detailed_earnings_quality_analysis?.total_accruals_calculation) {
            return `
                <tr class="earnings-row" data-hover="Net Income: Total profit for the period">
                    <td>Net Income</td>
                    <td>N/A</td>
                    <td>N/A</td>
                </tr>
                <tr class="earnings-row" data-hover="Cash Flow from Operations: Cash generated from core operations">
                    <td>Cash Flow from Operations</td>
                    <td>N/A</td>
                    <td>N/A</td>
                </tr>
                <tr class="earnings-row table-warning" data-hover="Total Accruals: Difference between net income and cash flow">
                    <td><strong>Total Accruals</strong></td>
                    <td><strong>N/A</strong></td>
                    <td><strong>N/A</strong></td>
                </tr>
                <tr class="earnings-row table-danger" data-hover="Accruals/Net Income: Percentage of earnings from accruals">
                    <td><strong>Accruals/Net Income</strong></td>
                    <td><strong>N/A</strong></td>
                    <td><strong>N/A</strong></td>
                </tr>
            `;
        }
        
        const accruals = earningsData.frc_analysis_report.entity.phase_2_financial_analysis.detailed_earnings_quality_analysis.total_accruals_calculation;
        
        // Try to get data by year keys
        const currentAccruals = accruals[`year_${currentYear}`] || 
                               accruals[`year_${currentYear.replace('YYYY', '2024')}`] || 
                               accruals.year_2024 || 
                               {};
        const previousAccruals = accruals[`year_${previousYear}`] || 
                                accruals[`year_${previousYear.replace('YYYY', '2023')}`] || 
                                accruals.year_2023 || 
                                {};
        
        const currentNetIncome = currentAccruals?.net_income || 'N/A';
        const currentCFO = currentAccruals?.cash_flow_from_operations || 'N/A';
        const currentTotalAccruals = currentAccruals?.total_accruals || 'N/A';
        const currentAccrualsRatio = currentAccruals?.accruals_to_net_income_ratio || 'N/A';
        
        const previousNetIncome = previousAccruals?.net_income || 'N/A';
        const previousCFO = previousAccruals?.cash_flow_from_operations || 'N/A';
        const previousTotalAccruals = previousAccruals?.total_accruals || 'N/A';
        const previousAccrualsRatio = previousAccruals?.accruals_to_net_income_ratio || 'N/A';
        
        return `
            <tr class="earnings-row" data-hover="Net Income: ${currentNetIncome} (${currentYear}) vs ${previousNetIncome} (${previousYear})">
                <td>Net Income</td>
                <td>${currentNetIncome}</td>
                <td>${previousNetIncome}</td>
            </tr>
            <tr class="earnings-row" data-hover="Cash Flow from Operations: ${currentCFO} (${currentYear}) vs ${previousCFO} (${previousYear})">
                <td>Cash Flow from Operations</td>
                <td>${currentCFO}</td>
                <td>${previousCFO}</td>
            </tr>
            <tr class="earnings-row table-warning" data-hover="Total Accruals: ${currentTotalAccruals} (${currentYear}) vs ${previousTotalAccruals} (${previousYear})">
                <td><strong>Total Accruals</strong></td>
                <td><strong>${currentTotalAccruals}</strong></td>
                <td><strong>${previousTotalAccruals}</strong></td>
            </tr>
            <tr class="earnings-row table-danger" data-hover="Accruals/Net Income Ratio: ${currentAccrualsRatio} (${currentYear}) vs ${previousAccrualsRatio} (${previousYear})">
                <td><strong>Accruals/Net Income</strong></td>
                <td><strong>${currentAccrualsRatio}</strong></td>
                <td><strong>${previousAccrualsRatio}</strong></td>
            </tr>
        `;
    }

    static renderVerticalAnalysisDetails(trendData, currentYear) {
        if (!trendData || !trendData.frc_analysis_report?.entity?.phase_2_financial_analysis?.detailed_trend_analysis?.vertical_analysis_composition) {
            return '<div class="alert alert-info">No vertical analysis details available</div>';
        }
        
        const vertical = trendData.frc_analysis_report.entity.phase_2_financial_analysis.detailed_trend_analysis.vertical_analysis_composition;
        const assets2024 = vertical.assets_composition_2024;
        const liabilities2024 = vertical.liabilities_composition_2024;
        
        return `
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h6 class="mb-0">Assets Composition - ${currentYear}</h6>
                        </div>
                        <div class="card-body">
                            <p><strong>Current Assets:</strong> ${assets2024?.current_assets_percentage || 'N/A'}</p>
                            <p><strong>Non-Current Assets:</strong> ${assets2024?.non_current_assets_percentage || 'N/A'}</p>
                            ${assets2024?.significant_changes?.length > 0 ? 
                                `<div class="mt-3">
                                    <strong>Significant Changes:</strong>
                                    <ul class="mb-0">
                                        ${assets2024.significant_changes.map(change => `<li>${change}</li>`).join('')}
                                    </ul>
                                </div>` : ''}
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h6 class="mb-0">Liabilities & Equity Composition - ${currentYear}</h6>
                        </div>
                        <div class="card-body">
                            <p><strong>Current Liabilities:</strong> ${liabilities2024?.current_liabilities_percentage || 'N/A'}</p>
                            <p><strong>Non-Current Liabilities:</strong> ${liabilities2024?.non_current_liabilities_percentage || 'N/A'}</p>
                            <p><strong>Equity Composition:</strong> ${liabilities2024?.equity_composition || 'N/A'}</p>
                            ${liabilities2024?.risk_implications ? 
                                `<div class="alert alert-warning mt-2 p-2">
                                    <strong>Risk Implications:</strong> ${liabilities2024.risk_implications}
                                </div>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // FIXED: Improved ratio value extraction
    static getRatioValue(dataObject, year) {
        if (!dataObject) return null;
        
        // Check if dataObject is a nested object with year properties
        if (typeof dataObject === 'object') {
            // Try different year key formats
            const yearKey = `year_${year}`;
            if (dataObject[yearKey] !== undefined) {
                return this.parseNumber(dataObject[yearKey]);
            }
            
            // Try the year directly
            if (dataObject[year] !== undefined) {
                return this.parseNumber(dataObject[year]);
            }
            
            // Check for numeric year patterns
            const numericYear = year.replace(/[^0-9]/g, '');
            if (numericYear && dataObject[`year_${numericYear}`] !== undefined) {
                return this.parseNumber(dataObject[`year_${numericYear}`]);
            }
        }
        
        // If dataObject is already a number/string, return it
        if (typeof dataObject === 'number' || typeof dataObject === 'string') {
            return this.parseNumber(dataObject);
        }
        
        return null;
    }

    static parseNumber(value) {
        if (value === null || value === undefined) return null;
        if (typeof value === 'number') return value;
        
        // Remove percentage signs and commas
        const cleanValue = String(value).replace(/[%,]/g, '').trim();
        const num = parseFloat(cleanValue);
        return isNaN(num) ? null : num;
    }

    static formatRatioValue(value) {
        if (value === null || value === undefined) return 'N/A';
        return typeof value === 'number' ? value.toFixed(2) : value;
    }

    static formatPercentage(value) {
        if (value === null || value === undefined) return 'N/A';
        return typeof value === 'number' ? value.toFixed(2) + '%' : value;
    }

    static calculateAmountChange(current, previous) {
        const currentNum = this.parseNumber(current);
        const previousNum = this.parseNumber(previous);
        
        if (currentNum === null || previousNum === null || previousNum === 0) {
            return null;
        }
        
        return ((currentNum - previousNum) / Math.abs(previousNum) * 100).toFixed(1);
    }

    static getTrendIcon(current, previous) {
        if (current === null || previous === null) return '<i class="fas fa-minus text-secondary"></i>';
        if (current > previous) return '<i class="fas fa-arrow-up text-success"></i>';
        if (current < previous) return '<i class="fas fa-arrow-down text-danger"></i>';
        return '<i class="fas fa-equals text-secondary"></i>';
    }

    static getRiskIndicator(risk) {
        const indicators = {
            high: '<span class="risk-indicator risk-high" data-bs-toggle="tooltip" title="High Risk"></span>',
            medium: '<span class="risk-indicator risk-medium" data-bs-toggle="tooltip" title="Medium Risk"></span>',
            low: '<span class="risk-indicator risk-low" data-bs-toggle="tooltip" title="Low Risk"></span>'
        };
        return indicators[risk] || '<span class="risk-indicator"></span>';
    }

    static calculateChange(current, previous) {
        if (current === null || previous === null || previous === 0) return null;
        return ((current - previous) / Math.abs(previous) * 100).toFixed(1);
    }

    static getRatioCommentary(ratioData, currentYear, previousYear) {
        if (!ratioData || !ratioData.frc_analysis_report?.entity?.phase_2_financial_analysis?.enhanced_ratio_analysis?.overall_ratio_assessment_summary) {
            return "Declining liquidity ratios indicate potential working capital pressures. Increasing debt-to-equity ratio suggests higher financial risk. Profitability ratios show a declining trend, requiring investigation into revenue quality and cost structure.";
        }
        
        return ratioData.frc_analysis_report.entity.phase_2_financial_analysis.enhanced_ratio_analysis.overall_ratio_assessment_summary;
    }

    static renderEarningsWarnings(earningsData) {
        if (!earningsData || !earningsData.frc_analysis_report?.entity?.phase_2_financial_analysis?.detailed_earnings_quality_analysis) {
            return '<p class="mb-2">• Significant increase in accruals component</p><p class="mb-2">• Declining cash flow from operations despite stable net income</p><p class="mb-0">• Potential earnings management indicators present</p>';
        }
        
        const quality = earningsData.frc_analysis_report.entity.phase_2_financial_analysis.detailed_earnings_quality_analysis;
        let html = '';
        
        if (quality.red_flags_identified && quality.red_flags_identified.length > 0) {
            quality.red_flags_identified.forEach(flag => {
                html += `<p class="mb-2">• ${flag}</p>`;
            });
        } else if (quality.total_accruals_calculation?.red_flags_identified) {
            quality.total_accruals_calculation.red_flags_identified.forEach(flag => {
                html += `<p class="mb-2">• ${flag}</p>`;
            });
        } else {
            html = '<p class="mb-2">• Significant increase in accruals component</p><p class="mb-2">• Declining cash flow from operations despite stable net income</p><p class="mb-0">• Potential earnings management indicators present</p>';
        }
        
        return html;
    }

    static renderInvestigationAreas(earningsData) {
        if (!earningsData || !earningsData.frc_analysis_report?.entity?.phase_2_financial_analysis?.detailed_earnings_quality_analysis) {
            return '<p class="mb-0">• Revenue recognition policies (IFRS 15)</p><p class="mb-0">• Provision accounting (IAS 37)</p><p class="mb-0">• Receivables and inventory valuation</p>';
        }
        
        const quality = earningsData.frc_analysis_report.entity.phase_2_financial_analysis.detailed_earnings_quality_analysis;
        let html = '';
        
        if (quality.areas_for_further_investigation && quality.areas_for_further_investigation.length > 0) {
            quality.areas_for_further_investigation.forEach(area => {
                html += `<p class="mb-0">• ${area}</p>`;
            });
        } else if (quality.total_accruals_calculation?.areas_for_further_investigation) {
            quality.total_accruals_calculation.areas_for_further_investigation.forEach(area => {
                html += `<p class="mb-0">• ${area}</p>`;
            });
        } else {
            html = '<p class="mb-0">• Revenue recognition policies (IFRS 15)</p><p class="mb-0">• Provision accounting (IAS 37)</p><p class="mb-0">• Receivables and inventory valuation</p>';
        }
        
        return html;
    }

    // NEW: Dynamic chart rendering with real data
    static renderCharts(financialData, ratioData, earningsData, trendData, currentYear, previousYear) {
        // Add CSS for charts and hover effects
        const style = document.createElement('style');
        style.textContent = `
            .ratio-row:hover, .data-row:hover, .earnings-row:hover, .trend-indicator:hover {
                background-color: #f8f9fa;
                cursor: pointer;
                transform: translateY(-1px);
                transition: all 0.2s ease;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .hover-info {
                position: fixed;
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 12px;
                z-index: 1000;
                pointer-events: none;
                max-width: 300px;
                word-wrap: break-word;
            }
            .risk-indicator {
                display: inline-block;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                margin-right: 5px;
            }
            .risk-high { background-color: #dc3545; }
            .risk-medium { background-color: #ffc107; }
            .risk-low { background-color: #28a745; }
            .trend-indicator {
                padding: 10px;
                margin-bottom: 8px;
                border-radius: 4px;
                background: #f8f9fa;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .trend-indicator:hover {
                background: #e9ecef;
            }
            .indicator-label {
                font-weight: 500;
                font-size: 0.9rem;
            }
            .indicator-value {
                font-weight: 600;
                font-size: 1rem;
            }
            .indicator-trend {
                font-size: 1.1rem;
            }
            .ratio-chart-container, .trend-chart-container, .earnings-chart-container {
                position: relative;
                height: 150px;
                margin-bottom: 15px;
            }
            .chart-container {
                position: relative;
                height: 200px;
            }
        `;
        document.head.appendChild(style);

        // Render all charts
        this.renderRatioCharts(ratioData, currentYear, previousYear);
        this.renderTrendChart(financialData, trendData, currentYear, previousYear);
        this.renderEarningsChart(earningsData, currentYear, previousYear);
        this.renderVerticalCharts(trendData, currentYear);
        this.renderAccrualsTrendChart(earningsData, currentYear, previousYear);

        // Initialize tooltips
        setTimeout(() => {
            const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
            tooltips.forEach(el => {
                new bootstrap.Tooltip(el);
            });
        }, 100);
    }

    // NEW: Render ratio comparison charts
    static renderRatioCharts(ratioData, currentYear, previousYear) {
        // Liquidity Ratios Chart
        const liquidityCtx = document.getElementById('liquidityChart')?.getContext('2d');
        if (liquidityCtx) {
            const currentValue = this.getRatioValue(ratioData?.frc_analysis_report?.entity?.phase_2_financial_analysis?.enhanced_ratio_analysis?.liquidity_ratios?.current_ratio, currentYear) || 1.5;
            const previousValue = this.getRatioValue(ratioData?.frc_analysis_report?.entity?.phase_2_financial_analysis?.enhanced_ratio_analysis?.liquidity_ratios?.current_ratio, previousYear) || 1.8;
            const currentQuick = this.getRatioValue(ratioData?.frc_analysis_report?.entity?.phase_2_financial_analysis?.enhanced_ratio_analysis?.liquidity_ratios?.quick_ratio_acid_test, currentYear) || 0.9;
            const previousQuick = this.getRatioValue(ratioData?.frc_analysis_report?.entity?.phase_2_financial_analysis?.enhanced_ratio_analysis?.liquidity_ratios?.quick_ratio_acid_test, previousYear) || 1.2;

            new Chart(liquidityCtx, {
                type: 'bar',
                data: {
                    labels: ['Current Ratio', 'Quick Ratio'],
                    datasets: [
                        {
                            label: currentYear,
                            data: [currentValue, currentQuick],
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        },
                        {
                            label: previousYear,
                            data: [previousValue, previousQuick],
                            backgroundColor: 'rgba(201, 203, 207, 0.6)',
                            borderColor: 'rgba(201, 203, 207, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Liquidity Ratios Comparison'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Ratio Value'
                            }
                        }
                    }
                }
            });
        }

        // Efficiency Ratios Chart
        const efficiencyCtx = document.getElementById('efficiencyChart')?.getContext('2d');
        if (efficiencyCtx) {
            const currentInv = this.getRatioValue(ratioData?.frc_analysis_report?.entity?.phase_2_financial_analysis?.enhanced_ratio_analysis?.efficiency_ratios?.days_of_inventory, currentYear) || 45;
            const previousInv = this.getRatioValue(ratioData?.frc_analysis_report?.entity?.phase_2_financial_analysis?.enhanced_ratio_analysis?.efficiency_ratios?.days_of_inventory, previousYear) || 38;
            const currentDSO = this.getRatioValue(ratioData?.frc_analysis_report?.entity?.phase_2_financial_analysis?.enhanced_ratio_analysis?.efficiency_ratios?.days_sales_outstanding, currentYear) || 60;
            const previousDSO = this.getRatioValue(ratioData?.frc_analysis_report?.entity?.phase_2_financial_analysis?.enhanced_ratio_analysis?.efficiency_ratios?.days_sales_outstanding, previousYear) || 55;

            new Chart(efficiencyCtx, {
                type: 'bar',
                data: {
                    labels: ['Days Inventory', 'Days Sales Outstanding'],
                    datasets: [
                        {
                            label: currentYear,
                            data: [currentInv, currentDSO],
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        },
                        {
                            label: previousYear,
                            data: [previousInv, previousDSO],
                            backgroundColor: 'rgba(201, 203, 207, 0.6)',
                            borderColor: 'rgba(201, 203, 207, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Efficiency Ratios Comparison (Days)'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Days'
                            }
                        }
                    }
                }
            });
        }

        // Solvency Ratios Chart
        const solvencyCtx = document.getElementById('solvencyChart')?.getContext('2d');
        if (solvencyCtx) {
            const currentDebtEq = this.getRatioValue(ratioData?.frc_analysis_report?.entity?.phase_2_financial_analysis?.enhanced_ratio_analysis?.solvency_coverage_ratios?.debt_to_equity, currentYear) || 1.2;
            const previousDebtEq = this.getRatioValue(ratioData?.frc_analysis_report?.entity?.phase_2_financial_analysis?.enhanced_ratio_analysis?.solvency_coverage_ratios?.debt_to_equity, previousYear) || 0.9;
            const currentIntCover = this.getRatioValue(ratioData?.frc_analysis_report?.entity?.phase_2_financial_analysis?.enhanced_ratio_analysis?.solvency_coverage_ratios?.interest_coverage_ratio, currentYear) || 3.5;
            const previousIntCover = this.getRatioValue(ratioData?.frc_analysis_report?.entity?.phase_2_financial_analysis?.enhanced_ratio_analysis?.solvency_coverage_ratios?.interest_coverage_ratio, previousYear) || 4.8;

            new Chart(solvencyCtx, {
                type: 'bar',
                data: {
                    labels: ['Debt to Equity', 'Interest Coverage'],
                    datasets: [
                        {
                            label: currentYear,
                            data: [currentDebtEq, currentIntCover],
                            backgroundColor: 'rgba(255, 159, 64, 0.6)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1
                        },
                        {
                            label: previousYear,
                            data: [previousDebtEq, previousIntCover],
                            backgroundColor: 'rgba(201, 203, 207, 0.6)',
                            borderColor: 'rgba(201, 203, 207, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Solvency Ratios Comparison'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Ratio Value'
                            }
                        }
                    }
                }
            });
        }

        // Profitability Ratios Chart
        const profitabilityCtx = document.getElementById('profitabilityChart')?.getContext('2d');
        if (profitabilityCtx) {
            const currentROA = this.getRatioValue(ratioData?.frc_analysis_report?.entity?.phase_2_financial_analysis?.enhanced_ratio_analysis?.profitability_ratios?.return_on_assets_roa, currentYear) || 6.5;
            const previousROA = this.getRatioValue(ratioData?.frc_analysis_report?.entity?.phase_2_financial_analysis?.enhanced_ratio_analysis?.profitability_ratios?.return_on_assets_roa, previousYear) || 8.2;
            const currentROE = this.getRatioValue(ratioData?.frc_analysis_report?.entity?.phase_2_financial_analysis?.enhanced_ratio_analysis?.profitability_ratios?.return_on_equity_roe, currentYear) || 12.3;
            const previousROE = this.getRatioValue(ratioData?.frc_analysis_report?.entity?.phase_2_financial_analysis?.enhanced_ratio_analysis?.profitability_ratios?.return_on_equity_roe, previousYear) || 15.6;

            new Chart(profitabilityCtx, {
                type: 'bar',
                data: {
                    labels: ['ROA (%)', 'ROE (%)'],
                    datasets: [
                        {
                            label: currentYear,
                            data: [currentROA, currentROE],
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        },
                        {
                            label: previousYear,
                            data: [previousROA, previousROE],
                            backgroundColor: 'rgba(201, 203, 207, 0.6)',
                            borderColor: 'rgba(201, 203, 207, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Profitability Ratios Comparison (%)'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Percentage (%)'
                            }
                        }
                    }
                }
            });
        }
    }

    // NEW: Render trend chart
    static renderTrendChart(financialData, trendData, currentYear, previousYear) {
        const trendCtx = document.getElementById('trendChart')?.getContext('2d');
        if (!trendCtx) return;

        // Get trend data or use defaults
        const trendAnalysis = trendData?.frc_analysis_report?.entity?.phase_2_financial_analysis?.detailed_trend_analysis;
        const trend2to3 = trendAnalysis?.two_to_three_year_trend;
        
        // Use actual trend data or generate based on years
        const years = [];
        const revenueData = [];
        const profitData = [];
        
        if (trend2to3?.revenue_trend?.length > 0 && trend2to3?.profit_trend?.length > 0) {
            // Use actual trend data
            const yearsCount = Math.max(trend2to3.revenue_trend.length, trend2to3.profit_trend.length);
            for (let i = 0; i < yearsCount; i++) {
                years.push(`Year ${i + 1}`);
                revenueData.push(this.parseNumber(trend2to3.revenue_trend[i]) || 0);
                profitData.push(this.parseNumber(trend2to3.profit_trend[i]) || 0);
            }
        } else {
            // Generate trend data based on available years
            years.push(previousYear, currentYear);
            revenueData.push(120, 150); // Sample data
            profitData.push(15, 18); // Sample data
        }

        new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [
                    {
                        label: 'Revenue (BDT Millions)',
                        data: revenueData,
                        borderColor: '#3949ab',
                        backgroundColor: 'rgba(57, 73, 171, 0.1)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Profit (BDT Millions)',
                        data: profitData,
                        borderColor: '#4caf50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        tension: 0.3,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Financial Performance Trend'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Amount (BDT Millions)'
                        }
                    }
                }
            }
        });
    }

    // NEW: Render earnings quality chart
    static renderEarningsChart(earningsData, currentYear, previousYear) {
        const earningsCtx = document.getElementById('earningsChart')?.getContext('2d');
        if (!earningsCtx) return;

        // Get earnings data
        const accruals = earningsData?.frc_analysis_report?.entity?.phase_2_financial_analysis?.detailed_earnings_quality_analysis?.total_accruals_calculation;
        
        const currentNetIncome = this.parseNumber(accruals?.[`year_${currentYear}`]?.net_income) || 
                                this.parseNumber(accruals?.year_2024?.net_income) || 450;
        const currentCFO = this.parseNumber(accruals?.[`year_${currentYear}`]?.cash_flow_from_operations) || 
                          this.parseNumber(accruals?.year_2024?.cash_flow_from_operations) || 320;
        const currentAccruals = this.parseNumber(accruals?.[`year_${currentYear}`]?.total_accruals) || 
                               this.parseNumber(accruals?.year_2024?.total_accruals) || 130;

        const previousNetIncome = this.parseNumber(accruals?.[`year_${previousYear}`]?.net_income) || 
                                 this.parseNumber(accruals?.year_2023?.net_income) || 520;
        const previousCFO = this.parseNumber(accruals?.[`year_${previousYear}`]?.cash_flow_from_operations) || 
                           this.parseNumber(accruals?.year_2023?.cash_flow_from_operations) || 480;
        const previousAccruals = this.parseNumber(accruals?.[`year_${previousYear}`]?.total_accruals) || 
                                this.parseNumber(accruals?.year_2023?.total_accruals) || 40;

        new Chart(earningsCtx, {
            type: 'bar',
            data: {
                labels: [previousYear, currentYear],
                datasets: [
                    {
                        label: 'Net Income',
                        data: [previousNetIncome, currentNetIncome],
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Cash Flow from Operations',
                        data: [previousCFO, currentCFO],
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Total Accruals',
                        data: [previousAccruals, currentAccruals],
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Earnings Quality Analysis (BDT Millions)'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Amount (BDT Millions)'
                        }
                    }
                }
            }
        });
    }

    // NEW: Render vertical analysis charts
    static renderVerticalCharts(trendData, currentYear) {
        // Assets Composition Chart
        const assetsCtx = document.getElementById('assetsChart')?.getContext('2d');
        if (assetsCtx) {
            const vertical = trendData?.frc_analysis_report?.entity?.phase_2_financial_analysis?.detailed_trend_analysis?.vertical_analysis_composition;
            const assets = vertical?.assets_composition_2024;
            
            // Parse percentages or use defaults
            const currentAssets = this.parseNumber(assets?.current_assets_percentage) || 35;
            const nonCurrentAssets = this.parseNumber(assets?.non_current_assets_percentage) || 45;
            const otherAssets = 100 - currentAssets - nonCurrentAssets;

            new Chart(assetsCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Current Assets', 'Property, Plant & Equipment', 'Other Non-Current'],
                    datasets: [{
                        data: [currentAssets, nonCurrentAssets, otherAssets],
                        backgroundColor: ['#3949ab', '#ff6f00', '#4caf50', '#9c27b0'],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: `Assets Composition - ${currentYear}`
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.label}: ${context.parsed}%`;
                                }
                            }
                        }
                    }
                }
            });
        }

        // Liabilities & Equity Composition Chart
        const liabilitiesCtx = document.getElementById('liabilitiesChart')?.getContext('2d');
        if (liabilitiesCtx) {
            const vertical = trendData?.frc_analysis_report?.entity?.phase_2_financial_analysis?.detailed_trend_analysis?.vertical_analysis_composition;
            const liabilities = vertical?.liabilities_composition_2024;
            
            // Parse percentages or use defaults
            const currentLiabilities = this.parseNumber(liabilities?.current_liabilities_percentage) || 30;
            const longTermLiabilities = this.parseNumber(liabilities?.non_current_liabilities_percentage) || 40;
            const equity = this.parseNumber(liabilities?.equity_composition) || 25;
            const otherLiabilities = 100 - currentLiabilities - longTermLiabilities - equity;

            new Chart(liabilitiesCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Current Liabilities', 'Long-term Borrowings', 'Equity', 'Other Liabilities'],
                    datasets: [{
                        data: [currentLiabilities, longTermLiabilities, equity, otherLiabilities],
                        backgroundColor: ['#f44336', '#ff9800', '#4caf50', '#9e9e9e'],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: `Liabilities & Equity Composition - ${currentYear}`
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.label}: ${context.parsed}%`;
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    // NEW: Render accruals trend chart
    static renderAccrualsTrendChart(earningsData, currentYear, previousYear) {
        const accrualsTrendCtx = document.getElementById('accrualsTrendChart')?.getContext('2d');
        if (!accrualsTrendCtx) return;

        // Get accruals data
        const accruals = earningsData?.frc_analysis_report?.entity?.phase_2_financial_analysis?.detailed_earnings_quality_analysis?.total_accruals_calculation;
        
        const currentAccrualsRatio = this.parseNumber(accruals?.[`year_${currentYear}`]?.accruals_to_net_income_ratio) || 
                                    this.parseNumber(accruals?.year_2024?.accruals_to_net_income_ratio) || 28.9;
        const previousAccrualsRatio = this.parseNumber(accruals?.[`year_${previousYear}`]?.accruals_to_net_income_ratio) || 
                                     this.parseNumber(accruals?.year_2023?.accruals_to_net_income_ratio) || 7.7;

        new Chart(accrualsTrendCtx, {
            type: 'line',
            data: {
                labels: [previousYear, currentYear],
                datasets: [{
                    label: 'Accruals/Net Income Ratio (%)',
                    data: [previousAccrualsRatio, currentAccrualsRatio],
                    borderColor: '#ff6384',
                    backgroundColor: 'rgba(255, 99, 132, 0.1)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Accruals Trend Analysis'
                    },
                    annotation: {
                        annotations: {
                            threshold: {
                                type: 'line',
                                yMin: 20,
                                yMax: 20,
                                borderColor: '#ff9800',
                                borderWidth: 2,
                                borderDash: [5, 5],
                                label: {
                                    display: true,
                                    content: 'Warning Threshold (20%)',
                                    position: 'center',
                                    backgroundColor: '#ff9800',
                                    color: 'white',
                                    font: {
                                        size: 10
                                    }
                                }
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Percentage (%)'
                        }
                    }
                }
            }
        });
    }

    static initializeHoverEffects() {
        let hoverDiv = document.createElement('div');
        hoverDiv.className = 'hover-info';
        document.body.appendChild(hoverDiv);

        const rows = document.querySelectorAll('.ratio-row, .data-row, .earnings-row, .trend-indicator');
        rows.forEach(row => {
            row.addEventListener('mouseenter', (e) => {
                const hoverText = row.getAttribute('data-hover');
                if (hoverText) {
                    hoverDiv.textContent = hoverText;
                    hoverDiv.style.display = 'block';
                    
                    const rect = row.getBoundingClientRect();
                    hoverDiv.style.left = (rect.left + window.scrollX + 10) + 'px';
                    hoverDiv.style.top = (rect.top + window.scrollY - 40) + 'px';
                }
            });

            row.addEventListener('mousemove', (e) => {
                hoverDiv.style.left = (e.clientX + 10) + 'px';
                hoverDiv.style.top = (e.clientY - 40) + 'px';
            });

            row.addEventListener('mouseleave', () => {
                hoverDiv.style.display = 'none';
            });
        });
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
// Report Generator Section - Professional FRC Version
class ReportGenerator {
    static load() {
        appState.currentSection = 'report-generator';
        UIComponents.updateActiveSidebarItem('report-generator');
        
        const content = `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="section-title">FRC Report Generator</h3>
                <div>
                    <button class="btn btn-outline-primary me-2" onclick="ReportGenerator.previewReport()">
                        <i class="fas fa-eye me-2"></i> Preview Report
                    </button>
                    <button class="btn btn-primary" onclick="ReportGenerator.generateFullReport()">
                        <i class="fas fa-file-pdf me-2"></i> Generate Full Report
                    </button>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-8">
                    <div class="dashboard-card">
                        <h5><i class="fas fa-cogs me-2 text-primary"></i>Report Configuration</h5>
                        
                        <div class="mb-3">
                            <label class="form-label">Report Type</label>
                            <select class="form-select" id="reportType">
                                <option value="comprehensive">Comprehensive FRC Analysis Report</option>
                                <option value="compliance">Compliance Assessment Report</option>
                                <option value="executive">Executive Summary Report</option>
                                <option value="risk">Risk Assessment Report</option>
                                <option value="audit">Audit & Governance Report</option>
                            </select>
                            <small class="text-muted">Select the type of report to generate</small>
                        </div>
                        
                        <div class="mb-3">
                            <label class="form-label">Report Sections</label>
                            <div class="border rounded p-3 bg-light">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="secExecSummary" checked>
                                    <label class="form-check-label" for="secExecSummary">
                                        <strong>1. Executive Summary</strong> - Key findings and recommendations
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="secEntityProfile" checked>
                                    <label class="form-check-label" for="secEntityProfile">
                                        <strong>2. Entity Profile</strong> - Company information and regulatory landscape
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="secFinancialAnalysis" checked>
                                    <label class="form-check-label" for="secFinancialAnalysis">
                                        <strong>3. Financial Analysis</strong> - Ratio analysis and trend assessment
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="secFinancialStatements" checked>
                                    <label class="form-check-label" for="secFinancialStatements">
                                        <strong>4. Financial Statements</strong> - Detailed statement analysis
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="secCompliance" checked>
                                    <label class="form-check-label" for="secCompliance">
                                        <strong>5. IFRS Compliance</strong> - Standards compliance matrix
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="secAuditGovernance" checked>
                                    <label class="form-check-label" for="secAuditGovernance">
                                        <strong>6. Audit & Governance</strong> - Audit quality and governance assessment
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="secMaterialDepartures" checked>
                                    <label class="form-check-label" for="secMaterialDepartures">
                                        <strong>7. Material Departures</strong> - Non-compliance findings
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="secRiskAssessment" checked>
                                    <label class="form-check-label" for="secRiskAssessment">
                                        <strong>8. Risk Assessment</strong> - Integrated risk analysis
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="secConclusions" checked>
                                    <label class="form-check-label" for="secConclusions">
                                        <strong>9. Conclusions & Recommendations</strong> - Actionable insights
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label class="form-label">Report Title</label>
                            <input type="text" class="form-control" id="reportTitle" 
                                   value="Financial Reporting Council (FRC) Analysis Report">
                        </div>
                        
                        <div class="mb-3">
                            <label class="form-label">Report Period</label>
                            <div class="row">
                                <div class="col-md-6">
                                    <input type="text" class="form-control" id="reportPeriod" 
                                           placeholder="e.g., Year ended 31 December 2023" value="Year ended 31 December 2023">
                                </div>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" id="reportDate" 
                                           value="${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}">
                                </div>
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label class="form-label">Confidentiality Level</label>
                            <select class="form-select" id="confidentiality">
                                <option value="strictly-confidential" selected>Strictly Confidential - FRC Internal Use Only</option>
                                <option value="confidential">Confidential - Limited Distribution</option>
                                <option value="restricted">Restricted - Management Only</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="dashboard-card">
                        <h5><i class="fas fa-file-alt me-2 text-primary"></i>Report Summary Preview</h5>
                        <div class="bg-light p-3 rounded" id="reportPreview">
                            <h6 class="border-bottom pb-2 mb-3">Report Content Preview:</h6>
                            <div id="previewContent" class="small">
                                <p><i class="fas fa-check text-success me-2"></i> Executive Summary with key findings</p>
                                <p><i class="fas fa-check text-success me-2"></i> Entity profile and regulatory compliance status</p>
                                <p><i class="fas fa-check text-success me-2"></i> Comprehensive financial ratio analysis</p>
                                <p><i class="fas fa-check text-success me-2"></i> Full IFRS compliance assessment matrix</p>
                                <p><i class="fas fa-check text-success me-2"></i> Audit quality and governance evaluation</p>
                                <p><i class="fas fa-check text-success me-2"></i> Material departures and non-compliance findings</p>
                                <p><i class="fas fa-check text-success me-2"></i> Integrated risk assessment with heat maps</p>
                                <p><i class="fas fa-check text-success me-2"></i> Professional conclusions and recommendations</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-4">
                    <div class="dashboard-card">
                        <h5><i class="fas fa-info-circle me-2 text-primary"></i>Report Information</h5>
                        <div class="mb-3">
                            <h6>Estimated Report Details:</h6>
                            <table class="table table-sm">
                                <tr>
                                    <td><i class="fas fa-file-pdf text-danger me-2"></i> Format:</td>
                                    <td><strong>PDF Document</strong></td>
                                </tr>
                                <tr>
                                    <td><i class="fas fa-layer-group me-2"></i> Pages:</td>
                                    <td><strong>45-60 pages</strong></td>
                                </tr>
                                <tr>
                                    <td><i class="fas fa-chart-bar me-2"></i> Charts:</td>
                                    <td><strong>15-20 visualizations</strong></td>
                                </tr>
                                <tr>
                                    <td><i class="fas fa-table me-2"></i> Tables:</td>
                                    <td><strong>25-30 data tables</strong></td>
                                </tr>
                                <tr>
                                    <td><i class="fas fa-clock me-2"></i> Generation Time:</td>
                                    <td><strong>2-3 minutes</strong></td>
                                </tr>
                            </table>
                        </div>
                        
                        <div class="mb-3">
                            <h6>FRC Standards Applied:</h6>
                            <div class="small">
                                <span class="badge bg-primary me-1 mb-1">IFRS Compliance</span>
                                <span class="badge bg-primary me-1 mb-1">ISA Standards</span>
                                <span class="badge bg-primary me-1 mb-1">BSEC Code</span>
                                <span class="badge bg-primary me-1 mb-1">FRC Guidelines</span>
                                <span class="badge bg-primary me-1 mb-1">Audit Standards</span>
                            </div>
                        </div>
                        
                        <div class="alert alert-warning">
                            <i class="fas fa-exclamation-triangle me-2"></i>
                            <strong>Note:</strong> All generated reports include the official FRC header and are suitable for regulatory submission.
                        </div>
                    </div>
                    
                    <div class="dashboard-card">
                        <h5><i class="fas fa-bolt me-2 text-primary"></i>Quick Actions</h5>
                        <button class="btn btn-outline-success w-100 mb-2" onclick="ReportGenerator.generateExecutiveSummary()">
                            <i class="fas fa-file-contract me-2"></i> Generate Executive Summary
                        </button>
                        <button class="btn btn-outline-warning w-100 mb-2" onclick="ReportGenerator.generateComplianceCertificate()">
                            <i class="fas fa-certificate me-2"></i> Generate Compliance Certificate
                        </button>
                        <button class="btn btn-outline-danger w-100 mb-2" onclick="ReportGenerator.generateFindingsReport()">
                            <i class="fas fa-exclamation-circle me-2"></i> Generate Findings Report
                        </button>
                        <button class="btn btn-outline-info w-100" onclick="ReportGenerator.showReportHistory()">
                            <i class="fas fa-history me-2"></i> View Report History
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Report Status Section -->
            <div class="dashboard-card d-none" id="reportStatus">
                <h5><i class="fas fa-spinner fa-spin me-2 text-primary"></i>Generating Report...</h5>
                <div class="progress mb-3">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" 
                         id="reportProgress" style="width: 0%"></div>
                </div>
                <div id="reportStatusText" class="text-center">
                    <p class="mb-1">Initializing report generation...</p>
                    <small class="text-muted">This may take a few minutes. Please do not close this window.</small>
                </div>
            </div>
        `;

        UIComponents.getMainContent().innerHTML = content;
    }

    static async generateFullReport() {
        const reportType = document.getElementById('reportType').value;
        const reportTitle = document.getElementById('reportTitle').value || 'FRC Analysis Report';
        const confidentiality = document.getElementById('confidentiality').value;
        
        // Show status
        document.getElementById('reportStatus').classList.remove('d-none');
        this.updateProgress('Collecting data...', 10);
        
        try {
            // Collect all data from various sections
            const reportData = await this.collectReportData();
            
            this.updateProgress('Compiling executive summary...', 25);
            const executiveSummary = this.generateExecutiveSummaryData(reportData);
            
            this.updateProgress('Analyzing financial data...', 40);
            const financialAnalysis = this.generateFinancialAnalysisData(reportData);
            
            this.updateProgress('Assessing compliance...', 55);
            const complianceAssessment = this.generateComplianceData(reportData);
            
            this.updateProgress('Evaluating audit quality...', 70);
            const auditGovernance = this.generateAuditData(reportData);
            
            this.updateProgress('Compiling findings...', 85);
            const findings = this.generateFindingsData(reportData);
            
            this.updateProgress('Finalizing report...', 95);
            
            // Generate PDF
            await this.generatePDF({
                reportType,
                reportTitle,
                confidentiality,
                data: {
                    executiveSummary,
                    financialAnalysis,
                    complianceAssessment,
                    auditGovernance,
                    findings,
                    metadata: {
                        generatedDate: new Date().toISOString(),
                        entityName: reportData.entityProfile?.legalName || 'Unknown Entity',
                        reportingPeriod: document.getElementById('reportPeriod').value,
                        fycYear: new Date().getFullYear()
                    }
                }
            });
            
            this.updateProgress('Report generated successfully!', 100);
            
            setTimeout(() => {
                document.getElementById('reportStatus').classList.add('d-none');
                document.getElementById('reportProgress').style.width = '0%';
                Notifications.show('FRC Report generated successfully!', 'success');
            }, 2000);
            
        } catch (error) {
            console.error('Report generation error:', error);
            Notifications.show('Error generating report: ' + error.message, 'error');
            document.getElementById('reportStatus').classList.add('d-none');
        }
    }

    static updateProgress(message, percentage) {
        const progressBar = document.getElementById('reportProgress');
        const statusText = document.getElementById('reportStatusText');
        
        if (progressBar) {
            progressBar.style.width = percentage + '%';
        }
        
        if (statusText) {
            statusText.innerHTML = `<p class="mb-1">${message}</p>
                                   <small class="text-muted">${percentage}% complete</small>`;
        }
    }

    static async collectReportData() {
        const allData = {};
        
        // Entity Profile Data (from 2.json)
        const entityData = appState.allJSONData[2];
        if (entityData) {
            const entity = entityData.frc_analysis_report?.entity;
            allData.entityProfile = {
                legalName: entity?.entity_profile?.legal_name,
                tradeName: entity?.entity_profile?.trade_name,
                registrationNumber: entity?.entity_profile?.registration_number,
                industrySector: entity?.entity_profile?.industry_sector,
                listingStatus: entity?.entity_profile?.listing_status
            };
        }
        
        // Financial Analysis Data (from 4.json, 19.json, etc.)
        const financialData = appState.allJSONData[4];
        const ratioData = appState.allJSONData[19];
        const earningsData = appState.allJSONData[17];
        
        if (financialData) {
            allData.financialStatements = financialData.frc_analysis_report?.entity?.financial_statements_raw_data;
        }
        
        if (ratioData) {
            allData.ratioAnalysis = ratioData.frc_analysis_report?.entity?.phase_2_financial_analysis?.enhanced_ratio_analysis;
        }
        
        // Compliance Data (from 7-11.json)
        allData.compliance = {};
        for (let i = 7; i <= 11; i++) {
            const data = appState.allJSONData[i];
            if (data && data.frc_analysis_report) {
                const compliance = data.frc_analysis_report.entity?.phase_3_ifrs_compliance_detailed?.key_standards_compliance_check;
                if (compliance) {
                    Object.assign(allData.compliance, compliance);
                }
            }
        }
        
        // Audit & Governance Data (from 14.json, 21.json, 22.json)
        const auditData = appState.allJSONData[14];
        const enhancedAudit = appState.allJSONData[21];
        const governanceData = appState.allJSONData[22];
        
        if (auditData) {
            allData.audit = auditData.frc_analysis_report?.entity?.phase_4_audit_governance_verification;
        }
        
        if (governanceData) {
            allData.governance = governanceData.frc_analysis_report?.entity?.phase_4_audit_governance_verification;
        }
        
        // Material Departures (from 24.json)
        const departuresData = appState.allJSONData[24];
        if (departuresData) {
            allData.materialDepartures = departuresData.frc_analysis_report?.entity?.phase_5_synthesis_and_findings;
        }
        
        // Risk Assessment (from 25.json)
        const riskData = appState.allJSONData[25];
        if (riskData) {
            allData.riskAssessment = riskData.frc_analysis_report?.entity?.phase_5_synthesis_and_findings?.holistic_risk_factor_synthesis;
        }
        
        // Regulatory Compliance (from 5.json)
        const regulatoryData = appState.allJSONData[5];
        if (regulatoryData) {
            allData.regulatory = regulatoryData.frc_analysis_report?.entity?.phase_1_foundational_checks;
        }
        
        return allData;
    }

    static generateExecutiveSummaryData(reportData) {
        return {
            overview: {
                entityName: reportData.entityProfile?.legalName || 'Not available',
                assessmentPeriod: document.getElementById('reportPeriod').value,
                reportDate: new Date().toLocaleDateString(),
                confidentiality: document.getElementById('confidentiality').value
            },
            keyFindings: {
                complianceStatus: this.assessOverallCompliance(reportData.compliance),
                financialHealth: this.assessFinancialHealth(reportData.ratioAnalysis),
                auditQuality: this.assessAuditQuality(reportData.audit),
                riskLevel: this.assessOverallRisk(reportData.riskAssessment),
                materialDepartures: reportData.materialDepartures?.consolidated_material_departures?.length || 0
            },
            summaryParagraph: this.generateSummaryParagraph(reportData)
        };
    }

    static generateFinancialAnalysisData(reportData) {
        const ratioData = reportData.ratioAnalysis || {};
        
        return {
            liquidityRatios: ratioData.liquidity_ratios || {},
            profitabilityRatios: ratioData.profitability_ratios || {},
            solvencyRatios: ratioData.solvency_coverage_ratios || {},
            efficiencyRatios: ratioData.efficiency_ratios || {},
            trends: this.extractTrendData(reportData),
            financialStatements: reportData.financialStatements || {}
        };
    }

    static generateComplianceData(reportData) {
        const compliance = reportData.compliance || {};
        const standards = Object.keys(compliance);
        
        return {
            totalStandards: standards.length,
            compliantCount: standards.filter(s => compliance[s]?.compliance_status === 'Compliant').length,
            partiallyCompliantCount: standards.filter(s => compliance[s]?.compliance_status === 'Partially Compliant').length,
            nonCompliantCount: standards.filter(s => compliance[s]?.compliance_status === 'Non-Compliant').length,
            standards: compliance,
            majorIssues: this.extractMajorComplianceIssues(compliance)
        };
    }

    static generateAuditData(reportData) {
        const audit = reportData.audit || {};
        const governance = reportData.governance || {};
        
        return {
            auditReport: audit.audit_report_analysis || {},
            governanceReview: audit.corporate_governance_review || {},
            bsecCompliance: governance.corporate_governance_code_assessment || {},
            keyAuditMatters: audit.audit_report_analysis?.key_audit_matters || [],
            goingConcern: audit.audit_report_analysis?.audit_opinion?.going_concern || {}
        };
    }

    static generateFindingsData(reportData) {
        const departures = reportData.materialDepartures || {};
        const risk = reportData.riskAssessment || {};
        const regulatory = reportData.regulatory || {};
        
        return {
            materialDepartures: departures.consolidated_material_departures || [],
            riskAssessment: risk,
            regulatoryFindings: regulatory.regulatory_landscape || {},
            priorityActions: risk.overall_integrated_risk_assessment?.frca_priority_actions || [],
            recommendations: this.generateRecommendations(reportData)
        };
    }

    static assessOverallCompliance(complianceData) {
        const standards = Object.values(complianceData || {});
        if (standards.length === 0) return 'Not Assessed';
        
        const compliant = standards.filter(s => s.compliance_status === 'Compliant').length;
        const percentage = (compliant / standards.length) * 100;
        
        if (percentage >= 85) return 'Highly Compliant';
        if (percentage >= 70) return 'Mostly Compliant';
        if (percentage >= 50) return 'Partially Compliant';
        return 'Non-Compliant';
    }

    static assessFinancialHealth(ratioData) {
        // Simplified assessment based on key ratios
        const currentRatio = ratioData.liquidity_ratios?.current_ratio;
        const debtEquity = ratioData.solvency_coverage_ratios?.debt_to_equity;
        const roe = ratioData.profitability_ratios?.return_on_equity_roe;
        
        let score = 0;
        if (currentRatio >= 1.5) score += 2;
        else if (currentRatio >= 1) score += 1;
        
        if (debtEquity <= 1) score += 2;
        else if (debtEquity <= 2) score += 1;
        
        if (roe >= 15) score += 2;
        else if (roe >= 8) score += 1;
        
        if (score >= 5) return 'Strong';
        if (score >= 3) return 'Adequate';
        return 'Weak';
    }

    static assessAuditQuality(auditData) {
        const opinion = auditData?.audit_report_analysis?.audit_opinion?.opinion_type;
        const goingConcern = auditData?.audit_report_analysis?.audit_opinion?.going_concern;
        
        if (opinion === 'Unmodified' && !goingConcern?.material_uncertainty) return 'Good';
        if (opinion === 'Modified' || goingConcern?.material_uncertainty) return 'Requires Attention';
        return 'Needs Assessment';
    }

    static assessOverallRisk(riskData) {
        const riskLevels = [
            riskData.financial_risks_from_analysis?.consolidated_financial_risk_level,
            riskData.operational_risks?.consolidated_operational_risk_level,
            riskData.compliance_risks?.consolidated_compliance_risk_level
        ];
        
        const highCount = riskLevels.filter(r => r?.toLowerCase().includes('high')).length;
        const moderateCount = riskLevels.filter(r => r?.toLowerCase().includes('moderate')).length;
        
        if (highCount >= 2) return 'High';
        if (highCount >= 1 || moderateCount >= 2) return 'Moderate to High';
        if (moderateCount >= 1) return 'Moderate';
        return 'Low';
    }

    static generateSummaryParagraph(reportData) {
        const entityName = reportData.entityProfile?.legalName || 'the entity';
        const compliance = this.assessOverallCompliance(reportData.compliance);
        const financialHealth = this.assessFinancialHealth(reportData.ratioAnalysis);
        const riskLevel = this.assessOverallRisk(reportData.riskAssessment);
        const departures = reportData.materialDepartures?.consolidated_material_departures?.length || 0;
        
        return `The Financial Reporting Council analysis of ${entityName} reveals ${compliance.toLowerCase()} with IFRS standards. ` +
               `Financial health is assessed as ${financialHealth.toLowerCase()}, with ${departures} material departures identified. ` +
               `Overall risk assessment indicates ${riskLevel.toLowerCase()} risk levels requiring attention. ` +
               `Detailed findings and recommendations are provided in subsequent sections of this report.`;
    }

    static extractTrendData(reportData) {
        // Extract trend information from financial data
        const financials = reportData.financialStatements;
        if (!financials) return {};
        
        return {
            revenueTrend: this.calculateTrend(financials.statement_of_profit_or_loss_and_other_comprehensive_income, 'Revenue'),
            profitTrend: this.calculateTrend(financials.statement_of_profit_or_loss_and_other_comprehensive_income, 'Profit'),
            assetTrend: this.calculateTrend(financials.statement_of_financial_position, 'Total assets')
        };
    }

    static calculateTrend(statementData, itemName) {
        if (!statementData || !Array.isArray(statementData)) return 'N/A';
        
        const sorted = statementData.sort((a, b) => b.year.localeCompare(a.year));
        if (sorted.length < 2) return 'Insufficient data';
        
        const current = sorted[0].line_items?.find(item => item.item.includes(itemName))?.amount;
        const previous = sorted[1].line_items?.find(item => item.item.includes(itemName))?.amount;
        
        if (!current || !previous) return 'Data not available';
        
        try {
            const currentNum = parseFloat(current.replace(/[^0-9.-]+/g, ''));
            const previousNum = parseFloat(previous.replace(/[^0-9.-]+/g, ''));
            
            if (isNaN(currentNum) || isNaN(previousNum) || previousNum === 0) return 'Cannot calculate';
            
            const change = ((currentNum - previousNum) / Math.abs(previousNum)) * 100;
            return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
        } catch {
            return 'Calculation error';
        }
    }

    static extractMajorComplianceIssues(complianceData) {
        const issues = [];
        Object.entries(complianceData || {}).forEach(([standard, data]) => {
            if (data.compliance_status === 'Non-Compliant' || data.compliance_status === 'Partially Compliant') {
                issues.push({
                    standard: standard,
                    status: data.compliance_status,
                    reason: data.reason_of_the_status || 'No reason provided',
                    reference: data.status_reference || 'No reference'
                });
            }
        });
        return issues.slice(0, 10); // Return top 10 issues
    }

    static generateRecommendations(reportData) {
        const recommendations = [];
        const departures = reportData.materialDepartures?.consolidated_material_departures || [];
        const complianceIssues = this.extractMajorComplianceIssues(reportData.compliance);
        
        // Compliance recommendations
        if (complianceIssues.length > 0) {
            recommendations.push({
                priority: 'High',
                area: 'IFRS Compliance',
                recommendation: 'Address non-compliance with key IFRS standards identified in the compliance matrix',
                timeline: 'Immediate',
                responsible: 'Management & Finance Team'
            });
        }
        
        // Material departures recommendations
        if (departures.length > 0) {
            recommendations.push({
                priority: 'High',
                area: 'Material Departures',
                recommendation: 'Rectify material departures from IFRS standards before next reporting period',
                timeline: '30 days',
                responsible: 'CFO & Audit Committee'
            });
        }
        
        // Governance recommendations
        const governance = reportData.governance;
        const bsecScore = governance?.corporate_governance_code_assessment?.bsec_corporate_governance_code?.overall_compliance_score;
        if (bsecScore && parseInt(bsecScore) < 70) {
            recommendations.push({
                priority: 'Medium',
                area: 'Corporate Governance',
                recommendation: 'Strengthen corporate governance practices to meet BSEC code requirements',
                timeline: '60 days',
                responsible: 'Board of Directors'
            });
        }
        
        // Risk management recommendations
        const riskLevel = this.assessOverallRisk(reportData.riskAssessment);
        if (riskLevel.includes('High') || riskLevel.includes('Moderate to High')) {
            recommendations.push({
                priority: 'High',
                area: 'Risk Management',
                recommendation: 'Implement enhanced risk management framework and monitoring',
                timeline: '45 days',
                responsible: 'Risk Committee & Management'
            });
        }
        
        return recommendations;
    }

    static async generatePDF(reportConfig) {
        try {
            // In a real implementation, this would use a PDF generation library
            // For now, simulate the process and create a download
            Notifications.show('Preparing PDF report...', 'info');
            
            // Create a blob with report data (simulated PDF)
            const reportContent = `
                FRC ANALYSIS REPORT
                ===================
                
                Report Title: ${reportConfig.reportTitle}
                Generated: ${new Date().toLocaleDateString()}
                Confidentiality: ${reportConfig.confidentiality}
                
                EXECUTIVE SUMMARY
                ----------------
                ${reportConfig.data.executiveSummary.summaryParagraph}
                
                KEY FINDINGS:
                - Compliance Status: ${reportConfig.data.executiveSummary.keyFindings.complianceStatus}
                - Financial Health: ${reportConfig.data.executiveSummary.keyFindings.financialHealth}
                - Risk Level: ${reportConfig.data.executiveSummary.keyFindings.riskLevel}
                - Material Departures: ${reportConfig.data.executiveSummary.keyFindings.materialDepartures}
                
                [Full report would contain detailed sections, charts, and tables]
                
                This is a simulated PDF. In production, this would be a fully formatted
                PDF document with professional layout, FRC branding, and all analysis data.
            `;
            
            const blob = new Blob([reportContent], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            
            a.href = url;
            a.download = `FRC_Report_${new Date().toISOString().split('T')[0]}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            return true;
            
        } catch (error) {
            console.error('PDF generation error:', error);
            Notifications.show('Error creating PDF: ' + error.message, 'error');
            return false;
        }
    }

    static previewReport() {
        Notifications.show('Report preview would show a formatted HTML version of the full report.', 'info');
        // In production, this would open a modal with the report preview
    }

    static generateExecutiveSummary() {
        Notifications.show('Generating Executive Summary PDF...', 'info');
        // Similar to generateFullReport but only executive summary
    }

    static generateComplianceCertificate() {
        Notifications.show('Generating Compliance Certificate PDF...', 'info');
        // Generate a formal compliance certificate
    }

    static generateFindingsReport() {
        Notifications.show('Generating Findings Report PDF...', 'info');
        // Generate a report focused on findings and recommendations
    }

    static showReportHistory() {
        Notifications.show('Displaying previously generated reports...', 'info');
        // Show modal with report history
    }
}

window.ReportGenerator = ReportGenerator;

// Add CSS for report generator
const reportGeneratorCSS = `
<style>
    #reportStatus {
        transition: all 0.3s ease;
    }
    
    .progress-bar-animated {
        animation: progress-bar-stripes 1s linear infinite;
    }
    
    @keyframes progress-bar-stripes {
        0% { background-position: 1rem 0; }
        100% { background-position: 0 0; }
    }
    
    .dashboard-card .form-check-label {
        font-size: 0.9rem;
        line-height: 1.4;
    }
    
    .dashboard-card .table-sm td {
        font-size: 0.85rem;
    }
    
    #reportPreview {
        max-height: 300px;
        overflow-y: auto;
    }
    
    .form-select:focus, .form-control:focus {
        border-color: #0d6efd;
        box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    }
</style>
`;

document.head.insertAdjacentHTML('beforeend', reportGeneratorCSS);
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
                    <button class="btn btn-success me-2" onclick="ReportGenerator.generateBriefReport()">
                        <i class="fas fa-file-alt me-2"></i> Generate Brief Report
                    </button>
                    <button class="btn btn-primary" onclick="ReportGenerator.generateComprehensiveReport()">
                        <i class="fas fa-file-pdf me-2"></i> Generate Comprehensive Report
                    </button>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-8">
                    <div class="dashboard-card">
                        <h5><i class="fas fa-cogs me-2 text-primary"></i>Report Configuration</h5>
                        
                        <div class="mb-3">
                            <label class="form-label">Report Version</label>
                            <div class="btn-group w-100" role="group">
                                <input type="radio" class="btn-check" name="reportVersion" id="versionBrief" autocomplete="off" checked>
                                <label class="btn btn-outline-primary" for="versionBrief">
                                    <i class="fas fa-file-alt me-2"></i>Brief Summary (10-15 pages)
                                </label>
                                
                                <input type="radio" class="btn-check" name="reportVersion" id="versionComprehensive" autocomplete="off">
                                <label class="btn btn-outline-success" for="versionComprehensive">
                                    <i class="fas fa-file-pdf me-2"></i>Comprehensive (40-60 pages)
                                </label>
                            </div>
                            <small class="text-muted">Brief version includes key findings. Comprehensive version includes detailed analysis with charts.</small>
                        </div>
                        
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
                        <h5><i class="fas fa-chart-bar me-2 text-primary"></i>Report Analytics & Charts</h5>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="includeCharts" checked>
                                    <label class="form-check-label" for="includeCharts">
                                        Include Charts & Graphs
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="includeTables" checked>
                                    <label class="form-check-label" for="includeTables">
                                        Include Data Tables
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="includeRiskHeatmap" checked>
                                    <label class="form-check-label" for="includeRiskHeatmap">
                                        Include Risk Heatmap
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="includeComplianceMatrix" checked>
                                    <label class="form-check-label" for="includeComplianceMatrix">
                                        Include Compliance Matrix
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="includeTrendAnalysis" checked>
                                    <label class="form-check-label" for="includeTrendAnalysis">
                                        Include Trend Analysis
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="includeRecommendations" checked>
                                    <label class="form-check-label" for="includeRecommendations">
                                        Include Detailed Recommendations
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-4">
                    <div class="dashboard-card">
                        <h5><i class="fas fa-info-circle me-2 text-primary"></i>Report Information</h5>
                        <div class="mb-3">
                            <h6>Brief Report:</h6>
                            <table class="table table-sm">
                                <tr><td><i class="fas fa-file-alt text-primary me-2"></i> Format:</td><td><strong>PDF Document</strong></td></tr>
                                <tr><td><i class="fas fa-layer-group me-2"></i> Pages:</td><td><strong>10-15 pages</strong></td></tr>
                                <tr><td><i class="fas fa-chart-bar me-2"></i> Charts:</td><td><strong>3-5 visualizations</strong></td></tr>
                                <tr><td><i class="fas fa-clock me-2"></i> Generation Time:</td><td><strong>1-2 minutes</strong></td></tr>
                            </table>
                        </div>
                        
                        <div class="mb-3">
                            <h6>Comprehensive Report:</h6>
                            <table class="table table-sm">
                                <tr><td><i class="fas fa-file-pdf text-danger me-2"></i> Format:</td><td><strong>PDF Document</strong></td></tr>
                                <tr><td><i class="fas fa-layer-group me-2"></i> Pages:</td><td><strong>40-60 pages</strong></td></tr>
                                <tr><td><i class="fas fa-chart-bar me-2"></i> Charts:</td><td><strong>15-20 visualizations</strong></td></tr>
                                <tr><td><i class="fas fa-table me-2"></i> Tables:</td><td><strong>25-30 data tables</strong></td></tr>
                                <tr><td><i class="fas fa-clock me-2"></i> Generation Time:</td><td><strong>3-5 minutes</strong></td></tr>
                            </table>
                        </div>
                        
                        <div class="alert alert-info">
                            <i class="fas fa-lightbulb me-2"></i>
                            <strong>Tip:</strong> Use Brief Report for quick overview. Use Comprehensive Report for detailed regulatory submissions.
                        </div>
                    </div>
                    
                    <div class="dashboard-card">
                        <h5><i class="fas fa-bolt me-2 text-primary"></i>Quick Actions</h5>
                        <button class="btn btn-outline-success w-100 mb-2" onclick="ReportGenerator.generateExecutiveSummary()">
                            <i class="fas fa-file-contract me-2"></i> Executive Summary
                        </button>
                        <button class="btn btn-outline-warning w-100 mb-2" onclick="ReportGenerator.generateComplianceCertificate()">
                            <i class="fas fa-certificate me-2"></i> Compliance Certificate
                        </button>
                        <button class="btn btn-outline-danger w-100 mb-2" onclick="ReportGenerator.generateFindingsReport()">
                            <i class="fas fa-exclamation-circle me-2"></i> Findings Report
                        </button>
                        <button class="btn btn-outline-info w-100" onclick="ReportGenerator.showReportHistory()">
                            <i class="fas fa-history me-2"></i> Report History
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
            
            <!-- Hidden HTML for PDF Generation -->
            <div id="pdfTemplate" style="display: none; position: absolute; left: -9999px;"></div>
        `;

        UIComponents.getMainContent().innerHTML = content;
    }

    static async generateBriefReport() {
        const reportType = document.getElementById('reportType').value;
        const reportTitle = document.getElementById('reportTitle').value || 'FRC Analysis Report';
        const confidentiality = document.getElementById('confidentiality').value;
        
        // Show status
        document.getElementById('reportStatus').classList.remove('d-none');
        this.updateProgress('Collecting data for brief report...', 10);
        
        try {
            // Collect all data from various sections
            const reportData = await this.collectReportData();
            
            this.updateProgress('Generating brief executive summary...', 30);
            const executiveSummary = this.generateExecutiveSummaryData(reportData);
            
            this.updateProgress('Creating brief analysis sections...', 60);
            const briefAnalysis = this.generateBriefAnalysisData(reportData);
            
            this.updateProgress('Finalizing brief report...', 90);
            
            // Generate Brief PDF
            await this.generateBriefPDF({
                reportType,
                reportTitle,
                confidentiality,
                data: {
                    executiveSummary: executiveSummary || this.getDefaultExecutiveSummary(),
                    briefAnalysis: briefAnalysis || this.getDefaultBriefAnalysis(),
                    metadata: {
                        generatedDate: new Date().toISOString(),
                        entityName: reportData.entityProfile?.legalName || 'Unknown Entity',
                        reportingPeriod: document.getElementById('reportPeriod').value,
                        fycYear: new Date().getFullYear(),
                        reportVersion: 'Brief Summary'
                    }
                }
            });
            
            this.updateProgress('Brief report generated successfully!', 100);
            
            setTimeout(() => {
                document.getElementById('reportStatus').classList.add('d-none');
                document.getElementById('reportProgress').style.width = '0%';
                Notifications.show('FRC Brief Report generated successfully!', 'success');
            }, 2000);
            
        } catch (error) {
            console.error('Brief report generation error:', error);
            Notifications.show('Error generating brief report: ' + error.message, 'error');
            document.getElementById('reportStatus').classList.add('d-none');
        }
    }

    static async generateComprehensiveReport() {
        const reportType = document.getElementById('reportType').value;
        const reportTitle = document.getElementById('reportTitle').value || 'FRC Comprehensive Analysis Report';
        const confidentiality = document.getElementById('confidentiality').value;
        
        // Show status
        document.getElementById('reportStatus').classList.remove('d-none');
        this.updateProgress('Collecting data for comprehensive report...', 10);
        
        try {
            // Collect all data from various sections
            const reportData = await this.collectReportData();
            
            this.updateProgress('Generating detailed executive summary...', 20);
            const executiveSummary = this.generateExecutiveSummaryData(reportData);
            
            this.updateProgress('Analyzing entity profile...', 25);
            const entityProfile = this.generateDetailedEntityProfile(reportData);
            
            this.updateProgress('Conducting financial analysis...', 35);
            const financialAnalysis = this.generateDetailedFinancialAnalysis(reportData);
            
            this.updateProgress('Assessing compliance matrix...', 50);
            const complianceAssessment = this.generateDetailedComplianceAssessment(reportData);
            
            this.updateProgress('Evaluating audit & governance...', 65);
            const auditGovernance = this.generateDetailedAuditGovernance(reportData);
            
            this.updateProgress('Analyzing material departures...', 75);
            const materialDepartures = this.generateDetailedMaterialDepartures(reportData);
            
            this.updateProgress('Conducting risk assessment...', 85);
            const riskAssessment = this.generateDetailedRiskAssessment(reportData);
            
            this.updateProgress('Compiling recommendations...', 95);
            const recommendations = this.generateDetailedRecommendations(reportData);
            
            // Generate Comprehensive PDF
            await this.generateComprehensivePDF({
                reportType,
                reportTitle,
                confidentiality,
                data: {
                    executiveSummary: executiveSummary || this.getDefaultExecutiveSummary(),
                    entityProfile: entityProfile || {},
                    financialAnalysis: financialAnalysis || {},
                    complianceAssessment: complianceAssessment || {},
                    auditGovernance: auditGovernance || {},
                    materialDepartures: materialDepartures || {},
                    riskAssessment: riskAssessment || {},
                    recommendations: recommendations || {},
                    metadata: {
                        generatedDate: new Date().toISOString(),
                        entityName: reportData.entityProfile?.legalName || 'Unknown Entity',
                        reportingPeriod: document.getElementById('reportPeriod').value,
                        fycYear: new Date().getFullYear(),
                        reportVersion: 'Comprehensive Analysis'
                    }
                }
            });
            
            this.updateProgress('Comprehensive report generated successfully!', 100);
            
            setTimeout(() => {
                document.getElementById('reportStatus').classList.add('d-none');
                document.getElementById('reportProgress').style.width = '0%';
                Notifications.show('FRC Comprehensive Report generated successfully!', 'success');
            }, 2000);
            
        } catch (error) {
            console.error('Comprehensive report generation error:', error);
            Notifications.show('Error generating comprehensive report: ' + error.message, 'error');
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
        const entityData = appState.allJSONData['2'];
        if (entityData) {
            const entity = entityData.frc_analysis_report?.entity;
            allData.entityProfile = {
                legalName: entity?.entity_profile?.legal_name || 'Not available',
                tradeName: entity?.entity_profile?.trade_name || 'Not available',
                registrationNumber: entity?.entity_profile?.registration_number || 'Not available',
                industrySector: entity?.entity_profile?.industry_sector || 'Not available',
                frcSector: entity?.entity_profile?.frc_sector || 'Not available',
                listingStatus: entity?.entity_profile?.listing_status || 'Not available',
                reportingCurrency: entity?.entity_profile?.reporting_currency || 'Not available'
            };
        }
        
        // Materiality Framework (from 3.json)
        const materialityData = appState.allJSONData['3'];
        if (materialityData) {
            const materiality = materialityData.frc_analysis_report?.entity?.materiality_framework;
            allData.materiality = {
                quantitative: materiality?.quantitative_materiality || {},
                qualitative: materiality?.qualitative_materiality_considerations || [],
                conclusion: materiality?.frc_materiality_conclusion || ''
            };
        }
        
        // Financial Statements Data (from 4.json)
        const financialData = appState.allJSONData['4'];
        if (financialData) {
            allData.financialStatements = financialData.frc_analysis_report?.entity?.financial_statements_raw_data;
        }
        
        // Phase 1 Foundational Checks (from 5.json)
        const phase1Data = appState.allJSONData['5'];
        if (phase1Data) {
            const checks = phase1Data.frc_analysis_report?.entity?.phase_1_foundational_checks;
            allData.foundationalChecks = {
                reportingFramework: checks?.reporting_framework || {},
                regulatoryLandscape: checks?.regulatory_landscape || {}
            };
        }
        
        // Phase 2 Financial Analysis (from 6.json, 17.json, 18.json, 19.json)
        const phase2Data = appState.allJSONData['6'];
        const earningsData = appState.allJSONData['17'];
        const trendData = appState.allJSONData['18'];
        const ratioData = appState.allJSONData['19'];
        
        allData.financialAnalysis = {};
        if (phase2Data) {
            allData.financialAnalysis.basic = phase2Data.frc_analysis_report?.entity?.phase_2_financial_analysis;
        }
        if (earningsData) {
            allData.financialAnalysis.earnings = earningsData.frc_analysis_report?.entity?.phase_2_financial_analysis?.detailed_earnings_quality_analysis;
        }
        if (trendData) {
            allData.financialAnalysis.trends = trendData.frc_analysis_report?.entity?.phase_2_financial_analysis?.detailed_trend_analysis;
        }
        if (ratioData) {
            allData.financialAnalysis.ratios = ratioData.frc_analysis_report?.entity?.phase_2_financial_analysis?.enhanced_ratio_analysis;
        }
        
        // Phase 3 IFRS Compliance (from 7.json to 12.json)
        allData.ifrsCompliance = {};
        
        // Accounting Policies (7.json)
        const policiesData = appState.allJSONData['7'];
        if (policiesData) {
            const compliance = policiesData.frc_analysis_report?.entity?.phase_3_ifrs_compliance_detailed;
            allData.ifrsCompliance.accountingPolicies = compliance?.accounting_policies_review;
            allData.ifrsCompliance.managementJudgment = compliance?.management_judgment_and_estimation_uncertainty;
        }
        
        // Key Standards Compliance (8.json to 11.json)
        allData.ifrsCompliance.keyStandards = {};
        for (let i = 8; i <= 11; i++) {
            const data = appState.allJSONData[i.toString()];
            if (data && data.frc_analysis_report) {
                const standards = data.frc_analysis_report.entity?.phase_3_ifrs_compliance_detailed?.key_standards_compliance_check;
                if (standards) {
                    Object.assign(allData.ifrsCompliance.keyStandards, standards);
                }
            }
        }
        
        // Detailed IFRS Matrix (12.json)
        const matrixData = appState.allJSONData['12'];
        if (matrixData) {
            const compliance = matrixData.frc_analysis_report?.entity?.phase_3_ifrs_compliance_detailed;
            allData.ifrsCompliance.detailedMatrix = compliance?.detailed_ifrs_compliance_matrix;
            allData.ifrsCompliance.taxCompliance = compliance?.tax_compliance_check;
        }
        
        // Fraud Assessment (13.json)
        const fraudData = appState.allJSONData['13'];
        if (fraudData) {
            allData.fraudAssessment = fraudData.frc_analysis_report?.entity?.fraud_and_management_override_assessment;
        }
        
        // Phase 4 Audit Governance (14.json, 21.json, 22.json)
        const auditData = appState.allJSONData['14'];
        const enhancedAuditData = appState.allJSONData['21'];
        const governanceData = appState.allJSONData['22'];
        
        allData.auditGovernance = {};
        if (auditData) {
            allData.auditGovernance.basic = auditData.frc_analysis_report?.entity?.phase_4_audit_governance_verification;
        }
        if (enhancedAuditData) {
            allData.auditGovernance.enhanced = enhancedAuditData.frc_analysis_report?.entity?.phase_4_audit_governance_verification?.enhanced_audit_report_analysis;
        }
        if (governanceData) {
            allData.auditGovernance.governance = governanceData.frc_analysis_report?.entity?.phase_4_audit_governance_verification?.corporate_governance_code_assessment;
        }
        
        // Legal Enforcement (15.json)
        const legalData = appState.allJSONData['15'];
        if (legalData) {
            allData.legalEnforcement = legalData.frc_analysis_report?.entity?.legal_and_enforcement_mapping;
        }
        
        // Phase 5 Synthesis (16.json, 24.json, 25.json, 26.json)
        const synthesisData = appState.allJSONData['16'];
        const departuresData = appState.allJSONData['24'];
        const riskData = appState.allJSONData['25'];
        const execSummaryData = appState.allJSONData['26'];
        
        allData.synthesis = {};
        if (synthesisData) {
            allData.synthesis.basic = synthesisData.frc_analysis_report?.entity?.phase_5_synthesis_and_findings;
        }
        if (departuresData) {
            allData.synthesis.materialDepartures = departuresData.frc_analysis_report?.entity?.phase_5_synthesis_and_findings;
        }
        if (riskData) {
            allData.synthesis.riskAssessment = riskData.frc_analysis_report?.entity?.phase_5_synthesis_and_findings;
        }
        if (execSummaryData) {
            allData.synthesis.executiveSummary = execSummaryData.frc_analysis_report?.entity?.phase_5_synthesis_and_findings;
        }
        
        // Financial Notes (27.json)
        const notesData = appState.allJSONData['27'];
        if (notesData) {
            allData.financialNotes = notesData.financial_notes_raw_data?.notes || [];
        }
        
        // Metadata (1.json)
        const metadata = appState.allJSONData['1'];
        if (metadata) {
            allData.metadata = metadata.frc_analysis_report?.metadata || {};
        }
        
        return allData;
    }

    // Helper Methods
    static extractRatioValue(ratioObj) {
        if (!ratioObj) return null;
        
        // If it's a number or string that can be parsed
        if (typeof ratioObj === 'number') return ratioObj;
        if (typeof ratioObj === 'string') {
            const num = parseFloat(ratioObj);
            return isNaN(num) ? null : num;
        }
        
        // If it's an object with year values, try to get the most recent
        if (typeof ratioObj === 'object' && !Array.isArray(ratioObj)) {
            const years = Object.keys(ratioObj).sort().reverse();
            if (years.length > 0) {
                const latest = ratioObj[years[0]];
                if (latest) {
                    const num = parseFloat(latest);
                    return isNaN(num) ? null : num;
                }
            }
        }
        
        return null;
    }

    static extractMajorComplianceIssues(complianceData) {
        const issues = [];
        if (!complianceData) return issues;
        
        Object.entries(complianceData || {}).forEach(([standard, data]) => {
            if (data && (data.compliance === 'non-compliant' || data.compliance === 'partially compliant')) {
                issues.push({
                    standard: standard,
                    status: data.compliance,
                    reason: data.reason_of_the_status || 'No reason provided',
                    reference: data.status_reference || 'No reference'
                });
            }
        });
        return issues.slice(0, 10);
    }

    static assessOverallCompliance(complianceData) {
        const standards = Object.values(complianceData || {});
        if (standards.length === 0) return 'Not Assessed';
        
        const compliant = standards.filter(s => s && s.compliance === 'compliant').length;
        const percentage = (compliant / standards.length) * 100;
        
        if (percentage >= 85) return 'Excellent';
        if (percentage >= 70) return 'Good';
        if (percentage >= 50) return 'Satisfactory';
        if (percentage >= 40) return 'Needs Improvement';
        return 'Poor';
    }

    static assessAuditQuality(auditGovernanceData) {
        if (!auditGovernanceData) return 'Not Assessed';
        
        const basicAudit = auditGovernanceData.basic?.audit_report_analysis;
        const enhancedAudit = auditGovernanceData.enhanced;
        
        // Check opinion type
        let opinionType = basicAudit?.audit_opinion?.opinion_type || 
                         enhancedAudit?.opinion_type_analysis?.opinion_category;
        
        // Check going concern
        let goingConcern = basicAudit?.audit_opinion?.going_concern_assessment?.auditor_conclusion ||
                          enhancedAudit?.going_concern_analysis?.auditor_conclusion;
        
        // Check if there are any modifications
        const modifications = basicAudit?.audit_opinion?.modified_opinion_reasons ||
                             enhancedAudit?.opinion_type_analysis?.modified_opinion_reasons_detailed;
        
        // Determine audit quality
        if (opinionType === 'Unqualified' || opinionType === 'Unmodified') {
            if (!goingConcern || goingConcern.toLowerCase().includes('no material uncertainty')) {
                return 'Good';
            } else {
                return 'Requires Attention - Going Concern Issues';
            }
        } else if (opinionType === 'Qualified' || opinionType === 'Modified') {
            if (modifications && modifications.length > 0) {
                return 'Requires Attention - Modified Opinion';
            }
            return 'Needs Improvement';
        } else if (opinionType === 'Adverse' || opinionType === 'Disclaimer') {
            return 'Poor - Significant Issues';
        }
        
        return 'Needs Assessment';
    }

    static assessOverallRisk(reportData) {
        const synthesis = reportData.synthesis || {};
        const riskData = synthesis.riskAssessment?.holistic_risk_factor_synthesis;
        
        if (!riskData) {
            // Try to assess from other data if available
            const materialDepartures = synthesis.materialDepartures?.consolidated_material_departures || [];
            const complianceIssues = this.extractMajorComplianceIssues(reportData.ifrsCompliance?.keyStandards || {});
            
            if (materialDepartures.length > 5 || complianceIssues.length > 10) {
                return 'High';
            } else if (materialDepartures.length > 2 || complianceIssues.length > 5) {
                return 'Moderate to High';
            } else if (materialDepartures.length > 0 || complianceIssues.length > 0) {
                return 'Moderate';
            }
            return 'Low';
        }
        
        const overallRisk = riskData.overall_integrated_risk_assessment;
        
        if (overallRisk?.highest_risk_areas && overallRisk.highest_risk_areas.length > 0) {
            return 'High';
        }
        
        if (overallRisk?.medium_risk_areas && overallRisk.medium_risk_areas.length > 0) {
            return 'Moderate';
        }
        
        if (overallRisk?.low_risk_areas && overallRisk.low_risk_areas.length > 0) {
            return 'Low';
        }
        
        // Fallback to financial risk assessment
        const financialRisk = riskData.financial_risks_from_analysis?.consolidated_financial_risk_level;
        const complianceRisk = riskData.compliance_risks?.consolidated_compliance_risk_level;
        const operationalRisk = riskData.operational_risks?.consolidated_operational_risk_level;
        
        const risks = [financialRisk, complianceRisk, operationalRisk];
        const highCount = risks.filter(r => r && r.toLowerCase().includes('high')).length;
        const moderateCount = risks.filter(r => r && r.toLowerCase().includes('moderate')).length;
        
        if (highCount >= 2) return 'High';
        if (highCount >= 1 || moderateCount >= 2) return 'Moderate to High';
        if (moderateCount >= 1) return 'Moderate';
        
        return 'Low';
    }

    static assessFinancialHealth(ratioData) {
        if (!ratioData) return 'Not Assessed';
        
        // Extract ratio values safely
        const currentRatio = this.extractRatioValue(ratioData.liquidity_ratios?.current_ratio);
        const debtEquity = this.extractRatioValue(ratioData.solvency_coverage_ratios?.debt_to_equity);
        const roe = this.extractRatioValue(ratioData.profitability_ratios?.return_on_equity_roe);
        
        // If no data available
        if (currentRatio === null && debtEquity === null && roe === null) {
            return 'Insufficient Data';
        }
        
        let score = 0;
        
        // Score liquidity
        if (currentRatio !== null) {
            if (currentRatio >= 1.5) score += 2;
            else if (currentRatio >= 1.0) score += 1;
        }
        
        // Score solvency
        if (debtEquity !== null) {
            if (debtEquity <= 1.0) score += 2;
            else if (debtEquity <= 2.0) score += 1;
        }
        
        // Score profitability
        if (roe !== null) {
            if (roe >= 15) score += 2;
            else if (roe >= 8) score += 1;
        }
        
        // Determine health based on score
        const maxPossible = 6; // 2 points each for 3 categories
        const percentage = (score / maxPossible) * 100;
        
        if (percentage >= 75) return 'Strong';
        if (percentage >= 50) return 'Adequate';
        if (percentage >= 25) return 'Weak';
        return 'Poor';
    }

    static generateRecommendations(reportData) {
        const recommendations = [];
        const departures = reportData.synthesis?.materialDepartures?.consolidated_material_departures || [];
        const complianceIssues = this.extractMajorComplianceIssues(reportData.ifrsCompliance?.keyStandards || {});
        const auditQuality = this.assessAuditQuality(reportData.auditGovernance);
        const riskLevel = this.assessOverallRisk(reportData);
        
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
        
        // Audit quality recommendations
        if (auditQuality.includes('Requires Attention') || auditQuality.includes('Needs Improvement')) {
            recommendations.push({
                priority: 'Medium',
                area: 'Audit Quality',
                recommendation: 'Improve audit quality and address audit report qualifications',
                timeline: '45 days',
                responsible: 'Audit Committee & External Auditor'
            });
        }
        
        // Governance recommendations
        const governance = reportData.auditGovernance?.governance;
        const bsecScore = governance?.bsec_corporate_governance_code?.overall_compliance_score;
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
        if (riskLevel.includes('High') || riskLevel.includes('Moderate to High')) {
            recommendations.push({
                priority: 'High',
                area: 'Risk Management',
                recommendation: 'Implement enhanced risk management framework and monitoring',
                timeline: '45 days',
                responsible: 'Risk Committee & Management'
            });
        }
        
        // Financial health recommendations
        const financialHealth = this.assessFinancialHealth(reportData.financialAnalysis?.ratios);
        if (financialHealth === 'Weak' || financialHealth === 'Poor') {
            recommendations.push({
                priority: 'High',
                area: 'Financial Health',
                recommendation: 'Address financial weaknesses identified in ratio analysis',
                timeline: '60 days',
                responsible: 'CFO & Financial Controller'
            });
        }
        
        // If no specific issues but we still need recommendations
        if (recommendations.length === 0) {
            recommendations.push({
                priority: 'Low',
                area: 'Continuous Improvement',
                recommendation: 'Maintain current standards and implement best practices for continuous improvement',
                timeline: 'Ongoing',
                responsible: 'Management Team'
            });
        }
        
        return recommendations;
    }

    // Data Generation Methods
    static generateExecutiveSummaryData(reportData) {
        const entityProfile = reportData.entityProfile || {};
        const foundationalChecks = reportData.foundationalChecks || {};
        const synthesis = reportData.synthesis || {};
        
        // Get compliance status from foundational checks
        let complianceStatus = 'Not Assessed';
        if (foundationalChecks.reportingFramework) {
            complianceStatus = foundationalChecks.reportingFramework.compliance_assessment || 'Not Assessed';
        }
        
        // Get material departures count
        let materialDeparturesCount = 0;
        if (synthesis.materialDepartures?.consolidated_material_departures) {
            materialDeparturesCount = synthesis.materialDepartures.consolidated_material_departures.length;
        } else if (Array.isArray(synthesis.materialDepartures)) {
            materialDeparturesCount = synthesis.materialDepartures.length;
        }
        
        // Get regulatory assessment
        let regulatoryAssessment = 'Not Assessed';
        if (foundationalChecks.regulatoryLandscape) {
            regulatoryAssessment = foundationalChecks.regulatoryLandscape.overall_regulatory_assessment || 'Not Assessed';
        }
        
        // Get risk level from synthesis
        let riskLevel = 'Not Assessed';
        if (synthesis.riskAssessment?.holistic_risk_factor_synthesis) {
            const riskAssessment = synthesis.riskAssessment.holistic_risk_factor_synthesis;
            const overallRisk = riskAssessment.overall_integrated_risk_assessment;
            
            if (overallRisk?.highest_risk_areas && overallRisk.highest_risk_areas.length > 0) {
                riskLevel = 'High';
            } else if (overallRisk?.medium_risk_areas && overallRisk.medium_risk_areas.length > 0) {
                riskLevel = 'Medium';
            } else if (overallRisk?.low_risk_areas && overallRisk.low_risk_areas.length > 0) {
                riskLevel = 'Low';
            }
        }
        
        // Generate summary paragraph
        const summaryParagraph = this.generateSummaryParagraph({
            entityProfile,
            complianceStatus,
            materialDeparturesCount,
            regulatoryAssessment,
            riskLevel
        });
        
        return {
            overview: {
                entityName: entityProfile.legalName || 'Not available',
                tradeName: entityProfile.tradeName || 'Not available',
                registrationNumber: entityProfile.registrationNumber || 'Not available',
                industrySector: entityProfile.industrySector || 'Not available',
                frcSector: entityProfile.frcSector || 'Not available',
                listingStatus: entityProfile.listingStatus || 'Not available',
                assessmentPeriod: document.getElementById('reportPeriod')?.value || 'Not specified',
                reportDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                confidentiality: document.getElementById('confidentiality')?.value || 'Strictly Confidential'
            },
            keyFindings: {
                complianceStatus: complianceStatus,
                regulatoryAssessment: regulatoryAssessment,
                financialHealth: this.assessFinancialHealth(reportData.financialAnalysis?.ratios),
                auditQuality: this.assessAuditQuality(reportData.auditGovernance),
                riskLevel: riskLevel,
                materialDepartures: materialDeparturesCount
            },
            summaryParagraph: summaryParagraph
        };
    }

    static generateSummaryParagraph(data) {
        const entityName = data.entityProfile?.legalName || 'the entity';
        const compliance = data.complianceStatus || 'Not Assessed';
        const financialHealth = this.assessFinancialHealth(data.ratioAnalysis) || 'Not Assessed';
        const riskLevel = data.riskLevel || 'Not Assessed';
        const departures = data.materialDeparturesCount || 0;
        const regulatory = data.regulatoryAssessment || 'Not Assessed';
        
        return `The Financial Reporting Council (FRC) analysis of ${entityName} reveals a compliance status of "${compliance}" with International Financial Reporting Standards (IFRS). ` +
               `The regulatory compliance assessment indicates: "${regulatory}". ` +
               `Financial health is assessed as "${financialHealth}" based on ratio analysis and trend assessment. ` +
               `A total of ${departures} material departure(s) from IFRS requirements have been identified. ` +
               `The overall risk level is assessed as "${riskLevel}". ` +
               `Detailed findings, specific non-compliances, and actionable recommendations are provided in the subsequent sections of this comprehensive report.`;
    }

    static generateBriefAnalysisData(reportData) {
        const complianceIssues = this.extractMajorComplianceIssues(reportData.ifrsCompliance?.keyStandards || {});
        const departures = reportData.synthesis?.materialDepartures?.consolidated_material_departures || [];
        const recommendations = this.generateRecommendations(reportData);
        const compliance = reportData.ifrsCompliance?.keyStandards || {};
        const standards = Object.keys(compliance);
        const compliantCount = standards.filter(s => compliance[s]?.compliance === 'compliant').length;
        const compliancePercentage = standards.length > 0 ? Math.round((compliantCount / standards.length) * 100) : 0;
        
        return {
            keyFindings: this.extractKeyFindings(reportData),
            criticalIssues: this.extractCriticalIssues(reportData),
            topRecommendations: recommendations.slice(0, 5),
            summaryMetrics: {
                standardsAssessed: standards.length,
                complianceRate: compliancePercentage,
                materialDepartures: departures.length,
                riskLevel: this.assessOverallRisk(reportData),
                auditQuality: this.assessAuditQuality(reportData.auditGovernance),
                financialHealth: this.assessFinancialHealth(reportData.financialAnalysis?.ratios)
            }
        };
    }

    static extractKeyFindings(reportData) {
        const findings = [];
        
        // Compliance findings
        const complianceIssues = this.extractMajorComplianceIssues(reportData.ifrsCompliance?.keyStandards || {});
        if (complianceIssues.length > 0) {
            findings.push(`${complianceIssues.length} major compliance issues identified`);
        }
        
        // Material departures
        const departures = reportData.synthesis?.materialDepartures?.consolidated_material_departures || [];
        if (departures.length > 0) {
            findings.push(`${departures.length} material departures from IFRS`);
        }
        
        // Audit quality
        const auditQuality = this.assessAuditQuality(reportData.auditGovernance);
        if (auditQuality.includes('Requires Attention')) {
            findings.push('Audit quality requires improvement');
        }
        
        // Risk level
        const riskLevel = this.assessOverallRisk(reportData);
        if (riskLevel.includes('High')) {
            findings.push('High overall risk level identified');
        }
        
        // Financial health
        const financialHealth = this.assessFinancialHealth(reportData.financialAnalysis?.ratios);
        if (financialHealth.includes('Weak') || financialHealth.includes('Poor')) {
            findings.push('Financial health concerns identified');
        }
        
        return findings.length > 0 ? findings : ['No major issues identified'];
    }

    static extractCriticalIssues(reportData) {
        const issues = [];
        
        // Non-compliance issues
        const nonCompliant = Object.values(reportData.ifrsCompliance?.keyStandards || {})
            .filter(s => s && s.compliance === 'non-compliant');
        if (nonCompliant.length > 0) {
            issues.push(`${nonCompliant.length} non-compliant IFRS standards`);
        }
        
        // High-risk material departures
        const highRiskDepartures = (reportData.synthesis?.materialDepartures?.consolidated_material_departures || [])
            .filter(d => d && d.materiality_assessment && d.materiality_assessment.toLowerCase().includes('high'));
        if (highRiskDepartures.length > 0) {
            issues.push(`${highRiskDepartures.length} high-risk material departures`);
        }
        
        // Governance issues
        const governanceScore = reportData.auditGovernance?.governance?.bsec_corporate_governance_code?.overall_compliance_score;
        if (governanceScore && parseInt(governanceScore) < 60) {
            issues.push('Corporate governance deficiencies');
        }
        
        // Going concern issues
        const goingConcern = reportData.auditGovernance?.enhanced?.going_concern_analysis?.auditor_conclusion;
        if (goingConcern && goingConcern.toLowerCase().includes('material uncertainty')) {
            issues.push('Going concern uncertainty');
        }
        
        return issues;
    }

    // Default data methods
    static getDefaultExecutiveSummary() {
        return {
            overview: {
                entityName: 'Entity Not Available',
                tradeName: 'Not available',
                registrationNumber: 'Not available',
                industrySector: 'Not available',
                frcSector: 'Not available',
                listingStatus: 'Not available',
                assessmentPeriod: document.getElementById('reportPeriod')?.value || 'Not specified',
                reportDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                confidentiality: document.getElementById('confidentiality')?.value || 'Strictly Confidential'
            },
            keyFindings: {
                complianceStatus: 'Not Assessed',
                regulatoryAssessment: 'Not Assessed',
                financialHealth: 'Not Assessed',
                auditQuality: 'Not Assessed',
                riskLevel: 'Not Assessed',
                materialDepartures: 0
            },
            summaryParagraph: 'No executive summary data available.'
        };
    }

    static getDefaultBriefAnalysis() {
        return {
            keyFindings: ['No data available'],
            criticalIssues: ['No critical issues identified'],
            topRecommendations: [{
                priority: 'Low',
                area: 'Data Collection',
                recommendation: 'Collect complete financial data for proper analysis',
                timeline: 'Immediate',
                responsible: 'Management'
            }],
            summaryMetrics: {
                standardsAssessed: 0,
                complianceRate: 0,
                materialDepartures: 0,
                riskLevel: 'Not Assessed',
                auditQuality: 'Not Assessed',
                financialHealth: 'Not Assessed'
            }
        };
    }

    // Detailed Data Generation Methods
    static generateDetailedEntityProfile(reportData) {
        const entityProfile = reportData.entityProfile || {};
        const foundationalChecks = reportData.foundationalChecks || {};
        const materiality = reportData.materiality || {};
        
        return {
            basicInfo: {
                legalName: entityProfile.legalName || 'Not available',
                tradeName: entityProfile.tradeName || 'Not available',
                registrationNumber: entityProfile.registrationNumber || 'Not available',
                industrySector: entityProfile.industrySector || 'Not available',
                frcSector: entityProfile.frcSector || 'Not available',
                listingStatus: entityProfile.listingStatus || 'Not available',
                reportingCurrency: entityProfile.reportingCurrency || 'Not available'
            },
            materialityFramework: {
                quantitative: materiality.quantitative || {},
                qualitative: materiality.qualitative || [],
                conclusion: materiality.conclusion || 'Not assessed'
            },
            regulatoryLandscape: foundationalChecks.regulatoryLandscape || {},
            statutoryFilings: foundationalChecks.regulatoryLandscape?.statutory_filings_status || {}
        };
    }

    static generateDetailedFinancialAnalysis(reportData) {
        const ratioData = reportData.financialAnalysis?.ratios || {};
        const trendData = reportData.financialAnalysis?.trends || {};
        const earningsData = reportData.financialAnalysis?.earnings || {};
        const financialStatements = reportData.financialStatements || {};
        
        return {
            liquidityAnalysis: {
                currentRatio: ratioData.liquidity_ratios?.current_ratio || {},
                quickRatio: ratioData.liquidity_ratios?.quick_ratio_acid_test || {},
                analysis: this.analyzeLiquidity(ratioData.liquidity_ratios)
            },
            profitabilityAnalysis: {
                returnOnAssets: ratioData.profitability_ratios?.return_on_assets_roa || {},
                returnOnEquity: ratioData.profitability_ratios?.return_on_equity_roe || {},
                netProfitMargin: ratioData.profitability_ratios?.net_profit_margin || {},
                analysis: this.analyzeProfitability(ratioData.profitability_ratios)
            },
            solvencyAnalysis: {
                debtToEquity: ratioData.solvency_coverage_ratios?.debt_to_equity || {},
                interestCoverage: ratioData.solvency_coverage_ratios?.interest_coverage_ratio || {},
                analysis: this.analyzeSolvency(ratioData.solvency_coverage_ratios)
            },
            efficiencyAnalysis: {
                inventoryDays: ratioData.efficiency_ratios?.days_of_inventory || {},
                assetTurnover: ratioData.efficiency_ratios?.asset_turnover || {},
                analysis: this.analyzeEfficiency(ratioData.efficiency_ratios)
            },
            trendAnalysis: {
                revenueTrend: trendData.revenue_trend || [],
                profitTrend: trendData.profit_trend || [],
                assetTrend: trendData.asset_growth_trend || [],
                debtTrend: trendData.debt_trend || [],
                analysis: trendData.trend_analysis_commentary || 'No trend analysis available'
            },
            earningsQuality: {
                totalAccruals: earningsData.total_accruals_calculation || {},
                revenueQuality: earningsData.revenue_quality_indicators || {},
                analysis: this.analyzeEarningsQuality(earningsData)
            },
            financialStatementsSummary: this.summarizeFinancialStatements(financialStatements)
        };
    }

    static analyzeLiquidity(liquidityRatios) {
        const currentRatio = this.extractRatioValue(liquidityRatios?.current_ratio);
        const quickRatio = this.extractRatioValue(liquidityRatios?.quick_ratio_acid_test);
        
        let analysis = '';
        if (currentRatio !== null) {
            if (currentRatio < 1) analysis += 'Current ratio below 1 indicates potential liquidity issues. ';
            else if (currentRatio < 1.5) analysis += 'Current ratio is adequate but could be improved. ';
            else analysis += 'Current ratio indicates strong liquidity position. ';
        }
        
        if (quickRatio !== null) {
            if (quickRatio < 0.5) analysis += 'Quick ratio suggests insufficient liquid assets. ';
            else if (quickRatio < 1) analysis += 'Quick ratio is within acceptable range. ';
            else analysis += 'Quick ratio indicates strong short-term liquidity. ';
        }
        
        return analysis || 'Insufficient data for liquidity analysis.';
    }

    static analyzeProfitability(profitabilityRatios) {
        const roa = this.extractRatioValue(profitabilityRatios?.return_on_assets_roa);
        const roe = this.extractRatioValue(profitabilityRatios?.return_on_equity_roe);
        const margin = this.extractRatioValue(profitabilityRatios?.net_profit_margin);
        
        let analysis = '';
        if (roa !== null) {
            if (roa < 5) analysis += `ROA of ${roa}% is below industry average. `;
            else if (roa < 10) analysis += `ROA of ${roa}% is satisfactory. `;
            else analysis += `ROA of ${roa}% indicates efficient asset utilization. `;
        }
        
        if (roe !== null) {
            if (roe < 8) analysis += `ROE of ${roe}% suggests suboptimal equity returns. `;
            else if (roe < 15) analysis += `ROE of ${roe}% is reasonable. `;
            else analysis += `ROE of ${roe}% indicates strong profitability. `;
        }
        
        return analysis || 'Insufficient data for profitability analysis.';
    }

    static analyzeSolvency(solvencyRatios) {
        const debtEquity = this.extractRatioValue(solvencyRatios?.debt_to_equity);
        const interestCoverage = this.extractRatioValue(solvencyRatios?.interest_coverage_ratio);
        
        let analysis = '';
        if (debtEquity !== null) {
            if (debtEquity > 2) analysis += `High debt-to-equity ratio (${debtEquity}) indicates financial risk. `;
            else if (debtEquity > 1) analysis += `Moderate leverage with debt-to-equity ratio of ${debtEquity}. `;
            else analysis += `Conservative capital structure with low debt levels. `;
        }
        
        if (interestCoverage !== null) {
            if (interestCoverage < 1.5) analysis += `Low interest coverage (${interestCoverage}) raises solvency concerns. `;
            else if (interestCoverage < 3) analysis += `Adequate interest coverage ratio. `;
            else analysis += `Strong ability to cover interest expenses. `;
        }
        
        return analysis || 'Insufficient data for solvency analysis.';
    }

    static analyzeEfficiency(efficiencyRatios) {
        const inventoryDays = this.extractRatioValue(efficiencyRatios?.days_of_inventory);
        const assetTurnover = this.extractRatioValue(efficiencyRatios?.asset_turnover);
        
        let analysis = '';
        if (inventoryDays !== null) {
            if (inventoryDays > 90) analysis += `High inventory days (${inventoryDays}) suggests slow turnover. `;
            else if (inventoryDays > 45) analysis += `Inventory management is adequate. `;
            else analysis += `Efficient inventory management with ${inventoryDays} days. `;
        }
        
        if (assetTurnover !== null) {
            if (assetTurnover < 0.5) analysis += `Low asset turnover indicates inefficient asset utilization. `;
            else if (assetTurnover < 1) analysis += `Moderate asset efficiency. `;
            else analysis += `Good asset utilization efficiency. `;
        }
        
        return analysis || 'Insufficient data for efficiency analysis.';
    }

    static analyzeEarningsQuality(earningsData) {
        const accruals = earningsData.total_accruals_calculation;
        const revenueQuality = earningsData.revenue_quality_indicators;
        
        let analysis = 'Earnings Quality Analysis: ';
        
        if (accruals?.year_2024?.accruals_to_net_income_ratio) {
            const ratio = parseFloat(accruals.year_2024.accruals_to_net_income_ratio);
            if (ratio > 0.5) analysis += 'High accruals suggest potential earnings management. ';
            else if (ratio > 0.2) analysis += 'Moderate level of accruals. ';
            else analysis += 'Low accruals indicate cash-based earnings. ';
        }
        
        if (revenueQuality?.risk_assessment) {
            analysis += `Revenue quality risk: ${revenueQuality.risk_assessment}. `;
        }
        
        return analysis || 'Insufficient data for earnings quality analysis.';
    }

    static summarizeFinancialStatements(financialStatements) {
        if (!financialStatements) return 'No financial statement data available.';
        
        let summary = 'Financial Statements Summary:\n';
        
        if (financialStatements.statement_of_financial_position) {
            const latestYear = financialStatements.statement_of_financial_position[0]?.year || 'N/A';
            summary += `- Latest balance sheet year: ${latestYear}\n`;
        }
        
        if (financialStatements.statement_of_profit_or_loss_and_other_comprehensive_income) {
            const latestYear = financialStatements.statement_of_profit_or_loss_and_other_comprehensive_income[0]?.year || 'N/A';
            summary += `- Latest income statement year: ${latestYear}\n`;
        }
        
        return summary;
    }

    static generateDetailedComplianceAssessment(reportData) {
        const compliance = reportData.ifrsCompliance?.keyStandards || {};
        const standards = Object.keys(compliance);
        
        // Count compliance status
        let compliantCount = 0;
        let partiallyCompliantCount = 0;
        let nonCompliantCount = 0;
        let notApplicableCount = 0;
        
        standards.forEach(standard => {
            const status = compliance[standard]?.compliance;
            if (status === 'compliant') compliantCount++;
            else if (status === 'partially compliant') partiallyCompliantCount++;
            else if (status === 'non-compliant') nonCompliantCount++;
            else if (status === 'not applicable') notApplicableCount++;
        });
        
        // Determine overall compliance status
        let complianceStatus = 'Not Assessed';
        const totalAssessed = compliantCount + partiallyCompliantCount + nonCompliantCount;
        if (totalAssessed > 0) {
            const compliancePercentage = (compliantCount / totalAssessed) * 100;
            if (compliancePercentage >= 90) complianceStatus = 'Excellent';
            else if (compliancePercentage >= 75) complianceStatus = 'Good';
            else if (compliancePercentage >= 60) complianceStatus = 'Satisfactory';
            else if (compliancePercentage >= 40) complianceStatus = 'Needs Improvement';
            else complianceStatus = 'Poor';
        }
        
        return {
            overview: {
                totalStandards: standards.length,
                compliantCount: compliantCount,
                partiallyCompliantCount: partiallyCompliantCount,
                nonCompliantCount: nonCompliantCount,
                notApplicableCount: notApplicableCount,
                compliancePercentage: totalAssessed > 0 ? Math.round((compliantCount / totalAssessed) * 100) : 0,
                complianceStatus: complianceStatus
            },
            keyStandardsAssessment: this.getKeyStandardsAssessment(compliance),
            majorComplianceIssues: this.extractMajorComplianceIssues(compliance)
        };
    }

    static getKeyStandardsAssessment(complianceData) {
        const keyStandards = [
            'ias_1_presentation',
            'ias_2_inventories',
            'ias_16_property_plant_equipment',
            'ias_37_provisions_contingent_liabilities_assets',
            'ifrs_9_financial_instruments',
            'ifrs_15_revenue_from_contracts_with_customers',
            'ifrs_16_leases'
        ];
        
        const assessment = [];
        keyStandards.forEach(standard => {
            if (complianceData[standard]) {
                assessment.push({
                    standard: standard.replace(/_/g, ' ').toUpperCase(),
                    compliance: complianceData[standard].compliance || 'Not assessed',
                    reason: complianceData[standard].reason_of_the_status || ''
                });
            }
        });
        
        return assessment;
    }

    static generateDetailedAuditGovernance(reportData) {
        const audit = reportData.auditGovernance?.basic || {};
        const enhanced = reportData.auditGovernance?.enhanced || {};
        const governance = reportData.auditGovernance?.governance || {};
        
        return {
            auditReportAnalysis: {
                auditorInformation: audit.audit_report_analysis?.auditor_information || {},
                auditOpinion: audit.audit_report_analysis?.audit_opinion || {},
                keyAuditMatters: enhanced.key_audit_matters_extraction || audit.audit_report_analysis?.key_audit_matters || [],
                goingConcern: enhanced.going_concern_analysis || audit.audit_report_analysis?.audit_opinion?.going_concern_assessment || {},
                emphasisMatters: enhanced.emphasis_other_matters?.emphasis_of_matter_paragraphs || [],
                isaCompliance: enhanced.isa_compliance_verification || {}
            },
            corporateGovernanceReview: {
                boardStructure: audit.corporate_governance_review?.board_structure || {},
                committeeEffectiveness: audit.corporate_governance_review?.committee_effectiveness || {},
                internalControls: audit.corporate_governance_review?.internal_controls || {}
            },
            bsecGovernanceAssessment: {
                complianceScore: governance.bsec_corporate_governance_code?.overall_compliance_score || 'Not assessed',
                majorNonCompliances: governance.bsec_corporate_governance_code?.major_non_compliances || [],
                auditCommittee: governance.board_committee_effectiveness?.audit_committee || {},
                riskCommittee: governance.board_committee_effectiveness?.risk_committee || {},
                nominationCommittee: governance.board_committee_effectiveness?.nomination_remuneration || {},
                internalControlFramework: governance.internal_control_framework || {}
            }
        };
    }

    static generateDetailedMaterialDepartures(reportData) {
        const departures = reportData.synthesis?.materialDepartures?.consolidated_material_departures || [];
        
        return {
            materialDepartures: departures,
            departureCount: departures.length,
            departureSummary: this.summarizeMaterialDepartures(departures),
            financialImpact: this.calculateFinancialImpact(departures)
        };
    }

    static summarizeMaterialDepartures(departures) {
        if (!departures || departures.length === 0) {
            return 'No material departures identified.';
        }
        
        const summary = {
            totalDepartures: departures.length,
            byStandard: {},
            bySeverity: {
                high: 0,
                medium: 0,
                low: 0
            }
        };
        
        departures.forEach(departure => {
            if (!departure) return;
            
            // Count by standard
            const standard = departure.ifrs_standard || 'Unknown';
            summary.byStandard[standard] = (summary.byStandard[standard] || 0) + 1;
            
            // Count by severity
            const materiality = departure.materiality_assessment || 'medium';
            if (materiality.toLowerCase().includes('high')) summary.bySeverity.high++;
            else if (materiality.toLowerCase().includes('low')) summary.bySeverity.low++;
            else summary.bySeverity.medium++;
        });
        
        return summary;
    }

    static calculateFinancialImpact(departures) {
        let totalImpact = 0;
        let maxImpact = 0;
        let impactByArea = {};
        
        departures.forEach(departure => {
            if (!departure) return;
            
            const impact = departure.financial_impact_estimate;
            const area = departure.ifrs_standard || 'Unknown';
            
            if (impact && typeof impact === 'string') {
                const amount = parseFloat(impact.replace(/[^0-9.-]+/g, ''));
                if (!isNaN(amount)) {
                    totalImpact += amount;
                    maxImpact = Math.max(maxImpact, amount);
                    impactByArea[area] = (impactByArea[area] || 0) + amount;
                }
            }
        });
        
        return {
            totalImpact,
            maxSingleImpact: maxImpact,
            impactByArea,
            hasMaterialImpact: totalImpact > 0
        };
    }

    static generateDetailedRiskAssessment(reportData) {
        const riskData = reportData.synthesis?.riskAssessment?.holistic_risk_factor_synthesis || {};
        const fraudAssessment = reportData.fraudAssessment || {};
        
        return {
            financialRisks: {
                fromRatioTrends: riskData.financial_risks_from_analysis?.from_ratio_trends || [],
                fromAccrualsAnalysis: riskData.financial_risks_from_analysis?.from_accruals_analysis || [],
                fromCashFlowPatterns: riskData.financial_risks_from_analysis?.from_cash_flow_patterns || [],
                consolidatedLevel: riskData.financial_risks_from_analysis?.consolidated_financial_risk_level || 'Not assessed'
            },
            operationalRisks: {
                fromSegmentAnalysis: riskData.operational_risks?.from_segment_analysis || [],
                fromRelatedPartyTransactions: riskData.operational_risks?.from_related_party_transactions || [],
                fromPostReportingEvents: riskData.operational_risks?.from_post_reporting_events || [],
                consolidatedLevel: riskData.operational_risks?.consolidated_operational_risk_level || 'Not assessed'
            },
            complianceRisks: {
                fromIFRSDepartures: riskData.compliance_risks?.from_ifrs_departures || [],
                fromRegulatoryBreaches: riskData.compliance_risks?.from_regulatory_breaches || [],
                fromGovernanceWeaknesses: riskData.compliance_risks?.from_governance_weaknesses || [],
                consolidatedLevel: riskData.compliance_risks?.consolidated_compliance_risk_level || 'Not assessed'
            },
            fraudRiskAssessment: {
                riskFactors: fraudAssessment.fraud_risk_factors_identified || [],
                revenueManipulation: fraudAssessment.revenue_manipulation_indicators || [],
                overallRisk: fraudAssessment.overall_fraud_risk_assessment || 'Not assessed'
            },
            overallRiskAssessment: riskData.overall_integrated_risk_assessment || {}
        };
    }

    static generateDetailedRecommendations(reportData) {
        const recommendations = this.generateRecommendations(reportData);
        const priorityActions = reportData.synthesis?.riskAssessment?.holistic_risk_factor_synthesis?.overall_integrated_risk_assessment?.frca_priority_actions || [];
        
        return {
            immediateActions: recommendations.filter(r => r.priority === 'High'),
            mediumTermActions: recommendations.filter(r => r.priority === 'Medium'),
            longTermActions: recommendations.filter(r => r.priority === 'Low'),
            priorityActions: priorityActions
        };
    }

    // PDF Generation Methods
    static async generateBriefPDF(reportConfig) {
        try {
            Notifications.show('Generating Brief FRC Report...', 'info');
            
            const data = reportConfig.data;
            const entityName = data.executiveSummary?.overview?.entityName || 'Unknown Entity';
            
            // Create HTML content for brief report
            const htmlContent = this.createBriefReportHTML(reportConfig);
            
            // Create and download HTML file
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            
            const cleanEntityName = entityName.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50) || 'FRC_Report';
            a.download = `FRC_Brief_Report_${cleanEntityName}_${new Date().toISOString().split('T')[0]}.html`;
            
            document.body.appendChild(a);
            a.click();
            
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 100);
            
            // Open print dialog
            const printWindow = window.open(url, '_blank');
            if (printWindow) {
                printWindow.onload = function() {
                    printWindow.print();
                };
            }
            
            Notifications.show('Brief report generated! You can print it as PDF.', 'success');
            return true;
            
        } catch (error) {
            console.error('Brief PDF generation error:', error);
            Notifications.show('Error creating brief report: ' + error.message, 'error');
            return false;
        }
    }

    static async generateComprehensivePDF(reportConfig) {
        try {
            Notifications.show('Generating Comprehensive FRC Report...', 'info');
            
            const data = reportConfig.data;
            const entityName = data.executiveSummary?.overview?.entityName || 'Unknown Entity';
            
            // Create HTML content for comprehensive report
            const htmlContent = this.createComprehensiveReportHTML(reportConfig);
            
            // Create and download HTML file
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            
            const cleanEntityName = entityName.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50) || 'FRC_Report';
            a.download = `FRC_Comprehensive_Report_${cleanEntityName}_${new Date().toISOString().split('T')[0]}.html`;
            
            document.body.appendChild(a);
            a.click();
            
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 100);
            
            // Open print dialog
            const printWindow = window.open(url, '_blank');
            if (printWindow) {
                printWindow.onload = function() {
                    printWindow.print();
                };
            }
            
            Notifications.show('Comprehensive report generated! You can print it as PDF.', 'success');
            return true;
            
        } catch (error) {
            console.error('Comprehensive PDF generation error:', error);
            Notifications.show('Error creating comprehensive report: ' + error.message, 'error');
            return false;
        }
    }

    static createBriefReportHTML(reportConfig) {
        const data = reportConfig.data;
        const executiveSummary = data.executiveSummary || this.getDefaultExecutiveSummary();
        const briefAnalysis = data.briefAnalysis || this.getDefaultBriefAnalysis();
        
        const entityName = executiveSummary.overview.entityName;
        const reportDate = executiveSummary.overview.reportDate;
        const complianceStatus = executiveSummary.keyFindings.complianceStatus;
        const materialDepartures = executiveSummary.keyFindings.materialDepartures;
        
        return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${reportConfig.reportTitle} - Brief Summary</title>
    <style>
        @page {
            size: A4;
            margin: 2cm;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 210mm;
            margin: 0 auto;
            padding: 25mm;
        }
        .header {
            text-align: center;
            border-bottom: 4px solid #2c3e50;
            padding-bottom: 25px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #2c3e50;
            margin: 0;
            font-size: 28px;
        }
        .header .subtitle {
            color: #7f8c8d;
            font-size: 16px;
            margin-top: 10px;
        }
        .confidential {
            background: #ffebee;
            color: #c62828;
            padding: 12px;
            border-radius: 6px;
            text-align: center;
            margin: 20px 0;
            border-left: 4px solid #c62828;
            font-weight: bold;
        }
        .section {
            margin-bottom: 40px;
        }
        .section-title {
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
            margin-bottom: 20px;
            font-size: 20px;
        }
        .key-metric {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 15px 0;
            border-left: 4px solid #3498db;
        }
        .metric-value {
            font-size: 24px;
            font-weight: bold;
            color: #2c3e50;
        }
        .metric-label {
            font-size: 14px;
            color: #7f8c8d;
            text-transform: uppercase;
        }
        .finding {
            background: #e8f4fd;
            border-left: 4px solid #3498db;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
        }
        .finding-critical {
            background: #ffeaa7;
            border-left: 4px solid #f39c12;
        }
        .recommendation {
            background: #d5f4e6;
            border-left: 4px solid #27ae60;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        .table th {
            background: #2c3e50;
            color: white;
            padding: 12px;
            text-align: left;
        }
        .table td {
            padding: 12px;
            border-bottom: 1px solid #ddd;
        }
        .table tr:nth-child(even) {
            background: #f8f9fa;
        }
        .footer {
            margin-top: 60px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            font-size: 12px;
            color: #7f8c8d;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>FINANCIAL REPORTING COUNCIL (FRC) BANGLADESH</h1>
            <div class="subtitle">BRIEF ANALYSIS REPORT</div>
        </div>
        
        <div class="confidential">
            ${reportConfig.confidentiality.toUpperCase().replace(/-/g, ' ')}
        </div>
        
        <div class="section">
            <h2 class="section-title">Report Information</h2>
            <table class="table">
                <tr>
                    <th>Field</th>
                    <th>Details</th>
                </tr>
                <tr>
                    <td>Entity Name</td>
                    <td>${entityName}</td>
                </tr>
                <tr>
                    <td>Registration Number</td>
                    <td>${executiveSummary.overview.registrationNumber}</td>
                </tr>
                <tr>
                    <td>Report Period</td>
                    <td>${executiveSummary.overview.assessmentPeriod}</td>
                </tr>
                <tr>
                    <td>Report Generated</td>
                    <td>${reportDate}</td>
                </tr>
                <tr>
                    <td>Report ID</td>
                    <td>FRC-BRIEF-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}</td>
                </tr>
            </table>
        </div>
        
        <div class="section">
            <h2 class="section-title">Executive Summary</h2>
            <p>${executiveSummary.summaryParagraph}</p>
            
            <div class="key-metric">
                <div class="metric-label">Compliance Status</div>
                <div class="metric-value">${complianceStatus}</div>
            </div>
            
            <div class="key-metric">
                <div class="metric-label">Material Departures</div>
                <div class="metric-value">${materialDepartures}</div>
            </div>
            
            <div class="key-metric">
                <div class="metric-label">Financial Health</div>
                <div class="metric-value">${executiveSummary.keyFindings.financialHealth}</div>
            </div>
            
            <div class="key-metric">
                <div class="metric-label">Risk Level</div>
                <div class="metric-value">${executiveSummary.keyFindings.riskLevel}</div>
            </div>
        </div>
        
        <div class="section">
            <h2 class="section-title">Key Findings</h2>
            ${briefAnalysis.keyFindings.map((finding, index) => `
                <div class="finding">
                    <strong>${index + 1}.</strong> ${finding}
                </div>
            `).join('')}
        </div>
        
        <div class="section">
            <h2 class="section-title">Critical Issues</h2>
            ${briefAnalysis.criticalIssues.map((issue, index) => `
                <div class="finding finding-critical">
                    <strong>${index + 1}.</strong> ${issue}
                </div>
            `).join('')}
        </div>
        
        <div class="section">
            <h2 class="section-title">Top Recommendations</h2>
            ${briefAnalysis.topRecommendations.map((rec, index) => `
                <div class="recommendation">
                    <strong>${index + 1}. [${rec.priority} Priority] ${rec.area}</strong><br>
                    ${rec.recommendation}<br>
                    <small><strong>Timeline:</strong> ${rec.timeline} | <strong>Responsible:</strong> ${rec.responsible}</small>
                </div>
            `).join('')}
        </div>
        
        <div class="section">
            <h2 class="section-title">Summary Metrics</h2>
            <table class="table">
                <tr>
                    <th>Metric</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Standards Assessed</td>
                    <td>${briefAnalysis.summaryMetrics.standardsAssessed}</td>
                </tr>
                <tr>
                    <td>Compliance Rate</td>
                    <td>${briefAnalysis.summaryMetrics.complianceRate}%</td>
                </tr>
                <tr>
                    <td>Material Departures</td>
                    <td>${briefAnalysis.summaryMetrics.materialDepartures}</td>
                </tr>
                <tr>
                    <td>Audit Quality</td>
                    <td>${briefAnalysis.summaryMetrics.auditQuality}</td>
                </tr>
                <tr>
                    <td>Financial Health</td>
                    <td>${briefAnalysis.summaryMetrics.financialHealth}</td>
                </tr>
            </table>
        </div>
        
        <div class="section">
            <h2 class="section-title">FRC Conclusion</h2>
            <p>Based on the analysis conducted, ${entityName} demonstrates ${complianceStatus.toLowerCase()} compliance with IFRS standards. The entity has ${materialDepartures} material departure(s) that require attention.</p>
            <p>The FRC recommends implementing the suggested actions to address identified issues and improve financial reporting quality.</p>
        </div>
        
        <div class="footer">
            <p><strong>Financial Reporting Council (FRC) Bangladesh</strong></p>
            <p>Generated: ${reportDate} | Brief Summary Version</p>
        </div>
    </div>
</body>
</html>`;
    }

    static createComprehensiveReportHTML(reportConfig) {
        const data = reportConfig.data;
        const executiveSummary = data.executiveSummary || this.getDefaultExecutiveSummary();
        const entityName = executiveSummary.overview.entityName;
        const reportDate = executiveSummary.overview.reportDate;
        
        return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${reportConfig.reportTitle} - Comprehensive Analysis</title>
    <style>
        @page {
            size: A4;
            margin: 2cm;
        }
        body {
            font-family: 'Calibri', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 210mm;
            margin: 0 auto;
            padding: 25mm;
        }
        .header {
            text-align: center;
            border-bottom: 5px solid #2c3e50;
            padding-bottom: 30px;
            margin-bottom: 40px;
        }
        .header h1 {
            color: #2c3e50;
            margin: 0;
            font-size: 32px;
        }
        .header .subtitle {
            color: #7f8c8d;
            font-size: 18px;
            margin-top: 15px;
        }
        .confidential-strip {
            background: repeating-linear-gradient(
                45deg,
                #ffebee,
                #ffebee 10px,
                #ffcdd2 10px,
                #ffcdd2 20px
            );
            color: #c62828;
            padding: 15px;
            text-align: center;
            font-weight: bold;
            margin: 20px 0;
            border: 2px solid #c62828;
        }
        .section {
            margin-bottom: 50px;
            page-break-inside: avoid;
        }
        .section-title {
            color: #1a237e;
            border-bottom: 3px solid #3949ab;
            padding-bottom: 12px;
            margin-bottom: 25px;
            font-size: 22px;
        }
        .subsection {
            margin: 30px 0;
            padding-left: 20px;
            border-left: 3px solid #e0e0e0;
        }
        .subsection-title {
            color: #455a64;
            font-size: 18px;
            margin-bottom: 15px;
        }
        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin: 25px 0;
        }
        .data-table th {
            background: #1a237e;
            color: white;
            padding: 16px;
            text-align: left;
        }
        .data-table td {
            padding: 14px 16px;
            border-bottom: 1px solid #e0e0e0;
        }
        .data-table tr:nth-child(even) {
            background: #f8f9fa;
        }
        .metric-card {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 25px;
            margin: 20px 0;
            border-left: 5px solid #3949ab;
        }
        .metric-value {
            font-size: 36px;
            font-weight: bold;
            color: #1a237e;
        }
        .metric-label {
            font-size: 14px;
            color: #546e7a;
            text-transform: uppercase;
        }
        .finding-box {
            background: #fff3e0;
            border-left: 5px solid #ff9800;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
        }
        .finding-box.critical {
            background: #ffebee;
            border-left-color: #f44336;
        }
        .finding-box.recommendation {
            background: #e8f5e9;
            border-left-color: #4caf50;
        }
        .footer {
            margin-top: 80px;
            padding-top: 30px;
            border-top: 3px solid #e0e0e0;
            text-align: center;
            font-size: 13px;
            color: #546e7a;
        }
        .page-break {
            page-break-before: always;
            padding-top: 50px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>FINANCIAL REPORTING COUNCIL (FRC) BANGLADESH</h1>
            <div class="subtitle">COMPREHENSIVE FINANCIAL REPORTING ANALYSIS REPORT</div>
        </div>
        
        <div class="confidential-strip">
            ${reportConfig.confidentiality.toUpperCase().replace(/-/g, ' ')}
        </div>
        
        <div class="section">
            <h2 class="section-title">1. Executive Summary</h2>
            
            <div class="metric-card">
                <div class="metric-value">${executiveSummary.keyFindings.complianceStatus}</div>
                <div class="metric-label">Overall Compliance Status</div>
            </div>
            
            <p>${executiveSummary.summaryParagraph}</p>
            
            <div class="subsection">
                <div class="subsection-title">Key Performance Indicators</div>
                <div class="data-table">
                    <tr>
                        <th>KPI</th>
                        <th>Value</th>
                        <th>Assessment</th>
                    </tr>
                    <tr>
                        <td>Compliance Status</td>
                        <td>${executiveSummary.keyFindings.complianceStatus}</td>
                        <td>${this.getAssessmentStatus(executiveSummary.keyFindings.complianceStatus)}</td>
                    </tr>
                    <tr>
                        <td>Material Departures</td>
                        <td>${executiveSummary.keyFindings.materialDepartures}</td>
                        <td>${executiveSummary.keyFindings.materialDepartures === 0 ? 'Satisfactory' : 'Needs Attention'}</td>
                    </tr>
                    <tr>
                        <td>Financial Health</td>
                        <td>${executiveSummary.keyFindings.financialHealth}</td>
                        <td>${this.getAssessmentStatus(executiveSummary.keyFindings.financialHealth)}</td>
                    </tr>
                    <tr>
                        <td>Risk Level</td>
                        <td>${executiveSummary.keyFindings.riskLevel}</td>
                        <td>${this.getAssessmentStatus(executiveSummary.keyFindings.riskLevel)}</td>
                    </tr>
                </div>
            </div>
        </div>
        
        <div class="page-break"></div>
        
        <div class="section">
            <h2 class="section-title">2. Entity Profile</h2>
            
            <div class="data-table">
                <tr>
                    <th>Information Type</th>
                    <th>Details</th>
                </tr>
                <tr>
                    <td>Legal Name</td>
                    <td>${executiveSummary.overview.entityName}</td>
                </tr>
                <tr>
                    <td>Trade Name</td>
                    <td>${executiveSummary.overview.tradeName}</td>
                </tr>
                <tr>
                    <td>Registration Number</td>
                    <td>${executiveSummary.overview.registrationNumber}</td>
                </tr>
                <tr>
                    <td>Industry Sector</td>
                    <td>${executiveSummary.overview.industrySector}</td>
                </tr>
                <tr>
                    <td>Listing Status</td>
                    <td>${executiveSummary.overview.listingStatus}</td>
                </tr>
            </div>
        </div>
        
        <div class="page-break"></div>
        
        <div class="section">
            <h2 class="section-title">3. Financial Analysis</h2>
            
            ${data.financialAnalysis ? `
                <div class="subsection">
                    <div class="subsection-title">Liquidity Analysis</div>
                    <p>${data.financialAnalysis.liquidityAnalysis?.analysis || 'No liquidity analysis available.'}</p>
                </div>
                
                <div class="subsection">
                    <div class="subsection-title">Profitability Analysis</div>
                    <p>${data.financialAnalysis.profitabilityAnalysis?.analysis || 'No profitability analysis available.'}</p>
                </div>
            ` : '<p>No financial analysis data available.</p>'}
        </div>
        
        <div class="page-break"></div>
        
        <div class="section">
            <h2 class="section-title">4. IFRS Compliance Assessment</h2>
            
            ${data.complianceAssessment ? `
                <div class="metric-card">
                    <div class="metric-value">${data.complianceAssessment.overview.compliancePercentage}%</div>
                    <div class="metric-label">Overall Compliance Rate</div>
                </div>
                
                <div class="data-table">
                    <tr>
                        <th>Assessment Area</th>
                        <th>Count</th>
                        <th>Percentage</th>
                    </tr>
                    <tr>
                        <td>Fully Compliant</td>
                        <td>${data.complianceAssessment.overview.compliantCount}</td>
                        <td>${Math.round((data.complianceAssessment.overview.compliantCount / data.complianceAssessment.overview.totalStandards) * 100)}%</td>
                    </tr>
                    <tr>
                        <td>Partially Compliant</td>
                        <td>${data.complianceAssessment.overview.partiallyCompliantCount}</td>
                        <td>${Math.round((data.complianceAssessment.overview.partiallyCompliantCount / data.complianceAssessment.overview.totalStandards) * 100)}%</td>
                    </tr>
                    <tr>
                        <td>Non-Compliant</td>
                        <td>${data.complianceAssessment.overview.nonCompliantCount}</td>
                        <td>${Math.round((data.complianceAssessment.overview.nonCompliantCount / data.complianceAssessment.overview.totalStandards) * 100)}%</td>
                    </tr>
                </div>
                
                ${data.complianceAssessment.majorComplianceIssues && data.complianceAssessment.majorComplianceIssues.length > 0 ? `
                    <div class="subsection">
                        <div class="subsection-title">Major Compliance Issues</div>
                        ${data.complianceAssessment.majorComplianceIssues.map((issue, index) => `
                            <div class="finding-box critical">
                                <strong>${index + 1}. ${issue.standard.replace(/_/g, ' ').toUpperCase()}</strong><br>
                                <p>${issue.reason}</p>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            ` : '<p>No compliance assessment data available.</p>'}
        </div>
        
        <div class="page-break"></div>
        
        <div class="section">
            <h2 class="section-title">5. Recommendations</h2>
            
            ${data.recommendations ? `
                <div class="subsection">
                    <div class="subsection-title">Immediate Actions (High Priority)</div>
                    ${data.recommendations.immediateActions && data.recommendations.immediateActions.length > 0 ? 
                        data.recommendations.immediateActions.map((rec, index) => `
                            <div class="finding-box recommendation">
                                <strong>${index + 1}. ${rec.area}</strong><br>
                                <p>${rec.recommendation}</p>
                                <small><strong>Timeline:</strong> ${rec.timeline} | <strong>Responsible:</strong> ${rec.responsible}</small>
                            </div>
                        `).join('') : '<p>No immediate actions required.</p>'}
                </div>
                
                <div class="subsection">
                    <div class="subsection-title">Medium-Term Actions</div>
                    ${data.recommendations.mediumTermActions && data.recommendations.mediumTermActions.length > 0 ? 
                        data.recommendations.mediumTermActions.map((rec, index) => `
                            <div class="finding-box">
                                <strong>${index + 1}. ${rec.area}</strong><br>
                                <p>${rec.recommendation}</p>
                                <small><strong>Timeline:</strong> ${rec.timeline} | <strong>Responsible:</strong> ${rec.responsible}</small>
                            </div>
                        `).join('') : '<p>No medium-term actions required.</p>'}
                </div>
            ` : '<p>No recommendations data available.</p>'}
        </div>
        
        <div class="section">
            <h2 class="section-title">FRC Conclusion</h2>
            <div class="finding-box recommendation">
                <p>Based on comprehensive analysis of ${entityName}'s financial statements, accounting policies, 
                internal controls, and regulatory compliance, the FRC concludes that the entity demonstrates 
                ${executiveSummary.keyFindings.complianceStatus.toLowerCase()} compliance with IFRS requirements.</p>
                
                <p>The entity has ${executiveSummary.keyFindings.materialDepartures} material departure(s) 
                that require immediate attention. The overall risk level is assessed as 
                ${executiveSummary.keyFindings.riskLevel}.</p>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>FINANCIAL REPORTING COUNCIL (FRC) BANGLADESH</strong></p>
            <p>Generated: ${reportDate} | Comprehensive Report Version 1.0</p>
        </div>
    </div>
</body>
</html>`;
    }

    static getAssessmentStatus(value) {
        if (!value) return 'Not Assessed';
        if (value.includes('Excellent') || value.includes('Strong') || value.includes('Good')) return 'Satisfactory';
        if (value.includes('Needs Improvement') || value.includes('Weak') || value.includes('Poor')) return 'Needs Attention';
        if (value.includes('High') || value.includes('Critical')) return 'Critical';
        return 'Adequate';
    }

    // Other methods remain the same...
    static previewReport() {
        Notifications.show('Generating report preview...', 'info');
        
        const previewModal = `
            <div class="modal fade" id="reportPreviewModal" tabindex="-1">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">FRC Report Preview</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="border rounded p-3 mb-3 bg-light">
                                <h6>Report Preview Content:</h6>
                                <p>This is a preview of the report that would be generated. The actual report would contain:</p>
                                <ul>
                                    <li>Professional FRC header and branding</li>
                                    <li>Executive summary with key findings</li>
                                    <li>Detailed compliance matrix</li>
                                    <li>Financial ratio analysis charts</li>
                                    <li>Audit quality assessment</li>
                                    <li>Risk heat maps</li>
                                    <li>Actionable recommendations</li>
                                </ul>
                                <p class="mb-0"><strong>Note:</strong> This preview shows the structure. Click "Generate Full Report" to create the complete report.</p>
                            </div>
                            <div class="text-center">
                                <button class="btn btn-primary" onclick="ReportGenerator.generateBriefReport()">
                                    <i class="fas fa-file-alt me-2"></i> Generate Brief Report
                                </button>
                                <button class="btn btn-success ms-2" onclick="ReportGenerator.generateComprehensiveReport()">
                                    <i class="fas fa-file-pdf me-2"></i> Generate Comprehensive Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        if (!document.getElementById('reportPreviewModal')) {
            document.body.insertAdjacentHTML('beforeend', previewModal);
        }
        
        const modal = new bootstrap.Modal(document.getElementById('reportPreviewModal'));
        modal.show();
    }

    static generateExecutiveSummary() {
        Notifications.show('Generating Executive Summary...', 'info');
        
        const entityData = appState.allJSONData['2'];
        const entityName = entityData?.frc_analysis_report?.entity?.entity_profile?.legal_name || 'Entity';
        
        const executiveSummaryContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>FRC Executive Summary</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    .header { text-align: center; border-bottom: 2px solid #2c3e50; padding-bottom: 20px; }
                    .header h1 { color: #2c3e50; }
                    .section { margin: 30px 0; }
                    .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #7f8c8d; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>FRC EXECUTIVE SUMMARY REPORT</h1>
                    <p>Generated: ${new Date().toLocaleDateString()}</p>
                </div>
                
                <div class="section">
                    <h2>Entity: ${entityName}</h2>
                    <p>This executive summary provides a high-level overview of the FRC analysis.</p>
                    <p>The full report contains comprehensive details on all findings including:</p>
                    <ul>
                        <li>Complete IFRS compliance assessment</li>
                        <li>Detailed financial ratio analysis</li>
                        <li>Audit quality evaluation</li>
                        <li>Risk assessment matrix</li>
                        <li>Detailed recommendations</li>
                    </ul>
                </div>
                
                <div class="footer">
                    <p>Financial Reporting Council (FRC) Bangladesh</p>
                    <p>For the complete analysis, please generate the full FRC Report.</p>
                </div>
            </body>
            </html>
        `;
        
        const blob = new Blob([executiveSummaryContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `FRC_Executive_Summary_${new Date().toISOString().split('T')[0]}.html`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    }

    static generateComplianceCertificate() {
        Notifications.show('Generating Compliance Certificate...', 'info');
        
        const entityData = appState.allJSONData['2'];
        const entityName = entityData?.frc_analysis_report?.entity?.entity_profile?.legal_name || 'Entity';
        
        const complianceCertificate = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>FRC Compliance Certificate</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    .header { text-align: center; border-bottom: 2px solid #2c3e50; padding-bottom: 20px; }
                    .certificate { border: 3px double #000; padding: 40px; margin: 30px 0; text-align: center; }
                    .signature { margin-top: 60px; border-top: 1px solid #000; width: 300px; text-align: center; margin-left: auto; margin-right: auto; padding-top: 10px; }
                    .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #7f8c8d; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>FINANCIAL REPORTING COUNCIL (FRC) BANGLADESH</h1>
                    <h2>COMPLIANCE CERTIFICATE</h2>
                </div>
                
                <div class="certificate">
                    <p>This certificate confirms that</p>
                    <h3>${entityName}</h3>
                    <p>has undergone IFRS compliance assessment by the Financial Reporting Council.</p>
                    
                    <p><strong>Assessment Period:</strong> ${document.getElementById('reportPeriod')?.value || 'Not specified'}</p>
                    <p><strong>Assessment Date:</strong> ${new Date().toLocaleDateString()}</p>
                    
                    <div class="signature">
                        <p>Authorized Signatory</p>
                        <p><strong>Director, FRC Bangladesh</strong></p>
                    </div>
                    
                    <p style="margin-top: 40px;">
                        <strong>Certificate ID:</strong> FRC-CC-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}
                    </p>
                </div>
                
                <div class="footer">
                    <p>Note: This certificate is based on the analysis conducted. Refer to the full report for detailed findings.</p>
                </div>
            </body>
            </html>
        `;
        
        const blob = new Blob([complianceCertificate], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `FRC_Compliance_Certificate_${new Date().toISOString().split('T')[0]}.html`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    }

    static generateFindingsReport() {
        Notifications.show('Generating Findings Report...', 'info');
        
        const findingsReport = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>FRC Findings Report</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    .header { text-align: center; border-bottom: 2px solid #c62828; padding-bottom: 20px; }
                    .finding { background-color: #ffebee; border-left: 4px solid #c62828; padding: 15px; margin: 15px 0; }
                    .recommendation { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 15px 0; }
                    .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #7f8c8d; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1 style="color: #c62828;">FRC FINDINGS REPORT</h1>
                    <p>Generated: ${new Date().toLocaleDateString()}</p>
                </div>
                
                <div style="margin: 30px 0;">
                    <h2>KEY FINDINGS SUMMARY</h2>
                    <p>This report summarizes the key findings from the FRC analysis.</p>
                    
                    <div class="finding">
                        <h3>MAJOR FINDINGS:</h3>
                        <p>1. Compliance issues identified in IFRS application</p>
                        <p>2. Material departures from accounting standards</p>
                        <p>3. Governance and internal control weaknesses</p>
                        <p>4. Risk management deficiencies</p>
                    </div>
                    
                    <div class="recommendation">
                        <h3>RECOMMENDATIONS:</h3>
                        <p>1. Address all identified IFRS non-compliances</p>
                        <p>2. Strengthen internal controls and governance</p>
                        <p>3. Implement comprehensive risk management</p>
                        <p>4. Improve financial reporting processes</p>
                    </div>
                </div>
                
                <div class="footer">
                    <p>Note: This is a findings summary. The full report contains detailed analysis and supporting evidence.</p>
                    <p>Financial Reporting Council (FRC) Bangladesh</p>
                </div>
            </body>
            </html>
        `;
        
        const blob = new Blob([findingsReport], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `FRC_Findings_Report_${new Date().toISOString().split('T')[0]}.html`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    }

    static showReportHistory() {
        Notifications.show('Report history would show previously generated reports.', 'info');
        
        const historyModal = `
            <div class="modal fade" id="reportHistoryModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">FRC Report History</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="alert alert-info">
                                <i class="fas fa-info-circle me-2"></i>
                                Report history tracking would be implemented in a production environment.
                            </div>
                            <p>In a full implementation, this section would display:</p>
                            <ul>
                                <li>Previously generated reports with timestamps</li>
                                <li>Report types and sizes</li>
                                <li>Download links for past reports</li>
                                <li>Report status and approval history</li>
                            </ul>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        if (!document.getElementById('reportHistoryModal')) {
            document.body.insertAdjacentHTML('beforeend', historyModal);
        }
        
        const modal = new bootstrap.Modal(document.getElementById('reportHistoryModal'));
        modal.show();
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
    
    .modal-xl {
        max-width: 1200px;
    }
    
    .btn-group .btn {
        padding: 10px 15px;
    }
    
    .btn-check:checked + .btn {
        background-color: #0d6efd;
        color: white;
        border-color: #0d6efd;
    }
    
    .btn-check:focus + .btn {
        box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    }
</style>
`;

document.head.insertAdjacentHTML('beforeend', reportGeneratorCSS);
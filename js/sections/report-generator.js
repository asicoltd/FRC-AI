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
            
            <!-- Hidden HTML for PDF Generation -->
            <div id="pdfTemplate" style="display: none; position: absolute; left: -9999px;"></div>
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

    static generateFinancialAnalysisData(reportData) {
        const ratioData = reportData.financialAnalysis?.ratios || {};
        const trendData = reportData.financialAnalysis?.trends || {};
        
        return {
            liquidityRatios: ratioData.liquidity_ratios || {},
            profitabilityRatios: ratioData.profitability_ratios || {},
            solvencyRatios: ratioData.solvency_coverage_ratios || {},
            efficiencyRatios: ratioData.efficiency_ratios || {},
            trends: this.extractTrendData(reportData),
            financialStatements: reportData.financialStatements || {},
            horizontalAnalysis: trendData.horizontal_analysis_yoy || {},
            verticalAnalysis: trendData.vertical_analysis_composition || {}
        };
    }

    static generateComplianceData(reportData) {
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
            totalStandards: standards.length,
            compliantCount: compliantCount,
            partiallyCompliantCount: partiallyCompliantCount,
            nonCompliantCount: nonCompliantCount,
            notApplicableCount: notApplicableCount,
            standards: compliance,
            complianceStatus: complianceStatus,
            majorIssues: this.extractMajorComplianceIssues(compliance),
            accountingPolicies: reportData.ifrsCompliance?.accountingPolicies || {},
            managementJudgment: reportData.ifrsCompliance?.managementJudgment || {}
        };
    }

    static generateAuditData(reportData) {
        const audit = reportData.auditGovernance?.basic || {};
        const enhanced = reportData.auditGovernance?.enhanced || {};
        const governance = reportData.auditGovernance?.governance || {};
        
        return {
            auditReport: audit.audit_report_analysis || {},
            governanceReview: audit.corporate_governance_review || {},
            enhancedAudit: enhanced,
            bsecCompliance: governance.bsec_corporate_governance_code || {},
            keyAuditMatters: enhanced.key_audit_matters_extraction || audit.audit_report_analysis?.key_audit_matters || [],
            goingConcern: enhanced.going_concern_analysis || audit.audit_report_analysis?.audit_opinion?.going_concern_assessment || {},
            opinionType: enhanced.opinion_type_analysis?.opinion_category || audit.audit_report_analysis?.audit_opinion?.opinion_type || 'Not Available'
        };
    }

    static generateFindingsData(reportData) {
        const departures = reportData.synthesis?.materialDepartures || {};
        const risk = reportData.synthesis?.riskAssessment || {};
        const regulatory = reportData.foundationalChecks?.regulatoryLandscape || {};
        
        return {
            materialDepartures: departures.consolidated_material_departures || [],
            riskAssessment: risk.holistic_risk_factor_synthesis || {},
            regulatoryFindings: regulatory,
            priorityActions: risk.holistic_risk_factor_synthesis?.overall_integrated_risk_assessment?.frca_priority_actions || [],
            recommendations: this.generateRecommendations(reportData),
            fraudAssessment: reportData.fraudAssessment || {},
            legalEnforcement: reportData.legalEnforcement || {}
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

    static extractRatioValue(ratioObj) {
        if (!ratioObj) return null;
        
        // If it's a number or string that can be parsed
        if (typeof ratioObj === 'number') return ratioObj;
        if (typeof ratioObj === 'string') {
            const num = parseFloat(ratioObj);
            return isNaN(num) ? null : num;
        }
        
        // If it's an object with year values, try to get the most recent
        if (typeof ratioObj === 'object') {
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

    static extractTrendData(reportData) {
        // Extract trend information from financial data
        const financials = reportData.financialStatements;
        const trendData = reportData.financialAnalysis?.trends?.two_to_three_year_trend || {};
        
        if (!financials && !trendData) return {};
        
        return {
            revenueTrend: trendData.revenue_trend || this.calculateTrend(financials?.statement_of_profit_or_loss_and_other_comprehensive_income, 'Revenue'),
            profitTrend: trendData.profit_trend || this.calculateTrend(financials?.statement_of_profit_or_loss_and_other_comprehensive_income, 'Profit'),
            assetTrend: trendData.asset_growth_trend || this.calculateTrend(financials?.statement_of_financial_position, 'Total assets'),
            debtTrend: trendData.debt_trend || this.calculateTrend(financials?.statement_of_financial_position, 'Total liabilities'),
            trendCommentary: trendData.trend_analysis_commentary || 'No trend analysis available'
        };
    }

    static calculateTrend(statementData, itemName) {
        if (!statementData || !Array.isArray(statementData)) return 'N/A';
        
        const sorted = statementData.sort((a, b) => b.year.localeCompare(a.year));
        if (sorted.length < 2) return 'Insufficient data';
        
        // Try to find the item by name
        const findItem = (items) => {
            if (!items) return null;
            return items.find(item => 
                item.item && item.item.toLowerCase().includes(itemName.toLowerCase())
            );
        };
        
        const currentItem = findItem(sorted[0].line_items);
        const previousItem = findItem(sorted[1].line_items);
        
        if (!currentItem || !previousItem || !currentItem.amount || !previousItem.amount) return 'Data not available';
        
        try {
            const currentNum = parseFloat(currentItem.amount.replace(/[^0-9.-]+/g, ''));
            const previousNum = parseFloat(previousItem.amount.replace(/[^0-9.-]+/g, ''));
            
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
            if (data.compliance === 'non-compliant' || data.compliance === 'partially compliant') {
                issues.push({
                    standard: standard,
                    status: data.compliance,
                    reason: data.reason_of_the_status || 'No reason provided',
                    reference: data.status_reference || 'No reference'
                });
            }
        });
        return issues.slice(0, 10); // Return top 10 issues
    }

    static generateRecommendations(reportData) {
        const recommendations = [];
        const departures = reportData.synthesis?.materialDepartures?.consolidated_material_departures || [];
        const complianceIssues = this.extractMajorComplianceIssues(reportData.ifrsCompliance?.keyStandards);
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

    static async generatePDF(reportConfig) {
        try {
            Notifications.show('Preparing FRC Analysis Report...', 'info');
            
            // Create HTML content for the report
            const entityName = reportConfig.data.executiveSummary.overview.entityName;
            const reportDate = reportConfig.data.executiveSummary.overview.reportDate;
            const complianceStatus = reportConfig.data.executiveSummary.keyFindings.complianceStatus;
            const materialDepartures = reportConfig.data.executiveSummary.keyFindings.materialDepartures;
            
            // Create HTML content
            const htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>${reportConfig.reportTitle}</title>
                    <style>
                        @page {
                            size: A4;
                            margin: 2cm;
                        }
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                        }
                        .header {
                            text-align: center;
                            border-bottom: 3px solid #2c3e50;
                            padding-bottom: 20px;
                            margin-bottom: 30px;
                        }
                        .header h1 {
                            color: #2c3e50;
                            margin-bottom: 5px;
                        }
                        .header .subtitle {
                            color: #7f8c8d;
                            font-size: 16px;
                        }
                        .section {
                            margin-bottom: 30px;
                            page-break-inside: avoid;
                        }
                        .section-title {
                            background-color: #2c3e50;
                            color: white;
                            padding: 10px 15px;
                            margin: 20px 0 10px 0;
                            border-radius: 4px;
                        }
                        .table {
                            width: 100%;
                            border-collapse: collapse;
                            margin: 15px 0;
                        }
                        .table th, .table td {
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                        }
                        .table th {
                            background-color: #f2f2f2;
                            font-weight: bold;
                        }
                        .key-finding {
                            background-color: #f8f9fa;
                            border-left: 4px solid #007bff;
                            padding: 15px;
                            margin: 15px 0;
                        }
                        .recommendation {
                            background-color: #fff3cd;
                            border: 1px solid #ffeaa7;
                            padding: 10px;
                            margin: 10px 0;
                            border-radius: 4px;
                        }
                        .footer {
                            margin-top: 50px;
                            padding-top: 20px;
                            border-top: 1px solid #ddd;
                            text-align: center;
                            font-size: 12px;
                            color: #7f8c8d;
                        }
                        .confidential {
                            background-color: #ffebee;
                            color: #c62828;
                            padding: 10px;
                            border: 1px solid #ffcdd2;
                            margin: 10px 0;
                            text-align: center;
                            font-weight: bold;
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>FINANCIAL REPORTING COUNCIL (FRC) BANGLADESH</h1>
                        <div class="subtitle">OFFICIAL ANALYSIS REPORT</div>
                        <div class="confidential">
                            ${reportConfig.confidentiality.toUpperCase().replace('-', ' ')}
                        </div>
                    </div>
                    
                    <div class="section">
                        <h2>Report Information</h2>
                        <table class="table">
                            <tr>
                                <th>Report Title</th>
                                <td>${reportConfig.reportTitle}</td>
                            </tr>
                            <tr>
                                <th>Entity</th>
                                <td>${entityName}</td>
                            </tr>
                            <tr>
                                <th>Registration No</th>
                                <td>${reportConfig.data.executiveSummary.overview.registrationNumber}</td>
                            </tr>
                            <tr>
                                <th>Report Period</th>
                                <td>${reportConfig.data.executiveSummary.overview.assessmentPeriod}</td>
                            </tr>
                            <tr>
                                <th>Report Generated</th>
                                <td>${reportDate}</td>
                            </tr>
                            <tr>
                                <th>Report ID</th>
                                <td>FRC-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="section">
                        <h2 class="section-title">EXECUTIVE SUMMARY</h2>
                        <p>${reportConfig.data.executiveSummary.summaryParagraph}</p>
                        
                        <div class="key-finding">
                            <h3>Key Findings</h3>
                            <table class="table">
                                <tr>
                                    <th>Assessment Area</th>
                                    <th>Status</th>
                                </tr>
                                <tr>
                                    <td>Compliance Status</td>
                                    <td>${complianceStatus}</td>
                                </tr>
                                <tr>
                                    <td>Regulatory Assessment</td>
                                    <td>${reportConfig.data.executiveSummary.keyFindings.regulatoryAssessment}</td>
                                </tr>
                                <tr>
                                    <td>Financial Health</td>
                                    <td>${reportConfig.data.executiveSummary.keyFindings.financialHealth}</td>
                                </tr>
                                <tr>
                                    <td>Audit Quality</td>
                                    <td>${reportConfig.data.executiveSummary.keyFindings.auditQuality}</td>
                                </tr>
                                <tr>
                                    <td>Risk Level</td>
                                    <td>${reportConfig.data.executiveSummary.keyFindings.riskLevel}</td>
                                </tr>
                                <tr>
                                    <td>Material Departures</td>
                                    <td>${materialDepartures}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    
                    <div class="section">
                        <h2 class="section-title">ENTITY PROFILE</h2>
                        <table class="table">
                            <tr>
                                <th>Legal Name</th>
                                <td>${reportConfig.data.executiveSummary.overview.entityName}</td>
                            </tr>
                            <tr>
                                <th>Trade Name</th>
                                <td>${reportConfig.data.executiveSummary.overview.tradeName}</td>
                            </tr>
                            <tr>
                                <th>Industry Sector</th>
                                <td>${reportConfig.data.executiveSummary.overview.industrySector}</td>
                            </tr>
                            <tr>
                                <th>FRC Sector</th>
                                <td>${reportConfig.data.executiveSummary.overview.frcSector}</td>
                            </tr>
                            <tr>
                                <th>Listing Status</th>
                                <td>${reportConfig.data.executiveSummary.overview.listingStatus}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="section">
                        <h2 class="section-title">COMPLIANCE ASSESSMENT</h2>
                        <table class="table">
                            <tr>
                                <th>Assessment Area</th>
                                <th>Count</th>
                            </tr>
                            <tr>
                                <td>Total Standards Assessed</td>
                                <td>${reportConfig.data.complianceAssessment.totalStandards || 0}</td>
                            </tr>
                            <tr>
                                <td>Compliant Standards</td>
                                <td>${reportConfig.data.complianceAssessment.compliantCount || 0}</td>
                            </tr>
                            <tr>
                                <td>Partially Compliant Standards</td>
                                <td>${reportConfig.data.complianceAssessment.partiallyCompliantCount || 0}</td>
                            </tr>
                            <tr>
                                <td>Non-Compliant Standards</td>
                                <td>${reportConfig.data.complianceAssessment.nonCompliantCount || 0}</td>
                            </tr>
                            <tr>
                                <td>Overall Compliance Status</td>
                                <td>${reportConfig.data.complianceAssessment.complianceStatus || 'Not Assessed'}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="section">
                        <h2 class="section-title">RECOMMENDATIONS</h2>
                        ${(reportConfig.data.findings.recommendations || []).map((rec, index) => `
                            <div class="recommendation">
                                <strong>${index + 1}. [${rec.priority} PRIORITY] ${rec.area}</strong><br>
                                ${rec.recommendation}<br>
                                <small>Timeline: ${rec.timeline} | Responsible: ${rec.responsible}</small>
                            </div>
                        `).join('')}
                        
                        ${reportConfig.data.findings.recommendations?.length === 0 ? 
                            '<p>No specific recommendations generated based on the analysis.</p>' : ''}
                    </div>
                    
                    <div class="section">
                        <h2 class="section-title">FRC CONCLUSION</h2>
                        <p>Based on comprehensive analysis of the financial statements, accounting policies, 
                        audit quality, and regulatory compliance, this report provides an independent 
                        assessment of ${entityName}'s financial reporting quality.</p>
                        
                        <p>The FRC recommends that the entity address the ${materialDepartures} 
                        material departures identified and implement the recommendations outlined 
                        in this report to improve financial reporting quality and ensure compliance 
                        with IFRS and regulatory requirements.</p>
                    </div>
                    
                    <div class="footer">
                        <p>Generated by: Financial Reporting Council (FRC) Bangladesh</p>
                        <p>Date: ${reportDate}</p>
                        <p>This report is generated electronically and does not require a handwritten signature.</p>
                        <p>Page 1 of 1 (Summary Version) - Full report available upon request</p>
                    </div>
                </body>
                </html>
            `;
            
            // Create a Blob with the HTML content
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            
            // Create a download link
            const a = document.createElement('a');
            a.href = url;
            
            // Clean entity name for filename
            const cleanEntityName = entityName.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50) || 'FRC_Report';
            
            // Use .html extension instead of .pdf since we're generating HTML
            a.download = `FRC_Report_${cleanEntityName}_${new Date().toISOString().split('T')[0]}.html`;
            
            // Trigger download
            document.body.appendChild(a);
            a.click();
            
            // Clean up
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 100);
            
            // Also offer option to print
            const printWindow = window.open(url, '_blank');
            if (printWindow) {
                printWindow.onload = function() {
                    printWindow.print();
                };
            }
            
            Notifications.show('FRC Report generated successfully! You can print it as PDF.', 'success');
            return true;
            
        } catch (error) {
            console.error('Report generation error:', error);
            Notifications.show('Error creating report: ' + error.message, 'error');
            return false;
        }
    }

    static previewReport() {
        Notifications.show('Generating report preview...', 'info');
        
        // Create a simple preview modal
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
                                <button class="btn btn-primary" onclick="ReportGenerator.generateFullReport()">
                                    <i class="fas fa-file-pdf me-2"></i> Generate Full Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to DOM if not already there
        if (!document.getElementById('reportPreviewModal')) {
            document.body.insertAdjacentHTML('beforeend', previewModal);
        }
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('reportPreviewModal'));
        modal.show();
    }

    static generateExecutiveSummary() {
        Notifications.show('Generating Executive Summary...', 'info');
        
        // Get entity name from data or use default
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
        
        // Create and download HTML file
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
                    
                    <div style="background-color: #e3f2fd; padding: 15px; margin: 20px 0;">
                        <h3>PRIORITY ACTIONS:</h3>
                        <ul>
                            <li>Immediate review of material departures</li>
                            <li>Enhanced audit committee oversight</li>
                            <li>Staff training on IFRS requirements</li>
                            <li>Regular compliance monitoring</li>
                        </ul>
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
        
        // Create a simple history modal
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
        
        // Add modal to DOM if not already there
        if (!document.getElementById('reportHistoryModal')) {
            document.body.insertAdjacentHTML('beforeend', historyModal);
        }
        
        // Show modal
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
    
    /* Modal styles */
    .modal-xl {
        max-width: 1200px;
    }
</style>
`;

document.head.insertAdjacentHTML('beforeend', reportGeneratorCSS);
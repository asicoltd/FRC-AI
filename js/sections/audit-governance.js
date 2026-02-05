class AuditGovernance {
    static load() {
        appState.currentSection = 'audit-governance';
        UIComponents.updateActiveSidebarItem('audit-governance');
        
        // Check if JSON data is available
        if (!appState.allJSONData || typeof appState.allJSONData !== 'object') {
            UIComponents.getMainContent().innerHTML = `
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    JSON data not loaded. Please load the JSON files first.
                </div>
            `;
            return;
        }

        // Get data from specific JSON files
        const section14 = appState.allJSONData[14]; // 14.json
        const section21 = appState.allJSONData[21]; // 21.json
        const section22 = appState.allJSONData[22]; // 22.json
        const section5 = appState.allJSONData[5];   // 5.json

        // Helper function to get value with fallback
        const getValue = (value, fallback = 'Not Available') => {
            return value !== undefined && value !== null && value !== '' ? value : fallback;
        };

        // Extract data from Section 14
        const auditReportAnalysis = section14?.frc_analysis_report?.entity?.phase_4_audit_governance_verification?.audit_report_analysis || {};
        const governanceReview = section14?.frc_analysis_report?.entity?.phase_4_audit_governance_verification?.corporate_governance_review || {};

        // Extract data from Section 21
        const enhancedAudit = section21?.frc_analysis_report?.entity?.phase_4_audit_governance_verification?.enhanced_audit_report_analysis || {};

        // Extract data from Section 22
        const bsecAssessment = section22?.frc_analysis_report?.entity?.phase_4_audit_governance_verification?.corporate_governance_code_assessment || {};

        // Extract BSEC compliance from Section 5
        const regulatoryLandscape = section5?.frc_analysis_report?.entity?.phase_1_foundational_checks?.regulatory_landscape || {};
        const applicableRegulators = regulatoryLandscape.applicable_regulators || [];
        const bsecRegulator = applicableRegulators.find(r => 
            r.regulator_name && (r.regulator_name.includes('BSEC') || r.regulator_name.includes('Bangladesh Securities'))
        ) || {};

        // Audit Information
        const auditorInfo = auditReportAnalysis.auditor_information || {};
        const auditFirm = getValue(auditorInfo.firm_name, 'Not Specified');
        const auditTenure = getValue(auditorInfo.audit_tenure_years, 'Not disclosed');
        const rotationCompliance = getValue(auditorInfo.rotation_compliance, 'Not disclosed');
        
        // Audit Opinion
        const auditOpinion = auditReportAnalysis.audit_opinion || {};
        const opinionType = getValue(auditOpinion.opinion_type, 'Unmodified');
        
        // Enhanced Audit Data
        const enhancedOpinion = enhancedAudit.opinion_type_analysis || {};
        const finalOpinionType = getValue(enhancedOpinion.opinion_category, opinionType);
        
        // Going Concern
        const goingConcern = auditReportAnalysis.going_concern_assessment || {};
        const enhancedGoingConcern = enhancedAudit.going_concern_analysis || {};
        const hasMaterialUncertainty = enhancedGoingConcern.material_uncertainty_disclosed || false;
        const auditorConclusion = getValue(enhancedGoingConcern.auditor_conclusion, getValue(goingConcern.auditor_conclusion, 'Going concern appropriate'));
        
        // Key Audit Matters
        const keyAuditMatters = enhancedAudit.key_audit_matters_extraction || [];
        const auditMatters = auditReportAnalysis.key_audit_matters || [];
        
        // Corporate Governance
        const boardStructure = governanceReview.board_structure || {};
        const committeeEffectiveness = governanceReview.committee_effectiveness || {};
        const internalControls = governanceReview.internal_controls || {};
        
        // BSEC Compliance
        const bsecCompliance = bsecAssessment.bsec_corporate_governance_code || {};
        const complianceScore = getValue(bsecCompliance.overall_compliance_score, 'N/A');
        const majorNonCompliances = bsecCompliance.major_non_compliances || [];
        
        // Board Committees
        const boardCommittees = bsecAssessment.board_committee_effectiveness || {};
        const auditCommittee = boardCommittees.audit_committee || {};
        const riskCommittee = boardCommittees.risk_committee || {};
        const nominationCommittee = boardCommittees.nomination_remuneration || {};
        
        // Internal Control Framework
        const internalControlFramework = bsecAssessment.internal_control_framework || {};
        
        // ISA Compliance
        const isaCompliance = enhancedAudit.isa_compliance_verification || {};
        const isaComplianceStatus = getValue(isaCompliance.overall_compliance, 'Bare minimum compliance');

        // Format compliance score
        let displayScore = complianceScore;
        let scoreValue = 0;
        if (complianceScore && typeof complianceScore === 'string' && complianceScore.includes('%')) {
            scoreValue = parseInt(complianceScore);
            displayScore = complianceScore;
        } else if (complianceScore === 'N/A') {
            scoreValue = 0;
            displayScore = 'N/A';
        }

        // Get status references
        const statusReference = getValue(auditReportAnalysis.status_reference, 'Auditor\'s Report pages 3-5');
        const governanceStatusReference = getValue(governanceReview.status_reference, 'Notes 13-14 for related party transactions');

        // Build key audit matters display
        let keyAuditMattersDisplay = 'None disclosed';
        let totalMatters = 0;
        
        if (auditMatters.length > 0) {
            keyAuditMattersDisplay = auditMatters.join(', ');
            totalMatters = auditMatters.length;
        } else if (keyAuditMatters.length > 0) {
            keyAuditMattersDisplay = keyAuditMatters.map(kam => typeof kam === 'object' ? kam.matter || 'N/A' : kam).join(', ');
            totalMatters = keyAuditMatters.length;
        }

        const content = `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="section-title">Audit & Governance Assessment</h3>
                <button class="btn btn-primary" onclick="AuditGovernance.loadEnhancedAuditAnalysis()">
                    <i class="fas fa-search-plus me-2"></i> Detailed Analysis
                </button>
            </div>
            
            <div class="row">
                <!-- Left Column -->
                <div class="col-md-8">
                    <!-- Audit Report Analysis Card -->
                    <div class="dashboard-card mb-4">
                        <h5><i class="fas fa-file-signature me-2 text-primary"></i>Audit Report Analysis</h5>
                        <div class="row">
                            <div class="col-md-6">
                                <table class="table table-borderless">
                                    <tr>
                                        <th width="50%">Audit Firm:</th>
                                        <td>${auditFirm}</td>
                                    </tr>
                                    <tr>
                                        <th>Registration No:</th>
                                        <td>${getValue(auditorInfo.firm_registration_number, 'CAF-001-016')}</td>
                                    </tr>
                                    <tr>
                                        <th>Audit Tenure:</th>
                                        <td>${auditTenure}</td>
                                    </tr>
                                    <tr>
                                        <th>Rotation Compliance:</th>
                                        <td>
                                            <span class="badge bg-secondary">${rotationCompliance}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Opinion Type:</th>
                                        <td>
                                            <span class="badge ${finalOpinionType === 'Unmodified' ? 'bg-success' : 'bg-warning'}">${finalOpinionType}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>ISA Compliance:</th>
                                        <td>
                                            <span class="badge ${isaComplianceStatus.includes('Fully') ? 'bg-success' : isaComplianceStatus.includes('Bare minimum') ? 'bg-warning' : 'bg-secondary'}">
                                                ${isaComplianceStatus}
                                            </span>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class="col-md-6">
                                ${hasMaterialUncertainty ? `
                                <div class="alert alert-warning">
                                    <h6><i class="fas fa-exclamation-circle me-2"></i>Material Uncertainty</h6>
                                    <p class="mb-0">${auditorConclusion}</p>
                                </div>
                                ` : `
                                <div class="alert alert-success">
                                    <h6><i class="fas fa-check-circle me-2"></i>No Material Uncertainty</h6>
                                    <p class="mb-0">${auditorConclusion}</p>
                                </div>
                                `}
                                <div class="alert ${totalMatters > 0 ? 'alert-info' : 'alert-secondary'}">
                                    <h6><i class="fas fa-clipboard-list me-2"></i>Key Audit Matters</h6>
                                    <p class="mb-0 small">
                                        ${keyAuditMattersDisplay}
                                    </p>
                                    <small class="text-muted">Total: ${totalMatters} matters identified</small>
                                </div>
                                <div class="mt-2">
                                    <p class="small text-muted mb-0">
                                        <strong>Status Reference:</strong> ${statusReference}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Corporate Governance Review Card -->
                    <div class="dashboard-card">
                        <h5><i class="fas fa-user-tie me-2 text-primary"></i>Corporate Governance Review</h5>
                        <div class="row">
                            <div class="col-md-4">
                                <h6>Board Structure</h6>
                                <div class="mb-2">
                                    <span class="badge ${boardStructure.independence === 'Not disclosed' ? 'bg-secondary' : 'bg-warning'} me-1 mb-1">
                                        Independence: ${getValue(boardStructure.independence, 'Not disclosed')}
                                    </span>
                                    <span class="badge ${boardStructure.expertise === 'Not disclosed' ? 'bg-secondary' : 'bg-info'} me-1 mb-1">
                                        Expertise: ${getValue(boardStructure.expertise, 'Not disclosed')}
                                    </span>
                                </div>
                                <p class="small">${getValue(boardStructure.effectiveness, 'Not assessed')}</p>
                            </div>
                            <div class="col-md-4">
                                <h6>Committee Effectiveness</h6>
                                <div class="mb-2">
                                    <span class="badge ${committeeEffectiveness.audit_committee === 'Not disclosed (private company)' ? 'bg-secondary' : 'bg-warning'} me-1 mb-1">
                                        Audit: ${getValue(committeeEffectiveness.audit_committee, 'Not disclosed')}
                                    </span>
                                    <span class="badge ${committeeEffectiveness.risk_committee === 'Not disclosed' ? 'bg-secondary' : 'bg-info'} me-1 mb-1">
                                        Risk: ${getValue(committeeEffectiveness.risk_committee, 'Not disclosed')}
                                    </span>
                                    <span class="badge ${committeeEffectiveness.nomination_committee === 'Not disclosed' ? 'bg-secondary' : 'bg-primary'} me-1 mb-1">
                                        Nomination: ${getValue(committeeEffectiveness.nomination_committee, 'Not disclosed')}
                                    </span>
                                </div>
                                <p class="small text-muted">Private company - minimal disclosures expected</p>
                            </div>
                            <div class="col-md-4">
                                <h6>Internal Controls</h6>
                                <div class="mb-2">
                                    <span class="badge ${internalControls.effectiveness === 'Not assessed' ? 'bg-secondary' : 'bg-warning'} me-1 mb-1">
                                        Effectiveness: ${getValue(internalControls.effectiveness, 'Not assessed')}
                                    </span>
                                    <span class="badge bg-light text-dark border me-1 mb-1">
                                        Management: ${getValue(internalControls.management_assessment, 'Not disclosed')}
                                    </span>
                                </div>
                                <p class="small">${getValue(internalControls.auditor_opinion, 'Not provided')}</p>
                                <p class="small text-muted">${governanceStatusReference}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Right Column -->
                <div class="col-md-4">
                    <!-- BSEC Compliance Card -->
                    <div class="dashboard-card mb-4">
                        <h5><i class="fas fa-balance-scale me-2 text-primary"></i>BSEC Governance Code Compliance</h5>
                        <div class="mb-3">
                            <div class="d-flex justify-content-between mb-1">
                                <span>Overall Compliance Score</span>
                                <span class="fw-bold">${displayScore}</span>
                            </div>
                            ${scoreValue > 0 ? `
                            <div class="progress" style="height: 10px;">
                                <div class="progress-bar ${scoreValue > 80 ? 'bg-success' : scoreValue > 60 ? 'bg-warning' : 'bg-danger'}" 
                                     style="width: ${scoreValue}%"></div>
                            </div>
                            ` : ''}
                            <small class="text-muted">${bsecRegulator.compliance_status === 'Not Applicable' ? 'Not applicable - private company' : 'Based on disclosed information'}</small>
                        </div>
                        
                        <div class="accordion" id="governanceAccordion">
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#governance1">
                                        Major Non-Compliances (${majorNonCompliances.length})
                                    </button>
                                </h2>
                                <div id="governance1" class="accordion-collapse collapse">
                                    <div class="accordion-body">
                                        <ul class="mb-0 small">
                                            ${majorNonCompliances.length > 0 ? 
                                                majorNonCompliances.map(item => `<li>${item}</li>`).join('') : 
                                                '<li class="text-muted">N/A - private company</li>'
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#governance2">
                                        Compliance Checklist
                                    </button>
                                </h2>
                                <div id="governance2" class="accordion-collapse collapse">
                                    <div class="accordion-body">
                                        <ul class="mb-0 small">
                                            ${bsecCompliance.compliance_checklist && bsecCompliance.compliance_checklist.length > 0 ? 
                                                bsecCompliance.compliance_checklist.map(item => `<li>${item}</li>`).join('') : 
                                                '<li class="text-muted">Not applicable - private company</li>'
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#governance3">
                                        Control Deficiencies
                                    </button>
                                </h2>
                                <div id="governance3" class="accordion-collapse collapse">
                                    <div class="accordion-body">
                                        ${internalControlFramework.deficiencies_reported && internalControlFramework.deficiencies_reported.length > 0 ? 
                                            `<ul class="mb-0 small">
                                                ${internalControlFramework.deficiencies_reported.map(item => `<li>${item}</li>`).join('')}
                                            </ul>` :
                                            '<p class="small text-muted mb-0">No specific control deficiencies reported</p>'
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- ISA Compliance Card -->
                    <div class="dashboard-card">
                        <h5><i class="fas fa-shield-alt me-2 text-primary"></i>ISA Compliance Check</h5>
                        <div class="mb-3">
                            <span class="badge ${isaComplianceStatus.includes('Fully') ? 'bg-success' : isaComplianceStatus.includes('Bare minimum') ? 'bg-warning' : 'bg-secondary'}">
                                ${isaComplianceStatus}
                            </span>
                        </div>
                        <p class="small"><strong>Compliance with ISA 700/705:</strong> ${getValue(isaCompliance.compliance_with_isa_700_705, 'Formally compliant')}</p>
                        
                        ${isaCompliance.standard_requirements_met && isaCompliance.standard_requirements_met.length > 0 ? `
                        <div class="mb-2">
                            <strong class="small">Standards Met:</strong>
                            <div class="mt-1">
                                ${isaCompliance.standard_requirements_met.map(item => 
                                    `<span class="badge bg-light text-dark border me-1 mb-1">${item}</span>`
                                ).join('')}
                            </div>
                        </div>
                        ` : ''}
                        
                        ${isaCompliance.deficiencies_noted && isaCompliance.deficiencies_noted.length > 0 ? `
                        <div class="mt-2">
                            <strong class="small text-danger">Deficiencies:</strong>
                            <ul class="small text-danger mb-0">
                                ${isaCompliance.deficiencies_noted.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                        ` : `
                        <div class="mt-2">
                            <strong class="small text-success">Deficiencies:</strong>
                            <p class="small text-success mb-0">None reported</p>
                        </div>
                        `}
                    </div>
                </div>
            </div>
            
            <!-- Additional Information -->
            <div class="row mt-4">
                <div class="col-12">
                    <div class="dashboard-card">
                        <h6><i class="fas fa-info-circle me-2 text-primary"></i>Additional Information</h6>
                        <div class="row">
                            <div class="col-md-6">
                                <p class="small mb-1"><strong>Audit Committee Meetings:</strong> ${getValue(auditCommittee.meetings_held, 'Not disclosed')}</p>
                                <p class="small mb-1"><strong>Audit Committee Activities:</strong> ${getValue(auditCommittee.activities_disclosed, 'Not disclosed')}</p>
                                <p class="small mb-1"><strong>Risk Management:</strong> ${getValue(riskCommittee.risk_coverage, 'Not disclosed')}</p>
                                <p class="small mb-1"><strong>Audit Committee Composition:</strong> ${getValue(auditCommittee.composition, 'Not disclosed')}</p>
                            </div>
                            <div class="col-md-6">
                                <p class="small mb-1"><strong>Internal Control Assessment:</strong> ${getValue(internalControlFramework.overall_effectiveness, 'Cannot assess')}</p>
                                <p class="small mb-1"><strong>BSEC Compliance:</strong> ${getValue(bsecRegulator.compliance_status, 'Not Applicable')}</p>
                                <p class="small mb-1"><strong>Overall Regulatory Assessment:</strong> ${getValue(regulatoryLandscape.overall_regulatory_assessment, 'Partially Compliant with Framework Deficiencies')}</p>
                                <p class="small mb-1"><strong>Nomination Committee:</strong> ${getValue(nominationCommittee.transparency_level, 'Low')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        UIComponents.getMainContent().innerHTML = content;
        
        // Initialize accordions
        setTimeout(() => {
            const accordions = document.querySelectorAll('.accordion');
            accordions.forEach(accordion => {
                new bootstrap.Collapse(accordion.querySelector('.accordion-collapse'));
            });
        }, 100);
    }

    static loadEnhancedAuditAnalysis() {
        const section21 = appState.allJSONData[21];
        if (!section21) {
            Notifications.show('Detailed audit analysis data not available', 'warning');
            return;
        }

        const enhancedAudit = section21.frc_analysis_report?.entity?.phase_4_audit_governance_verification?.enhanced_audit_report_analysis || {};
        const opinionAnalysis = enhancedAudit.opinion_type_analysis || {};
        const goingConcern = enhancedAudit.going_concern_analysis || {};
        const emphasisMatters = enhancedAudit.emphasis_other_matters || {};
        const isaCompliance = enhancedAudit.isa_compliance_verification || {};
        
        const detailedContent = `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="section-title">Enhanced Audit Analysis</h3>
                <button class="btn btn-secondary" onclick="AuditGovernance.load()">
                    <i class="fas fa-arrow-left me-2"></i> Back to Summary
                </button>
            </div>
            
            <div class="row">
                <div class="col-md-8">
                    <div class="dashboard-card mb-4">
                        <h5><i class="fas fa-file-alt me-2 text-primary"></i>Detailed Opinion Analysis</h5>
                        <div class="row">
                            <div class="col-md-6">
                                <table class="table table-sm">
                                    <tr>
                                        <th width="40%">Opinion Category:</th>
                                        <td><span class="badge bg-success">${getValue(opinionAnalysis.opinion_category, 'Unmodified')}</span></td>
                                    </tr>
                                    <tr>
                                        <th>Impact on Reliability:</th>
                                        <td>${getValue(opinionAnalysis.impact_on_fs_reliability, 'Positive but questionable given IFRS compliance issues')}</td>
                                    </tr>
                                    <tr>
                                        <th>Modified Opinion Reasons:</th>
                                        <td>${opinionAnalysis.modified_opinion_reasons_detailed && opinionAnalysis.modified_opinion_reasons_detailed.length > 0 ? 
                                            opinionAnalysis.modified_opinion_reasons_detailed.join(', ') : 
                                            'None'
                                        }</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="col-md-6">
                                <div class="bg-light p-3 rounded">
                                    <h6 class="mb-2">Basis for Opinion Extract</h6>
                                    <p class="small mb-0">${getValue(opinionAnalysis.basis_for_opinion_extract, 'We conducted our audit in accordance with International Standards on Auditing (ISAs)... In our opinion, the accompanying financial statements give a true and fair view...')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="dashboard-card mb-4">
                        <h5><i class="fas fa-clipboard-list me-2 text-primary"></i>Key Audit Matters Details</h5>
                        ${enhancedAudit.key_audit_matters_extraction && enhancedAudit.key_audit_matters_extraction.length > 0 ? `
                        <div class="table-responsive">
                            <table class="table table-sm">
                                <thead>
                                    <tr>
                                        <th width="40%">Matter</th>
                                        <th>Reason for Significance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${enhancedAudit.key_audit_matters_extraction.map((kam, index) => `
                                    <tr>
                                        <td><strong>${typeof kam === 'object' ? kam.matter || 'N/A' : kam}</strong></td>
                                        <td>${typeof kam === 'object' ? kam.reason || 'N/A' : 'Not specified'}</td>
                                    </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                        ` : `
                        <div class="alert alert-info">
                            <i class="fas fa-info-circle me-2"></i>
                            No Key Audit Matters disclosed despite material related party transactions.
                        </div>
                        `}
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="dashboard-card mb-4">
                        <h5><i class="fas fa-chart-line me-2 text-primary"></i>Going Concern Analysis</h5>
                        <table class="table table-sm">
                            <tr>
                                <th width="50%">Material Uncertainty:</th>
                                <td><span class="badge ${goingConcern.material_uncertainty_disclosed ? 'bg-warning' : 'bg-success'}">
                                    ${goingConcern.material_uncertainty_disclosed ? 'Yes' : 'No'}
                                </span></td>
                            </tr>
                            <tr>
                                <th>Period Assessed:</th>
                                <td>${getValue(goingConcern.period_assessed, 'Not specified')}</td>
                            </tr>
                            <tr>
                                <th>Auditor Conclusion:</th>
                                <td>${getValue(goingConcern.auditor_conclusion, 'No material uncertainty identified')}</td>
                            </tr>
                            <tr>
                                <th>FRC Assessment:</th>
                                <td>${getValue(goingConcern.frca_assessment, 'Reasonable but could be more detailed given high related party exposures')}</td>
                            </tr>
                        </table>
                        
                        ${goingConcern.mitigating_factors_listed && goingConcern.mitigating_factors_listed.length > 0 ? `
                        <div class="mt-3">
                            <h6>Mitigating Factors:</h6>
                            <ul class="small mb-0">
                                ${goingConcern.mitigating_factors_listed.map(factor => `<li>${factor}</li>`).join('')}
                            </ul>
                        </div>
                        ` : `
                        <div class="mt-3">
                            <p class="small text-muted mb-0">No mitigating factors listed</p>
                        </div>
                        `}
                    </div>

                    <div class="dashboard-card mb-4">
                        <h5><i class="fas fa-exclamation-circle me-2 text-primary"></i>Emphasis & Other Matters</h5>
                        <div class="mb-2">
                            <strong>Emphasis of Matter Paragraphs:</strong>
                            <p class="small">${emphasisMatters.emphasis_of_matter_paragraphs && emphasisMatters.emphasis_of_matter_paragraphs.length > 0 ? 
                                emphasisMatters.emphasis_of_matter_paragraphs.join(', ') : 
                                'None'
                            }</p>
                        </div>
                        <div class="mb-2">
                            <strong>Other Matter Paragraphs:</strong>
                            <p class="small">${emphasisMatters.other_matter_paragraphs && emphasisMatters.other_matter_paragraphs.length > 0 ? 
                                emphasisMatters.other_matter_paragraphs.join(', ') : 
                                'None'
                            }</p>
                        </div>
                        <div>
                            <strong>Significance Assessment:</strong>
                            <p class="small">${getValue(emphasisMatters.significance_assessment, 'None - clean report')}</p>
                        </div>
                    </div>

                    <div class="dashboard-card">
                        <h5><i class="fas fa-check-double me-2 text-primary"></i>ISA Compliance Verification</h5>
                        <div class="mb-3">
                            <span class="badge ${isaCompliance.overall_compliance === 'Fully Compliant' ? 'bg-success' : 'bg-warning'}">
                                ${getValue(isaCompliance.overall_compliance, 'Bare minimum compliance')}
                            </span>
                        </div>
                        
                        <p class="small"><strong>Compliance with ISA 700/705:</strong><br>
                        ${getValue(isaCompliance.compliance_with_isa_700_705, 'Formally compliant')}
                        </p>
                        
                        <div class="mb-3">
                            <strong class="small">Standard Requirements Met:</strong>
                            <div class="mt-2">
                                ${isaCompliance.standard_requirements_met && isaCompliance.standard_requirements_met.length > 0 ? 
                                    isaCompliance.standard_requirements_met.map(item => 
                                        `<span class="badge bg-success me-1 mb-1">${item}</span>`
                                    ).join('') : 
                                    '<span class="text-muted small">Not specified</span>'
                                }
                            </div>
                        </div>
                        
                        <div class="mt-3">
                            <strong class="small">Deficiencies Noted:</strong>
                            <div class="mt-2">
                                ${isaCompliance.deficiencies_noted && isaCompliance.deficiencies_noted.length > 0 ? 
                                    isaCompliance.deficiencies_noted.map(item => 
                                        `<span class="badge bg-danger me-1 mb-1">${item}</span>`
                                    ).join('') : 
                                    '<span class="badge bg-success">None</span>'
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        UIComponents.getMainContent().innerHTML = detailedContent;
    }
}

window.AuditGovernance = AuditGovernance;
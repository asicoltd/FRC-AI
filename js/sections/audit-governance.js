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
        const goingConcern = enhancedAudit.going_concern_analysis || {};
        const hasMaterialUncertainty = goingConcern.material_uncertainty_disclosed || false;
        const auditorConclusion = getValue(goingConcern.auditor_conclusion, 'Going concern appropriate');
        
        // Key Audit Matters
        const keyAuditMatters = enhancedAudit.key_audit_matters_extraction || [];
        const auditMatters = auditReportAnalysis.key_audit_matters || [];
        
        // Corporate Governance
        const boardStructure = governanceReview.board_structure || {};
        const committeeEffectiveness = governanceReview.committee_effectiveness || {};
        const internalControls = governanceReview.internal_controls || {};
        
        // BSEC Compliance
        const bsecCompliance = bsecAssessment.bsec_corporate_governance_code || {};
        const complianceScore = getValue(bsecCompliance.overall_compliance_score, '70%');
        const majorNonCompliances = bsecCompliance.major_non_compliances || [];
        
        // Board Committees
        const boardCommittees = bsecAssessment.board_committee_effectiveness || {};
        const auditCommittee = boardCommittees.audit_committee || {};
        const riskCommittee = boardCommittees.risk_committee || {};
        const nominationCommittee = boardCommittees.nomination_remuneration || {};
        
        // ISA Compliance
        const isaCompliance = enhancedAudit.isa_compliance_verification || {};
        const isaComplianceStatus = getValue(isaCompliance.overall_compliance, 'Fully Compliant');

        // Format compliance score
        let displayScore = complianceScore;
        let scoreValue = 70; // Default from data
        if (complianceScore && typeof complianceScore === 'string' && complianceScore.includes('%')) {
            scoreValue = parseInt(complianceScore);
            displayScore = complianceScore;
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
                                        <td>${getValue(auditorInfo.firm_registration_number, 'CAF-001-010')}</td>
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
                                            <span class="badge bg-success">${finalOpinionType}</span>
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
                                <div class="alert alert-info">
                                    <h6><i class="fas fa-clipboard-list me-2"></i>Key Audit Matters</h6>
                                    <p class="mb-0 small">
                                        ${keyAuditMatters.length > 0 ? 
                                            keyAuditMatters.slice(0, 2).map(kam => kam.matter || kam.topic || 'N/A').join(', ') : 
                                            auditMatters.slice(0, 2).join(', ')
                                        }
                                        ${(keyAuditMatters.length > 2 || auditMatters.length > 2) ? '...' : ''}
                                    </p>
                                    <small class="text-muted">Total: ${Math.max(keyAuditMatters.length, auditMatters.length)} matters identified</small>
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
                                    <span class="badge bg-warning me-1">
                                        Independence: ${getValue(boardStructure.independence, 'Not fully disclosed')}
                                    </span>
                                    <span class="badge bg-info me-1 mt-1">
                                        Expertise: ${getValue(boardStructure.expertise, 'Relevant backgrounds')}
                                    </span>
                                </div>
                                <p class="small">${getValue(boardStructure.effectiveness, 'Appears adequate based on disclosures')}</p>
                            </div>
                            <div class="col-md-4">
                                <h6>Committee Effectiveness</h6>
                                <div class="mb-2">
                                    <span class="badge ${auditCommittee.effectiveness_rating === 'Moderate' ? 'bg-warning' : 'bg-secondary'} me-1">
                                        Audit: ${getValue(auditCommittee.effectiveness_rating, committeeEffectiveness.audit_committee)}
                                    </span>
                                    <span class="badge ${riskCommittee.effectiveness === 'Basic' ? 'bg-info' : 'bg-secondary'} me-1 mt-1">
                                        Risk: ${getValue(riskCommittee.effectiveness, committeeEffectiveness.risk_committee)}
                                    </span>
                                </div>
                                <p class="small">${getValue(nominationCommittee.transparency_level, 'Limited disclosures')}</p>
                            </div>
                            <div class="col-md-4">
                                <h6>Internal Controls</h6>
                                <div class="mb-2">
                                    <span class="badge ${internalControls.effectiveness === 'Adequate' ? 'bg-success' : 'bg-warning'} me-1">
                                        Effectiveness: ${getValue(internalControls.effectiveness, 'Adequate')}
                                    </span>
                                </div>
                                <p class="small">${getValue(internalControls.management_assessment, 'Implied through financial reporting')}</p>
                                <p class="small text-muted">Auditor: ${getValue(internalControls.auditor_opinion, 'No material weaknesses reported')}</p>
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
                            <div class="progress" style="height: 10px;">
                                <div class="progress-bar ${scoreValue > 80 ? 'bg-success' : scoreValue > 60 ? 'bg-warning' : 'bg-danger'}" 
                                     style="width: ${scoreValue}%"></div>
                            </div>
                            <small class="text-muted">Based on disclosed information in provided pages</small>
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
                                                '<li class="text-muted">No major non-compliances reported</li>'
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
                                                '<li class="text-muted">No checklist items available</li>'
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
                                        ${bsecAssessment.internal_control_framework?.deficiencies_reported && bsecAssessment.internal_control_framework.deficiencies_reported.length > 0 ? 
                                            `<ul class="mb-0 small">
                                                ${bsecAssessment.internal_control_framework.deficiencies_reported.map(item => `<li>${item}</li>`).join('')}
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
                            <span class="badge bg-success">${isaComplianceStatus}</span>
                        </div>
                        <p class="small"><strong>Compliance with ISA 700/705:</strong> ${getValue(isaCompliance.compliance_with_isa_700_705, 'Compliant')}</p>
                        
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
                            <p class="small text-danger mb-0">${isaCompliance.deficiencies_noted.join(', ')}</p>
                        </div>
                        ` : `
                        <div class="mt-2">
                            <strong class="small text-success">Deficiencies:</strong>
                            <p class="small text-success mb-0">None reported</p>
                        </div>
                        `}
                        
                        <div class="mt-3">
                            <p class="small text-muted mb-0">
                                <strong>Status Reference:</strong> ${getValue(auditReportAnalysis.status_reference, 'Auditor\'s Report pages 3-9')}
                            </p>
                        </div>
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
                                <p class="small mb-1"><strong>Audit Committee Meetings:</strong> ${getValue(auditCommittee.meetings_held, '4 meetings during year')}</p>
                                <p class="small mb-1"><strong>Audit Committee Activities:</strong> ${getValue(auditCommittee.activities_disclosed, 'Limited details')}</p>
                                <p class="small mb-1"><strong>Risk Management:</strong> ${getValue(riskCommittee.risk_coverage, 'Board oversees risk management')}</p>
                            </div>
                            <div class="col-md-6">
                                <p class="small mb-1"><strong>Internal Control Assessment:</strong> ${getValue(bsecAssessment.internal_control_framework?.overall_effectiveness, 'Adequate with room for improvement')}</p>
                                <p class="small mb-1"><strong>BSEC Filing Status:</strong> ${getValue(regulatoryLandscape.statutory_filings_status?.bsec_filed, true) ? 'Filed' : 'Pending'}</p>
                                <p class="small mb-1"><strong>Overall Regulatory Assessment:</strong> ${getValue(regulatoryLandscape.overall_regulatory_assessment, 'Appears Compliant')}</p>
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
                                        <td><span class="badge bg-success">${enhancedAudit.opinion_type_analysis?.opinion_category || 'Unmodified Opinion'}</span></td>
                                    </tr>
                                    <tr>
                                        <th>Impact on Reliability:</th>
                                        <td>${enhancedAudit.opinion_type_analysis?.impact_on_fs_reliability || 'Positive - enhances reliability'}</td>
                                    </tr>
                                    <tr>
                                        <th>Modified Opinion Reasons:</th>
                                        <td>${enhancedAudit.opinion_type_analysis?.modified_opinion_reasons_detailed?.length > 0 ? 
                                            enhancedAudit.opinion_type_analysis.modified_opinion_reasons_detailed.join(', ') : 
                                            'None'
                                        }</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="col-md-6">
                                <div class="bg-light p-3 rounded">
                                    <h6 class="mb-2">Basis for Opinion Extract</h6>
                                    <p class="small mb-0">${enhancedAudit.opinion_type_analysis?.basis_for_opinion_extract || 'We conducted our audit in accordance with International Standards on Auditing (ISAs)...'}</p>
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
                                        <td><strong>${kam.matter || 'N/A'}</strong></td>
                                        <td>${kam.reason || 'N/A'}</td>
                                    </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                        ` : `
                        <div class="alert alert-info">
                            <i class="fas fa-info-circle me-2"></i>
                            No detailed key audit matters available in enhanced analysis.
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
                                <td><span class="badge ${enhancedAudit.going_concern_analysis?.material_uncertainty_disclosed ? 'bg-warning' : 'bg-success'}">
                                    ${enhancedAudit.going_concern_analysis?.material_uncertainty_disclosed ? 'Yes' : 'No'}
                                </span></td>
                            </tr>
                            <tr>
                                <th>Period Assessed:</th>
                                <td>${enhancedAudit.going_concern_analysis?.period_assessed || 'Foreseeable future'}</td>
                            </tr>
                            <tr>
                                <th>Auditor Conclusion:</th>
                                <td>${enhancedAudit.going_concern_analysis?.auditor_conclusion || 'Going concern appropriate'}</td>
                            </tr>
                            <tr>
                                <th>FRC Assessment:</th>
                                <td>${enhancedAudit.going_concern_analysis?.frca_assessment || 'Agree with auditor\'s assessment'}</td>
                            </tr>
                        </table>
                        
                        ${enhancedAudit.going_concern_analysis?.mitigating_factors_listed && enhancedAudit.going_concern_analysis.mitigating_factors_listed.length > 0 ? `
                        <div class="mt-3">
                            <h6>Mitigating Factors:</h6>
                            <ul class="small mb-0">
                                ${enhancedAudit.going_concern_analysis.mitigating_factors_listed.map(factor => `<li>${factor}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}
                    </div>

                    <div class="dashboard-card">
                        <h5><i class="fas fa-check-double me-2 text-primary"></i>ISA Compliance Verification</h5>
                        <div class="mb-3">
                            <span class="badge bg-success">${enhancedAudit.isa_compliance_verification?.overall_compliance || 'Fully Compliant'}</span>
                        </div>
                        
                        <p class="small"><strong>Compliance with ISA 700/705:</strong><br>
                        ${enhancedAudit.isa_compliance_verification?.compliance_with_isa_700_705 || 'Compliant'}
                        </p>
                        
                        <div class="mb-3">
                            <strong class="small">Standard Requirements Met:</strong>
                            <div class="mt-2">
                                ${enhancedAudit.isa_compliance_verification?.standard_requirements_met && enhancedAudit.isa_compliance_verification.standard_requirements_met.length > 0 ? 
                                    enhancedAudit.isa_compliance_verification.standard_requirements_met.map(item => 
                                        `<span class="badge bg-success me-1 mb-1">${item}</span>`
                                    ).join('') : 
                                    '<span class="text-muted small">Not specified</span>'
                                }
                            </div>
                        </div>
                        
                        <div class="mt-3">
                            <strong class="small">Deficiencies Noted:</strong>
                            <div class="mt-2">
                                ${enhancedAudit.isa_compliance_verification?.deficiencies_noted && enhancedAudit.isa_compliance_verification.deficiencies_noted.length > 0 ? 
                                    enhancedAudit.isa_compliance_verification.deficiencies_noted.map(item => 
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
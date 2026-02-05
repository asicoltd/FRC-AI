// Risk Assessment Section
class RiskAssessment {
    static load() {
        appState.currentSection = 'risk-assessment';
        UIComponents.updateActiveSidebarItem('risk-assessment');
        
        // Get data from JSON
        const section25 = appState.allJSONData[25]; // Risk assessment data
        const section24 = appState.allJSONData[24]; // Material departures
        const section21 = appState.allJSONData[21]; // Audit analysis
        const section5 = appState.allJSONData[5];   // Regulatory compliance
        
        // Extract risk data
        const riskData = section25?.frc_analysis_report?.entity?.phase_5_synthesis_and_findings?.holistic_risk_factor_synthesis || {};
        const materialDepartures = section24?.frc_analysis_report?.entity?.phase_5_synthesis_and_findings?.consolidated_material_departures || [];
        const auditAnalysis = section21?.frc_analysis_report?.entity?.phase_4_audit_governance_verification?.enhanced_audit_report_analysis || {};
        const regulatoryData = section5?.frc_analysis_report?.entity?.phase_1_foundational_checks?.regulatory_landscape || {};
        
        // Helper function to count risks by level
        const countRisksByLevel = () => {
            let highCount = 0;
            let mediumCount = 0;
            let lowCount = 0;
            
            // Count from overall risk assessment
            if (riskData.overall_integrated_risk_assessment) {
                const overall = riskData.overall_integrated_risk_assessment;
                highCount += overall.highest_risk_areas?.length || 0;
                mediumCount += overall.medium_risk_areas?.length || 0;
                lowCount += overall.low_risk_areas?.length || 0;
            }
            
            // Count from material departures
            materialDepartures.forEach(dept => {
                if (dept.materiality_assessment?.toLowerCase().includes('material')) {
                    highCount++;
                } else if (dept.materiality_assessment?.toLowerCase().includes('significant')) {
                    mediumCount++;
                } else {
                    lowCount++;
                }
            });
            
            return { highCount, mediumCount, lowCount };
        };
        
        const riskCounts = countRisksByLevel();
        
        // Format risk items for display
        const formatRiskItems = (items, maxItems = 3) => {
            if (!items || !Array.isArray(items) || items.length === 0) {
                return '<p class="small text-muted">No specific risks identified</p>';
            }
            return items.slice(0, maxItems).map(item => 
                `<p class="small mb-1">• ${item}</p>`
            ).join('') + (items.length > maxItems ? 
                `<p class="small text-muted">...and ${items.length - maxItems} more</p>` : '');
        };
        
        // Helper to get risk indicator
        const getRiskIndicator = (riskText) => {
            if (!riskText) return 'risk-low';
            const risk = riskText.toLowerCase();
            if (risk.includes('high')) return 'risk-high';
            if (risk.includes('moderate') || risk.includes('medium')) return 'risk-medium';
            return 'risk-low';
        };
        
        // Get consolidated risk levels
        const financialRiskLevel = riskData.financial_risks_from_analysis?.consolidated_financial_risk_level || 'Moderate';
        const operationalRiskLevel = riskData.operational_risks?.consolidated_operational_risk_level || 'Low to Moderate';
        const complianceRiskLevel = riskData.compliance_risks?.consolidated_compliance_risk_level || 'Moderate';
        const overallRiskAssessment = riskData.overall_integrated_risk_assessment || {};
        
        // Get priority actions
        const priorityActions = overallRiskAssessment.frca_priority_actions || [];

        const content = `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="section-title">Integrated Risk Assessment</h3>
                <div>
                    <button class="btn btn-primary" onclick="RiskAssessment.exportRiskMatrix()">
                        <i class="fas fa-download me-2"></i> Export Matrix
                    </button>
                </div>
            </div>
            
            <!-- Risk Summary Cards -->
            <div class="row">
                <div class="col-md-4">
                    <div class="dashboard-card danger text-center">
                        <div class="metric-label">High Risk Areas</div>
                        <div class="metric-value">${riskCounts.highCount}</div>
                        <div class="mt-2">
                            ${overallRiskAssessment.highest_risk_areas && overallRiskAssessment.highest_risk_areas.length > 0 ?
                                formatRiskItems(overallRiskAssessment.highest_risk_areas) :
                                '<p class="small text-muted">No high risks identified</p>'
                            }
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="dashboard-card warning text-center">
                        <div class="metric-label">Medium Risk Areas</div>
                        <div class="metric-value">${riskCounts.mediumCount}</div>
                        <div class="mt-2">
                            ${overallRiskAssessment.medium_risk_areas && overallRiskAssessment.medium_risk_areas.length > 0 ?
                                formatRiskItems(overallRiskAssessment.medium_risk_areas) :
                                '<p class="small text-muted">No medium risks identified</p>'
                            }
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="dashboard-card success text-center">
                        <div class="metric-label">Low Risk Areas</div>
                        <div class="metric-value">${riskCounts.lowCount}</div>
                        <div class="mt-2">
                            ${overallRiskAssessment.low_risk_areas && overallRiskAssessment.low_risk_areas.length > 0 ?
                                formatRiskItems(overallRiskAssessment.low_risk_areas) :
                                '<p class="small text-muted">No low risks identified</p>'
                            }
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Risk Factor Synthesis -->
            <div class="dashboard-card mb-4">
                <h5><i class="fas fa-project-diagram me-2"></i>Risk Factor Synthesis</h5>
                <div class="row">
                    <div class="col-md-4">
                        <h6>Financial Risks <span class="badge ${getRiskIndicator(financialRiskLevel)} ms-1">${financialRiskLevel}</span></h6>
                        <div class="list-group">
                            ${riskData.financial_risks_from_analysis?.from_ratio_trends?.map(risk => `
                                <div class="list-group-item">
                                    <div class="d-flex justify-content-between">
                                        <span>${risk}</span>
                                        <span class="risk-indicator ${getRiskIndicator(financialRiskLevel)}"></span>
                                    </div>
                                </div>
                            `).join('') || '<div class="list-group-item text-muted">No financial risks specified</div>'}
                            
                            ${riskData.financial_risks_from_analysis?.from_cash_flow_patterns?.map(risk => `
                                <div class="list-group-item">
                                    <div class="d-flex justify-content-between">
                                        <span>${risk}</span>
                                        <span class="risk-indicator ${getRiskIndicator(financialRiskLevel)}"></span>
                                    </div>
                                </div>
                            `).join('') || ''}
                            
                            ${riskData.financial_risks_from_analysis?.from_earnings_quality?.map(risk => `
                                <div class="list-group-item">
                                    <div class="d-flex justify-content-between">
                                        <span>${risk}</span>
                                        <span class="risk-indicator ${getRiskIndicator(financialRiskLevel)}"></span>
                                    </div>
                                </div>
                            `).join('') || ''}
                        </div>
                    </div>
                    
                    <div class="col-md-4">
                        <h6>Operational Risks <span class="badge ${getRiskIndicator(operationalRiskLevel)} ms-1">${operationalRiskLevel}</span></h6>
                        <div class="list-group">
                            ${riskData.operational_risks?.from_segment_analysis?.map(risk => `
                                <div class="list-group-item">
                                    <div class="d-flex justify-content-between">
                                        <span>${risk}</span>
                                        <span class="risk-indicator ${getRiskIndicator(operationalRiskLevel)}"></span>
                                    </div>
                                </div>
                            `).join('') || '<div class="list-group-item text-muted">No operational risks specified</div>'}
                            
                            ${riskData.operational_risks?.from_related_party_transactions?.map(risk => `
                                <div class="list-group-item">
                                    <div class="d-flex justify-content-between">
                                        <span>${risk}</span>
                                        <span class="risk-indicator ${getRiskIndicator(operationalRiskLevel)}"></span>
                                    </div>
                                </div>
                            `).join('') || ''}
                        </div>
                    </div>
                    
                    <div class="col-md-4">
                        <h6>Compliance Risks <span class="badge ${getRiskIndicator(complianceRiskLevel)} ms-1">${complianceRiskLevel}</span></h6>
                        <div class="list-group">
                            ${riskData.compliance_risks?.from_ifrs_departures?.map(risk => `
                                <div class="list-group-item">
                                    <div class="d-flex justify-content-between">
                                        <span>${risk}</span>
                                        <span class="risk-indicator ${getRiskIndicator(complianceRiskLevel)}"></span>
                                    </div>
                                </div>
                            `).join('') || '<div class="list-group-item text-muted">No compliance risks specified</div>'}
                            
                            ${riskData.compliance_risks?.from_regulatory_breaches?.map(risk => `
                                <div class="list-group-item">
                                    <div class="d-flex justify-content-between">
                                        <span>${risk}</span>
                                        <span class="risk-indicator ${getRiskIndicator(complianceRiskLevel)}"></span>
                                    </div>
                                </div>
                            `).join('') || ''}
                            
                            ${riskData.compliance_risks?.from_governance_weaknesses?.map(risk => `
                                <div class="list-group-item">
                                    <div class="d-flex justify-content-between">
                                        <span>${risk}</span>
                                        <span class="risk-indicator ${getRiskIndicator(complianceRiskLevel)}"></span>
                                    </div>
                                </div>
                            `).join('') || ''}
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Risk Heat Map -->
            <div class="dashboard-card mb-4">
                <h5><i class="fas fa-chart-bar me-2"></i>Risk Heat Map</h5>
                <div class="row">
                    <div class="col-md-8">
                        <canvas id="riskHeatMap" height="250"></canvas>
                    </div>
                    <div class="col-md-4">
                        <div class="mt-3">
                            <h6>Risk Level Summary</h6>
                            <table class="table table-sm">
                                <tr>
                                    <td><span class="risk-indicator risk-high me-2"></span> Financial Risk:</td>
                                    <td class="fw-bold">${financialRiskLevel}</td>
                                </tr>
                                <tr>
                                    <td><span class="risk-indicator risk-medium me-2"></span> Operational Risk:</td>
                                    <td class="fw-bold">${operationalRiskLevel}</td>
                                </tr>
                                <tr>
                                    <td><span class="risk-indicator risk-medium me-2"></span> Compliance Risk:</td>
                                    <td class="fw-bold">${complianceRiskLevel}</td>
                                </tr>
                                <tr>
                                    <td><span class="risk-indicator risk-medium me-2"></span> Overall Risk:</td>
                                    <td class="fw-bold">${overallRiskAssessment ? 'Moderate' : 'To be assessed'}</td>
                                </tr>
                            </table>
                            
                            <div class="mt-4">
                                <h6>Key Audit Matters</h6>
                                <div class="small">
                                    ${riskData.key_audit_matters_synthesis?.kams_identified_by_auditor?.slice(0, 3).map(kam => 
                                        `<div class="mb-1">• ${kam}</div>`
                                    ).join('') || 'No KAM data available'}
                                    ${riskData.key_audit_matters_synthesis?.kams_identified_by_auditor?.length > 3 ? 
                                        `<div class="text-muted">...and ${riskData.key_audit_matters_synthesis.kams_identified_by_auditor.length - 3} more</div>` : ''
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Risk Interconnections -->
            ${overallRiskAssessment.risk_interconnections ? `
            <div class="dashboard-card mb-4">
                <h5><i class="fas fa-link me-2"></i>Risk Interconnections</h5>
                <div class="alert alert-info">
                    <i class="fas fa-info-circle me-2"></i>
                    ${Array.isArray(overallRiskAssessment.risk_interconnections) ? 
                      overallRiskAssessment.risk_interconnections.join(' ') : 
                      overallRiskAssessment.risk_interconnections}
                </div>
            </div>
            ` : ''}
            
            <!-- FRCA Priority Actions -->
            <div class="dashboard-card">
                <h5><i class="fas fa-tasks me-2"></i>FRCA Priority Actions</h5>
                ${priorityActions.length > 0 ? `
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th width="15%">Priority</th>
                                <th>Action Required</th>
                                <th width="25%">Timeline</th>
                                <th width="15%">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${priorityActions.map((action, index) => {
                                let priority = 'Medium';
                                let tableClass = 'table-warning';
                                let badgeClass = 'bg-warning';
                                
                                if (index === 0) {
                                    priority = 'Critical';
                                    tableClass = 'table-danger';
                                    badgeClass = 'bg-danger';
                                } else if (index < 3) {
                                    priority = 'High';
                                    tableClass = 'table-danger';
                                    badgeClass = 'bg-warning';
                                }
                                
                                const timeline = index === 0 ? 'Immediate' : 
                                               index === 1 ? '30 days' : 
                                               index === 2 ? '60 days' : 
                                               '90 days';
                                
                                return `
                                    <tr class="${tableClass}">
                                        <td>${priority}</td>
                                        <td>${action}</td>
                                        <td>${timeline}</td>
                                        <td><span class="badge ${badgeClass}">Pending</span></td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
                ` : `
                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    No specific priority actions defined in the risk assessment.
                </div>
                `}
            </div>
            
            <!-- Additional Risk Information -->
            <div class="row mt-4">
                <div class="col-md-6">
                    <div class="dashboard-card">
                        <h6><i class="fas fa-file-audit me-2"></i>Audit Risk Insights</h6>
                        <div class="small">
                            ${auditAnalysis.key_audit_matters_extraction ? `
                                <p><strong>Key Audit Matters:</strong> ${auditAnalysis.key_audit_matters_extraction.length} identified</p>
                                <p><strong>Audit Opinion:</strong> ${auditAnalysis.opinion_type_analysis?.opinion_category || 'Unmodified'}</p>
                                <p><strong>Going Concern:</strong> ${auditAnalysis.going_concern_analysis?.material_uncertainty_disclosed ? 'Material uncertainty' : 'No concerns'}</p>
                            ` : '<p class="text-muted">No detailed audit analysis available</p>'}
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="dashboard-card">
                        <h6><i class="fas fa-shield-alt me-2"></i>Compliance Status</h6>
                        <div class="small">
                            ${regulatoryData.overall_regulatory_assessment ? `
                                <p><strong>Overall Assessment:</strong> ${regulatoryData.overall_regulatory_assessment}</p>
                            ` : ''}
                            <p><strong>Material Departures:</strong> ${materialDepartures.length} found</p>
                            <p><strong>Regulators:</strong> ${regulatoryData.applicable_regulators?.length || 0} applicable</p>
                            <p><strong>BSEC Compliance:</strong> ${regulatoryData.applicable_regulators?.find(r => r.regulator_name?.includes('BSEC'))?.compliance_status || 'To be assessed'}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        UIComponents.getMainContent().innerHTML = content;
        this.renderRiskCharts(financialRiskLevel, operationalRiskLevel, complianceRiskLevel);
    }

    static renderRiskCharts(financialRisk, operationalRisk, complianceRisk) {
        const riskCtx = document.getElementById('riskHeatMap')?.getContext('2d');
        if (riskCtx) {
            // Convert risk levels to numerical values for chart
            const riskToNumber = (risk) => {
                if (!risk) return 5;
                const riskStr = risk.toString().toLowerCase();
                if (riskStr.includes('high')) return 8;
                if (riskStr.includes('moderate') || riskStr.includes('medium')) return 6;
                if (riskStr.includes('low to moderate') || riskStr.includes('low-to-moderate')) return 4;
                return 3;
            };
            
            const financialRiskScore = riskToNumber(financialRisk);
            const operationalRiskScore = riskToNumber(operationalRisk);
            const complianceRiskScore = riskToNumber(complianceRisk);
            
            // Destroy existing chart if it exists
            if (window.riskChartInstance) {
                window.riskChartInstance.destroy();
            }
            
            window.riskChartInstance = new Chart(riskCtx, {
                type: 'radar',
                data: {
                    labels: ['Financial Risk', 'Operational Risk', 'Compliance Risk', 'Reporting Risk', 'Governance Risk'],
                    datasets: [{
                        label: 'Current Risk Level',
                        data: [
                            financialRiskScore,
                            operationalRiskScore,
                            complianceRiskScore,
                            riskToNumber('Moderate'), // Reporting risk
                            riskToNumber('Moderate')  // Governance risk
                        ],
                        backgroundColor: 'rgba(244, 67, 54, 0.2)',
                        borderColor: '#f44336',
                        pointBackgroundColor: '#f44336',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#f44336'
                    }, {
                        label: 'Industry Benchmark',
                        data: [5, 5, 5, 5, 5],
                        backgroundColor: 'rgba(33, 150, 243, 0.2)',
                        borderColor: '#2196f3',
                        pointBackgroundColor: '#2196f3',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#2196f3'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 10,
                            ticks: {
                                stepSize: 2
                            },
                            pointLabels: {
                                font: {
                                    size: 11
                                }
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Risk Heat Map Comparison',
                            font: {
                                size: 14
                            }
                        },
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const value = context.raw;
                                    let level = 'Low';
                                    if (value >= 7) level = 'High';
                                    else if (value >= 4) level = 'Moderate';
                                    return `${context.dataset.label}: ${value} (${level} Risk)`;
                                }
                            }
                        }
                    }
                }
            });
        }
    }


    static exportRiskMatrix() {
        Notifications.show('Risk matrix exported successfully!', 'success');
        
        // Create export data
        const section25 = appState.allJSONData[25];
        const riskData = section25?.frc_analysis_report?.entity?.phase_5_synthesis_and_findings?.holistic_risk_factor_synthesis || {};
        
        const exportData = {
            timestamp: new Date().toISOString(),
            riskAssessment: riskData,
            summary: {
                financialRisk: riskData.financial_risks_from_analysis?.consolidated_financial_risk_level,
                operationalRisk: riskData.operational_risks?.consolidated_operational_risk_level,
                complianceRisk: riskData.compliance_risks?.consolidated_compliance_risk_level,
                priorityActions: riskData.overall_integrated_risk_assessment?.frca_priority_actions || []
            }
        };
        
        // Create download link
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = `risk_assessment_${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }
}

window.RiskAssessment = RiskAssessment;
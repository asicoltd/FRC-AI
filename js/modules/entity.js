import { allJSONData } from '../data/loader.js';
import { showNotification } from '../ui/notifications.js';

export function loadEntityProfile() {
    const content = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="section-title">Entity Context & Framework</h3>
        </div>
        
        <div class="row">
            <div class="col-md-6">
                <div class="dashboard-card">
                    <h5><i class="fas fa-info-circle me-2 text-primary"></i>Entity Profile</h5>
                    <table class="table table-borderless" id="entityProfileTable">
                        <tr>
                            <th width="40%">Legal Name:</th>
                            <td id="legalName">Loading...</td>
                        </tr>
                        <tr>
                            <th>Trade Name:</th>
                            <td id="tradeName">Loading...</td>
                        </tr>
                        <tr>
                            <th>Registration Number:</th>
                            <td id="registrationNumber">Loading...</td>
                        </tr>
                        <tr>
                            <th>Industry Sector:</th>
                            <td id="industrySector">Loading...</td>
                        </tr>
                        <tr>
                            <th>Listing Status:</th>
                            <td id="listingStatus">Loading...</td>
                        </tr>
                        <tr>
                            <th>Reporting Currency:</th>
                            <td id="reportingCurrency">BDT</td>
                        </tr>
                        <tr>
                            <th>Financial Year End:</th>
                            <td id="financialYearEnd">YYYY-12-31</td>
                        </tr>
                    </table>
                </div>
                
                <div class="dashboard-card">
                    <h5><i class="fas fa-balance-scale me-2 text-primary"></i>Materiality Framework</h5>
                    <table class="table table-borderless" id="materialityTable">
                        <tr>
                            <th width="50%">Benchmark Used:</th>
                            <td id="materialityBenchmark">Loading...</td>
                        </tr>
                        <tr>
                            <th>Percentage Applied:</th>
                            <td id="materialityPercentage">Loading...</td>
                        </tr>
                        <tr>
                            <th>Overall Materiality:</th>
                            <td id="overallMateriality">Loading...</td>
                        </tr>
                        <tr>
                            <th>Performance Materiality:</th>
                            <td id="performanceMateriality">Loading...</td>
                        </tr>
                    </table>
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="dashboard-card">
                    <h5><i class="fas fa-file-contract me-2 text-primary"></i>Reporting Framework</h5>
                    <div class="mb-3">
                        <label class="form-label">Disclosed Framework:</label>
                        <div id="disclosedFramework" class="p-2 bg-light rounded">IFRS as adopted in Bangladesh</div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Source Documents:</label>
                        <div id="sourceDocuments" class="p-2 bg-light rounded">
                            <ul class="mb-0">
                                <li>Annual Report 2023</li>
                                <li>Audited Financial Statements</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="dashboard-card">
                    <h5><i class="fas fa-gavel me-2 text-primary"></i>Regulatory Landscape</h5>
                    <div class="mb-3">
                        <h6>Applicable Regulators:</h6>
                        <div id="applicableRegulators" class="d-flex flex-wrap gap-2">
                            <span class="badge bg-secondary">FRC</span>
                            <span class="badge bg-secondary">BSEC</span>
                        </div>
                    </div>
                    <div class="mb-3">
                        <h6>Statutory Filings Status:</h6>
                        <table class="table table-sm">
                            <tr>
                                <td>BSEC Filed:</td>
                                <td><span id="bsecFiled" class="badge bg-success">Yes</span></td>
                                <td><small id="bsecFilingDate">2023-06-30</small></td>
                            </tr>
                            <tr>
                                <td>Income Tax Return:</td>
                                <td><span id="taxReturnFiled" class="badge bg-success">Filed</span></td>
                                <td><small id="taxYear">2022-23</small></td>
                            </tr>
                            <tr>
                                <td>RJSC Compliance:</td>
                                <td><span id="rjscCompliance" class="badge bg-success">Compliant</span></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="dashboard-card">
            <h5><i class="fas fa-comment-dots me-2 text-primary"></i>Materiality Conclusion</h5>
            <div id="materialityConclusion" class="p-3 bg-light rounded">
                Materiality assessment completed based on quantitative and qualitative factors.
            </div>
        </div>
    `;

    document.getElementById('mainContent').innerHTML = content;
    loadEntityData();
}

function loadEntityData() {
    console.log('Loading entity data...');

    // Load data from JSON files
    const entityProfileData = allJSONData[2];
    const materialityData = allJSONData[3];
    const metadata = allJSONData[1];
    const regulatoryData = allJSONData[5];

    // ==================== ENTITY PROFILE ====================
    if (entityProfileData) {
        const frcReport = entityProfileData.frc_analysis_report;
        const entity = frcReport?.entity;
        const profile = entity?.entity_profile;

        if (profile) {
            document.getElementById('legalName').textContent = 
                profile.legal_name || '[Not Specified]';
            document.getElementById('tradeName').textContent = 
                profile.trade_name || '[Not Specified]';
            document.getElementById('registrationNumber').textContent = 
                profile.registration_number || '[Not Specified]';
            document.getElementById('industrySector').textContent = 
                profile.industry_sector || '[Not Available]';
            document.getElementById('listingStatus').textContent = 
                profile.listing_status || '[Not Available]';
            document.getElementById('reportingCurrency').textContent = 
                profile.reporting_currency || 'BDT';
            document.getElementById('financialYearEnd').textContent = 
                profile.financial_year_end || '[Not Available]';
        }
    }

    // ==================== MATERIALITY FRAMEWORK ====================
    if (materialityData) {
        const materiality = materialityData.frc_analysis_report?.entity?.materiality_framework;
        const quantitative = materiality?.quantitative_materiality;

        if (quantitative) {
            document.getElementById('materialityBenchmark').textContent = 
                quantitative.benchmark_used || '[Not Specified]';
            document.getElementById('materialityPercentage').textContent = 
                quantitative.percentage_applied || '[Not Specified]';
            document.getElementById('overallMateriality').textContent = 
                quantitative.overall_materiality_amount || '[Not Specified]';
            document.getElementById('performanceMateriality').textContent = 
                quantitative.performance_materiality_amount || '[Not Specified]';
        }

        if (materiality?.frc_materiality_conclusion) {
            document.getElementById('materialityConclusion').textContent = 
                materiality.frc_materiality_conclusion;
        }
    }

    // ==================== REPORTING FRAMEWORK ====================
    if (metadata) {
        const meta = metadata.frc_analysis_report?.metadata;
        if (meta?.analysis_scope) {
            document.getElementById('disclosedFramework').textContent = meta.analysis_scope;
        }
    }

    console.log('✅ Entity data loaded');
}
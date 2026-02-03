// Entity Profile Section
class EntityProfile {
    static load() {
        appState.currentSection = 'entity';
        UIComponents.updateActiveSidebarItem('entity');

        const content = `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="section-title">Entity Context & Framework</h3>
            </div>
            
            <div class="row">
                <div class="col-md-6">
                    <div class="dashboard-card">
                        <h5><i class="fas fa-info-circle me-2 text-primary"></i>Entity Profile</h5>
                        <div id="entityProfileLoading" class="text-center py-3">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <table id="entityProfileTable" class="table table-borderless" style="display: none;">
                            <tr>
                                <th width="40%">Legal Name:</th>
                                <td id="legalName">[Loading...]</td>
                            </tr>
                            <tr>
                                <th>Trade Name:</th>
                                <td id="tradeName">[Loading...]</td>
                            </tr>
                            <tr>
                                <th>Registration Number:</th>
                                <td id="registrationNumber">[Loading...]</td>
                            </tr>
                            <tr>
                                <th>Industry Sector:</th>
                                <td id="industrySector">[Loading...]</td>
                            </tr>
                            <tr>
                                <th>Listing Status:</th>
                                <td id="listingStatus">[Loading...]</td>
                            </tr>
                            <tr>
                                <th>FRC Listing Status:</th>
                                <td id="frc_sector">[Loading...]</td>
                            </tr>
                            <tr>
                                <th>Reporting Currency:</th>
                                <td id="reportingCurrency">[Loading...]</td>
                            </tr>
                            <tr>
                                <th>Financial Year End:</th>
                                <td id="financialYearEnd">[Loading...]</td>
                            </tr>
                            <tr>
                            <th>Annual Report Link:</th>
                            <td>
                                <a id="annualReportLink" href="#" target="_blank" rel="noopener">
                                    [Loading...]
                                </a>
                            </td>
                        </tr>
                        </table>
                    </div>
                    
                    <div class="dashboard-card">
                        <h5><i class="fas fa-balance-scale me-2 text-primary"></i>Materiality Framework</h5>
                        <div id="materialityLoading" class="text-center py-3">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <table id="materialityTable" class="table table-borderless" style="display: none;">
                            <tr>
                                <th width="50%">Benchmark Used:</th>
                                <td id="materialityBenchmark">[Loading...]</td>
                            </tr>
                            <tr>
                                <th>Percentage Applied:</th>
                                <td id="materialityPercentage">[Loading...]</td>
                            </tr>
                            <tr>
                                <th>Overall Materiality:</th>
                                <td id="overallMateriality">[Loading...]</td>
                            </tr>
                            <tr>
                                <th>Performance Materiality:</th>
                                <td id="performanceMateriality">[Loading...]</td>
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
                            <label class="form-label">Actual Standards Applied:</label>
                            <div id="actualStandards" class="p-2 bg-light rounded">
                                <span class="badge bg-primary me-1">IAS 1</span>
                                <span class="badge bg-primary me-1">IAS 2</span>
                                <span class="badge bg-primary me-1">IAS 16</span>
                                <span class="badge bg-primary me-1">IFRS 9</span>
                                <span class="badge bg-primary me-1">IFRS 15</span>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Compliance Assessment:</label>
                            <div class="compliance-badge badge-partial">Partially Compliant</div>
                        </div>
                    </div>
                    
                    <div class="dashboard-card">
                        <h5><i class="fas fa-gavel me-2 text-primary"></i>Regulatory Landscape</h5>
                        <div class="mb-3">
                            <h6>Applicable Regulators:</h6>
                            <div class="d-flex flex-wrap gap-2" id="applicableRegulators">
                                <span class="badge bg-secondary">FRC</span>
                                <span class="badge bg-secondary">BSEC</span>
                                <span class="badge bg-secondary">RJSC</span>
                                <span class="badge bg-secondary">NBR</span>
                            </div>
                        </div>
                        <div class="mb-3">
                            <h6>Statutory Filings Status:</h6>
                            <table class="table table-sm">
                                <tr>
                                    <td>BSEC Filed:</td>
                                    <td><span id="bsecFiled" class="badge bg-success">Yes</span></td>
                                </tr>
                                <tr>
                                    <td>Income Tax Return:</td>
                                    <td><span id="taxReturnFiled" class="badge bg-success">Filed</span></td>
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
                <div id="materialityConclusionLoading" class="text-center py-3">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div id="materialityConclusionContent" class="p-3 bg-light rounded" style="display: none;">
                    <div id="materialityConclusionText">
                        Materiality assessment completed based on 5% of profit before tax. Qualitative factors considered include related party transactions and going concern indicators.
                    </div>
                </div>
            </div>
            
            <div class="mt-4 text-center">
                <div class="alert alert-info mb-0">
                    <i class="fas fa-database me-2"></i>
                    <strong>Data Source:</strong> 
                    <code>https://asicoltd.github.io/FRC-AI/dataset/${appState.currentCompanyId}/</code>
                    <br>
                    <small>Last updated: <span id="lastRefreshTime">${new Date().toLocaleString()}</span></small>
                </div>
            </div>
        `;

        UIComponents.getMainContent().innerHTML = content;
        this.loadData();
    }

    static loadData() {
        console.log('Loading entity data for Company', appState.currentCompanyId);

        // Clear previous loading states
        const entityProfileLoading = document.getElementById('entityProfileLoading');
        const materialityLoading = document.getElementById('materialityLoading');
        const materialityConclusionLoading = document.getElementById('materialityConclusionLoading');

        if (entityProfileLoading) entityProfileLoading.style.display = 'none';
        if (materialityLoading) materialityLoading.style.display = 'none';
        if (materialityConclusionLoading) materialityConclusionLoading.style.display = 'none';

        const entityProfileTable = document.getElementById('entityProfileTable');
        const materialityTable = document.getElementById('materialityTable');
        const materialityConclusionContent = document.getElementById('materialityConclusionContent');

        if (entityProfileTable) entityProfileTable.style.display = 'table';
        if (materialityTable) materialityTable.style.display = 'table';
        if (materialityConclusionContent) materialityConclusionContent.style.display = 'block';

        // Load data from JSON files
        const entityProfileData = appState.allJSONData[2]; // 2.json contains entity profile
        const materialityData = appState.allJSONData[3];   // 3.json contains materiality framework
        const metadata = appState.allJSONData[1];          // 1.json contains metadata

        console.log('Entity Profile Data (2.json):', entityProfileData);
        console.log('Materiality Data (3.json):', materialityData);
        console.log('Metadata (1.json):', metadata);

        // ==================== ENTITY PROFILE (from 2.json) ====================
        if (entityProfileData) {
            const frcReport = entityProfileData.frc_analysis_report;
            const entity = frcReport?.entity;
            const profile = entity?.entity_profile;

            console.log('Extracted entity profile:', profile);

            if (profile) {
                // Update each field
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
                document.getElementById('frc_sector').textContent =
                    profile.frc_sector || '[Not Available]';
                document.getElementById('reportingCurrency').textContent =
                    profile.reporting_currency || 'BDT';
                document.getElementById('financialYearEnd').textContent =
                    profile.financial_year_end || '[Not Available]';
                document.getElementById('annualReportLink').textContent =
                    profile.annual_report_link || '[Not Available]';
                document.getElementById('annualReportLink').href =
                    profile.annual_report_link || '#';
                console.log('Metadata source documents:', metadata.source_documents);
                // Add entity ID if available
                if (entity?.entity_id) {
                    let entityIdRow = document.querySelector('#entityIdRow');
                    if (!entityIdRow) {
                        const table = document.getElementById('entityProfileTable');
                        if (table) {
                            const firstRow = table.querySelector('tr');
                            const newRow = document.createElement('tr');
                            newRow.id = 'entityIdRow';
                            newRow.innerHTML = `
                                <th width="40%">Entity ID:</th>
                                <td>${entity.entity_id}</td>
                            `;
                            if (firstRow) {
                                firstRow.parentNode.insertBefore(newRow, firstRow);
                            }
                        }
                    } else {
                        entityIdRow.querySelector('td').textContent = entity.entity_id;
                    }
                }

                // Add PDF token and report ID if available
                if (entityProfileData.pdf_token) {
                    let pdfTokenRow = document.querySelector('#pdfTokenRow');
                    if (!pdfTokenRow) {
                        const table = document.getElementById('entityProfileTable');
                        if (table) {
                            const lastRow = table.querySelector('tr:last-child');
                            const newRow = document.createElement('tr');
                            newRow.id = 'pdfTokenRow';
                            newRow.innerHTML = `
                                <th>PDF Token:</th>
                                <td>${entityProfileData.pdf_token}</td>
                            `;
                            table.appendChild(newRow);
                        }
                    }
                }

                if (entityProfileData.report_id) {
                    let reportIdRow = document.querySelector('#reportIdRow');
                    if (!reportIdRow) {
                        const table = document.getElementById('entityProfileTable');
                        if (table) {
                            const lastRow = table.querySelector('tr:last-child');
                            const newRow = document.createElement('tr');
                            newRow.id = 'reportIdRow';
                            newRow.innerHTML = `
                                <th>Report ID:</th>
                                <td>${entityProfileData.report_id}</td>
                            `;
                            table.appendChild(newRow);
                        }
                    }
                }

                console.log('✅ Entity Profile loaded successfully');
            } else {
                console.warn('Entity profile not found in 2.json data structure');
                Notifications.show('Entity profile structure not found in 2.json', 'warning');
            }
        } else {
            console.warn('2.json data not loaded');
            document.getElementById('legalName').textContent = 'Data not loaded (2.json missing)';
            Notifications.show('Entity profile data (2.json) not loaded', 'error');
        }

        // ==================== MATERIALITY FRAMEWORK (from 3.json) ====================
        if (materialityData) {
            
            const materiality = materialityData.frc_analysis_report?.entity?.materiality_framework;
            alert(materiality);
            console.log('Extracted materiality framework:', materiality);

            if (materiality) {
                const quantitative = materiality.quantitative_materiality;
                
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

                // Display qualitative considerations
                if (materiality.qualitative_materiality_considerations) {
                    const considerationsDiv = document.getElementById('qualitativeConsiderations');
                    if (considerationsDiv) {
                        considerationsDiv.innerHTML = materiality.qualitative_materiality_considerations
                            .map(item => `<li class="mb-1">${item}</li>`)
                            .join('');

                        // Show the section
                        const considerationsSection = document.getElementById('qualitativeConsiderationsSection');
                        if (considerationsSection) {
                            considerationsSection.style.display = 'block';
                        }
                    }
                }

                // Display materiality conclusion
                if (materiality.frc_materiality_conclusion) {
                    const conclusionElement = document.getElementById('materialityConclusionText');
                    if (conclusionElement) {
                        const conclusion = materiality.frc_materiality_conclusion || '[Not Specified]';
                        const reason = materiality.reason_of_the_status || '[Not Specified]';
                        const statusReference = materiality.status_reference || '[Not Specified]';
                        conclusionElement.textContent = `${conclusion} ** ${reason}, Source: ${statusReference}`;
                    }
                }

                console.log('✅ Materiality Framework loaded successfully');
            } else {
                console.warn('Materiality framework not found in 3.json data structure');
                Notifications.show('Materiality framework structure not found in 3.json', 'warning');
            }
        } else {
            console.warn('3.json data not loaded');
            document.getElementById('materialityBenchmark').textContent = 'Data not loaded (3.json missing)';
            Notifications.show('Materiality framework data (3.json) not loaded', 'error');
        }

        // ==================== REPORTING FRAMEWORK (from 1.json) ====================
        if (metadata) {
            const meta = metadata.frc_analysis_report?.metadata;

            console.log('Extracted metadata:', meta);

            if (meta) {
                document.getElementById('disclosedFramework').textContent =
                    meta.analysis_scope || 'IFRS as adopted in Bangladesh';

                // Display source documents
                if (meta.source_documents && Array.isArray(meta.source_documents)) {
                    const sourcesDiv = document.getElementById('sourceDocuments');
                    if (sourcesDiv) {
                        sourcesDiv.innerHTML = meta.source_documents
                            .map(doc => `<li class="mb-1">${doc}</li>`)
                            .join('');
                    }
                }

                console.log('✅ Metadata loaded successfully');
            } else {
                console.warn('Metadata not found in 1.json data structure');
                Notifications.show('Metadata structure not found in 1.json', 'warning');
            }
        } else {
            console.warn('1.json data not loaded');
            Notifications.show('Metadata (1.json) not loaded', 'error');
        }

        // ==================== REGULATORY LANDSCAPE (from 5.json if available) ====================
        const regulatoryData = appState.allJSONData[5];
        if (regulatoryData) {
            const regulatory = regulatoryData.frc_analysis_report?.entity?.phase_1_foundational_checks?.regulatory_landscape;

            console.log('Extracted regulatory data:', regulatory);

            if (regulatory) {
                // Update regulators
                if (regulatory.applicable_regulators) {
                    const regulatorsDiv = document.getElementById('applicableRegulators');
                    if (regulatorsDiv) {
                        regulatorsDiv.innerHTML = regulatory.applicable_regulators
                            .filter(reg => reg.regulator_name)
                            .map(reg => `<span class="badge bg-secondary me-1 mb-1">${reg.regulator_name}</span>`)
                            .join('');
                    }
                }

                // Update statutory filings status
                if (regulatory.statutory_filings_status) {
                    const filings = regulatory.statutory_filings_status;

                    // Update BSEC filed status
                    const bsecFiledElement = document.getElementById('bsecFiled');
                    if (bsecFiledElement) {
                        bsecFiledElement.textContent = filings.bsec_filed ? 'Yes' : 'No';
                        bsecFiledElement.className = filings.bsec_filed ? 'badge bg-success' : 'badge bg-danger';
                    }

                    // Update tax return filed status
                    const taxReturnFiledElement = document.getElementById('taxReturnFiled');
                    if (taxReturnFiledElement) {
                        taxReturnFiledElement.textContent = filings.income_tax_return_filed ? 'Filed' : 'Not Filed';
                        taxReturnFiledElement.className = filings.income_tax_return_filed ? 'badge bg-success' : 'badge bg-danger';
                    }

                    // Update RJSC compliance
                    const rjscComplianceElement = document.getElementById('rjscCompliance');
                    if (rjscComplianceElement) {
                        rjscComplianceElement.textContent = filings.rjsc_compliance ? 'Compliant' : 'Non-Compliant';
                        rjscComplianceElement.className = filings.rjsc_compliance ? 'badge bg-success' : 'badge bg-danger';
                    }
                }

                console.log('✅ Regulatory data loaded successfully');
            } else {
                console.warn('Regulatory data not found in 5.json data structure');
            }
        } else {
            console.log('5.json not loaded (optional file)');
        }

        // Update last refresh time
        const lastRefreshElement = document.getElementById('lastRefreshTime');
        if (lastRefreshElement) {
            lastRefreshElement.textContent = new Date().toLocaleString();
        }

        console.log('✅ Entity data loading complete');
    }
}

window.EntityProfile = EntityProfile;
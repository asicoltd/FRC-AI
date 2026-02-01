import { availableCompanies, currentCompanyId } from '../data/companies.js';
import { allJSONData } from '../data/loader.js';
import { switchCompany } from '../data/companies.js';

// Load dashboard
export function loadDashboard() {
    const content = `
        <div class="container-fluid">
            <!-- Simple Header -->
            <div class="row mb-4">
                <div class="col-12">
                    <h1 class="display-6 mb-2">
                        <i class="fas fa-building me-2 text-primary"></i>
                        Company Dashboard
                    </h1>
                    <p class="text-muted mb-0">Select a company to analyze</p>
                </div>
            </div>
            
            <!-- Company Selection Cards -->
            <div class="row mb-4">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title mb-4">
                                <i class="fas fa-list me-2"></i>
                                Available Companies
                            </h5>
                            
                            <!-- Search Box -->
                            <div class="input-group mb-4">
                                <span class="input-group-text">
                                    <i class="fas fa-search"></i>
                                </span>
                                <input type="text" 
                                       class="form-control" 
                                       id="companySearch" 
                                       placeholder="Search companies by name..."
                                       onkeyup="filterCompanies()">
                            </div>
                            
                            <!-- Companies Grid -->
                            <div class="row" id="companiesGrid">
                                ${availableCompanies.map(id => `
                                    <div class="col-md-3 col-sm-6 mb-3 company-card" data-company-id="${id}">
                                        <div class="card h-100 company-select-card ${id === currentCompanyId ? 'border-primary' : ''}">
                                            <div class="card-body text-center">
                                                <div class="mb-3">
                                                    <i class="fas fa-building fa-3x text-primary"></i>
                                                </div>
                                                <h5 class="card-title">Company ${id}</h5>
                                                <p class="card-text text-muted small">Click to analyze</p>
                                            </div>
                                            <div class="card-footer bg-transparent">
                                                <button class="btn btn-sm ${id === currentCompanyId ? 'btn-primary' : 'btn-outline-primary'} w-100"
                                                        onclick="switchCompany(${id})">
                                                    ${id === currentCompanyId ?
                                                        '<i class="fas fa-check me-1"></i> Selected' :
                                                        '<i class="fas fa-eye me-1"></i> View'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            
                            <!-- No Results Message -->
                            <div id="noCompaniesMessage" class="text-center py-5" style="display: none;">
                                <i class="fas fa-building fa-3x text-muted mb-3"></i>
                                <h5>No companies found</h5>
                                <p class="text-muted">Try a different search term</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Selected Company Info -->
            ${currentCompanyId ? `
            <div class="row">
                <div class="col-12">
                    <div class="card border-primary">
                        <div class="card-header bg-primary text-white">
                            <h5 class="mb-0">
                                <i class="fas fa-chart-line me-2"></i>
                                Currently Selected: Company ${currentCompanyId}
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <h6>Quick Actions</h6>
                                    <div class="d-flex flex-wrap gap-2 mt-3">
                                        <button class="btn btn-outline-primary" onclick="loadFinancialStatements()">
                                            <i class="fas fa-file-invoice-dollar me-1"></i> Financial Statements
                                        </button>
                                        <button class="btn btn-outline-success" onclick="loadFinancialAnalysis()">
                                            <i class="fas fa-chart-line me-1"></i> Ratio Analysis
                                        </button>
                                        <button class="btn btn-outline-warning" onclick="loadComplianceMatrix()">
                                            <i class="fas fa-clipboard-check me-1"></i> IFRS Compliance
                                        </button>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <h6>Company Data</h6>
                                    <div class="mt-3">
                                        <p class="mb-2">
                                            <strong>Status:</strong> 
                                            <span class="badge bg-success ms-2">Active</span>
                                        </p>
                                        <p class="mb-2">
                                            <strong>Files Loaded:</strong> 
                                            <span>${Object.keys(allJSONData).length} of 26</span>
                                        </p>
                                        <p class="mb-0">
                                            <strong>Last Updated:</strong> 
                                            <span>${new Date().toLocaleString()}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ` : ''}
        </div>
        
        <!-- Simple Add Company Modal -->
        <div class="modal fade" id="addCompanyModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add New Company</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="newCompanyId" class="form-label">Company ID Number</label>
                            <input type="number" class="form-control" id="newCompanyId" placeholder="Enter company ID">
                            <div class="form-text">Enter the numerical ID of the company to add</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="addNewCompany()">Add Company</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('mainContent').innerHTML = content;
}

// Filter companies by search
export function filterCompanies() {
    const searchTerm = document.getElementById('companySearch').value.toLowerCase();
    const companyCards = document.querySelectorAll('.company-card');
    const noResultsMessage = document.getElementById('noCompaniesMessage');

    let visibleCount = 0;

    companyCards.forEach(card => {
        const companyId = card.getAttribute('data-company-id');
        const cardText = `Company ${companyId}`.toLowerCase();

        if (cardText.includes(searchTerm)) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Show/hide no results message
    if (visibleCount === 0) {
        noResultsMessage.style.display = 'block';
    } else {
        noResultsMessage.style.display = 'none';
    }
}
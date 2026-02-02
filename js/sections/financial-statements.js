// Financial Statements Section
class FinancialStatements {
    static async load() {
        appState.currentSection = 'financial-statements';
        UIComponents.updateActiveSidebarItem('financial-statements');
        
        const mainContent = UIComponents.getMainContent();

        mainContent.innerHTML = `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <h2 class="mt-4 mb-4">Financial Statements</h2>
                        
                        <!-- Tabs Navigation -->
                        <ul class="nav nav-tabs mb-4" id="financialStatementTabs" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="balance-sheet-tab" data-bs-toggle="tab" 
                                        data-bs-target="#balance-sheet" type="button" role="tab">
                                    Statement of Financial Position
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pl-tab" data-bs-toggle="tab" 
                                        data-bs-target="#pl-statement" type="button" role="tab">
                                    Statement of Profit or Loss
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="cashflow-tab" data-bs-toggle="tab" 
                                        data-bs-target="#cashflow-statement" type="button" role="tab">
                                    Statement of Cash Flows
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="equity-tab" data-bs-toggle="tab" 
                                        data-bs-target="#equity-statement" type="button" role="tab">
                                    Statement of Changes in Equity
                                </button>
                            </li>
                        </ul>
                        
                        <!-- Tab Content -->
                        <div class="tab-content" id="financialStatementContent">
                            <div class="tab-pane fade show active" id="balance-sheet" role="tabpanel">
                                <div id="balanceSheetContainer" class="financial-statement-container">
                                    <div class="d-flex justify-content-center">
                                        <div class="spinner-border text-primary" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="pl-statement" role="tabpanel">
                                <div id="plStatementContainer" class="financial-statement-container">
                                    <div class="d-flex justify-content-center">
                                        <div class="spinner-border text-primary" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="cashflow-statement" role="tabpanel">
                                <div id="cashflowStatementContainer" class="financial-statement-container">
                                    <div class="d-flex justify-content-center">
                                        <div class="spinner-border text-primary" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="equity-statement" role="tabpanel">
                                <div id="equityStatementContainer" class="financial-statement-container">
                                    <div class="d-flex justify-content-center">
                                        <div class="spinner-border text-primary" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Initialize tabs
        new bootstrap.Tab(document.querySelector('#balance-sheet-tab'));

        // Load data for each statement
        await this.loadFinancialStatementData();
    }

    // Helper method to create warning icon for items with errors
    static createWarningIcon(errorMessage) {
        if (!errorMessage || errorMessage.trim() === '') {
            return '';
        }
        
        // Create a unique ID for the tooltip
        const tooltipId = 'warning-' + Math.random().toString(36).substr(2, 9);
        
        return `
            <span class="warning-icon-wrapper ms-2" data-bs-toggle="tooltip" 
                  data-bs-placement="top" title="${this.escapeHtml(errorMessage)}"
                  data-bs-custom-class="warning-tooltip" id="${tooltipId}">
                <i class="fas fa-exclamation-triangle text-warning"></i>
            </span>
        `;
    }

    // Helper method to escape HTML for tooltip content
    static escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Load all financial statement data
    static async loadFinancialStatementData() {
        try {
            const data = appState.allJSONData[4];
            const financialData = data.frc_analysis_report.entity.financial_statements_raw_data;

            // Load each statement
            this.renderStatementOfFinancialPosition(financialData.statement_of_financial_position);
            this.renderProfitLossStatement(financialData.statement_of_profit_or_loss_and_other_comprehensive_income);
            this.renderCashFlowStatement(financialData.statement_of_cash_flows);
            this.renderChangesInEquity(financialData.statement_of_changes_in_equity);

            // Initialize tooltips after rendering
            this.initializeTooltips();

        } catch (error) {
            console.error('Error loading financial statement data:', error);
            this.showError('Failed to load financial statement data');
        }
    }

    // Initialize Bootstrap tooltips for warning icons
    static initializeTooltips() {
        // Initialize tooltips for all warning icons
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl, {
                delay: { show: 100, hide: 100 },
                trigger: 'hover'
            });
        });
    }

    // Render Statement of Financial Position
    static renderStatementOfFinancialPosition(data) {
        const container = document.getElementById('balanceSheetContainer');

        if (!data || data.length === 0) {
            container.innerHTML = '<div class="alert alert-info">No data available</div>';
            return;
        }

        // Get all unique years
        const years = data.map(item => item.year);

        // Get all unique line items across all years
        const allItems = new Set();
        data.forEach(yearData => {
            yearData.line_items.forEach(item => {
                allItems.add(item.item);
            });
        });

        const itemsArray = Array.from(allItems);

        // Create table
        let html = `
            <div class="table-responsive">
                <table class="table table-striped table-bordered financial-statement-table">
                    <thead class="table-dark">
                        <tr>
                            <th style="width: 40%;">Line Item</th>
        `;

        // Add year columns
        years.forEach(year => {
            html += `<th class="text-center" style="width: 15%;">${year} Amount (BDT)</th>`;
            html += `<th class="text-center" style="width: 15%;">${year} Note</th>`;
        });

        html += `</tr></thead><tbody>`;

        // Add rows for each line item
        itemsArray.forEach(itemName => {
            html += `<tr><td><strong>${itemName}</strong></td>`;

            years.forEach(year => {
                const yearData = data.find(d => d.year === year);
                const itemData = yearData.line_items.find(i => i.item === itemName);

                if (itemData) {
                    const warningIcon = this.createWarningIcon(itemData.errors_or_discrepancies);
                    const amountDisplay = itemData.amount === 'Not specified in text' || 
                                          itemData.amount === 'Not fully specified' ||
                                          itemData.amount === 'Not calculated' ||
                                          itemData.amount === 'Previous year amount' ||
                                          itemData.amount.includes('Not specified') 
                                          ? `<span class="text-muted">${itemData.amount}</span>`
                                          : Helpers.formatNumber(itemData.amount);
                    
                    html += `<td class="text-end">${amountDisplay}${warningIcon}</td>`;
                    html += `<td class="text-center">${itemData.note || '-'}</td>`;
                } else {
                    html += `<td class="text-end">-</td><td class="text-center">-</td>`;
                }
            });

            html += `</tr>`;
        });

        html += `</tbody></table></div>`;

        container.innerHTML = html;
    }

    // Render Profit and Loss Statement
    static renderProfitLossStatement(data) {
        const container = document.getElementById('plStatementContainer');

        if (!data || data.length === 0) {
            container.innerHTML = '<div class="alert alert-info">No data available</div>';
            return;
        }

        const years = data.map(item => item.year);
        const allItems = new Set();
        data.forEach(yearData => {
            yearData.line_items.forEach(item => {
                allItems.add(item.item);
            });
        });

        const itemsArray = Array.from(allItems);

        let html = `
            <div class="table-responsive">
                <table class="table table-striped table-bordered financial-statement-table">
                    <thead class="table-dark">
                        <tr>
                            <th style="width: 40%;">Line Item</th>
        `;

        years.forEach(year => {
            html += `<th class="text-center" style="width: 15%;">${year} Amount (BDT)</th>`;
            html += `<th class="text-center" style="width: 15%;">${year} Note</th>`;
        });

        html += `</tr></thead><tbody>`;

        itemsArray.forEach(itemName => {
            html += `<tr><td><strong>${itemName}</strong></td>`;

            years.forEach(year => {
                const yearData = data.find(d => d.year === year);
                const itemData = yearData.line_items.find(i => i.item === itemName);

                if (itemData) {
                    const warningIcon = this.createWarningIcon(itemData.errors_or_discrepancies);
                    const amountDisplay = itemData.amount === 'Not specified in text' || 
                                          itemData.amount === 'Not fully specified' ||
                                          itemData.amount === 'Not calculated' ||
                                          itemData.amount === 'Previous year amount' ||
                                          itemData.amount.includes('Not specified') 
                                          ? `<span class="text-muted">${itemData.amount}</span>`
                                          : Helpers.formatNumber(itemData.amount);
                    
                    html += `<td class="text-end">${amountDisplay}${warningIcon}</td>`;
                    html += `<td class="text-center">${itemData.note || '-'}</td>`;
                } else {
                    html += `<td class="text-end">-</td><td class="text-center">-</td>`;
                }
            });

            html += `</tr>`;
        });

        html += `</tbody></table></div>`;

        container.innerHTML = html;
    }

    // Render Cash Flow Statement
    static renderCashFlowStatement(data) {
        const container = document.getElementById('cashflowStatementContainer');

        if (!data || data.length === 0) {
            container.innerHTML = '<div class="alert alert-info">No data available</div>';
            return;
        }

        const years = data.map(item => item.year);
        const allItems = new Set();
        data.forEach(yearData => {
            yearData.line_items.forEach(item => {
                allItems.add(item.item);
            });
        });

        const itemsArray = Array.from(allItems);

        let html = `
            <div class="table-responsive">
                <table class="table table-striped table-bordered financial-statement-table">
                    <thead class="table-dark">
                        <tr>
                            <th style="width: 40%;">Line Item</th>
        `;

        years.forEach(year => {
            html += `<th class="text-center" style="width: 15%;">${year} Amount (BDT)</th>`;
            html += `<th class="text-center" style="width: 15%;">${year} Note</th>`;
        });

        html += `</tr></thead><tbody>`;

        itemsArray.forEach(itemName => {
            html += `<tr><td><strong>${itemName}</strong></td>`;

            years.forEach(year => {
                const yearData = data.find(d => d.year === year);
                const itemData = yearData.line_items.find(i => i.item === itemName);

                if (itemData) {
                    const warningIcon = this.createWarningIcon(itemData.errors_or_discrepancies);
                    const amountDisplay = itemData.amount === 'Not specified in text' || 
                                          itemData.amount === 'Not fully specified' ||
                                          itemData.amount === 'Not calculated' ||
                                          itemData.amount === 'Previous year amount' ||
                                          itemData.amount.includes('Not specified') 
                                          ? `<span class="text-muted">${itemData.amount}</span>`
                                          : Helpers.formatNumber(itemData.amount);
                    
                    html += `<td class="text-end">${amountDisplay}${warningIcon}</td>`;
                    html += `<td class="text-center">${itemData.note || '-'}</td>`;
                } else {
                    html += `<td class="text-end">-</td><td class="text-center">-</td>`;
                }
            });

            html += `</tr>`;
        });

        html += `</tbody></table></div>`;

        container.innerHTML = html;
    }

    // Render Changes in Equity Statement
    static renderChangesInEquity(data) {
        const container = document.getElementById('equityStatementContainer');

        if (!data || data.length === 0) {
            container.innerHTML = '<div class="alert alert-info">No data available</div>';
            return;
        }

        const years = data.map(item => item.year);
        const allItems = new Set();
        data.forEach(yearData => {
            yearData.line_items.forEach(item => {
                allItems.add(item.item);
            });
        });

        const itemsArray = Array.from(allItems);

        let html = `
            <div class="table-responsive">
                <table class="table table-striped table-bordered financial-statement-table">
                    <thead class="table-dark">
                        <tr>
                            <th style="width: 40%;">Line Item</th>
        `;

        years.forEach(year => {
            html += `<th class="text-center" style="width: 15%;">${year} Amount (BDT)</th>`;
            html += `<th class="text-center" style="width: 15%;">${year} Note</th>`;
        });

        html += `</tr></thead><tbody>`;

        itemsArray.forEach(itemName => {
            html += `<tr><td><strong>${itemName}</strong></td>`;

            years.forEach(year => {
                const yearData = data.find(d => d.year === year);
                const itemData = yearData.line_items.find(i => i.item === itemName);

                if (itemData) {
                    const warningIcon = this.createWarningIcon(itemData.errors_or_discrepancies);
                    const amountDisplay = itemData.amount === 'Not specified in text' || 
                                          itemData.amount === 'Not fully specified' ||
                                          itemData.amount === 'Not calculated' ||
                                          itemData.amount === 'Previous year amount' ||
                                          itemData.amount.includes('Not specified') 
                                          ? `<span class="text-muted">${itemData.amount}</span>`
                                          : Helpers.formatNumber(itemData.amount);
                    
                    html += `<td class="text-end">${amountDisplay}${warningIcon}</td>`;
                    html += `<td class="text-center">${itemData.note || '-'}</td>`;
                } else {
                    html += `<td class="text-end">-</td><td class="text-center">-</td>`;
                }
            });

            html += `</tr>`;
        });

        html += `</tbody></table></div>`;

        container.innerHTML = html;
    }

    // Error display function
    static showError(message) {
        const containers = [
            'balanceSheetContainer',
            'plStatementContainer',
            'cashflowStatementContainer',
            'equityStatementContainer'
        ];

        containers.forEach(containerId => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = `<div class="alert alert-danger">${message}</div>`;
            }
        });
    }
}

window.FinancialStatements = FinancialStatements;
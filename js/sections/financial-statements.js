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
                        
                        <!-- Legend for warning indicators -->
                        <div class="alert alert-warning d-flex align-items-center mb-3" style="padding: 8px 16px; font-size: 0.875rem;">
                            <span class="yellow-dot-example me-2" style="display: inline-block; width: 12px; height: 12px; background-color: #ffc107; border-radius: 50%;"></span>
                            <span>Yellow dot indicates items with discrepancies. Hover over to view details.</span>
                        </div>
                        
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

    // FIXED: Helper method to create yellow dot indicator for line items with errors
    static createYellowDotIndicator(errorMessage, itemName) {
        if (!errorMessage || errorMessage.trim() === '') {
            return '';
        }

        // Create a unique ID for the tooltip
        const tooltipId = 'yellow-dot-' + Math.random().toString(36).substr(2, 9);

        return `
            <span class="yellow-dot-indicator ms-2" 
                  data-bs-toggle="tooltip" 
                  data-bs-placement="right"
                  title="<strong>Discrepancies for ${this.escapeHtml(itemName)}:</strong><br><br>${this.formatErrorForTooltip(errorMessage)}"
                  data-bs-html="true"
                  data-bs-custom-class="yellow-dot-tooltip"
                  id="${tooltipId}"
                  style="cursor: help; display: inline-block; position: relative;">
                <span class="yellow-dot" style="display: inline-block; width: 10px; height: 10px; background-color: #ffc107; border-radius: 50%; border: 1px solid #ff9800;"></span>
            </span>
        `;
    }

    // Helper method to format error message for tooltip
    static formatErrorForTooltip(errorMessage) {
        if (!errorMessage) return '';
        
        // Split by pipe and format each error
        const errors = errorMessage.split(' | ');
        if (errors.length === 1) {
            return this.escapeHtml(errorMessage);
        }
        
        // Format multiple errors with bullet points
        return errors.map(error => `• ${this.escapeHtml(error)}`).join('<br>');
    }

    // MODIFIED: Updated warning icon for amounts
    static createWarningIcon(errorMessage) {
        if (!errorMessage || errorMessage.trim() === '') {
            return '';
        }

        // Create a unique ID for the tooltip
        const tooltipId = 'warning-' + Math.random().toString(36).substr(2, 9);

        return `
            <span class="warning-icon-wrapper ms-1" data-bs-toggle="tooltip" 
                  data-bs-placement="top" title="<strong>Amount Discrepancy:</strong><br>${this.escapeHtml(errorMessage)}"
                  data-bs-html="true"
                  data-bs-custom-class="warning-tooltip" id="${tooltipId}"
                  style="cursor: help; display: inline-block;">
                <i class="fas fa-exclamation-triangle text-warning" style="font-size: 0.875rem;"></i>
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

    // Initialize Bootstrap tooltips for warning icons and yellow dots
    static initializeTooltips() {
        // Add custom CSS for tooltips
        const style = document.createElement('style');
        style.textContent = `
            .yellow-dot-tooltip .tooltip-inner {
                background-color: #fff3cd;
                color: #856404;
                border: 1px solid #ffeaa7;
                max-width: 400px;
                text-align: left;
                padding: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .yellow-dot-tooltip .tooltip-arrow::before {
                border-right-color: #ffeaa7;
            }
            .warning-tooltip .tooltip-inner {
                background-color: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
                max-width: 300px;
                text-align: left;
                padding: 8px;
            }
            .warning-tooltip .tooltip-arrow::before {
                border-top-color: #f5c6cb;
            }
            .yellow-dot-indicator:hover .yellow-dot {
                transform: scale(1.3);
                box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.3);
                transition: all 0.2s ease;
            }
            .warning-icon-wrapper:hover i {
                transform: scale(1.2);
                transition: transform 0.2s ease;
            }
            .line-item-with-error {
                position: relative;
            }
            .yellow-dot-indicator {
                vertical-align: middle;
            }
        `;
        document.head.appendChild(style);

        // Initialize tooltips for all warning icons and yellow dots
        setTimeout(() => {
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl, {
                    delay: { show: 100, hide: 50 },
                    trigger: 'hover',
                    html: true
                });
            });
        }, 100);
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
            // Check if this item has any errors/discrepancies in any year
            let hasErrors = false;
            let combinedErrors = [];
            
            years.forEach(year => {
                const yearData = data.find(d => d.year === year);
                const itemData = yearData.line_items.find(i => i.item === itemName);
                if (itemData && itemData.errors_or_discrepancies && itemData.errors_or_discrepancies.trim() !== '') {
                    hasErrors = true;
                    combinedErrors.push(`${year}: ${itemData.errors_or_discrepancies}`);
                }
            });
            
            // Start row with item name and yellow dot if there are errors
            const yellowDot = hasErrors ? this.createYellowDotIndicator(combinedErrors.join(' | '), itemName) : '';
            const rowClass = hasErrors ? 'line-item-with-error' : '';
            html += `<tr class="${rowClass}"><td class="align-middle"><div class="d-flex align-items-center"><strong>${itemName}</strong>${yellowDot}</div></td>`;

            years.forEach(year => {
                const yearData = data.find(d => d.year === year);
                const itemData = yearData.line_items.find(i => i.item === itemName);

                if (itemData) {
                    const warningIcon = this.createWarningIcon(itemData.errors_or_discrepancies);
                    const amountDisplay = itemData.amount === 'Not specified in text' ||
                        itemData.amount === 'Not fully specified' ||
                        itemData.data === 'Not calculated' ||
                        itemData.amount === 'Previous year amount' ||
                        (itemData.amount && itemData.amount.includes && itemData.amount.includes('Not specified'))
                        ? `<span class="text-muted">${itemData.amount}</span>`
                        : Helpers.formatNumber(itemData.amount);

                    // Highlight cell if there are errors
                    const cellClass = itemData.errors_or_discrepancies ? 'table-warning' : '';
                    
                    html += `<td class="text-end align-middle ${cellClass}"><div class="d-flex justify-content-end align-items-center">${amountDisplay}${warningIcon}</div></td>`;
                    html += `<td class="text-center align-middle ${cellClass}">${itemData.note || '-'}</td>`;
                } else {
                    html += `<td class="text-end align-middle">-</td><td class="text-center align-middle">-</td>`;
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
            // Check if this item has any errors/discrepancies in any year
            let hasErrors = false;
            let combinedErrors = [];
            
            years.forEach(year => {
                const yearData = data.find(d => d.year === year);
                const itemData = yearData.line_items.find(i => i.item === itemName);
                if (itemData && itemData.errors_or_discrepancies && itemData.errors_or_discrepancies.trim() !== '') {
                    hasErrors = true;
                    combinedErrors.push(`${year}: ${itemData.errors_or_discrepancies}`);
                }
            });
            
            // Start row with item name and yellow dot if there are errors
            const yellowDot = hasErrors ? this.createYellowDotIndicator(combinedErrors.join(' | '), itemName) : '';
            const rowClass = hasErrors ? 'line-item-with-error' : '';
            html += `<tr class="${rowClass}"><td class="align-middle"><div class="d-flex align-items-center"><strong>${itemName}</strong>${yellowDot}</div></td>`;

            years.forEach(year => {
                const yearData = data.find(d => d.year === year);
                const itemData = yearData.line_items.find(i => i.item === itemName);

                if (itemData) {
                    const warningIcon = this.createWarningIcon(itemData.errors_or_discrepancies);
                    const amountDisplay = itemData.amount === 'Not specified in text' ||
                        itemData.amount === 'Not fully specified' ||
                        itemData.amount === 'Not calculated' ||
                        itemData.amount === 'Previous year amount' ||
                        (itemData.amount && itemData.amount.includes && itemData.amount.includes('Not specified'))
                        ? `<span class="text-muted">${itemData.amount}</span>`
                        : Helpers.formatNumber(itemData.amount);

                    // Highlight cell if there are errors
                    const cellClass = itemData.errors_or_discrepancies ? 'table-warning' : '';
                    
                    html += `<td class="text-end align-middle ${cellClass}"><div class="d-flex justify-content-end align-items-center">${amountDisplay}${warningIcon}</div></td>`;
                    html += `<td class="text-center align-middle ${cellClass}">${itemData.note || '-'}</td>`;
                } else {
                    html += `<td class="text-end align-middle">-</td><td class="text-center align-middle">-</td>`;
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
            // Check if this item has any errors/discrepancies in any year
            let hasErrors = false;
            let combinedErrors = [];
            
            years.forEach(year => {
                const yearData = data.find(d => d.year === year);
                const itemData = yearData.line_items.find(i => i.item === itemName);
                if (itemData && itemData.errors_or_discrepancies && itemData.errors_or_discrepancies.trim() !== '') {
                    hasErrors = true;
                    combinedErrors.push(`${year}: ${itemData.errors_or_discrepancies}`);
                }
            });
            
            // Start row with item name and yellow dot if there are errors
            const yellowDot = hasErrors ? this.createYellowDotIndicator(combinedErrors.join(' | '), itemName) : '';
            const rowClass = hasErrors ? 'line-item-with-error' : '';
            html += `<tr class="${rowClass}"><td class="align-middle"><div class="d-flex align-items-center"><strong>${itemName}</strong>${yellowDot}</div></td>`;

            years.forEach(year => {
                const yearData = data.find(d => d.year === year);
                const itemData = yearData.line_items.find(i => i.item === itemName);

                if (itemData) {
                    const warningIcon = this.createWarningIcon(itemData.errors_or_discrepancies);
                    const amountDisplay = itemData.amount === 'Not specified in text' ||
                        itemData.amount === 'Not fully specified' ||
                        itemData.amount === 'Not calculated' ||
                        itemData.amount === 'Previous year amount' ||
                        (itemData.amount && itemData.amount.includes && itemData.amount.includes('Not specified'))
                        ? `<span class="text-muted">${itemData.amount}</span>`
                        : Helpers.formatNumber(itemData.amount);

                    // Highlight cell if there are errors
                    const cellClass = itemData.errors_or_discrepancies ? 'table-warning' : '';
                    
                    html += `<td class="text-end align-middle ${cellClass}"><div class="d-flex justify-content-end align-items-center">${amountDisplay}${warningIcon}</div></td>`;
                    html += `<td class="text-center align-middle ${cellClass}">${itemData.note || '-'}</td>`;
                } else {
                    html += `<td class="text-end align-middle">-</td><td class="text-center align-middle">-</td>`;
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
            // Check if this item has any errors/discrepancies in any year
            let hasErrors = false;
            let combinedErrors = [];
            
            years.forEach(year => {
                const yearData = data.find(d => d.year === year);
                const itemData = yearData.line_items.find(i => i.item === itemName);
                if (itemData && itemData.errors_or_discrepancies && itemData.errors_or_discrepancies.trim() !== '') {
                    hasErrors = true;
                    combinedErrors.push(`${year}: ${itemData.errors_or_discrepancies}`);
                }
            });
            
            // Start row with item name and yellow dot if there are errors
            const yellowDot = hasErrors ? this.createYellowDotIndicator(combinedErrors.join(' | '), itemName) : '';
            const rowClass = hasErrors ? 'line-item-with-error' : '';
            html += `<tr class="${rowClass}"><td class="align-middle"><div class="d-flex align-items-center"><strong>${itemName}</strong>${yellowDot}</div></td>`;

            years.forEach(year => {
                const yearData = data.find(d => d.year === year);
                const itemData = yearData.line_items.find(i => i.item === itemName);

                if (itemData) {
                    const warningIcon = this.createWarningIcon(itemData.errors_or_discrepancies);
                    const amountDisplay = itemData.amount === 'Not specified in text' ||
                        itemData.amount === 'Not fully specified' ||
                        itemData.amount === 'Not calculated' ||
                        itemData.amount === 'Previous year amount' ||
                        (itemData.amount && itemData.amount.includes && itemData.amount.includes('Not specified'))
                        ? `<span class="text-muted">${itemData.amount}</span>`
                        : Helpers.formatNumber(itemData.amount);

                    // Highlight cell if there are errors
                    const cellClass = itemData.errors_or_discrepancies ? 'table-warning' : '';
                    
                    html += `<td class="text-end align-middle ${cellClass}"><div class="d-flex justify-content-end align-items-center">${amountDisplay}${warningIcon}</div></td>`;
                    html += `<td class="text-center align-middle ${cellClass}">${itemData.note || '-'}</td>`;
                } else {
                    html += `<td class="text-end align-middle">-</td><td class="text-center align-middle">-</td>`;
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
// Section management
class SectionManager {
    static loadSection(section) {
        appState.currentSection = section;
        
        // Update active sidebar item
        UIComponents.updateActiveSidebarItem(section);

        // Load section content
        switch (section) {
            case 'dashboard':
                Dashboard.load();
                break;
            case 'entity':
                // Load entity profile (to be implemented)
                this.loadEntityProfile();
                break;
            case 'financial-statements':
                // Load financial statements (to be implemented)
                this.loadFinancialStatements();
                break;
            case 'financial-analysis':
                // Load financial analysis (to be implemented)
                this.loadFinancialAnalysis();
                break;
            case 'compliance':
                // Load compliance (to be implemented)
                this.loadCompliance();
                break;
            case 'audit-governance':
                // Load audit governance (to be implemented)
                this.loadAuditGovernance();
                break;
            case 'material-departures':
                // Load material departures (to be implemented)
                this.loadMaterialDepartures();
                break;
            case 'risk-assessment':
                // Load risk assessment (to be implemented)
                this.loadRiskAssessment();
                break;
            case 'skepticism':
                // Load skepticism (to be implemented)
                this.loadSkepticism();
                break;
            case 'data-import':
                // Load data import (to be implemented)
                this.loadDataImport();
                break;
            case 'report-generator':
                // Load report generator (to be implemented)
                this.loadReportGenerator();
                break;
            default:
                Dashboard.load();
        }
    }

    // Placeholder methods for other sections
    static loadEntityProfile() {
        UIComponents.getMainContent().innerHTML = `
            <div class="container-fluid">
                <h2>Entity Profile - Coming Soon</h2>
                <p>This section is under development.</p>
            </div>
        `;
    }

    static loadFinancialStatements() {
        UIComponents.getMainContent().innerHTML = `
            <div class="container-fluid">
                <h2>Financial Statements - Coming Soon</h2>
                <p>This section is under development.</p>
            </div>
        `;
    }

    static loadFinancialAnalysis() {
        UIComponents.getMainContent().innerHTML = `
            <div class="container-fluid">
                <h2>Financial Analysis - Coming Soon</h2>
                <p>This section is under development.</p>
            </div>
        `;
    }

    static loadCompliance() {
        UIComponents.getMainContent().innerHTML = `
            <div class="container-fluid">
                <h2>IFRS Compliance - Coming Soon</h2>
                <p>This section is under development.</p>
            </div>
        `;
    }

    static loadAuditGovernance() {
        UIComponents.getMainContent().innerHTML = `
            <div class="container-fluid">
                <h2>Audit & Governance - Coming Soon</h2>
                <p>This section is under development.</p>
            </div>
        `;
    }

    static loadMaterialDepartures() {
        UIComponents.getMainContent().innerHTML = `
            <div class="container-fluid">
                <h2>Material Departures - Coming Soon</h2>
                <p>This section is under development.</p>
            </div>
        `;
    }

    static loadRiskAssessment() {
        UIComponents.getMainContent().innerHTML = `
            <div class="container-fluid">
                <h2>Risk Assessment - Coming Soon</h2>
                <p>This section is under development.</p>
            </div>
        `;
    }

    static loadSkepticism() {
        UIComponents.getMainContent().innerHTML = `
            <div class="container-fluid">
                <h2>Professional Skepticism - Coming Soon</h2>
                <p>This section is under development.</p>
            </div>
        `;
    }

    static loadDataImport() {
        UIComponents.getMainContent().innerHTML = `
            <div class="container-fluid">
                <h2>Data Import - Coming Soon</h2>
                <p>This section is under development.</p>
            </div>
        `;
    }

    static loadReportGenerator() {
        UIComponents.getMainContent().innerHTML = `
            <div class="container-fluid">
                <h2>Report Generator - Coming Soon</h2>
                <p>This section is under development.</p>
            </div>
        `;
    }
}

window.SectionManager = SectionManager;
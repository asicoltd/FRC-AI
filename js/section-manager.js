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
                EntityProfile.load();
                break;
            case 'financial-statements':
                FinancialStatements.load();
                break;
            case 'financial-analysis':
                FinancialAnalysis.load();
                break;
            case 'compliance':
                Compliance.load();
                break;
            case 'audit-governance':
                AuditGovernance.load();
                break;
            case 'material-departures':
                MaterialDepartures.load();
                break;
            case 'risk-assessment':
                RiskAssessment.load();
                break;
            case 'skepticism':
                Skepticism.load();
                break;
            case 'data-import':
                DataImport.load();
                break;
            case 'report-generator':
                ReportGenerator.load();
                break;
            default:
                Dashboard.load();
        }
    }
}

// Handle sidebar clicks
document.addEventListener('click', function(e) {
    const sidebarItem = e.target.closest('.sidebar-item');
    if (sidebarItem) {
        const onclick = sidebarItem.getAttribute('onclick');
        const match = onclick?.match(/'([^']+)'/);
        if (match && match[1]) {
            SectionManager.loadSection(match[1]);
        }
    }
});
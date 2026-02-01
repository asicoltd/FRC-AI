// Configuration constants
const CONFIG = {
    GITHUB_PAGES_BASE: 'https://asicoltd.github.io/FRC-AI/dataset/',
    DEFAULT_COMPANY_ID: 1,
    TOTAL_JSON_FILES: 26,
    CATEGORIES: {
        1: 'Metadata', 2: 'Entity Profile', 3: 'Materiality', 4: 'Financial Data',
        5: 'Phase 1 Checks', 6: 'Phase 2 Analysis', 7: 'Phase 3 IFRS', 8: 'Phase 3 IFRS',
        9: 'Phase 3 IFRS', 10: 'Phase 3 IFRS', 11: 'Phase 3 IFRS', 12: 'Phase 3 IFRS',
        13: 'Fraud Assessment', 14: 'Phase 4 Audit', 15: 'Legal Mapping', 16: 'Phase 5 Synthesis',
        17: 'Phase 2 Detailed', 18: 'Phase 2 Trend', 19: 'Phase 2 Ratios', 20: 'Phase 3 Detailed',
        21: 'Phase 4 Enhanced', 22: 'Phase 4 Governance', 23: 'Skepticism', 24: 'Phase 5 Material',
        25: 'Phase 5 Risk', 26: 'Phase 5 Executive'
    },
    COLORS: {
        primary: '#367e1a',
        secondary: '#28938e',
        accent: '#3949ab',
        warning: '#ff6f00',
        danger: '#d32f2f',
        success: '#388e3c'
    }
};

// Global state
window.appState = {
    currentCompanyId: CONFIG.DEFAULT_COMPANY_ID,
    allJSONData: {},
    availableCompanies: [],
    currentSection: 'dashboard'
};
// Global configuration
export const GITHUB_PAGES_BASE = 'https://asicoltd.github.io/FRC-AI/dataset/';
export const TOTAL_JSON_FILES = 26;
export const DEFAULT_COMPANY_ID = 1;

// URL parameters
export const URL_PARAMS = {
    COMPANY: 'company',
    SECTION: 'section'
};

// Local storage keys
export const STORAGE_KEYS = {
    LAST_COMPANY_ID: 'frc_last_company_id',
    COMPANY_DATA: (companyId) => `frc_company_${companyId}_data`,
    SETTINGS: 'frc_settings'
};

// Notification types
export const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
};

// File categories mapping
export const FILE_CATEGORIES = {
    1: 'Metadata',
    2: 'Entity Profile',
    3: 'Materiality',
    4: 'Financial Data',
    5: 'Phase 1 Checks',
    6: 'Phase 2 Analysis',
    7: 'Phase 3 IFRS',
    8: 'Phase 3 IFRS',
    9: 'Phase 3 IFRS',
    10: 'Phase 3 IFRS',
    11: 'Phase 3 IFRS',
    12: 'Phase 3 IFRS',
    13: 'Fraud Assessment',
    14: 'Phase 4 Audit',
    15: 'Legal Mapping',
    16: 'Phase 5 Synthesis',
    17: 'Phase 2 Detailed',
    18: 'Phase 2 Trend',
    19: 'Phase 2 Ratios',
    20: 'Phase 3 Detailed',
    21: 'Phase 4 Enhanced',
    22: 'Phase 4 Governance',
    23: 'Skepticism',
    24: 'Phase 5 Material',
    25: 'Phase 5 Risk',
    26: 'Phase 5 Executive'
};
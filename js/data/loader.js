import { GITHUB_PAGES_BASE } from '../config.js';
import { showNotification } from '../ui/notifications.js';

// Global data store
export const allJSONData = {};

// Load JSON data for specific company
export async function loadJSONData(companyId, fileNumber) {
    const url = `${GITHUB_PAGES_BASE}${companyId}/${fileNumber}.json`;
    console.log(`Fetching: ${url}`);

    try {
        // Add cache busting to avoid stale data
        const cacheBuster = `?_=${Date.now()}`;
        const response = await fetch(`${url}${cacheBuster}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });

        console.log(`Response status for ${fileNumber}.json:`, response.status, response.statusText);

        if (!response.ok) {
            if (response.status === 404) {
                console.log(`File not found: ${url}`);
                return null;
            }
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const text = await response.text();
        console.log(`Raw response for ${fileNumber}.json:`, text.substring(0, 200) + '...');

        if (!text || text.trim() === '') {
            console.log(`Empty response for ${fileNumber}.json`);
            return null;
        }

        const data = JSON.parse(text);
        console.log(`Successfully parsed ${fileNumber}.json:`, Object.keys(data));

        // Validate the JSON structure
        if (!data.pdf_token || !data.report_id) {
            console.warn(`File ${fileNumber}.json missing required fields`);
        }

        return data;
    } catch (error) {
        console.error(`Error loading ${url}:`, error);

        // Try without cache buster as fallback
        if (url.includes('?_=')) {
            try {
                console.log(`Retrying without cache buster: ${url.split('?')[0]}`);
                const response = await fetch(url.split('?')[0]);
                if (response.ok) {
                    return await response.json();
                }
            } catch (retryError) {
                console.error('Retry also failed:', retryError);
            }
        }

        return null;
    }
}

// Check if a company folder exists
export async function checkCompanyExists(companyId) {
    try {
        const response = await fetch(`${GITHUB_PAGES_BASE}${companyId}/1.json`, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
}
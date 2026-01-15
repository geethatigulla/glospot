// API Configuration for GloSpot Backend
// This file provides the backend API endpoints for the GloSpot PWA

const API_CONFIG = {
    // Base URLs for different environments
    development: {
        baseUrl: 'http://localhost:5001',
        endpoints: {
            uploadVideo: '/api/upload-video',
            saveResult: '/api/save-result',
            getUserData: '/api/user/data',
            syncUserData: '/api/user/sync',
            leaderboard: '/api/leaderboard'
        }
    },
    production: {
        baseUrl: 'https://glospot-backend.vercel.app',
        endpoints: {
            uploadVideo: '/api/upload-video',
            saveResult: '/api/save-result',
            getUserData: '/api/user/data',
            syncUserData: '/api/user/sync',
            leaderboard: '/api/leaderboard'
        }
    }
};

// Auto-detect environment
function getApiConfig() {
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1';
    
    if (isLocalhost) {
        return API_CONFIG.development;
    } else {
        return API_CONFIG.production;
    }
}

// Export for use in the main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, getApiConfig };
} else {
    window.API_CONFIG = API_CONFIG;
    window.getApiConfig = getApiConfig;
}

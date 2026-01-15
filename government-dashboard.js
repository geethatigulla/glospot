// Government Dashboard JavaScript
class GovernmentDashboard {
    constructor() {
        this.currentTab = 'overview';
        this.charts = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadDashboardData();
        this.initializeCharts();
    }

    setupEventListeners() {
        // Navigation tabs
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                this.switchTab(tab);
            });
        });

        // State interactions
        document.querySelectorAll('.state').forEach(state => {
            state.addEventListener('click', (e) => {
                const stateName = e.currentTarget.dataset.state;
                this.showStateDetails(stateName);
            });
        });

        // Filter changes
        document.querySelectorAll('.filter-select, .filter-input').forEach(filter => {
            filter.addEventListener('change', () => {
                this.filterStates();
            });
        });

        // Report generation buttons
        document.querySelectorAll('.template-card .btn-secondary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const templateType = e.target.closest('.template-card').querySelector('h4').textContent;
                this.generateReport(templateType);
            });
        });

        // Export buttons
        document.querySelectorAll('.btn-secondary').forEach(btn => {
            if (btn.textContent.includes('Export')) {
                btn.addEventListener('click', () => {
                    this.exportData();
                });
            }
        });

        // Report download buttons
        document.querySelectorAll('.report-actions .btn-secondary').forEach(btn => {
            btn.addEventListener('click', () => {
                this.downloadReport(btn);
            });
        });
    }

    switchTab(tabName) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');

        this.currentTab = tabName;

        // Load tab-specific data
        if (tabName === 'states') {
            this.loadStateCharts();
        } else if (tabName === 'talent-pipeline') {
            this.loadPipelineCharts();
        } else if (tabName === 'ai-insights') {
            this.loadAIInsights();
        } else if (tabName === 'analytics') {
            this.loadAnalyticsCharts();
        }
    }

    loadDashboardData() {
        // Simulate loading dashboard data
        console.log('Loading government dashboard data...');
        
        // Update stats with animation
        this.animateStats();
        
        // Load recent activity
        this.loadRecentActivity();
    }

    animateStats() {
        const statValues = document.querySelectorAll('.metric-content h3');
        statValues.forEach(stat => {
            const finalValue = stat.textContent;
            const numericValue = parseInt(finalValue.replace(/,/g, ''));
            if (!isNaN(numericValue)) {
                this.animateNumber(stat, 0, numericValue, 1000);
            }
        });
    }

    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };
        requestAnimationFrame(updateNumber);
    }

    loadRecentActivity() {
        // Activities are already in HTML, just add animation
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                item.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 100);
            }, index * 200);
        });
    }

    initializeCharts() {
        // Charts will be initialized when tabs are loaded
        console.log('Charts initialized');
    }

    loadStateCharts() {
        // Punjab Chart
        const punjabCtx = document.getElementById('punjabChart');
        if (punjabCtx && !this.charts.punjab) {
            this.charts.punjab = new Chart(punjabCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Athletes Tested',
                        data: [45, 52, 48, 61, 55, 68],
                        borderColor: '#FF6B35',
                        backgroundColor: 'rgba(255, 107, 53, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Haryana Chart
        const haryanaCtx = document.getElementById('haryanaChart');
        if (haryanaCtx && !this.charts.haryana) {
            this.charts.haryana = new Chart(haryanaCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Athletes Tested',
                        data: [32, 38, 35, 42, 39, 45],
                        borderColor: '#4CAF50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Kerala Chart
        const keralaCtx = document.getElementById('keralaChart');
        if (keralaCtx && !this.charts.kerala) {
            this.charts.kerala = new Chart(keralaCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Athletes Tested',
                        data: [28, 32, 30, 35, 33, 38],
                        borderColor: '#2196F3',
                        backgroundColor: 'rgba(33, 150, 243, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }

    loadPipelineCharts() {
        // Conversion Chart
        const conversionCtx = document.getElementById('conversionChart');
        if (conversionCtx && !this.charts.conversion) {
            this.charts.conversion = new Chart(conversionCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Screening', 'Qualified', 'Elite'],
                    datasets: [{
                        data: [2847, 342, 23],
                        backgroundColor: [
                            '#FF6B35',
                            '#4CAF50',
                            '#2196F3'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        }
                    }
                }
            });
        }

        // Pipeline Trends Chart
        const pipelineTrendsCtx = document.getElementById('pipelineTrendsChart');
        if (pipelineTrendsCtx && !this.charts.pipelineTrends) {
            this.charts.pipelineTrends = new Chart(pipelineTrendsCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Screening',
                        data: [2500, 2600, 2700, 2750, 2800, 2847],
                        borderColor: '#FF6B35',
                        backgroundColor: 'rgba(255, 107, 53, 0.1)',
                        tension: 0.4,
                        fill: true
                    }, {
                        label: 'Qualified',
                        data: [300, 310, 320, 330, 335, 342],
                        borderColor: '#4CAF50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        tension: 0.4,
                        fill: true
                    }, {
                        label: 'Elite',
                        data: [20, 21, 22, 22, 23, 23],
                        borderColor: '#2196F3',
                        backgroundColor: 'rgba(33, 150, 243, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }

    loadAnalyticsCharts() {
        // Geographic Distribution Chart
        const geographicCtx = document.getElementById('geographicChart');
        if (geographicCtx && !this.charts.geographic) {
            this.charts.geographic = new Chart(geographicCtx, {
                type: 'bar',
                data: {
                    labels: ['North', 'South', 'East', 'West', 'Central'],
                    datasets: [{
                        label: 'Athletes Tested',
                        data: [1200, 800, 400, 300, 147],
                        backgroundColor: '#FF6B35',
                        borderRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Age Distribution Chart
        const ageDistributionCtx = document.getElementById('ageDistributionChart');
        if (ageDistributionCtx && !this.charts.ageDistribution) {
            this.charts.ageDistribution = new Chart(ageDistributionCtx, {
                type: 'pie',
                data: {
                    labels: ['15-16', '17-18', '19-20', '21-22'],
                    datasets: [{
                        data: [1200, 1000, 500, 147],
                        backgroundColor: [
                            '#FF6B35',
                            '#4CAF50',
                            '#2196F3',
                            '#FF9800'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        }
                    }
                }
            });
        }

        // Sport Performance Chart
        const sportPerformanceCtx = document.getElementById('sportPerformanceChart');
        if (sportPerformanceCtx && !this.charts.sportPerformance) {
            this.charts.sportPerformance = new Chart(sportPerformanceCtx, {
                type: 'bar',
                data: {
                    labels: ['Athletics', 'Basketball', 'Football', 'Swimming', 'Other'],
                    datasets: [{
                        label: 'Success Rate (%)',
                        data: [18.5, 15.2, 12.8, 10.5, 8.3],
                        backgroundColor: [
                            '#FF6B35',
                            '#4CAF50',
                            '#2196F3',
                            '#FF9800',
                            '#9C27B0'
                        ],
                        borderRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 20
                        }
                    }
                }
            });
        }

        // Success Rate Trends Chart
        const successRateCtx = document.getElementById('successRateChart');
        if (successRateCtx && !this.charts.successRate) {
            this.charts.successRate = new Chart(successRateCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Success Rate (%)',
                        data: [10.5, 11.2, 11.8, 12.0, 11.9, 12.0],
                        borderColor: '#FF6B35',
                        backgroundColor: 'rgba(255, 107, 53, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 15
                        }
                    }
                }
            });
        }
    }

    showStateDetails(stateName) {
        // Show state details modal or navigate to state details
        this.showNotification(`Loading details for ${stateName}...`, 'info');
        
        setTimeout(() => {
            this.showNotification(`${stateName} details loaded successfully!`, 'success');
        }, 1000);
    }

    filterStates() {
        const regionFilter = document.querySelector('select').value;
        const performanceFilter = document.querySelectorAll('select')[1].value;
        const searchFilter = document.querySelector('.filter-input').value.toLowerCase();

        const stateCards = document.querySelectorAll('.state-card');
        
        stateCards.forEach(card => {
            const stateName = card.querySelector('h3').textContent.toLowerCase();
            const performanceLevel = card.querySelector('.performance-badge').textContent.toLowerCase();
            
            let show = true;
            
            if (regionFilter !== 'all') {
                // Simple region mapping
                const regionMap = {
                    'north': ['punjab', 'haryana', 'delhi'],
                    'south': ['kerala', 'tamil nadu', 'karnataka'],
                    'east': ['bihar', 'jharkhand', 'west bengal'],
                    'west': ['maharashtra', 'gujarat', 'rajasthan']
                };
                
                if (!regionMap[regionFilter]?.includes(stateName)) {
                    show = false;
                }
            }
            
            if (performanceFilter !== 'all') {
                if (!performanceLevel.includes(performanceFilter)) {
                    show = false;
                }
            }
            
            if (searchFilter && !stateName.includes(searchFilter)) {
                show = false;
            }
            
            card.style.display = show ? '' : 'none';
        });
    }

    generateReport(templateType) {
        // Simulate report generation
        const reportTypes = {
            'National Summary Report': 'national_summary',
            'State Performance Report': 'state_performance',
            'Elite Athletes Report': 'elite_athletes',
            'Analytics Report': 'analytics'
        };

        const reportType = reportTypes[templateType];
        
        // Show loading state
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Generating...';
        button.disabled = true;

        // Simulate report generation
        setTimeout(() => {
            button.textContent = 'Download';
            button.disabled = false;
            
            // Show success message
            this.showNotification(`Report "${templateType}" generated successfully!`, 'success');
            
            // Simulate download
            setTimeout(() => {
                button.textContent = originalText;
                this.showNotification(`Report "${templateType}" downloaded!`, 'success');
            }, 1000);
        }, 2000);
    }

    downloadReport(button) {
        // Simulate report download
        const reportCard = button.closest('.report-card');
        const reportTitle = reportCard.querySelector('h4').textContent;
        
        button.textContent = 'Downloading...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = 'Download PDF';
            button.disabled = false;
            this.showNotification(`Report "${reportTitle}" downloaded successfully!`, 'success');
        }, 1500);
    }

    exportData() {
        // Simulate data export
        this.showNotification('Exporting data...', 'info');
        
        setTimeout(() => {
            this.showNotification('Data exported successfully!', 'success');
        }, 1500);
    }

    loadAIInsights() {
        // Load AI insights data
        console.log('Loading AI insights...');
        
        // Animate prediction cards
        const predictionCards = document.querySelectorAll('.prediction-card');
        predictionCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });

        // Initialize gender chart
        this.initGenderChart();
    }

    initGenderChart() {
        const canvas = document.getElementById('genderChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Simple pie chart for gender distribution
        const data = {
            male: 65,
            female: 35
        };

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 80;

        // Draw male section
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, (data.male / 100) * 2 * Math.PI);
        ctx.lineTo(centerX, centerY);
        ctx.fillStyle = '#2196F3';
        ctx.fill();

        // Draw female section
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, (data.male / 100) * 2 * Math.PI, 2 * Math.PI);
        ctx.lineTo(centerX, centerY);
        ctx.fillStyle = '#E91E63';
        ctx.fill();

        // Add labels
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Male: 65%', centerX, centerY - 10);
        ctx.fillText('Female: 35%', centerX, centerY + 10);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#FF6B35'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GovernmentDashboard();
});

// Add some utility functions
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states for better UX
function showLoading(element) {
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// AI Insights Functions
function flagForTrials(button) {
    const predictionCard = button.closest('.prediction-card');
    const athleteName = predictionCard.querySelector('.athlete-details h4').textContent;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Flagging...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Flagged for Trials';
        button.style.background = '#4CAF50';
        button.style.color = 'white';
        
        showNotification(`${athleteName} has been flagged for national trials!`, 'success');
    }, 1500);
}

function viewDetailedAnalysis(button) {
    const predictionCard = button.closest('.prediction-card');
    const athleteName = predictionCard.querySelector('.athlete-details h4').textContent;
    
    // Create detailed analysis modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Detailed AI Analysis - ${athleteName}</h3>
                <button class="modal-close" onclick="closeModal(this)">&times;</button>
            </div>
            <div class="modal-body">
                <div class="analysis-sections">
                    <div class="analysis-section">
                        <h4>Performance Metrics</h4>
                        <div class="metrics-grid">
                            <div class="metric">
                                <span class="label">Vertical Jump:</span>
                                <span class="value">28.5 inches</span>
                            </div>
                            <div class="metric">
                                <span class="label">Sprint Time:</span>
                                <span class="value">11.2 seconds</span>
                            </div>
                            <div class="metric">
                                <span class="label">Endurance Score:</span>
                                <span class="value">87/100</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-section">
                        <h4>AI Predictions</h4>
                        <div class="predictions">
                            <div class="prediction-item">
                                <span class="label">2026 Olympics Potential:</span>
                                <span class="value high">94%</span>
                            </div>
                            <div class="prediction-item">
                                <span class="label">Peak Performance Age:</span>
                                <span class="value">22-24 years</span>
                            </div>
                            <div class="prediction-item">
                                <span class="label">Recommended Training:</span>
                                <span class="value">Plyometric + Strength</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-section">
                        <h4>Risk Factors</h4>
                        <div class="risks">
                            <div class="risk-item low">
                                <i class="fas fa-check-circle"></i>
                                <span>Low injury risk</span>
                            </div>
                            <div class="risk-item low">
                                <i class="fas fa-check-circle"></i>
                                <span>Consistent performance</span>
                            </div>
                            <div class="risk-item medium">
                                <i class="fas fa-exclamation-triangle"></i>
                                <span>Monitor growth spurts</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" onclick="closeModal(this)">Close</button>
                <button class="btn-primary" onclick="generateReport(this, '${athleteName}')">
                    <i class="fas fa-file-pdf"></i>
                    Generate Report
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        .modal-content {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        .modal-header h3 {
            color: #333;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
        .analysis-sections {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        .analysis-section h4 {
            color: #333;
            margin-bottom: 1rem;
            font-size: 1.1rem;
        }
        .metrics-grid, .predictions {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        .metric, .prediction-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem;
            background: #f8f9fa;
            border-radius: 8px;
        }
        .metric .label, .prediction-item .label {
            color: #666;
            font-weight: 500;
        }
        .metric .value, .prediction-item .value {
            font-weight: 600;
            color: #333;
        }
        .prediction-item .value.high {
            color: #4CAF50;
        }
        .risks {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        .risk-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem;
            border-radius: 8px;
        }
        .risk-item.low {
            background: #e8f5e8;
            color: #4CAF50;
        }
        .risk-item.medium {
            background: #fff3e0;
            color: #FF9800;
        }
        .modal-footer {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            margin-top: 2rem;
        }
    `;
    document.head.appendChild(style);
}

function createSupportPlan(button) {
    const analysisCard = button.closest('.analysis-card');
    const cardTitle = analysisCard.querySelector('.card-header h4').textContent;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Support Plan Created';
        button.style.background = '#4CAF50';
        button.style.color = 'white';
        
        showNotification(`Support plan created for ${cardTitle}!`, 'success');
    }, 2000);
}

function generateReport(button, athleteName) {
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    button.disabled = true;
    
    setTimeout(() => {
        closeModal(button);
        showNotification(`Detailed report generated for ${athleteName}!`, 'success');
    }, 1500);
}

function closeModal(button) {
    const modal = button.closest('.modal-overlay');
    document.body.removeChild(modal);
}

// Global notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                document.querySelector('[data-tab="overview"]').click();
                break;
            case '2':
                e.preventDefault();
                document.querySelector('[data-tab="states"]').click();
                break;
            case '3':
                e.preventDefault();
                document.querySelector('[data-tab="talent-pipeline"]').click();
                break;
            case '4':
                e.preventDefault();
                document.querySelector('[data-tab="scouting"]').click();
                break;
            case '5':
                e.preventDefault();
                document.querySelector('[data-tab="analytics"]').click();
                break;
            case '6':
                e.preventDefault();
                document.querySelector('[data-tab="reports"]').click();
                break;
        }
    }
});



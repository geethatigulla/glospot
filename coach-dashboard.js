// Coach Dashboard JavaScript
class CoachDashboard {
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

        // Filter changes
        document.querySelectorAll('.filter-select, .filter-input').forEach(filter => {
            filter.addEventListener('change', () => {
                this.filterAthletes();
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
        if (tabName === 'performance') {
            this.loadPerformanceCharts();
        } else if (tabName === 'scouting') {
            this.loadScoutingData();
        } else if (tabName === 'training') {
            this.loadTrainingData();
        } else if (tabName === 'analytics') {
            this.loadAnalyticsCharts();
        }
    }

    loadDashboardData() {
        // Simulate loading dashboard data
        console.log('Loading dashboard data...');
        
        // Update stats with animation
        this.animateStats();
        
        // Load recent activity
        this.loadRecentActivity();
    }

    animateStats() {
        const statValues = document.querySelectorAll('.stat-content h3');
        statValues.forEach(stat => {
            const finalValue = stat.textContent;
            const numericValue = parseInt(finalValue);
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
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };
        requestAnimationFrame(updateNumber);
    }

    loadRecentActivity() {
        // Simulate loading recent activity
        const activities = [
            {
                icon: 'fas fa-trophy',
                content: '<strong>Rajesh Kumar</strong> achieved new personal best in Vertical Jump: 28.5 inches',
                time: '2 hours ago'
            },
            {
                icon: 'fas fa-user-plus',
                content: '<strong>Priya Sharma</strong> completed fitness assessment',
                time: '4 hours ago'
            },
            {
                icon: 'fas fa-chart-line',
                content: 'Team average improved by 12% this week',
                time: '1 day ago'
            }
        ];

        // Activities are already in HTML, just add animation
        const activityItems = document.querySelectorAll('.activity-item');
        activityItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });
    }

    initializeCharts() {
        // Performance Trends Chart
        const performanceCtx = document.getElementById('performanceChart');
        if (performanceCtx) {
            this.charts.performance = new Chart(performanceCtx, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [{
                        label: 'Vertical Jump (inches)',
                        data: [22.1, 23.5, 24.2, 25.8],
                        borderColor: '#4CAF50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        tension: 0.4,
                        fill: true
                    }, {
                        label: 'Push-ups (count)',
                        data: [32, 34, 36, 38],
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

        // Athlete Distribution Chart
        const distributionCtx = document.getElementById('distributionChart');
        if (distributionCtx) {
            this.charts.distribution = new Chart(distributionCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Elite', 'Qualified', 'Screening'],
                    datasets: [{
                        data: [5, 23, 128],
                        backgroundColor: [
                            '#9C27B0',
                            '#4CAF50',
                            '#FF9800'
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
    }

    loadPerformanceCharts() {
        // Vertical Jump Chart
        const verticalJumpCtx = document.getElementById('verticalJumpChart');
        if (verticalJumpCtx && !this.charts.verticalJump) {
            this.charts.verticalJump = new Chart(verticalJumpCtx, {
                type: 'bar',
                data: {
                    labels: ['Rajesh', 'Priya', 'Amit', 'Sneha', 'Vikram'],
                    datasets: [{
                        label: 'Vertical Jump (inches)',
                        data: [28.5, 24.2, 25.8, 22.1, 26.3],
                        backgroundColor: '#4CAF50',
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

        // Push-up Chart
        const pushupCtx = document.getElementById('pushupChart');
        if (pushupCtx && !this.charts.pushup) {
            this.charts.pushup = new Chart(pushupCtx, {
                type: 'bar',
                data: {
                    labels: ['Rajesh', 'Priya', 'Amit', 'Sneha', 'Vikram'],
                    datasets: [{
                        label: 'Push-ups (count)',
                        data: [42, 38, 35, 32, 40],
                        backgroundColor: '#2196F3',
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
    }

    loadAnalyticsCharts() {
        // Age Distribution Chart
        const ageDistributionCtx = document.getElementById('ageDistributionChart');
        if (ageDistributionCtx && !this.charts.ageDistribution) {
            this.charts.ageDistribution = new Chart(ageDistributionCtx, {
                type: 'bar',
                data: {
                    labels: ['15-16', '17-18', '19-20', '21-22'],
                    datasets: [{
                        label: 'Number of Athletes',
                        data: [45, 67, 32, 12],
                        backgroundColor: '#667eea',
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

        // Sport Distribution Chart
        const sportDistributionCtx = document.getElementById('sportDistributionChart');
        if (sportDistributionCtx && !this.charts.sportDistribution) {
            this.charts.sportDistribution = new Chart(sportDistributionCtx, {
                type: 'pie',
                data: {
                    labels: ['Athletics', 'Basketball', 'Football', 'Other'],
                    datasets: [{
                        data: [45, 32, 28, 51],
                        backgroundColor: [
                            '#4CAF50',
                            '#2196F3',
                            '#FF9800',
                            '#9C27B0'
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

        // Performance Correlation Chart
        const correlationCtx = document.getElementById('correlationChart');
        if (correlationCtx && !this.charts.correlation) {
            this.charts.correlation = new Chart(correlationCtx, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'Vertical Jump vs Push-ups',
                        data: [
                            {x: 28.5, y: 42},
                            {x: 24.2, y: 38},
                            {x: 25.8, y: 35},
                            {x: 22.1, y: 32},
                            {x: 26.3, y: 40}
                        ],
                        backgroundColor: '#667eea',
                        borderColor: '#667eea'
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
                        x: {
                            title: {
                                display: true,
                                text: 'Vertical Jump (inches)'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Push-ups (count)'
                            }
                        }
                    }
                }
            });
        }

        // Improvement Trends Chart
        const improvementCtx = document.getElementById('improvementChart');
        if (improvementCtx && !this.charts.improvement) {
            this.charts.improvement = new Chart(improvementCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Average Improvement (%)',
                        data: [5, 8, 12, 15, 18, 22],
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
    }

    filterAthletes() {
        const sportFilter = document.querySelector('select').value;
        const levelFilter = document.querySelectorAll('select')[1].value;
        const searchFilter = document.querySelector('.filter-input').value.toLowerCase();

        const rows = document.querySelectorAll('.athletes-table tbody tr');
        
        rows.forEach(row => {
            const name = row.querySelector('.athlete-info span').textContent.toLowerCase();
            const sport = row.cells[2].textContent.toLowerCase();
            const status = row.querySelector('.status').textContent.toLowerCase();
            
            let show = true;
            
            if (sportFilter !== 'all' && sport !== sportFilter) {
                show = false;
            }
            
            if (levelFilter !== 'all' && status !== levelFilter) {
                show = false;
            }
            
            if (searchFilter && !name.includes(searchFilter)) {
                show = false;
            }
            
            row.style.display = show ? '' : 'none';
        });
    }

    generateReport(templateType) {
        // Simulate report generation
        const reportTypes = {
            'Performance Summary': 'performance_summary',
            'Individual Athlete Report': 'individual_athlete',
            'Monthly Progress Report': 'monthly_progress'
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

    exportData() {
        // Simulate data export
        this.showNotification('Exporting data...', 'info');
        
        setTimeout(() => {
            this.showNotification('Data exported successfully!', 'success');
        }, 1500);
    }

    loadScoutingData() {
        // Load scouting and validation data
        console.log('Loading scouting data...');
        
        // Animate validation items
        const validationItems = document.querySelectorAll('.validation-item');
        validationItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });
    }

    loadTrainingData() {
        // Load training and mentorship data
        console.log('Loading training data...');
        
        // Animate plan cards
        const planCards = document.querySelectorAll('.plan-card');
        planCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            }, index * 150);
        });
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
    new CoachDashboard();
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

// Scouting & Validation Functions
function approveValidation(button) {
    const validationItem = button.closest('.validation-item');
    const athleteName = validationItem.querySelector('.athlete-details h4').textContent;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Approving...';
    button.disabled = true;
    
    setTimeout(() => {
        validationItem.style.opacity = '0.5';
        validationItem.style.background = '#e8f5e8';
        button.innerHTML = '<i class="fas fa-check"></i> Approved';
        button.style.background = '#4CAF50';
        
        showNotification(`${athleteName}'s test result has been approved!`, 'success');
    }, 1500);
}

function rejectValidation(button) {
    const validationItem = button.closest('.validation-item');
    const athleteName = validationItem.querySelector('.athlete-details h4').textContent;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Rejecting...';
    button.disabled = true;
    
    setTimeout(() => {
        validationItem.style.opacity = '0.5';
        validationItem.style.background = '#ffebee';
        button.innerHTML = '<i class="fas fa-times"></i> Rejected';
        button.style.background = '#f44336';
        
        showNotification(`${athleteName}'s test result has been rejected.`, 'error');
    }, 1500);
}

function addRemarks(button) {
    const athleteName = button.closest('.validation-item').querySelector('.athlete-details h4').textContent;
    const remarks = prompt(`Add remarks for ${athleteName}:`);
    
    if (remarks && remarks.trim()) {
        showNotification(`Remarks added for ${athleteName}: "${remarks}"`, 'success');
    }
}

// Training Functions
function assignPlan(button) {
    const planCard = button.closest('.plan-card');
    const planName = planCard.querySelector('.plan-header h4').textContent;
    
    // Create athlete selection modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Assign Training Plan</h3>
                <button class="modal-close" onclick="closeModal(this)">&times;</button>
            </div>
            <div class="modal-body">
                <p>Select athlete to assign "${planName}" to:</p>
                <div class="athlete-selection">
                    <div class="athlete-option" onclick="selectAthlete(this, 'Rajesh Kumar')">
                        <img src="https://via.placeholder.com/40x40/4CAF50/white?text=RK" alt="Rajesh" class="athlete-avatar">
                        <span>Rajesh Kumar</span>
                    </div>
                    <div class="athlete-option" onclick="selectAthlete(this, 'Priya Sharma')">
                        <img src="https://via.placeholder.com/40x40/2196F3/white?text=PS" alt="Priya" class="athlete-avatar">
                        <span>Priya Sharma</span>
                    </div>
                    <div class="athlete-option" onclick="selectAthlete(this, 'Amit Singh')">
                        <img src="https://via.placeholder.com/40x40/FF9800/white?text=AS" alt="Amit" class="athlete-avatar">
                        <span>Amit Singh</span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" onclick="closeModal(this)">Cancel</button>
                <button class="btn-primary" onclick="confirmAssignment(this, '${planName}')">Assign Plan</button>
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
            max-width: 500px;
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
        .athlete-selection {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin: 1rem 0;
        }
        .athlete-option {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .athlete-option:hover {
            border-color: #667eea;
            background: #f0f4ff;
        }
        .athlete-option.selected {
            border-color: #667eea;
            background: #667eea;
            color: white;
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

function selectAthlete(element, athleteName) {
    // Remove previous selection
    document.querySelectorAll('.athlete-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Select current athlete
    element.classList.add('selected');
    element.dataset.athlete = athleteName;
}

function confirmAssignment(button, planName) {
    const selectedAthlete = document.querySelector('.athlete-option.selected');
    
    if (!selectedAthlete) {
        showNotification('Please select an athlete first!', 'error');
        return;
    }
    
    const athleteName = selectedAthlete.dataset.athlete;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Assigning...';
    button.disabled = true;
    
    setTimeout(() => {
        closeModal(button);
        showNotification(`Training plan "${planName}" assigned to ${athleteName}!`, 'success');
    }, 1500);
}

function closeModal(button) {
    const modal = button.closest('.modal-overlay');
    document.body.removeChild(modal);
}

function viewProgress(button) {
    const row = button.closest('tr');
    const athleteName = row.querySelector('.athlete-info span').textContent;
    
    showNotification(`Loading progress report for ${athleteName}...`, 'info');
    
    setTimeout(() => {
        showNotification(`Progress report for ${athleteName} opened!`, 'success');
    }, 1000);
}

function editPlan(button) {
    const row = button.closest('tr');
    const athleteName = row.querySelector('.athlete-info span').textContent;
    const planName = row.cells[1].textContent;
    
    showNotification(`Editing training plan for ${athleteName}...`, 'info');
    
    setTimeout(() => {
        showNotification(`Training plan "${planName}" updated for ${athleteName}!`, 'success');
    }, 1500);
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
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Live Monitoring Functions
function startLiveSession() {
    showNotification('Live session started!', 'success');
    // Simulate starting live session
    updateSessionStats();
}

function refreshMonitoring() {
    showNotification('Monitoring data refreshed!', 'info');
    // Simulate data refresh
    updateLiveTestCards();
}

function startVideoFeed() {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.innerHTML = `
            <div class="video-feed-active">
                <div class="video-overlay">
                    <div class="recording-indicator">🔴 REC</div>
                    <div class="athlete-info-overlay">
                        <h4>Rajesh Kumar</h4>
                        <p>Standing Vertical Jump Test</p>
                    </div>
                </div>
                <div class="video-controls-overlay">
                    <button class="control-btn active" onclick="toggleRecording()">
                        <i class="fas fa-video"></i>
                        Recording
                    </button>
                    <button class="control-btn" onclick="toggleAudio()">
                        <i class="fas fa-microphone"></i>
                        Audio
                    </button>
                    <button class="control-btn" onclick="captureScreenshot()">
                        <i class="fas fa-camera"></i>
                        Screenshot
                    </button>
                </div>
            </div>
        `;
    }
}

function toggleRecording() {
    const btn = event.target.closest('.control-btn');
    btn.classList.toggle('active');
    const isRecording = btn.classList.contains('active');
    showNotification(isRecording ? 'Recording started' : 'Recording stopped', 'info');
}

function toggleAudio() {
    const btn = event.target.closest('.control-btn');
    btn.classList.toggle('active');
    const isAudioOn = btn.classList.contains('active');
    showNotification(isAudioOn ? 'Audio enabled' : 'Audio disabled', 'info');
}

function toggleFullscreen() {
    const videoContainer = document.querySelector('.main-video');
    if (videoContainer) {
        if (!document.fullscreenElement) {
            videoContainer.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
}

function captureScreenshot() {
    showNotification('Screenshot captured!', 'success');
    // Simulate screenshot capture
    const timestamp = new Date().toLocaleTimeString();
    console.log(`Screenshot captured at ${timestamp}`);
}

function watchLive(athleteId) {
    showNotification(`Watching live feed for ${athleteId}`, 'info');
    // Simulate switching to athlete's live feed
    startVideoFeed();
}

function viewDetails(athleteId) {
    showNotification(`Viewing details for ${athleteId}`, 'info');
    // Simulate opening athlete details modal
}

function sendFeedback(athleteId) {
    const feedback = prompt(`Enter feedback for ${athleteId}:`);
    if (feedback) {
        showNotification(`Feedback sent to ${athleteId}`, 'success');
    }
}

function viewResults(athleteId) {
    showNotification(`Viewing results for ${athleteId}`, 'info');
    // Simulate opening results view
}

function downloadReport(athleteId) {
    showNotification(`Downloading report for ${athleteId}`, 'info');
    // Simulate report download
}

function resumeTest(athleteId) {
    showNotification(`Resuming test for ${athleteId}`, 'success');
    // Simulate test resumption
    updateTestStatus(athleteId, 'in-progress');
}

function pauseTest(athleteId) {
    showNotification(`Pausing test for ${athleteId}`, 'info');
    // Simulate test pause
    updateTestStatus(athleteId, 'paused');
}

function startNewSession() {
    showNotification('New session started!', 'success');
    // Simulate new session creation
    updateSessionStats();
}

function pauseAllTests() {
    showNotification('All tests paused!', 'info');
    // Simulate pausing all tests
    document.querySelectorAll('.live-test-card').forEach(card => {
        const statusBadge = card.querySelector('.status-badge');
        if (statusBadge && statusBadge.textContent === 'In Progress') {
            statusBadge.textContent = 'Paused';
            statusBadge.className = 'status-badge paused';
        }
    });
}

function endSession() {
    if (confirm('Are you sure you want to end the current session?')) {
        showNotification('Session ended!', 'info');
        // Simulate session end
        updateSessionStats();
    }
}

function analyzeForm() {
    showNotification('AI form analysis started!', 'info');
    // Simulate AI analysis
    setTimeout(() => {
        showNotification('Form analysis complete!', 'success');
    }, 2000);
}

function broadcastMessage() {
    const message = prompt('Enter broadcast message:');
    if (message) {
        showNotification('Message broadcasted to all athletes!', 'success');
    }
}

function scheduleReminder() {
    const reminder = prompt('Enter reminder text:');
    if (reminder) {
        showNotification('Reminder scheduled!', 'success');
    }
}

function generateReport() {
    showNotification('Generating comprehensive report...', 'info');
    // Simulate report generation
    setTimeout(() => {
        showNotification('Report generated successfully!', 'success');
    }, 3000);
}

function viewAnalytics() {
    showNotification('Opening analytics dashboard...', 'info');
    // Simulate opening analytics
}

function updateSessionStats() {
    // Simulate updating session statistics
    const stats = document.querySelectorAll('.stat-content h3');
    if (stats.length >= 4) {
        stats[0].textContent = Math.floor(Math.random() * 5) + 1; // Active tests
        stats[1].textContent = '2:45'; // Avg duration
        stats[2].textContent = Math.floor(Math.random() * 20) + 10; // Total athletes
        stats[3].textContent = Math.floor(Math.random() * 20) + 80 + '%'; // Success rate
    }
}

function updateLiveTestCards() {
    // Simulate updating live test cards with new data
    const cards = document.querySelectorAll('.live-test-card');
    cards.forEach(card => {
        const metrics = card.querySelectorAll('.metric-value');
        metrics.forEach(metric => {
            if (metric.textContent.includes('cm')) {
                metric.textContent = (Math.random() * 20 + 60).toFixed(1) + ' cm';
            } else if (metric.textContent.includes('%')) {
                metric.textContent = Math.floor(Math.random() * 20 + 80) + '%';
            }
        });
    });
}

function updateTestStatus(athleteId, status) {
    const cards = document.querySelectorAll('.live-test-card');
    cards.forEach(card => {
        const athleteName = card.querySelector('.athlete-details h4').textContent.toLowerCase();
        if (athleteName.includes(athleteId.toLowerCase())) {
            const statusBadge = card.querySelector('.status-badge');
            const liveIndicator = card.querySelector('.live-indicator');
            
            if (status === 'in-progress') {
                statusBadge.textContent = 'In Progress';
                statusBadge.className = 'status-badge in-progress';
                if (liveIndicator) liveIndicator.style.display = 'block';
            } else if (status === 'paused') {
                statusBadge.textContent = 'Paused';
                statusBadge.className = 'status-badge paused';
                if (liveIndicator) liveIndicator.style.display = 'none';
            }
        }
    });
}

// Live Session Booking Functions
function openBookingModal() {
    const modal = document.createElement('div');
    modal.className = 'booking-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>📅 Book New Live Session</h3>
                <button class="close-modal" onclick="closeBookingModal()">&times;</button>
            </div>
            
            <form id="booking-form">
                <div class="form-group">
                    <label for="session-title">Session Title *</label>
                    <input type="text" id="session-title" name="sessionTitle" required placeholder="e.g., Vertical Jump Assessment">
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="session-date">Date *</label>
                        <input type="date" id="session-date" name="sessionDate" required>
                    </div>
                    <div class="form-group">
                        <label for="session-time">Time *</label>
                        <input type="time" id="session-time" name="sessionTime" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="session-duration">Duration (minutes) *</label>
                        <select id="session-duration" name="sessionDuration" required>
                            <option value="">Select Duration</option>
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">60 minutes</option>
                            <option value="90">90 minutes</option>
                            <option value="120">120 minutes</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="session-type">Session Type *</label>
                        <select id="session-type" name="sessionType" required>
                            <option value="">Select Type</option>
                            <option value="individual">Individual Assessment</option>
                            <option value="group">Group Session</option>
                            <option value="comprehensive">Comprehensive Test</option>
                            <option value="specific">Specific Test Focus</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Select Athletes *</label>
                    <div class="athlete-selection">
                        <div class="athlete-option">
                            <input type="checkbox" id="athlete1" name="athletes" value="rajesh">
                            <label for="athlete1">Rajesh Kumar (Cricket)</label>
                        </div>
                        <div class="athlete-option">
                            <input type="checkbox" id="athlete2" name="athletes" value="priya">
                            <label for="athlete2">Priya Sharma (Basketball)</label>
                        </div>
                        <div class="athlete-option">
                            <input type="checkbox" id="athlete3" name="athletes" value="amit">
                            <label for="athlete3">Amit Singh (Football)</label>
                        </div>
                        <div class="athlete-option">
                            <input type="checkbox" id="athlete4" name="athletes" value="sneha">
                            <label for="athlete4">Sneha Patel (Tennis)</label>
                        </div>
                        <div class="athlete-option">
                            <input type="checkbox" id="athlete5" name="athletes" value="vikram">
                            <label for="athlete5">Vikram Joshi (Athletics)</label>
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="session-tests">Tests to Perform</label>
                    <select id="session-tests" name="sessionTests" multiple>
                        <option value="vertical-jump">Standing Vertical Jump</option>
                        <option value="push-ups">Push-ups</option>
                        <option value="sit-ups">Sit-ups</option>
                        <option value="30m-sprint">30m Standing Start</option>
                        <option value="shuttle-run">4x10m Shuttle Run</option>
                        <option value="medicine-ball">Medicine Ball Throw</option>
                        <option value="sit-reach">Sit and Reach</option>
                        <option value="broad-jump">Standing Broad Jump</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="session-notes">Session Notes</label>
                    <textarea id="session-notes" name="sessionNotes" placeholder="Any special instructions or focus areas for this session..."></textarea>
                </div>
                
                <div class="modal-actions">
                    <button type="button" class="btn-secondary" onclick="closeBookingModal()">Cancel</button>
                    <button type="submit" class="btn-primary">Book Session</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('session-date').value = tomorrow.toISOString().split('T')[0];
    
    // Handle form submission
    document.getElementById('booking-form').addEventListener('submit', handleBookingSubmission);
}

function closeBookingModal() {
    const modal = document.querySelector('.booking-modal');
    if (modal) {
        document.body.removeChild(modal);
    }
}

function handleBookingSubmission(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Get selected athletes
    const selectedAthletes = Array.from(document.querySelectorAll('input[name="athletes"]:checked'))
        .map(checkbox => checkbox.value);
    
    if (selectedAthletes.length === 0) {
        showNotification('Please select at least one athlete!', 'error');
        return;
    }
    
    // Create session object
    const session = {
        id: 'session_' + Date.now(),
        title: formData.get('sessionTitle'),
        date: formData.get('sessionDate'),
        time: formData.get('sessionTime'),
        duration: formData.get('sessionDuration'),
        type: formData.get('sessionType'),
        athletes: selectedAthletes,
        tests: formData.get('sessionTests'),
        notes: formData.get('sessionNotes'),
        status: 'upcoming'
    };
    
    // Add session to upcoming sessions
    addSessionToUpcoming(session);
    
    closeBookingModal();
    showNotification('Session booked successfully!', 'success');
}

function addSessionToUpcoming(session) {
    const upcomingSessions = document.getElementById('upcoming-sessions');
    const sessionCard = document.createElement('div');
    sessionCard.className = 'session-card';
    sessionCard.innerHTML = `
        <div class="session-info">
            <div class="session-time">
                <span class="date">${formatSessionDate(session.date, session.time)}</span>
                <span class="duration">${session.duration} minutes</span>
            </div>
            <div class="session-details">
                <h4>${session.title}</h4>
                <p>${session.type} with ${session.athletes.length} athlete(s)</p>
                <div class="athletes-list">
                    ${session.athletes.map(athlete => `<span class="athlete-tag">${getAthleteName(athlete)}</span>`).join('')}
                </div>
            </div>
        </div>
        <div class="session-actions">
            <button class="btn-primary" onclick="startSession('${session.id}')">
                <i class="fas fa-play"></i>
                Start Now
            </button>
            <button class="btn-secondary" onclick="editSession('${session.id}')">
                <i class="fas fa-edit"></i>
                Edit
            </button>
            <button class="btn-secondary" onclick="cancelSession('${session.id}')">
                <i class="fas fa-times"></i>
                Cancel
            </button>
        </div>
    `;
    
    upcomingSessions.appendChild(sessionCard);
}

function formatSessionDate(date, time) {
    const sessionDate = new Date(date + 'T' + time);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (sessionDate.toDateString() === today.toDateString()) {
        return `Today, ${time}`;
    } else if (sessionDate.toDateString() === tomorrow.toDateString()) {
        return `Tomorrow, ${time}`;
    } else {
        return sessionDate.toLocaleDateString() + ', ' + time;
    }
}

function getAthleteName(athleteId) {
    const names = {
        'rajesh': 'Rajesh Kumar',
        'priya': 'Priya Sharma',
        'amit': 'Amit Singh',
        'sneha': 'Sneha Patel',
        'vikram': 'Vikram Joshi'
    };
    return names[athleteId] || athleteId;
}

function switchBookingTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Show/hide content
    document.querySelectorAll('.booking-content').forEach(content => {
        content.style.display = 'none';
    });
    
    const targetContent = document.getElementById(tabName + '-sessions');
    if (targetContent) {
        targetContent.style.display = 'flex';
    }
}

function startSession(sessionId) {
    showNotification('Starting live session...', 'info');
    // Simulate starting session
    setTimeout(() => {
        showNotification('Live session started!', 'success');
        // Move session to live tab
        moveSessionToLive(sessionId);
    }, 1000);
}

function editSession(sessionId) {
    showNotification('Opening session editor...', 'info');
    // Simulate opening edit modal
}

function cancelSession(sessionId) {
    if (confirm('Are you sure you want to cancel this session?')) {
        showNotification('Session cancelled!', 'info');
        // Remove session from upcoming
        const sessionCard = event.target.closest('.session-card');
        if (sessionCard) {
            sessionCard.remove();
        }
    }
}

function joinLiveSession(sessionId) {
    showNotification('Joining live session...', 'info');
    // Simulate joining live session
    startVideoFeed();
}

function endSession(sessionId) {
    if (confirm('Are you sure you want to end this session?')) {
        showNotification('Session ended!', 'info');
        // Move session to completed
        moveSessionToCompleted(sessionId);
    }
}

function viewSessionReport(sessionId) {
    showNotification('Opening session report...', 'info');
    // Simulate opening report
}

function downloadSessionData(sessionId) {
    showNotification('Downloading session data...', 'info');
    // Simulate data download
}

function moveSessionToLive(sessionId) {
    // This would move the session from upcoming to live tab
    showNotification('Session moved to live monitoring!', 'success');
}

function moveSessionToCompleted(sessionId) {
    // This would move the session from live to completed tab
    showNotification('Session completed and archived!', 'success');
}



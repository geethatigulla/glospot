// Government Onboarding JavaScript
class GovernmentOnboarding {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.formData = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateProgress();
        this.setupFormValidation();
    }

    setupEventListeners() {
        // Role selection change (simplified - only one option)
        document.querySelectorAll('input[name="role"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.handleRoleChange(e.target.value);
            });
        });

        // File upload handlers
        document.getElementById('govt-id').addEventListener('change', (e) => {
            this.handleFileUpload(e, 'govt-id-name');
        });

        document.getElementById('dept-auth').addEventListener('change', (e) => {
            this.handleFileUpload(e, 'dept-auth-name');
        });

        // Form validation
        document.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('blur', () => {
                this.validateField(field);
            });
        });
    }

    setupFormValidation() {
        // Email validation
        document.getElementById('dept-email').addEventListener('input', (e) => {
            this.validateEmail(e.target);
        });

        // Mobile validation
        document.getElementById('mobile').addEventListener('input', (e) => {
            this.validateMobile(e.target);
        });
    }

    // Simplified - no department-specific handling needed

    handleRoleChange(role) {
        const accessInfo = document.querySelector('.access-info');
        if (accessInfo) {
            accessInfo.style.display = 'block';
            accessInfo.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    handleFileUpload(event, fileNameElementId) {
        const file = event.target.files[0];
        const fileNameElement = document.getElementById(fileNameElementId);
        
        if (file) {
            // Validate file type
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
            if (!allowedTypes.includes(file.type)) {
                this.showNotification('Please upload only PDF, JPG, or PNG files.', 'error');
                event.target.value = '';
                fileNameElement.textContent = 'No file chosen';
                return;
            }

            // Validate file size (5MB limit)
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                this.showNotification('File size must be less than 5MB.', 'error');
                event.target.value = '';
                fileNameElement.textContent = 'No file chosen';
                return;
            }

            fileNameElement.textContent = file.name;
            fileNameElement.style.color = '#4CAF50';
        } else {
            fileNameElement.textContent = 'No file chosen';
            fileNameElement.style.color = '#666';
        }
    }

    validateEmail(field) {
        const email = field.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const govtEmailRegex = /\.gov\.in$|\.nic\.in$|@sai\.gov\.in$/;
        
        if (email && !emailRegex.test(email)) {
            this.showFieldError(field, 'Please enter a valid email address.');
            return false;
        }
        
        if (email && !govtEmailRegex.test(email)) {
            this.showFieldError(field, 'Please use an official government email address.');
            return false;
        }
        
        this.clearFieldError(field);
        return true;
    }

    validateMobile(field) {
        const mobile = field.value;
        const mobileRegex = /^[6-9]\d{9}$/;
        
        if (mobile && !mobileRegex.test(mobile)) {
            this.showFieldError(field, 'Please enter a valid 10-digit mobile number.');
            return false;
        }
        
        this.clearFieldError(field);
        return true;
    }

    validateField(field) {
        if (field.hasAttribute('required') && !field.value.trim()) {
            this.showFieldError(field, 'This field is required.');
            return false;
        }
        
        this.clearFieldError(field);
        return true;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #f44336;
            font-size: 0.8rem;
            margin-top: 0.25rem;
            animation: slideDown 0.3s ease;
        `;
        
        field.style.borderColor = '#f44336';
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        field.style.borderColor = '#e0e0e0';
    }

    nextStep() {
        if (this.validateCurrentStep()) {
            this.saveCurrentStepData();
            
            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                this.showStep(this.currentStep);
                this.updateProgress();
                this.updateNavigation();
            } else {
                this.submitRegistration();
            }
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.showStep(this.currentStep);
            this.updateProgress();
            this.updateNavigation();
        }
    }

    showStep(stepNumber) {
        // Hide all steps
        document.querySelectorAll('.onboarding-step').forEach(step => {
            step.classList.remove('active');
        });

        // Show current step
        document.getElementById(`step-${stepNumber}`).classList.add('active');
    }

    updateProgress() {
        const progressFill = document.getElementById('progress-fill');
        const currentStepElement = document.getElementById('current-step');
        
        const progressPercentage = (this.currentStep / this.totalSteps) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        currentStepElement.textContent = this.currentStep;
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        // Update previous button
        prevBtn.disabled = this.currentStep === 1;
        
        // Update next button
        if (this.currentStep === this.totalSteps) {
            nextBtn.innerHTML = '<i class="fas fa-check"></i> Submit Registration';
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
        }
    }

    validateCurrentStep() {
        const currentStepElement = document.getElementById(`step-${this.currentStep}`);
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        // Step-specific validations
        if (this.currentStep === 1) {
            isValid = this.validateEmail(document.getElementById('dept-email')) && 
                     this.validateMobile(document.getElementById('mobile')) && isValid;
        }

        if (this.currentStep === 2) {
            const roleSelected = document.querySelector('input[name="role"]:checked');
            if (!roleSelected) {
                this.showNotification('Please select your role.', 'error');
                isValid = false;
            }
        }

        if (this.currentStep === 3) {
            const department = document.getElementById('department').value;
            const jurisdiction = document.getElementById('jurisdiction').value;
            if (!department) {
                this.showNotification('Please select your department.', 'error');
                isValid = false;
            }
            if (!jurisdiction) {
                this.showNotification('Please select your jurisdiction.', 'error');
                isValid = false;
            }
        }

        if (this.currentStep === 4) {
            const govtId = document.getElementById('govt-id').files[0];
            const deptAuth = document.getElementById('dept-auth').files[0];
            const terms = document.getElementById('terms').checked;
            const verification = document.getElementById('verification').checked;
            const dataSecurity = document.getElementById('data-security').checked;

            if (!govtId || !deptAuth) {
                this.showNotification('Please upload all required documents.', 'error');
                isValid = false;
            }

            if (!terms || !verification || !dataSecurity) {
                this.showNotification('Please accept all terms and conditions.', 'error');
                isValid = false;
            }
        }

        return isValid;
    }

    saveCurrentStepData() {
        const currentStepElement = document.getElementById(`step-${this.currentStep}`);
        const formData = new FormData(currentStepElement.querySelector('form'));
        
        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            this.formData[key] = value;
        }
    }

    async submitRegistration() {
        const submitBtn = document.getElementById('next-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await this.simulateSubmission();
            
            // Show success step
            this.showSuccessStep();
            
        } catch (error) {
            this.showNotification('Registration failed. Please try again.', 'error');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    simulateSubmission() {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Government registration data:', this.formData);
                resolve();
            }, 2000);
        });
    }

    showSuccessStep() {
        // Hide all steps
        document.querySelectorAll('.onboarding-step').forEach(step => {
            step.classList.remove('active');
        });

        // Show success step
        document.getElementById('step-success').classList.add('active');
        
        // Hide navigation
        document.querySelector('.onboarding-footer').style.display = 'none';
        
        // Update progress to 100%
        document.getElementById('progress-fill').style.width = '100%';
        document.getElementById('current-step').textContent = 'Complete';
    }

    showNotification(message, type = 'info') {
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
            max-width: 400px;
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
        }, 4000);
    }
}

// Global functions for HTML onclick handlers
function nextStep() {
    window.governmentOnboarding.nextStep();
}

function previousStep() {
    window.governmentOnboarding.previousStep();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.governmentOnboarding = new GovernmentOnboarding();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

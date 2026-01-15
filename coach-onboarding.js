// Coach Onboarding JavaScript
class CoachOnboarding {
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
        // Organization type change
        document.getElementById('organization-type').addEventListener('change', (e) => {
            this.handleOrganizationTypeChange(e.target.value);
        });

        // File upload handlers
        document.getElementById('id-proof').addEventListener('change', (e) => {
            this.handleFileUpload(e, 'id-proof-name');
        });

        document.getElementById('org-proof').addEventListener('change', (e) => {
            this.handleFileUpload(e, 'org-proof-name');
        });

        // Form validation on input
        document.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });

        // Password confirmation
        document.getElementById('confirm-password').addEventListener('input', (e) => {
            this.validatePasswordMatch();
        });
    }

    setupFormValidation() {
        // Real-time validation for email
        document.getElementById('email').addEventListener('input', (e) => {
            this.validateEmail(e.target);
        });

        // Real-time validation for mobile
        document.getElementById('mobile').addEventListener('input', (e) => {
            this.validateMobile(e.target);
        });
    }

    handleOrganizationTypeChange(type) {
        const orgNameGroup = document.getElementById('organization-name-group');
        const orgNameInput = document.getElementById('organization-name');
        
        if (type === 'independent') {
            orgNameGroup.style.display = 'none';
            orgNameInput.required = false;
        } else {
            orgNameGroup.style.display = 'block';
            orgNameInput.required = true;
        }
    }

    handleFileUpload(event, fileNameElementId) {
        const file = event.target.files[0];
        const fileNameElement = document.getElementById(fileNameElementId);
        
        if (file) {
            // Validate file type
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
            if (!allowedTypes.includes(file.type)) {
                this.showError('Please upload only PDF, JPG, or PNG files.');
                event.target.value = '';
                fileNameElement.textContent = 'No file chosen';
                return;
            }

            // Validate file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                this.showError('File size must be less than 5MB.');
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

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        // Remove existing error styling
        field.classList.remove('error');
        
        if (field.required && !value) {
            this.showFieldError(field, 'This field is required.');
            return false;
        }

        // Specific validations
        switch (fieldName) {
            case 'email':
                return this.validateEmail(field);
            case 'mobile':
                return this.validateMobile(field);
            case 'password':
                return this.validatePassword(field);
            case 'confirmPassword':
                return this.validatePasswordMatch();
        }

        return true;
    }

    validateEmail(field) {
        const email = field.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            this.showFieldError(field, 'Please enter a valid email address.');
            return false;
        }
        
        this.clearFieldError(field);
        return true;
    }

    validateMobile(field) {
        const mobile = field.value.trim();
        const mobileRegex = /^[6-9]\d{9}$/;
        
        if (mobile && !mobileRegex.test(mobile)) {
            this.showFieldError(field, 'Please enter a valid 10-digit mobile number.');
            return false;
        }
        
        this.clearFieldError(field);
        return true;
    }

    validatePassword(field) {
        const password = field.value;
        
        if (password && password.length < 8) {
            this.showFieldError(field, 'Password must be at least 8 characters long.');
            return false;
        }
        
        this.clearFieldError(field);
        return true;
    }

    validatePasswordMatch() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const confirmField = document.getElementById('confirm-password');
        
        if (confirmPassword && password !== confirmPassword) {
            this.showFieldError(confirmField, 'Passwords do not match.');
            return false;
        }
        
        this.clearFieldError(confirmField);
        return true;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#f44336';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.25rem';
        
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    showError(message) {
        // Create error notification
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-exclamation-circle"></i>
                <span>${message}</span>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f44336;
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

        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }

    showSuccess(message) {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
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

    validateCurrentStep() {
        const currentStepElement = document.getElementById(`step-${this.currentStep}`);
        const form = currentStepElement.querySelector('form');
        const requiredFields = form.querySelectorAll('[required]');
        
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        // Additional step-specific validations
        if (this.currentStep === 3) {
            const primarySport = form.querySelector('input[name="primarySport"]:checked');
            if (!primarySport) {
                this.showError('Please select a primary sport specialization.');
                isValid = false;
            }
        }

        if (this.currentStep === 4) {
            const terms = form.querySelector('input[name="terms"]:checked');
            const verification = form.querySelector('input[name="verification"]:checked');
            
            if (!terms || !verification) {
                this.showError('Please accept the terms and verification conditions.');
                isValid = false;
            }
        }

        return isValid;
    }

    collectFormData() {
        const currentStepElement = document.getElementById(`step-${this.currentStep}`);
        const form = currentStepElement.querySelector('form');
        const formData = new FormData(form);
        
        // Convert FormData to object
        const stepData = {};
        for (let [key, value] of formData.entries()) {
            if (stepData[key]) {
                // Handle multiple values (like checkboxes)
                if (Array.isArray(stepData[key])) {
                    stepData[key].push(value);
                } else {
                    stepData[key] = [stepData[key], value];
                }
            } else {
                stepData[key] = value;
            }
        }
        
        this.formData[`step${this.currentStep}`] = stepData;
    }

    nextStep() {
        if (!this.validateCurrentStep()) {
            return;
        }

        this.collectFormData();

        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateStep();
            this.updateProgress();
        } else {
            this.submitApplication();
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateStep();
            this.updateProgress();
        }
    }

    updateStep() {
        // Hide all steps
        document.querySelectorAll('.onboarding-step').forEach(step => {
            step.classList.remove('active');
        });

        // Show current step
        document.getElementById(`step-${this.currentStep}`).classList.add('active');

        // Update navigation buttons
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        prevBtn.disabled = this.currentStep === 1;

        if (this.currentStep === this.totalSteps) {
            nextBtn.innerHTML = `
                <i class="fas fa-paper-plane"></i>
                Submit Application
            `;
        } else {
            nextBtn.innerHTML = `
                Next
                <i class="fas fa-arrow-right"></i>
            `;
        }
    }

    updateProgress() {
        const progressFill = document.getElementById('progress-fill');
        const currentStepElement = document.getElementById('current-step');
        
        const progressPercentage = (this.currentStep / this.totalSteps) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        currentStepElement.textContent = this.currentStep;
    }

    async submitApplication() {
        // Show loading state
        const nextBtn = document.getElementById('next-btn');
        const originalText = nextBtn.innerHTML;
        nextBtn.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            Submitting...
        `;
        nextBtn.disabled = true;

        try {
            // Simulate API call
            await this.simulateSubmission();
            
            // Show success step
            this.showSuccessStep();
            
        } catch (error) {
            this.showError('Failed to submit application. Please try again.');
            nextBtn.innerHTML = originalText;
            nextBtn.disabled = false;
        }
    }

    simulateSubmission() {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Application submitted:', this.formData);
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
        const progressFill = document.getElementById('progress-fill');
        progressFill.style.width = '100%';
    }
}

// Global functions for button clicks
let onboarding;

function nextStep() {
    onboarding.nextStep();
}

function previousStep() {
    onboarding.previousStep();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    onboarding = new CoachOnboarding();
});

// Add CSS for error states
const style = document.createElement('style');
style.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #f44336;
        background: #ffebee;
    }
    
    .error-message {
        color: #f44336;
        font-size: 0.8rem;
        margin-top: 0.25rem;
    }
`;
document.head.appendChild(style);

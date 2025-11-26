// Download Component - Shared across all pages

class DownloadComponent {
    constructor() {
        this.currentDownload = null;
        this.init();
    }

    // User data management with localStorage
    storeUserData(userData) {
        const dataWithExpiry = {
            ...userData,
            expiryTime: Date.now() + (48 * 60 * 60 * 1000) // 48 hours in milliseconds
        };
        localStorage.setItem('aiexpert_user_data', JSON.stringify(dataWithExpiry));
        console.log('✅ User data stored for 48 hours');
    }
    
    getUserData() {
        try {
            const storedData = localStorage.getItem('aiexpert_user_data');
            if (!storedData) return null;
            
            const userData = JSON.parse(storedData);
            
            // Check if data has expired
            if (Date.now() > userData.expiryTime) {
                localStorage.removeItem('aiexpert_user_data');
                console.log('🕒 User data expired, removed from storage');
                return null;
            }
            
            console.log('✅ Valid user data found in storage');
            return userData;
        } catch (error) {
            console.error('Error retrieving user data:', error);
            localStorage.removeItem('aiexpert_user_data');
            return null;
        }
    }
    
    clearUserData() {
        localStorage.removeItem('aiexpert_user_data');
        console.log('🗑️ User data cleared from storage');
    }

    getDownloadModalHTML() {
        return `
            <!-- Download Email Capture Modal -->
            <div class="download-modal" id="downloadModal">
                <div class="download-modal-content">
                    <button class="download-modal-close" onclick="downloadComponent.closeModal()">×</button>
                    <div class="download-modal-header">
                        <h3>🎯 Get Your Free AI Resource</h3>
                        <p id="downloadResourceTitle">Download our premium AI resource</p>
                    </div>
                    
                    <div class="download-value-props">
                        <div class="value-prop">
                            <span class="value-icon">📊</span>
                            <span>Expert insights from industry leaders</span>
                        </div>
                        <div class="value-prop">
                            <span class="value-icon">🚀</span>
                            <span>Actionable strategies for immediate implementation</span>
                        </div>
                        <div class="value-prop">
                            <span class="value-icon">💡</span>
                            <span>Future-proof your business with AI</span>
                        </div>
                    </div>
                    
                    <form class="download-form" id="downloadForm" onsubmit="downloadComponent.submitForm(event)">
                        <div class="download-form-row">
                            <div class="download-form-group">
                                <input type="text" id="downloadFirstName" name="firstName" placeholder="First Name" required>
                            </div>
                            <div class="download-form-group">
                                <input type="text" id="downloadLastName" name="lastName" placeholder="Last Name" required>
                            </div>
                        </div>
                        
                        <div class="download-form-group">
                            <input type="email" id="downloadEmail" name="email" placeholder="Work Email Address" required>
                        </div>
                        
                        <div class="download-form-group">
                            <input type="text" id="downloadCompany" name="company" placeholder="Company Name" required>
                        </div>
                        
                        <button type="submit" class="download-submit-btn">
                            <span class="download-icon">📄</span>
                            Download Now - It's Free!
                        </button>
                        
                        <p class="download-privacy-notice">
                            We respect your privacy. Your information will only be used to send you valuable AI insights. 
                            You can unsubscribe at any time.
                        </p>
                    </form>
                </div>
            </div>
        `;
    }

    getDownloadModalCSS() {
        return `
            /* Download Modal Styles */
            .download-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
                z-index: 1001;
                animation: fadeIn 0.3s ease;
            }

            .download-modal.active {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2rem;
            }

            .download-modal-content {
                background: white;
                border-radius: 20px;
                padding: 2.5rem;
                max-width: 500px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: slideInUp 0.4s ease;
            }

            .download-modal-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: #f3f4f6;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                font-size: 1.5rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.3s ease;
            }

            .download-modal-close:hover {
                background: #e5e7eb;
            }

            .download-modal-header {
                text-align: center;
                margin-bottom: 2rem;
            }

            .download-modal-header h3 {
                color: #1f2937;
                font-size: 1.5rem;
                margin-bottom: 0.5rem;
            }

            .download-modal-header p {
                color: #6b7280;
                font-size: 1rem;
                margin: 0;
            }

            .download-value-props {
                background: #f8fafc;
                padding: 1.5rem;
                border-radius: 12px;
                margin-bottom: 2rem;
            }

            .value-prop {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                margin-bottom: 0.75rem;
                font-size: 0.95rem;
                color: #374151;
            }

            .value-prop:last-child {
                margin-bottom: 0;
            }

            .value-icon {
                font-size: 1.1rem;
            }

            .download-form {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .download-form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }

            .download-form-group input {
                width: 100%;
                padding: 0.875rem;
                border: 2px solid #e5e7eb;
                border-radius: 8px;
                font-size: 1rem;
                transition: border-color 0.3s ease;
                background: white;
            }

            .download-form-group input:focus {
                outline: none;
                border-color: #2563eb;
                box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
            }

            .download-submit-btn {
                background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
                color: white;
                padding: 1rem 2rem;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                font-size: 1.1rem;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                margin-top: 0.5rem;
            }

            .download-submit-btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
            }

            .download-icon {
                font-size: 1.2rem;
            }

            .download-privacy-notice {
                font-size: 0.8rem;
                color: #6b7280;
                text-align: center;
                margin-top: 1rem;
                line-height: 1.4;
            }

            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            @keyframes slideOutRight {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100px);
                }
            }

            @media (max-width: 768px) {
                .download-modal-content {
                    padding: 2rem;
                    margin: 1rem;
                }
                
                .download-form-row {
                    grid-template-columns: 1fr;
                }
            }
        `;
    }

    injectDownloadModal() {
        // Inject CSS
        const style = document.createElement('style');
        style.textContent = this.getDownloadModalCSS();
        document.head.appendChild(style);

        // Inject HTML
        document.body.insertAdjacentHTML('afterbegin', this.getDownloadModalHTML());
    }

    showDownloadForm(fileUrl, fileName) {
        console.log('Showing download form for:', fileName);
        
        // Store the file info for the download
        this.currentDownload = { fileUrl, fileName };
        
        // Check if we have valid user data stored
        const storedUserData = this.getUserData();
        
        if (storedUserData) {
            // User has downloaded before and data is still valid
            console.log('🚀 User recognized, starting instant download...');
            
            // Update the resource title for tracking
            document.getElementById('downloadResourceTitle').textContent = fileName;
            
            // Start download immediately with stored user data
            this.processDownloadWithUserData(storedUserData, fileName);
            
            // Show a brief message that download is starting
            this.showInstantDownloadMessage(storedUserData.firstName);
        } else {
            // First time user or expired data, show the form
            console.log('📝 New user, showing download form...');
            document.getElementById('downloadResourceTitle').textContent = fileName;
            document.getElementById('downloadModal').classList.add('active');
        }
    }

    processDownloadWithUserData(userData, fileName) {
        console.log('🔄 Processing download for returning user:', userData);
        
        // Initialize EmailJS (ensure it's ready)
        if (!window.emailjs) {
            console.error('❌ EmailJS not loaded! Cannot send tracking email.');
            // Still proceed with download
            this.triggerDownload();
            return;
        }
        
        emailjs.init("oI6t4dwMhBXNaBKXo");
        console.log('📧 EmailJS initialized, preparing to send...');

        // Send download notification with stored user data
        const emailParams = {
            from_name: `${userData.firstName} ${userData.lastName}`,
            from_email: userData.email,
            company: userData.company || 'Not specified',
            downloaded_resource: fileName,
            download_date: new Date().toLocaleString(),
            lead_type: 'Resource Download (Returning User)',
            lead_source: 'Website Resource Download'
        };
        
        console.log('📋 Email parameters:', emailParams);

        emailjs.send("theaiexpert_assessment", "template_dmkjg71", emailParams)
            .then((response) => {
                console.log('✅ Download tracking email sent for returning user!', response.status, response.text);
                this.triggerDownload();
            }, (error) => {
                console.error('❌ Download tracking failed for returning user:', error);
                console.error('❌ Error details:', JSON.stringify(error, null, 2));
                // Still proceed with download even if email fails
                this.triggerDownload();
            });
    }

    triggerDownload() {
        // Trigger the actual download
        const link = document.createElement('a');
        link.href = this.currentDownload.fileUrl;
        link.download = this.currentDownload.fileName;
        link.click();
        
        // Show success message
        this.showDownloadSuccess();
    }

    showInstantDownloadMessage(firstName) {
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2563eb;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4);
            z-index: 1002;
            font-weight: 600;
            animation: slideInRight 0.4s ease;
        `;
        messageDiv.innerHTML = `👋 Welcome back, ${firstName}! Starting your download...`;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.animation = 'slideOutRight 0.4s ease';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    document.body.removeChild(messageDiv);
                }
            }, 400);
        }, 3000);
    }

    closeModal() {
        document.getElementById('downloadModal').classList.remove('active');
    }

    submitForm(event) {
        event.preventDefault();
        
        const formData = {
            firstName: document.getElementById('downloadFirstName').value,
            lastName: document.getElementById('downloadLastName').value,
            email: document.getElementById('downloadEmail').value,
            company: document.getElementById('downloadCompany').value,
            downloadedResource: this.currentDownload.fileName,
            downloadDate: new Date().toISOString()
        };

        // Store user data for future downloads (48 hours)
        this.storeUserData(formData);

        // Initialize EmailJS
        emailjs.init("oI6t4dwMhBXNaBKXo");

        // Send download notification
        const emailParams = {
            from_name: `${formData.firstName} ${formData.lastName}`,
            from_email: formData.email,
            company: formData.company || 'Not specified',
            downloaded_resource: formData.downloadedResource,
            download_date: new Date().toLocaleString(),
            lead_type: 'Resource Download',
            lead_source: 'Website Resource Download'
        };

        emailjs.send("theaiexpert_assessment", "template_dmkjg71", emailParams)
            .then((response) => {
                console.log('✅ Download tracking email sent!', response.status, response.text);
                
                // Trigger the actual download
                this.triggerDownload();
                
                // Close modal and reset form
                this.closeModal();
                document.getElementById('downloadForm').reset();
            }, (error) => {
                console.error('❌ Download tracking failed:', error);
                // Still allow download even if tracking fails
                this.triggerDownload();
                this.closeModal();
            });
    }

    showDownloadSuccess() {
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
            z-index: 1002;
            font-weight: 600;
            animation: slideInRight 0.4s ease;
        `;
        successDiv.innerHTML = `✅ Download started! Check your downloads folder.`;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.style.animation = 'slideOutRight 0.4s ease';
            setTimeout(() => {
                if (successDiv.parentNode) {
                    document.body.removeChild(successDiv);
                }
            }, 400);
        }, 5000);
    }

    // Debug functions (accessible via browser console)
    getDebugInterface() {
        return {
            clearUserData: () => this.clearUserData(),
            getUserData: () => this.getUserData(),
            checkUserData: () => {
                const data = this.getUserData();
                if (data) {
                    const expiresIn = Math.round((data.expiryTime - Date.now()) / (1000 * 60 * 60));
                    console.log(`👤 User: ${data.firstName} ${data.lastName} (${data.email})`);
                    console.log(`🏢 Company: ${data.company || 'Not specified'}`);
                    console.log(`⏰ Expires in: ${expiresIn} hours`);
                    return data;
                } else {
                    console.log('❌ No user data stored or data has expired');
                    return null;
                }
            }
        };
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.injectDownloadModal();
            });
        } else {
            this.injectDownloadModal();
        }
    }
}

// Auto-initialize download component when script loads
const downloadComponent = new DownloadComponent();

// Global function for backwards compatibility
function showDownloadForm(fileUrl, fileName) {
    downloadComponent.showDownloadForm(fileUrl, fileName);
}

// Export debug interface
window.debugDownloads = downloadComponent.getDebugInterface();

// Add console message about debug commands
console.log('🛠️ Download Debug Commands Available:');
console.log('   debugDownloads.checkUserData() - Check current stored user data');
console.log('   debugDownloads.clearUserData() - Clear stored user data');
console.log('   debugDownloads.getUserData() - Get raw user data object');

// Export for manual initialization if needed
window.DownloadComponent = DownloadComponent;
window.downloadComponent = downloadComponent; 
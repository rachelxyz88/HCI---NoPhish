// Fungsi untuk submit report
function submitReport(event) {
    event.preventDefault();

    // Validasi file
    const fileInput = document.getElementById('fileAttachment');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file');
        return;
    }

    // Validasi tipe file
    const allowedFormats = ['image/jpeg', 'image/png'];
    if (!allowedFormats.includes(file.type)) {
        alert('Only JPG and PNG files are allowed');
        return;
    }

    // Validasi ukuran file (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        alert('File size must not exceed 5MB');
        return;
    }

    // Ambil data dari form
    const emailSuspicious = document.getElementById('emailSuspicious').value;
    const nameOptional = document.getElementById('nameOptional').value;
    const description = document.getElementById('description').value;

    // Simulasi pengiriman data (sesuaikan dengan backend Anda)
    const reportData = {
        email: emailSuspicious,
        name: nameOptional,
        description: description,
        screenshot: file.name,
        timestamp: new Date().toISOString()
    };

    console.log('Report submitted:', reportData);

    // Tampilkan success page dengan animasi
    const successPage = document.getElementById('successPage');
    if (successPage) {
        successPage.classList.add('show');
        
        // Auto redirect ke homepage setelah 3 detik
        setTimeout(() => {
            backToHome();
        }, 4000);
    }
}

// Fungsi untuk kembali ke homepage
function backToHome() {
    window.location.href = 'index.html';
}

// Handle file upload dengan drag & drop
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileAttachment');
    const fileUploadWrapper = document.querySelector('.file-upload-wrapper');
    const fileInfo = document.getElementById('fileInfo');

    if (fileInput) {
        // Handle file selection
        fileInput.addEventListener('change', function(e) {
            const file = this.files[0];
            if (file) {
                // Validasi file
                const allowedFormats = ['image/jpeg', 'image/png'];
                const maxSize = 5 * 1024 * 1024;

                if (!allowedFormats.includes(file.type)) {
                    fileInfo.textContent = '❌ Only JPG and PNG files are allowed';
                    fileInfo.style.color = '#f56565';
                    fileInput.value = '';
                    return;
                }

                if (file.size > maxSize) {
                    fileInfo.textContent = '❌ File size must not exceed 5MB';
                    fileInfo.style.color = '#f56565';
                    fileInput.value = '';
                    return;
                }

                // Tampilkan nama file dan ukuran
                const fileSizeKB = (file.size / 1024).toFixed(2);
                fileInfo.textContent = `✅ ${file.name} (${fileSizeKB} KB)`;
                fileInfo.style.color = '#48bb78';
            }
        });

        // Handle drag and drop
        if (fileUploadWrapper) {
            fileUploadWrapper.addEventListener('dragover', function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.style.borderColor = '#667eea';
                this.style.backgroundColor = 'rgba(102, 126, 234, 0.08)';
            });

            fileUploadWrapper.addEventListener('dragleave', function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.style.borderColor = '#cbd5e0';
                this.style.backgroundColor = '#f7fafc';
            });

            fileUploadWrapper.addEventListener('drop', function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.style.borderColor = '#cbd5e0';
                this.style.backgroundColor = '#f7fafc';

                const droppedFiles = e.dataTransfer.files;
                if (droppedFiles.length > 0) {
                    fileInput.files = droppedFiles;
                    // Trigger change event
                    fileInput.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });
        }
    }

    // Close success page ketika click di luar
    const successPageOverlay = document.getElementById('successPage');
    if (successPageOverlay) {
        successPageOverlay.addEventListener('click', function(event) {
            if (event.target === this) {
                this.classList.remove('show');
            }
        });
    }
});
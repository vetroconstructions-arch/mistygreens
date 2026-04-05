/**
 * 🕵️ PARANJAPE FOREST TRAILS — STEALTH LEAD ENGINE (v1.0.1)
 * White-labeled background submission for total privacy and UX.
 */

document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form[action*="formsubmit.co"]');
    
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const action = form.getAttribute('action');
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit';
            
            // 1. Premium Scarcity/Loading UI
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <span style="width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite;"></span>
                        <span>ANALYZING DEMAND...</span>
                    </div>
                    <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
                `;
            }

            try {
                // 2. Secret AJAX Fetch (No URL change, No email exposure)
                const response = await fetch(action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // 3. Instant Redirect to Branded Thank You
                    window.location.href = '/thank-you.html';
                } else {
                    throw new Error('Submission failed');
                }
            } catch (err) {
                console.error('Stealth Engine Error:', err);
                // Fallback for extreme cases: standard form submission (but with _captcha=false)
                form.submit();
            }
        });
    });
});

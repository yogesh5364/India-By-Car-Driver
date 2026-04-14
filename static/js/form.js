/* =============================================
   FORM.JS — Validation & Submission
   India by Car Driver
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* Helper: show/hide error */
  const showError = (input, msg) => {
    const group = input.closest('.form-group');
    const errEl = group?.querySelector('.form-error');
    input.classList.add('error');
    input.classList.remove('valid');
    if (errEl) { errEl.textContent = msg || errEl.textContent; errEl.classList.add('show'); }
    input.classList.add('shake');
    input.addEventListener('animationend', () => input.classList.remove('shake'), { once: true });
  };

  const clearError = (input) => {
    const group = input.closest('.form-group');
    const errEl = group?.querySelector('.form-error');
    input.classList.remove('error');
    input.classList.add('valid');
    if (errEl) errEl.classList.remove('show');
  };

  /* Phone validation */
  const isValidPhone = (v) => /^[6-9]\d{9}$/.test(v.replace(/\s+/g, ''));

  /* Validate one field */
  const validateField = (input) => {
    const val = input.value.trim();
    if (input.required && !val) { showError(input, 'This field is required'); return false; }
    if (input.type === 'tel' && val && !isValidPhone(val)) { showError(input, 'Enter a valid 10-digit mobile number'); return false; }
    if (input.minLength && val.length < input.minLength) { showError(input, `Minimum ${input.minLength} characters required`); return false; }
    if (input.tagName === 'SELECT' && !val) { showError(input, 'Please make a selection'); return false; }
    clearError(input);
    return true;
  };

  /* Attach live validation */
  document.querySelectorAll('.form-control').forEach((input) => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) validateField(input);
    });
  });

  /* Form submission */
  document.querySelectorAll('.contact-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = form.querySelectorAll('.form-control');
      let valid = true;
      fields.forEach((f) => { if (!validateField(f)) valid = false; });
      if (!valid) return;

      const submitBtn = form.querySelector('[type="submit"]');
      const original = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 0.8s linear infinite">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>Sending…`;
      submitBtn.disabled = true;

      setTimeout(() => {
        const popupId = form.dataset.popup;
        if (popupId) document.getElementById(popupId)?.classList.add('open');
        form.reset();
        form.querySelectorAll('.form-control').forEach((f) => f.classList.remove('valid', 'error'));
        submitBtn.innerHTML = original;
        submitBtn.disabled = false;
      }, 1200);
    });
  });

});

/* Spin keyframe (injected once) */
const style = document.createElement('style');
style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
document.head.appendChild(style);
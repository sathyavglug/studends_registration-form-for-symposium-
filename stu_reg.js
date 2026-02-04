document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const totalSteps = 5;

    updateProgress();

    window.nextStep = (step) => {
        if (!validateStep(step)) return;
        toggleStep(step, step + 1);
    };

    window.prevStep = (step) => {
        toggleStep(step, step - 1);
    };

    window.generateSummary = () => {
        if (!validateStep(4)) return;

        const data = new FormData(document.getElementById('registration-form'));
        document.getElementById('summary-content').innerHTML = `
            <p>Name: ${data.get('fullName')}</p>
            <p>Email: ${data.get('email')}</p>
            <p>Food: ${data.get('food')}</p>
        `;
        nextStep(4);
    };

    window.submitForm = () => {
        alert("Registration Successful 🎉");
        location.reload();
    };

    function toggleStep(from, to) {
        document.getElementById(`step-${from}`).classList.remove('active');
        document.getElementById(`step-${to}`).classList.add('active');
        currentStep = to;
        updateProgress();
    }

    function validateStep(step) {
        const stepEl = document.getElementById(`step-${step}`);
        const inputs = stepEl.querySelectorAll('[required]');
        for (let input of inputs) {
            if (!input.value) {
                alert("Fill all fields");
                return false;
            }
        }
        return true;
    }

    function updateProgress() {
        document.getElementById('progress-bar').style.width =
            ((currentStep - 1) / (totalSteps - 1)) * 100 + '%';
    }
});

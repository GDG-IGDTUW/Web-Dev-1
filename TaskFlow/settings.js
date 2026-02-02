document.addEventListener('DOMContentLoaded', () => {

    const themeToggle = document.getElementById('themeToggle');
    const notificationToggle = document.getElementById('notificationToggle');
    const languageSelect = document.getElementById('languageSelect');
    const clearTasksBtn = document.getElementById('clearTasksBtn');
    const resetPrefsBtn = document.getElementById('resetPrefsBtn');
    const exportPdfBtn = document.getElementById('exportPdfBtn');


    /* ---------------- LOAD PREFERENCES ---------------- */
    if (localStorage.getItem('theme') === 'dark') {
        themeToggle.checked = true;
        document.body.classList.add('dark-mode');
    }

    if (localStorage.getItem('notifications') === 'false') {
        notificationToggle.checked = false;
    }

    const lang = localStorage.getItem('language');
    if (lang) languageSelect.value = lang;

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }


    /* ---------------- THEME ---------------- */
    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode', themeToggle.checked);
        localStorage.setItem('theme', themeToggle.checked ? 'dark' : 'light');
    });

    /* ---------------- NOTIFICATIONS ---------------- */
    notificationToggle.addEventListener('change', () => {
        localStorage.setItem(
            'notifications',
            notificationToggle.checked ? 'true' : 'false'
        );
    });

    /* ---------------- LANGUAGE ---------------- */
    languageSelect.addEventListener('change', () => {
        localStorage.setItem('language', languageSelect.value);
        alert(`Language set to ${languageSelect.value}`);
    });

    /* ---------------- CLEAR TASKS ---------------- */
    clearTasksBtn.addEventListener('click', () => {
        if (confirm('Clear all tasks?')) {
            localStorage.removeItem('tasks');
            alert('All tasks cleared');
        }
    });

    /* ---------------- RESET PREFS ---------------- */
    resetPrefsBtn.addEventListener('click', () => {
        if (confirm('Reset preferences?')) {
            localStorage.removeItem('theme');
            localStorage.removeItem('language');
            localStorage.removeItem('notifications');
            location.reload();
        }
    });

    /* ---------------- EXPORT TO PDF ---------------- */
    exportPdfBtn.addEventListener('click', () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const list = document.getElementById('pdfTaskList');
        const element = document.getElementById('pdfContent');
        const heading = document.getElementById('pdfHeading');

        // Language-based heading
        const lang = localStorage.getItem('language') || 'English';
        heading.textContent =
            lang === 'Hindi'
                ? 'TaskFlow - कार्य सूची'
                : 'TaskFlow - Task List';

        list.innerHTML = '';

        if (tasks.length === 0) {
            list.innerHTML =
                lang === 'Hindi'
                    ? '<li>कोई कार्य उपलब्ध नहीं है</li>'
                    : '<li>No tasks available</li>';
        } else {
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = `${task.completed ? '✔' : '○'} ${task.title}`;
                list.appendChild(li);
            });
        }

        // 🔥 CRITICAL PART
        element.style.display = 'block';

        setTimeout(() => {
            html2pdf()
                .from(element)
                .set({
                    margin: 10,
                    filename: 'TaskFlow_Tasks.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                })
                .save()
                .then(() => {
                    element.style.display = 'none';
                });
        }, 100);
    });


});

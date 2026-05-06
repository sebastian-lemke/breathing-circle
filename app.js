class BreathingApp {
    constructor() {
        this.isRunning = false;
        this.isPaused = false;
        this.currentPhase = 'ready';
        this.cycleCount = 0;
        this.sessionStartTime = 0;
        this.sessionDuration = 5 * 60 * 1000; // 5 minutes in milliseconds
        this.currentCycleTime = 0;
        this.phaseTimer = null;
        this.sessionTimer = null;
        
        this.techniques = {
            '478': { 
                inhale: 4, inhaleHold: 7, exhale: 8, exhaleHold: 0, 
                name: '4-7-8 Breathing',
                pattern: 'Inhale 4s → Hold 7s → Exhale 8s',
                benefits: 'Reduces anxiety, promotes deep sleep, lowers cortisol levels, activates parasympathetic nervous system',
                when: 'Best for: Evening wind-down, insomnia relief, panic attacks, pre-sleep routine'
            },
            'box': { 
                inhale: 4, inhaleHold: 4, exhale: 4, exhaleHold: 4, 
                name: 'Box Breathing',
                pattern: 'Inhale 4s → Hold 4s → Exhale 4s → Hold 4s',
                benefits: 'Enhances concentration, reduces stress hormones, improves decision-making, builds mental resilience',
                when: 'Best for: High-pressure situations, before presentations, military/tactical training, exam preparation'
            },
            'wimhof': { 
                inhale: 2, inhaleHold: 0, exhale: 1, exhaleHold: 0, 
                name: 'Wim Hof Method',
                pattern: 'Inhale 2s → Exhale 1s (30+ rapid cycles)',
                benefits: 'Boosts energy, strengthens immune system, increases cold tolerance, releases endorphins',
                when: 'Best for: Morning activation, pre-workout, cold exposure prep, energy boost'
            },
            'coherent': { 
                inhale: 5, inhaleHold: 0, exhale: 5, exhaleHold: 0, 
                name: 'Coherent Breathing',
                pattern: 'Inhale 5s → Exhale 5s (6 breaths/min)',
                benefits: 'Optimizes heart rate variability, balances autonomic nervous system, improves emotional regulation',
                when: 'Best for: Daily meditation, stress management, emotional balance, HRV training'
            },
            'triangle': { 
                inhale: 4, inhaleHold: 4, exhale: 4, exhaleHold: 0, 
                name: 'Triangle Breathing',
                pattern: 'Inhale 4s → Hold 4s → Exhale 4s',
                benefits: 'Promotes mindfulness, gentle stress relief, improves focus without overstimulation',
                when: 'Best for: Beginners, gentle relaxation, mindful moments, workplace breaks'
            },
            'pranayama': {
                inhale: 4, inhaleHold: 16, exhale: 8, exhaleHold: 0,
                name: 'Pranayama 4-16-8',
                pattern: 'Inhale 4s → Hold 16s → Exhale 8s',
                benefits: 'Increases lung capacity, enhances mental clarity, builds breath control, deepens meditation',
                when: 'Best for: Advanced practitioners, yoga practice, deep meditation, spiritual development'
            },
            'bellows': {
                inhale: 1, inhaleHold: 0, exhale: 1, exhaleHold: 0,
                name: 'Bellows Breathing',
                pattern: 'Inhale 1s → Exhale 1s (Fast rhythm)',
                benefits: 'Rapidly increases alertness, boosts metabolism, clears mental fog, energizes body',
                when: 'Best for: Morning wake-up, mental clarity, pre-workout, combating fatigue'
            },
            'equal': {
                inhale: 6, inhaleHold: 0, exhale: 6, exhaleHold: 0,
                name: 'Equal Breathing',
                pattern: 'Inhale 6s → Exhale 6s (Equal counts)',
                benefits: 'Creates mental balance, reduces anxiety, promotes inner calm, stabilizes mood',
                when: 'Best for: Anxiety relief, mood stabilization, general relaxation, daily practice'
            },
            'extended': {
                inhale: 4, inhaleHold: 0, exhale: 8, exhaleHold: 0,
                name: 'Extended Exhale',
                pattern: 'Inhale 4s → Exhale 8s (2:1 ratio)',
                benefits: 'Activates rest-digest response, lowers blood pressure, reduces stress, improves sleep quality',
                when: 'Best for: Stress relief, hypertension management, evening relaxation, anxiety reduction'
            },
            'alternate': {
                inhale: 4, inhaleHold: 2, exhale: 4, exhaleHold: 2,
                name: 'Alternate Nostril',
                pattern: 'Inhale 4s → Hold 2s → Exhale 4s → Hold 2s',
                benefits: 'Balances brain hemispheres, improves concentration, harmonizes nervous system, enhances mental clarity',
                when: 'Best for: Mental balance, before studying, creative work, decision-making'
            },
            'ocean': {
                inhale: 5, inhaleHold: 0, exhale: 7, exhaleHold: 0,
                name: 'Ocean Breathing',
                pattern: 'Inhale 5s → Exhale 7s (Deep & slow)',
                benefits: 'Calms nervous system, improves focus, generates internal heat, enhances endurance',
                when: 'Best for: Yoga practice, meditation, stress relief, building concentration'
            },
            'custom': { 
                inhale: 4, inhaleHold: 0, exhale: 4, exhaleHold: 0, 
                name: 'Custom Pattern',
                pattern: 'Personalized timing',
                benefits: 'Tailored to your specific needs, goals, and breathing capacity',
                when: 'Best for: Advanced practitioners, therapeutic needs, specific training goals'
            }
        };
        
        this.currentTechnique = this.techniques['478'];
        this.initializeElements();
        this.bindEvents();
        this.loadUserPreferences();
    }

    initializeElements() {
        this.breathingCircle = document.getElementById('breathingCircle');
        this.breathText = document.getElementById('breathText');
        this.techniqueSelect = document.getElementById('techniqueSelect');
        this.sessionDurationInput = document.getElementById('sessionDuration');
        this.customSettings = document.getElementById('customSettings');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.sessionStatus = document.getElementById('sessionStatus');
        this.statusTimer = document.getElementById('statusTimer');
        this.statusCycles = document.getElementById('statusCycles');
        this.statusPhase = document.getElementById('statusPhase');
        this.progressFill = document.getElementById('progressFill');
        this.sidebar = document.querySelector('.sidebar');
        this.toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
        
        // Custom settings inputs
        this.customInhale = document.getElementById('customInhale');
        this.customInhaleHold = document.getElementById('customInhaleHold');
        this.customExhale = document.getElementById('customExhale');
        this.customExhaleHold = document.getElementById('customExhaleHold');
    }

    bindEvents() {
        this.techniqueSelect.addEventListener('change', () => this.onTechniqueChange());
        this.sessionDurationInput.addEventListener('change', () => this.updateSessionDuration());
        this.startBtn.addEventListener('click', () => this.startSession());
        this.pauseBtn.addEventListener('click', () => this.pauseSession());
        this.stopBtn.addEventListener('click', () => this.stopSession());
        this.toggleSidebarBtn.addEventListener('click', () => this.toggleSidebar());
        
        // Custom settings inputs
        [this.customInhale, this.customInhaleHold, this.customExhale, this.customExhaleHold]
            .forEach(input => input.addEventListener('change', () => this.updateCustomTechnique()));
    }

    onTechniqueChange() {
        const selectedTechnique = this.techniqueSelect.value;
        this.currentTechnique = { ...this.techniques[selectedTechnique] };
        
        // Update technique info display
        this.updateTechniqueInfo(selectedTechnique);
        
        if (selectedTechnique === 'custom') {
            this.customSettings.classList.add('active');
            this.updateCustomTechnique();
        } else {
            this.customSettings.classList.remove('active');
        }
        
        this.saveUserPreferences();
    }

    toggleSidebar() {
        if (!this.sidebar) return;
        const hidden = this.sidebar.classList.toggle('hidden');
        this.toggleSidebarBtn.textContent = hidden ? '☰' : '✕';
        this.toggleSidebarBtn.setAttribute('aria-pressed', String(hidden));
    }

    updateTechniqueInfo(techniqueKey) {
        const technique = this.techniques[techniqueKey];
        document.querySelector('#techniqueInfo h3').textContent = technique.name;
        document.getElementById('techniquePattern').textContent = technique.pattern;
        document.getElementById('techniqueBenefits').innerHTML = `<strong>Benefits:</strong> ${technique.benefits}`;
        document.getElementById('techniqueWhen').textContent = technique.when;
    }

    updateCustomTechnique() {
        this.currentTechnique.inhale = parseInt(this.customInhale.value) || 4;
        this.currentTechnique.inhaleHold = parseInt(this.customInhaleHold.value) || 0;
        this.currentTechnique.exhale = parseInt(this.customExhale.value) || 4;
        this.currentTechnique.exhaleHold = parseInt(this.customExhaleHold.value) || 0;
        this.saveUserPreferences();
    }

    updateSessionDuration() {
        this.sessionDuration = parseInt(this.sessionDurationInput.value) * 60 * 1000;
        this.saveUserPreferences();
    }

    startSession() {
        if (this.isPaused) {
            this.resumeSession();
            return;
        }
        
        this.isRunning = true;
        this.isPaused = false;
        this.cycleCount = 0;
        this.sessionStartTime = Date.now();
        this.currentCycleTime = 0;
        
        this.updateUI('session');
        this.startBreathingCycle();
        this.startSessionTimer();
    }

    pauseSession() {
        this.isPaused = true;
        this.isRunning = false;
        clearTimeout(this.phaseTimer);
        clearInterval(this.sessionTimer);
        
        this.pauseBtn.textContent = 'Resume';
        this.breathText.textContent = 'Paused';
        this.breathingCircle.className = 'breathing-circle';
    }

    resumeSession() {
        this.isPaused = false;
        this.isRunning = true;
        this.pauseBtn.textContent = 'Pause';
        this.startBreathingCycle();
        this.startSessionTimer();
    }

    stopSession() {
        this.isRunning = false;
        this.isPaused = false;
        clearTimeout(this.phaseTimer);
        clearInterval(this.sessionTimer);
        
        this.updateUI('ready');
        this.breathText.textContent = 'Ready';
        this.breathingCircle.className = 'breathing-circle';
        this.cycleCount = 0;
        this.currentCycleTime = 0;
    }

    startBreathingCycle() {
        if (!this.isRunning) return;
        
        this.runPhase('inhale', this.currentTechnique.inhale * 1000);
    }

    runPhase(phase, duration) {
        if (!this.isRunning) return;
        
        this.currentPhase = phase;
        this.updatePhaseUI(phase, duration);
        
        this.phaseTimer = setTimeout(() => {
            switch (phase) {
                case 'inhale':
                    if (this.currentTechnique.inhaleHold > 0) {
                        this.runPhase('inhaleHold', this.currentTechnique.inhaleHold * 1000);
                    } else {
                        this.runPhase('exhale', this.currentTechnique.exhale * 1000);
                    }
                    break;
                case 'inhaleHold':
                    this.runPhase('exhale', this.currentTechnique.exhale * 1000);
                    break;
                case 'exhale':
                    if (this.currentTechnique.exhaleHold > 0) {
                        this.runPhase('exhaleHold', this.currentTechnique.exhaleHold * 1000);
                    } else {
                        this.completeCycle();
                    }
                    break;
                case 'exhaleHold':
                    this.completeCycle();
                    break;
            }
        }, duration);
    }

    completeCycle() {
        this.cycleCount++;
        this.statusCycles.textContent = this.cycleCount;
        this.startBreathingCycle();
    }

    updatePhaseUI(phase, duration = 4000) {
        // Update transition duration to match breath phase
        const transitionDuration = duration / 1000;
        this.breathingCircle.style.transition = `all ${transitionDuration}s cubic-bezier(0.4, 0, 0.2, 1)`;
        
        // Apply phase class with smooth transition
        this.breathingCircle.className = `breathing-circle ${phase}`;
        
        const phaseTexts = {
            'inhale': 'Breathe In',
            'inhaleHold': 'Hold',
            'exhale': 'Breathe Out',
            'exhaleHold': 'Hold'
        };
        
        this.breathText.textContent = phaseTexts[phase];
        this.statusPhase.textContent = phaseTexts[phase];
    }

    startSessionTimer() {
        this.sessionTimer = setInterval(() => {
            if (!this.isRunning) return;
            
            const elapsed = Date.now() - this.sessionStartTime;
            const remaining = Math.max(0, this.sessionDuration - elapsed);
            
            this.updateTimer(remaining);
            this.updateProgress(elapsed / this.sessionDuration * 100);
            
            if (remaining <= 0) {
                this.completeSession();
            }
        }, 100);
    }

    updateTimer(remaining) {
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        this.statusTimer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    updateProgress(percentage) {
        this.progressFill.style.width = `${Math.min(100, percentage)}%`;
    }

    completeSession() {
        this.stopSession();
        this.breathText.textContent = 'Session Complete!';
        setTimeout(() => {
            this.breathText.textContent = 'Ready';
        }, 3000);
    }

    updateUI(state) {
        if (state === 'session') {
            this.startBtn.style.display = 'none';
            this.pauseBtn.style.display = 'inline-block';
            this.stopBtn.style.display = 'inline-block';
            this.sessionStatus.classList.add('active');
            this.pauseBtn.textContent = 'Pause';
        } else {
            this.startBtn.style.display = 'inline-block';
            this.pauseBtn.style.display = 'none';
            this.stopBtn.style.display = 'none';
            this.sessionStatus.classList.remove('active');
            this.progressFill.style.width = '0%';
            this.statusCycles.textContent = '0';
            this.statusPhase.textContent = 'Ready';
        }
    }

    saveUserPreferences() {
        const preferences = {
            technique: this.techniqueSelect.value,
            sessionDuration: this.sessionDurationInput.value,
            customSettings: {
                inhale: this.customInhale.value,
                inhaleHold: this.customInhaleHold.value,
                exhale: this.customExhale.value,
                exhaleHold: this.customExhaleHold.value
            }
        };
        localStorage.setItem('breathingAppPreferences', JSON.stringify(preferences));
    }

    loadUserPreferences() {
        const saved = localStorage.getItem('breathingAppPreferences');
        if (saved) {
            const preferences = JSON.parse(saved);
            this.techniqueSelect.value = preferences.technique || '478';
            this.sessionDurationInput.value = preferences.sessionDuration || '5';
            
            if (preferences.customSettings) {
                this.customInhale.value = preferences.customSettings.inhale || '4';
                this.customInhaleHold.value = preferences.customSettings.inhaleHold || '0';
                this.customExhale.value = preferences.customSettings.exhale || '4';
                this.customExhaleHold.value = preferences.customSettings.exhaleHold || '0';
            }
            
            this.onTechniqueChange();
            this.updateSessionDuration();
        }
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new BreathingApp();
});
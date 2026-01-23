// Smart Readability Dashboard - Main JavaScript
// Simple and beginner-friendly approach using vanilla JavaScript

// Plugin system - manually add plugins to this array
const plugins = [
    wordCountPlugin,
    readingTimePlugin,
    longSentencePlugin,
    questionCountPlugin,
    averageWordLengthPlugin,
    emotionDetectionPlugin,
    paragraphCountPlugin,
    countLettersPlugin

];

// Demo texts for different difficulty levels
const DEMO_TEXTS = {
    easy: `The cat sat on the mat. It was a sunny day. The birds sang in the trees. Children played in the park. Everyone was happy. The flowers looked beautiful. This is simple text that is easy to read.`,
    
    medium: `Technology has revolutionized the way we communicate and interact with each other. Social media platforms have created new opportunities for connection while also presenting unique challenges for privacy and mental health. These digital tools require us to develop new skills for navigating online relationships effectively.`,
    
    hard: `The implementation of sophisticated algorithms in contemporary computational linguistics necessitates comprehensive understanding of probabilistic models and their underlying mathematical foundations, particularly in the context of natural language processing applications that demonstrate unprecedented capabilities in semantic analysis and syntactic disambiguation through machine learning methodologies.`
};

// DOM elements
let textInput;
let analyzeBtn;
let clearBtn;
let exportBtn;
let darkModeBtn;
let highlightedSection;
let isSpeaking = false;
let ttsUtterance = null;
let isDemoText = true;


// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    textInput = document.getElementById('textInput');
    analyzeBtn = document.getElementById('analyzeBtn');
    clearBtn = document.getElementById('clearBtn');
    const ttsBtn = document.getElementById('ttsBtn');
    exportBtn = document.getElementById('exportBtn');
    darkModeBtn = document.getElementById('darkModeBtn');
    highlightedSection = document.getElementById('highlightedSection');
    
    // Add event listeners
    analyzeBtn.addEventListener('click', analyzeText);
    clearBtn.addEventListener('click', clearText);
    ttsBtn.addEventListener('click', toggleSpeech);
    exportBtn.addEventListener('click', () => {
        showError('Export functionality coming soon! Contributors welcome to implement this feature.');
    });
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // TODO for beginners: Implement keyboard shortcuts functionality
    // document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Auto-analyze on input (with debouncing)
    let timeout;
    textInput.addEventListener('input', function() {
        clearTimeout(timeout);
        timeout = setTimeout(analyzeText, 500); // Wait 500ms after user stops typing
    });
    
    // Initialize with sample text for demo
    textInput.value = '';
    
    // TODO for beginners: Implement dark mode persistence with localStorage
    // TODO for beginners: Add keyboard shortcuts for better UX
    
    // Run initial analysis
    analyzeText();
});

// Demo text loader function
function loadDemo(difficulty) {
    if (DEMO_TEXTS[difficulty]) {
        textInput.value = DEMO_TEXTS[difficulty];
        analyzeText();
        
        // Smooth scroll to top
        textInput.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Brief highlight effect
        textInput.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
        setTimeout(() => {
            textInput.style.boxShadow = '';
        }, 1000);
    }
}

// TODO for beginners: Implement keyboard shortcuts functionality
// function handleKeyboardShortcuts(event) { ... }

// Ctrl + Enter shortcut to click Analyse button
document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "Enter") {
        document.getElementById("analyzeBtn").click();
    }
});

// TODO for beginners: Implement dark mode toggle functionality  
// function toggleDarkMode() { ... }

// TODO for beginners: Implement export functionality
// function exportResults() { ... }

// TODO for beginners: Implement readability recommendations
// function getReadabilityRecommendations(stats) { ... }

function analyzeText() {
    speechSynthesis.cancel();
    isSpeaking = false;
    document.getElementById('ttsBtn').textContent = "Preview Speech";

    const text = textInput.value.trim();
    
    if (!text) {
        resetStats();
        return;
    }

    // Basic text analysis
    const basicStats = getBasicStats(text);

    // NLP analysis
    const nlpStats = getNLPStats(text);

    // Update UI
    updateUI(basicStats, nlpStats, text);

    updateReadabilityProgress(basicStats);

    // Plugins
    runPlugins(text);

    // Highlight text
    highlightText(text, basicStats);
}


function toggleSpeech() {
    const text = textInput.value.trim();

    if (!text) {
        showError("Please enter some text first.");
        return;
    }

    // If already speaking → STOP
    if (isSpeaking) {
        speechSynthesis.cancel();
        isSpeaking = false;
        ttsBtn.textContent = "Preview Speech";
        return;
    }

    // Start speaking
    speechSynthesis.cancel();
    ttsUtterance = new SpeechSynthesisUtterance(text);

    ttsUtterance.rate = 1;
    ttsUtterance.pitch = 1;
    ttsUtterance.volume = 1;

    const voices = speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en'));
    if (englishVoice) {
        ttsUtterance.voice = englishVoice;
    }

    ttsUtterance.onend = () => {
        isSpeaking = false;
        ttsBtn.textContent = "Preview Speech";
    };

    speechSynthesis.speak(ttsUtterance);

    isSpeaking = true;
    ttsBtn.textContent = "Stop Speech";
}


function getBasicStats(text) {
    // Word count
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    
    // Sentence count
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    const sentenceCount = sentences.length;
    
    // Reading time (200 words per minute)
    const readingTimeMinutes = Math.ceil(wordCount / 200);
    const readingTime = readingTimeMinutes < 1 ? "< 1 min" : `${readingTimeMinutes} min`;
    
    // Long sentences (>20 words)
    let longSentenceCount = 0;
    sentences.forEach(sentence => {
        const sentenceWords = sentence.trim().split(/\s+/).filter(word => word.length > 0);
        if (sentenceWords.length > 20) {
            longSentenceCount++;
        }
    });
    
    // Hard words (>8 characters)
    let hardWordCount = 0;
    words.forEach(word => {
        // Remove punctuation and check length
        const cleanWord = word.replace(/[^\w]/g, '');
        if (cleanWord.length > 8) {
            hardWordCount++;
        }
    });
    
    // Readability level (simple rule-based approach)
    let level = 'Easy';
    let description = 'Your text is easy to read!';
    
    const avgWordsPerSentence = wordCount / sentenceCount || 0;
    const hardWordRatio = hardWordCount / wordCount || 0;
    
    if (avgWordsPerSentence > 20 || hardWordRatio > 0.3 || longSentenceCount > sentenceCount * 0.5) {
        level = 'Hard';
        description = 'Your text might be challenging to read. Consider shorter sentences and simpler words.';
    } else if (avgWordsPerSentence > 15 || hardWordRatio > 0.15 || longSentenceCount > sentenceCount * 0.25) {
        level = 'Medium';
        description = 'Your text has moderate readability. Some improvements could help.';
    }
    
    return {
        wordCount,
        sentenceCount,
        readingTime,
        longSentenceCount,
        hardWordCount,
        level,
        description,
        sentences
    };
}

function getNLPStats(text) {
    // Use Compromise.js for NLP analysis
    try {
        const doc = nlp(text);
        const nouns = doc.nouns().out('array');
        const verbs = doc.verbs().out('array');
        
        return {
            nounCount: nouns.length,
            verbCount: verbs.length,
            nouns,
            verbs
        };
    } catch (error) {
        console.warn('NLP analysis failed:', error);
        return {
            nounCount: 0,
            verbCount: 0,
            nouns: [],
            verbs: []
        };
    }
}

function updateUI(basicStats, nlpStats, text) {
    // Update basic stats
    document.getElementById('wordCount').textContent = basicStats.wordCount;
    document.getElementById('sentenceCount').textContent = basicStats.sentenceCount;
    document.getElementById('readingTime').textContent = basicStats.readingTime;
    
    // Update readability level
    const readabilityBadge = document.getElementById('readabilityBadge');
    const readabilityDescription = document.getElementById('readabilityDescription');
    
    readabilityBadge.textContent = basicStats.level;
    readabilityBadge.className = `level-badge level-${basicStats.level.toLowerCase()}`;
    readabilityDescription.textContent = basicStats.description;
    
    // Update detailed stats
    document.getElementById('longSentences').textContent = basicStats.longSentenceCount;
    document.getElementById('hardWords').textContent = basicStats.hardWordCount;
    document.getElementById('nounCount').textContent = nlpStats.nounCount;
    document.getElementById('verbCount').textContent = nlpStats.verbCount;
    
    // Add fade-in animation
    const statsPanel = document.querySelector('.stats-panel');
    statsPanel.classList.remove('fade-in');
    setTimeout(() => statsPanel.classList.add('fade-in'), 10);
}

function runPlugins(text) {
    const pluginOutput = document.getElementById('pluginOutput');
    pluginOutput.innerHTML = '';
    
    plugins.forEach((plugin, index) => {
        const result = safePluginExecution(plugin, text);
        
        const pluginResult = document.createElement('div');
        pluginResult.className = 'plugin-result';
        
        // Add tooltip with plugin information
        pluginResult.title = `Plugin ${index + 1}: ${plugin.name || 'Unnamed Plugin'}`;
        
        pluginResult.innerHTML = `
            <span class="plugin-label">${result.label}</span>
            <span class="plugin-value">${result.value}</span>
        `;
        
        pluginOutput.appendChild(pluginResult);
    });
}

function highlightText(text, basicStats) {
    const highlightedText = document.getElementById('highlightedText');
    
    if (!text) {
        highlightedSection.style.display = 'none';
        return;
    }
    
    let highlightedHTML = '';
    
    // Split text into sentences for highlighting
    const sentences = basicStats.sentences;
    
    sentences.forEach(sentence => {
        if (!sentence.trim()) return;
        
        // Check if sentence is long (>20 words)
        const words = sentence.trim().split(/\s+/).filter(word => word.length > 0);
        const isLongSentence = words.length > 20;
        
        // Process each word in the sentence
        let processedSentence = '';
        words.forEach((word, index) => {
            // Remove punctuation to check word length
            const cleanWord = word.replace(/[^\w]/g, '');
            const isHardWord = cleanWord.length > 8;
            
            if (isHardWord) {
                processedSentence += `<span class="hard-word">${word}</span>`;
            } else {
                processedSentence += word;
            }
            
            // Add space between words (except for the last word)
            if (index < words.length - 1) {
                processedSentence += ' ';
            }
        });
        
        // Wrap long sentences
        if (isLongSentence) {
            highlightedHTML += `<span class="long-sentence">${processedSentence}</span>`;
        } else {
            highlightedHTML += processedSentence;
        }
        
        // Add sentence ending
        highlightedHTML += '. ';
    });
    
    highlightedText.innerHTML = highlightedHTML;
    highlightedSection.style.display = 'block';
    
    // Smooth scroll to highlighted section
    setTimeout(() => {
        highlightedSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 300);
}

function clearText() {
    speechSynthesis.cancel();
    isSpeaking = false;
    document.getElementById('ttsBtn').textContent = "Preview Speech";

    textInput.value = '';
    resetStats();
    highlightedSection.style.display = 'none';
    textInput.focus();
}

function resetStats() {
    // Reset all stats to zero
    document.getElementById('wordCount').textContent = '0';
    document.getElementById('sentenceCount').textContent = '0';
    document.getElementById('readingTime').textContent = '0 min';
    document.getElementById('longSentences').textContent = '0';
    document.getElementById('hardWords').textContent = '0';
    document.getElementById('nounCount').textContent = '0';
    document.getElementById('verbCount').textContent = '0';
    
    // Reset readability level
    const readabilityBadge = document.getElementById('readabilityBadge');
    const readabilityDescription = document.getElementById('readabilityDescription');
    
    readabilityBadge.textContent = 'Easy';
    readabilityBadge.className = 'level-badge level-easy';
    readabilityDescription.textContent = 'Enter some text to analyze!';
    
    // Clear plugin output
    document.getElementById('pluginOutput').innerHTML = '';
}

// Error and success message functions
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = '❌ ' + message;
    
    const container = document.querySelector('.stats-panel');
    container.insertBefore(errorDiv, container.firstChild);
    
    // Remove error after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'error-message';
    successDiv.style.cssText = `
        background: #f0fdf4;
        color: #166534;
        border-left-color: #16a34a;
    `;
    successDiv.textContent = '✅ ' + message;
    
    const container = document.querySelector('.stats-panel');
    container.insertBefore(successDiv, container.firstChild);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 3000);
}

// Performance measurement
function measureAnalysisTime(analysisFunction, ...args) {
    const startTime = performance.now();
    const result = analysisFunction(...args);
    const endTime = performance.now();
    const analysisTime = endTime - startTime;
    
    // Update performance indicator
    const perfIndicator = document.querySelector('.performance-indicator') || 
                         createPerformanceIndicator();
    perfIndicator.textContent = `Analysis completed in ${analysisTime.toFixed(1)}ms`;
    
    return result;
}

function createPerformanceIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'performance-indicator';
    document.querySelector('.stats-panel').appendChild(indicator);
    return indicator;
}

// Safe plugin execution
function safePluginExecution(plugin, text) {
    try {
        const startTime = performance.now();
        const result = plugin(text);
        const endTime = performance.now();
        
        // TODO for beginners: Add performance monitoring for individual plugins
        // console.log(`Plugin ${plugin.name} took ${endTime - startTime}ms`);
        
        return result;
    } catch (error) {
        console.error('Plugin execution error:', error);
        return {
            label: "Plugin Error",
            value: "Analysis failed"
        };
    }
}

// TODO for beginners: Add a plugin to count exclamation marks
// TODO for beginners: Create a plugin to find the longest word
// TODO for beginners: Add a feature to highlight repeated words
// TODO for beginners: Create a simple spell-check feature
// TODO for beginners: Add a plugin to count paragraphs
// TODO for beginners: Create a plugin to detect ALL CAPS words
// TODO for beginners: Add a feature to find the most common words

// LEARNING: This is an example of the debounce pattern
// Debouncing prevents functions from being called too frequently
// It's commonly used for search inputs, resize events, and scroll events



function updateReadabilityProgress(basicStats) {
    // Example simple calculation (you can improve later)
    // Using wordCount and longSentenceCount as placeholders for demo

    const fleschScore = Math.min(100, Math.round(100 - basicStats.longSentenceCount * 2));
    const fleschKincaidScore = Math.min(100, Math.round((basicStats.hardWordCount / basicStats.wordCount) * 100));
    const gunningFogScore = Math.min(100, Math.round((basicStats.longSentenceCount + basicStats.hardWordCount) / basicStats.wordCount * 100));

    // Update DOM elements and progress bars
    const metrics = [
        { id: 'fleschScore', value: fleschScore },
        { id: 'fleschKincaidScore', value: fleschKincaidScore },
        { id: 'gunningFogScore', value: gunningFogScore }
    ];

    metrics.forEach(metric => {
        const textEl = document.getElementById(metric.id);
        const fillEl = textEl.closest('.progress-container').querySelector('.progress-fill');

        textEl.textContent = `${metric.value}%`;
        fillEl.style.width = `${metric.value}%`;

        // Optional: change color based on value
        if (metric.value >= 75) {
            fillEl.style.background = 'var(--success-color)';
        } else if (metric.value >= 50) {
            fillEl.style.background = 'var(--warning-color)';
        } else {
            fillEl.style.background = 'var(--danger-color)';
        }
    });
}




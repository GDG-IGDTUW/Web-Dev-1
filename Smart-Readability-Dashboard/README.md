# 📊 Smart Readability Dashboard

A beginner-friendly open-source web project that analyzes text readability using only HTML, CSS, and Vanilla JavaScript. Perfect for first-year students to understand and contribute to!


1. **Download the project**
   ```bash
   git clone <your-repo-url>
   # OR download as ZIP and extract
   ```

2. **Open in browser**
   ```bash
   # Simply double-click index.html
   # OR open with any web browser
   open index.html
   ```

3. **Start analyzing text!**
   - Paste or type text in the left panel
   - Watch real-time analysis in the right panel
   - See highlighted difficult sections below

## 📚 How It Works

This project uses simple web technologies that every web developer should know:

- **HTML** (`index.html`) - Structure of the page and content
- **CSS** (`css/style.css`) - Styling, layout, and visual design
- **JavaScript** (`js/main.js`) - Interactive functionality and text analysis
- **Plugins** (`js/plugins/`) - Modular analysis features

### Tech Stack
- ✅ Pure HTML5, CSS3, Vanilla JavaScript
- ✅ No frameworks, no build tools, no backend
- ✅ Compromise.js (via CDN) for basic NLP
- ✅ Works by opening `index.html` in any browser

## 🎯 Features

### Text Analysis
- 📝 **Word & Sentence Count** - Basic text statistics
- ⏱️ **Reading Time** - Estimated based on 200 words/minute
- 🔍 **Readability Level** - Easy/Medium/Hard classification
- 📏 **Long Sentences** - Identifies sentences with >20 words
- 🔤 **Hard Words** - Highlights words with >8 characters
- 🧠 **NLP Analysis** - Counts nouns and verbs using Compromise.js

### Visual Features
- 🎨 **Text Highlighting** - Visual feedback for difficult content
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚡ **Real-time Analysis** - Updates as you type
- 🌟 **Modern UI** - Clean, accessible design

### Plugin System
- 🔧 **Easy to Extend** - Simple plugin architecture
- 👨‍💻 **Beginner-friendly** - No classes or complex imports needed
- 📦 **Modular** - Each feature is a separate plugin

## 🔧 Adding Your First Plugin

Creating a plugin is super easy! Here's how:

### Step 1: Create the Plugin File
Create a new file in `js/plugins/` (e.g., `questionCount.js`):

```javascript
// Question Count Plugin
function questionCountPlugin(text) {
    if (!text || text.trim() === '') {
        return {
            label: "Questions",
            value: 0
        };
    }
    
    // Count question marks in the text
    const questionCount = (text.match(/\?/g) || []).length;
    
    return {
        label: "Questions Found",
        value: questionCount
    };
}
```

### Step 2: Add to HTML
Add the script tag in `index.html`:
```html
<script src="js/plugins/questionCount.js"></script>
```

### Step 3: Register the Plugin
Add to the plugins array in `js/main.js`:
```javascript
const plugins = [
    wordCountPlugin,
    readingTimePlugin,
    longSentencePlugin,
    questionCountPlugin  // Add your new plugin here
];
```

That's it! Your plugin will now appear in the dashboard.

## 🤝 Contributing (Perfect for Beginners!)

This project is designed to be beginner-friendly. Here are easy ways to contribute:

### 🌟 Easy Contributions
- **Add new plugins** - Create simple text analysis functions
- **Improve documentation** - Help others understand the code
- **Fix TODOs** - Look for `// TODO:` comments in the code
- **Test and report bugs** - Use the tool and tell us what breaks
- **Improve styling** - Make the UI even more beautiful

### 💡 Plugin Ideas for Beginners
- Count exclamation marks (`!`)
- Find the longest sentence
- Count capital letters
- Detect repeated words
- Calculate average word length
- Count paragraphs
- Find most common words
- Detect passive voice (simple version)
- Count syllables (basic approximation)

### 📝 Coding Standards
- Write simple, readable code
- Add comments explaining what your code does
- Test your changes in multiple browsers
- Follow the existing file structure
- Use meaningful variable names

### 🔍 Finding TODOs
Look for comments like these throughout the code:
```javascript
// TODO for beginners: Add a plugin to count question marks
// TODO for beginners: Create a plugin to find the longest word
// TODO for beginners: Add a feature to highlight repeated words
```

## 📁 Project Structure

```
smart-readability-dashboard/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styling
├── js/
│   ├── main.js            # Core application logic
│   └── plugins/
│       ├── wordCount.js   # Word counting plugin
│       ├── readingTime.js # Reading time estimation
│       └── longSentence.js # Long sentence detection
└── README.md              # This file
```

## 🎓 Learning Opportunities

This project is perfect for learning:

### For HTML Beginners
- Semantic HTML structure
- Form inputs and buttons
- Accessibility attributes
- Meta tags and head section

### For CSS Beginners
- Flexbox layouts
- CSS Grid for components
- Responsive design
- CSS custom properties (variables)
- Animations and transitions

### For JavaScript Beginners
- DOM manipulation
- Event listeners
- Array methods (map, filter, forEach)
- String manipulation
- Function composition
- Modular code organization

### For Open Source Beginners
- Git workflow
- Issue tracking
- Pull requests
- Code reviews
- Documentation

## 🛠️ Advanced Features (For Later)

Once you're comfortable with the basics, try adding:
- Dark mode toggle
- Export analysis results
- Save/load text
- Keyboard shortcuts
- More sophisticated NLP
- Chart visualizations
- Text comparison tool

## 🐛 Troubleshooting

### Common Issues
1. **Compromise.js not loading**: Check your internet connection (CDN dependency)
2. **Plugins not working**: Ensure script tags are in the correct order
3. **Styling issues**: Clear browser cache and refresh

### Browser Support
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ❌ Internet Explorer (not supported)

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Compromise.js** for natural language processing
- **Web development community** for inspiration
- **All contributors** who help improve this project

## 🎯 Goals

This project aims to:
- Provide a real-world example of vanilla web development
- Create an easy entry point for open source contributions
- Demonstrate clean, readable code practices
- Build something genuinely useful while learning

---

**Ready to contribute?** Start by exploring the code, running the project, and looking for `TODO` comments. Every contribution, no matter how small, is valuable! 🚀
# Smart-Readability-Dashboard

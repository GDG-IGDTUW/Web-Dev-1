# 🤝 Contributing to TaskFlow

Thank you for your interest in contributing to TaskFlow! This document provides guidelines and instructions for contributing to this project as part of GDG IGDTUW SnowScript Winter of Code 2026.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Issue Guidelines](#issue-guidelines)

## 📜 Code of Conduct

### Our Standards

- ✅ Be respectful and inclusive to all contributors
- ✅ Accept constructive criticism gracefully
- ✅ Focus on what's best for the community
- ✅ Show empathy towards other community members
- ❌ No harassment, trolling, or insulting comments
- ❌ No spam or off-topic discussions

## 🚀 Getting Started

### Prerequisites

- Git installed on your local machine
- A GitHub account
- Basic knowledge of HTML, CSS, and JavaScript
- A code editor (VS Code recommended)

### Setting Up Your Development Environment

1. **Fork the Repository**
   - Visit the [TaskFlow repository](https://github.com/YOUR-USERNAME/taskflow)
   - Click the "Fork" button in the top-right corner

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/taskflow.git
   cd taskflow
   ```

3. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/taskflow.git
   ```

4. **Verify Remotes**
   ```bash
   git remote -v
   ```

## 🎯 How to Contribute

### 1. Choose an Issue

- Browse the [Issues](../../issues) page
- Look for issues tagged with:
  - `good-first-issue` - Perfect for beginners
  - `help-wanted` - We need your help!
  - `enhancement` - New features
  - `bug` - Bug fixes
  - `ui/ux` - Design improvements

### 2. Claim the Issue

- Comment on the issue: "I would like to work on this issue"
- Wait for the maintainer to assign it to you
- **Do not** start working before being assigned

### 3. Create a Branch

```bash
# Update your fork
git checkout main
git pull upstream main

# Create a new branch
git checkout -b issue-number-short-description
# Example: git checkout -b 5-add-dark-mode
```

### 4. Make Your Changes

- Write clean, readable code
- Follow the coding standards (see below)
- Test your changes thoroughly
- Ensure no console errors

### 5. Commit Your Changes

```bash
git add .
git commit -m "Type: Brief description of changes"
```

See [Commit Message Guidelines](#commit-message-guidelines) below.

### 6. Push to Your Fork

```bash
git push origin your-branch-name
```

### 7. Create a Pull Request

- Go to your fork on GitHub
- Click "Compare & pull request"
- Fill out the PR template completely
- Add screenshots for UI changes
- Link the issue: "Closes #issue-number"

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code follows the project's coding standards
- [ ] All files are properly formatted
- [ ] No console errors or warnings
- [ ] Changes tested in multiple browsers (if applicable)
- [ ] Screenshots added for UI changes
- [ ] PR description clearly explains the changes

### PR Template

```markdown
## Description
Brief description of what this PR does

## Related Issue
Closes #issue-number

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] UI/UX improvement
- [ ] Documentation update

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] My code follows the project's coding standards
- [ ] I have tested my changes
- [ ] I have added necessary comments to my code
- [ ] My changes generate no new warnings
```

### Review Process

1. A maintainer will review your PR within 24-48 hours
2. They may request changes or ask questions
3. Make requested changes and push to the same branch
4. Once approved, your PR will be merged! 🎉

## 💻 Coding Standards

### HTML

```html
<!-- Use semantic HTML -->
<nav class="navbar">
  <h1>TaskFlow</h1>
</nav>

<!-- Use proper indentation (2 spaces) -->
<div class="container">
  <div class="content">
    <p>Text here</p>
  </div>
</div>

<!-- Use meaningful class names -->
<button class="add-task-btn">Add Task</button>
```

### CSS

```css
/* Use clear class names */
.task-item {
  display: flex;
  padding: 1rem;
}

/* Group related properties */
.button {
  /* Display & Box Model */
  display: inline-block;
  padding: 0.5rem 1rem;
  
  /* Typography */
  font-size: 1rem;
  
  /* Visual */
  background-color: #3b82f6;
  color: white;
  
  /* Misc */
  cursor: pointer;
}

/* Use comments for sections */
/* ===== Task List Styles ===== */
```

### JavaScript

```javascript
// Use camelCase for variables and functions
const taskInput = document.getElementById('taskInput');

// Use clear, descriptive names
function addNewTask() {
  // Function code here
}

// Add comments for complex logic
// Filter tasks based on completion status
function getFilteredTasks() {
  // Code here
}

// Use const and let instead of var
const tasks = [];
let currentFilter = 'all';
```

## 📝 Commit Message Guidelines

### Format

```
Type: Brief description

Detailed explanation (if needed)
```

### Types

- `Add:` Adding new feature or content
- `Fix:` Bug fixes
- `Update:` Updating existing feature
- `Style:` CSS/UI changes
- `Refactor:` Code restructuring
- `Docs:` Documentation changes
- `Remove:` Removing code/files

### Examples

```bash
# Good ✅
git commit -m "Add: Dark mode toggle functionality"
git commit -m "Fix: Task deletion not working properly"
git commit -m "Style: Improve navbar design with shadows"

# Bad ❌
git commit -m "changes"
git commit -m "fixed stuff"
git commit -m "update"
```

## 🐛 Issue Guidelines

### Creating an Issue

If you find a bug or have a feature request:

1. Search existing issues first
2. Use the issue template
3. Provide clear description
4. Add screenshots if applicable
5. Tag with appropriate labels

### Issue Template

```markdown
## Description
Clear description of the issue

## Steps to Reproduce (for bugs)
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Screenshots
Add screenshots here

## Environment
- Browser: Chrome 120
- OS: Windows 11
```

## 🎨 Design Guidelines

- Follow the existing color scheme
- Use consistent spacing and margins
- Ensure accessibility (WCAG 2.1 AA)
- Test on different screen sizes
- Use modern CSS features (Flexbox, Grid)

## ✅ Quality Checklist

Before submitting your PR, ensure:

- [ ] Code is properly formatted
- [ ] No console errors
- [ ] Works in Chrome, Firefox, and Safari
- [ ] Responsive on mobile devices
- [ ] Accessible (keyboard navigation, screen readers)
- [ ] Comments added for complex code
- [ ] No unnecessary code or files
- [ ] Follows project structure

## 🏆 Recognition

All contributors will be:
- Listed in the README
- Mentioned in release notes
- Eligible for SnowScript prizes
- Given proper credit for their work

## ❓ Getting Help

Stuck? Need help? Here's what you can do:

1. **Read the Documentation**: Check README.md first
2. **Ask in Issues**: Comment on your assigned issue
3. **Join Discord**: Get real-time help from the community
4. **Tag Maintainers**: @mention maintainers in your issue/PR

## 📞 Contact Maintainers

- **Primary Maintainer**: @manyakalra05
- **Email**: kalramanya212@gmail.com

## 🙏 Thank You!

Thank you for contributing to TaskFlow! Your efforts help make this project better for everyone. Happy coding! 🚀

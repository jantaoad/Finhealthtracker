# Contributing to FinHealthTracker

**Thank you for your interest in contributing!**

---

## 🎯 How to Contribute

### 1. Fork & Clone
```bash
# Fork on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/finhealthtracker.git
cd finhealthtracker
```

### 2. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Make Changes

#### Frontend Changes
```bash
cd frontend
npm install          # Install deps
npm run dev         # Start dev server
# Make your changes
# Test locally
```

#### Backend Changes
```bash
cd backend
npm install          # Install deps
npm run dev         # Start dev server with nodemon
# Make your changes
# Test locally
```

### 4. Commit with Proper Message
```bash
# Format: <type>(<scope>): <description>

# Examples:
git commit -m "feat(frontend): add transaction history page"
git commit -m "fix(backend): fix JWT token validation"
git commit -m "docs: update setup guide"
git commit -m "style(frontend): format code with prettier"
git commit -m "test(backend): add auth tests"
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code formatting
- `test`: Adding tests
- `refactor`: Code refactoring
- `perf`: Performance improvement

### 5. Push & Create Pull Request
```bash
git push origin feature/your-feature-name
# Go to GitHub and create PR
```

---

## 📋 Pull Request Checklist

Before submitting:

- [ ] Code follows project style
- [ ] Tests are added/updated
- [ ] Documentation is updated
- [ ] No console errors/warnings
- [ ] Commit messages are clear
- [ ] .env files are NOT committed

---

## 🧪 Testing

### Frontend
```bash
cd frontend
npm run test
npm run lint
```

### Backend
```bash
cd backend
npm run test
npm run lint
```

---

## 📖 Code Style

- Use ESLint (auto-formatting)
- Follow existing patterns
- Write clear variable names
- Add comments for complex logic
- Keep functions small & focused

---

## 🐛 Reporting Bugs

1. Check existing issues first
2. Create detailed bug report
3. Include:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots/logs
   - Environment info

---

## 💡 Feature Requests

1. Describe the feature clearly
2. Explain the use case
3. Provide examples
4. Link related issues

---

## 📞 Questions?

- Check documentation
- Search existing issues
- Ask in discussions
- Email: dev@finhealthtracker.com

---

**Thank you for contributing! 🙏**

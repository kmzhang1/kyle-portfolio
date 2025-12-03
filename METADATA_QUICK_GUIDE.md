# Quick Guide: Dynamic Project Metadata

## TL;DR

You can now add **any custom fields** to each project! Just use the `metadata` object in [lib/projectsData.js](lib/projectsData.js).

## How It Works

```javascript
{
  id: "my-project",
  slug: "my-project",
  title: "My Project",
  // ... other fields ...

  // 🎨 Customize these fields however you want!
  metadata: {
    "Any Field Name": ["value1", "value2"],
    "Another Field": "single value",
    "Whatever You Want": ["as", "many", "items", "as", "needed"],
  }
}
```

## Real Examples

### Example 1: Data Viz Project
```javascript
metadata: {
  "Languages": ["JavaScript"],
  "Frameworks": ["React 18", "Vite", "Tailwind CSS"],
  "Data Visualization Libraries": ["D3.js", "Chart.js"],
}
```
**Displays as:**
```
LANGUAGES
JavaScript

FRAMEWORKS
React 18, Vite, Tailwind CSS

DATA VISUALIZATION LIBRARIES
D3.js, Chart.js
```

---

### Example 2: Research Project
```javascript
metadata: {
  "Languages": ["Python"],
  "ML Frameworks": ["PyTorch", "scikit-learn"],
  "Tools": ["Ghidra", "LLVM"],
  "Application Domain": "Reverse Engineering & Code Analysis",
}
```

---

### Example 3: Full-Stack Project
```javascript
metadata: {
  "Frontend": ["React.js"],
  "Backend": ["Express.js", "Node.js"],
  "Database": ["MongoDB"],
  "Architecture": "REST API",
  "Hosting": "AWS",
}
```

## Key Features

✅ **Completely flexible** - use any field names you want
✅ **Array or string values** - `["item1", "item2"]` or `"single value"`
✅ **Auto-formatting** - field names display in UPPERCASE
✅ **Smart layout** - long fields (like "Libraries") span full width automatically
✅ **Per-project** - each project can have totally different fields!

## What Gets Displayed

- Field names become section headers (in UPPERCASE)
- Array values display as comma-separated lists
- Single string values display as-is
- Fields with "libraries" or "tools" in the name span full width
- Arrays with 5+ items also span full width

## Try It Now!

1. Open [lib/projectsData.js](lib/projectsData.js)
2. Find any project
3. Edit the `metadata` object
4. Save - see changes instantly at [http://localhost:3000/projects](http://localhost:3000/projects)

## Examples You Can Copy

```javascript
// Minimal
metadata: {
  "Stack": ["Next.js", "TypeScript", "Tailwind"],
}

// Detailed
metadata: {
  "Frontend": ["Next.js 14", "TypeScript", "Tailwind CSS"],
  "Backend": ["Node.js", "Express", "PostgreSQL"],
  "Cloud Services": ["AWS S3", "CloudFront", "Lambda"],
  "Testing": ["Jest", "Cypress", "Testing Library"],
  "CI/CD": "GitHub Actions",
  "Team": "4 developers",
  "Duration": "6 months",
}

// Research-focused
metadata: {
  "Programming Languages": ["Python", "C++"],
  "ML Libraries": ["PyTorch", "TensorFlow", "Hugging Face"],
  "Dataset": "ImageNet-1K",
  "Paper": "Published in CVPR 2024",
  "Metrics": "95.2% accuracy",
}

// Mobile app
metadata: {
  "Platform": ["iOS", "Android"],
  "Framework": "React Native",
  "Backend": ["Firebase", "Node.js"],
  "Features": ["Push Notifications", "Offline Mode", "Real-time Sync"],
  "Downloads": "10,000+",
}
```

## Need Help?

See [PROJECT_SETUP.md](PROJECT_SETUP.md) for complete documentation!

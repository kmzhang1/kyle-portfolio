# Projects Setup Guide

Your portfolio now features a beautiful projects showcase with two main pages:

1. **Projects Overview** ([/projects](http://localhost:3000/projects)) - Grid layout showing all projects
2. **Project Details** (/projects/[slug]) - Individual project pages with full details

## How to Add or Edit Projects

All project data is managed in a single file: [lib/projectsData.js](lib/projectsData.js)

### Project Data Structure

Each project object supports the following fields:

```javascript
{
  // Required fields
  id: "unique-project-id",           // Unique identifier
  slug: "project-url-slug",          // URL-friendly slug (e.g., "landfill-lens")
  title: "Project Title",            // Display name
  category: "CATEGORY NAME",         // e.g., "DATA VISUALIZATION", "FULLSTACK", "DEEP LEARNING"
  shortDescription: "Brief description for card view",
  description: "Full description for detail page",
  image: "/assets/work/project.png", // Path to thumbnail image

  // Dynamic metadata object - CUSTOMIZE FOR EACH PROJECT!
  metadata: {
    "Field Name 1": ["value1", "value2"],  // Arrays for multiple items
    "Field Name 2": "single value",        // Or single string values
    "Custom Field": ["any", "values", "you", "want"],
  },

  // Optional fields
  features: [                              // List of key features
    "Feature 1 description",
    "Feature 2 description"
  ],
  video: "/assets/work/demo.mp4",   // Path to demo video (leave empty "" if none)
  liveUrl: "https://example.com",   // Live demo URL (leave empty "" if none)
  githubUrl: "https://github.com/user/repo", // GitHub URL (leave empty "" if none)
}
```

### Dynamic Metadata - The Key Feature!

The `metadata` object is **completely customizable** for each project. You can use any field names you want, and each field can contain either:
- **An array of strings**: `["Item 1", "Item 2", "Item 3"]`
- **A single string**: `"Single value"`

**The field names will be displayed as section headers on the project detail page**, automatically formatted in uppercase.

### Metadata Examples from Your Projects

Here are real examples showing different ways to structure metadata:

#### Data Visualization Project
```javascript
metadata: {
  "Languages": ["JavaScript"],
  "Frameworks": ["React 18", "Vite", "Tailwind CSS"],
  "Data Visualization Libraries": ["D3.js", "Chart.js", "Visx (Airbnb)", "Observable HQ"],
}
```

#### Deep Learning Project
```javascript
metadata: {
  "Languages": ["Python"],
  "Deep Learning": ["PyTorch", "MNE"],
  "Scientific Libraries": ["NumPy", "SciPy", "Matplotlib"],
  "Research Area": "Neuroscience & Music Cognition",  // Single string value
}
```

#### Full-Stack Project
```javascript
metadata: {
  "Frontend": ["React.js"],
  "Backend": ["Express.js", "Node.js"],
  "Database": ["MongoDB"],
  "Real-time": ["Socket.io"],
  "Architecture": "REST API",  // Single string value
}
```

#### Hybrid ML + Web Project
```javascript
metadata: {
  "Frontend": ["Next.js", "Tailwind CSS", "JavaScript"],
  "Backend": ["Python", "FastAPI"],
  "ML/AI": ["TensorFlow.js"],
  "State Management": ["React Query"],
  "Platform": "Desktop & Mobile",
}
```

### Adding a New Project

1. Open [lib/projectsData.js](lib/projectsData.js)
2. Add a new object to the `projectsData` array:

```javascript
export const projectsData = [
  // ... existing projects
  {
    id: "my-new-project",
    slug: "my-new-project",
    title: "My Awesome Project",
    category: "WEB DEVELOPMENT",
    shortDescription: "A revolutionary app that changes everything",
    description: "This is a comprehensive description of my project. It explains what the project does, the problems it solves, and the technologies I used to build it.",
    features: [
      "Real-time data synchronization across devices",
      "AI-powered recommendations",
      "Beautiful, responsive UI design",
    ],
    // Customize these field names and values however you want!
    metadata: {
      "Tech Stack": ["TypeScript", "Python"],
      "Frontend Framework": ["Next.js 14"],
      "Backend": ["FastAPI"],
      "Database": ["Prisma", "PostgreSQL"],
      "AI/ML": ["TensorFlow"],
      "Hosting": "AWS",
      "Team Size": "Solo Project",  // Any field name works!
    },
    video: "/assets/work/my-project-demo.mp4",
    image: "/assets/work/my-project.png",
    liveUrl: "https://myproject.com",
    githubUrl: "https://github.com/myusername/my-project",
  },
];
```

3. Save the file - changes will appear automatically!

## Adding Videos

To add a video demo:

1. Place your video file in `/public/assets/work/` (e.g., `demo.mp4`)
2. In your project metadata, set: `video: "/assets/work/demo.mp4"`
3. The video will automatically appear on the project detail page with controls

**Supported formats**: MP4, WebM

## Adding Images

1. Place images in `/public/assets/work/` (e.g., `thumbnail.png`)
2. Reference them as: `image: "/assets/work/thumbnail.png"`
3. Images are used as thumbnails in the grid and as fallback poster images for videos

**Recommended sizes**:
- Thumbnail: 1200x800px (3:2 ratio)
- Video poster: Match your video dimensions

## Project URLs

Projects automatically get URLs based on their `slug`:
- `/projects/landfill-lens`
- `/projects/my-new-project`

The slug should be:
- Lowercase
- Hyphen-separated (not spaces or underscores)
- URL-friendly (no special characters)

## Tips

- **Category Badges**: Use UPPERCASE for consistency (e.g., "DATA VISUALIZATION", "FULLSTACK")
- **Short vs Full Description**: Keep `shortDescription` under 150 characters for the card view
- **Features**: List 3-5 key features as bullet points
- **URLs**: If you don't have a live URL or GitHub repo, use empty strings `""`
- **Order**: Projects appear in the order they're listed in the array

## File Structure

```
kyle-portfolio/
├── app/
│   └── projects/
│       ├── page.jsx              # Grid view of all projects
│       └── [slug]/
│           └── page.jsx          # Individual project detail page
├── lib/
│   └── projectsData.js           # Project metadata (EDIT THIS!)
└── public/
    └── assets/
        └── work/                 # Store images and videos here
```

## Customizing Styles

The projects use your existing theme with accent colors (`--color-accent` and `--color-accent-hover`).

To modify:
- Colors: Edit [app/globals.css](app/globals.css)
- Layout: Edit [app/projects/page.jsx](app/projects/page.jsx)
- Detail page: Edit [app/projects/[slug]/page.jsx](app/projects/[slug]/page.jsx)

## Testing Locally

Visit:
- Main projects page: http://localhost:3000/projects
- Individual project: http://localhost:3000/projects/landfill-lens (or any slug)

Changes to `projectsData.js` will hot-reload automatically!

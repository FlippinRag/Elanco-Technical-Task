# Elanco-Technical-Task

A web application for tracking and reporting tick sightings across the United Kingdom.

## 🌐 Live Demo

**[View Live Application](https://elanco-technical-task.vercel.app/)**


## Features

-  **Interactive Map** - View tick sightings across UK cities with severity indicators
-  **Real-time Statistics** - Track sightings by species, location, and date range  
-  **Education Center** - Learn about tick species, prevention tips, and removal techniques
-  **Report Sightings** - Submit tick sightings with location, species, and photo upload
-  **Dark Mode** - Toggle between light and dark themes
-  **Accessibility** - Adjustable font sizes and WCAG compliant design

## Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **Mapping:** Leaflet + React Leaflet
- **Database:** Firebase Firestore
- **Storage:** Firebase Storage (for images)
- **Hosting:** Vercel
- **Data Parsing:** PapaParser (CSV)

## Local Development (Optional)

If you want to run this locally:

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Quick Start

```bash
# Clone the repository
git clone https://github.com/FlippinRag/Elanco-Technical-Task.git

cd Elanco-Technical-Task/frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173)

**Note:** The live deployment uses a pre-configured Firebase database. Local development will connect to the same database.

## Project Structure

```
frontend/
├── public/
│   ├── Tick Sightings.csv      
│   └── bug.svg                 
├── src/
│   ├── assets/                 
│   ├── pages/
│   │   ├── Home.jsx           
│   │   ├── InteractiveMap.jsx 
│   │   ├── EducationCenter.jsx 
│   │   └── ReportSighting.jsx 
│   ├── firebase.js            
│   ├── App.jsx                
│   ├── main.jsx              
│   └── index.css             
├── .env.example              
├── .gitignore
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Features Walkthrough

### 1. Interactive Map
- **Filter by:** Species, location, date range, severity level
- **Visual indicators:** Color-coded severity (high/medium/low risk)
- **Recent activity:** Yellow borders indicate sightings in last 90 days
- **Detailed popups:** Click markers to see species breakdown

### 2. Education Center
- **Species identification:** 5 common UK tick species with images
- **Prevention tips:** Organized by category (outdoor, repellents, pets)
- **Removal guide:** Step-by-step safe tick removal instructions
- **External resources:** Links to NHS and UK Government websites

### 3. Report Sighting
- **Simple form:** Date, time, location, species selection
- **Photo upload:** Drag-and-drop or click to upload tick images
- **Real-time validation:** Instant feedback on form errors
- **Cloud storage:** Images stored securely in Firebase Storage
- **Confirmation:** Success message with option to view on map

### 4. Accessibility Features
- **Dark mode:** Toggle for reduced eye strain
- **Font sizing:** Three size options (small/medium/large)
- **Keyboard navigation:** Full keyboard support
- **Screen reader friendly:** Proper ARIA labels and semantic HTML
- **Mobile responsive:** Works on all screen sizes

## Data & Privacy

- Sighting data is stored in Firebase Firestore
- Images are stored in Firebase Storage
- No personal information is collected
- All data is publicly accessible (no authentication required)


## Author

Anurag Sedai

sedaianurag06@gmail.com

[My Github](https://github.com/FlippinRag)


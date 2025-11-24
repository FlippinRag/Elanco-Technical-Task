import { useEffect, useState } from "react"
import "./index.css"
import bug from "../src/assets/ladybug.png"
import Home from './pages/home.jsx'
import InteractiveMap from "./pages/InteractiveMap"
import EducationCenter from "./pages/EducationCenter.jsx"
import ReportSighting from "./pages/ReportSighting.jsx"



function App() {
  const [activeTab, setActiveTab] = useState("home")
  const [darkMode, setDarkMode] = useState(false)
  const [fontSize, setFontSize] = useState("medium")


  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode")
    if (savedMode !== null) {
      setDarkMode(savedMode === "true")
    }

    const savedFontSize = localStorage.getItem("fontSize")
    if (savedFontSize !== null) {
      setFontSize(savedFontSize)
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode
      localStorage.setItem('darkMode', newMode.toString())
      return newMode
    })
  }

  const changeFontSize = (size) => {
    setFontSize(size)
    localStorage.setItem('fontSize', size)
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('text-sm', 'text-base', 'text-lg')

    if (fontSize === 'small') {
      root.classList.add('text-sm')
    } else if (fontSize === 'large') {
      root.classList.add('text-lg')
    } else {
      root.classList.add('text-base')
    }
  }, [fontSize])


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden md:flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <img src={bug} alt="Ladybug Icon" width={50} className="drop-shadow-lg" />
                <h1 className="text-3xl font-bold">UK Tick Sighting Tracker</h1>
              </div>
              <p className="text-green-50 text-lg">
                Monitor and report tick activity across the United Kingdom
              </p>
            </div>

            <div className="flex gap-3 items-center">
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => changeFontSize('small')}
                  className={`px-3 py-2 rounded text-xs font-medium transition-all duration-10 ${fontSize === 'small'
                    ? 'bg-white text-green-600 shadow-md'
                    : 'text-white hover:text-green-100'
                    }`}
                  aria-label="Small font size"
                  title="Small font"
                >
                  A
                </button>
                <button
                  onClick={() => changeFontSize('medium')}
                  className={`px-3 py-2 rounded text-sm font-medium transition-all duration-10 ${fontSize === 'medium'
                    ? 'bg-white text-green-600 shadow-md'
                    : 'text-white hover:text-green-100'
                    }`}
                  aria-label="Medium font size"
                  title="Medium font"
                >
                  A
                </button>
                <button
                  onClick={() => changeFontSize('large')}
                  className={`px-3 py-2 rounded text-base font-medium transition-all duration-10 ${fontSize === 'large'
                    ? 'bg-white text-green-600 shadow-md'
                    : 'text-white hover:text-green-100'
                    }`}
                  aria-label="Large font size"
                  title="Large font"
                >
                  A
                </button>
              </div>

              <button
                onClick={toggleDarkMode}
                className="p-3 rounded-lg bg-white/20 hover:bg-white/30 transition-colors duration-200"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? "☀️" : "🌙"}
              </button>

              <button
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200 shadow-md"
                onClick={() => setActiveTab("report")}
              >
                Report Sighting
              </button>
            </div>
          </div>
          {/* Hidden for mobile */}
          <div className="md:hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <img src={bug} alt="Ladybug Icon" width={40} className="drop-shadow-lg" />
                <h1 className="text-xl font-bold">UK Tick Tracker</h1>
              </div>
              <div className="flex gap-2">
                <div className="flex gap-1 items-center">
                  <button
                    onClick={() => changeFontSize('small')}
                    className={`px-2 py-1 rounded text-xs font-medium transition-all ${fontSize === 'small'
                        ? 'bg-white text-green-600'
                        : 'text-white/80 hover:text-white'
                      }`}
                    aria-label="Small font size"
                  >
                    A
                  </button>
                  <button
                    onClick={() => changeFontSize('medium')}
                    className={`px-2 py-1 rounded text-sm font-medium transition-all ${fontSize === 'medium'
                        ? 'bg-white text-green-600'
                        : 'text-white/80 hover:text-white'
                      }`}
                    aria-label="Medium font size"
                  >
                    A
                  </button>
                  <button
                    onClick={() => changeFontSize('large')}
                    className={`px-2 py-1 rounded text-base font-medium transition-all ${fontSize === 'large'
                        ? 'bg-white text-green-600'
                        : 'text-white/80 hover:text-white'
                      }`}
                    aria-label="Large font size"
                  >
                    A
                  </button>
                </div>

                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {darkMode ? "☀️" : "🌙"}
                </button>
              </div>
            </div>

            <button
              className="w-full bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors shadow-md"
              onClick={() => setActiveTab("report")}
            >
              Report Sighting
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex gap-2 p-4 overflow-x-auto">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${activeTab === "home"
              ? "bg-green-600 text-white shadow-md"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            onClick={() => setActiveTab("home")}
          >
            Home
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${activeTab === "map"
              ? "bg-green-600 text-white shadow-md"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            onClick={() => setActiveTab("map")}
          >
            Map
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${activeTab === 'education'
              ? "bg-green-600 text-white shadow-md"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            onClick={() => setActiveTab('education')}
          >
            Education
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${activeTab === 'report'
              ? "bg-green-600 text-white shadow-md"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            onClick={() => setActiveTab('report')}
          >
            Report
          </button>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {activeTab === 'home' && <Home setActiveTab={setActiveTab} />}
        {activeTab === 'map' && <InteractiveMap />}
        {activeTab === 'education' && <EducationCenter />}
        {activeTab === 'report' && <ReportSighting />}
      </main>

      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto text-center px-6">
          <p className="font-semibold mb-1">© 2025 UK Tick Tracking Initiative</p>
          <p className="text-gray-400">Protecting Communities from Tick-Borne Diseases</p>
        </div>
      </footer>
    </div>
  )
}

export default App

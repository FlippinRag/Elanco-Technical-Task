import { useEffect, useState } from "react"
import "./index.css"
import bug from "../src/assets/Ladybug.png"

function App() {
  const [activeTab, setActiveTab] = useState("home")


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <img src={bug} alt="Ladybug Icon" width={50} className="drop-shadow-lg" />
              <h1 className="text-3xl font-bold">UK Tick Sighting Tracker</h1>
            </div>
            <p className="text-green-50 text-lg">
              Monitor and report tick activity across the United Kingdom
            </p>
          </div>

          <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200 shadow-md">
            Report a Sighting
          </button>
        </div>
      </header>

      <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex gap-2 p-4">
          <button
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${activeTab === "home"
              ? "bg-green-600 text-white shadow-md"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            onClick={() => setActiveTab("home")}
          >
            Home
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${activeTab === "map"
              ? "bg-green-600 text-white shadow-md"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            onClick={() => setActiveTab("map")}
          >
            Interactive Map
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${activeTab === 'education'
              ? "bg-green-600 text-white shadow-md"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            onClick={() => setActiveTab('education')}
          >
            Education Center
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${activeTab === 'report'
              ? "bg-green-600 text-white shadow-md"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            onClick={() => setActiveTab('report')}
          >
            Report Sighting
          </button>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {activeTab === 'home' && (
          <>
            {/*Hero*/}

            <section className="text-center py-12 px-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg mb-8">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Protecting Communities from Tick-Borne Diseases
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
                Join thousands of UK citizens in tracking and reporting tick sightings.
                Your contribution helps researchers and health officials monitor tick
                populations and prevent disease outbreaks.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-md"
                  onClick={() => setActiveTab('map')}
                >
                  View Sightings Map
                </button>
                <button
                  className="bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200"
                  onClick={() => setActiveTab('report')}
                >
                  Report a Sighting
                </button>
              </div>
            </section>

            {/*Statistics*/}

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="text-4xl mb-3">📊</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">Loading...</h3>
                  <p className="text-gray-600 dark:text-gray-400">Total Sightings</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="text-4xl mb-3">🕐</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">Loading...</h3>
                  <p className="text-gray-600 dark:text-gray-400">Last 30 Days</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="text-4xl mb-3">📍</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">Loading...</h3>
                  <p className="text-gray-600 dark:text-gray-400">Active Locations</p>
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="text-4xl mb-3">⚠️</div>
                <div>
                  <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">Loading...</h3>
                  <p className="text-red-600 dark:text-red-400">High Risk Areas</p>
                </div>
              </div>
            </section>

            {/* Map Placeholder 
            TODO: implement map*/}

            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-12 text-center mb-8 border-2 border-dashed border-blue-300 dark:border-blue-800">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Interactive Tick Sighting Map
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Map visualization will be implemented here
                </p>
                <div className="text-6xl">🗺️</div>
              </div>
            </section>

            {/*Info Grid*/}

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  Why Track Ticks?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Ticks can carry diseases like Lyme disease. Tracking their locations
                  helps public health officials identify high-risk areas and take preventive measures.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  How It Works
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Report tick sightings with location data. View the interactive map to
                  see patterns. Learn about different tick species and prevention methods.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  Community Driven
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Every sighting you report contributes to a national database that helps
                  understand tick distribution and seasonal patterns.
                </p>
              </div>
            </section>
          </>
        )}

        {activeTab === 'map' && (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Interactive Map</h2>
            <p className="text-gray-600 dark:text-gray-400">Map feature will be implemented in a future branch</p>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Education Center</h2>
            <p className="text-gray-600 dark:text-gray-400">Education content will be implemented in a future branch</p>
          </div>
        )}

        {activeTab === 'report' && (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Report a Sighting</h2>
            <p className="text-gray-600 dark:text-gray-400">Report form will be implemented in a future branch</p>
          </div>
        )}
      </main>

      {/*Footer*/}

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

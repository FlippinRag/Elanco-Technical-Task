function Home({ setActiveTab }) {
    return (
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
        </>
    )
}

export default Home
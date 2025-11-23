import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, useMap, Popup } from 'react-leaflet'
import L from 'leaflet'
import Papa from 'papaparse'
import 'leaflet/dist/leaflet.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const cityCoordinates = {
  'London': [51.5074, -0.1278],
  'Manchester': [53.4808, -2.2426],
  'Birmingham': [52.4862, -1.8904],
  'Glasgow': [55.8642, -4.2518],
  'Liverpool': [53.4084, -2.9916],
  'Newcastle': [54.9783, -1.6178],
  'Leeds': [53.8008, -1.5491],
  'Sheffield': [53.3811, -1.4701],
  'Edinburgh': [55.9533, -3.1883],
  'Bristol': [51.4545, -2.5879],
  'Cardiff': [51.4816, -3.1791],
  'Leicester': [52.6369, -1.1398],
  'Nottingham': [52.9548, -1.1581],
  'Southampton': [50.9097, -1.4044],
}

const speciesColors = {
  'Marsh tick': '#3B82F6',
  'Southern rodent tick': '#10B981',
  'Passerine tick': '#F59E0B',
  'Tree-hole tick': '#8B5CF6',
  'Fox/badger tick': '#EF4444',
}

const getSeverityLevel = (count) => {
  if (count >= 50) return 'high'
  if (count >= 20) return 'medium'
  return 'low'
}

const getSeverityColor = (severity) => {
  const colors = {
    'high': '#DC2626',
    'medium': '#F59E0B',
    'low': '#10B981',
  }
  return colors[severity] || '#6B7280'
}

const isRecentSighting = (date) => {
  const ninetyDaysAgo = new Date()
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)
  return date >= ninetyDaysAgo
}

function MapBounds({ cityData }) {
  const map = useMap()

  useEffect(() => {
    if (Object.keys(cityData).length > 0) {
      const bounds = Object.values(cityData).map(city => city.coordinates)
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [cityData, map])

  return null
}

function InteractiveMap() {
  const [sightings, setSightings] = useState([])
  const [cityData, setCityData] = useState({})
  const [loading, setLoading] = useState(true)

  const [selectedSpecies, setSelectedSpecies] = useState('all')
  const [dateRange, setDateRange] = useState('all')
  const [selectedCity, setSelectedCity] = useState('all')
  const [severityFilter, setSeverityFilter] = useState('all')

  const [stats, setStats] = useState({
    total: 0,
    bySpecies: {},
    byCity: {},
    bySeverity: { low: 0, medium: 0, high: 0 },
  })

  const groupSightingsByCity = (data) => {
    const grouped = {}

    data.forEach(sighting => {
      if (!grouped[sighting.location]) {
        grouped[sighting.location] = {
          location: sighting.location,
          coordinates: sighting.coordinates,
          sightings: [],
          species: {},
          recentCount: 0,
        }
      }

      grouped[sighting.location].sightings.push(sighting)

      if (!grouped[sighting.location].species[sighting.species]) {
        grouped[sighting.location].species[sighting.species] = []
      }
      grouped[sighting.location].species[sighting.species].push(sighting)

      if (sighting.isRecent) {
        grouped[sighting.location].recentCount++
      }
    })

    Object.values(grouped).forEach(city => {
      city.severity = getSeverityLevel(city.sightings.length)
    })

    setCityData(grouped)
    return grouped
  }

  const calculateStats = (data, groupedData) => {
    const bySpecies = {}
    const byCity = {}
    const bySeverity = { low: 0, medium: 0, high: 0 }

    data.forEach(sighting => {
      bySpecies[sighting.species] = (bySpecies[sighting.species] || 0) + 1
      byCity[sighting.location] = (byCity[sighting.location] || 0) + 1
    })

    Object.values(groupedData).forEach(city => {
      bySeverity[city.severity]++
    })

    setStats({
      total: data.length,
      bySpecies,
      byCity,
      bySeverity,
    })
  }

  useEffect(() => {
    Papa.parse('/Tick Sightings.csv', {
      download: true,
      header: true,
      complete: (results) => {
        const parsedSightings = results.data
          .filter(row => row.id && row.location && cityCoordinates[row.location])
          .map(row => ({
            id: row.id,
            date: new Date(row.date),
            location: row.location,
            species: row.species,
            latinName: row.latinName,
            coordinates: cityCoordinates[row.location],
            isRecent: isRecentSighting(new Date(row.date)),
          }))

        setSightings(parsedSightings)
        const grouped = groupSightingsByCity(parsedSightings)
        calculateStats(parsedSightings, grouped)
        setLoading(false)
      },
      error: (error) => {
        console.error('Error parsing CSV:', error)
        setLoading(false)
      }
    })
  }, [])

  useEffect(() => {
    let filtered = [...sightings]

    if (selectedSpecies !== 'all') {
      filtered = filtered.filter(s => s.species === selectedSpecies)
    }

    if (selectedCity !== 'all') {
      filtered = filtered.filter(s => s.location === selectedCity)
    }

    if (dateRange !== 'all') {
      const now = new Date()
      const cutoffDate = new Date()

      switch (dateRange) {
        case '30days':
          cutoffDate.setDate(now.getDate() - 30)
          break
        case '90days':
          cutoffDate.setDate(now.getDate() - 90)
          break
        case 'year':
          cutoffDate.setFullYear(now.getFullYear() - 1)
          break
      }

      filtered = filtered.filter(s => s.date >= cutoffDate)
    }

    const grouped = groupSightingsByCity(filtered)
    calculateStats(filtered, grouped)
  }, [selectedSpecies, dateRange, selectedCity, severityFilter, sightings])

  const getFilteredCityData = () => {
    if (severityFilter === 'all') return cityData

    return Object.fromEntries(
      Object.entries(cityData).filter(([_, city]) => city.severity === severityFilter)
    )
  }

  const uniqueSpecies = [...new Set(sightings.map(s => s.species))].sort()
  const uniqueCities = [...new Set(sightings.map(s => s.location))].sort()
  const filteredCities = getFilteredCityData()

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading map data...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Interactive Tick Sighting Map
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Explore tick sightings across the UK with severity indicators and filtering
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
          <div className="text-3xl mb-2">📊</div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</h3>
          <p className="text-gray-600 dark:text-gray-400">Total Sightings</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
          <div className="text-3xl mb-2">🦟</div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{uniqueSpecies.length}</h3>
          <p className="text-gray-600 dark:text-gray-400">Species Types</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
          <div className="text-3xl mb-2">📍</div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{Object.keys(cityData).length}</h3>
          <p className="text-gray-600 dark:text-gray-400">Active Cities</p>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 p-4 rounded-xl shadow-md">
          <div className="text-3xl mb-2">⚠️</div>
          <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.bySeverity.high || 0}</h3>
          <p className="text-red-600 dark:text-red-400">High Risk Areas</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Species Type
            </label>
            <select
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Species</option>
              {uniqueSpecies.map(species => (
                <option key={species} value={species}>{species}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Cities</option>
              {uniqueCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="year">Last Year</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Severity Level
            </label>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Levels</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedSpecies('all')
            setSelectedCity('all')
            setDateRange('all')
            setSeverityFilter('all')
          }}
          className="mt-4 px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Species Legend</h3>
          <div className="space-y-2">
            {Object.entries(speciesColors).map(([species, color]) => (
              <div key={species} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-white shadow" style={{ backgroundColor: color }}></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">{species}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Severity Indicators</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500 opacity-70"></div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">High Risk</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">50+ sightings</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500 opacity-70"></div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">Medium Risk</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">20-49 sightings</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500 opacity-70"></div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">Low Risk</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">&lt; 20 sightings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden" style={{ height: '600px' }}>
        <MapContainer
          center={[54.5, -3.5]}
          zoom={6}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapBounds cityData={filteredCities} />

          {Object.values(filteredCities).map((city) => (
            <CircleMarker
              key={city.location}
              center={city.coordinates}
              radius={15 + (city.sightings.length / 5)}
              pathOptions={{
                fillColor: getSeverityColor(city.severity),
                fillOpacity: 0.7,
                color: city.recentCount > 0 ? '#FBBF24' : '#FFFFFF',
                weight: city.recentCount > 0 ? 3 : 2,
              }}
            >
              <Popup maxWidth={350}>
                <div className="p-3">
                  <h3 className="font-bold text-xl mb-3 text-gray-800">{city.location}</h3>

                  <div className="mb-3 p-2 bg-gray-100 rounded">
                    <p className="text-sm">
                      <strong>Total Sightings:</strong> {city.sightings.length}
                    </p>
                    <p className="text-sm">
                      <strong>Severity:</strong>{' '}
                      <span className={`font-bold ${city.severity === 'high' ? 'text-red-600' :
                        city.severity === 'medium' ? 'text-orange-600' :
                          'text-green-600'
                        }`}>
                        {city.severity.toUpperCase()}
                      </span>
                    </p>

                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold text-gray-700">Species Breakdown:</p>
                    {Object.entries(city.species).map(([species, sightingsList]) => (
                      <div key={species} className="flex items-center justify-between gap-2 py-1 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full border border-white shadow"
                            style={{ backgroundColor: speciesColors[species] }}
                          ></div>
                          <span className="text-sm">{species}</span>
                        </div>
                        <span className="font-semibold text-gray-800">{sightingsList.length}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-300">
                    <p className="text-xs text-gray-600 italic">
                      Latest: {new Date(Math.max(...city.sightings.map(s => s.date))).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
        <p className="text-gray-600 dark:text-gray-400">
          Showing <span className="font-bold text-gray-800 dark:text-white">{stats.total}</span> total sightings across{' '}
          <span className="font-bold text-gray-800 dark:text-white">{Object.keys(filteredCities).length}</span> locations
        </p>
      </div>
    </div>
  )
}

export default InteractiveMap
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Tabs from '@radix-ui/react-tabs'
import * as RadioGroup from '@radix-ui/react-radio-group'

function CreateRoute() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [route, setRoute] = useState({
    routeNumber: '',
    source: '',
    destination: '',
    via: ''
  })

  const [languageConfig, setLanguageConfig] = useState([
    {
      language: 'english',
      fontFamily: 'Arial',
      fontSize: '16',
      fontWeight: '400'
    }
  ])

  const [boards] = useState(['front', 'side', 'rear', 'internal'])
  const [fields] = useState(['routeNumber', 'source', 'destination', 'via'])
  const [selectedFields, setSelectedFields] = useState({
    front: 'routeNumber',
    side: 'routeNumber',
    rear: 'routeNumber',
    internal: 'routeNumber'
  })

  const displayOptions = {
    languages: ['english', 'hindi', 'marathi'],
    fontFamilies: ['Arial', 'Times New Roman', 'Helvetica'],
    fontSizes: ['12', '14', '16', '18', '20', '24'],
    fontWeights: ['400', '500', '600', '700']
  }

  useEffect(() => {
    if (id) {
      // Load route data for editing
      const routes = JSON.parse(localStorage.getItem('routes') || '[]')
      const routeToEdit = routes[id]
      if (routeToEdit) {
        setRoute(routeToEdit.routeDetails)
        setLanguageConfig(routeToEdit.languageConfiguration)
      }
    }
  }, [id])

  const handleRouteChange = (e) => {
    const { name, value } = e.target
    setRoute(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLanguageConfigChange = (index, field, value) => {
    setLanguageConfig(prev => {
      const newConfig = [...prev]
      newConfig[index] = {
        ...newConfig[index],
        [field]: value
      }
      return newConfig
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const routes = JSON.parse(localStorage.getItem('routes') || '[]')
    const routeData = {
      routeDetails: route,
      languageConfiguration: languageConfig,
      displayConfiguration: {
        front: selectedFields.front,
        side: selectedFields.side,
        rear: selectedFields.rear,
        internal: selectedFields.internal
      }
    }

    if (id) {
      // Update existing route
      routes[id] = routeData
    } else {
      // Add new route
      routes.push(routeData)
    }

    localStorage.setItem('routes', JSON.stringify(routes))

    // Generate and download JSON file
    const jsonData = JSON.stringify(routeData, null, 2)
    const blob = new Blob([jsonData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `route_${route.routeNumber}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {id ? 'Edit Route' : 'Create New Route'}
          </h1>
          <p className="text-gray-600">
            Configure route details and LED display settings
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Route Details Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-1 h-5 bg-blue-500 rounded mr-2"></div>
              Route Details
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Route Number</label>
                <input
                  type="text"
                  name="routeNumber"
                  value={route.routeNumber}
                  onChange={handleRouteChange}
                  className="form-input w-full px-3 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Source</label>
                <input
                  type="text"
                  name="source"
                  value={route.source}
                  onChange={handleRouteChange}
                  className="form-input w-full px-3 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Destination</label>
                <input
                  type="text"
                  name="destination"
                  value={route.destination}
                  onChange={handleRouteChange}
                  className="form-input w-full px-3 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Via</label>
                <input
                  type="text"
                  name="via"
                  value={route.via}
                  onChange={handleRouteChange}
                  className="form-input w-full px-3 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Language Configuration Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-1 h-5 bg-blue-500 rounded mr-2"></div>
              Language Configuration
            </h2>
            <div className="space-y-6">
              {languageConfig.map((config, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-600">Language {index + 1}</label>
                      <select
                        value={config.language}
                        onChange={(e) => handleLanguageConfigChange(index, 'language', e.target.value)}
                        className="form-select w-full px-3 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
                      >
                        {displayOptions.languages.map(lang => (
                          <option key={lang} value={lang} className="text-gray-900">{lang}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-600">Font Family</label>
                      <select
                        value={config.fontFamily}
                        onChange={(e) => handleLanguageConfigChange(index, 'fontFamily', e.target.value)}
                        className="form-select w-full px-3 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
                      >
                        {displayOptions.fontFamilies.map(font => (
                          <option key={font} value={font} className="text-gray-900">{font}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-600">Font Size</label>
                      <select
                        value={config.fontSize}
                        onChange={(e) => handleLanguageConfigChange(index, 'fontSize', e.target.value)}
                        className="form-select w-full px-3 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
                      >
                        {displayOptions.fontSizes.map(size => (
                          <option key={size} value={size} className="text-gray-900">{size}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-600">Font Weight</label>
                      <select
                        value={config.fontWeight}
                        onChange={(e) => handleLanguageConfigChange(index, 'fontWeight', e.target.value)}
                        className="form-select w-full px-3 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
                      >
                        {displayOptions.fontWeights.map(weight => (
                          <option key={weight} value={weight} className="text-gray-900">
                            {weight === '400' ? `${weight} (Normal)` : 
                             weight === '700' ? `${weight} (Bold)` : 
                             weight}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Display Configuration Sections with Tabs */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-1 h-5 bg-blue-500 rounded mr-2"></div>
              LED Display Configuration
            </h2>
            
            <Tabs.Root defaultValue="front" className="flex flex-col">
              <div className="border-b border-gray-200 mb-6">
                <Tabs.List className="flex space-x-8" aria-label="Display Boards">
                  {boards.map((board) => (
                    <Tabs.Trigger
                      key={board}
                      value={board}
                      className="px-1 py-3 text-sm font-medium text-gray-500 hover:text-gray-800 focus:outline-none data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-2">
                        <span>{board.charAt(0).toUpperCase() + board.slice(1)} Board</span>
                      </div>
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>
              </div>

              {boards.map((board) => (
                <Tabs.Content key={board} value={board} className="outline-none">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      {board.charAt(0).toUpperCase() + board.slice(1)} Board Configuration
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <RadioGroup.Root
                      value={selectedFields[board]}
                      onValueChange={(value) => setSelectedFields(prev => ({ ...prev, [board]: value }))}
                      className="flex flex-wrap gap-4 mb-6"
                    >
                      {fields.map((field) => (
                        <div key={field} className="flex items-center">
                          <RadioGroup.Item
                            value={field}
                            id={`${board}-${field}`}
                            className="w-4 h-4 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                          >
                            <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-white" />
                          </RadioGroup.Item>
                          <label
                            htmlFor={`${board}-${field}`}
                            className="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
                          >
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                          </label>
                        </div>
                      ))}
                    </RadioGroup.Root>
                  </div>
                </Tabs.Content>
              ))}
            </Tabs.Root>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateRoute

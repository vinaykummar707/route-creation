import { useState, useEffect } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import * as RadioGroup from '@radix-ui/react-radio-group'

const displayOptions = {
  scrollTypes: ['Left to Right', 'Right to Left', 'Fixed', 'Flashing'],
  scrollSpeeds: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  sizes: ['Full Screen', 'Upper Half', 'Lower Half'],
  bitModes: ['8 bit', '10 bit', '12 bit', '14 bit'],
  languages: ['English', 'Hindi', 'Marathi', 'Gujarati', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'],
  fontFamilies: ['Arial', 'Times New Roman', 'Helvetica', 'Courier New'],
  fontSizes: ['12px', '14px', '16px', '18px', '20px', '24px'],
  fontWeights: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
}

const boards = ['front', 'side', 'rear', 'internal']
const fields = ['routeNumber', 'source', 'destination', 'via']

const initialBoardConfig = {
  scrollType: 'Fixed',
  scrollSpeed: '0',
  size: 'Full Screen',
  bitMode: '8 bit',
  language: 'English',
  text: ''
}

const initialFontConfig = {
  fontFamily: 'Arial',
  fontSize: '16px',
  fontWeight: '400'
}

function App() {
  const [route, setRoute] = useState({
    routeNumber: '',
    source: '',
    destination: '',
    via: ''
  })

  const [displayConfig, setDisplayConfig] = useState({
    front: {
      routeNumber: { ...initialBoardConfig, text: '' },
      source: { ...initialBoardConfig, text: '' },
      destination: { ...initialBoardConfig, text: '' },
      via: { ...initialBoardConfig, text: '' }
    },
    side: {
      routeNumber: { ...initialBoardConfig, text: '' },
      source: { ...initialBoardConfig, text: '' },
      destination: { ...initialBoardConfig, text: '' },
      via: { ...initialBoardConfig, text: '' }
    },
    rear: {
      routeNumber: { ...initialBoardConfig, text: '' },
      source: { ...initialBoardConfig, text: '' },
      destination: { ...initialBoardConfig, text: '' },
      via: { ...initialBoardConfig, text: '' }
    },
    internal: {
      routeNumber: { ...initialBoardConfig, text: '' },
      source: { ...initialBoardConfig, text: '' },
      destination: { ...initialBoardConfig, text: '' },
      via: { ...initialBoardConfig, text: '' }
    }
  })

  const [languageConfig, setLanguageConfig] = useState([
    {
      language: 'English',
      fontFamily: 'Arial',
      fontSize: '16px',
      fontWeight: '400'
    },
    {
      language: 'Hindi',
      fontFamily: 'Arial',
      fontSize: '16px',
      fontWeight: '400'
    },
    {
      language: 'Marathi',
      fontFamily: 'Arial',
      fontSize: '16px',
      fontWeight: '400'
    }
  ])

  const [selectedFields, setSelectedFields] = useState({
    front: 'routeNumber',
    side: 'routeNumber',
    rear: 'routeNumber',
    internal: 'routeNumber'
  })

  const [scrollTypes, setScrollTypes] = useState({
    front: initialBoardConfig.scrollType,
    side: initialBoardConfig.scrollType,
    rear: initialBoardConfig.scrollType,
    internal: initialBoardConfig.scrollType
  })

  useEffect(() => {
    setDisplayConfig(prev => {
      const newConfig = { ...prev }
      boards.forEach(board => {
        newConfig[board].routeNumber.text = route.routeNumber
        newConfig[board].source.text = route.source
        newConfig[board].destination.text = route.destination
        newConfig[board].via.text = route.via
      })
      return newConfig
    })
  }, [route])

  const handleRouteChange = (e) => {
    const { name, value } = e.target
    setRoute(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDisplayConfigChange = (board, field, configType, value) => {
    setDisplayConfig(prev => ({
      ...prev,
      [board]: {
        ...prev[board],
        [field]: {
          ...prev[board][field],
          [configType]: value
        }
      }
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

  const handleScrollTypeChange = (board, value) => {
    setScrollTypes(prev => ({ ...prev, [board]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Format the data
    const configData = {
      routeDetails: route,
      displayConfiguration: displayConfig,
      languageConfiguration: languageConfig
    }

    // Convert to JSON string with proper formatting
    const jsonString = JSON.stringify(configData, null, 2)

    // Create blob and download link
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    
    // Create temporary link and trigger download
    const link = document.createElement('a')
    link.href = url
    link.download = `route_config_${route.routeNumber || 'new'}_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    
    // Cleanup
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    // Also log to console for reference
    console.log('Configuration Saved:', configData)
  }

  const DisplayConfigSection = ({ board, field }) => (
    <div className="bg-white rounded-lg space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-600">Display Text</label>
        <input
          type="text"
          value={displayConfig[board][field].text}
          onChange={(e) => handleDisplayConfigChange(board, field, 'text', e.target.value)}
          placeholder={`Enter ${field} text`}
          className="form-input w-full px-3 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Scroll Type</label>
          <select
            value={scrollTypes[board]}
            onChange={(e) => handleScrollTypeChange(board, e.target.value)}
            className="form-select w-full px-3 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
          >
            {displayOptions.scrollTypes.map(type => (
              <option key={type} value={type} className="text-gray-900">{type}</option>
            ))}
          </select>
        </div>
        {(scrollTypes[board] === 'Left to Right' || scrollTypes[board] === 'Right to Left') && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">Scroll Speed (0-10)</label>
            <select
              value={displayConfig[board][field].scrollSpeed}
              onChange={(e) => handleDisplayConfigChange(board, field, 'scrollSpeed', e.target.value)}
              className="form-select w-full px-3 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
            >
              {displayOptions.scrollSpeeds.map(speed => (
                <option key={speed} value={speed} className="text-gray-900">{speed}</option>
              ))}
            </select>
          </div>
        )}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Size</label>
          <select
            value={displayConfig[board][field].size}
            onChange={(e) => handleDisplayConfigChange(board, field, 'size', e.target.value)}
            className="form-select w-full px-3 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
          >
            {displayOptions.sizes.map(size => (
              <option key={size} value={size} className="text-gray-900">{size}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Bit Mode</label>
          <select
            value={displayConfig[board][field].bitMode}
            onChange={(e) => handleDisplayConfigChange(board, field, 'bitMode', e.target.value)}
            className="form-select w-full px-3 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
          >
            {displayOptions.bitModes.map(mode => (
              <option key={mode} value={mode} className="text-gray-900">{mode}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Language</label>
          <select
            value={displayConfig[board][field].language}
            onChange={(e) => handleDisplayConfigChange(board, field, 'language', e.target.value)}
            className="form-select w-full px-3 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
          >
            {displayOptions.languages.map(lang => (
              <option key={lang} value={lang} className="text-gray-900">{lang}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen w-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bus Route Configuration
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

                    {selectedFields[board] && (
                      <DisplayConfigSection board={board} field={selectedFields[board]} />
                    )}
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

export default App

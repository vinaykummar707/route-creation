import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function RoutesList() {
  const navigate = useNavigate()
  const [routes, setRoutes] = useState([])

  useEffect(() => {
    // Load routes from localStorage
    const savedRoutes = JSON.parse(localStorage.getItem('routes') || '[]')
    setRoutes(savedRoutes)
  }, [])

  const handleDelete = (index) => {
    const newRoutes = routes.filter((_, i) => i !== index)
    localStorage.setItem('routes', JSON.stringify(newRoutes))
    setRoutes(newRoutes)
  }

  const handleEdit = (index) => {
    // Navigate to edit route page with route data
    navigate(`/edit/${index}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bus Routes</h1>
          <button
            onClick={() => navigate('/create')}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Add New Route
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          {routes.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No routes configured yet.</p>
              <button
                onClick={() => navigate('/create')}
                className="mt-4 text-blue-500 hover:text-blue-600"
              >
                Create your first route
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Route Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Destination
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Via
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {routes.map((route, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {route.routeDetails.routeNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {route.routeDetails.source}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {route.routeDetails.destination}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {route.routeDetails.via}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(index)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RoutesList

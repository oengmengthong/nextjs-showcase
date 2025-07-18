'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ChartsDemo() {
  const [activeChart, setActiveChart] = useState('bar')
  const [realTimeData, setRealTimeData] = useState([
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 700 },
  ])

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => 
        prev.map(item => ({
          ...item,
          value: Math.max(100, Math.floor(Math.random() * 1000))
        }))
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const chartTypes = [
    { id: 'bar', name: 'Bar Chart', icon: '📊' },
    { id: 'line', name: 'Line Chart', icon: '📈' },
    { id: 'pie', name: 'Pie Chart', icon: '🥧' },
    { id: 'area', name: 'Area Chart', icon: '📉' },
    { id: 'scatter', name: 'Scatter Plot', icon: '⚡' },
    { id: 'heatmap', name: 'Heatmap', icon: '🔥' },
  ]

  const metrics = [
    { label: 'Total Users', value: '24,531', change: '+12%', color: 'text-green-600' },
    { label: 'Revenue', value: '$45,678', change: '+8%', color: 'text-green-600' },
    { label: 'Orders', value: '1,234', change: '-3%', color: 'text-red-600' },
    { label: 'Conversion', value: '3.2%', change: '+0.5%', color: 'text-green-600' },
  ]

  const renderChart = () => {
    const maxValue = Math.max(...realTimeData.map(item => item.value))
    
    switch (activeChart) {
      case 'bar':
        return (
          <div className="space-y-4">
            {realTimeData.map((item) => (
              <div key={item.name} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-gray-600 dark:text-gray-400">
                  {item.name}
                </div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-8 relative overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                  >
                    <span className="text-white text-sm font-medium">{item.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      
      case 'line':
        return (
          <div className="relative h-64 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <polyline
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                points={realTimeData.map((item, index) => 
                  `${index * 66.67},${200 - (item.value / maxValue) * 180}`
                ).join(' ')}
              />
              {realTimeData.map((item, index) => (
                <circle
                  key={item.name}
                  cx={index * 66.67}
                  cy={200 - (item.value / maxValue) * 180}
                  r="4"
                  fill="#3b82f6"
                />
              ))}
            </svg>
          </div>
        )
      
      case 'pie':
        let currentAngle = 0
        const total = realTimeData.reduce((sum, item) => sum + item.value, 0)
        
        return (
          <div className="flex items-center justify-center">
            <svg width="200" height="200" className="transform -rotate-90">
              {realTimeData.map((item, index) => {
                const percentage = (item.value / total) * 100
                const angle = (percentage / 100) * 360
                const x1 = 100 + 80 * Math.cos((currentAngle * Math.PI) / 180)
                const y1 = 100 + 80 * Math.sin((currentAngle * Math.PI) / 180)
                const x2 = 100 + 80 * Math.cos(((currentAngle + angle) * Math.PI) / 180)
                const y2 = 100 + 80 * Math.sin(((currentAngle + angle) * Math.PI) / 180)
                
                const largeArcFlag = angle > 180 ? 1 : 0
                const pathData = `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`
                
                const slice = (
                  <path
                    key={item.name}
                    d={pathData}
                    fill={`hsl(${index * 60}, 70%, 50%)`}
                    stroke="white"
                    strokeWidth="2"
                  />
                )
                
                currentAngle += angle
                return slice
              })}
            </svg>
          </div>
        )
      
      case 'area':
        return (
          <div className="relative h-64 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <polygon
                fill="url(#areaGradient)"
                stroke="#3b82f6"
                strokeWidth="2"
                points={`0,200 ${realTimeData.map((item, index) => 
                  `${index * 66.67},${200 - (item.value / maxValue) * 180}`
                ).join(' ')} 400,200`}
              />
            </svg>
          </div>
        )
      
      default:
        return (
          <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-center">
              <div className="text-4xl mb-2">{chartTypes.find(c => c.id === activeChart)?.icon}</div>
              <p className="text-gray-600 dark:text-gray-400">
                {chartTypes.find(c => c.id === activeChart)?.name} visualization
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition-colors">
                ← Back to Home
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Data Visualization</h1>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Live Data</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                </div>
                <div className={`text-sm font-medium ${metric.color}`}>
                  {metric.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Chart Types</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {chartTypes.map((chart) => (
              <button
                key={chart.id}
                onClick={() => setActiveChart(chart.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  activeChart === chart.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <div className="text-2xl mb-2">{chart.icon}</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {chart.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chart Display */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {chartTypes.find(c => c.id === activeChart)?.name}
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Updates every 3s</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          {renderChart()}
        </div>

        {/* Data Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Raw Data</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Period</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Value</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Change</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                </tr>
              </thead>
              <tbody>
                {realTimeData.map((item) => (
                  <tr key={item.name} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{item.name}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{item.value}</td>
                    <td className="py-3 px-4">
                      <span className={`${item.value > 500 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.value > 500 ? '+' : '-'}{Math.abs(item.value - 500)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.value > 700 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        item.value > 400 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {item.value > 700 ? 'High' : item.value > 400 ? 'Medium' : 'Low'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

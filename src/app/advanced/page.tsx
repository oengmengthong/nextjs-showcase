'use client'

import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function AdvancedDemo() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [videoUrl, setVideoUrl] = useState('/api/placeholder/video.mp4')
  const [audioUrl, setAudioUrl] = useState('/api/placeholder/audio.mp3')
  const [cameraActive, setCameraActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLVideoElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    setUploadedFiles(prev => [...prev, ...files])
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setUploadedFiles(prev => [...prev, ...files])
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (cameraRef.current) {
        cameraRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (err) {
      console.error('Error accessing camera:', err)
    }
  }

  const stopCamera = () => {
    if (cameraRef.current && cameraRef.current.srcObject) {
      const stream = cameraRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      setCameraActive(false)
    }
  }

  const downloadFile = (filename: string, content: string) => {
    const element = document.createElement('a')
    const file = new Blob([content], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = filename
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const sampleImages = [
    '/next.svg',
    '/vercel.svg',
    '/file.svg',
    '/globe.svg',
    '/window.svg'
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
                ← Back to Home
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Advanced Components</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Left Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${leftSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Navigation</h2>
            <button
              onClick={() => setLeftSidebarOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="space-y-2">
            <Link href="/components" className="block p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              Components
            </Link>
            <Link href="/animations" className="block p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              Animations
            </Link>
            <Link href="/features" className="block p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              Features
            </Link>
            <Link href="/forms" className="block p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              Forms
            </Link>
            <Link href="/advanced" className="block p-3 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              Advanced
            </Link>
          </nav>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Tools</h2>
            <button
              onClick={() => setRightSidebarOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => downloadFile('sample.txt', 'Hello World! This is a sample download.')}
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Sample
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Import Files
            </button>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Uploaded Files:</p>
              <div className="text-sm text-gray-900 dark:text-white">
                {uploadedFiles.length > 0 ? (
                  <ul className="space-y-1">
                    {uploadedFiles.map((file, index) => (
                      <li key={index} className="truncate">{file.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No files uploaded</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Dashboard Menu */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Dashboard Menu</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors cursor-pointer">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">Analytics</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">View stats</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors cursor-pointer">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">Users</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage users</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors cursor-pointer">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">Settings</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Configure app</p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors cursor-pointer">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.866-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">Alerts</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">View alerts</p>
              </div>
            </div>
          </div>

          {/* Video Player */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Video Player</h2>
            <div className="bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                controls
                className="w-full h-48 object-cover"
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23000'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='white' font-size='20'%3EBig Buck Bunny%3C/text%3E%3C/svg%3E"
              >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
                <source src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => videoRef.current?.play()}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Play
              </button>
              <button
                onClick={() => videoRef.current?.pause()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Pause
              </button>
            </div>
          </div>

          {/* Audio Player */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Audio Player</h2>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">Sample Audio Track</h3>
                  <p className="text-white/80 text-sm">Free sample audio for testing</p>
                </div>
              </div>
            </div>
            <audio
              ref={audioRef}
              controls
              className="w-full mt-4"
            >
              <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3" type="audio/mpeg" />
              <source src="https://samplelib.com/lib/preview/mp3/sample-3s.mp3" type="audio/mpeg" />
              <source src="https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>

          {/* Image Viewer */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Image Viewer</h2>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {sampleImages.map((src, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedImage(src)}
                >
                  <Image
                    src={src}
                    alt={`Sample ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              ))}
            </div>
            {selectedImage && (
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">Selected Image</h3>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <Image
                    src={selectedImage}
                    alt="Selected"
                    width={200}
                    height={200}
                    className="w-full h-32 object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Drag & Drop File Upload */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Drag & Drop Upload</h2>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragOver
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Drag and drop files here, or click to select
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Select Files
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Camera */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Camera</h2>
            <div className="bg-black rounded-lg overflow-hidden mb-4">
              <video
                ref={cameraRef}
                autoPlay
                playsInline
                muted
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={startCamera}
                disabled={cameraActive}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  cameraActive
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                Start Camera
              </button>
              <button
                onClick={stopCamera}
                disabled={!cameraActive}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  !cameraActive
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                Stop Camera
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Overlay for sidebars */}
      {(leftSidebarOpen || rightSidebarOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => {
            setLeftSidebarOpen(false)
            setRightSidebarOpen(false)
          }}
        />
      )}
    </div>
  )
}

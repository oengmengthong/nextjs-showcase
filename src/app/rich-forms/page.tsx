'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

// Rich Text Editor Component
interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const RichTextEditor = ({ value, onChange, placeholder = "Start typing..." }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set())

  const execCommand = (command: string, value: string | boolean = false) => {
    document.execCommand(command, false, value as string)
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
    updateActiveFormats()
  }

  const updateActiveFormats = () => {
    const formats = new Set<string>()
    if (document.queryCommandState('bold')) formats.add('bold')
    if (document.queryCommandState('italic')) formats.add('italic')
    if (document.queryCommandState('underline')) formats.add('underline')
    if (document.queryCommandState('strikeThrough')) formats.add('strikeThrough')
    if (document.queryCommandState('insertOrderedList')) formats.add('ol')
    if (document.queryCommandState('insertUnorderedList')) formats.add('ul')
    setActiveFormats(formats)
  }

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handleKeyUp = () => {
    updateActiveFormats()
  }

  const handleMouseUp = () => {
    updateActiveFormats()
  }

  const insertLink = () => {
    const url = prompt('Enter URL:')
    if (url) {
      execCommand('createLink', url)
    }
  }

  const insertImage = () => {
    const url = prompt('Enter image URL:')
    if (url) {
      execCommand('insertImage', url)
    }
  }

  const formatButtons = [
    { command: 'bold', icon: 'B', title: 'Bold' },
    { command: 'italic', icon: 'I', title: 'Italic' },
    { command: 'underline', icon: 'U', title: 'Underline' },
    { command: 'strikeThrough', icon: 'S', title: 'Strikethrough' },
  ]

  const listButtons = [
    { command: 'insertOrderedList', icon: '1.', title: 'Numbered List', key: 'ol' },
    { command: 'insertUnorderedList', icon: '•', title: 'Bullet List', key: 'ul' },
  ]

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-800 p-3 border-b border-gray-300 dark:border-gray-600">
        <div className="flex flex-wrap gap-2">
          {formatButtons.map((btn) => (
            <button
              key={btn.command}
              onClick={() => execCommand(btn.command)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                activeFormats.has(btn.command)
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
              title={btn.title}
            >
              {btn.icon}
            </button>
          ))}
          
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>
          
          {listButtons.map((btn) => (
            <button
              key={btn.command}
              onClick={() => execCommand(btn.command)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                activeFormats.has(btn.key)
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
              title={btn.title}
            >
              {btn.icon}
            </button>
          ))}
          
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>
          
          <button
            onClick={insertLink}
            className="px-3 py-1 rounded text-sm font-medium bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            title="Insert Link"
          >
            🔗
          </button>
          
          <button
            onClick={insertImage}
            className="px-3 py-1 rounded text-sm font-medium bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            title="Insert Image"
          >
            🖼️
          </button>
          
          <select
            onChange={(e) => execCommand('formatBlock', e.target.value)}
            className="px-3 py-1 rounded text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
          >
            <option value="div">Normal</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
            <option value="h5">Heading 5</option>
            <option value="h6">Heading 6</option>
            <option value="p">Paragraph</option>
            <option value="pre">Preformatted</option>
          </select>
        </div>
      </div>
      
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyUp={handleKeyUp}
        onMouseUp={handleMouseUp}
        className="p-4 min-h-[200px] focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        style={{ wordBreak: 'break-word' }}
        dangerouslySetInnerHTML={{ __html: value }}
        suppressContentEditableWarning={true}
      />
    </div>
  )
}

// Code Editor Component
interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  placeholder?: string
}

const CodeEditor = ({ value, onChange, language = 'javascript', placeholder = '// Write your code here...' }: CodeEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [lineNumbers, setLineNumbers] = useState<number[]>([1])

  useEffect(() => {
    const updateLineNumbers = () => {
      const lines = value.split('\n')
      setLineNumbers(lines.map((_: string, index: number) => index + 1))
    }
    updateLineNumbers()
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const textarea = textareaRef.current
      if (textarea) {
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const newValue = value.substring(0, start) + '  ' + value.substring(end)
        onChange(newValue)
        
        // Reset cursor position
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2
        }, 0)
      }
    }
  }

  const handleScroll = (e: React.UIEvent) => {
    const lineNumbersEl = e.currentTarget.parentElement?.querySelector('.line-numbers')
    if (lineNumbersEl) {
      lineNumbersEl.scrollTop = e.currentTarget.scrollTop
    }
  }

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="bg-gray-800 text-white p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-sm font-medium ml-4">{language}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onChange('')}
            className="text-xs bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
          >
            Clear
          </button>
          <button
            onClick={() => {
              const formatted = value.replace(/;/g, ';\n').replace(/{/g, '{\n').replace(/}/g, '\n}')
              onChange(formatted)
            }}
            className="text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
          >
            Format
          </button>
        </div>
      </div>
      
      <div className="flex">
        <div className="line-numbers bg-gray-100 dark:bg-gray-800 p-3 text-sm text-gray-500 dark:text-gray-400 font-mono select-none overflow-hidden">
          {lineNumbers.map((num) => (
            <div key={num} className="text-right pr-2 leading-6">
              {num}
            </div>
          ))}
        </div>
        
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll}
            placeholder={placeholder}
            className="w-full h-64 p-3 font-mono text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none focus:outline-none leading-6"
            style={{ tabSize: 2 }}
          />
        </div>
      </div>
    </div>
  )
}

// Advanced Form Components
const ColorPicker = ({ value, onChange, label }: { value: string; onChange: (value: string) => void; label: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const colors = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e',
    '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#ec4899',
    '#f43f5e', '#64748b', '#374151', '#000000'
  ]

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-between px-3 bg-white dark:bg-gray-900"
        >
          <div className="flex items-center space-x-2">
            <div
              className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600"
              style={{ backgroundColor: value }}
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">{value}</span>
          </div>
          <span className="text-gray-500">▼</span>
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-3 grid grid-cols-4 gap-2 z-10">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => {
                  onChange(color)
                  setIsOpen(false)
                }}
                className={`w-8 h-8 rounded border-2 hover:scale-110 transition-transform ${
                  value === color ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const DateRangePicker = ({ startDate, endDate, onChange }: { 
  startDate: string; 
  endDate: string; 
  onChange: (start: string, end: string) => void 
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Date Range
      </label>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onChange(e.target.value, endDate)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onChange(startDate, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>
      </div>
    </div>
  )
}

const FileUpload = ({ onUpload, multiple = false, accept = "*/*" }: { 
  onUpload: (files: File[]) => void; 
  multiple?: boolean; 
  accept?: string 
}) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    setUploadedFiles(files)
    onUpload(files)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedFiles(files)
    onUpload(files)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        File Upload
      </label>
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragOver
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
        />
        
        <div className="space-y-2">
          <div className="text-4xl text-gray-400">📁</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p className="font-medium">
              {isDragOver ? 'Drop files here' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs">
              {multiple ? 'Multiple files supported' : 'Single file only'}
            </p>
          </div>
        </div>
      </div>
      
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Uploaded Files ({uploadedFiles.length})
          </h4>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">📄</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    const newFiles = uploadedFiles.filter((_, i) => i !== index)
                    setUploadedFiles(newFiles)
                    onUpload(newFiles)
                  }}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const SliderInput = ({ value, onChange, min = 0, max = 100, step = 1, label }: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label: string;
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
      />
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}

export default function RichFormsPage() {
  const [richTextContent, setRichTextContent] = useState('<p>Welcome to the <strong>Rich Text Editor</strong>! You can format text, add <em>emphasis</em>, create lists, and more.</p>')
  const [codeContent, setCodeContent] = useState(`function greeting(name) {
  return \`Hello, \${name}!\`;
}

const result = greeting("World");
console.log(result);`)
  const [selectedColor, setSelectedColor] = useState('#3b82f6')
  const [startDate, setStartDate] = useState('2025-01-01')
  const [endDate, setEndDate] = useState('2025-12-31')
  const [sliderValue, setSliderValue] = useState(50)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleDateRangeChange = (start: string, end: string) => {
    setStartDate(start)
    setEndDate(end)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Form submitted! Check the console for details.')
    console.log({
      richTextContent,
      codeContent,
      selectedColor,
      startDate,
      endDate,
      sliderValue,
      uploadedFiles: uploadedFiles.map(f => ({ name: f.name, size: f.size, type: f.type }))
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              🎨 Rich Forms Demo
            </Link>
            <Link
              href="/"
              className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Advanced Forms with Rich Text & Code Editors
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore advanced form components including rich text editors, code editors, file uploads, and custom input controls.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Rich Text Editor */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Rich Text Editor
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  A full-featured rich text editor with formatting options, lists, links, and more.
                </p>
                <RichTextEditor
                  value={richTextContent}
                  onChange={setRichTextContent}
                  placeholder="Start writing your content here..."
                />
              </div>

              {/* Code Editor */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Code Editor
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  A syntax-highlighted code editor with line numbers, auto-indentation, and formatting.
                </p>
                <CodeEditor
                  value={codeContent}
                  onChange={setCodeContent}
                  language="javascript"
                  placeholder="// Write your code here..."
                />
              </div>

              {/* Color Picker */}
              <div>
                <ColorPicker
                  value={selectedColor}
                  onChange={setSelectedColor}
                  label="Theme Color"
                />
              </div>

              {/* Date Range Picker */}
              <div>
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleDateRangeChange}
                />
              </div>

              {/* Slider Input */}
              <div>
                <SliderInput
                  value={sliderValue}
                  onChange={setSliderValue}
                  min={0}
                  max={100}
                  step={1}
                  label="Progress Value"
                />
              </div>

              {/* File Upload */}
              <div>
                <FileUpload
                  onUpload={setUploadedFiles}
                  multiple={true}
                  accept="image/*,.pdf,.doc,.docx"
                />
              </div>

              {/* Additional Form Fields */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter project name"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                    <option>Web Development</option>
                    <option>Mobile App</option>
                    <option>Desktop Software</option>
                    <option>Data Science</option>
                    <option>Machine Learning</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority
                  </label>
                  <div className="flex space-x-4">
                    {['Low', 'Medium', 'High'].map((priority) => (
                      <label key={priority} className="flex items-center">
                        <input
                          type="radio"
                          name="priority"
                          value={priority}
                          className="mr-2 text-blue-600"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {priority}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Features
                  </label>
                  <div className="space-y-2">
                    {['Authentication', 'Real-time Updates', 'File Upload', 'Analytics'].map((feature) => (
                      <label key={feature} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2 text-blue-600"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Submit Advanced Form
              </button>
            </div>
          </div>
        </form>

        {/* Features Grid */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Advanced Form Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Rich Text Editor',
                description: 'Full-featured WYSIWYG editor with formatting, lists, links, and media support',
                icon: '📝',
                features: ['Text formatting', 'Lists & links', 'Image insertion', 'Undo/Redo']
              },
              {
                title: 'Code Editor',
                description: 'Syntax-highlighted code editor with line numbers and auto-formatting',
                icon: '💻',
                features: ['Syntax highlighting', 'Line numbers', 'Auto-indentation', 'Multiple languages']
              },
              {
                title: 'File Upload',
                description: 'Drag & drop file upload with preview and validation',
                icon: '📁',
                features: ['Drag & drop', 'Multiple files', 'File preview', 'Size validation']
              },
              {
                title: 'Color Picker',
                description: 'Interactive color picker with preset colors and custom values',
                icon: '🎨',
                features: ['Preset colors', 'Custom values', 'Live preview', 'Hex format']
              },
              {
                title: 'Date Range',
                description: 'Advanced date range picker with calendar interface',
                icon: '📅',
                features: ['Start & end dates', 'Calendar view', 'Validation', 'Custom format']
              },
              {
                title: 'Slider Controls',
                description: 'Interactive slider inputs with custom ranges and steps',
                icon: '🎚️',
                features: ['Custom ranges', 'Step values', 'Live feedback', 'Responsive design']
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-1">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

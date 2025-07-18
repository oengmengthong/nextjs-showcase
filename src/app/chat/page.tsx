'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface Message {
  id: number
  user: string
  text: string
  timestamp: Date
  type: 'user' | 'system' | 'bot'
  avatar?: string
}

interface User {
  id: number
  name: string
  status: 'online' | 'offline' | 'away'
  avatar?: string
}

export default function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: 'System',
      text: 'Welcome to the chat room! 👋',
      timestamp: new Date(),
      type: 'system'
    },
    {
      id: 2,
      user: 'Alex',
      text: 'Hey everyone! How are you doing today?',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      type: 'user'
    },
    {
      id: 3,
      user: 'Sarah',
      text: 'Great! Just finished working on a new project.',
      timestamp: new Date(Date.now() - 3 * 60 * 1000),
      type: 'user'
    },
    {
      id: 4,
      user: 'Bot',
      text: 'I can help you with questions! Type @bot to mention me.',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      type: 'bot'
    }
  ])

  const [currentMessage, setCurrentMessage] = useState('')
  const [currentUser] = useState('You')
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const [onlineUsers] = useState<User[]>([
    { id: 1, name: 'Alex', status: 'online' },
    { id: 2, name: 'Sarah', status: 'online' },
    { id: 3, name: 'Mike', status: 'away' },
    { id: 4, name: 'Emma', status: 'offline' },
    { id: 5, name: 'Bot', status: 'online' },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [notifications, setNotifications] = useState<{ id: number; message: string; type: 'info' | 'success' | 'warning' }[]>([])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Simulate random messages
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessages = [
        { user: 'Alex', text: 'That sounds interesting! 🤔' },
        { user: 'Sarah', text: 'Anyone up for a coffee break? ☕' },
        { user: 'Mike', text: 'Just joined! What did I miss?' },
        { user: 'Emma', text: 'Working on something exciting! 🚀' },
        { user: 'Bot', text: 'Fun fact: This is a demo chat! 🤖' }
      ]
      
      if (Math.random() < 0.3) { // 30% chance every 5 seconds
        const randomMsg = randomMessages[Math.floor(Math.random() * randomMessages.length)]
        const newMessage: Message = {
          id: Date.now(),
          user: randomMsg.user,
          text: randomMsg.text,
          timestamp: new Date(),
          type: randomMsg.user === 'Bot' ? 'bot' : 'user'
        }
        setMessages(prev => [...prev, newMessage])
        
        // Add notification
        addNotification(`${randomMsg.user} sent a message`, 'info')
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Simulate typing indicator
  useEffect(() => {
    const interval = setInterval(() => {
      const users = ['Alex', 'Sarah', 'Mike', 'Emma']
      const randomUser = users[Math.floor(Math.random() * users.length)]
      
      if (Math.random() < 0.2) { // 20% chance
        setTypingUsers(prev => [...prev, randomUser])
        setTimeout(() => {
          setTypingUsers(prev => prev.filter(u => u !== randomUser))
        }, 3000)
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const addNotification = (message: string, type: 'info' | 'success' | 'warning') => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 3000)
  }

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentMessage.trim()) return

    const newMessage: Message = {
      id: Date.now(),
      user: currentUser,
      text: currentMessage,
      timestamp: new Date(),
      type: 'user'
    }

    setMessages(prev => [...prev, newMessage])
    setCurrentMessage('')

    // Simulate bot response
    if (currentMessage.toLowerCase().includes('@bot')) {
      setTimeout(() => {
        const botResponse: Message = {
          id: Date.now() + 1,
          user: 'Bot',
          text: `Hi ${currentUser}! I'm here to help. This is a demo chat system built with Next.js! 🤖`,
          timestamp: new Date(),
          type: 'bot'
        }
        setMessages(prev => [...prev, botResponse])
      }, 1000)
    }
  }

  const getMessageStyle = (type: string) => {
    switch (type) {
      case 'system':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'bot':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  const getUserAvatar = (user: string) => {
    const avatars: { [key: string]: string } = {
      'Alex': '👨‍💻',
      'Sarah': '👩‍🎨',
      'Mike': '👨‍🚀',
      'Emma': '👩‍🔬',
      'Bot': '🤖',
      'System': '⚙️',
      'You': '😊'
    }
    return avatars[user] || '👤'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500'
      case 'away':
        return 'bg-yellow-500'
      case 'offline':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Real-time Chat</h1>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {onlineUsers.filter(u => u.status === 'online').length} online
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Notifications */}
      <div className="fixed top-20 right-4 space-y-2 z-50">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`px-4 py-2 rounded-lg shadow-lg text-white animate-slide-in ${
              notification.type === 'info' ? 'bg-blue-500' :
              notification.type === 'success' ? 'bg-green-500' :
              'bg-yellow-500'
            }`}
          >
            {notification.message}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Users List */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Online Users ({onlineUsers.filter(u => u.status === 'online').length})
              </h2>
              <div className="space-y-3">
                {onlineUsers.map((user) => (
                  <div key={user.id} className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {getUserAvatar(user.name)}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${getStatusColor(user.status)}`}></div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm flex flex-col h-96">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex items-start space-x-3 ${
                    message.user === currentUser ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
                      {getUserAvatar(message.user)}
                    </div>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.user === currentUser 
                        ? 'bg-blue-600 text-white' 
                        : getMessageStyle(message.type)
                    }`}>
                      <div className="font-medium text-sm mb-1">{message.user}</div>
                      <div className="text-sm">{message.text}</div>
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {typingUsers.length > 0 && (
                  <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-200"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-400"></div>
                    </div>
                    <span className="text-sm">
                      {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
                    </span>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <form onSubmit={sendMessage} className="flex space-x-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      placeholder="Type your message... (mention @bot to get a response)"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!currentMessage.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400">💬</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Real-time Messaging</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Messages are updated in real-time with WebSocket-like behavior simulation.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400">🤖</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Bot Integration</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Smart bot responds to mentions and can provide automated assistance.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400">👥</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Presence</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              See who&apos;s online, away, or offline with real-time status updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

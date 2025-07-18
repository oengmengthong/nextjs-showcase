'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  rating: number
  reviews: number
  description: string
  inStock: boolean
}

interface CartItem extends Product {
  quantity: number
}

export default function EcommerceDemo() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [checkoutStep, setCheckoutStep] = useState(0)

  const products: Product[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 199.99,
      image: '/placeholder-headphones.jpg',
      category: 'Electronics',
      rating: 4.5,
      reviews: 128,
      description: 'High-quality wireless headphones with noise cancellation',
      inStock: true
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 299.99,
      image: '/placeholder-watch.jpg',
      category: 'Electronics',
      rating: 4.2,
      reviews: 89,
      description: 'Feature-rich smartwatch with fitness tracking',
      inStock: true
    },
    {
      id: 3,
      name: 'Laptop Bag',
      price: 49.99,
      image: '/placeholder-bag.jpg',
      category: 'Accessories',
      rating: 4.8,
      reviews: 234,
      description: 'Durable laptop bag with multiple compartments',
      inStock: false
    },
    {
      id: 4,
      name: 'Bluetooth Speaker',
      price: 79.99,
      image: '/placeholder-speaker.jpg',
      category: 'Electronics',
      rating: 4.6,
      reviews: 167,
      description: 'Portable bluetooth speaker with rich sound',
      inStock: true
    },
    {
      id: 5,
      name: 'Phone Case',
      price: 24.99,
      image: '/placeholder-case.jpg',
      category: 'Accessories',
      rating: 4.3,
      reviews: 95,
      description: 'Protective phone case with stylish design',
      inStock: true
    },
    {
      id: 6,
      name: 'Gaming Mouse',
      price: 89.99,
      image: '/placeholder-mouse.jpg',
      category: 'Electronics',
      rating: 4.7,
      reviews: 203,
      description: 'High-precision gaming mouse with RGB lighting',
      inStock: true
    }
  ]

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id)
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-sm ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ))
  }

  const checkoutSteps = [
    { title: 'Cart', icon: '🛒' },
    { title: 'Shipping', icon: '🚚' },
    { title: 'Payment', icon: '💳' },
    { title: 'Confirmation', icon: '✅' }
  ]

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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">E-commerce Demo</h1>
            </div>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m.6 8L6 3H3M7 13l-1.5 4.5M13 13v6M16 13v6" />
              </svg>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-w-4 aspect-h-3 bg-gray-200 dark:bg-gray-700 relative">
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                  <span className="text-4xl">
                    {product.category === 'Electronics' ? '📱' : '🎒'}
                  </span>
                </div>
                {!product.inStock && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Out of Stock
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {product.name}
                  </h3>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    ${product.price}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {product.description}
                </p>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({product.reviews} reviews)
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      product.inStock
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Sidebar */}
        {showCart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className="bg-white dark:bg-gray-800 w-full max-w-md h-full overflow-y-auto">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Shopping Cart ({getTotalItems()})
                  </h2>
                  <button
                    onClick={() => setShowCart(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">🛒</div>
                    <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">
                            {item.category === 'Electronics' ? '📱' : '🎒'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                          <p className="text-blue-600 dark:text-blue-400 font-medium">${item.price}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-500"
                            >
                              -
                            </button>
                            <span className="text-gray-900 dark:text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-500"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          ${getTotalPrice().toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setShowCart(false)
                          setCheckoutStep(0)
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Product Details Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedProduct.name}
                  </h2>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="aspect-w-4 aspect-h-3 bg-gray-200 dark:bg-gray-700 rounded-lg">
                    <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center rounded-lg">
                      <span className="text-6xl">
                        {selectedProduct.category === 'Electronics' ? '📱' : '🎒'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex">{renderStars(selectedProduct.rating)}</div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({selectedProduct.reviews} reviews)
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {selectedProduct.description}
                    </p>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        ${selectedProduct.price}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        selectedProduct.inStock
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {selectedProduct.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        addToCart(selectedProduct)
                        setSelectedProduct(null)
                      }}
                      disabled={!selectedProduct.inStock}
                      className={`w-full py-3 rounded-lg font-medium transition-colors ${
                        selectedProduct.inStock
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Steps */}
        {checkoutStep > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Checkout</h2>
                  <button
                    onClick={() => setCheckoutStep(0)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-8">
                  {checkoutSteps.map((step, index) => (
                    <div key={step.title} className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        index <= checkoutStep ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                      }`}>
                        <span className="text-lg">{step.icon}</span>
                      </div>
                      <span className={`ml-2 ${
                        index <= checkoutStep ? 'text-blue-600' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </span>
                      {index < checkoutSteps.length - 1 && (
                        <div className={`w-12 h-0.5 mx-4 ${
                          index < checkoutStep ? 'bg-blue-600' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Checkout Content */}
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Checkout Demo
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    This is a demonstration of the checkout process. In a real application, this would include shipping forms, payment processing, and order confirmation.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => setCheckoutStep(Math.max(0, checkoutStep - 1))}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCheckoutStep(Math.min(checkoutSteps.length - 1, checkoutStep + 1))}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  RefreshCw, 
  Trash2, 
  CheckCheck, 
  Clock, 
  Phone, 
  Mail, 
  MapPin,
  Home,
  Bath,
  Sparkles,
  Calendar,
  FileText,
  ChevronDown,
  ChevronUp,
  Bell,
  ArrowLeft,
  DollarSign,
  Package
} from 'lucide-react'
import Link from 'next/link'

interface EstimateRequest {
  id: string
  createdAt: string
  isNew: boolean
  fullName: string
  email?: string
  phone?: string
  address: string
  numberOfRooms: string
  numberOfBathrooms: string
  serviceType: string
  serviceTypeLabel: string
  closetAreas: string[]
  preferredDate?: string
  preferredTime?: string
  additionalNotes?: string
  estimatedPrice?: number
}

export default function AdminPage() {
  const [estimates, setEstimates] = useState<EstimateRequest[]>([])
  const [newCount, setNewCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(true)

  const fetchEstimates = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true)
    
    try {
      const response = await fetch('/api/estimates')
      const data = await response.json()
      
      if (data.success) {
        setEstimates(data.estimates)
        setNewCount(data.newCount)
      }
    } catch (error) {
      console.error('Error fetching estimates:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchEstimates()
  }, [fetchEstimates])

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return
    
    const interval = setInterval(() => {
      fetchEstimates()
    }, 30000)
    
    return () => clearInterval(interval)
  }, [autoRefresh, fetchEstimates])

  const handleMarkAsRead = async (id: string) => {
    try {
      await fetch('/api/estimates', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'markAsRead', id })
      })
      fetchEstimates()
    } catch (error) {
      console.error('Error marking as read:', error)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await fetch('/api/estimates', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'markAllAsRead' })
      })
      fetchEstimates()
    } catch (error) {
      console.error('Error marking all as read:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this request?')) return
    
    try {
      await fetch(`/api/estimates?id=${id}`, {
        method: 'DELETE'
      })
      fetchEstimates()
    } catch (error) {
      console.error('Error deleting estimate:', error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const formatPreferredDate = (dateString?: string) => {
    if (!dateString) return 'Not specified'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return formatDate(dateString)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading requests...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Site</span>
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-heading">
                  Estimate Requests
                </h1>
                <p className="text-sm text-gray-500">
                  {estimates.length} total {estimates.length === 1 ? 'request' : 'requests'}
                  {newCount > 0 && (
                    <span className="ml-2 inline-flex items-center gap-1 text-primary font-medium">
                      <Bell className="w-3 h-3" />
                      {newCount} new
                    </span>
                  )}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Auto-refresh toggle */}
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary"
                />
                <span className="hidden sm:inline">Auto-refresh</span>
              </label>
              
              {/* Refresh button */}
              <button
                onClick={() => fetchEstimates(true)}
                disabled={refreshing}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              
              {/* Mark all as read */}
              {newCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <CheckCheck className="w-4 h-4" />
                  <span className="hidden sm:inline">Mark All Read</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {estimates.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No requests yet</h3>
            <p className="text-gray-500">
              When customers submit estimate requests, they&apos;ll appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {estimates.map((estimate) => (
              <div
                key={estimate.id}
                className={`bg-white rounded-2xl shadow-sm border transition-all duration-200 ${
                  estimate.isNew 
                    ? 'border-primary/30 ring-2 ring-primary/10' 
                    : 'border-gray-100'
                }`}
              >
                {/* Card Header - Always visible */}
                <div
                  className="p-4 sm:p-6 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === estimate.id ? null : estimate.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        {estimate.isNew && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary text-white">
                            NEW
                          </span>
                        )}
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {estimate.fullName}
                        </h3>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-4 h-4 text-primary" />
                          {estimate.serviceTypeLabel}
                        </span>
                        <span className="flex items-center gap-1">
                          <Home className="w-4 h-4 text-gray-400" />
                          {estimate.numberOfRooms} rooms
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="w-4 h-4 text-gray-400" />
                          {estimate.numberOfBathrooms} bath
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {/* Estimated Price */}
                      {estimate.estimatedPrice && (
                        <div className="bg-primary/10 px-3 py-1 rounded-lg">
                          <span className="text-lg font-bold text-primary">
                            ${estimate.estimatedPrice}
                          </span>
                        </div>
                      )}
                      <div className="text-right hidden sm:block">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          {getTimeAgo(estimate.createdAt)}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {estimate.isNew && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleMarkAsRead(estimate.id)
                            }}
                            className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            title="Mark as read"
                          >
                            <CheckCheck className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(estimate.id)
                          }}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        {expandedId === estimate.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile time */}
                  <div className="sm:hidden mt-2 flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {getTimeAgo(estimate.createdAt)}
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedId === estimate.id && (
                  <div className="px-4 sm:px-6 pb-6 border-t border-gray-100 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Contact Info */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                          Contact Information
                        </h4>
                        <div className="space-y-2">
                          {estimate.phone && (
                            <a 
                              href={`tel:${estimate.phone}`}
                              className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors"
                            >
                              <Phone className="w-5 h-5 text-gray-400" />
                              {estimate.phone}
                            </a>
                          )}
                          {estimate.email && (
                            <a 
                              href={`mailto:${estimate.email}`}
                              className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors"
                            >
                              <Mail className="w-5 h-5 text-gray-400" />
                              {estimate.email}
                            </a>
                          )}
                          <div className="flex items-start gap-3 text-gray-700">
                            <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                            {estimate.address}
                          </div>
                        </div>
                      </div>

                      {/* Service Details */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                          Service Details
                        </h4>
                        <div className="space-y-2 text-gray-700">
                          {estimate.estimatedPrice && (
                            <div className="flex items-center gap-3">
                              <DollarSign className="w-5 h-5 text-primary" />
                              <span><strong>Estimated Price:</strong> <span className="text-primary font-bold">${estimate.estimatedPrice}</span></span>
                            </div>
                          )}
                          <div className="flex items-center gap-3">
                            <Sparkles className="w-5 h-5 text-gray-400" />
                            <span><strong>Service:</strong> {estimate.serviceTypeLabel}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Home className="w-5 h-5 text-gray-400" />
                            <span><strong>Rooms:</strong> {estimate.numberOfRooms}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Bath className="w-5 h-5 text-gray-400" />
                            <span><strong>Bathrooms:</strong> {estimate.numberOfBathrooms}</span>
                          </div>
                          {estimate.closetAreas.length > 0 && (
                            <div className="flex items-start gap-3">
                              <Package className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                              <span><strong>Add-ons:</strong> {estimate.closetAreas.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Scheduling */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                          Scheduling
                        </h4>
                        <div className="space-y-2 text-gray-700">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            <span><strong>Preferred Date:</strong> {formatPreferredDate(estimate.preferredDate)}</span>
                          </div>
                          {estimate.preferredTime && (
                            <div className="flex items-center gap-3">
                              <Clock className="w-5 h-5 text-gray-400" />
                              <span><strong>Preferred Time:</strong> {estimate.preferredTime}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Notes */}
                      {estimate.additionalNotes && (
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                            Additional Notes
                          </h4>
                          <div className="flex items-start gap-3 text-gray-700">
                            <FileText className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                            <p className="whitespace-pre-wrap">{estimate.additionalNotes}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Timestamp */}
                    <div className="mt-6 pt-4 border-t border-gray-100 text-sm text-gray-500">
                      Submitted: {formatDate(estimate.createdAt)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}


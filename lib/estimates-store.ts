import { promises as fs } from 'fs'
import path from 'path'

export interface EstimateRequest {
  id: string
  createdAt: string
  isNew: boolean
  fullName: string
  email: string
  phone: string
  address: string
  numberOfRooms: string
  numberOfBathrooms: string
  serviceType: string
  serviceTypeLabel: string
  closetsKitchen: boolean
  closetsBedroom: boolean
  closetsGarage: boolean
  closetsBasement: boolean
  closetsOther: boolean
  closetsOtherText?: string
  closetAreas: string[]
  preferredDate?: string
  additionalNotes?: string
}

// Map service type codes to readable names
export const serviceTypeLabels: Record<string, string> = {
  regular: 'Regular Cleaning',
  deep: 'Deep Cleaning',
  move: 'Move-in / Move-out',
  construction: 'Post-construction Cleaning',
  office: 'Office Cleaning',
}

// In-memory store (persists during serverless function warm instances)
let memoryStore: EstimateRequest[] = []
let isInitialized = false

// Path to the JSON file (works in development, uses /tmp on Vercel)
const getDataPath = () => {
  if (process.env.VERCEL) {
    return '/tmp/estimates.json'
  }
  return path.join(process.cwd(), 'data', 'estimates.json')
}

// Initialize store from file
async function initializeStore(): Promise<void> {
  if (isInitialized) return
  
  try {
    const dataPath = getDataPath()
    const data = await fs.readFile(dataPath, 'utf-8')
    memoryStore = JSON.parse(data)
    isInitialized = true
  } catch {
    // File doesn't exist yet, start with empty array
    memoryStore = []
    isInitialized = true
  }
}

// Save store to file
async function saveStore(): Promise<void> {
  try {
    const dataPath = getDataPath()
    
    // Ensure directory exists (for local development)
    if (!process.env.VERCEL) {
      const dir = path.dirname(dataPath)
      await fs.mkdir(dir, { recursive: true })
    }
    
    await fs.writeFile(dataPath, JSON.stringify(memoryStore, null, 2))
  } catch (error) {
    console.error('Error saving estimates:', error)
  }
}

// Generate unique ID
function generateId(): string {
  return `est_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

// Add a new estimate
export async function addEstimate(data: Omit<EstimateRequest, 'id' | 'createdAt' | 'isNew' | 'serviceTypeLabel' | 'closetAreas'>): Promise<EstimateRequest> {
  await initializeStore()
  
  // Build closet areas array
  const closetAreas: string[] = []
  if (data.closetsKitchen) closetAreas.push('Kitchen')
  if (data.closetsBedroom) closetAreas.push('Bedroom')
  if (data.closetsGarage) closetAreas.push('Garage')
  if (data.closetsBasement) closetAreas.push('Basement')
  if (data.closetsOther && data.closetsOtherText) {
    closetAreas.push(data.closetsOtherText)
  }
  
  const estimate: EstimateRequest = {
    ...data,
    id: generateId(),
    createdAt: new Date().toISOString(),
    isNew: true,
    serviceTypeLabel: serviceTypeLabels[data.serviceType] || data.serviceType,
    closetAreas,
  }
  
  // Add to beginning of array (most recent first)
  memoryStore.unshift(estimate)
  
  // Save to file
  await saveStore()
  
  return estimate
}

// Get all estimates
export async function getEstimates(): Promise<EstimateRequest[]> {
  await initializeStore()
  return memoryStore
}

// Mark estimate as read (not new)
export async function markAsRead(id: string): Promise<boolean> {
  await initializeStore()
  
  const estimate = memoryStore.find(e => e.id === id)
  if (estimate) {
    estimate.isNew = false
    await saveStore()
    return true
  }
  return false
}

// Mark all as read
export async function markAllAsRead(): Promise<void> {
  await initializeStore()
  
  memoryStore.forEach(e => {
    e.isNew = false
  })
  await saveStore()
}

// Delete an estimate
export async function deleteEstimate(id: string): Promise<boolean> {
  await initializeStore()
  
  const index = memoryStore.findIndex(e => e.id === id)
  if (index !== -1) {
    memoryStore.splice(index, 1)
    await saveStore()
    return true
  }
  return false
}

// Get count of new estimates
export async function getNewCount(): Promise<number> {
  await initializeStore()
  return memoryStore.filter(e => e.isNew).length
}


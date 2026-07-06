import { useState, useEffect, useCallback } from "react"
import emailjs from "@emailjs/browser"
import { toast } from "sonner"

const LEAD_STORAGE_KEY = "theaiexpert_lead"
const LEAD_EXPIRY_HOURS = 24

interface LeadData {
  name: string
  email: string
  timestamp: number
}

interface UseLeadCaptureOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

interface LeadCaptureReturn {
  // State
  isLeadCaptured: boolean
  leadData: LeadData | null
  showModal: boolean
  isSubmitting: boolean
  name: string
  email: string

  // Setters
  setName: (name: string) => void
  setEmail: (email: string) => void

  // Actions
  checkAndDownload: (resourceName: string, downloadUrl: string, leadSource: string) => void
  submitLead: (e: React.FormEvent, resourceName: string, downloadUrl: string, leadSource: string) => Promise<void>
  closeModal: () => void
  clearLead: () => void
}

function getStoredLead(): LeadData | null {
  try {
    const stored = localStorage.getItem(LEAD_STORAGE_KEY)
    if (!stored) return null

    const data: LeadData = JSON.parse(stored)
    const now = Date.now()
    const expiryTime = data.timestamp + (LEAD_EXPIRY_HOURS * 60 * 60 * 1000)

    // Check if expired
    if (now > expiryTime) {
      localStorage.removeItem(LEAD_STORAGE_KEY)
      return null
    }

    return data
  } catch {
    return null
  }
}

export function storeLead(name: string, email: string): void {
  const data: LeadData = {
    name,
    email,
    timestamp: Date.now()
  }
  localStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(data))
}

export async function sendLeadNotification(
  name: string,
  email: string,
  resourceName: string,
  leadSource: string,
  isReturningUser: boolean
): Promise<void> {
  emailjs.init("oI6t4dwMhBXNaBKXo")

  await emailjs.send(
    "theaiexpert_assessment",
    "template_dmkjg71",
    {
      from_name: name,
      from_email: email,
      company: "Not specified",
      downloaded_resource: resourceName,
      download_date: new Date().toLocaleString(),
      lead_type: isReturningUser ? "Returning User Download" : "New Lead Download",
      lead_source: leadSource,
    }
  )
}

export function useLeadCapture(options: UseLeadCaptureOptions = {}): LeadCaptureReturn {
  const [leadData, setLeadData] = useState<LeadData | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pendingDownload, setPendingDownload] = useState<{
    resourceName: string
    downloadUrl: string
    leadSource: string
  } | null>(null)

  // Check for existing lead on mount
  useEffect(() => {
    const stored = getStoredLead()
    if (stored) {
      setLeadData(stored)
    }
  }, [])

  const triggerDownload = useCallback((url: string) => {
    window.open(url, "_blank")
  }, [])

  const checkAndDownload = useCallback((
    resourceName: string,
    downloadUrl: string,
    leadSource: string
  ) => {
    const existingLead = getStoredLead()

    if (existingLead) {
      // Returning user - send notification silently and download immediately
      sendLeadNotification(
        existingLead.name,
        existingLead.email,
        resourceName,
        leadSource,
        true
      ).catch(console.error)

      toast.success("Your download is starting...")
      triggerDownload(downloadUrl)
    } else {
      // New user - show lead capture modal
      setPendingDownload({ resourceName, downloadUrl, leadSource })
      setShowModal(true)
    }
  }, [triggerDownload])

  const submitLead = useCallback(async (
    e: React.FormEvent,
    resourceName: string,
    downloadUrl: string,
    leadSource: string
  ) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send lead notification
      await sendLeadNotification(name, email, resourceName, leadSource, false)

      // Store lead data for 24 hours
      storeLead(name, email)
      setLeadData({ name, email, timestamp: Date.now() })

      // Close modal and reset form
      setShowModal(false)
      setName("")
      setEmail("")
      setPendingDownload(null)

      // Success notification and download
      toast.success("Thank you! Your download is starting...")
      triggerDownload(downloadUrl)

      options.onSuccess?.()
    } catch (error) {
      console.error("Lead submission error:", error)
      toast.error("Something went wrong. Please try again.")
      options.onError?.(error as Error)
    } finally {
      setIsSubmitting(false)
    }
  }, [name, email, triggerDownload, options])

  const closeModal = useCallback(() => {
    setShowModal(false)
    setName("")
    setEmail("")
    setPendingDownload(null)
  }, [])

  const clearLead = useCallback(() => {
    localStorage.removeItem(LEAD_STORAGE_KEY)
    setLeadData(null)
  }, [])

  return {
    isLeadCaptured: !!leadData,
    leadData,
    showModal,
    isSubmitting,
    name,
    email,
    setName,
    setEmail,
    checkAndDownload,
    submitLead: (e: React.FormEvent, resourceName?: string, downloadUrl?: string, leadSource?: string) => {
      // Use pending download data if not provided directly
      const rn = resourceName || pendingDownload?.resourceName || ""
      const du = downloadUrl || pendingDownload?.downloadUrl || ""
      const ls = leadSource || pendingDownload?.leadSource || ""
      return submitLead(e, rn, du, ls)
    },
    closeModal,
    clearLead
  }
}

// Re-export a modal component for consistency
export { LeadCaptureModal } from "@/components/LeadCaptureModal"

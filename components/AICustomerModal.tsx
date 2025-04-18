"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm'

interface AICustomerModalProps {
  customerId: string
  customerName: string
}

export function AICustomerModal({ customerId, customerName }: AICustomerModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [aiResponse, setAiResponse] = useState("")

  const fetchAIInsights = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/customers/${customerId}/ai-insights`)
      if (!response.ok) throw new Error("Failed to fetch AI insights")
      const data = await response.json()
      console.log(data);
      setAiResponse(data.output)
    } catch (error) {
      console.error("Error fetching AI insights:", error)
      setAiResponse("Failed to load AI insights. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => {
          setOpen(true)
          fetchAIInsights()
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>AI Insights for {customerName}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div className="prose dark:prose-invert max-w-none overflow-auto max-h-[60vh] pr-4 pb-4">
                <div className="min-w-[600px]">
                  <ReactMarkdown remarkPlugins={[[remarkGfm, {singleTilde: false}]]}>{aiResponse}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 
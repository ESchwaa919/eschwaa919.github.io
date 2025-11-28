import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Download, Rocket } from "lucide-react"

interface LeadCaptureModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
  isSubmitting: boolean
  name: string
  email: string
  onNameChange: (name: string) => void
  onEmailChange: (email: string) => void
  title?: string
  resourceName?: string
  buttonText?: string
  buttonIcon?: "download" | "rocket"
}

export function LeadCaptureModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  name,
  email,
  onNameChange,
  onEmailChange,
  title = "DOWNLOAD RESOURCE",
  resourceName,
  buttonText = "Download Now",
  buttonIcon = "download"
}: LeadCaptureModalProps) {
  if (!isOpen) return null

  const Icon = buttonIcon === "rocket" ? Rocket : Download

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-card border-2 border-primary shadow-cyber max-w-md w-full">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-heading text-primary">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-border flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <p className="text-muted-foreground mb-6">
            Enter your details to access{" "}
            {resourceName && (
              <strong className="text-foreground">{resourceName}</strong>
            )}
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="lead-name" className="text-sm text-foreground mb-2 block">
                Name *
              </label>
              <Input
                id="lead-name"
                type="text"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                required
                className="bg-background border-border"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="lead-email" className="text-sm text-foreground mb-2 block">
                Email *
              </label>
              <Input
                id="lead-email"
                type="email"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                required
                className="bg-background border-border"
                placeholder="your.email@company.com"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-green font-semibold py-6"
            >
              {isSubmitting ? "Processing..." : buttonText}
              {!isSubmitting && <Icon className="ml-2 w-4 h-4" />}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              We respect your privacy. No spam, ever.
            </p>
          </form>
        </div>
      </Card>
    </div>
  )
}

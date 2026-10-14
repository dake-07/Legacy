import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface PartnerDialogProps {
  open: boolean
  labelledBy: string
  onClose: () => void
  children: ReactNode
  className?: string
}

export function PartnerDialog({ open, labelledBy, onClose, children, className = '' }: PartnerDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    if (!open || !dialog) return
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const overflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = overflow
      if (!document.querySelector('dialog[open]') && opener?.isConnected) opener.focus()
    }
  }, [open])
  return createPortal(
    <dialog ref={ref} aria-labelledby={labelledBy} aria-modal="true"
      onCancel={event => { event.preventDefault(); onClose() }}
      onClick={event => { if (event.target === event.currentTarget) onClose() }}
      className={`partner-dialog m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] overflow-y-auto overscroll-contain rounded-2xl border p-0 shadow-2xl backdrop:bg-black/75 backdrop:backdrop-blur-sm ${className || 'max-w-xl border-gray-200 bg-white text-gray-900'}`}>
      <div>{children}</div>
    </dialog>, document.body,
  )
}

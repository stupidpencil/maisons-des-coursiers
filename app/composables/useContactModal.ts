// Fenêtre de contact unique : tous les boutons « Écrire à l'équipe » l'ouvrent,
// avec un objet de message conseillé. Elle affiche l'adresse à copier, sans formulaire.
export function useContactModal() {
  const open = useState('contact-modal-open', () => false)
  const subject = useState<string | undefined>('contact-modal-subject', () => undefined)
  return {
    open,
    subject,
    openContact: (s?: string) => {
      subject.value = s
      open.value = true
    }
  }
}

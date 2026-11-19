// Mini-balisage pour les textes des guides :
//   **gras**           -> <strong>
//   [[Nom du bouton]]  -> pastille qui imite un bouton de l'application
export type RichPart = { type: 'text' | 'bold' | 'button', value: string }

export function richParts(text: string): RichPart[] {
  return text
    .split(/(\[\[.+?\]\]|\*\*.+?\*\*)/g)
    .filter(Boolean)
    .map((p): RichPart => {
      if (p.startsWith('[[')) return { type: 'button', value: p.slice(2, -2) }
      if (p.startsWith('**')) return { type: 'bold', value: p.slice(2, -2) }
      return { type: 'text', value: p }
    })
}

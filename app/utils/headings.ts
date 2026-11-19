// Décale d'un ou plusieurs niveaux tous les titres d'une page Nuxt Content (h2 -> h3,
// h3 -> h4, …, plafonné à h6). Dans une modale, le titre de la modale est le h2 : les
// titres du contenu doivent donc être des h3 ou moins. Le contenu d'origine n'est pas modifié.
type MinimarkNode = string | [string, Record<string, unknown>, ...MinimarkNode[]]

function shiftNode(node: MinimarkNode, by: number): MinimarkNode {
  if (typeof node === 'string') return node
  const [tag, props, ...children] = node
  const match = /^h([1-6])$/.exec(tag)
  const newTag = match ? `h${Math.min(6, Number(match[1]) + by)}` : tag
  return [newTag, props, ...children.map(c => shiftNode(c, by))]
}

export function shiftHeadings<T extends { body?: any }>(page: T, by = 1): T {
  const value = page?.body?.value
  if (!Array.isArray(value)) return page
  return { ...page, body: { ...page.body, value: value.map((n: MinimarkNode) => shiftNode(n, by)) } }
}

// Transforme le premier paragraphe d'une page (s'il ouvre le contenu, avant tout titre)
// en encadré d'introduction (composant IntroNote). Le contenu d'origine n'est pas modifié.
export function introAsNote<T extends { body?: any }>(page: T): T {
  const value = page?.body?.value
  if (!Array.isArray(value) || !Array.isArray(value[0]) || value[0][0] !== 'p') return page
  const [, props, ...children] = value[0] as [string, Record<string, unknown>, ...MinimarkNode[]]
  return { ...page, body: { ...page.body, value: [['intro-note', props, ...children], ...value.slice(1)] } }
}

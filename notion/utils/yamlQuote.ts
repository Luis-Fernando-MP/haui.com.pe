/** Valor YAML entre comillas simples (escapa `'` y colapsa saltos). */
export function yamlQuote(value: string | number | null | undefined) {
  if (value == null) return "''"
  return `'${String(value).replace(/\r?\n/g, ' ').replace(/'/g, "''")}'`
}

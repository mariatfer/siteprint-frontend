type UrlBase = 'productos' | 'ayudas' | 'politicas'

export const useAppUrls = () => {
  const baseUrls: Record<UrlBase, string> = {
    productos: '/productos',
    ayudas: '/ayudas',
    politicas: '/politicas',
  }

  const buildUrl = (base: UrlBase, slug?: string): string => {
    const basePath = baseUrls[base]
    return slug ? `${basePath}/${slug}`.replace(/\/+/g, '/') : basePath
  }

  return {
    productUrl: (slug?: string) => buildUrl('productos', slug),
    helpUrl: (slug?: string) => buildUrl('ayudas', slug),
    policyUrl: (slug?: string) => buildUrl('politicas', slug),
    buildUrl,
    base: baseUrls,
  }
}

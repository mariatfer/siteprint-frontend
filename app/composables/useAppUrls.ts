type UrlBase = 'productos'

export const useAppUrls = () => {
  const baseUrls: Record<UrlBase, string> = {
    productos: '/productos',
  }

  const buildUrl = (base: UrlBase, slug?: string): string => {
    const basePath = baseUrls[base]
    return slug ? `${basePath}/${slug}`.replace(/\/+/g, '/') : basePath
  }

  return {
    productUrl: (slug?: string) => buildUrl('productos', slug),
    buildUrl,
    base: baseUrls,
  }
}

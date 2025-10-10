type UrlBase = 'products' | 'helps' | 'policys'

export const useAppUrls = () => {
  const baseUrls: Record<UrlBase, string> = {
    products: '/productos',
    helps: '/ayudas',
    policys: '/politicas',
  }

  const buildUrl = (base: UrlBase, slug?: string): string => {
    const basePath = baseUrls[base]
    return slug ? `${basePath}/${slug}`.replace(/\/+/g, '/') : basePath
  }

  return {
    productUrl: (slug?: string) => buildUrl('products', slug),
    helpUrl: (slug?: string) => buildUrl('helps', slug),
    policyUrl: (slug?: string) => buildUrl('policys', slug),
    buildUrl,
    base: baseUrls,
  }
}

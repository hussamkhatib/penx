import { editorDefaultValue } from '@/app/(creator-fi)/constants'
import { prisma } from '@/lib/prisma'
import { getUrl } from '@/lib/utils'
import { Site } from '@penxio/types'
import { AuthType, StorageProvider } from '@prisma/client'

export async function getSite() {
  const site = await prisma.site.findFirst()

  if (!site) {
    return {
      name: 'Site Name',
      description: 'Description of your site',
      about: editorDefaultValue,
      logo: 'https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/JRajRyC-PhBHEinQkupt02jqfKacBVHLWJq7Iy.png',
      font: '',
      image: '',
      socials: {},
      config: {},
      authType: AuthType.REOWN,
      storageProvider: StorageProvider.IPFS,
    } as any as Site
  }

  function getAbout() {
    if (!site?.about) return editorDefaultValue
    try {
      return JSON.parse(site.about)
    } catch (error) {
      return editorDefaultValue
    }
  }

  return {
    ...site,
    logo: getUrl(site.logo || ''),
    image: getUrl(site.image || ''),
    about: getAbout(),
  } as any as Site
}

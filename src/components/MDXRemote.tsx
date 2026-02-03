'use client'

import { MDXRemote as MDXRemoteComponent } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useEffect, useState } from 'react'
import { GoogleMap, StravaEmbed, YouTube, Gallery } from './embeds'
import Image from 'next/image'

const components = {
  GoogleMap,
  StravaEmbed,
  YouTube,
  Gallery,
  img: (props: React.ComponentPropsWithoutRef<'img'>) => {
    const { src, alt } = props
    if (!src || typeof src !== 'string') return null
    return (
      <span className="block my-6">
        <Image
          src={src}
          alt={alt || ''}
          width={800}
          height={450}
          className="rounded-lg w-full h-auto"
        />
      </span>
    )
  },
}

interface MDXRemoteProps {
  source: string
}

export function MDXRemote({ source }: MDXRemoteProps) {
  const [mdxSource, setMdxSource] = useState<Awaited<ReturnType<typeof serialize>> | null>(null)

  useEffect(() => {
    serialize(source).then(setMdxSource)
  }, [source])

  if (!mdxSource) {
    return <div className="animate-pulse bg-gray-100 h-64 rounded-lg" />
  }

  return <MDXRemoteComponent {...mdxSource} components={components} />
}

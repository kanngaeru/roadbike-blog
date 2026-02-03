import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPostsByCategory, getCategoryName } from '@/lib/posts'

const categories = ['routes', 'gear', 'maintenance', 'events', 'training', 'beginners']

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return categories.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const categoryName = getCategoryName(slug)
  return {
    title: categoryName,
    description: `${categoryName}の記事一覧`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params

  if (!categories.includes(slug)) {
    notFound()
  }

  const categoryName = getCategoryName(slug)
  const posts = await getPostsByCategory(slug)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryName}</h1>
      <p className="text-gray-500 mb-8">{posts.length}件の記事</p>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/posts/${post.slug}`}>
                <div className="aspect-video relative overflow-hidden rounded-lg bg-gray-100 mb-4">
                  {post.thumbnail ? (
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <time>{post.date}</time>
                  </div>
                  <h2 className="font-bold text-gray-900 group-hover:text-primary-600 transition line-clamp-2">
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {post.description}
                    </p>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p>このカテゴリにはまだ記事がありません。</p>
        </div>
      )}
    </div>
  )
}

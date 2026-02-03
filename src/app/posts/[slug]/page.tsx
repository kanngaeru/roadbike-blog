import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { MDXRemote } from '@/components/MDXRemote'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link
            href={`/category/${post.categorySlug}`}
            className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full hover:bg-primary-100 transition"
          >
            {post.category}
          </Link>
          <time>{post.date}</time>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="text-sm text-gray-500 hover:text-primary-600 transition"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Thumbnail */}
      {post.thumbnail && (
        <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="prose">
        <MDXRemote source={post.content} />
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <Link
          href="/posts"
          className="text-primary-600 hover:text-primary-700 transition"
        >
          ← 記事一覧に戻る
        </Link>
      </footer>
    </article>
  )
}

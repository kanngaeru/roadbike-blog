import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/posts'

const categories = [
  { name: 'ライドルート', slug: 'routes', description: '実際に走ったおすすめコース' },
  { name: '機材レビュー', slug: 'gear', description: '使っている機材の正直な感想' },
  { name: 'メンテナンス', slug: 'maintenance', description: '自分でできる整備・修理' },
  { name: 'イベント', slug: 'events', description: 'ライドイベントのレポート' },
  { name: 'トレーニング', slug: 'training', description: '練習方法と成長の記録' },
  { name: '初心者ガイド', slug: 'beginners', description: '始める前に知りたかったこと' },
]

export default async function Home() {
  const posts = await getAllPosts()
  const recentPosts = posts.slice(0, 6)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {/* 背景画像: public/images/hero.jpg に配置してください */}
        <Image
          src="/images/hero.jpg"
          alt="ロードバイクの風景"
          fill
          className="object-cover"
          priority
        />
        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Roadbike Blog
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            ロードバイク初心者のための、リアルな体験記。<br className="hidden md:inline" />
            走って、学んで、楽しむサイクルライフ。
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">カテゴリ</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group p-6 bg-white border border-gray-100 rounded-lg hover:border-primary-200 hover:shadow-md transition"
            >
              <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition mb-2">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">最新の記事</h2>

        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
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
                      <span className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded">
                        {post.category}
                      </span>
                      <time>{post.date}</time>
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition line-clamp-2">
                      {post.title}
                    </h3>
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
            <p>まだ記事がありません。</p>
            <p className="text-sm mt-2">最初の記事を書いてみましょう！</p>
          </div>
        )}

        {posts.length > 6 && (
          <div className="text-center mt-8">
            <Link
              href="/posts"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              すべての記事を見る
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}

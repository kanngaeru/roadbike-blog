import Link from 'next/link'

const categories = [
  { name: 'ライドルート', slug: 'routes' },
  { name: '機材レビュー', slug: 'gear' },
  { name: 'メンテナンス', slug: 'maintenance' },
  { name: 'イベント', slug: 'events' },
  { name: 'トレーニング', slug: 'training' },
  { name: '初心者ガイド', slug: 'beginners' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Roadbike Blog</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              ロードバイク初心者に向けて、実際のライド体験を通じた情報を発信しています。
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">カテゴリ</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-sm text-gray-600 hover:text-primary-600 transition"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">リンク</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-primary-600 transition"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Roadbike Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

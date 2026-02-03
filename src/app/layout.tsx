import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans',
})

export const metadata: Metadata = {
  title: {
    default: 'Roadbike Blog',
    template: '%s | Roadbike Blog',
  },
  description: 'ロードバイク初心者のためのサイクリングブログ。ライドルート、機材レビュー、メンテナンス情報などを発信。',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'Roadbike Blog',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} font-sans antialiased bg-white`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

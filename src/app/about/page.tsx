export const metadata = {
  title: 'About',
  description: 'このブログについて',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">About</h1>

      <div className="prose">
        <h2>このブログについて</h2>
        <p>ロードバイク初心者のための情報発信サイトです！</p>
        <p>実際に走った体験をもとに、ライドルート、機材、メンテナンス、トレーニングなどの情報を発信しています！</p>

        <h2>カテゴリ</h2>
        <ul>
          <li><strong>ライドルート</strong> - 実際に走ったおすすめコースの紹介</li>
          <li><strong>機材レビュー</strong> - 使っている機材の正直な感想</li>
          <li><strong>メンテナンス</strong> - 自分でできる整備・修理の記録</li>
          <li><strong>イベント</strong> - ライドイベントのレポート</li>
          <li><strong>トレーニング</strong> - 練習方法と成長の記録</li>
          <li><strong>初心者ガイド</strong> - 始める前に知りたかったこと</li>
        </ul>

        <h2>運営者について</h2>
        <p>
          {/* ここに自己紹介を書いてください */}
          <p>ロードバイクを趣味にしたい！と始めた新米サイクリストです！</p>
          <p>日々のサイクリングを記録として残しつつ、魅力を最大限伝えられるようにがんばります！</p>
          <p>少しでも多くの方がサイクリングを楽しめる社会に…！</p>
        </p>
      </div>
    </div>
  )
}

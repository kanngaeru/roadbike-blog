interface YouTubeProps {
  videoId: string
  title?: string
}

export default function YouTube({ videoId, title = 'YouTube Video' }: YouTubeProps) {
  return (
    <div className="my-6">
      <div className="aspect-video rounded-lg overflow-hidden shadow-sm">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  )
}

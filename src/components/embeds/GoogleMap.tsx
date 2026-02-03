interface GoogleMapProps {
  src: string
  title?: string
}

export default function GoogleMap({ src, title = 'Google Map' }: GoogleMapProps) {
  return (
    <div className="my-6">
      <div className="aspect-video rounded-lg overflow-hidden shadow-sm">
        <iframe
          src={src}
          title={title}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}

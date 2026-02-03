interface StravaEmbedProps {
  activityId: string
}

export default function StravaEmbed({ activityId }: StravaEmbedProps) {
  return (
    <div className="my-6">
      <div className="rounded-lg overflow-hidden shadow-sm">
        <iframe
          height="405"
          width="100%"
          style={{ border: 0 }}
          src={`https://www.strava.com/activities/${activityId}/embed/${activityId}`}
          loading="lazy"
          allowFullScreen
        />
      </div>
    </div>
  )
}

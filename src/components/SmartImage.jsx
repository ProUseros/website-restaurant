import { useState } from 'react'

export default function SmartImage({
  src,
  alt,
  className = '',
  imageClassName = '',
  priority = false,
  label,
}) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className={`placeholder-visual ${className}`} role="img" aria-label={alt}>
        {label ? <span>{label}</span> : null}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      className={`h-full w-full object-cover ${className} ${imageClassName}`}
      onError={() => setFailed(true)}
    />
  )
}

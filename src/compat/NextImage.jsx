export default function NextImage({
  src,
  alt = '',
  fill = false,
  priority,
  unoptimized,
  className = '',
  style,
  ...props
}) {
  void unoptimized
  const fillStyles = fill
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }
    : undefined

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : props.loading}
      fetchPriority={priority ? 'high' : undefined}
      style={{ ...fillStyles, ...style }}
      {...props}
    />
  )
}

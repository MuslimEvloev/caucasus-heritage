import { useState } from 'react';
import './SmartImage.css';

/**
 * SmartImage — изображение с аккуратным запасным вариантом.
 * Если файл не загрузился, вместо «битой» картинки показывается
 * мягкий градиент с названием объекта.
 */
export default function SmartImage({ src, alt = '', name = '', className = '', variant = 'default' }) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div
        className={`smart-image smart-image--fallback smart-image--${variant} ${className}`}
        role="img"
        aria-label={alt || name}
      >
        <span className="smart-image__label">{name || alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || name}
      className={`smart-image ${className}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

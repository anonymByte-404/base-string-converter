import React from "react"

export default function FeatureCard({
  title,
  description,
  isActive,
  onMouseOver,
}) {
  return (
    <div
      className={`feature-content ${isActive ? 'active-feature' : ''}`}
      onMouseOver={onMouseOver}
    >
      <div className="upper-feature">
        <div className="logo-container">&lt;/&gt;</div>
      </div>
      <div className="lower-feature">
        <h3>{title}</h3>
        <hr />
        <p>{description}</p>
      </div>
    </div>
  )
}

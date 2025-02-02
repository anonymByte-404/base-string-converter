document.addEventListener('DOMContentLoaded', () => {
  const featureContent = document.querySelectorAll('.feature-content')
  let activeFeatureIndex = null

  featureContent.forEach((feature, index) => {
    feature.addEventListener('mouseover', () => {
      if (activeFeatureIndex !== index) {
        featureContent.forEach((fc) => fc.classList.remove('active-feature'))
        feature.classList.add('active-feature')
        activeFeatureIndex = index
      }
    })
  })
})

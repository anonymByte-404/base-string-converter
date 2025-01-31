document.addEventListener('DOMContentLoaded', () => {
  const featureContent = document.querySelectorAll('.feature-content')
  let activeFeatureIndex = null

  featureContent.forEach((feature, index) => {
    console.log(`Adding event listener to feature ${index + 1}`)

    feature.addEventListener('mouseover', () => {
      console.log(`Mouseover triggered on feature ${index + 1}`)

      if (activeFeatureIndex !== index) {
        featureContent.forEach((fc) => fc.classList.remove('active-feature'))
        feature.classList.add('active-feature')
        activeFeatureIndex = index
      }
    })
  })
})

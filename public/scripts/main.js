const featureContents = document.querySelectorAll('.feature-contents')

featureContents.forEach(feature => {
  feature.addEventListener('mouseover', (event) => {
    event.preventDefault()
    featureContents.forEach(fc => fc.classList.remove('active-feature'))
    feature.classList.add('active-feature')
  })
})
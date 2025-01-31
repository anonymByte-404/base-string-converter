const featureContent = document.querySelectorAll('.feature-content')

featureContent.forEach((feature) => {
  feature.addEventListener('mouseover', (event) => {
    event.preventDefault()
    featureContent.forEach((fc) => fc.classList.remove('active-feature'))
    feature.classList.add('active-feature')
  })
})

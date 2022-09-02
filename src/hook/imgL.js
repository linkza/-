const callback = (entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.setAttribute('src', e.target.getAttribute('data-url'))
      observer.unobserve(e.target)
    }
  })
}
const observer = new IntersectionObserver(callback)
const imgl = {
  mounted(el) {
    observer.observe(el)
  }
}
export default imgl

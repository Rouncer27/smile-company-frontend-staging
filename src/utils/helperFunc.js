export const createSlug = url => {
  const slug = url
    .split("/")
    .filter(part => {
      if (
        part !== "" &&
        part !== "http:" &&
        part !== "https:" &&
        part !== "localhost"
      )
        return part
    })
    .filter((slug, index) => {
      if (index !== 0) return slug
    })
    .join("/")

  return slug === "home" ? "/" : slug
}

export const getRandomRum = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const wordSpiltter = (sent, chartPerLine) => {
  const words = sent.split(" ")
  let lineLength = 0
  const sententance = words.map(word => {
    if (lineLength === 0) {
      lineLength = lineLength + word.length
      return `<span>${word}`
    } else if (lineLength <= chartPerLine) {
      lineLength = lineLength + word.length
      return `${word}`
    } else {
      lineLength = 0
      return `${word}</span>`
    }
  })

  const newSententance = sententance.join(" ")
  return newSententance
}

export const getMaxHeight = elements => {
  let max = 0
  elements.forEach(el => (max = el.scrollHeight > max ? el.scrollHeight : max))
  return max
}

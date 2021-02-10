export const standardWrapper = `
display: flex;
flex-wrap: wrap;
justify-content: center;
width: 100%;
max-width: 45rem;
margin: 0 auto;
padding: 2rem;

@media (min-width: 768px) {
  max-width: 90rem;
}

@media (min-width: 1025px) {
  max-width: 100rem;
}

@media (min-width: 1200px) {
  max-width: 105rem;
}
@media (min-width: 1600px) {
  max-width: 110rem;
}
`

export const medWrapper = `
display: flex;
flex-wrap: wrap;
justify-content: center;
width: 100%;
max-width: 45rem;
margin: 0 auto;
padding: 2rem;

@media (min-width: 768px) {
  max-width: 90rem;
}

@media (min-width: 1025px) {
  max-width: 110rem;
}

@media (min-width: 1200px) {
  max-width: 125rem;
}

@media (min-width: 1600px) {
  max-width: 150rem;
}
`

export const BigWrapper = `
display: flex;
flex-wrap: wrap;
justify-content: center;
width: 100%;
max-width: 45rem;
margin: 0 auto;
padding: 2rem;

@media (min-width: 768px) {
  max-width: 90rem;
}

@media (min-width: 1025px) {
  max-width: 110rem;
}

@media (min-width: 1200px) {
  max-width: 150rem;
}

@media (min-width: 1600px) {
  max-width: 175rem;
}
`

import { css } from "styled-components"

export default css`
  width: calc(100% - 5rem);
  max-width: 75rem;
  margin-right: auto;
  margin-left: auto;
  padding: 2rem;

  @media (min-width: 768px) {
    margin-right: 0;
    margin-left: 5rem;
    padding: 5rem 0;
  }
`

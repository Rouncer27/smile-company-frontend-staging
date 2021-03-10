import { css } from "styled-components"
import { colors } from "../../../../styles/helpers"

export default css`
  display: flex;
  align-self: stretch;
  justify-content: center;
  position: relative;
  background-color: ${colors.colorAlt};
  width: 100%;

  @media (min-width: 768px) {
    width: calc(30vw);
  }
`

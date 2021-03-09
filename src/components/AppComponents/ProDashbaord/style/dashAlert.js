import { css } from "styled-components"
import { colors, Nav1CharcoalGrey } from "../../../../styles/helpers"

export default css`
  width: 100%;

  .alertIndicator {
    display: block;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    background-color: #ff7200;
    color: ${colors.black} !important;
    text-align: center;
  }

  p {
    ${Nav1CharcoalGrey};
    margin-top: 1.5rem;

    &:hover {
      color: ${colors.colorAlt};
      cursor: inherit;
    }
  }
`

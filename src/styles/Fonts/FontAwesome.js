import * as fontawesome from "./font-awesome"
import { css } from "styled-components"

const FontAwesome = css`
  @font-face {
    font-family: "FontAwesome";
    font-style: normal;
    font-weight: normal;
    src: url("${fontawesome.FontAwesomeWOFF}") format("woff2"),
      url("${fontawesome.FontAwesomeWOFF2}") format("woff");
  }
`

export default FontAwesome

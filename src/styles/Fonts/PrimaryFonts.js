import * as primary from "./primary"
import { css } from "styled-components"

const PrimaryFonts = css`
  @font-face {
    font-family: "Lora";
    font-style: normal;
    font-weight: 400;
    src: local(""), url("${primary.WOFF2_4}") format("woff2"),
      url("${primary.WOFF_4}") format("woff");
  }

  @font-face {
    font-family: "Lora";
    font-style: italic;
    font-weight: 400;
    src: local(""), url("${primary.WOFF2_4I}") format("woff2"),
      url("${primary.WOFF_4I}") format("woff");
  }

  @font-face {
    font-family: "Lora";
    font-style: normal;
    font-weight: 700;
    src: local(""), url("${primary.WOFF2_7}") format("woff2"),
      url("${primary.WOFF_7}") format("woff");
  }

  @font-face {
    font-family: "Lora";
    font-style: italic;
    font-weight: 700;
    src: local(""), url("${primary.WOFF2_7I}") format("woff2"),
      url("${primary.WOFF_7I}") format("woff");
  }
`

export default PrimaryFonts

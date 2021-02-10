import { createGlobalStyle } from "styled-components"
import styledNormalize from "styled-normalize"
import theme from "../theme/Theme"

import FontAwesome from "../Fonts/FontAwesome"
import PrimaryFonts from "../Fonts/PrimaryFonts"
import SecondaryFonts from "../Fonts/SecondaryFonts"

import { fontSizer } from "../helpers/index"

const GlobalStyle = createGlobalStyle`
/* Browser Reset */
${styledNormalize}
/* Fonts */
${FontAwesome}
${PrimaryFonts}
${SecondaryFonts}

:root {
    --primary: #6b516d;
    --secondary: #ad89a6;
    --tertiary: #8c9f8a;
    --accent: #dae3d9;
    --shadow: #d0ccca;
    --alt: #2f2b31;
    --brown: #454545;
    --black: #0d0d0d;
    --white: #fff;
    --grey: #e3e1e2;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
    overflow-x: hidden !important;
  }

  body {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-size: 1.6rem;
    font-family: ${theme.fontPrimary};
    font-weight: normal;
    letter-spacing: 0.1rem;
    line-height: 1.5;
    overflow-x: hidden !important;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    font-family: ${theme.fontSecondary};
    font-size: 1.8rem;
    font-weight: normal;
    line-height: ${theme.baseLineHeight};
  }
  h1 {
    ${fontSizer(3.2, 5.6, 76.8, 120)}
  }

h2 {
  ${fontSizer(2.6, 4.6, 76.8, 120)}
  }

h3 {
  ${fontSizer(2.2, 3.4, 76.8, 120)}
}

h4 {
  ${fontSizer(2, 2.8, 76.8, 120)}
}

h5 {
  ${fontSizer(2, 2.4, 76.8, 120)}
}

h6 {
  ${fontSizer(1.8, 2.2, 76.8, 120)}
}

p {
  ${fontSizer(1.8, 2, 76.8, 120)}
  margin: 0;
  margin-bottom: 1.5em;
  line-height: 1.4;
}

a {
  ${fontSizer(1.8, 2, 76.8, 120)}
  text-decoration: none;
  color: ${props => props.theme.colorPrimary};
  font-weight: normal;
  transition: all 0.3s ease;
}

a:hover {
	color: ${props => props.theme.colorSecondary}
}

span {
  font-size: 1em;
}

ul,
li {
  margin: 0;
  padding: 0;
  font-size: 1.8rem;
  list-style-type: none;
}

img {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
}

`

export default GlobalStyle

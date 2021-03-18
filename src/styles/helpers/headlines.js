import { colors } from "./index"
import { fonts, fontSizer } from "./index"
import { css } from "styled-components"

// Headline Styles #1 //
export const H1Base = css`
  ${fontSizer(2.8, 3.6, 76.8, 150, 3.0)};
  font-family: ${fonts.fontSecondary};
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.31;
  letter-spacing: normal;
`
export const H1DarkPurple = css`
  ${H1Base};
  color: ${colors.colorPrimary};
`

export const H1Lavender = css`
  ${H1Base};
  color: ${colors.colorSecondary};
`

export const H1CharcoalGrey = css`
  ${H1Base};
  color: ${colors.colorAlt};
`

export const H1White = css`
  ${H1Base};
  color: ${colors.white};
`

// Headline Styles #2 //
export const H2Base = css`
  ${fontSizer(2, 3.3, 76.8, 150, 2.4)}
  font-family: ${fonts.fontSecondary};
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.3;
  letter-spacing: normal;
`

export const H2Lavender = css`
  ${H2Base};
  color: ${colors.colorSecondary};
`

export const H2DarkPurple = css`
  ${H2Base};
  color: ${colors.colorPrimary};
`

export const H2White = css`
  ${H2Base};
  color: ${colors.white};
`

// Headline Styles #3 //
export const H3Base = css`
  ${fontSizer(2, 3, 76.8, 150, 2.2)}
  font-family: ${fonts.fontSecondary};
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.47;
  letter-spacing: normal;
`

export const H3CharcoalGrey = css`
  ${H3Base};
  color: ${colors.colorAlt};
`

// Headline Styles #4 //
export const H4Base = css`
  ${fontSizer(2, 2.4, 76.8, 160, 2)};
  font-family: ${fonts.fontPrimary};
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.42;
  letter-spacing: normal;
`

export const H4White = css`
  ${H4Base};
  color: ${colors.white};
`

export const H4DarkPurple = css`
  ${H4Base};
  color: ${colors.colorPrimary};
`

export const H4CharcoalGrey = css`
  ${H4Base};
  color: ${colors.colorAlt};
`

export const H4Lavender = css`
  ${H4Base};
  color: ${colors.colorSecondary};
`

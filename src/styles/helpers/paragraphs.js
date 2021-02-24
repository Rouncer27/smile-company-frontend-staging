import { colors } from "./index"
import { fonts, fontSizer } from "./index"
import { css } from "styled-components"

// Body copy ONE //
export const B1Base = css`
  ${fontSizer(1.6, 1.8, 76.8, 150, 1.6)};
  font-family: ${fonts.fontPrimary};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.61;
  letter-spacing: normal;
`

export const B1CharcoalGrey = css`
  ${B1Base};
  color: ${colors.colorAlt};
`

export const B1White = css`
  ${B1Base};
  color: ${colors.white};
`

export const B1Sage = css`
  ${B1Base};
  color: ${colors.colorTertiary};
`

// Body copy TWO //
export const B2Base = css`
  ${fontSizer(1.4, 1.6, 76.8, 150, 1.4)};
  font-family: ${fonts.fontPrimary};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
`

export const B2CharcoalGrey = css`
  ${B2Base};
  color: ${colors.colorAlt};
`

export const B2White = css`
  ${B2Base};
  color: ${colors.white};
`

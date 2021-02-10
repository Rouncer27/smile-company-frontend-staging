import { colors } from "./index"
import { fonts, fontSizer } from "./index"

export const Nav1Base = `
  ${fontSizer(1.4, 1.4, 76.8, 150, 1.6)};
  font-family: ${fonts.fontSecondary};
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.23;
  letter-spacing: normal;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${colors.colorSecondary};
  }
`

export const Nav1Lavender = `
  ${Nav1Base};
  color: ${colors.colorSecondary};
`

export const Nav1White = `
  ${Nav1Base};
  color: ${colors.white};
`

export const Nav1CharcoalGrey = `
  ${Nav1Base};
  color: ${colors.colorAlt};
`

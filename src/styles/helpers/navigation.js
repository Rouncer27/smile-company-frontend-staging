import { colors } from "./index"
import { fonts, fontSizer } from "./index"

export const Nav1Base = `
  ${fontSizer(1.4, 1.4, 76.8, 150, 1.8)};
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

export const Nav2Base = `
  ${fontSizer(1.6, 1.8, 76.8, 150, 1.8)};
  font-family: ${fonts.fontSecondary};
  ont-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.67;
  letter-spacing: normal;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${colors.colorSecondary};
  }
`

export const Nav2DarkPurple = `
  ${Nav2Base};
  color: ${colors.colorPrimary};
`

export const Nav2Lavender = `
  ${Nav2Base};
  color: ${colors.colorSecondary};
`

export const Nav2White = `
  ${Nav2Base};
  color: ${colors.white};
`

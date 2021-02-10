import themeColors from "./ThemeColors"
import themeSize from "./ThemeSize"
import themeFonts from "./ThemeFonts"

const {
  colorPrimary,
  colorSecondary,
  colorTertiary,
  colorAccent,
  colorShad,
  colorAlt,
  white,
  grey,
  greyMed,
  greyBrown,
  black,
  strongred,
} = themeColors
const { maxWidth, bpTablet, bpDesksm, bpDeskmd, bpDesklg, bpMax } = themeSize
const { fontPrimary, fontSecondary, fontAwesome, baseLineHeight } = themeFonts

const theme = {
  colorPrimary,
  colorSecondary,
  colorTertiary,
  colorAccent,
  colorShad,
  colorAlt,
  white,
  grey,
  greyMed,
  greyBrown,
  black,
  strongred,
  maxWidth,
  bpTablet,
  bpDesksm,
  bpDeskmd,
  bpDesklg,
  bpMax,
  fontPrimary,
  fontSecondary,
  fontAwesome,
  baseLineHeight,
}

export default theme

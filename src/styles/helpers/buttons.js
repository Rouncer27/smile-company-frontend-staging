import { colors } from "./index"
import { fontSizer } from "./index"
import { css } from "styled-components"
import fonts from "./fonts"

const Btn1Base = css`
  ${fontSizer(1.4, 1.6, 76.8, 150, 1.6)};
  display: inline-block;
  padding: 1rem 1.5rem;
  border: solid 0.1rem ${colors.colorPrimary};
  border-radius: 0.6rem;
  box-shadow: 0 0.5rem 0.7rem 0 rgba(0, 0, 0, 0.16);
  transition: all 0.3s ease;
  font-family: ${fonts.fontSecondary};
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.86;
  letter-spacing: normal;
  text-align: center;
  text-transform: uppercase;
  outline: none;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const Btn1DarkPurple = css`
  ${Btn1Base};
  border-color: ${colors.colorPrimary};
  background: ${colors.white};
  color: ${colors.colorPrimary};

  &:hover {
    background: ${colors.colorSecondary};
    border-color: ${colors.colorSecondary};
    color: ${colors.white};
  }

  &:disabled {
    &:hover {
      border-color: ${colors.colorPrimary};
      background: ${colors.white};
      color: ${colors.colorPrimary};
    }
  }
`

export const Btn1LightSage = css`
  ${Btn1Base};
  border: solid 0.1rem ${colors.colorAccent};
  background: ${colors.colorAccent};
  color: ${colors.colorAlt};

  &:hover {
    background: ${colors.white};
    border: solid 0.1rem ${colors.colorTertiary};
    color: ${colors.colorTertiary};
  }

  &:disabled {
    &:hover {
      border: solid 0.1rem ${colors.colorAccent};
      background: ${colors.colorAccent};
      color: ${colors.colorAlt};
    }
  }
`

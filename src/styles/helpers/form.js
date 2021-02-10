import { colors } from "./index"
import { fonts } from "./index"

import { fontSizer } from "./index"

export const labelSmall = `
  display: block;
  width: 100%;
  color: ${colors.black};
  font-family: ${fonts.fontPrimary};
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.33;
  letter-spacing: 1.4px;

  @media (min-width: 768px) {
    font-size: 1.8rem;
  }

  @media (min-width: 1025px) {
    font-size: 2rem;
  }

  @media (min-width: 1200px) {
    font-size: 2rem;
  }

  @media (min-width: 1600px) {
    font-size: 2.8rem;
  }
`

export const smallInput = `
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: solid 1px #707070;
  background-color: #ffffff;
  color: ${colors.black};
  font-family: ${fonts.fontPrimary};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem ${colors.colorSecondary};
  }
`

export const inputFieldSectionOne = `
  position: relative;
  padding-top: 3rem;

  label#input-fields-label {
    ${fontSizer(1.2, 1.4, 76.8, 150, 2)};
    display: block;
    width: 100%;
    color: #696969;
  }

  p#field-error-message {
    ${fontSizer(1.2, 1.4, 76.8, 150, 2)};
    position: absolute;
    top: 0.75rem;
    left: 0rem;
    color: red !important;
    z-index: 10;
  }

  input {
    width: 100%;
    padding: 1rem 2rem;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    border: none;
    border-radius: 0.2rem;
    background-color: ${colors.white};

    &::placeholder {
      color: #696969;
      opacity: 0.5;
    }
  }
`

export const textareaSectionOne = `
  position: relative;
  padding-top: 3rem;

  label#input-fields-label {
    ${fontSizer(1.2, 1.4, 76.8, 150, 2)};
    display: block;
    width: 100%;
    color: #696969;
  }

  p#field-error-message {
    ${fontSizer(1.2, 1.4, 76.8, 150, 2)};
    position: absolute;
    top: 0.75rem;
    left: 0rem;
    color: red !important;
    z-index: 10;
  }

  textarea {
    width: 100%;
    padding: 1rem 2rem;
    border: none;
    background-color: ${colors.white};
    border-radius: 0.2rem;
    box-shadow: 0 0.3rem 0.6rem 0 rgba(0, 0, 0, 0.16);

    &::placeholder {
      color: #696969;
      opacity: 0.5;
    }
  }
`

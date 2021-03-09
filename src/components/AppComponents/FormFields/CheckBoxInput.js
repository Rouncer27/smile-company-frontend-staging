import React from "react"
import styled from "styled-components"
import { colors, Nav1CharcoalGrey } from "../../../styles/helpers"

const CheckBoxInput = ({ name, label, options, onChange }) => {
  return (
    <CheckBoxInputStyled>
      <p>{label}</p>
      {options.map((option, index) => {
        return (
          <div key={index} className="checkbox-wrapper">
            <input
              type="checkbox"
              id={option.id}
              name={name}
              value={option.id}
              onChange={event => onChange(event)}
              checked={option.checked}
            />
            <label htmlFor={option.id}>
              <span>{option.label}</span>
            </label>
          </div>
        )
      })}
    </CheckBoxInputStyled>
  )
}

const CheckBoxInputStyled = styled.div`
  width: 100%;
  margin: 2.5rem auto;

  p {
    ${Nav1CharcoalGrey};
    color: ${colors.colorSecondary};
    margin-bottom: 1.5rem;

    &:hover {
      color: ${colors.colorSecondary};
      cursor: inherit;
    }
  }

  .checkbox-wrapper {
    position: relative;
    margin-bottom: 3rem;

    label {
      ${Nav1CharcoalGrey};
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      cursor: pointer;

      span {
        max-width: calc(80%);
      }

      &::before,
      &::after {
        pointer-events: none;
        content: " ";
      }
      &::before {
        display: block;
        width: 20px !important;
        height: 20px !important;
        border: solid 0.1rem ${colors.colorAlt};
        background: ${colors.white};
        margin-right: 1rem;
      }

      &::after {
        display: flex;
        position: absolute;
        top: 50%;
        left: 0.5rem;
        width: 1.2rem;
        height: 0.75rem;
        border-bottom: solid 0.4rem ${colors.colorAlt};
        border-left: solid 0.4rem ${colors.colorAlt};
        background: none;
        transform: rotate(-45deg) scale(0) translateY(-50%);
        transition: transform 0.3s ease;
      }

      &:hover {
        color: ${colors.colorAlt};
      }
    }

    input {
      position: absolute;
      top: 50%;
      left: 0;
      width: 2rem;
      height: 2rem;
      transform: translateY(-50%);
      -webkit-appearance: none;
      cursor: pointer;

      &:checked + label:after {
        opacity: 1;
        transform: rotate(-45deg) scale(1) translateY(-50%);
      }
    }
  }
`

export default CheckBoxInput

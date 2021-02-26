import React from "react"
import styled from "styled-components"
import { colors, Nav1CharcoalGrey } from "../../../styles/helpers"

const RadioInput = ({ handleOnRadioChange, name, options, value, label }) => {
  return (
    <RadioInputStyled>
      <p>{label}</p>
      {options.map(option => {
        return (
          <div className="checkbox-wrapper" key={option.id}>
            <input
              type="radio"
              id={option.id}
              name={name}
              value={option.id}
              checked={value === option.id}
              onChange={event => handleOnRadioChange(event)}
            />
            <label htmlFor={option.id}>{option.label}</label>
          </div>
        )
      })}
    </RadioInputStyled>
  )
}

const RadioInputStyled = styled.div`
  margin-top: 2rem;

  p {
    ${Nav1CharcoalGrey};
    margin-bottom: 1.5rem;

    &:hover {
      color: ${colors.colorAlt};
      cursor: inherit;
    }
  }

  .checkbox-wrapper {
    position: relative;
    margin-bottom: 1rem;
  }

  label {
    ${Nav1CharcoalGrey};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    padding-right: 5rem;
    cursor: pointer;

    &::before,
    &::after {
      pointer-events: none;
      content: " ";
    }

    &::before {
      display: flex;
      width: 2rem;
      height: 2rem;
      border: solid 0.1rem ${colors.colorAlt};
      background: ${colors.white};
      margin-right: 1rem;
    }

    &::after {
      display: flex;
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      width: 1.2rem;
      height: 0.75rem;
      border-bottom: solid 0.4rem ${colors.colorAlt};
      border-left: solid 0.4rem ${colors.colorAlt};
      background: none;
      transform: rotate(-45deg) scale(0);
      transition: transform 0.3s ease;
    }

    &:hover {
      color: ${colors.colorAlt};
    }
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 2rem;
    height: 2rem;
    -webkit-appearance: none;
    cursor: pointer;

    &:checked + label:after {
      opacity: 1;
      transform: rotate(-45deg) scale(1);
    }
  }
`

export default RadioInput

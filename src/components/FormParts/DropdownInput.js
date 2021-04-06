import React from "react"
import styled from "styled-components"
import { colors, Nav1Lavender } from "../../styles/helpers"

const DropdownInput = ({ name, label, options, onChange }) => {
  return (
    <DropdownInputStyled>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} onChange={onChange}>
        <option value="">-- Please choose a hiring package --</option>
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </DropdownInputStyled>
  )
}

const DropdownInputStyled = styled.div`
  width: 100%;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;

  label {
    ${Nav1Lavender};
    display: block;
    width: 100%;
  }

  select {
    display: block;
    width: 100%;
  }
`

export default DropdownInput

import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import { UserContext } from "../../../../context/UserContext"
import {
  H4Lavender,
  Nav1CharcoalGrey,
  colors,
  Btn1LightSage,
  Btn1DarkPurple,
} from "../../../../styles/helpers"

import {
  calulateTax,
  calculateSubTotal,
  calculateCartTotal,
} from "../helper/cartTotals"

const CartTotals = ({ productType }) => {
  const [state, dispatch] = useContext(UserContext)
  const cart = state.cart

  const handleAddQty = () => {
    const newQty = cart.qty + 1
    const newSub = calculateSubTotal(cart.price, newQty)
    const newTax = calulateTax(newSub)
    const newTotal = calculateCartTotal(newSub, newTax)

    dispatch({
      type: "CHANGE_QTY_CART",
      payload: { qty: newQty, subTotal: newSub, tax: newTax, total: newTotal },
    })
  }

  const handleSubtractQty = () => {
    const newQty = cart.qty - 1
    const newSub = calculateSubTotal(cart.price, newQty)
    const newTax = calulateTax(newSub)
    const newTotal = calculateCartTotal(newSub, newTax)

    dispatch({
      type: "CHANGE_QTY_CART",
      payload: { qty: newQty, subTotal: newSub, tax: newTax, total: newTotal },
    })
  }

  return (
    <CartTotalsStyled>
      {cart.active && (
        <div className="cartWrap">
          <div className="cartTitle">
            <h2>Cart Totals</h2>
          </div>
          {productType === "membership" || productType === "fee" ? null : (
            <div className="qtyBtn">
              <button type="button" onClick={handleAddQty}>
                Add
              </button>
              {cart.qty > 1 && (
                <button type="button" onClick={handleSubtractQty}>
                  Remove
                </button>
              )}
            </div>
          )}
          <div className="cartTable">
            <p>
              {cart.name} --- Terms: {cart.terms}
            </p>
            <p className="cartTable__name">
              <span>
                {cart.name} &#215; {cart.qty}
              </span>
              <span>&#36;{cart.subTotal}</span>
            </p>
            <p className="cartTable__gst">
              <span>GST:</span>
              <span>&#36;{cart.tax}</span>
            </p>
            <p className="cartTable__total">
              <span>Total:</span>
              <span>&#36;{cart.total}</span>{" "}
            </p>
          </div>
        </div>
      )}
    </CartTotalsStyled>
  )
}

const CartTotalsStyled = styled.div`
  width: 100%;

  .cartWrap {
    max-width: 50rem;
  }

  .cartTitle {
    h2 {
      ${H4Lavender};
    }
  }

  .qtyBtn {
    width: 100%;
    margin: 2rem auto;

    button {
      ${Btn1DarkPurple};
      margin-right: 2rem;
    }
  }

  .cartTable {
    p {
      ${Nav1CharcoalGrey};
      margin: 0;
      margin-bottom: 1.5rem;

      &:hover {
        color: ${colors.colorAlt};
        cursor: inherit;
      }
    }

    &__name,
    &__gst,
    &__total {
      display: flex;
      justify-content: space-between;
    }
  }
`

export default CartTotals

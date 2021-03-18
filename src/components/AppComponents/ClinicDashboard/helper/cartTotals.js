export const calulateTax = cartSubTotal => {
  // Convert to cents
  const subInCents = cartSubTotal * 100
  // Add the 5% GST tax rate
  const taxInCents = subInCents * 0.05
  // Convert back to dollars
  const taxInDollar = (taxInCents / 100).toFixed(2)
  // return the tax amount
  return taxInDollar
}

export const calculateSubTotal = (cartSubTotal, qty) => {
  // Convert to cents
  const subInCents = cartSubTotal * 100
  const subTotalQty = subInCents * qty
  // Convert back to dollars
  const calulatedSubTotal = (subTotalQty / 100).toFixed(2)
  return calulatedSubTotal
}

export const calculateCartTotal = (cartSubTotal, tax) => {
  // Convert to cents
  const subInCents = cartSubTotal * 100
  const taxInCents = tax * 100
  // calculate totals
  const calculatedTotalCents = subInCents + taxInCents
  // Calculated totals in dollars
  const total = (calculatedTotalCents / 100).toFixed(2)
  return total
}

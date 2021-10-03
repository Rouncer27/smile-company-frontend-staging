export default booking => {
  const is_active = booking?.booking_active
  const is_selected = booking?.candidate_selected
  const is_expired = booking?.is_expired
  const is_cancelled = booking?.was_cancelled
  const is_cancelled_short = booking?.was_cancelled_with_short_notice

  const bookingStatusTitle =
    // Booking Was Cancelled with short notice.
    is_cancelled && is_cancelled_short
      ? "SHORTCANCELLED"
      : // Booking Was Cancelled with proper notice.
      is_cancelled
      ? "CANCELLED"
      : // A Candidate was selected.
      is_selected
      ? "CONFIRMED"
      : // This Post is active and has not expired yet and still needs to select a candiate
      is_active && !is_expired
      ? "OPEN"
      : // This Post is expired and has not selected a candiate
      !is_active && is_expired
      ? "UNFULFILLED"
      : "ERROR"

  const isShortNotice = booking.is_short_notice
  const isCandidateSelected = booking.candidate_selected
  const isCancelled = booking.was_cancelled
  const isExpired = booking.is_expired

  const bookingStatus =
    is_cancelled && is_cancelled_short
      ? "Cancelled as requested. This temp job posting was cancelled as a short notice cancellation and a $50.00 will be applied to your account."
      : is_cancelled
      ? "Cancelled as requested and no further action required."
      : is_selected
      ? "closed and a candidate has been selected and posting is filled."
      : is_active && !is_expired
      ? "open and waiting for replies from potential candidates or for you to choose one of the potential candidates."
      : !is_active && is_expired
      ? "closed and no candidates have been selected, this post has not been filled."
      : "There has been an error. If required please contact Smile and Company for assistance."

  const isActive =
    is_cancelled && is_cancelled_short
      ? false
      : is_cancelled
      ? false
      : is_selected
      ? false
      : is_active && !is_expired
      ? true
      : !is_active && is_expired
      ? false
      : false

  return {
    bookingStatusTitle,
    isShortNotice,
    bookingStatus,
    isActive,
    isCandidateSelected,
    isCancelled,
    isExpired,
  }
}

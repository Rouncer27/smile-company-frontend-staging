export default async (err, dispatch) => {
  console.dir(err)
  const message =
    err.response.data &&
    err.response.data.message &&
    typeof err.response.data.message === "object"
      ? err.response.data.message[0] &&
        err.response.data.message[0].messages[0] &&
        err.response.data.message[0].messages[0].message
      : typeof err.response.data.message === "string"
      ? err.response.data.message
      : "Something went wrong. Please try again later"
  dispatch({ type: "USER_ERROR", payload: { message } })
}

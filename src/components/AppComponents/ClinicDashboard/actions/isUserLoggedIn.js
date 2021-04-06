import { Magic } from "magic-sdk"

let magic
if (typeof window !== "undefined") {
  magic = new Magic(process.env.GATSBY_MAGIC_PK)
}

export default async () => {
  console.log("FETCH A MAGIC LINK TOKEN")
  try {
    const token = await magic.user.getIdToken()
    return token
  } catch (err) {
    console.log(err)
  }
}

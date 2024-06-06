import { users } from "@/mock/users"
import { TUser } from "@/types/user"
import { compareErrorString } from "@/utils/errors";
import { ALGO, MY_SUPER_SECRET_TOKEN_KEY_WINK_WINK } from "@/utils/etc"
import { SignJWT } from "jose"

interface IUser extends TUser {
  password: string;
}

const errors = {
  notFound: {
    id: "not_found",
    message: "User not found",
    code: 404,
  },
  invalidPassword: {
    id: "invalid_password",
    message: "Invalid password",
    code: 401,
  },
  invalidBody: {
    id: "invalid_body",
    message: "Invalid body",
    code: 400,
  }
}

export async function POST(
  req: Request
) {
  try {
    const body = await req.json()
    const {email, password} = body
    if (email && password) {
      const user = users.find(user => user.email === email) as IUser
      if (!user) throw new Error(errors.notFound.id)
      if (user.password !==  password) throw new Error(errors.invalidPassword.id)
      const encoder = new TextEncoder()
      const key = encoder.encode(MY_SUPER_SECRET_TOKEN_KEY_WINK_WINK)
      const parsedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
      }
      const signer = new SignJWT(parsedUser)
        .setProtectedHeader({alg: ALGO, typ: "JWT" })
        .setIssuedAt()
        .setIssuer(user.email)
        .setSubject(user.id.toString())
        .setAudience(user.email)
        .setExpirationTime("24h")
      const jwt = await signer.sign(key)

      return Response.json({user: parsedUser, jwt})
    } else {
      throw new Error(errors.invalidBody.id)
    }

  } catch(e: any) {
    if (compareErrorString(e, errors.invalidBody.id)) {
      return Response.json(errors.invalidBody, { status: errors.invalidBody.code})
    }
    if (compareErrorString(e, errors.notFound.id)) {
      return Response.json(errors.notFound, { status: errors.notFound.code})
    }
    if (compareErrorString(e, errors.invalidPassword.id)) {
      return Response.json(errors.invalidPassword, { status: errors.invalidPassword.code})
    }
    return Response.json({error: e.toString()}, { status: 500 })
  }
}
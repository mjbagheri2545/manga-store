import jwt from "jsonwebtoken";

import env from "@/constants/env";

export function generateJwtToken(id: string): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { data: id },
      env.JWT_PRIVATE_TOKEN_KEY,
      {},
      function (error, data) {
        if (error != null) {
          reject(error);
        }

        if (data == null) {
          return reject(new Error("data can't be null or undefined."));
        }

        resolve(data);
      }
    );
  });
}

export function verifyJwtToken(token: string): Promise<string> {
  return new Promise(function (resolve, reject) {
    jwt.verify(token, env.JWT_PRIVATE_TOKEN_KEY, {}, (error, decoded) => {
      if (error != null) {
        return reject(error);
      }

      if (decoded == null) {
        return reject(new Error("decoded data can't be null or undefined."));
      }

      return resolve(decoded as string);
    });
  });
}

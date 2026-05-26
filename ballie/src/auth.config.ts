import crypto from "crypto";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import { prisma } from "./db.config.js";
import { findOrCreateProviderUser } from "./modueles/provider/provider.service.js";
import { ProviderType } from "./modueles/provider/provider.dto.js";

dotenv.config();

export const generateAccessToken = (user: { userId: bigint }) => {
  return jwt.sign(
    { id: Number(user.userId) },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );
};

export const generateRefreshToken = (user: { userId: bigint }) => {
  return jwt.sign(
    { id: Number(user.userId) },
    process.env.JWT_SECRET!,
    { expiresIn: "14d" }
  );
};

const googleVerify = async (profile: Profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) throw new Error("Google 프로필에 이메일이 없습니다.");

  const userId = await findOrCreateProviderUser({
    provider: ProviderType.GOOGLE,
    providerUserId: profile.id,
    email,
    name: (profile.displayName ?? "이름 없음").slice(0, 10),
  });

  return { userId };
};

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID!,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET!,
    callbackURL: "/oauth2/callback/google",
    scope: ["email", "profile"],
  },
  async (_accessToken, _refreshToken, profile, cb) => {
    try {
      const user = await googleVerify(profile);
      const tokens = {
        accessToken: generateAccessToken(user),
        refreshToken: generateRefreshToken(user),
      };
      return cb(null, tokens);
    } catch (err) {
      return cb(err as Error);
    }
  }
);

export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET!,
  },
  async (payload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { userId: BigInt(payload.id) },
      });
      if (!user) return done(null, false);
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
);

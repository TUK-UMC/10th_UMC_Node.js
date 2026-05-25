import dotenv from "dotenv";
import { Strategy as GoogleStrategy, type Profile } from "passport-google-oauth20";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import { prisma } from "./db.config.js";

dotenv.config();

// 1. JWT 토큰 생성 함수
export const generateAccessToken = (user: { id: number; email: string }) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );
};

export const generateRefreshToken = (user: { id: number }) => {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: "14d" }
  );
};

// 2. Google Verify 로직 (Member 테이블 기준)
const googleVerify = async (profile: Profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) throw new Error("Google 프로필에 이메일이 없습니다.");

  let member = await prisma.member.findFirst({ where: { email } });

  if (!member) {
    member = await prisma.member.create({
      data: {
        email,
        name: profile.displayName,
        provider: "google",
        providerId: profile.id,
      },
    });
  }

  return {
    id: Number(member.memberId),
    email: member.email,
    name: member.name,
  };
};

// 3. Google Strategy
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

// 4. JWT Strategy
export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET!,
  },
  async (payload, done) => {
    try {
      const member = await prisma.member.findFirst({
        where: { memberId: BigInt(payload.id) },
      });
      return member ? done(null, member) : done(null, false);
    } catch (err) {
      return done(err, false);
    }
  }
);
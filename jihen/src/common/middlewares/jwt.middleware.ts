import passport from "passport";

export const requireJwt = passport.authenticate("jwt", { session: false });

import type { Access } from "payload";

/** Public access (use only for read). */
export const anyone: Access = () => true;

/** Only authenticated Payload users. */
export const authenticated: Access = ({ req }) => Boolean(req.user);

import type { Access } from "payload";

/** Public access (use only for read, or Messages.create for the contact form). */
export const anyone: Access = () => true;

/** Only authenticated Payload users. */
export const authenticated: Access = ({ req }) => Boolean(req.user);

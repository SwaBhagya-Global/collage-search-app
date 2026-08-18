import { v4 as uuidv4 } from "uuid";

export const getVisitorId = (): string => {
  const cookieName = "visitorId";

  const existingCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${cookieName}=`));

  if (existingCookie) {
    return existingCookie.split("=")[1];
  }

  const visitorId = uuidv4();

  document.cookie = `${cookieName}=${visitorId}; path=/; max-age=${
    60 * 60 * 24 * 365
  }; SameSite=Lax`;

  return visitorId;
};
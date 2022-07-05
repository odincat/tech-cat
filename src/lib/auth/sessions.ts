import { db } from "@backend/utils/db-client";
import { Session, User } from "@prisma/client";
import { addSeconds, differenceInSeconds } from "date-fns";
import { IncomingMessage, ServerResponse } from "http";
import { getIronSession, IronSession, IronSessionOptions } from "iron-session";

const SESSION_LIFETIME = 15 * 24 * 3600;

if(!process.env.COOKIE_SECRET) {
    console.warn('[TechCat Facility Management Headquarters] No Cookie secret is set in the ENV (you dumbass). This is a security risk btw.')
}

declare module 'iron-session' {
    interface IronSessionData {
        sessionId?: string | null;
    }
}

const SESSION_OPTIONS: IronSessionOptions = {
    password: {
        1: process.env.COOKIE_SECRET as string
    },
    cookieName: 'session.info',
    ttl: SESSION_LIFETIME,
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        httpOnly: true,
    }
};

export const createSession = async (ironSession: IronSession, user: User) => {
    const session = await db.session.create({
        data: {
            userId: user.id,
            expiresAt: addSeconds(new Date(), SESSION_LIFETIME)
        }
    });

    ironSession.sessionId = session.id;

    await ironSession.save();

    return session;
}

export const removeSession = async (ironSession: IronSession, session: Session | null) => {
    ironSession.destroy();
    await ironSession.save();

    if(session) {
        await db.session.delete({ where: { id: session.id }});
    }
}

interface CachedSession {
    session: Session | null;
    ironSession: IronSession;
}

const sessionCache = new WeakMap<IncomingMessage, CachedSession>();

export const resolveSession = async (request: IncomingMessage, response: ServerResponse) => {
    const cachedSession = sessionCache.get(request);

    if(cachedSession) return cachedSession;

    const ironSession = await getIronSession(request, response, SESSION_OPTIONS);
    const sessionId = ironSession.sessionId;

    let session: Session | null = null;

    if(sessionId) {
        session = await db.session.findFirst({
            where: {
                id: sessionId,
                expiresAt: {
                    gte: new Date()
                }
            }
        });

        if(session) {
            const refreshSessionAmount = differenceInSeconds(session.expiresAt, new Date()) < 0.75 * SESSION_LIFETIME;

            if(refreshSessionAmount) {
                await db.session.update({
                    where: {
                        id: session.id
                    },
                    data: {
                        expiresAt: addSeconds(new Date(), SESSION_LIFETIME)
                    }
                });

                await ironSession.save();
            }
        } else {
            ironSession.destroy();
            await ironSession.save();
        }
    }

    sessionCache.set(request, { session, ironSession });

    return { session, ironSession };
}
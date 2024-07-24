import { NextResponse } from "next/server";
// import { cookies, headers } from "next/headers";

export async function middleware(request) {
    // let originUrl = request.nextUrl.pathname;
    // const searchParams = request.nextUrl.searchParams;

    const accessToken = request.cookies.get("_access")?.value;
    const refreshToken = request.cookies.get("_refresh")?.value;

    if (!refreshToken) {
        console.log("request_url", request.nextUrl.pathname)
        if (request.nextUrl.pathname === '/') {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL(`/login`, request.url));
    }

    let validAccessToken = accessToken ? accessToken : ""

    if (!accessToken) {
        try {
            const refreshedTokenResponse = await refreshAccessToken(refreshToken);
            if (refreshedTokenResponse.error) {
                response.cookies.set("_access", validAccessToken, {
                    expires: Date.now() + (5 * 60 * 60 * 100),
                    httpOnly: true,
                    path: '/',
                });
                if (request.nextUrl.pathname  === '/') {
                    return NextResponse.next();
                }
                return NextResponse.redirect(
                    new URL(`/login`, request.url)
                );
            }
            validAccessToken = refreshedTokenResponse.accessToken;
        } catch {
            return NextResponse.redirect(
                new URL(`/login`, request.url)
            );
        }

    }



    const url = new URL(request.url);
    const origin = url.origin;
    const pathname = url.pathname;

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("Authorization", `Bearer ${validAccessToken}`);
    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    if (!accessToken) {
        response.cookies.set("_access", validAccessToken, {
            expires: Date.now() + (5 * 60 * 60 * 100),
            httpOnly: true,
            path: '/',
        });
    }

    return response;
}

export const config = {
    matcher: [
        "/",
        "/profile/:path*",
    ]
};

async function refreshAccessToken(refreshToken) {
    const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    console.log("refresh midlle",refreshToken)
    try {
        const response = await fetch(
            `${process.env.API_URL}/api/v1/auth/token/refresh/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    refresh: refreshToken,
                }),
            }
        );

        const data = await response.json();
        if (!response.ok) {
            console.error("Error refreshing access token:", data);
            return { error: true };
        }

        return { accessToken: data.access, error: false };
    } catch (error) {
        console.error("Error refreshing access token:", error);
        return { error: true };
    }
}
import { NextRequest, NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function middleware(req: NextRequest) {
        const response = NextResponse.next({
            request: {
                headers: new Headers(req.headers),
            }
        });
        response.headers.set("x-custom-header", "isAuthed");

        console.log("header: ", response);
        
        return response

    }

export const config = { 
    matcher: '/'
}





















//matcher to compile this middleware only when path is matched
// export const config = {
    //     matcher: '/'
    // }
    // if (req.nextUrl.pathname.startsWith('/')){
    //     console.log("mw confirmed")
    //     return NextResponse.next();
    // }
    //to show all the pathes nextjs has request
    // console.log("request", req.nextUrl.pathname);    
    // console.log("mw run");
import { GetProfile } from "@/actions/auth-actions"
import Profile from "./profile"
export default async function MainProfile () {
    const res = await GetProfile()
    return( 
        <Profile res={res}/>
    )
}
import Verificaiton from "./Verification";
import { VerifyEmail } from "@/actions/auth-actions";
export default async function VerifyMain({params}) {
    const {code} = params;
    // const isVerified = await verifyEmail(otp)
    return (
      <Verificaiton VerifyEmail={VerifyEmail} otp={code}/>
    );
  }
import SignUp from "./SignUp";
import { RegisterAccount } from "@/actions/auth-actions";
export default async function SignUpMain() {
    return (
        <SignUp RegisterAccount={RegisterAccount} />
    );
  }
  
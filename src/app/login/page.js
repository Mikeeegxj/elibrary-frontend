import Login from "./Login";
import { LoginAccount } from "@/actions/auth-actions";

export default async function LoginMain() {

  return (
    <Login LoginAccount={LoginAccount}/>
  );
}
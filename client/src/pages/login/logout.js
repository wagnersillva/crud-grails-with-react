import { Auth } from "../../services/security/auth";

export default function Logout(){
    Auth.logOut();
    window.location = "/login";

}
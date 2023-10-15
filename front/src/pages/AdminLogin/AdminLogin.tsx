import { Alert } from "../../components/Alert/Alert";
import { Loader } from "../../components/Loader/Loader";
import { ModalsProvider } from "./ModalsProvider/ModalsProvider";

export default function AdminLogin() {
    return (
        <div>
            <Alert/>
            <Loader/>
            <ModalsProvider/>
        </div>
    )
}
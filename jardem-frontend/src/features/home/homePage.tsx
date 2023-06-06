import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import RequestForm from "../requests/forms/requestForm";
import LoginForm from "../users/LoginForm";

export default observer(function HomePage(){
    const {userStore} = useStore()

    return (<>
        {userStore.isLoggedIn ? <RequestForm key='craete'/>: <LoginForm/>}
        </> 
    )
})
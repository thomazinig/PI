import { useNavigate } from "react-router-dom"

export const AuthToken = (token)=>{
    const navigate = useNavigate()
    if (!token) {
        navigate("/")
    }
}
export const authGrup = (grup)=>{
    if(grup !== "Administrador"){
        return false
    }
}
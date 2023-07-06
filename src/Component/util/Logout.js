import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("UserId");

        // Kullanıcıyı başka bir sayfaya yönlendir
        navigate("/login");
    }, [navigate]);

    return null; // bu bileşen herhangi bir şey render etmiyor
}

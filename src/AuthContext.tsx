import { createContext, useContext, useState, type ReactNode } from "react";

export interface AuthContextType {
    isAunthenticated: boolean;
    usuarioActivo: string
    login: (nombreUsuario: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAunthenticated, setIsAunthenticated] = useState<boolean>(false)
    const [usuarioActivo, setUsuarioActivo] = useState<string>("")

    const login = (nombreUsuario: string) => {
        setIsAunthenticated(true)
        setUsuarioActivo(nombreUsuario)
    }

    const logout = () => {
        setIsAunthenticated(false)
        setUsuarioActivo("")
    }

    return (
        <AuthContext.Provider value={{ isAunthenticated, usuarioActivo, login, logout }}>
            {children}
        </AuthContext.Provider >
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context == undefined) {
        throw new Error("useAuth debe estar dentro del proveedor AuthProvider")
    }
    return context
}
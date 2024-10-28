import { useContext, useMemo } from "react";
import { createContext } from "react";
import { Socket } from "socket.io-client";


const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const socket = useMemo(() => new Socket("http://localhost:4000"), []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}


export const useSocket = () => {
    const socket = useContext(SocketContext);

    if (!socket) {
        throw new Error("useSocket must be used within a SocketProvider");
    }

    return socket;
}


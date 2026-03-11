import { Provider } from "react-redux"
import { app } from "../app-composer"
import { Hydrater } from "./Hydrater"

export const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Provider store={app.store}>
            <Hydrater>{children}</Hydrater>
        </Provider>
    )
}
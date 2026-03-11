import { useHydrateAuth } from "../../auth/hooks/use-hydrate-auth.hook"

export const Hydrater: React.FC<{children: React.ReactNode}> = ({ children }) => {
    useHydrateAuth();

    return <>{children}</>
}
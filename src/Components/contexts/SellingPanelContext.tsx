import { createContext, useContext, useState, type ReactNode } from "react"

interface SellingPanelContextType {
    isSellingPanelEnabled: boolean
    setSellingPanelEnabled: (value: boolean) => void
}

const SellingPanelContext = createContext<SellingPanelContextType | undefined>(undefined)

export function SellingPanelProvider({ children }: { children: ReactNode }) {
    const [isSellingPanelEnabled, setSellingPanelEnabled] = useState(false)

    return (
        <SellingPanelContext.Provider value={{ isSellingPanelEnabled, setSellingPanelEnabled }}>
            {children}
        </SellingPanelContext.Provider>
    )
}

export function useSellingPanel() {
    const context = useContext(SellingPanelContext)
    if (!context) {
        throw new Error("useSellingPanel باید داخل SellingPanelProvider استفاده شود")
    }
    return context
}
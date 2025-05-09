// .......... این CONTEXT  برای بولد شدن ساید بار سمت چپ هنگام رسیدن کاربر به آن قسمت می باشد .


import React , {createContext , useContext , useState} from "react";


// تعریف نوع وضعیت
interface ActiveSectionContextType {
    activeSection: string | null;
    setActiveSection: (section: string | null) => void;
}

// ایجاد Context
const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined);

// هوک برای استفاده از Context
export const useActiveSection = () => {
    const context = useContext(ActiveSectionContext);
    if (!context) {
        throw new Error("useActiveSection must be used within ActiveSectionProvider");
    }
    return context;
};

// Provider برای مدیریت وضعیت
export const ActiveSectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    return (
        <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
            {children}
        </ActiveSectionContext.Provider>
    );
};

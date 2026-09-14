import type { ReactNode } from "react";

// Tab
export type TabProps = {
    title: string
    children: ReactNode
}

const Tab = ({ children }: TabProps) => {
    return <div>{children}</div>
}

// Tab title
type TabTitleProps = {
    title: string
    index: number
    selectedTab: number
    setSelectedTab: (index: number) => void
}

const TabTitle = ({ title, index, selectedTab, setSelectedTab }: TabTitleProps) => {
    return (
        <li>
            <button 
                onClick={() => setSelectedTab(index)}
                className={`${selectedTab === index ? "underline decoration-4" : ""} text-sm underline-offset-5 hover:underline hover:cursor-pointer`}    
            >
                {title}
            </button>
        </li>
    )
}

export { Tab, TabTitle };

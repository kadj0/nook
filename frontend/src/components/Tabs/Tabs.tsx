import { Children, isValidElement, useState, type ReactElement } from "react";
import { TabTitle, type TabProps } from "./Tab";

type Props = {
    children: ReactElement<TabProps> | ReactElement<TabProps>[];
}

const Tabs = ({ children }: Props) => {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const tabs = Children.toArray(children).filter(
        (child): child is ReactElement<TabProps> => isValidElement<TabProps>(child),
    );

    return (
       <div>
            <ul className="flex w-full flex-row justify-center gap-5">
                {tabs.map((item, index) => (
                    <TabTitle 
                        key={index}
                        title={item.props.title}
                        index={index}
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                ))}
            </ul>
            <div className="pt-5">
                {tabs[selectedTab]}
            </div>
        </div>
    )
}

export default Tabs;

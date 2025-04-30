import { useState } from "react";


export const useNavigation = () => {
    const [selectedTab, setSelectedTab] = useState<string>("participants");

    return { selectedTab, setSelectedTab };
}

export default useNavigation;
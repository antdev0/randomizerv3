interface NavigationProps {
    selectedTab: string;
    setSelectedTab: (selectedTab: string) => void;
}

const tabs = ["participants", "prizes", "winners"];

const Navigation = ({ selectedTab, setSelectedTab }: NavigationProps) => {
    return (
        <div className="border flex justify-between items-center border-white/20 rounded-lg overflow-hidden">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`w-full p-3 text-white ${selectedTab === tab ? "bg-blue-500 text-white" : ""
                        }`}
                >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
            ))}
        </div>
    );
};

export default Navigation;

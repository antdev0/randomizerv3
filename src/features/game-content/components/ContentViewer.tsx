"use client";
import Navigation from "@features/game-content/components/Navigation";
import { useNavigation } from "@features/game-content/hooks/useNavigation";
import Participants from "@features/game-content/components/Participants";
import Prizes from "@features/game-content/components/Prizes";
import WinnersTab from "@features/game-content/components/WinnersTab";


const ContentViewer = () => {
    const { selectedTab, setSelectedTab } = useNavigation();
    return (
        <div className="h-full w-full p-5">
            <Navigation selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

            {
                selectedTab === "participants" && <Participants />
            }

            {
                selectedTab === "prizes" && <Prizes />
            }

            {
                selectedTab === "winners" && <WinnersTab />
            }
        </div>
    );
}

export default ContentViewer;
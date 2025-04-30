import { useWinnersTab, GroupedWinner } from "@features/game-content/hooks/useWinnersTab";

const WinnersTab = () => {

    const { exportToXlsx, fetchLoading, groupedWinnersMajor, groupedWinnersMinor } = useWinnersTab();


    return (<>
        <div className="flex flex-col gap-5 text-white py-5">
            <button onClick={exportToXlsx} className="bg-blue-500 text-white px-4 py-2 rounded disabled:cursor-not-allowed disabled:opacity-50">
                Export
            </button>
         
            <RenderWinners winners={groupedWinnersMajor} type="Major" fetchLoading={fetchLoading} />
            <RenderWinners winners={groupedWinnersMinor} type="Minor" fetchLoading={fetchLoading} />


        </div>
    </>);
}


const RenderWinners = ({ winners, type, fetchLoading }: { winners: GroupedWinner, type: string, fetchLoading: boolean }) => {
    return (
        <div>
            <h1 className="font-bold text-xl">{type} Raffle Winners</h1>
            {fetchLoading ? (
                <p className="text-gray-500">Loading...</p> 
            ) : (
                winners && Object.keys(winners).length > 0 ? (
                    Object.values(winners).map((group, index) => (
                        <div key={index} className="mb-4">
                            <p className="text-lg font-bold">{group.prize.name}</p>
                            {group.winners.map((winner, idx) => (
                                <div key={idx} className="flex gap-2 rounded-lg">
                                    <div className="flex gap-2 items-center text-gray-200">
                                        <p>{winner.name}</p>
                                        <span>-</span>
                                        <p>{winner.company}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p>No winners available</p> // Message if no winners are found
                )
            )}
        </div>
    );
};


export default WinnersTab;
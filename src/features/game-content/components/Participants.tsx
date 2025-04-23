import { useParticipants } from "@hooks/useParticipants";

const Participants = () => {
    const { activeParticipants } = useParticipants();
    console.log(activeParticipants)


    return (
        <div className="relative h-[calc(100vh-6.7rem)] w-full flex flex-col gap-5 overflow-y-auto py-2">
            <input type="file" className="border border-white/30 mt-3" />

            <div className="flex flex-col gap-2 border border-white/30 rounded-lg px-3 py-2">
                {
                    activeParticipants.length === 0 ? <div className="text-white">No participants added yet</div> : (
                        activeParticipants.map((participant, index) => (
                            <div key={index} className=" hover:bg-white/20 cursor-pointer transition rounded-lg p-2 text-white">
                                {participant.name} ({participant.entries})
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    );
}

export default Participants;
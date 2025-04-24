import { useRef } from "react";
import { useParticipants } from "@hooks/useParticipants";
import { useReadExcel } from "@hooks/useReadExcel";

const Participants = () => {
    const { handleReadExcel, participants, fileName } = useReadExcel();
    const { activeParticipants, handleBatchInsertParticipants } = useParticipants();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleReadExcel(e.target.files[0]);

            // Reset the input so the same file can be selected again
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };



    return (
        <div className="relative h-[calc(100vh-6.7rem)] w-full flex flex-col gap-5 overflow-y-auto py-2">
            <div className="flex mt-3 items-center gap-2">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                />
                <label
                    htmlFor="file-upload"
                    className="cursor-pointer px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 w-full"
                >
                    {fileName || "No file selected"}
                </label>
                <button
                    onClick={() => handleBatchInsertParticipants(participants)}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={participants.length === 0}
                >
                    Import
                </button>
            </div>

            <div className="flex flex-col gap-2 border border-white/30 rounded-lg px-3 py-2 max-h-[80vh] overflow-scroll">
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
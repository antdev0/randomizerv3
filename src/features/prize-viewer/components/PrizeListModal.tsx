import { Modal } from "@components/modal";
import Icon from "@components/Icon";

const PrizeListModal = ({ isOpen }: { isOpen: boolean }) => {

    return (
        <Modal isOpen={isOpen} className="max-w-sm">

            <h1 className="font-bold text-xl">Prize list</h1>
            <div className="border flex relative items-center px-2 gap-2 rounded-lg mt-2">
                <Icon name="Search" size={20} className="text-gray-700" />
                <input type="text" placeholder="Search..." className=" w-full py-3 unset appearance-none  bg-transparent  border-none outline-none focus:outline-none focus:ring-0 focus:border-none shadow-none" />
            </div>

            <div className="flex flex-col gap-3 mt-2">
                <div className="w-full border flex items-center gap-5 p-2 rounded-lg cursor-pointer">
                    <div className="bg-gray-500 aspect-square rounded-lg w-[3.75rem] shrink-0"></div>
                    <div>
                        <p>Acerpure Cozy F4</p>
                        <p className="text-sm">QTY: 1</p>
                    </div>
                </div>

            </div>
        </Modal>
    );
}

export default PrizeListModal;
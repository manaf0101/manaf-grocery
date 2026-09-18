import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface ToggleButtonProps {
    disabled: boolean
    isOn: boolean
    onToggle: (nextState: boolean) => void
}

function ToggleButton({ disabled, isOn, onToggle }: ToggleButtonProps) {

    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState("");

    const handleToggle = () => {
        const nextState = !isOn;
        onToggle(nextState);
        setModalText(
            nextState
                ? "با فعال کردن پنل فروش محصولات شما برای مشتریان قابل نمایش خواهد بود ."
                : "با غیر فعال کردن پنل فروش محصولات شما برای مشتریان قابل نمایش نخواهد بود ."
        );
        setShowModal(true);
    };

    return (
        <>
            <style>
                {`
                    .dark .toggle-info-modal .modal-content {
                        background-color: rgb(30 41 59);
                        color: white;
                        border: 1px solid rgb(51 65 85);
                    }
                    .dark .toggle-info-modal .modal-header {
                        border-bottom: 1px solid rgb(51 65 85);
                    }
                    .dark .toggle-info-modal .modal-footer {
                        border-top: 1px solid rgb(51 65 85);
                    }
                    .dark .toggle-info-modal .modal-body {
                        background-color: rgb(30 41 59);
                        color: rgb(226 232 240);
                    }
                    .dark .toggle-info-modal .btn-close {
                        filter: invert(1);
                    }
                    .toggle-info-modal .modal-content {
                        background-color: white;
                        color: rgb(51 65 81);
                        border: 1px solid rgb(226 232 240);
                        border-radius: 0.75rem;
                        overflow: hidden;
                    }
                    .toggle-info-modal .modal-header,
                    .toggle-info-modal .modal-footer {
                        border-color: rgb(226 232 240);
                    }
                    .toggle-info-modal .modal-body {
                        background-color: white;
                        color: rgb(51 65 81);
                    }
                `}
            </style>

            <button
                type="button"
                disabled={disabled}
                onClick={handleToggle}
                className={`
                    focus-visible:border-none
                    relative
                    w-8
                    h-5
                    rounded-full
                    transition-colors
                    duration-300
                    ${isOn ? "bg-green-500 dark:bg-toggle-panel" : "bg-gray-300"}
                `}
            >
                <span
                    className={`
                        absolute
                        top-1
                        left-1
                        w-3
                        h-3
                        bg-white
                        rounded-full
                        transition-transform
                        duration-300
                        ${isOn ? "translate-x-3" : "translate-x-0"}
                    `}
                />
            </button>

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                dialogClassName="toggle-info-modal"
            >
                <Modal.Header closeButton className="justify-center text-center">
                    <Modal.Title className="text-lg font-bold w-full text-center">تغییر وضعیت پنل فروش</Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-5 px-4 text-center">
                    <p className="mb-0 leading-7 text-sm sm:text-base text-center" style={{ fontFamily: "VAZIR" }}>
                        {modalText}
                    </p>
                </Modal.Body>
                <Modal.Footer className="justify-center">
                    <Button
                        variant="primary"
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700 border-0 text-white"
                    >
                        متوجه شدم
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ToggleButton;
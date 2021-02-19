import React, { useState } from 'react'
import "./createThread.scss"
import ModalDropdown from "../components/modal/modalDropdown"
import categoryActions from "../actions/actions"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

interface Props {

}

const CreateThread: React.FC<Props> = ({ }) => {
    const { createThread } = categoryActions();
    const [category, setCategory] = useState<string>("none")
    const [title, setTitle] = useState<string>("")
    const [body, setBody] = useState<string>("")

    const handleCreate = async () => {
        console.log("title", title)

        if (category === "none") {
            return;
        } else {
            const payload = {
                title: title,
                body: body,
                category: category,
            };

            await createThread(payload)
            setTitle("")
            setBody("")
            setCategory("none")
            toast.success('Thread Created.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <>
            <div className="create-thread-main">


                <div className="create-thread-header">
                    <h1>Create Thread</h1>
                </div>
                <div className="create-thread-modal-container">
                    <ModalDropdown category={category} setCategory={setCategory} />

                </div>
                <div className="create-thread-title">
                    <textarea placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="create-thread-body">
                    <textarea placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
                </div>

                <button onClick={handleCreate} className="new-thread-button">
                    Create Thread
                            </button>
            </div>
        </>
    )
}

export default CreateThread
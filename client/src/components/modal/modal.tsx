
import React, { useState } from 'react';
import "./modal.scss"
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import ModalDropdown from "./modalDropdown"
import categoryActions from "../../actions/actions"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>

}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid black',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            width: "700px",
            height: "600px"

        },
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '60ch',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',

            },
        },

    }),
);

const ThreadModal: React.FC<Props> = ({ open, setOpen }) => {
    const classes = useStyles();
    const { createThread } = categoryActions();
    const [category, setCategory] = useState<string>("none")
    const [title, setTitle] = useState<string>("")
    const [body, setBody] = useState<string>("")


    const handleClose = () => {
        setOpen(false);
    };


    const handleCreate = async () => {
        console.log("title", title)
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
        handleClose()
    }

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />


            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Create Thread</h2>
                        <form onSubmit={handleCreate} className={classes.root} noValidate autoComplete="off">
                            <TextField id="standard-basic" label="Title" style={{ marginBottom: "50px" }} value={title} onChange={(e) => setTitle(e.target.value)} />
                            <TextField
                                id="outlined-multiline-static"
                                label="Body"
                                multiline
                                rows={12}
                                variant="outlined"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}

                            />
                        </form>
                        <ModalDropdown category={category} setCategory={setCategory} />
                        <button onClick={handleCreate} className="new-thread-button">
                            Create Thread
                            </button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
export default ThreadModal
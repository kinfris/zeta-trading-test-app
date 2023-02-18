import {Button, Dialog, DialogTitle} from "@mui/material";
import {useContext, useState} from "react";
import {treeApi} from "@/services/tree.service";
import {ChangeContext} from "@/app/page";
import styles from "./dialogs.module.css";


export const DeleteNodeDialog = ({isOpen, onClose, nodeId, name}) => {
    const {
        isChanged,
        setIsChanged
    } = useContext(ChangeContext);
    const [error, setError] = useState('')

    const handleClose = () => {
        onClose(false);
        setError('')
    };

    const deleteNode = async () => {
        try {
            const response = await treeApi.deleteNode(nodeId);
            setIsChanged(true);
            onClose(false);
        } catch (e) {
            setError(e.response.data.data.message)
        }

    };

    return (
        <Dialog onClose={handleClose} open={isOpen} fullWidth>
            <div className={styles.wrapper}>
                <DialogTitle className={styles.title}>Delete </DialogTitle>
                <DialogTitle>{error ? error : `Do you want to delete ${name}`}</DialogTitle>
                <div className={styles.buttons_wrapper}>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="outlined" color="warning" onClick={deleteNode}>Delete</Button>
                </div>
            </div>
        </Dialog>
    );
}

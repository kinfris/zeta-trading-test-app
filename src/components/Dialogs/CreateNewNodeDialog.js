import {Button, Dialog, DialogTitle, TextField,} from "@mui/material";
import {useContext, useState} from "react";
import {treeApi} from "@/services/tree.service";
import {ChangeContext} from "@/app/page";
import styles from "./dialogs.module.css"


export const CreateNewNodeDialog = ({isOpen, onClose, nodeId}) => {
    const [value, setValue] = useState('');
    const [isError, setIsError] = useState(false);

    const {
        isChanged,
        setIsChanged
    } = useContext(ChangeContext);

    const handleClose = () => {
        onClose(false);
        setValue('');
    };

    const createNode = async () => {
        if (value.length > 4) {
            const response = await treeApi.createNode(nodeId, value)
            onClose(false);
            setIsChanged(true);
        } else {
            setIsError(true);
        }
    };

    const changeHandler = (event) => {
        setValue(event.target.value);
    }

    return (
        <Dialog onClose={handleClose} open={isOpen} fullWidth>
            <div className={styles.wrapper}>
                <DialogTitle className={styles.title}>Create new node</DialogTitle>
                <TextField id="outlined-basic" label="Node name" variant="outlined" value={value}
                           onChange={changeHandler} error={isError} className={styles.textField}/>
                <div className={styles.buttons_wrapper}>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={createNode}>Create</Button>
                </div>
            </div>
        </Dialog>
    );
}

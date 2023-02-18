import {Button, Dialog, DialogTitle, TextField,} from "@mui/material";
import {useEffect, useState, useContext} from "react";
import {treeApi} from "@/services/tree.service";
import {ChangeContext} from "@/app/page";
import styles from "./dialogs.module.css";


export const EditNodeDialog = ({isOpen, onClose, nodeId, name}) => {
    const [value, setValue] = useState('');
    const [isError, setIsError] = useState(false);
    const {
        isChanged,
        setIsChanged
    } = useContext(ChangeContext);

    useEffect(() => {
        setValue(name)
    }, [name])

    const handleClose = () => {
        onClose(false);
    };

    const createNode = async () => {
        if (value.length > 4) {
            const response = await treeApi.renameNode(nodeId, value)
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
                <DialogTitle className={styles.title}>Rename node</DialogTitle>
                <TextField id="outlined-basic" label="Node name" variant="outlined" value={value}
                           onChange={changeHandler} error={isError} className={styles.textField}/>
                <div className={styles.buttons_wrapper}>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={createNode}>Rename</Button>
                </div>
            </div>
        </Dialog>
    );
}

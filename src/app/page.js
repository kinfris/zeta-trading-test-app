"use client"

import styles from './page.module.css'
import { createContext, useEffect, useState } from "react";
import { RecursiveNodes } from "@/components/RecursiveNodes/RecursiveNodes";
import { treeApi } from "@/services/tree.service";
import { CreateNewNodeDialog } from "@/components/Dialogs/CreateNewNodeDialog";
import { EditNodeDialog } from "@/components/Dialogs/EditNodeDialog";
import { DeleteNodeDialog } from "@/components/Dialogs/DeleteNodeDialog";

export const ChangeContext = createContext(null);

export default function Home() {
    const [state, setState] = useState(null);
    const [isChanged, setIsChanged] = useState(false);
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const [hoveredNodeId, setHoveredNodeId] = useState(null);
    const [selectedNodeName, setSelectedNodeName] = useState('');
    const [isShowCreateDialog, setIsShowCreateDialog] = useState(false);
    const [isShowEditDialog, setIsShowEditDialog] = useState(false);
    const [isShowDeleteDialog, setIsShowDeleteDialog] = useState(false);

    useEffect(() => {
        setIsChanged(false)
        const helper = async () => {
            const data = await treeApi.getTree();
            if (data) {
                setState(data);
            }
        }

        helper();
    }, [isChanged]);


    return (
        <ChangeContext.Provider
            value={{
                isChanged,
                setIsChanged
            }}
        >
            <main className={styles.main}>
                {state &&
                    <RecursiveNodes data={[state]} treeId={state.id} selectedNodeId={selectedNodeId}
                        setSelectedNodeId={setSelectedNodeId}
                        setSelectedNodeName={setSelectedNodeName}
                        setIsShowCreateDialog={setIsShowCreateDialog}
                        setIsShowEditDialog={setIsShowEditDialog}
                        setIsShowDeleteDialog={setIsShowDeleteDialog}
                        hoveredNodeId={hoveredNodeId}
                        setHoveredNodeId={setHoveredNodeId}
                    />
                }
                <div>
                    <CreateNewNodeDialog onClose={setIsShowCreateDialog} isOpen={isShowCreateDialog}
                        nodeId={selectedNodeId} />
                    <EditNodeDialog onClose={setIsShowEditDialog} isOpen={isShowEditDialog} nodeId={selectedNodeId}
                        name={selectedNodeName} />
                    <DeleteNodeDialog onClose={setIsShowDeleteDialog} isOpen={isShowDeleteDialog}
                        nodeId={selectedNodeId} name={selectedNodeName} />
                </div>
            </main>
        </ChangeContext.Provider>
    )
}

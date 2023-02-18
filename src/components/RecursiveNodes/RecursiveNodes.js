import styles from "./Recursive.module.css";
import {useState} from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {pink} from '@mui/material/colors';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';


export const RecursiveNodes = ({
                                   data,
                                   treeId,
                                   selectedNodeId,
                                   setSelectedNodeId,
                                   setSelectedNodeName,
                                   setIsShowCreateDialog,
                                   setIsShowEditDialog,
                                   setIsShowDeleteDialog,
                                   hoveredNodeId,
                                   setHoveredNodeId

                               }) => {
    const [showNested, setShowNested] = useState({});


    const toggleNested = (name) => {
        setShowNested({...showNested, [name]: !showNested[name]});
    };

    const createNodeHandler = (isShow, nodeId) => {
        setIsShowCreateDialog(isShow);
        setSelectedNodeId(nodeId);
    }

    const editNodeHandler = (isShow, nodeId, nodeName) => {
        setIsShowEditDialog(isShow);
        setSelectedNodeId(nodeId);
        setSelectedNodeName(nodeName);
    }

    const deleteNodeHandler = (isShow, nodeId, nodeName) => {
        setIsShowDeleteDialog(isShow);
        setSelectedNodeId(nodeId);
        setSelectedNodeName(nodeName);
    }

    const handleNodeClick = (e, nodeId) => {
        e.stopPropagation();
        setSelectedNodeId(nodeId);
    }

    const handleOnHover = (e, nodeId) => {
        setHoveredNodeId(nodeId);
    }

    const handleOnMouseLeave = () => {
        setHoveredNodeId(null);
    }


    return (
        <div className={styles.container}>
            {data.map(node => {
                return (
                    <div key={node.id}
                         className={`${styles.tree_item} ${hoveredNodeId === node.id && styles.hovered_tree_item} 
                         ${node.id === selectedNodeId && styles.selected_item}`}
                         onClick={(e) => handleNodeClick(e, node.id)}
                         onMouseOverCapture={(e) => handleOnHover(e, node.id)}
                         onMouseLeave={handleOnMouseLeave}
                    >
                        <div className={styles.wrapper}
                             onClick={() => node.children.length > 0 && toggleNested(node.name)}
                        >
                            <div className={styles.root}>
                                <div className={showNested[node.name] && styles.chevronIcon}>
                                    {node.children.length > 0 &&
                                        <ChevronRightIcon className={styles.icon_item}/>}
                                </div>
                                <div className={styles.name}>{node.name}</div>
                            </div>
                            {node.id === selectedNodeId && <div className={styles.icons}>
                                <AddCircleOutlineIcon className={styles.icon_item}  color="success"
                                                      onClick={() => createNodeHandler(true, node.id)}/>
                                {treeId !== node.id && <>
                                    <EditIcon className={styles.icon_item} color="secondary"
                                              onClick={() => editNodeHandler(true, node.id, node.name)}/>
                                    <DeleteForeverIcon className={styles.icon_item} sx={{color: pink[500]}}
                                                       onClick={() => deleteNodeHandler(true, node.id, node.name)}/>
                                </>}
                            </div>}
                        </div>
                        {
                            showNested[node.name] && <div className={styles.nestedNode}>
                                {node.children.length > 0 && <div className={styles.indent_wrapper}>
                                    <RecursiveNodes data={node.children} treeId={treeId} selectedNodeId={selectedNodeId}
                                                    setSelectedNodeId={setSelectedNodeId}
                                                    setSelectedNodeName={setSelectedNodeName}
                                                    setIsShowCreateDialog={setIsShowCreateDialog}
                                                    setIsShowEditDialog={setIsShowEditDialog}
                                                    setIsShowDeleteDialog={setIsShowDeleteDialog}
                                                    hoveredNodeId={hoveredNodeId}
                                                    setHoveredNodeId={setHoveredNodeId}/>
                                </div>}
                            </div>
                        }
                    </div>
                )
            })}
        </div>
    )
}

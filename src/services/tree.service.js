import axios from "axios";

const instance = axios.create({
    baseURL: 'https://test.vmarmysh.com/',
    withCredentials: false,
});

const guid = '29a3875f-1507-4663-811f-737f4fd6a538';


export const treeApi = {
    async getTree() {
        const response = await instance.post(`api.user.tree.get?treeName=${guid}`);
        return response.data;
    },

    async createNode(parentNodeId, nodeName) {
        const response = await instance.post(`api.user.tree.node.create?treeName=${guid}&parentNodeId=${parentNodeId}&nodeName=${nodeName}`);
        return response;
    },

    async deleteNode(nodeId) {
        const response = await instance.post(`api.user.tree.node.delete?treeName=${guid}&nodeId=${nodeId}`);
        return response;
    },

    async renameNode(nodeId, newNodeName) {
        const response = await instance.post(`api.user.tree.node.rename?treeName=${guid}&nodeId=${nodeId}&newNodeName=${newNodeName}`);
        return response.data;
    }

}

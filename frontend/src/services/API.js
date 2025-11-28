import axios from './axios'

export const branchApi = {
    createBranch: async (branchData)=>{
        try {
            const { data } = await axios.post('/branch',branchData);
            return data
            
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    }
}
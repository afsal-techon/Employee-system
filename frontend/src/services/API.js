import axios from '../services/axios'

export const branchApi = {
    createBranch: async (branchData)=>{
        try {
            const { data } = await axios.post('/branch',branchData);
            return data
            
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    },

        getAllBranches: async ()=>{
        try {
            const { data } = await axios.get('/branch',{
                params:{ page, limit, search}
            });
            return data
            
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    }
}
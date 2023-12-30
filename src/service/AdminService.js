import axios from 'axios';

const AdminService = {
    getAllUser: async (token) => {
        try {
            const response = await axios.get("http://ridewizard.pro:9000/api/v1/users", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            return response;
        } catch (error) {
            return null;
        }

    }
}


export default AdminService

import axios from 'axios';
import util from '../util';
const AdminService = {
    getAllUser: async (token) => {
        try {
            const response = await axios.get("http://ridewizard.pro:9000/api/v1/users", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            if(response.status === 200)
            return response;
        } catch (error) {
            util.showToastWarning('Fail call API')
            return null;

        }

    }
}


export default AdminService

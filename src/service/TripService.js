import axios from 'axios';
import util from '../util';
const TripService = {
    getHistoryTrip: (token,driverId) => {
        try {
            // console.log(token,driverId);
            const response = axios.get(`http://ridewizard.pro:9000/api/v1/trips?driverID=${driverId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            return response
        } catch (error) {
            util.showToastWarning('Fail call API')
            return null;
        }
    }
}

export default TripService
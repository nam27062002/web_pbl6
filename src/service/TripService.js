import axios from 'axios';
import util from '../util';
const TripService = {
    getHistoryTrip: async (token,driverId) => {
        try {
            // console.log(token,driverId);
            const response = await axios.get(`http://ridewizard.pro:9000/api/v1/trips?driverID=${driverId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            if (response.status !== 200) {
                util.showToastWarning(response.data.message);
            }
            return response
        } catch (error) {
            util.showToastWarning(error.message);
            return null;
        }
    },
    getHistoryDriverTrip: async (token,driverId) => {
        try {
            // console.log(token,driverId);
            const response = await axios.get(`http://ridewizard.pro:9000/api/v1/trips?driverID=${driverId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            if (response.status !== 200) {
                util.showToastWarning(response.data.message);
            }
            return response
        } catch (error) {
            util.showToastWarning(error.message);
            return null;
        }
    },
    getHistoryPassengerTrip: async (token,driverId) => {
        try {
            // console.log(token,driverId);
            const response = await axios.get(`http://ridewizard.pro:9000/api/v1/trips?passengerID=${driverId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            if (response.status !== 200) {
                util.showToastWarning(response.data.message);
            }
            return response
        } catch (error) {
            util.showToastWarning(error.message);
            return null;
        }
    }
}

export default TripService
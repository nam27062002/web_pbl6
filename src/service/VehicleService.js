

import axios from 'axios';

const VehicleService = {
    getVehicleColor: async () => {
        try {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ3LCJlbWFpbCI6ImFkbWluIiwicm9sZXMiOlt7ImlkIjoxLCJyb2xlIjoicGFzc2VuZ2VyIn0seyJpZCI6Mywicm9sZSI6ImFkbWluIn1dLCJpYXQiOjE3MDI1NDczMDMsImV4cCI6MTcwNTEzOTMwM30.d8eYVYBYE71TAb7OmZ_aPci4YNbBw3-G1lOu7g-l0Ug";
            const response = await axios.get("http://ridewizard.pro:9000/api/v1/vehicle/colors", {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                }
                
            })
            // console.log(response.status);
            return response;
            
        } catch (e) {
            console.log(e);
        }
        
    },
    updateVehicleColor: async (id,color,des) => {
        try {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ3LCJlbWFpbCI6ImFkbWluIiwicm9sZXMiOlt7ImlkIjoxLCJyb2xlIjoicGFzc2VuZ2VyIn0seyJpZCI6Mywicm9sZSI6ImFkbWluIn1dLCJpYXQiOjE3MDI1NDczMDMsImV4cCI6MTcwNTEzOTMwM30.d8eYVYBYE71TAb7OmZ_aPci4YNbBw3-G1lOu7g-l0Ug";
            const response = await axios.put(`http://ridewizard.pro:9000/api/v1/vehicle/colors?id=${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                color: color,
                des: des
            
            });
            // console.log(response.status);
            return response;
            
        } catch (e) {
            console.log(e);
        }
        
    },
    addVehicleColor: async (color, des) => {
        try {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ3LCJlbWFpbCI6ImFkbWluIiwicm9sZXMiOlt7ImlkIjoxLCJyb2xlIjoicGFzc2VuZ2VyIn0seyJpZCI6Mywicm9sZSI6ImFkbWluIn1dLCJpYXQiOjE3MDI1NDczMDMsImV4cCI6MTcwNTEzOTMwM30.d8eYVYBYE71TAb7OmZ_aPci4YNbBw3-G1lOu7g-l0Ug";
            const response = await axios.post(`http://ridewizard.pro:9000/api/v1/vehicle/colors`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                color: color,
                des: des
            
            });
            // console.log(response.status);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    getVehicleModels: async () => {
        try {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ3LCJlbWFpbCI6ImFkbWluIiwicm9sZXMiOlt7ImlkIjoxLCJyb2xlIjoicGFzc2VuZ2VyIn0seyJpZCI6Mywicm9sZSI6ImFkbWluIn1dLCJpYXQiOjE3MDI1NDczMDMsImV4cCI6MTcwNTEzOTMwM30.d8eYVYBYE71TAb7OmZ_aPci4YNbBw3-G1lOu7g-l0Ug";
            const response = await axios.get(`http://ridewizard.pro:9000/api/v1/vehicle/models`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    addVehicleModel: async (model,type) => {
        try {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ3LCJlbWFpbCI6ImFkbWluIiwicm9sZXMiOlt7ImlkIjoxLCJyb2xlIjoicGFzc2VuZ2VyIn0seyJpZCI6Mywicm9sZSI6ImFkbWluIn1dLCJpYXQiOjE3MDI1NDczMDMsImV4cCI6MTcwNTEzOTMwM30.d8eYVYBYE71TAb7OmZ_aPci4YNbBw3-G1lOu7g-l0Ug";
            const response = await axios.post(`http://ridewizard.pro:9000/api/v1/vehicle/models`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                model: model,
                type: type,
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    updateVehicleModel: async (id, model, type) => {
        try {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ3LCJlbWFpbCI6ImFkbWluIiwicm9sZXMiOlt7ImlkIjoxLCJyb2xlIjoicGFzc2VuZ2VyIn0seyJpZCI6Mywicm9sZSI6ImFkbWluIn1dLCJpYXQiOjE3MDI1NDczMDMsImV4cCI6MTcwNTEzOTMwM30.d8eYVYBYE71TAb7OmZ_aPci4YNbBw3-G1lOu7g-l0Ug";
            const response = await axios.put(`http://ridewizard.pro:9000/api/v1/vehicle/models?id=${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                model: model,
                type: type,
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}


export default VehicleService;

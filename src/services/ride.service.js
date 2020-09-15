import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/v1/rides/';

class RideService {
    getRidesDetails(userId) {
        return axios.get(API_URL,
            { headers: authHeader(), params: { user_id: userId } }
        );
    }

    async bookRide(userId) {
        return axios.post(API_URL,
            { user_id: userId, kms: 10 },
            {headers: authHeader()}
        );
    }

    async startTrip(userId) {
        return axios.post(API_URL + 'starttrip',
            { user_id: userId, kms: 10 },
            {headers: authHeader()}
        );
    }

    async endTrip(userId) {
        return axios.post(API_URL + 'endtrip',
            { user_id: userId },
            {headers: authHeader()}
        );
    }

    async updateRating(rideId, ratings) {
        return axios.post(API_URL + 'updaterating',
            { ride_id: rideId, rating: ratings },
            {headers: authHeader()}
        );
    }

    async getCurrentRide(userId) {
        const response = await axios.get(API_URL + 'latestride',
            { headers: authHeader(), params: { user_id: userId } }
        );

        return response.data;
    }

    async getEstimate(userId, kms) {
        const response = await axios.get(API_URL + 'estimate',
            { headers: authHeader(), params: { user_id: userId, kms } }
        );

        return response.data.estimated_fare;
    }
}

export default new RideService();

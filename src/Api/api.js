import * as axios from "axios";

const baseURL = 'https://v1.nocodeapi.com/nadai/google_sheets/DlHEnizhXYDqXCkc?tabId=sheet1&api_key=GHCmpNtnTEhcSbDjA';

export const googleApi = {
    saveDataToGoogleSheet(formData){
        let name = formData.name;
        let phone = formData.phone;
        let email = formData.email;
        let url = formData.url;

        return axios.post(baseURL, JSON.stringify([[name, phone, email, url]]), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.data);
    }
}
import * as axios from "axios";

const baseURL = 'https://v1.nocodeapi.com/nadai/google_sheets/DlHEnizhXYDqXCkc?tabId=sheet1&api_key=GHCmpNtnTEhcSbDjA';

const tgToken = "1277105148:AAFhnqIm9SKeNy6Ygv-_NlXxTmwhSQwTgJo"
const chatId = "-1001430648003"
const tgUrl = "https://api.telegram.org/bot" + tgToken + "/sendMessage"

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

export const tgApi = {
    saveDataToTelegramBot(formData){
        let message = "<strong>Новая заявка!</strong>\n<strong>Лендинг:</strong> prostyle.profi-fashion.com / обычный\n<strong>Имя:</strong> " + formData.name +  "\n<strong>Телефон:</strong> " + formData.phone + "\n<strong>Email:</strong> " + formData.email;
        const data = {
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML'
        }
        return axios.post(tgUrl, data)
        .then(response => response.data)
    }
}
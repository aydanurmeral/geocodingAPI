"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const form = document.querySelector('form');
const addressInput = document.getElementById('address');
const GOOGLE_API_KEY = 'AIzaSyA9jwpDqxuUBOiUEE3l2oCuaYE6L0ClAXk';
function searchAddressHandler(event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;
    try {
        axios_1.default
            .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
            .then((response) => {
            if (response.data.status !== 'OK') {
                throw new Error('Could not find a location');
            }
            const coordinate = response.data.results[0].geometry.location;
            const map = new google.maps.Map(document.getElementById('map'), {
                center: coordinate,
                zoom: 10,
            });
            new google.maps.Marker({ position: coordinate, map: map });
        })
            .catch((err) => {
            alert(err.message);
            console.log(err);
        });
    }
    catch (err) {
        alert('Something went wrong!');
        console.error(err);
    }
}
form === null || form === void 0 ? void 0 : form.addEventListener('submit', searchAddressHandler);
//# sourceMappingURL=app.js.map
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { toast, Slide } from "react-toastify";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import App from './App';
import CachedClient from './services/CachedClient';

import * as serviceWorker from './serviceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const toastOptions = {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Slide,
    progress: 0
};

const serviceWorkerConfig = {
    toast: toast,
    toastOptions: toastOptions,
    onUpdate: (registration) => {
        window.location.reload();
    },
    onRegistered: (registration) => {
        var client = new CachedClient();
        client.getJobs();
        client.getTechnologies();
        client.getTrainings();
    }
}

// Inject the JwtToken on fetch
const constantMock = window.fetch;
window.fetch = function () {
    var token = localStorage.getItem("jwtToken");
    if (token) {
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i]["headers"]) {
                arguments[i].headers.Authorization = "Bearer " + token;
                break;
            }
        }
    }
    return constantMock.apply(this, arguments);
}


ReactDOM.render(
        <BrowserRouter basename={baseUrl}>
            <I18nextProvider i18n={i18n}>
                <App />
            </I18nextProvider>
        </BrowserRouter>,
    rootElement);

serviceWorker.register(serviceWorkerConfig);

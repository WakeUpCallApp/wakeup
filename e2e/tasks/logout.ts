import {  element, by } from 'protractor';

export function logout() {
    element(by.buttonText('Logout')).click();
}
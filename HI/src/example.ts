/// <reference types="@workadventure/iframe-api-typings" />

window.onload = async () => {
    try {
        WA.onInit().then(() => {
            console.log("WA ready to go!")
        })
    } catch (error) {
        console.error("Error from WA API:", error);
    }
}
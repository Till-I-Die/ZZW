/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;
let H5PInhalt: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    const mapUrl = WA.room.mapURL
    const root = mapUrl.substring(0, mapUrl.lastIndexOf("/"))

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    })

    WA.room.area.onLeave('clock').subscribe(closePopup)

    WA.room.area.onEnter('geographyWebsite').subscribe(async () => {
        H5PInhalt = await WA.nav.openCoWebSite(`${root}/HI/geography.html`, true, "", 69)
    })

    WA.room.area.onLeave('geographyWebsite').subscribe(() => {
        if (H5PInhalt !== undefined) {
            H5PInhalt.close();
        }
    })
    
    WA.room.area.onEnter('Inhalt').subscribe(async () => {
        H5PInhalt = await WA.nav.openCoWebSite(`${root}/HI/tool.html`, true, "", 69)
    })

    WA.room.area.onLeave('Inhalt').subscribe(() => {
        if (H5PInhalt !== undefined) {
            H5PInhalt.close();
        }
    })

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};

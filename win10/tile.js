function createTile() {

    var text = "testing123";
    var durationSeconds = 10;

    var notifications = Windows.UI.Notifications;
    var template = notifications.TileTemplateType.tileWideImageAndText01;
    var tileXml = notifications.TileUpdateManager.getTemplateContent(template);

    var tileTextAttributes = tileXml.getElementsByTagName("text");
    tileTextAttributes[0].appendChild(tileXml.createTextNode(text));

    var tileImage = tileXml.getElementsByTagName("image");
    tileImage[0].attributes['src'] = tileImage;

    var tileNotification = new notifications.TileNotification(tileXml);
    var currentTime = new Date();
    tileNotification.expirationTime = new Date(currentTime.getTime() + durationSeconds * 1000);
    notifications.TileUpdateManager.createTileUpdaterForApplication().update(tileNotification);
}

document.addEventListener("DOMContentLoaded", createTile, false);

function createSecondaryTile() {
    var currentTime = new Date();
    var logoUri = new Windows.Foundation.Uri("ms-appx:///images/Square150x150Logo.png");
    var uriSmallLogo = new Windows.Foundation.Uri("ms-appx:///images/Square44x44Logo.png");
    var TileActivationArguments = "testing123";
    var newTileDesiredSize = Windows.UI.StartScreen.TileOptions.showNameOnLogo;
    var tileId = '123';
    var text = "testing123123";

    var tile;
    try {
        tile = new Windows.UI.StartScreen.SecondaryTile(tileId, text, text, TileActivationArguments, newTileDesiredSize, logoUri);
    } catch (e) {
        //Utils.error('failed to create secondary tile', e);
        return;
    }
    var element = document.body;
    if (element) {
        var selectionRect = element.getBoundingClientRect();
        var buttonCoordinates = { x: selectionRect.left, y: selectionRect.top, width: selectionRect.width, height: selectionRect.height };
        var placement = Windows.UI.Popups.Placement.above;
        return new Promise((resolve, reject) => {
            try {
                tile.requestCreateForSelectionAsync(buttonCoordinates, placement).done((isCreated) => {
                    if (isCreated) {
                        resolve(true);
                    } else {
                        reject(false);
                    }
                });
            } catch (e) {
                //Utils.error('failed to create secondary tile', e);
                reject(false);
            }
        });
    } else {
        //Utils.debug('No element to place (shall I pin a tile) question above:' + elementId);
        return new Promise(async (resolve, reject) => {
            reject(false);
        });
    }
}

document.addEventListener("DOMContentLoaded", createSecondaryTile, false);
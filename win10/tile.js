/**
 * @file
 * The tile feature set.
 */

/**
 * A tile is an app's representation on the Start menu, every app has a tile. Windows displays this tile when your app is first installed.
 * After your app is installed, you can change your tile's content through notifications.
 * With this snippet you can personalize your tile experience.
 *
 * @alias Create Tile
 * @method createTile
 * @param {string} text Text to display on the tile.
 * @param {float} durationSeconds Duration to display the tile, in seconds. Defaults to 10.
 *
 */

function createTile(text, durationSeconds = 10) {
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
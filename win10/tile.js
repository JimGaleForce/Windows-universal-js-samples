/**
 * @file
 * The tile feature set.
 */

/**
 * createTile
 *
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

/**
 * createSecondaryTile creates a secondary tile.
 *
 * @param {string} text Text to display on the secondary tile.
 * @param {string} activationArguments Arguments to include when the tile activates the app.
 * @param {string} tileId Id of the secondary tile (so it can be replaced by a matching id). Defaults to the activationArguments.
 * @param {string} logoUri Uri of the logo to display on the tile.
 * @param {string} uriSmallLogo Uri of the small logo to display on the tile.
 * @param {string} something This is something important.
 * @see https://raw.githubusercontent.com/JimGaleForce/Windows-universal-js-samples/master/win10/images/pinCommand.PNG
 * @returns {Promise} promise.
 */
function createSecondaryTile(text, activationArguments, tileId = null, logoUri = null, uriSmallLogo = null, something = "123") {
    var currentTime = new Date();
    logoUri = logoUri || new Windows.Foundation.Uri("ms-appx:///images/Square150x150Logo.png");
    uriSmallLogo = uriSmallLogo || new Windows.Foundation.Uri("ms-appx:///images/Square44x44Logo.png");
    var newTileDesiredSize = Windows.UI.StartScreen.TileOptions.showNameOnLogo;
    tileId = tileId || activationArguments;

    var tile;
    try {
        tile = new Windows.UI.StartScreen.SecondaryTile(tileId, text, text, activationArguments,
            newTileDesiredSize, logoUri);
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

var generateTileBindingMedium = function (username, avatarLogoSource) {
    var tileBinding = new Microsoft.Toolkit.Uwp.Notifications.TileBinding();

    tileBinding.content = new Microsoft.Toolkit.Uwp.Notifications.TileBindingContentAdaptive();

    tileBinding.content.peekImage = new Microsoft.Toolkit.Uwp.Notifications.TilePeekImage();
    tileBinding.content.peekImage.source = avatarLogoSource;
    tileBinding.content.peekImage.hintCrop = Microsoft.Toolkit.Uwp.Notifications.TilePeekImageCrop.Circle;

    tileBinding.content.textStacking = Microsoft.Toolkit.Uwp.Notifications.TileTextStacking.center;

    var adaptativeText1 = new Microsoft.Toolkit.Uwp.Notifications.AdaptiveText();
    adaptativeText1.text = "Hi,";
    adaptativeText1.hintAlign = Microsoft.Toolkit.Uwp.Notifications.AdaptiveTextAlign.center;
    adaptativeText1.hintStyle = Microsoft.Toolkit.Uwp.Notifications.AdaptiveTextStyle.base;

    var adaptativeText2 = new Microsoft.Toolkit.Uwp.Notifications.AdaptiveText();
    adaptativeText2.text = username;
    adaptativeText2.hintAlign = Microsoft.Toolkit.Uwp.Notifications.AdaptiveTextAlign.center;
    adaptativeText2.hintStyle = Microsoft.Toolkit.Uwp.Notifications.AdaptiveTextStyle.captionSubtle;

    tileBinding.content.children.push(adaptativeText1);
    tileBinding.content.children.push(adaptativeText2);

    return tileBinding;
};

var generateTileBindingWide = function (username, avatarLogoSource) {
    var tileBinding = new Microsoft.Toolkit.Uwp.Notifications.TileBinding();

    tileBinding.content = new Microsoft.Toolkit.Uwp.Notifications.TileBindingContentAdaptive();

    var group = new Microsoft.Toolkit.Uwp.Notifications.AdaptiveGroup();

    var adaptativeSubgroup1 = new Microsoft.Toolkit.Uwp.Notifications.AdaptiveSubgroup();
    adaptativeSubgroup1.hintWeight = 33;
    var adaptativeImage = new Microsoft.Toolkit.Uwp.Notifications.AdaptiveImage();
    adaptativeImage.source = avatarLogoSource;
    adaptativeImage.hintCrop = Microsoft.Toolkit.Uwp.Notifications.AdaptiveImageCrop.circle;
    adaptativeSubgroup1.children.push(adaptativeImage);

    var adaptativeSubgroup2 = new Microsoft.Toolkit.Uwp.Notifications.AdaptiveSubgroup();
    adaptativeSubgroup2.hintTextStacking = Microsoft.Toolkit.Uwp.Notifications.AdaptiveSubgroupTextStacking.center;
    var adaptativeText1 = new Microsoft.Toolkit.Uwp.Notifications.AdaptiveText();
    adaptativeText1.text = "Hi,";
    adaptativeText1.hintStyle = Microsoft.Toolkit.Uwp.Notifications.AdaptiveTextStyle.title;
    var adaptativeText2 = new Microsoft.Toolkit.Uwp.Notifications.AdaptiveText();
    adaptativeText2.text = username;
    adaptativeText2.hintStyle = Microsoft.Toolkit.Uwp.Notifications.AdaptiveTextStyle.subtitleSubtle;
    adaptativeSubgroup2.children.push(adaptativeText1);
    adaptativeSubgroup2.children.push(adaptativeText2);

    group.children.push(adaptativeSubgroup1);
    group.children.push(adaptativeSubgroup2);

    tileBinding.content.children.push(group);

    return tileBinding;
};

var generateTileBindingLarge = function (username, avatarLogoSource) {
    var tileBinding = new Microsoft.Toolkit.Uwp.Notifications.TileBinding();

    tileBinding.content = new Microsoft.Toolkit.Uwp.Notifications.TileBindingContentAdaptive();
    tileBinding.content.textStacking = Microsoft.Toolkit.Uwp.Notifications.TileTextStacking.center;

    var group = new Microsoft.Toolkit.Uwp.Notifications.AdaptiveGroup();

    var adaptativeSubgroup1 = new Microsoft.Toolkit.Uwp.Notifications.AdaptiveSubgroup();
    adaptativeSubgroup1.hintWeight = 1;

    // we surround the image by two subgroups so that it doesn't take the full width
    var adaptativeSubgroup2 = new Microsoft.Toolkit.Uwp.Notifications.AdaptiveSubgroup();
    adaptativeSubgroup2.hintWeight = 2;
    var adaptativeImage = new Microsoft.Toolkit.Uwp.Notifications.AdaptiveImage();
    adaptativeImage.source = avatarLogoSource;
    adaptativeImage.hintCrop = Microsoft.Toolkit.Uwp.Notifications.AdaptiveImageCrop.circle;
    adaptativeSubgroup2.children.push(adaptativeImage);

    var adaptativeSubgroup3 = new Microsoft.Toolkit.Uwp.Notifications.AdaptiveSubgroup();
    adaptativeSubgroup3.hintWeight = 1;

    group.children.push(adaptativeSubgroup1);
    group.children.push(adaptativeSubgroup2);
    group.children.push(adaptativeSubgroup3);

    var adaptativeText1 = new Microsoft.Toolkit.Uwp.Notifications.AdaptiveText();
    adaptativeText1.text = "Hi,";
    adaptativeText1.hintAlign = Microsoft.Toolkit.Uwp.Notifications.AdaptiveTextAlign.center;
    adaptativeText1.hintStyle = Microsoft.Toolkit.Uwp.Notifications.AdaptiveTextStyle.title;

    var adaptativeText2 = new Microsoft.Toolkit.Uwp.Notifications.AdaptiveText();
    adaptativeText2.text = username;
    adaptativeText2.hintAlign = Microsoft.Toolkit.Uwp.Notifications.AdaptiveTextAlign.center;
    adaptativeText2.hintStyle = Microsoft.Toolkit.Uwp.Notifications.AdaptiveTextStyle.subtitleSubtle;

    tileBinding.content.children.push(group);
    tileBinding.content.children.push(adaptativeText1);
    tileBinding.content.children.push(adaptativeText2);

    return tileBinding;
};

var generateTileContent = function (username, avatarLogoSource) {
    var tileContent = new Microsoft.Toolkit.Uwp.Notifications.TileContent();
    tileContent.visual = new Microsoft.Toolkit.Uwp.Notifications.TileVisual();
    tileContent.visual.tileMedium = generateTileBindingMedium(username, avatarLogoSource);
    tileContent.visual.tileWide = generateTileBindingWide(username, avatarLogoSource);
    tileContent.visual.tileLarge = generateTileBindingLarge(username, avatarLogoSource);

    return tileContent;
};


/**
 * pinTile creates a secondary tile.
 *
 * @param {string} text Text to display on the secondary tile.
 * @param {string} activationArguments Arguments to include when the tile activates the app.
 * @param {string} tileId Id of the secondary tile (so it can be replaced by a matching id). Defaults to the activationArguments.
 * @param {string} imageForTile Uri of the image to display on the tile. Defaults to square44x44Logo png in assets.
 * @param {string} square150x150Logo Uri of the logo to display on the tile. Defaults to same named png in assets.
 * @param {string} wide310x150Logo Uri of the logo to display on the tile. Defaults to same named png in assets.
 * @param {string} square310x310Logo Uri of the logo to display on the tile. Defaults to same named png in assets.
 * @see https://raw.githubusercontent.com/JimGaleForce/Windows-universal-js-samples/master/win10/images/pinCommand.PNG
 * @returns {Promise} promise.
 */

function pinTile(text, activationArguments, tileId = null, imageForTile = null,
    square150x150Logo = null, wide310x150Logo = null, square310x310Logo = null) {
    var tile = new Windows.UI.StartScreen.SecondaryTile(new Date().getTime());

    var square44x44Logo = new Windows.Foundation.Uri("ms-appx:///Assets/Square44x44Logo.png");
    var defaultSquare150x150Logo = new Windows.Foundation.Uri("ms-appx:///Assets/Square150x150Logo.png");
    var defaultWide310x150Logo = new Windows.Foundation.Uri("ms-appx:///Assets/Wide310x150Logo.png");
    var defaultSquare310x310Logo = new Windows.Foundation.Uri("ms-appx:///Assets/Square310x310Logo.png");

    imageForTile = imageForTile || square44x44Logo;

    tile.displayName = text;
    tile.arguments = activationArguments;
    tile.visualElements.square150x150Logo = square150x150Logo || defaultSquare150x150Logo;
    tile.visualElements.wide310x150Logo = wide310x150Logo || defaultWide310x150Logo;
    tile.visualElements.square310x310Logo = square310x310Logo || defaultSquare310x310Logo;
    tile.visualElements.showNameOnSquare150x150Logo = true;
    tile.visualElements.showNameOnSquare310x310Logo = true;
    tile.visualElements.showNameOnWide310x150Logo = true;

    tile.requestCreateAsync()
        .then(function () {
            // generate the tile notification content and update the tile
            var content = generateTileContent(text, imageForTile);
            var tileNotification = new Windows.UI.Notifications.TileNotification(content.getXml());
            Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForSecondaryTile(tile.TileId).update(tileNotification);
        });
};
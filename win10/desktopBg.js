/**
 * @file
 * Change Desktop Background.
 */

/**
 * Attempts to set the specified image file as the desktop wallpaper image. Requires "uap:Capability" with value "userAccountInformation".
 * @alias Change Desktop Background
 * @method changeDesktopBackgroundImage
 * @param {string} localImagePath Path to the stored image, as part of the application resources/assets.
 * @see https://docs.microsoft.com/en-us/uwp/api/windows.system.userprofile.userprofilepersonalizationsettings.trysetwallpaperimageasync
 */
async function changeDesktopBackgroundImage(localImagePath) {
    if (!window.Windows || !Windows.System.UserProfile.UserProfilePersonalizationSettings.isSupported()) {
        return;
    }

    const profileSettings = Windows.System.UserProfile.UserProfilePersonalizationSettings.current;

    // 1. Get a reference to the original image (from manifest)
    let originalBg = await Windows.Storage.StorageFile.getFileFromApplicationUriAsync(new Windows.Foundation.Uri("ms-appx:///" + localImagePath));

    // 2. Copy image to LocalState folder
    const last = (arr) => arr[arr.length - 1];
    let newName = last(localImagePath.split('/'));
    await originalBg.copyAsync(Windows.Storage.ApplicationData.current.localFolder, newName, 1);
    let localBg = await Windows.Storage.ApplicationData.current.localFolder.getFileAsync(newName);

    // 3. Set as desktop bg image
    await profileSettings.trySetWallpaperImageAsync(localBg);
}
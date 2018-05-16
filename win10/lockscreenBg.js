/**
 * @file
 * Change Lock Screen Background.
 */

/**
 * Attempts to set the specified image file as the lock screen background image. Requires "uap:Capability" with value "userAccountInformation".
 * @alias Change Lock Screen Background
 * @method changeWindowsLockScreenImage
 * @param {string} localImagePath Path to the stored image, as part of the application resources/assets.
 * @see https://docs.microsoft.com/en-us/uwp/api/windows.system.userprofile.userprofilepersonalizationsettings.trysetlockscreenimageasync
 */
async function changeWindowsLockScreenImage(localImagePath) {
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

    // 3. Set as lockscreen image
    await profileSettings.trySetLockScreenImageAsync(localBg);
}
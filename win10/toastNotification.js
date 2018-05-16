/**
 * @file
 * The Toast Notification feature set.
 */

/**
 * Toast notifications allows your app to inform the users about relevant information and timely events that they should see and take action upon inside your app, such as a new instant message, a new friend request, breaking news, or a calendar event. When the user “chases” the notification (by tapping or clicking on the toast to activate the app), the app should navigate the user to the page with the right context.
 * This snippet allows you to create Toast notifications with a main text line, a secondary text body and a background image.
 *
 * @alias Create Toast Notification
 * @method showToastNotification
 * @param {string} title The first line of the notification.
 * @param {string} body The secondary text lines.
 * @param {string} imagePath Relative path to the background image.
 *
 */
function showToastNotification(title, body, imagePath) {
    if (!window.Windows) return Promise.resolve(false);

    var imageUrl = window.location.protocol + '//' + window.location.host + imagePath;

    // Create ToastNotification as XML Doc
    var toastXml = new Windows.Data.Xml.Dom.XmlDocument();
    toastXml.loadXml(toastNotificationXmlTemplate);

    // Update the background image
    var images = toastXml.getElementsByTagName('image');
    images[0].setAttribute('src', imageUrl);

    // Set notification texts
    var textNodes = toastXml.getElementsByTagName('text');
    textNodes[0].innerText = title;
    textNodes[1].innerText = body;

    // Create a toast notification from the XML, then create a ToastNotifier object to send the toast.
    var toast = new Windows.UI.Notifications.ToastNotification(toastXml);
    Windows.UI.Notifications.ToastNotificationManager.createToastNotifier().show(toast);
}

var toastNotificationXmlTemplate =
`<toast>
    <visual>
        <binding template="ToastGeneric">
            <text hint-maxLines="1"></text>
            <text></text>
            <image placement="" src=""/>
        </binding>
    </visual>
</toast>`;
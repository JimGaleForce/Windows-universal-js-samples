/**
 * @file
 * The Timeline Activity feature set.
 */

/**
 * Timeline lets you go back in time to past activities you’ve worked on across your devices, so you can jump back into them like you never left.
 * This snippet allows you to create Activities with a predefined Adaptive Card.
 *
 * @alias Add Activity to Windows Timeline
 * @method addTimelineActivity
 * @param {string} id The identifier for the UserActivity.
 * @param {string} title First text line of the Adaptive Card.
 * @param {string} bodyText Secondary text lines of the Adaptive Card.
 * @param {string} imagePath Relative path to the background image.
 * @param {string} activationUri The activation Uniform Resource Identifier (URI). Can be an Internet address or a URL with custom protocol prefix that the application understands.
 * @see https://docs.microsoft.com/en-us/windows/uwp/launch-resume/useractivities
 */
async function addTimelineActivity(id, title, bodyText, imagePath, activationUri) {
    if (!window.Windows) {
        return false;
    }

    var imageUrl = window.location.protocol + '//' + window.location.host + imagePath;

    // build adaptive card
    var cardJson = Object.assign({}, adaptiveCardTemplate);
    cardJson.backgroundImage = imageUrl;
    cardJson.body[0].items[0].text = title;
    cardJson.body[0].items[1].text = bodyText;
    var adaptiveCard = Windows.UI.Shell.AdaptiveCardBuilder.createAdaptiveCardFromJson(JSON.stringify(cardJson));

    var channel = Windows.ApplicationModel.UserActivities.UserActivityChannel.getDefault();

    // create and save activity
    var activity = await channel.getOrCreateUserActivityAsync(id);
    activity.visualElements.content = adaptiveCard;
    activity.visualElements.displayText = bodyText;
    activity.activationUri = new Windows.Foundation.Uri(activationUri);

    await activity.saveAsync();

    if (lastKnownSession && lastKnownSession.close) {
        lastKnownSession.close();
    }

    lastKnownSession = activity.createSession();
}

var lastKnownSession = null;
var adaptiveCardTemplate = {
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "type": "AdaptiveCard",
    "version": "1.0",
    "backgroundImage": null,
    "body": [
        {
            "type": "Container",
            "items": [
                {
                    "type": "TextBlock",
                    "text": null,
                    "weight": "bolder",
                    "size": "large",
                    "wrap": true,
                    "maxLines": 3
                },
                {
                    "type": "TextBlock",
                    "text": null,
                    "size": "default",
                    "wrap": true,
                    "maxLines": 3
                }
            ]
        }
    ]
};
/**
 * @file
 * App Title Bar.
 */

/**
 * You can customize the appearance of the title bar of your Windows 10 app window (ApplicationView class), which by default is Windows system grey and displays the title of your app on the left, and includes three buttons (Minimize, Maximize, and Close) on the right.
 *
 * @alias Change app title bar color
 * @method changeAppTitleBarColor
 * @param {string} backgroundColor RGB Background color.
 * @param {string} foregroundColor RGB foreground color.
 * @param {string} buttonBackgroundColor RGB button background color.
 * @param {string} buttonForegroundColor RGB button foreground color.
 * @param {string} buttonHoverBackgroundColor RGB button hover Background color.
 * @param {string} buttonHoverForegroundColor RGB button hover foreground color.
 * @param {string} buttonPressedBackgroundColor RGB button pressed background color.
 * @param {string} buttonPressedForegroundColor RGB button pressed foreground color.
 * @param {string} inactiveBackgroundColor RGB inactive background color.
 * @param {string} inactiveForegroundColor RGB inactive foreround color.
 * @param {string} buttonInactiveBackgroundColor RGB button inactive background color.
 * @param {string} buttonInactiveForegroundColor RGB button inactive foreground color.
 */

function changeAppTitleBarColor(backgroundColor, foregroundColor, buttonBackgroundColor, buttonForegroundColor, 
                                buttonHoverBackgroundColor, buttonHoverForegroundColor, buttonPressedBackgroundColor, 
                                buttonPressedForegroundColor, inactiveBackgroundColor, inactiveForegroundColor,
                                buttonInactiveBackgroundColor, buttonInactiveForegroundColor ){

  if (window.Windows && Windows.UI.ViewManagement.ApplicationView) {
    var customColors = {
      backgroundColor: backgroundColor,
      foregroundColor:  foregroundColor,
      buttonBackgroundColor: buttonBackgroundColor,
      buttonForegroundColor: buttonForegroundColor,
      buttonHoverBackgroundColor: buttonHoverBackgroundColor,
      buttonHoverForegroundColor: buttonHoverForegroundColor,
      buttonPressedBackgroundColor: buttonPressedBackgroundColor,
      buttonPressedForegroundColor: buttonPressedForegroundColor,
      inactiveBackgroundColor: inactiveBackgroundColor,
      inactiveForegroundColor: inactiveForegroundColor,
      buttonInactiveBackgroundColor: buttonInactiveBackgroundColor,
      buttonInactiveForegroundColor: buttonInactiveForegroundColor
    };

    var titleBar = Windows.UI.ViewManagement.ApplicationView.getForCurrentView().titleBar;
    titleBar.backgroundColor = customColors.backgroundColor;
    titleBar.foregroundColor = customColors.foregroundColor;
    titleBar.inactiveBackgroundColor = customColors.inactiveBackgroundColor;
    titleBar.inactiveForegroundColor = customColors.inactiveForegroundColor; 
  }
}
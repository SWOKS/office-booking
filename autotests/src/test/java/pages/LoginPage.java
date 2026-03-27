package pages;

import org.openqa.selenium.Alert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class LoginPage extends BasePage {

    public LoginPage(WebDriver driver) {
        super(driver);
    }

    @FindBy(css = "a[href='/login']")
    private WebElement loginLink;

    @FindBy(id = "username")
    private WebElement usernameInput;

    @FindBy(id = "password")
    private WebElement passwordInput;

    @FindBy(css = "button[type='submit']")
    private WebElement loginButton;

    @FindBy(css = "span.user-name")
    private WebElement userNameLabel;

    public void navigateToLoginPage() {
        wait.waitForClickable(loginLink);
        loginLink.click();
    }

    public void enterUsername(String username) {
        wait.waitForVisibility(usernameInput);
        usernameInput.sendKeys(username);
    }

    public void enterPassword(String password) {
        wait.waitForVisibility(passwordInput);
        passwordInput.sendKeys(password);
    }

    public void clickLogin() {
        wait.waitForClickable(loginButton);
        loginButton.click();
    }

    public boolean isUserLoggedIn() {
        wait.waitForVisibility(userNameLabel);
        return userNameLabel.isDisplayed();
    }

}
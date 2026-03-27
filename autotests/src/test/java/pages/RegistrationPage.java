package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class RegistrationPage extends BasePage{

    public RegistrationPage(WebDriver driver) {super(driver);}

    @FindBy(css = "a[href='/register']")
    private WebElement registrationLink;

    @FindBy(id = "username")
    private WebElement usernameInput;

    @FindBy(css = ".login-box")
    private WebElement loginBox;

    @FindBy(id = "email")
    private WebElement emailInput;

    @FindBy(id = "password")
    private WebElement passwordInput;

    @FindBy(id = "confirmPassword")
    private WebElement confirmPasswordInput;

    @FindBy(css = "button[type='submit']")
    private WebElement registrationButton;

    @FindBy(css = "a[href='/login']")
    private WebElement loginLink;

    @FindBy(css = ".user-name")
    private WebElement userNameLabel;

    public void navigateToRegistrationPage() {
        wait.waitForClickable(registrationLink);
        registrationLink.click();
    }

    public void enterRegistrationUserName(String username) {
        wait.waitForVisibility(usernameInput);
        usernameInput.sendKeys(username);
    }

    public void enterRegistrationPassword(String password) {
        wait.waitForVisibility(passwordInput);
        passwordInput.sendKeys(password);
    }

    public void confirmRegistrationPassword(String confirmPassword) {
        wait.waitForVisibility(confirmPasswordInput);
        confirmPasswordInput.sendKeys(confirmPassword);
    }

    public void enterRegistrationEmail(String email) {
        wait.waitForClickable(emailInput);
        emailInput.sendKeys(email);
    }

    public void clickRegistration() {
        wait.waitForClickable(registrationButton);
        registrationButton.click();
    }

    public boolean isUserRegistrated() {
        wait.waitForVisibility(loginBox);
        return loginBox.isDisplayed();
    }
}

package steps;

import io.qameta.allure.Step;
import org.openqa.selenium.WebDriver;
import pages.RegistrationPage;

public class RegistrationSteps {

    private RegistrationPage registrationPage;

    public RegistrationSteps(WebDriver driver) {
        registrationPage = new RegistrationPage(driver);
    }

    @Step("Login with username: {username}")
    public void registration(String username, String password, String confirmPassword, String email) {
        registrationPage.navigateToRegistrationPage();
        registrationPage.enterRegistrationUserName(username);
        registrationPage.enterRegistrationEmail(email);
        registrationPage.enterRegistrationPassword(password);
        registrationPage.confirmRegistrationPassword(confirmPassword);
        registrationPage.clickRegistration();
    }

    @Step("Check user is register in")
    public boolean isRegistrationSucceseful(){
        return registrationPage.isUserRegistrated();
    }
}

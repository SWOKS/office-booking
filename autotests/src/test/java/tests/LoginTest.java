package tests;

import base.BaseTest;
import io.qameta.allure.Allure;
import org.junit.jupiter.api.Test;
import steps.LoginSteps;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class LoginTest extends BaseTest {

    @Test
    void loginTest() throws InterruptedException {
        Allure.step("Test started");
        LoginSteps loginSteps = new LoginSteps(driver);
        loginSteps.login("user1", "user123");
        assertTrue(loginSteps.isLoginSuccessful());
        Thread.sleep(3000);
    }

}
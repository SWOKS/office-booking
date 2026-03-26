package tests;

import base.BaseTest;
import io.qameta.allure.Allure;
import org.junit.jupiter.api.Test;
import steps.LoginSteps;
import steps.RegistrationSteps;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class RegistrationsTest extends BaseTest {

    @Test
    void registrationTest() throws InterruptedException{
        Allure.step("Test started");
        RegistrationSteps registrationSteps = new RegistrationSteps(driver);
        registrationSteps.registration("user2", "user228", "user228", "daunebuchiy228@mail.ru");
        assertTrue(
                registrationSteps.isRegistrationSucceseful(),
                "Пользователь успешно зарегистрирован, есть возможность перейти на страницу логина"
        );
    }
}

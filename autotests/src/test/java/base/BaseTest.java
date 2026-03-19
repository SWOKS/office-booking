package base;

import config.ConfigReader;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.openqa.selenium.WebDriver;
import utils.DriverFactory;
import io.qameta.allure.junit5.AllureJunit5;

@ExtendWith(AllureJunit5.class)
public class BaseTest {

    protected WebDriver driver;

    @BeforeEach
    public void setUp() {
        driver = DriverFactory.getDriver();
        driver.get(ConfigReader.get("base.url"));
    }

    @AfterEach
    public void tearDown() {
        DriverFactory.quitDriver();
    }
}
package utils;

import config.ConfigReader;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.time.Duration;

public class DriverFactory {

    private static WebDriver driver;

    public static WebDriver getDriver() {
        if (driver == null) {
            String browser = ConfigReader.get("browser");

            if (browser.equalsIgnoreCase("chrome")) {
                ChromeOptions options = new ChromeOptions();

                if (ConfigReader.get("headless").equals("true")) {
                    options.addArguments("--headless");
                }

                driver = new ChromeDriver(options);
                driver.manage().window().maximize();
            }
        }

        return driver;
    }

    public static void quitDriver() {
        if (driver != null) {
            driver.quit();
            driver = null;
        }
    }
}
package edu.wgu.d387_sample_code.services;

import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.ResourceBundle;

@Service
public class WelcomeServiceImpl implements WelcomeService {
    @Override
    public String getWelcomeMessage(String language) {
        Locale locale = new Locale(language);
        ResourceBundle resourceBundle = ResourceBundle.getBundle("messages", locale);
        return resourceBundle.getString("welcome.message");
    }
}
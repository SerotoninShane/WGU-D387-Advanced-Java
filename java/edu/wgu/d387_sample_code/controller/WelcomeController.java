package edu.wgu.d387_sample_code.controller;

import edu.wgu.d387_sample_code.services.WelcomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class WelcomeController {
    @Autowired
    private WelcomeService welcomeService; // Inject the interface

    @GetMapping("/welcome")
    public List<String> getWelcomeMessages() {
        List<String> messages = new ArrayList<>();

        // Get the messages for both languages
        messages.add(welcomeService.getWelcomeMessage("en"));
        messages.add(welcomeService.getWelcomeMessage("fr"));

        return messages;
    }
}

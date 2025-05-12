package edu.wgu.d387_sample_code.controller;

import edu.wgu.d387_sample_code.services.TimeService;  // Import your TimeService here
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalTime;
import java.util.Map;

@RestController
@RequestMapping("/api/time")
public class TimeController {

    @Autowired
    private TimeService timeService;

    @GetMapping("/converted")
    public ResponseEntity<Map<String, String>> getConvertedTimes(@RequestParam String time) {
        Map<String, String> times = timeService.getConvertedTimes(time);
        return new ResponseEntity<>(times, HttpStatus.OK);
    }
}

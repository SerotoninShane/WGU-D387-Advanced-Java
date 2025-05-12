package edu.wgu.d387_sample_code.services;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
public class TimeService {

    public Map<String, String> getConvertedTimes(String inputTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");

        // Parse the input time as LocalTime
        LocalTime localTime = LocalTime.parse(inputTime, formatter);

        // Convert the LocalTime to ZonedDateTime in Eastern Time (ET)
        ZonedDateTime currentTime = ZonedDateTime.now(ZoneId.of("America/New_York"))
                .withHour(localTime.getHour())
                .withMinute(localTime.getMinute());

        // Convert to Mountain Time (MT)
        ZonedDateTime mtTime = currentTime.withZoneSameInstant(ZoneId.of("America/Denver"));

        // Convert to UTC
        ZonedDateTime utcTime = currentTime.withZoneSameInstant(ZoneId.of("UTC"));

        Map<String, String> times = new HashMap<>();
        times.put("ET", currentTime.format(formatter) + " ET");
        times.put("MT", mtTime.format(formatter) + " MT");
        times.put("UTC", utcTime.format(formatter) + " UTC");

        return times;
    }
}
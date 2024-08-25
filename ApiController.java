import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/bfhl")
public class ApiController {

    @GetMapping
    public Map<String, Integer> getOperationCode() {
        Map<String, Integer> response = new HashMap<>();
        response.put("operation_code", 1);
        return response;
    }

    @PostMapping
    public Map<String, Object> processData(@RequestBody Map<String, List<String>> requestData) {
        Map<String, Object> response = new HashMap<>();
        List<String> data = requestData.get("data");
        List<String> numbers = new ArrayList<>();
        List<String> alphabets = new ArrayList<>();
        String highestLowerCase = null;

        for (String item : data) {
            if (item.matches("\\d+")) {
                numbers.add(item);
            } else if (item.matches("[a-zA-Z]")) {
                alphabets.add(item);
                if (item.matches("[a-z]") && (highestLowerCase == null || item.compareTo(highestLowerCase) > 0)) {
                    highestLowerCase = item;
                }
            }
        }

        response.put("is_success", true);
        response.put("user_id", "your_name_ddmmyyyy");
        response.put("email", "your_email@xyz.com");
        response.put("roll_number", "ABCD123");
        response.put("numbers", numbers);
        response.put("alphabets", alphabets);
        response.put("highest_lowercase_alphabet", highestLowerCase != null ? Collections.singletonList(highestLowerCase) : new ArrayList<>());

        return response;
    }
}

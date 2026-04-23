package com.example.resumeanalyzer.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class ResumeController {

    
    private List<Map<String, String>> jobList = new ArrayList<>();

  
    @GetMapping("/test")
    public String test() {
        return "Backend working!";
    }


    @PostMapping("/analyze")
public Map<String, Object> analyze(@RequestParam("file") MultipartFile file) throws Exception {

    String text = new String(file.getBytes()).toLowerCase();

    List<String> skills = new ArrayList<>();

 
    if (text.contains("java")) skills.add("Java");
    if (text.contains("html")) skills.add("HTML");
    if (text.contains("css")) skills.add("CSS");
    if (text.contains("javascript")) skills.add("JavaScript");
    if (text.contains("python")) skills.add("Python");
    if (text.contains("sql")) skills.add("SQL");

   
    int score = skills.size() * 20;
    if (score > 100) score = 100;


    List<String> suggestions = new ArrayList<>();
    if (!skills.contains("Java")) suggestions.add("Add Java skills");
    if (!skills.contains("SQL")) suggestions.add("Add Database knowledge");
    if (skills.size() < 3) suggestions.add("Add more skills");

    Map<String, Object> result = new HashMap<>();
    result.put("score", score);
    result.put("skills", skills);
    result.put("suggestions", suggestions);

    return result;
}

 //search jobs   
    @GetMapping("/jobs")
public List<Map<String, String>> getJobs(@RequestParam String title) {

    String query = title.toLowerCase().trim();

   
    if (!jobList.isEmpty()) {
        List<Map<String, String>> filtered = new ArrayList<>();

        for (Map<String, String> job : jobList) {
            String jobTitle = job.getOrDefault("title", "").toLowerCase();
            if (jobTitle.contains(query)) {
                filtered.add(job);
            }
        }
        return filtered;
    }

    
    List<Map<String, String>> jobs = new ArrayList<>();

    Map<String, String> job1 = new HashMap<>();
    job1.put("title", "Java Developer");
    job1.put("location", "Delhi");

    Map<String, String> job2 = new HashMap<>();
    job2.put("title", "Frontend Developer");
    job2.put("location", "Remote");

    jobs.add(job1);
    jobs.add(job2);

    List<Map<String, String>> filtered = new ArrayList<>();
    for (Map<String, String> job : jobs) {
        if (job.get("title").toLowerCase().contains(query)) {
            filtered.add(job);
        }
    }

    return filtered;
}

   
    @PostMapping("/postjob")
public Map<String, String> postJob(@RequestBody Map<String, String> job) {

    System.out.println("JOB RECEIVED: " + job); 

    jobList.add(job);

    Map<String, String> response = new HashMap<>();
    response.put("message", "Job posted successfully!");

    return response;
}
}
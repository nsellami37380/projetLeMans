package com.lemans24.Project.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {
    @Autowired
    private EMailService emailService;

    // Sending a simple Email
    @PostMapping("/sendMail")
    public EmailDetails sendMail(@RequestBody EmailDetails details)
    {
        String status = emailService.sendSimpleMail(details);
        details.setStatus(status);
        return details;

        //return status;
    }

    // Sending email with attachment
    @PostMapping("/sendMailWithAttachment")
    public String sendMailWithAttachment(
            @RequestBody EmailDetails details)
    {
        String status
                = emailService.sendMailWithAttachment(details);

        return status;
    }
}

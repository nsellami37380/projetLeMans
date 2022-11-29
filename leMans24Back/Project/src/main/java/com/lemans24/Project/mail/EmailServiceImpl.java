package com.lemans24.Project.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;

@Service
public class EmailServiceImpl  implements EMailService{

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}") private String sender;

    @Override
    public String sendSimpleMail(EmailDetails details) {
        // Try block to check for exceptions
        try {

            // Creating a simple mail message
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            // Setting up necessary details
            mailMessage.setFrom(sender);
            mailMessage.setText(details.getClaim());
            mailMessage.setSubject(details.getSubject());

            String[] emailIds = new String[4];
            emailIds[0] = "noureddinesellami@outlook.fr";
            emailIds[1] = "raphael.go117@gmail.com";
            emailIds[2] = "skormtailes@gmail.com";
            emailIds[3] = "gwendal.bessot.pro@gmail.com";



            mailMessage.setTo(emailIds);

            javaMailSender.send(mailMessage);

            // send message confirmation to sender
            mailMessage.setText("Votre message a bien été envoyé ! \n \n" + details.getClaim());
            mailMessage.setTo(details.getEmail());
            javaMailSender.send(mailMessage);
            return "Le message a bien été envoyé !";
        }

        // Catch block to handle the exceptions
        catch (Exception e) {
            return "Error while Sending Mail " + e.getMessage();
        }
    }

    @Override
    public String sendMailWithAttachment(EmailDetails details) {
        // Creating a mime message
        MimeMessage mimeMessage
                = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        try {

            // Setting multipart as true for attachments to
            // be send
            mimeMessageHelper
                    = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getEmail());
            mimeMessageHelper.setText(details.getClaim());
            mimeMessageHelper.setSubject(
                    details.getSubject());

            // Adding the attachment
            FileSystemResource file
                    = new FileSystemResource(
                    new File(details.getAttachment()));

            mimeMessageHelper.addAttachment(
                    file.getFilename(), file);

            // Sending the mail
            javaMailSender.send(mimeMessage);
            return "Mail sent Successfully";
        }

        // Catch block to handle MessagingException
        catch (MessagingException e) {

            // Display message when exception occurred
            return "Error while sending mail 2!!! " + e.getMessage();
        }
    }
    }


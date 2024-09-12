package com.lemans24.Project.mail;
// Importing required classes


public interface EMailService {
    String sendSimpleMail(EmailDetails details);
    String sendMailWithAttachment(EmailDetails details);


}

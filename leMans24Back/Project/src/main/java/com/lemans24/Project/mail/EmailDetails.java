package com.lemans24.Project.mail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailDetails {

    // Class data members
  //  private String recipient;
   // private String msgBody;
    private String lastName;
    private String firstname;
    private String email;
    private String claim;
    private String subject = "ContactTeam 2";
    private String attachment;
    private String status="";

}

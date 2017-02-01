<!------------------COPYRIGHT------------------*
* ALL RIGHTS RESERVED TO VLAD BALANESCU, 2016  *
* Personal Website                             *
* NOTICE:  All  information  contained  herein *
*          is and remains  the   property   of *
*          Vlad Balanescu.  The   intellectual *
*          and technical  concepts   contained *
*          herein  are proprietary   to   Vlad *
*          Balanescu.   Dissemination  of this *
*          information   or   reproduction  of *
*          this material is strictly forbidden *
*          unless prior written  permission is *
*          obtained    from     Vlad Balanescu.*
----------------------------------------------->
<?php
// Get the input data
$field_name = $_POST['vname'];
$field_email = $_POST['vemail'];
$field_message = $_POST['vmessage'];
$field_url = $_POST['url'];
$checkBox1 = $_POST['checkBox1'];
$checkBox2 = $_POST['checkBox2'];
$checkBox3 = $_POST['checkBox3'];

// Get the timestamp
date_default_timezone_set('Europe/London');
$timestamp = date('d/m/Y h:i:s a', time());

// Get the ticked checkbox
if (isset($checkBox1)) {
  $option = 'Message';
} elseif (isset($checkBox2))  {
    $option = 'Suggestion';
  } else {
    $option = 'Bug';
  }

// Prepare the email
$mail_to = 'vlad_balanescu@yahoo.com';
$subject = 'Personal Website Message';
$body_message = 'Message from my personal website. Response required !'."\n";
$body_message .= '*******************************************************'."\n";
$body_message .= 'From: '.$field_name."\n";
$body_message .= 'E-mail: '.$field_email."\n";
$body_message .= 'Option: '.$option."\n";
$body_message .= 'Message: '.$field_message."\n";
$body_message .= '*******************************************************'."\n";
$body_message .= 'Sent on '.$timestamp;

//Check if all the fields are filled in apart from URL and send the message
if(isset($field_url) && $field_url == '' && $field_name !='' && $field_email !='' && $field_message !='' ) {
      mail($mail_to, $subject, $body_message);
}

//Display successfully sent message under any circumstances
?><script language="javascript" type="text/javascript">
      // Print a message
      alert('Message successfully sent!');
      // Redirect to contact page
      window.location='../contact.html';
  </script>

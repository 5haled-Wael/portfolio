const sendEmail = ({ name, email, message }) => {
  const subject = `Portfolio message from ${name}`;

  const body = `
  Name: ${name}
  Email: ${email}
  Message: ${message}`;

  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=waelk8506@gmail.com&su=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;

  window.open(gmailLink, "_blank");
};

export default sendEmail;

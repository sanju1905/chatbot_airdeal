// const nodemailer = require('nodemailer');

// const sendMail = async (bookingDetails) => {
//   let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'pepib38845@cartep.com',
//       pass: 'pepib38845@cartep.com',
//     },
//   });

//   let mailOptions = {
//     from: 'pepib38845@cartep.com',
//     to: 'pepib38845@cartep.com',
//     subject: 'Booking Details',
//     text: bookingDetails,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// };

// module.exports = sendMail;

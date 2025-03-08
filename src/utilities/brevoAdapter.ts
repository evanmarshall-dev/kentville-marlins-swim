import axios from 'axios'
import { EmailAdapter, SendEmailOptions } from 'payload'

// Need to confirm type return of email adapter.
const brevoAdapter = (): EmailAdapter => {
  // Declare adapter.
  const adapter = () => ({
    // Returns config for email adapter.
    name: 'brevo',
    // Define default from name and email.
    defaultFromName: process.env.BREVO_SENDER_NAME as string,
    defaultFromAddress: process.env.BREVO_SENDER_EMAIL as string,
    // Function that sends emails. Async fxn that takes a message of the type SendEmailOptions.
    // Returns a promise.
    sendEmail: async (message: SendEmailOptions): Promise<unknown> => {
      // Check for flag if we want to send emails.
      if (!process.env.BREVO_EMAILS_ACTIVE) {
        console.log('Emails disabled, logging to console.')
        console.log(message)
        return
      }
      // Now we want to send emails.
      // Wrap in try/catch.
      try {
        // Use axios to send the request to the Brevo API to send email.
        // Return result object.
        const res = await axios({
          // Make a post request to the Brevo URL.
          method: 'post',
          url: 'https://api.brevo.com/v3/smtp/email',
          // Also takes headers.
          headers: {
            'api-key': process.env.BREVO_API_KEY as string,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          // After header we need to set body of request.
          // Brevo requires sender, subject, html content, and to data.
          data: {
            sender: {
              name: process.env.BREVO_SENDER_NAME as string,
              email: process.env.BREVO_SENDER_EMAIL as string,
            },
            to: [
              {
                // Can send to array of multiple emails, but we will send to only one specified in the message object.
                email: message.to,
              },
            ],
            subject: message.subject,
            htmlContent: message.html,
          },
        })

        // Return res data.
        return res.data
      } catch (error) {
        console.error('Error sending email with Brevo', error)
      }
    },
  })

  // Return adapter. Email adapter wants default email and default from name set above.
  return adapter
}

export default brevoAdapter

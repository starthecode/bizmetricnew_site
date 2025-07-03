import React from 'react';
import { FaRegSave, FaUsers } from 'react-icons/fa';
import { RiMailSendLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { sendMail } from '@/services/mailService';
import CustomEmailBox from '../Forms/Email/Editor/CustomEmailBox';
import SubsEmailBox from '../Forms/Email/Editor/SubsEmailBox';
import { getSubscribersList } from '@/lib/getSubscribersList';
import { addEmailCampaign } from '@/lib/addEmailCampaign';

type FormState = {
  state: string;
  email: string;
};

const ActionButtons: React.FC<{
  title: string;
  newsletterId: string;
  userId: string | undefined;
  userName: string | undefined;
  emailEditorRef: any;
  saveDraft: any;
  isSaveDraft: boolean;
  campg: boolean;
}> = ({
  title,
  newsletterId,
  userId,
  userName,
  emailEditorRef,
  saveDraft,
  isSaveDraft,
  campg,
}) => {
  const [active, setActive] = React.useState(false);
  const [active2, setActive2] = React.useState(false);
  const [mailtosubs, setMailToSubs] = React.useState(false);

  const [disable, setDisable] = React.useState(false);

  const [form, setForm] = React.useState<FormState>({
    state: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  function validateEmails(emails: string): boolean {
    // Regular expression to validate an email
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Split the input string by comma and trim any extra spaces around each email
    const emailArray = emails.split(',').map((email) => email.trim());

    // Check if all emails in the array are valid
    for (const email of emailArray) {
      if (!re.test(email)) {
        return false; // Return false if any email is invalid
      }
    }

    return true; // Return true if all emails are valid
  }

  const exportHtml = async (type: string) => {
    let emailList: string[] = [];
    let tokenList: string[] = [];

    if (type === 'mail-to-subscribers') {
      // Fetch all email list from the database
      const mailList = await getSubscribersList();

      if (mailList && Array.isArray(mailList)) {
        emailList = mailList
          .filter((subscriber) => subscriber.isSubscribed === '1') // If isSubscribed is a string
          .map((subscriber) => subscriber.email);
        tokenList = mailList
          .filter((subscriber) => subscriber.isSubscribed === '1')
          .map((subscriber) => subscriber.token);

        toast.loading('Sending Email to All Subscribers - Please Wait...');
      }

      // Save Campaign
      const campaign = await addEmailCampaign({
        title: title,
        newsletterId: newsletterId,
        userId: userId as string,
        userName: userName as string,
      });

      if (campaign.message !== 'success') {
        toast.error('Something went wrong!');
        return false;
      }

      if (emailList.length === 0) {
        toast.error('Add at least 1 Email Id');
        return false;
      }
    } else if (type == 'custom-mail') {
      // Add custom emails in box
      const { email } = form;

      // Trim the input to remove any leading/trailing spaces
      const trimmedEmail = email.trim();

      if (trimmedEmail.length === 0) {
        toast.error('Add at least 1 Email Id');
        return false;
      }

      // Validate the email string before splitting
      if (!validateEmails(trimmedEmail)) {
        toast.error('There are invalid emails or improper separation.');
        return false;
      }

      // Split the emails into an array after validation
      emailList = trimmedEmail.split(',').map((email) => email.trim());
      toast.loading('Sending Email - Please Wait...');
    }

    setActive2(true);
    const unlayer = emailEditorRef.current?.editor;

    // Export the HTML from the editor
    unlayer?.exportHtml(async (data: any) => {
      let { html } = data;

      // Loop through each email in the list and send the email individually
      for (let i = 0; i < emailList.length; i++) {
        const subscriberEmail = emailList[i];
        const token = tokenList[i];

        // Create a unique tracking image for each subscriber
        const trackingImage = `<img style="width: 80px; height: 70px; padding-top: 40px;" src="https://experimentalapp.xyz/wp-json/wp/v2/usertid?s_id=${newsletterId}&email=${subscriberEmail}" alt="Bizmetric user" />`;
        const unsubscribeUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe?uuid=${token}`; // Create just the URL, not the full anchor tag

        // Parse the HTML string into a DOM structure
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Insert the tracking image into the body
        const compLogoDiv = doc.querySelector('#comp_logo');
        const unsubLink: any = doc.querySelector('#unsubLink');

        if (compLogoDiv && unsubLink) {
          compLogoDiv.insertAdjacentHTML('afterbegin', trackingImage);

          // Set the href attribute to the correct unsubscribe URL
          unsubLink.href = unsubscribeUrl;
        }

        // Serialize the DOM back to an HTML string
        const modifiedHtml = doc.documentElement.outerHTML;

        // Send the email with the modified HTML for each subscriber
        await sendMail({
          mailSubject: title,
          toEmail: [subscriberEmail], // Send to a single email at a time
          content: modifiedHtml,
        }).then((res) => {
          if (res.accepted.length > 0) {
            console.log(`Email sent successfully to ${subscriberEmail}`);
          } else {
            console.error(`Failed to send email to ${subscriberEmail}`);
          }
        });
      }

      // After the loop, dismiss the toast and reset states
      toast.dismiss();
      setForm({ state: '', email: '' });
      setActive(false);
      setActive2(false);
      setMailToSubs(false);
      toast.success('Newsletter Email sent to all subscribers');
    });
  };

  return (
    <>
      <div className="relative flex items-center justify-end gap-4 w-full p-3">
        <button
          disabled={active || mailtosubs || isSaveDraft ? true : false}
          className={`${
            active || mailtosubs || isSaveDraft
              ? 'bg-flamingo-300 pointer-events-none'
              : 'bg-flamingo-500'
          } px-3 py-1 text-sm text-white rounded-md flex items-center gap-2`}
          onClick={saveDraft}
        >
          Save Draft <FaRegSave />
        </button>
        <button
          disabled={active || mailtosubs || isSaveDraft ? true : false}
          className={`${
            active || mailtosubs || isSaveDraft
              ? 'bg-junglegreen-300 pointer-events-none'
              : 'bg-junglegreen-500'
          } px-3 py-1 text-sm text-white rounded-md flex items-center gap-2`}
          onClick={() => setActive(!active)}
        >
          Send Mail <RiMailSendLine />
        </button>

        {!campg && (
          <button
            disabled={active || mailtosubs || isSaveDraft ? true : false}
            onClick={() => setMailToSubs(!mailtosubs)}
            type="button"
            className={`${
              active || mailtosubs || isSaveDraft
                ? 'bg-yellow-300 pointer-events-none'
                : 'bg-yellow-500'
            } px-3 py-1 text-sm text-white rounded-md flex items-center gap-2`}
          >
            Mail to Subscribers <FaUsers />
          </button>
        )}
      </div>

      {active && (
        <CustomEmailBox
          email={form.email}
          active2={active2}
          disable={disable}
          setActive={setActive}
          handleChange={handleChange}
          exportHtml={exportHtml}
        />
      )}

      {mailtosubs && (
        <SubsEmailBox
          active2={active2}
          disable={disable}
          setMailToSubs={setMailToSubs}
          handleChange={handleChange}
          exportHtml={exportHtml}
        />
      )}
    </>
  );
};

export default ActionButtons;

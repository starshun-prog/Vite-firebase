import { init, send } from "@emailjs/browser";

export const sendMail = async (name, email, detail) => {
  init(import.meta.env.VITE_EMAIL_USER_ID);

  const templateParams = {
    to_name: name,
    email: email,
    message: detail,
  };

  await send(
    import.meta.env.VITE_EMAIL_SERVICE_ID,
    import.meta.env.VITE_EMAIL_TEMPLATE_ID,
    templateParams
  );
};

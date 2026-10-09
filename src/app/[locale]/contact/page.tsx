import { ContactPage, contactMetadata, type ContactPageProps } from "@/features/contact/ContactPage";

export const generateMetadata = contactMetadata;
export default function Page(props: ContactPageProps) {
  return <ContactPage {...props} route="contact" />;
}

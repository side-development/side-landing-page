import { ServicesPage, servicesMetadata, type ServicesPageProps } from "@/features/services-page/ServicesPage";

export const generateMetadata = servicesMetadata;
export default function Page(props: ServicesPageProps) {
  return <ServicesPage {...props} route="services" />;
}

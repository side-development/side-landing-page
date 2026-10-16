import { WhySidePage, whySideMetadata, type WhySidePageProps } from "@/features/why-side-page/WhySidePage";

export const generateMetadata = whySideMetadata;
export default function Page(props: WhySidePageProps) {
  return <WhySidePage {...props} route="why-side" />;
}

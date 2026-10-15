import { WorkPage, workMetadata, type WorkPageProps } from "@/features/work-page/WorkPage";

export const generateMetadata = workMetadata;
export default function Page(props: WorkPageProps) {
  return <WorkPage {...props} route="work" />;
}

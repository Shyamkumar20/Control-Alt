import { Directory } from "@/components/directory";
import { getDirectoryTools } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const tools = await getDirectoryTools();

  return <Directory tools={tools} />;
}

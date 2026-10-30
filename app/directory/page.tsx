import type { Metadata } from "next";
import { Directory } from "@/components/directory";
import { getDirectoryTools } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Open-Source Directory",
};

export default async function DirectoryPage() {
  const tools = await getDirectoryTools();

  return <Directory tools={tools} />;
}

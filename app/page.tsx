import SearchPage from "@/components/SearchPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  description: "Search for Artists Artwork in Harvard Art Museum",
};

export default function Home() {
  return <SearchPage />;
}
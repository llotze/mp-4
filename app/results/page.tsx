import ArtistPage from "@/components/ArtistPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Results",
  description: "Artworks by searched artist",
};

export default function Results() {
  return <ArtistPage />;
}
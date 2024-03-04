import { CustomerCarousel } from "@/components";

// use css
import "./page.css";

export default function Home() {
  return (
    <>
      <CustomerCarousel></CustomerCarousel>
      <main className="content-container">This is main content</main>
    </>
  );
}

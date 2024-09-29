"use client";

import { useState } from "react";
import CTA from "@/components/cta";
import Form from "@/components/form";
import Benefits from "@/components/benefits";
import Particles from "@/components/ui/particles";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  const handleSuccess = () => {
    setSubmitted(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip pt-12 md:pt-24">
      <section className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <div className="order-1 md:order-2">
          <CTA />
        </div>
        <div className="order-3 md:order-2">
          <Benefits />
        </div>
        <div className="order-2 md:order-3">
          {!submitted ? (
            <Form onSuccess={handleSuccess} />
          ) : (
            <p className="mt-4">Thank you for joining the waitlist!</p>
          )}
        </div>
      </section>
      <Particles
        quantityDesktop={350}
        quantityMobile={100}
        ease={80}
        color={"#ffab40"}
        refresh
      />
    </main>
  );
}
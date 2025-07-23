"use client";

import { InfoSection } from "@/components/booking/info-section";
import { BookingForm } from "@/components/form/booking-form";

export default function BookingPage() {
  return (
    <div className="container mx-auto p-4">
      <InfoSection />
      <BookingForm />
    </div>
  );
}

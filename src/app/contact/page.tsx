"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact";

/* ── Field primitive ─────────────────────────────────────────────────── */
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[.8125rem] text-muted-foreground mb-[.45rem]">
        {label}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 mt-1.5" style={{ fontSize: ".8125rem", color: "var(--foreground)" }}>
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

/* ── Shared well styles ─────────────────────────────────────────────── */
const wellStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--input)",
  border: 0,
  borderRadius: "var(--radius-sm, 4px)",
  padding: ".95rem 1rem",
  color: "var(--foreground)",
  fontSize: "1rem",
  boxShadow: "var(--recess)",
  transition: "box-shadow .25s cubic-bezier(.2,.7,.25,1)",
  outline: "none",
};

const wellErrorStyle: React.CSSProperties = {
  ...wellStyle,
  boxShadow: "var(--recess), 0 0 0 2px var(--foreground)",
};

const wellFocusClass = "focus:ring-0 focus-visible:outline-none";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Sending your message...");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Message Sent Successfully!", {
          id: toastId,
          description: "Thank you for reaching out. Our team will get back to you shortly.",
        });
        reset();
      } else {
        const errData = await response.json().catch(() => ({}));
        toast.error("Failed to Send Message", {
          id: toastId,
          description: errData.error || "Please try again later or contact us directly via email.",
        });
      }
    } catch (error) {
      console.error("[Contact form] Submission failed:", error);
      const msg = error instanceof Error ? error.message : "Unknown error";
      toast.error("Network Error", {
        id: toastId,
        description: `Could not reach the server (${msg}). Check your connection and try again, or email us directly at hello@arohit.in.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Contact section — bg-plate with top bevel, matching reference */}
      <section
        className="py-[clamp(80px,12vh,150px)] bg-plate"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,.06)" }}
      >
        <div className="wrap">
          {/* Two-column grid: info left, form right */}
          <div
            className="grid grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] items-start gap-[clamp(32px,6vw,90px)] max-md:grid-cols-1"
          >

            {/* Left — heading + facts */}
            <div>
              <h1 className="type-h2 text-foreground mb-4">
                Tell us what is breaking
              </h1>
              <p className="type-body">
                Send the shape of the problem and we will reply within one business day
                with a first read and an honest note on whether we are the right team for it.
              </p>
              <div className="grid gap-[1.4rem] mt-[2.2rem]">
                <div className="mb-4">
                  <span className="block text-[.8125rem] text-muted-foreground mb-[.2rem]">Email</span>
                  <strong style={{ fontVariationSettings: '"wdth" 100,"wght" 520', fontSize: "1.02rem" }}>hello@arohitsolutions.com</strong>
                </div>
                <div className="mb-4">
                  <span className="block text-[.8125rem] text-muted-foreground mb-[.2rem]">Phone</span>
                  <strong style={{ fontVariationSettings: '"wdth" 100,"wght" 520', fontSize: "1.02rem" }}>+91 79 4000 1200</strong>
                </div>
                <div>
                  <span className="block text-[.8125rem] text-muted-foreground mb-[.2rem]">Studio</span>
                  <strong style={{ fontVariationSettings: '"wdth" 100,"wght" 520', fontSize: "1.02rem" }}>Prahlad Nagar, Ahmedabad 380015</strong>
                </div>
              </div>
            </div>

            {/* Right — form with recessed wells */}
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-[14px]">

              {/* Name + Email row */}
              <div className="grid grid-cols-2 gap-[14px] max-[560px]:grid-cols-1">
                <Field label="Name" error={errors.name?.message}>
                  <input
                    id="name"
                    placeholder="Your name"
                    {...register("name")}
                    aria-invalid={!!errors.name}
                    className={wellFocusClass}
                    style={errors.name ? wellErrorStyle : wellStyle}
                  />
                </Field>
                <Field label="Email" error={errors.email?.message}>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                    className={wellFocusClass}
                    style={errors.email ? wellErrorStyle : wellStyle}
                  />
                </Field>
              </div>

              {/* Subject */}
              <Field label="Subject" error={errors.subject?.message}>
                <input
                  id="subject"
                  placeholder="What is this about?"
                  {...register("subject")}
                  aria-invalid={!!errors.subject}
                  className={wellFocusClass}
                  style={errors.subject ? wellErrorStyle : wellStyle}
                />
              </Field>

              {/* Message */}
              <Field label="Message" error={errors.message?.message}>
                <textarea
                  id="message"
                  placeholder="What exists today, what should exist instead, and any date you are working towards."
                  {...register("message")}
                  aria-invalid={!!errors.message}
                  className={wellFocusClass}
                  style={{
                    ...(errors.message ? wellErrorStyle : wellStyle),
                    minHeight: "132px",
                    resize: "vertical",
                  }}
                />
              </Field>

              {/* Subscribe checkbox */}
              <div className="flex items-center gap-3 mt-1">
                <input
                  type="checkbox"
                  id="subscribe"
                  {...register("subscribe")}
                  style={{
                    appearance: "none",
                    WebkitAppearance: "none",
                    width: "18px",
                    height: "18px",
                    minWidth: "18px",
                    borderRadius: "4px",
                    border: 0,
                    outline: "none",
                    cursor: "pointer",
                    boxShadow: "var(--recess)",
                    background: "var(--input)",
                    position: "relative",
                    transition: "background .2s, box-shadow .2s",
                  }}
                  className="peer"
                />
                {/* Checkmark overlay rendered via CSS in globals */}
                <label htmlFor="subscribe" className="text-[.875rem] text-muted-foreground cursor-pointer select-none">
                  Receive news and updates from Aroh IT Solutions
                </label>
              </div>

              <Button
                type="submit"
                variant="solid"
                disabled={isSubmitting}
                className="justify-self-start mt-[6px]"
              >
                {isSubmitting ? "Sending…" : "Send message"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

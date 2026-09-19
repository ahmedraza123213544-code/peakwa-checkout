"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TextField } from "./checkout/fields";

export function ContactForm() {
  const messageId = useId();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  if (sent) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Message received</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Thanks, {form.name || "we have your message"}. We will reply to{" "}
            {form.email}.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setForm({ name: "", email: "", subject: "", message: "" });
              setSent(false);
            }}
          >
            Send another message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send us a message</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            // Not connected to a backend yet: this only shows the confirmation state.
            setSent(true);
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Name"
              value={form.name}
              onChange={set("name")}
              autoComplete="name"
            />
            <TextField
              label="Email"
              type="email"
              value={form.email}
              onChange={set("email")}
              autoComplete="email"
            />
          </div>
          <TextField
            label="Subject"
            value={form.subject}
            onChange={set("subject")}
          />
          <div className="space-y-2">
            <Label htmlFor={messageId}>Message</Label>
            <Textarea
              id={messageId}
              value={form.message}
              onChange={(e) => set("message")(e.target.value)}
              required
            />
          </div>
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Send message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

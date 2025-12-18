"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Save, Settings as SettingsIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { updateSetting, upsertSetting } from "@/lib/actions/system";
import type { Database } from "@/types/supabase";

type Setting = Database["public"]["Tables"]["site_settings"]["Row"];

interface SettingsFormProps {
  settings: Setting[];
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Convert settings array to object for easier access
  const settingsObj = settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {} as Record<string, any>);

  const [formData, setFormData] = useState({
    site_name: (settingsObj.site_name || "LGU Monkayo") as string,
    site_description: (settingsObj.site_description || "") as string,
    site_tagline: (settingsObj.site_tagline || "") as string,
    site_email: (settingsObj.site_email || "") as string,
    site_phone: (settingsObj.site_phone || "") as string,
    site_address: (settingsObj.site_address || "") as string,
    facebook_url: (settingsObj.facebook_url || "") as string,
    twitter_url: (settingsObj.twitter_url || "") as string,
    youtube_url: (settingsObj.youtube_url || "") as string,
    office_hours: (settingsObj.office_hours || "") as string,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Update each setting individually
      const updates = Object.entries(formData).map(([key, value]) =>
        upsertSetting(key, value)
      );

      const results = await Promise.all(updates);
      const hasError = results.some((result) => !result.success);

      if (hasError) {
        toast.error("Some settings failed to update");
      } else {
        toast.success("Settings updated successfully");
        router.refresh();
      }
    } catch (error) {
      toast.error("An error occurred while updating settings");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            General Settings
          </CardTitle>
          <CardDescription>
            Configure basic site information and branding
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="site_name">Site Name</Label>
            <Input
              id="site_name"
              value={formData.site_name}
              onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
              placeholder="LGU Monkayo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="site_tagline">Tagline</Label>
            <Input
              id="site_tagline"
              value={formData.site_tagline}
              onChange={(e) => setFormData({ ...formData, site_tagline: e.target.value })}
              placeholder="Gateway to Progress and Prosperity"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="site_description">Description</Label>
            <Textarea
              id="site_description"
              value={formData.site_description}
              onChange={(e) => setFormData({ ...formData, site_description: e.target.value })}
              placeholder="Official website of the Local Government Unit of Monkayo..."
              rows={3}
              className="resize-none"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            Public contact details displayed on the website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="site_email">Email</Label>
            <Input
              id="site_email"
              type="email"
              value={formData.site_email}
              onChange={(e) => setFormData({ ...formData, site_email: e.target.value })}
              placeholder="info@monkayo.gov.ph"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="site_phone">Phone</Label>
            <Input
              id="site_phone"
              type="tel"
              value={formData.site_phone}
              onChange={(e) => setFormData({ ...formData, site_phone: e.target.value })}
              placeholder="(084) 123-4567"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="site_address">Address</Label>
            <Textarea
              id="site_address"
              value={formData.site_address}
              onChange={(e) => setFormData({ ...formData, site_address: e.target.value })}
              placeholder="Municipal Hall, Monkayo, Davao de Oro"
              rows={2}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="office_hours">Office Hours</Label>
            <Input
              id="office_hours"
              value={formData.office_hours}
              onChange={(e) => setFormData({ ...formData, office_hours: e.target.value })}
              placeholder="Monday - Friday, 8:00 AM - 5:00 PM"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
          <CardDescription>
            Links to official social media accounts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="facebook_url">Facebook Page</Label>
            <Input
              id="facebook_url"
              type="url"
              value={formData.facebook_url}
              onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
              placeholder="https://facebook.com/LGUMonkayo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitter_url">Twitter/X</Label>
            <Input
              id="twitter_url"
              type="url"
              value={formData.twitter_url}
              onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
              placeholder="https://twitter.com/LGUMonkayo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="youtube_url">YouTube Channel</Label>
            <Input
              id="youtube_url"
              type="url"
              value={formData.youtube_url}
              onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
              placeholder="https://youtube.com/@LGUMonkayo"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.refresh()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          <Save className="h-4 w-4 mr-2" />
          {isSubmitting ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </form>
  );
}

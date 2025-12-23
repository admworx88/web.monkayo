"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Save, Settings as SettingsIcon, Palette, X, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { updateSetting, upsertSetting } from "@/lib/actions/system";
import { updateBrandingColors, updateBrandingLogos, uploadBrandingLogo, deleteBrandingLogo } from "@/lib/actions/branding";
import { ImageUpload } from "@/components/cms/image-upload";
import type { Database } from "@/types/supabase";
import type { BrandingSettings } from "@/types/branding";

type Setting = Database["public"]["Tables"]["site_settings"]["Row"];

interface SettingsFormProps {
  settings: Setting[];
  branding: BrandingSettings;
}

export function SettingsForm({ settings, branding }: SettingsFormProps) {
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

  // Branding state
  const [brandingColors, setBrandingColors] = useState(branding.colors);
  const [brandingLogos, setBrandingLogos] = useState(branding.logos);

  // Track saved colors and unsaved changes
  const [savedColors, setSavedColors] = useState(branding.colors);
  const [unsavedChanges, setUnsavedChanges] = useState<Set<keyof typeof brandingColors>>(new Set());

  // Handle branding color changes (no auto-save)
  const handleColorChange = (colorKey: keyof typeof brandingColors, value: string) => {
    // Update working state only (no save)
    setBrandingColors({ ...brandingColors, [colorKey]: value });

    // Mark as unsaved if different from saved value
    const hasChanged = value !== savedColors[colorKey];
    setUnsavedChanges(prev => {
      const next = new Set(prev);
      hasChanged ? next.add(colorKey) : next.delete(colorKey);
      return next;
    });
  };

  // Handle saving a specific color (Check icon)
  const handleColorSave = async (colorKey: keyof typeof brandingColors) => {
    // Save only this specific color (merge with saved state)
    const colorsToSave = {
      ...savedColors,  // Keep all saved colors
      [colorKey]: brandingColors[colorKey]  // Override only this color
    };

    const result = await updateBrandingColors(colorsToSave);
    if (result.success) {
      // Update saved reference for this specific color only
      setSavedColors(colorsToSave);
      // Remove from unsaved changes
      setUnsavedChanges(prev => {
        const next = new Set(prev);
        next.delete(colorKey);
        return next;
      });
      toast.success(`${colorKey} color saved`);
      router.refresh();
    } else {
      toast.error(`Failed to save ${colorKey} color`);
    }
  };

  // Handle reverting a specific color (X icon)
  const handleColorRevert = (colorKey: keyof typeof brandingColors) => {
    // Revert to last saved value
    setBrandingColors({ ...brandingColors, [colorKey]: savedColors[colorKey] });
    // Remove from unsaved changes
    setUnsavedChanges(prev => {
      const next = new Set(prev);
      next.delete(colorKey);
      return next;
    });
  };

  // Handle logo file upload
  const handleLogoUpload = async (logoType: keyof typeof brandingLogos, file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const result = await uploadBrandingLogo(formData, logoType);

    if (result.success && result.publicUrl) {
      setBrandingLogos({ ...brandingLogos, [logoType]: result.publicUrl });
      toast.success(`${logoType} logo uploaded`);
      router.refresh();
    }

    return result;
  };

  // Handle logo deletion
  const handleLogoDelete = async (logoType: keyof typeof brandingLogos, logoUrl: string) => {
    if (!logoUrl) return { success: false, error: 'No logo to delete' };

    const result = await deleteBrandingLogo(logoUrl, logoType);
    if (result.success) {
      setBrandingLogos({ ...brandingLogos, [logoType]: null });
      toast.success(`${logoType} logo removed`);
      router.refresh();
    } else {
      toast.error(`Failed to remove ${logoType} logo`);
    }

    return result;
  };

  // Handle logo URL input
  const handleLogoUrlChange = async (logoType: keyof typeof brandingLogos, url: string) => {
    const result = await updateBrandingLogos({ [logoType]: url || null });
    if (result.success) {
      setBrandingLogos({ ...brandingLogos, [logoType]: url || null });
      toast.success(`${logoType} logo URL updated`);
      router.refresh();
    } else {
      toast.error(`Failed to update ${logoType} logo URL`);
    }
  };

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

      {/* Branding & Colors Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Branding & Colors
          </CardTitle>
          <CardDescription>
            Customize the public website theme colors and logos (does not affect CMS dashboard)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Colors */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Theme Colors</h3>
            <p className="text-xs text-muted-foreground">
              Colors are applied automatically. Changes affect the public website only.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="color_primary">Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="color_primary"
                    type="color"
                    value={brandingColors.primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className="w-20 h-10 p-1 cursor-pointer"
                  />
                  <div className="relative flex-1">
                    <Input
                      type="text"
                      value={brandingColors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      placeholder="#d97706"
                      className={unsavedChanges.has('primary') ? "pr-16" : ""}
                    />
                    {unsavedChanges.has('primary') && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                        <button
                          type="button"
                          onClick={() => handleColorRevert('primary')}
                          className="hover:bg-stone-100 rounded p-1 transition-colors"
                          title="Revert changes"
                        >
                          <X className="h-4 w-4 text-red-500 hover:text-red-700" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleColorSave('primary')}
                          className="hover:bg-stone-100 rounded p-1 transition-colors"
                          title="Save changes"
                        >
                          <Check className="h-4 w-4 text-green-500 hover:text-green-700" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color_secondary">Secondary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="color_secondary"
                    type="color"
                    value={brandingColors.secondary}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    className="w-20 h-10 p-1 cursor-pointer"
                  />
                  <div className="relative flex-1">
                    <Input
                      type="text"
                      value={brandingColors.secondary}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                      placeholder="#0ea5e9"
                      className={unsavedChanges.has('secondary') ? "pr-16" : ""}
                    />
                    {unsavedChanges.has('secondary') && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                        <button
                          type="button"
                          onClick={() => handleColorRevert('secondary')}
                          className="hover:bg-stone-100 rounded p-1 transition-colors"
                          title="Revert changes"
                        >
                          <X className="h-4 w-4 text-red-500 hover:text-red-700" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleColorSave('secondary')}
                          className="hover:bg-stone-100 rounded p-1 transition-colors"
                          title="Save changes"
                        >
                          <Check className="h-4 w-4 text-green-500 hover:text-green-700" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color_accent">Accent Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="color_accent"
                    type="color"
                    value={brandingColors.accent}
                    onChange={(e) => handleColorChange('accent', e.target.value)}
                    className="w-20 h-10 p-1 cursor-pointer"
                  />
                  <div className="relative flex-1">
                    <Input
                      type="text"
                      value={brandingColors.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      placeholder="#fcd116"
                      className={unsavedChanges.has('accent') ? "pr-16" : ""}
                    />
                    {unsavedChanges.has('accent') && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                        <button
                          type="button"
                          onClick={() => handleColorRevert('accent')}
                          className="hover:bg-stone-100 rounded p-1 transition-colors"
                          title="Revert changes"
                        >
                          <X className="h-4 w-4 text-red-500 hover:text-red-700" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleColorSave('accent')}
                          className="hover:bg-stone-100 rounded p-1 transition-colors"
                          title="Save changes"
                        >
                          <Check className="h-4 w-4 text-green-500 hover:text-green-700" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color_text_primary">Primary Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="color_text_primary"
                    type="color"
                    value={brandingColors.textPrimary}
                    onChange={(e) => handleColorChange('textPrimary', e.target.value)}
                    className="w-20 h-10 p-1 cursor-pointer"
                  />
                  <div className="relative flex-1">
                    <Input
                      type="text"
                      value={brandingColors.textPrimary}
                      onChange={(e) => handleColorChange('textPrimary', e.target.value)}
                      placeholder="#1f2937"
                      className={unsavedChanges.has('textPrimary') ? "pr-16" : ""}
                    />
                    {unsavedChanges.has('textPrimary') && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                        <button
                          type="button"
                          onClick={() => handleColorRevert('textPrimary')}
                          className="hover:bg-stone-100 rounded p-1 transition-colors"
                          title="Revert changes"
                        >
                          <X className="h-4 w-4 text-red-500 hover:text-red-700" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleColorSave('textPrimary')}
                          className="hover:bg-stone-100 rounded p-1 transition-colors"
                          title="Save changes"
                        >
                          <Check className="h-4 w-4 text-green-500 hover:text-green-700" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color_text_secondary">Secondary Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="color_text_secondary"
                    type="color"
                    value={brandingColors.textSecondary}
                    onChange={(e) => handleColorChange('textSecondary', e.target.value)}
                    className="w-20 h-10 p-1 cursor-pointer"
                  />
                  <div className="relative flex-1">
                    <Input
                      type="text"
                      value={brandingColors.textSecondary}
                      onChange={(e) => handleColorChange('textSecondary', e.target.value)}
                      placeholder="#6b7280"
                      className={unsavedChanges.has('textSecondary') ? "pr-16" : ""}
                    />
                    {unsavedChanges.has('textSecondary') && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                        <button
                          type="button"
                          onClick={() => handleColorRevert('textSecondary')}
                          className="hover:bg-stone-100 rounded p-1 transition-colors"
                          title="Revert changes"
                        >
                          <X className="h-4 w-4 text-red-500 hover:text-red-700" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleColorSave('textSecondary')}
                          className="hover:bg-stone-100 rounded p-1 transition-colors"
                          title="Save changes"
                        >
                          <Check className="h-4 w-4 text-green-500 hover:text-green-700" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Logos */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Logos</h3>
            <p className="text-xs text-muted-foreground">
              Upload logos or provide URLs. Logos are displayed on the public website header, footer, and as favicon.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Header Logo</Label>
                <ImageUpload
                  value={brandingLogos.header || ""}
                  onChange={(url) => handleLogoUrlChange('header', url)}
                  onUpload={(file) => handleLogoUpload('header', file)}
                  onDelete={(url) => handleLogoDelete('header', url)}
                  aspectRatio="video"
                  maxSizeMB={2}
                />
              </div>

              <div className="space-y-2">
                <Label>Footer Logo</Label>
                <ImageUpload
                  value={brandingLogos.footer || ""}
                  onChange={(url) => handleLogoUrlChange('footer', url)}
                  onUpload={(file) => handleLogoUpload('footer', file)}
                  onDelete={(url) => handleLogoDelete('footer', url)}
                  aspectRatio="video"
                  maxSizeMB={2}
                />
              </div>

              <div className="space-y-2">
                <Label>Favicon</Label>
                <ImageUpload
                  value={brandingLogos.favicon || ""}
                  onChange={(url) => handleLogoUrlChange('favicon', url)}
                  onUpload={(file) => handleLogoUpload('favicon', file)}
                  onDelete={(url) => handleLogoDelete('favicon', url)}
                  aspectRatio="square"
                  maxSizeMB={1}
                />
              </div>
            </div>
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

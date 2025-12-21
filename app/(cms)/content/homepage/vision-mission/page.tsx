"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Target } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getVisionMission, updateVisionMission } from "@/lib/actions/homepage";

export default function VisionMissionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    vision: "",
    mission: "",
    goals: "",
  });

  useEffect(() => {
    async function loadData() {
      const data = await getVisionMission();
      if (data) {
        setFormData({
          vision: data.vision || "",
          mission: data.mission || "",
          goals: data.goals || "",
        });
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await updateVisionMission(formData);
      if (result.success) {
        toast.success("Vision & Mission saved successfully");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to save");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Vision & Mission"
        description="Define the municipality's vision, mission, and goals"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Homepage", href: "/content/homepage/hero" },
          { label: "Vision & Mission" },
        ]}
        actions={
          <Button
            size="sm"
            className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700"
            onClick={handleSave}
            disabled={isSaving || isLoading}
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-1.5" />
            )}
            Save Changes
          </Button>
        }
      />

      <main className="flex-1 p-4 lg:p-6">
        {isLoading ? (
          <ContentCard>
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-stone-400" />
            </div>
          </ContentCard>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Vision */}
            <ContentCard>
              <div className="flex items-start gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                  <Target className="h-5 w-5 text-[amber-600]" />
                </div>
                <div>
                  <h3 className="font-semibold dark:text-stone-200 text-stone-800">
                    Vision
                  </h3>
                  <p className="text-sm text-stone-500">
                    The aspirational description of what the municipality wants
                    to achieve
                  </p>
                </div>
              </div>
              <div>
                <Label htmlFor="vision" className="sr-only">
                  Vision
                </Label>
                <Textarea
                  id="vision"
                  placeholder="Enter the municipality's vision statement..."
                  value={formData.vision}
                  onChange={(e) =>
                    setFormData({ ...formData, vision: e.target.value })
                  }
                  rows={6}
                  className="resize-none"
                />
              </div>
            </ContentCard>

            {/* Mission */}
            <ContentCard>
              <div className="flex items-start gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                  <Target className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold dark:text-stone-200 text-stone-800">
                    Mission
                  </h3>
                  <p className="text-sm text-stone-500">
                    The purpose and actions taken to achieve the vision
                  </p>
                </div>
              </div>
              <div>
                <Label htmlFor="mission" className="sr-only">
                  Mission
                </Label>
                <Textarea
                  id="mission"
                  placeholder="Enter the municipality's mission statement..."
                  value={formData.mission}
                  onChange={(e) =>
                    setFormData({ ...formData, mission: e.target.value })
                  }
                  rows={6}
                  className="resize-none"
                />
              </div>
            </ContentCard>

            {/* Goals */}
            <ContentCard className="lg:col-span-2">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                  <Target className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold dark:text-stone-200 text-stone-800">
                    Goals
                  </h3>
                  <p className="text-sm text-stone-500">
                    Specific objectives the municipality aims to accomplish
                  </p>
                </div>
              </div>
              <div>
                <Label htmlFor="goals" className="sr-only">
                  Goals
                </Label>
                <Textarea
                  id="goals"
                  placeholder="Enter the municipality's goals (one per line or as a paragraph)..."
                  value={formData.goals}
                  onChange={(e) =>
                    setFormData({ ...formData, goals: e.target.value })
                  }
                  rows={6}
                  className="resize-none"
                />
              </div>
            </ContentCard>
          </div>
        )}
      </main>
    </div>
  );
}

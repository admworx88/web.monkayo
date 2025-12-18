"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";

import { FormDialog } from "@/components/cms/form-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { createBarangay, updateBarangay } from "@/lib/actions/directory";
import type { Database } from "@/types/supabase";

type Barangay = Database["public"]["Tables"]["barangays"]["Row"];

interface BarangayDialogProps {
  children: React.ReactNode;
  mode: "create" | "edit";
  barangay?: Barangay;
}

export function BarangayDialog({ children, mode, barangay }: BarangayDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: barangay?.name || "",
    captain_name: barangay?.captain_name || "",
    email: barangay?.email || "",
    contact_numbers: barangay?.contact_numbers || [""],
    facebook_link: barangay?.facebook_link || "",
    address: barangay?.address || "",
    population: barangay?.population || 0,
    sort_order: barangay?.sort_order || 0,
    is_active: barangay?.is_active ?? true,
  });

  const addContactNumber = () => {
    setFormData({
      ...formData,
      contact_numbers: [...formData.contact_numbers, ""],
    });
  };

  const removeContactNumber = (index: number) => {
    const newNumbers = formData.contact_numbers.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      contact_numbers: newNumbers.length > 0 ? newNumbers : [""],
    });
  };

  const updateContactNumber = (index: number, value: string) => {
    const newNumbers = [...formData.contact_numbers];
    newNumbers[index] = value;
    setFormData({ ...formData, contact_numbers: newNumbers });
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error("Barangay name is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const dataToSubmit = {
        ...formData,
        contact_numbers: formData.contact_numbers.filter((n) => n.trim() !== ""),
        population: formData.population || null,
      };

      if (mode === "create") {
        const result = await createBarangay(dataToSubmit);
        if (result.success) {
          toast.success("Barangay created successfully");
          setOpen(false);
          setFormData({
            name: "",
            captain_name: "",
            email: "",
            contact_numbers: [""],
            facebook_link: "",
            address: "",
            population: 0,
            sort_order: 0,
            is_active: true,
          });
          router.refresh();
        } else {
          toast.error(result.error || "Failed to create barangay");
        }
      } else if (barangay) {
        const result = await updateBarangay(barangay.id, dataToSubmit);
        if (result.success) {
          toast.success("Barangay updated successfully");
          setOpen(false);
          router.refresh();
        } else {
          toast.error(result.error || "Failed to update barangay");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <FormDialog
        open={open}
        onOpenChange={setOpen}
        title={mode === "create" ? "Add New Barangay" : "Edit Barangay"}
        description={
          mode === "create"
            ? "Create a new barangay entry for the directory."
            : "Update the barangay details."
        }
        onSubmit={handleSubmit}
        submitLabel={mode === "create" ? "Create Barangay" : "Save Changes"}
        isSubmitting={isSubmitting}
        size="lg"
      >
        <div className="space-y-5">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-stone-700">
              Barangay Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="e.g., Barangay Poblacion"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1.5"
            />
          </div>

          {/* Captain and Population */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="captain_name" className="text-stone-700">
                Barangay Captain
              </Label>
              <Input
                id="captain_name"
                placeholder="Full name of the captain"
                value={formData.captain_name}
                onChange={(e) =>
                  setFormData({ ...formData, captain_name: e.target.value })
                }
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="population" className="text-stone-700">
                Population
              </Label>
              <Input
                id="population"
                type="number"
                min={0}
                placeholder="0"
                value={formData.population || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    population: parseInt(e.target.value) || 0,
                  })
                }
                className="mt-1.5"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="email" className="text-stone-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="barangay@monkayo.gov.ph"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="facebook" className="text-stone-700">
                Facebook Page
              </Label>
              <Input
                id="facebook"
                placeholder="https://facebook.com/..."
                value={formData.facebook_link}
                onChange={(e) =>
                  setFormData({ ...formData, facebook_link: e.target.value })
                }
                className="mt-1.5"
              />
            </div>
          </div>

          {/* Contact Numbers */}
          <div>
            <Label className="text-stone-700">Contact Numbers</Label>
            <div className="mt-1.5 space-y-2">
              {formData.contact_numbers.map((number, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder="e.g., (084) 123-4567"
                    value={number}
                    onChange={(e) => updateContactNumber(index, e.target.value)}
                  />
                  {formData.contact_numbers.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 flex-shrink-0"
                      onClick={() => removeContactNumber(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addContactNumber}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Number
              </Button>
            </div>
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address" className="text-stone-700">
              Address
            </Label>
            <Input
              id="address"
              placeholder="Full address of the barangay hall"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="mt-1.5"
            />
          </div>

          {/* Sort Order and Status */}
          <div className="flex items-center gap-6">
            <div className="w-32">
              <Label htmlFor="sort_order" className="text-stone-700">
                Sort Order
              </Label>
              <Input
                id="sort_order"
                type="number"
                min={0}
                value={formData.sort_order}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sort_order: parseInt(e.target.value) || 0,
                  })
                }
                className="mt-1.5"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-stone-700">Active Status</Label>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Show in the public directory
                  </p>
                </div>
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_active: checked })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </FormDialog>
    </>
  );
}

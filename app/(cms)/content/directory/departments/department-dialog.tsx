"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";

import { FormDialog } from "@/components/cms/form-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { createDepartment, updateDepartment } from "@/lib/actions/directory";
import type { Database } from "@/types/supabase";

type Department = Database["public"]["Tables"]["departments"]["Row"];

interface DepartmentDialogProps {
  children: React.ReactNode;
  mode: "create" | "edit";
  department?: Department;
}

export function DepartmentDialog({ children, mode, department }: DepartmentDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: department?.name || "",
    head_name: department?.head_name || "",
    head_title: department?.head_title || "",
    description: department?.description || "",
    email: department?.email || "",
    contact_numbers: department?.contact_numbers || [""],
    facebook_link: department?.facebook_link || "",
    office_location: department?.office_location || "",
    sort_order: department?.sort_order || 0,
    is_active: department?.is_active ?? true,
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
      toast.error("Department name is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const dataToSubmit = {
        ...formData,
        contact_numbers: formData.contact_numbers.filter((n) => n.trim() !== ""),
      };

      if (mode === "create") {
        const result = await createDepartment(dataToSubmit);
        if (result.success) {
          toast.success("Department created successfully");
          setOpen(false);
          setFormData({
            name: "",
            head_name: "",
            head_title: "",
            description: "",
            email: "",
            contact_numbers: [""],
            facebook_link: "",
            office_location: "",
            sort_order: 0,
            is_active: true,
          });
          router.refresh();
        } else {
          toast.error(result.error || "Failed to create department");
        }
      } else if (department) {
        const result = await updateDepartment(department.id, dataToSubmit);
        if (result.success) {
          toast.success("Department updated successfully");
          setOpen(false);
          router.refresh();
        } else {
          toast.error(result.error || "Failed to update department");
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
        title={mode === "create" ? "Add New Department" : "Edit Department"}
        description={
          mode === "create"
            ? "Create a new department entry for the directory."
            : "Update the department details."
        }
        onSubmit={handleSubmit}
        submitLabel={mode === "create" ? "Create Department" : "Save Changes"}
        isSubmitting={isSubmitting}
        size="lg"
      >
        <div className="space-y-5">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-stone-700">
              Department Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="e.g., Municipal Planning and Development Office"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1.5"
            />
          </div>

          {/* Head Info */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="head_name" className="text-stone-700">
                Department Head
              </Label>
              <Input
                id="head_name"
                placeholder="Full name"
                value={formData.head_name}
                onChange={(e) =>
                  setFormData({ ...formData, head_name: e.target.value })
                }
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="head_title" className="text-stone-700">
                Position/Title
              </Label>
              <Input
                id="head_title"
                placeholder="e.g., Municipal Planning Officer"
                value={formData.head_title}
                onChange={(e) =>
                  setFormData({ ...formData, head_title: e.target.value })
                }
                className="mt-1.5"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-stone-700">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Brief description of the department's functions..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={2}
              className="mt-1.5 resize-none"
            />
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
                placeholder="department@monkayo.gov.ph"
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
            <Label htmlFor="office_location" className="text-stone-700">
              Office Address
            </Label>
            <Input
              id="office_location"
              placeholder="Office location within the municipal hall"
              value={formData.office_location}
              onChange={(e) =>
                setFormData({ ...formData, office_location: e.target.value })
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

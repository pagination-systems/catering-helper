"use client";

import { PersonalInfoForm } from "./components/personal-info-form";
import { SecurityForm } from "./components/security-form";
import type { UpdatePasswordValues, UpdatePersonalInfoValues, UserProfile } from "./schemas/profile.schema";

const user: UserProfile = {
  id: "123",
  name: "John Doe",
  email: "john@example.com",
  role: "Admin",
  phone: "01712345678",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const Profile = () => {
  const handlePersonalInfoSubmit = async (data: UpdatePersonalInfoValues) => {
    console.log("Personal info submitted with data:", data);
  };

  const handleSecuritySubmit = async (data: UpdatePasswordValues) => {
    console.log("Security settings submitted with data:", data);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <PersonalInfoForm initialValues={user} onSubmit={handlePersonalInfoSubmit} />
      <SecurityForm onSubmit={handleSecuritySubmit} />
    </div>
  );
};

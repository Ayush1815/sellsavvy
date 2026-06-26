export interface AuditForm {
  name: string;
  email: string;
  business: string;
  platform: string[];
  otherPlatform: string;
  goal: string;
  phone?: string;
  companyUrl?: string;
  source?: string;
  description?: string;
}

export const initialAuditForm: AuditForm = {
  name: "",
  email: "",
  business: "",
  platform: [],
  otherPlatform: "",
  goal: "Improve marketplace sales",
  phone: "",
  companyUrl: "",
  description: "",
  website: "",
};

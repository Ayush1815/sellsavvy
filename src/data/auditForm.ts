export interface AuditForm {
  name: string;
  email: string;
  business: string;
  platform: string[];
  otherPlatform: string;
  monthlyRevenue: string;
  goal: string;
  phone: string;
  companyUrl: string;
  website: string;
}

export const initialAuditForm: AuditForm = {
  name: "",
  email: "",
  business: "",
  platform: [],
  otherPlatform: "",
  monthlyRevenue: "$10k - $50k",
  goal: "Improve marketplace sales",
  phone: "",
  companyUrl: "",
  website: "",
};

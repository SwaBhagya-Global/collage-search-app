import BASE_URL from "@/app/config/api";
import { getVisitorId } from "./visitors";

type TrackingAction =
  | "view_detail"
  | "apply_now"
  | "download_brochure"
  | "compare"
  | "remove_compare"
  | "search";

interface SearchFilters {
  searchText?: string;
  location?: string;
  category?: string;
  specialization?: string;
  type?: string;
  fees?: string;
  searchType?: string;
}

interface TrackActionParams {
  collegeId?: string;
  action: TrackingAction;
  searchFilters?: SearchFilters;
}

export const trackAction = async ({
  collegeId,
  action,
  searchFilters,
}: TrackActionParams): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    const visitorId = getVisitorId();

    await fetch(`${BASE_URL}/colleges/tracking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
      body: JSON.stringify({
        collegeId: collegeId || null,
        action,
        visitorId,
        searchFilters: action === "search" ? searchFilters : undefined,
      }),
    });
  } catch (error) {
    console.error("Tracking failed:", error);
  }
};
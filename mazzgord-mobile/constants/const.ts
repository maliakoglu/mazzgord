export const COOKIE_NAME = "app_session_id";
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;
export const AXIOS_TIMEOUT_MS = 30_000;
export const UNAUTHED_ERR_MSG = "Please login (10001)";
export const NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";


export const STATUS_LABELS: Record<string, string> = {
  pending: "Beklemede",
  reviewing: "İnceleniyor",
  in_progress: "Hazırlanıyor",
  completed: "Tamamlandı",
  delivered: "Teslim Edildi",
  cancelled: "İptal Edildi",
  paid: "Ödendi",
  awaiting_payment: "Ödeme Bekleniyor",
  refunded: "İade Edildi",
};

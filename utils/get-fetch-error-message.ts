import type { FetchError } from "ofetch";

export default function getFetchErrorMessage(error: FetchError) {
  return error.data?.statusMessage || error.statusMessage || "An Uknown Error Occurred.";
}

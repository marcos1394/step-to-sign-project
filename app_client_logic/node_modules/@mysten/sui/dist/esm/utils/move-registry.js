import { isValidSuiNSName } from "./suins.js";
const NAME_PATTERN = /^([a-z0-9]+(?:-[a-z0-9]+)*)$/;
const VERSION_REGEX = /^\d+$/;
const MAX_APP_SIZE = 64;
const NAME_SEPARATOR = "/";
const isValidNamedPackage = (name) => {
  const parts = name.split(NAME_SEPARATOR);
  if (parts.length < 2 || parts.length > 3) return false;
  const [org, app, version] = parts;
  if (version !== void 0 && !VERSION_REGEX.test(version)) return false;
  if (!isValidSuiNSName(org)) return false;
  return NAME_PATTERN.test(app) && app.length < MAX_APP_SIZE;
};
const isValidNamedType = (type) => {
  const splitType = type.split(/::|<|>|,/);
  for (const t of splitType) {
    if (t.includes(NAME_SEPARATOR) && !isValidNamedPackage(t)) return false;
  }
  return true;
};
export {
  isValidNamedPackage,
  isValidNamedType
};
//# sourceMappingURL=move-registry.js.map

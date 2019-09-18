export const displayNameFromId = (id?: string) => {
  if (!id) {
    return "";
  }
  let displayName = id[0].toUpperCase() + id.slice(1).toLowerCase();
  displayName = displayName.replace(/-/g, " ");

  return displayName;
};

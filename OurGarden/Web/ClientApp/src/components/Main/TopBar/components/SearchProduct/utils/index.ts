import { fetch } from "domain-task";

export const fetchProducts = async (search: string) => {
  const encodedSearch = encodeURIComponent(search);

  const result = await fetch(`/api/Search?search=${encodedSearch}`, {
    credentials: "same-origin",
    method: "GET",
  }).then((res: Response) => res.json());

  return result;
};

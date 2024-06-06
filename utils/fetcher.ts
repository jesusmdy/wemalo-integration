export const fetcher = async (url: string, init?: RequestInit) => {
  const res = await fetch(url, init)

  if (!res.ok) {
    throw new Error(res.status.toString())
  }

  return res.json()
}
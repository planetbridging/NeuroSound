export async function checkAuth(token) {
  if (!token) return null;
  //${process.env.NEXT_PUBLIC_API_URL}
  const response = await fetch(`/api/check-auth`, {
    headers: {
      Authorization: token,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data.username;
  }
  return null;
}

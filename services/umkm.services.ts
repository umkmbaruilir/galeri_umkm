export async function getUmkm() {
  const response =
    await fetch("/api/umkm");

  return response.json();
}

export async function getUmkmById(
  id: string
) {
  const response =
    await fetch(`/api/umkm/${id}`);

  return response.json();
}
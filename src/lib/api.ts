export async function getProducts() {
  const res = await fetch('https://fakestoreapi.com/products?limit=20'); // limit para não carregar tudo de uma vez
  if (!res.ok) throw new Error('Falha ao carregar produtos');
  return res.json();
}

export async function getProduct(id: number | string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error('Produto não encontrado');
  return res.json();
}
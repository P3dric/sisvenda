/* ===================================================================
   produtos.js
   -------------------------------------------------------------------
   Aqui ficam os dados "fixos" da loja (o nosso catálogo).
   Em um projeto real, isso viria de um banco de dados / API.
   Como o objetivo aqui é simular tudo no navegador, usamos um
   simples array de objetos JavaScript.
=================================================================== */

const PRODUTOS = [
  {
    id: 1,
    nome: "Fone de Ouvido Bluetooth",
    preco: 199.9,
    categoria: "Áudio",
    imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    nome: "blusa chaos",
    preco: 174.0,
    categoria: "blusa",
    imagem: "https://assets.grok.com/users/d1a5b1de-9d5b-40d5-afcd-b8eb5a0fb619/generated/6e8a3d21-6907-4a1f-9d61-e0f1eb99a5bf/image.jpg"
  },
  {
    id: 3,
    nome: "Tênis Esportivo",
    preco: 259.5,
    categoria: "Calçados",
    imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    nome: "Calça UrbanVibe",
    preco: 179.9,
    categoria: "Calça",
    imagem: "https://assets.grok.com/users/d1a5b1de-9d5b-40d5-afcd-b8eb5a0fb619/generated/c786cf8a-3f1f-4372-b785-41e4f8a563b4/image.jpg"
  },
  {
    id: 5,
    nome: "camisa UrbanVibe",
    preco: 120.0,
    categoria: "Camisa",
    imagem: "https://assets.grok.com/users/d1a5b1de-9d5b-40d5-afcd-b8eb5a0fb619/generated/603a0eff-bffc-42c8-aed6-bc2ce8ca5754/image.jpg"
  },
  {
    id: 6,
    nome: "blusa totalblack-UrbanVibe",
    preco: 129.9,
    categoria: "Blusa",
    imagem: "https://assets.grok.com/users/d1a5b1de-9d5b-40d5-afcd-b8eb5a0fb619/generated/1ee4a705-fc7d-4451-94a3-5d4bf63f60fd/image.jpg"
  }
];
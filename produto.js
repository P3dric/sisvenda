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
    nome: "Mochila para Notebook",
    preco: 179.9,
    categoria: "Acessórios",
    imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    nome: "Câmera Fotográfica Retrô",
    preco: 899.0,
    categoria: "Eletrônicos",
    imagem: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 6,
    nome: "Óculos de Sol",
    preco: 129.9,
    categoria: "Acessórios",
    imagem: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=60"
  }
];
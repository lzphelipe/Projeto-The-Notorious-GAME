CREATE TABLE public.categorias (
    id_categoria BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao VARCHAR(300) NOT NULL
);
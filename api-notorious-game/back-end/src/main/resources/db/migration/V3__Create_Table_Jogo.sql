CREATE TABLE public.jogos (
    id_jogo BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    desenvolvedora VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    url_imagem VARCHAR(500),
    id_categoria BIGINT NOT NULL,
    CONSTRAINT fk_jogo_categoria FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);
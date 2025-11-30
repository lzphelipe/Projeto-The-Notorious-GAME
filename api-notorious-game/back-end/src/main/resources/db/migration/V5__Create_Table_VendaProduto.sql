CREATE TABLE public.vendas_produtos (
    id_venda_produto BIGSERIAL PRIMARY KEY,
    preco_momento DECIMAL(10, 2) NOT NULL,
    id_venda BIGINT NOT NULL,
    id_jogo BIGINT NOT NULL,
    CONSTRAINT fk_item_venda FOREIGN KEY (id_venda) REFERENCES vendas(id_venda),
    CONSTRAINT fk_item_jogo FOREIGN KEY (id_jogo) REFERENCES jogos(id_jogo)
);
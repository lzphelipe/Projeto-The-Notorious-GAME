CREATE TABLE public.vendas (
    id_venda BIGSERIAL PRIMARY KEY,
    data_venda DATE NOT NULL,
    preco_total DECIMAL(10, 2) NOT NULL,
    status_venda VARCHAR(50) NOT NULL,
    id_usuario BIGINT NOT NULL,
    CONSTRAINT fk_venda_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);
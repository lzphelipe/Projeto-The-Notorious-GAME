--Inserir Usuários
--(Senha para todos clientes é "12345")
--(Senha para ADMIN é "0880")
INSERT INTO usuarios (nome, email, cpf, senha, perfil) VALUES
('Administrador Chefe', 'admin@notorious.com', '00000000000', '$2a$10$k3oaZ33eww7WIOVxnNHcQ.sxqY78pPc4iMUQ29tp.DUR9n3RDrzj.', 'ADMIN'),
('Sr. Cabeça de batata', 'potatoHead@gmail.com', '00100100100', '$2a$10$NF3zms7i8qOsUeGczNjU/elpjwl.tChnB1kA37S9MFgANNkkOWCSG', 'CLIENTE'),
('Rayquaza', 'rayquaza17@gmail.com', '00700700717', '$2a$10$2hUS3BdTSorKA4u7bc6AVeva5AfIpGOIiKIIzNQ8l3/NfV3RRn7Ae', 'CLIENTE'),
('Batman', 'murcego@gmail.com', '00300300313', '$2a$10$bJhUNba1FjFleKuWEzHZCebSvSA2kvPDbtb.BKkFY5QnbISaEjxVm', 'CLIENTE'),
('Dart Vander', 'anakin@gmail.com', '00600600616', '$2a$10$LPx/Nnh.pmZFh1nLMJvGMe1HpIjH7ZxufxgcowQeyLE3DvcUef8h2', 'CLIENTE');



--Inserir Categorias
INSERT INTO categorias (nome, descricao) VALUES
('RPG', 'Jogos de interpretação de papéis com foco em história e evolução de personagem.'),
('Ação', 'Jogos com foco em reflexos, precisão e combate.'),
('Esporte', 'Simuladores de esportes reais ou fictícios.'),
('Terror', 'Jogos focados em causar medo e tensão no jogador.');

--Inserir Jogos
INSERT INTO jogos (nome, desenvolvedora, preco, url_imagem, id_categoria) VALUES
('Cyberpunk 2077', 'CD Projekt Red', 199.90, 'https://upload.wikimedia.org/wikipedia/pt/f/f7/Cyberpunk_2077_capa.png', 1),
('The Witcher 3', 'CD Projekt Red', 89.90, 'https://upload.wikimedia.org/wikipedia/pt/0/06/TW3_Wild_Hunt.png', 1),
('Grand Theft Auto V', 'Rockstar Games', 69.90, 'https://upload.wikimedia.org/wikipedia/pt/8/80/Grand_Theft_Auto_V_capa.png', 2),
('EA FC 24', 'EA Sports', 299.90, 'https://preview.redd.it/easportsfc-24-official-cover-v0-8d71oqtiurbb1.png?auto=webp&s=d9afa3e4b74ba75768172effbba6786a6d67bd07', 3),
('Resident Evil 4', 'Capcom', 159.00, 'https://upload.wikimedia.org/wikipedia/pt/3/30/Resident_Evil_4_%28remake%29.png', 4);
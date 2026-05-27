#Permite criar um database
create database db_filmes_20261_b;

#Permite visualizar todos os databases existentes
show databases;

#Permite escolher o database a ser utilizado
use db_filmes_20261_b;

#Permite visualizar todas as tabelas existentes dentro do database
show tables;

create table tbl_filme (
	id 					int not null auto_increment primary key,
    nome				varchar(80) not null,
    sinopse 			text not null, 
    capa 				varchar(255) not null,
    data_lancamento 	date not null,
    duracao 			time not null,
    valor 				decimal (5,2) default 0,
    avaliacao 			decimal(3,2) default null
);

#drop table tbl_filmes;
#drop database db_filmes_20261_b;

insert into tbl_filme (
	nome,
    sinopse,
    capa,
    data_lancamento,
    duracao,
    valor,
    avaliacao
) values (
	'Super Mario Galaxy: O Filme',
    'Uma nova aventura leva Mario a enfrentar um inédito e ameaçador super vilão. Em Super Mario Galaxy: O Filme, o bigodudo encanador italiano e seus aliados embarcam numa aventura galáctica repleta de ação e momentos emocionantes depois de salvar o Reino dos Cogumelos.',
    'https://br.web.img3.acsta.net/c_310_420/img/5b/ea/5bea1aeac3323aeaaf82449a34fafbbf.jpg',
    '2026-04-02',
    '01:39:00',
    '50.60',
    '3'
);

select * from tbl_filme order by id desc;
select * from tbl_filme where id = 1;

delete from tbl_filme where id > 10;

update tbl_filme set
	nome = 'Filme 01 - teste de atualização',
    sinopse = 'Testando a atualização do Filme',
    capa = 'teste',
    data_lancamento = '2026-04-29',
    duracao = '02:30:00',
    valor = '10',
    avaliacao = '2'
where id = 7;

create table tbl_classificacao (
	id 					int not null auto_increment primary key,
    classificacao				varchar(3) not null
);


insert into tbl_classificacao (
	classificacao
) values (
	'L'
);

#drop table tbl_classificacao;

select * from tbl_classificacao order by id desc;
select * from tbl_classificacao where id = 3;

create table tbl_genero (
	id 					int not null auto_increment primary key,
    genero				varchar(30) not null
);

insert into tbl_genero (
	genero
) values (
	'Ação'
);

select * from tbl_genero order by id desc;

create table tbl_nacionalidade (
	id 					int not null auto_increment primary key,
    nacionalidade				varchar(30) not null
);


insert into tbl_nacionalidade (
	nacionalidade
) values (
	'Francês'
);

select * from tbl_nacionalidade order by id desc;

delete from tbl_filme;
select * from tbl_filme;

alter table tbl_filme
	add column id_classificacao int not null,
    add constraint FK_CLASSIFICACAO_FILME
		foreign key (id_classificacao)
        references tbl_classificacao(id);
        
desc tbl_filme;

create table tbl_sexo (
	id 					int not null auto_increment primary key,
    sexo				varchar(15) not null
);

insert into tbl_sexo (
	sexo
) values (
	'Masculino'
);



#Ator

select * from tbl_ator;

create table tbl_ator (
	id 					int not null auto_increment primary key,
    nome				varchar(50) not null,
    data_nascimento     date not null,
    biografia           text not null,
    imagem     			varchar(255) not null
);

insert into tbl_ator (
	nome,
    data_nascimento,
    biografia,
    imagem,
    id_sexo
) values (
	'Kenedy',
    '2008-08-08',
    'É um grande ator que interpertrou diversos filmes famosos, sendo muito talentoso',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD9p3hKgCQxpgtPKC1HCnSccGyBtZobbrXcg&s',
    1
);

alter table tbl_ator
	add column id_sexo int not null,
    add constraint FK_SEXO_ATOR
		foreign key (id_sexo)
        references tbl_sexo(id);
        
        
create table tbl_filme_genero(
	id int not null auto_increment primary key,
    id_filme int not null,
    id_genero int not null,
    
    constraint FK_FILME_FILMEGENERO
    foreign key (id_filme)
    references tbl_filme(id),

	constraint FK_GENERO_GENERO
    foreign key (id_genero)
    references tbl_genero(id)
);


        
        
select * from tbl_filme_genero;
select * from tbl_filme
        







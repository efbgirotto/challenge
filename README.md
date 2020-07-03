# Challenge

## Requisitos

- **[Docker][1]** versão `19.03.x`
- **[Docker Compose][2]** versão `1.26.x`
- **[Node.js][3]** versão `12.16.x` para desenvolvimento

## Preparando e Executando a Aplicação

Em um terminal inicie a aplicação que contém o endpoint para verificação
de senhas.

```bash
docker-compose up challenge
```
Isso irá fazer o _build_ da imagem caso ela ainda não exista e irá iniciar
o servidor para que o endpoint fique disponível.

Em um segundo terminal faça requisições ao endpoint `/check-password` para
verificar seu funcionamento.

```bash
curl 'http://localhost:3000/check-password' \
  -H 'Content-Type: application/json' \
  -d '{ "password": "W74@a7V0ach!^c8$" }'
```

## Testes Automatizados

Os testes automatizados serão executados utilizando a imagem base que 
também foi utilizada na preparação da aplicação. Isso garante que os
testes estarão sendo feitos na mesma base de código da imagem final.

Em um terminal execute:

```bash
docker-compose run challenge-tests
```

## Design

O objetivo foi criar uma aplicação modularizada em serviços e componentes
onde eles pudessem ter contextos completamente independentes. Foi escolhido
um framework que possui uma arquitetura de plugins e que é simples o 
suficiente para que o foco seja a modularização e não o framework.

Foi implementado o serviço principal de password e também um de healthcheck
apenas para demonstrar essa capacidade de modularição dos serviços.

O destaque principal está no serviço password que faz uso do componente de 
validação. Nesse componente de validação foi adotado o padrão Decorator, 
pois ele permite que novas regras de validação possam ser criadas, testadas
e ativadas de forma bem isolada afim de evitar conflitos em regras 
existentes e tenha uma manutenção simples.

_Nota_: Foi assumido que "caracteres especiais" são os mesmos definidos 
pela OWASP Foundation no artigo [Password Special Characters][4].

[1]: https://docs.docker.com/engine/install/
[2]: https://docs.docker.com/compose/install/
[3]: https://nodejs.org/en/download/
[4]: https://owasp.org/www-community/password-special-characters
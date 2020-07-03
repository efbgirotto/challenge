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

[1]: https://docs.docker.com/engine/install/
[2]: https://docs.docker.com/compose/install/
[3]: https://nodejs.org/en/download/

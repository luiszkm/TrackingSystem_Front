
# Front end TrackingSystem
#### Gerenciamento de rotas

## Funcionalidades

- Cadastro e gerenciamento de rotas.
- Integração com a API do Google Maps para renderizar o mapa e o trajeto.
- Listagem de rotas disponíveis para motoristas.
- Acompanhamento das rotas pelos administradores.

## Pré-requisitos
- key Google maps :[docs](https://console.cloud.google.com/apis/library/maps-backend.googleapis.com?project=dulcet-fuze-396315)

- Docker: [Instalação](https://docs.docker.com/get-docker/)
- Docker Compose: [Instalação](https://docs.docker.com/compose/install/)

## Instalação

1. Clone este repositório:
```bash
git clone https://github.com/luiszkm/TrackingSystem_Front.git
cd TrackingSystem_Server
```
2. Configure as variáveis de ambiente:
Renomeie o arquivo .env.example para .env e preencha as variáveis de acordo com as suas configurações.

3. Execute o comando:
```bash
docker compose up
```
## Projetos que consomem essa aplição
- Microserviço Golang :[Github](https://github.com/luiszkm/microservices_GO)
- Front-end Next: [Github](https://github.com/luiszkm/TrackingSystem_Server)


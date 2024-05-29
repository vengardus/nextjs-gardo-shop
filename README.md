# Proyecto GardoShop

## Descripción

E-commerce demo usando: nextJs-14, tailwind, typescript, prisma, authjs, docker, postgres

### Paquetes utilizados

```bash
pnpm add react-icons --save
pnpm add zustand
pnpm add clsx
```

## Correr en dev

1. Clonar repostorio

2. Copiar el archivo .env.template => renombrarlo a .env y cambiar las variables de entorno

3. Instalar dependencias

    ```bash
    pnpm install 
    ```

4. Levantar la base de datos

    ```bash
    sudo docker compose up -d

5. Correr las migraciones de prisma

    ```bash
    pnpm exec prisma migrate dev
    ```

6. Correr proyecto

    ```bash
    pnpm run dev
    ```

## Correr en prod

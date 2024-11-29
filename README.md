# Prueba Técnica para Desarrollador Fullstack Senior

## Ejecución del proyecto
para ejecutar el proyecto en local, lo primero que se debe ejecutar es el comando "npm i" , para instalar los módulos.

Se debe iniciar la migración de la base de datos, para esto usamos el cli del orm Prisma, entonces debemos ejecutar el siguiente comando: 

#### npx migrate dev --name init

con esto ya tendremos creadas nuestras tablas migradas.

Ahora ejecutamos "npm run dev" para ejecutar el proyecto en ambiente de desarrollo y ya está en ejecución el proyecto en http://localhost:3000

## Despliegue en vercel

De la forma que este proyecto se desplegó en vercel fue hacer la integración de la cuenta de github en vercel y de forma automática vercel reconoce los repositorios de github, se seleccionó el proyecto, se configuraron las variables de entorno en vercel y ya quedó desplegado.

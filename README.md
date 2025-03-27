# GifsApp 

GifsApp es una aplicación web construida con Angular que permite a los usuarios buscar y visualizar GIFs animados de manera rápida y sencilla. Además, mantiene un historial de búsquedas utilizando localStorage y aprovecha el poder de Angular Signals para manejar el estado de la aplicación de manera eficiente.

### Características
- Búsqueda de GIFs en la API de Giphy.
- Tendencias: Explora los GIFs más populares del momento.
- Historial de búsquedas almacenado en localStorage.
-  Manejo de estado con Angular Signals.
-  Diseño masonry responsive adaptable a diferentes dispositivos.

###  Tecnologías utilizadas
- Angular 17+ con Signals.
- RxJS para manejo de streams de datos.
- TypeScript para tipado seguro.
- Giphy API para la obtención de GIFs.
- Tailwind CSS (opcional) para estilos modernos.
###  Instalación y configuración
1. Clona el repositorio: 
``` git clone https://github.com/joanvasquez21/gifsapp ```
2. Instala las dependencias: 
``` npm install ```
3. configura tu entorno:
- crea  un archivo src/environments/environment.ts con tu API Key de Giphy
```export const environment = {
  production: false,
  giphyApiKey: 'TU_API_KEY',
  giphyUrl: 'https://api.giphy.com/v1'
};
```

4. Ejecuta la aplicación en modo desarrollo :
```ng serve ```
### Adjunto imagenes:
![image](https://github.com/user-attachments/assets/9d1ee4db-02b0-4e79-9603-94feda3dbc60)
![image](https://github.com/user-attachments/assets/37dbeee6-8e28-4450-8112-907981000938)

# Marca de Agua

Agrega una marca de agua de texto a tu PDF o imagen en segundos. Gratis, sin cuenta y sin subir el archivo a ningún servidor.

Herramienta gratuita y de código abierto de [SonhoLab](https://sonholab.com). Corre **100 % en el navegador**: los archivos no se suben a ningún servidor.

> Licencia: **MIT** · Autor: Leandro Manuel Perez Montañana · Idiomas de la interfaz: español, inglés, francés, portugués (BR), alemán, hindi, indonesio y ruso.

## Qué hace

Antes de compartir un contrato en borrador, un book de fotos o un plano que todavía no está aprobado, conviene dejar claro que no es la versión final. Esta herramienta agrega un texto como Confidencial, Borrador o el nombre de tu empresa, repetido en diagonal sobre toda la página o la imagen, para que quede visible sin importar en qué parte la miren o intenten recortarla. Funciona tanto con archivos PDF como con imágenes JPG, PNG o WEBP, detectando el tipo de archivo automáticamente. Ajustas la opacidad y el tamaño de letra con controles simples y descargas el resultado. Todo ocurre en tu navegador: el archivo nunca se sube a ningún servidor.

**Cuándo te sirve:**

- Un freelance envía un contrato en borrador al cliente y lo marca como Borrador para que quede claro que todavía se puede corregir antes de la versión final, evitando confusiones si alguien lo reenvía sin querer.
- Un fotógrafo comparte las pruebas de una sesión con marca de agua para que el cliente las revise y elija sus favoritas sin poder usarlas hasta pagar y recibir el archivo limpio.
- Un agente inmobiliario marca los planos de una propiedad como Preliminar antes de que el proyecto reciba la aprobación final del cliente, dejando claro que las medidas todavía pueden cambiar.

## Cómo se usa

1. **Sube tu PDF o imagen.** Arrastra el archivo a la zona de carga o selecciónalo desde tu equipo. La herramienta detecta automáticamente si es un PDF o una imagen JPG, PNG o WEBP, y en unos segundos queda lista para que definas el texto de la marca.
2. **Escribe el texto y ajusta el estilo.** Escribe la palabra o frase que quieres repetir, como Confidencial, Borrador o el nombre de tu empresa, y mueve los controles de opacidad y tamaño de letra hasta que la marca se vea clara sin tapar por completo el contenido.
3. **Descarga el archivo marcado.** Presiona descargar y el PDF o la imagen con la marca de agua repetida en diagonal se guarda en tu equipo. El archivo original no se modifica, así que puedes probar distintos textos, tamaños y niveles de opacidad hasta encontrar el resultado que buscas.

## Qué necesita para funcionar

### Para instalarla y compilarla

- [Node.js](https://nodejs.org) 18 o superior (probado con Node 22) y npm.
- Conexión a internet **solo** durante `npm install`. Una vez compilada, la herramienta no pide nada a internet.

### Complementos específicos de esta herramienta

- **Ninguno.** No usa modelos, binarios ni servicios externos: todo está en el código y en dependencias normales de npm.

### En el navegador de quien la usa

- Cualquier navegador moderno (Chrome, Edge, Firefox, Safari). No necesita permisos especiales.

## Instalación

```bash
git clone https://github.com/nanoizax/herramienta-marca-agua.git
cd herramienta-marca-agua
npm install
npm run dev         # servidor de desarrollo en http://localhost:5173
```

Para publicarla:

```bash
npm run build       # genera la carpeta dist/
npm run preview     # probar la versión compilada
```

Esta herramienta **no tiene servidor propio**: todo ocurre en el navegador de quien la usa. Basta con publicar la carpeta `dist/` en cualquier hosting estático (GitHub Pages, Netlify, Cloudflare Pages, Nginx, Apache...).

## Cómo está organizado

```
src/pages/tools/   La página de la herramienta (interfaz y lógica de pantalla)
src/lib/tools/     La lógica de la herramienta, separada de la interfaz
src/components/    Piezas compartidas (zona de arrastre de archivos, botón)
src/locales/       Textos en 8 idiomas (esta herramienta solamente)
src/i18n.ts        Configuración de idiomas
```

## Cómo meterla en tu propia plataforma

1. **Como página aparte:** publica `dist/` en una ruta de tu sitio, por ejemplo `/herramientas/marca-agua/`. Si la sirves en una subcarpeta, define `base` en `vite.config.ts`.
2. **Dentro de tu aplicación React:** copia `src/pages/tools/*Page.tsx`, `src/lib/tools/` y `src/components/` a tu proyecto, instala las mismas dependencias de `package.json` y renderiza la página donde quieras.
3. **Con tu diseño:** el marco de la página (título, ayuda, preguntas frecuentes) está en `src/components/tools/ToolPageLayout.tsx` y es intencionalmente simple. Cámbialo por tu cabecera, tu pie y tus estilos; solo necesita pintar `children`.
4. **Con tu analítica:** `src/lib/hitCounter.ts` no hace nada. Si quieres medir el uso, conéctalo ahí a tu propia herramienta.

## Privacidad

Todo el procesamiento ocurre en el navegador. Esta copia no incluye analítica, cookies, contadores ni llamadas a ningún servidor propio. Los archivos del usuario no salen de su equipo.

## Preguntas frecuentes

**¿Puedo usar mi logo como marca de agua en lugar de texto?**  
No, por ahora la herramienta solo admite texto escrito, como el nombre de tu empresa o una palabra como Confidencial. No permite subir una imagen o un logo para usarlo como marca, así que si necesitas ese logo estampado literalmente tendrías que combinarlo con otra herramienta de edición de imágenes. Si buscas algo más avanzado o automatizado, es un desarrollo aparte que podemos conversar.

**¿La marca de agua se pone una sola vez o se repite en toda la página?**  
Se repite en diagonal por toda la página o la imagen, en un patrón de mosaico, no como un sello único en una esquina. Esto la hace más difícil de recortar o tapar con otro elemento, pero también significa que cubre visualmente buena parte del documento, así que conviene ajustar bien la opacidad para que el contenido original siga siendo legible.

**¿Qué pasa con mi archivo al agregarle la marca de agua?**  
Nada sale de tu dispositivo. El PDF se procesa con la librería pdf-lib y la imagen con el Canvas del navegador, ambos directamente en tu equipo, así que el archivo nunca viaja a nuestros servidores ni a los de terceros.

**¿Funciona con imágenes JPG y PNG, o solo con PDF?**  
Funciona con ambos. Sube un PDF o una imagen en JPG, PNG o WEBP y la herramienta detecta automáticamente el tipo de archivo para aplicar la marca de agua de la forma correcta. Video no está soportado.

**¿Es gratis y necesito crear una cuenta?**  
Es gratis y no pide cuenta ni correo. Puedes marcar un archivo o veinte el mismo día, sin límite, porque todo el procesamiento corre en tu navegador y no consume ningún servidor nuestro.

## Licencia

Este proyecto se publica bajo la licencia **MIT**. El texto completo está en [LICENSE](LICENSE).

Las dependencias tienen sus propias licencias, listadas en [THIRD-PARTY.md](THIRD-PARTY.md).

## Más herramientas gratuitas

Esta es una de las herramientas gratuitas de SonhoLab. Encuentra el resto, cada una con su repositorio, en https://sonholab.com/es/herramientas.

---

Hecho por Leandro Manuel Perez Montañana.

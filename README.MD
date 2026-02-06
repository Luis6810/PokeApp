### Run app with expo
npm install
npm start

### Run app with development build
npm install
npm expo prebuild
npm start -d

### DTO from API
Para los modelos de la api fue usada la herramienta web https://app.quicktype.io/ para fácilmente creart los dto a partir de json


### Set Java Home
Para tener correcto el JAVA_HOME es necesario tener instalado Java 17, luego dependiendo del sistema operativo se establece de acuerdo a este:

En linux/mac
Abrir con editor de texto el archivo ~/.bashrc que se carga cada vez que se abre una terminal.
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH

En Windows hay que abrir las Variables de entorno y agregar una variable JAVA_HOME con valor de la ruta de instalación de Java17. Al mismo tiempo hay que agregar %JAVA_HOME%\bin al path.

### Requerimientos
Node v24.12.0
openjdk 17.0.18 2026-01-20
npm 11.6.2

### Arquitectura

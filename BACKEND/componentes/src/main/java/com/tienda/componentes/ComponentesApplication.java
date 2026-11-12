/*

	Elementos integración BE - FE
	Java; Spring; Spring Boot;  API REST; MySQL - XAMPP; MySQL Workbench; Postma


Elemento        | Aplicación                                                                                                                                                 |
--------------- | --------------------------------------------------------------------------------------- 
Java            | Lenguaje de programación utilizado para desarrollar la lógica del Back End.                                                                                               |
Spring          | Framework de Java que facilita el desarrollo de aplicaciones, administrando componentes, 
                  dependencias y servicios.                                                               
Spring Boot     | Herramienta basada en Spring que simplifica la configuración y puesta en funcionamiento 
                  del Back End. Permite levantar un servidor rápidamente.                                 
API REST        | Mecanismo de comunicación entre Front End y Back End. Permite intercambiar información 
                  mediante solicitudes HTTP (GET, POST, PUT y DELETE), generalmente utilizando JSON.      
MySQL           | Sistema de gestión de bases de datos relacionales. Permite almacenar y consultar la 
                  información de la aplicación.                                                         
XAMPP           | Paquete que incluye herramientas para montar un entorno de servidor local. 
                  Incluye MySQL/MariaDB y Apache, entre otras herramientas.                            
MySQL Workbench | Herramienta visual para diseñar, administrar y consultar bases de datos MySQL.                                                                                            |
Postman         | Herramienta para probar las API REST, enviando solicitudes al Back End y verificando las 
                  respuestas que devuelve.                                                         

Una aclaración importante: XAMPP y MySQL Workbench no son imprescindibles para trabajar con Spring Boot.
XAMPP es una alternativa para disponer de un servidor de base de datos local, mientras que Workbench es
una herramienta de administración visual.

2. ¿Cómo se relacionan para conectar Front End y Back End?

La arquitectura básica sería la siguiente:

FRONT END
	Interfaz visual del usuario
		HTML · CSS · JavaScript · React / Angular / Vue
	
	Solicitudes y respuestas
		HTTP / JSON

API REST BACK END
	Java + Spring + Spring Boot
	Recibe solicitudes, procesa la lógica y devuelve respuestas

	Conexión a la base de datos

BASE DE DATOS
	MySQL
	Almacena y proporciona la información

MySQL Workbench
	Administra y visualiza la base de datos

Postman
	Prueba las API REST del Back End

Workbench y Postman son herramientas auxiliares, no componentes del flujo de ejecución de la aplicación.

Ejemplo práctico de funcionamiento

Otros componentes:

Componente                                       | Función                                                                                    |
------------------------------------------------ | ------------------------------------------------------------------------------------------ |
HTML, CSS y JavaScript                           | Tecnologías fundamentales para construir el Front End.                                     |
React, Angular o Vue                             | Frameworks o bibliotecas para desarrollar interfaces dinámicas.
                                                   Seleccionar uno       
Maven o Gradle                                   | Administradores de dependencias y herramientas de construcción 
                                                   del proyecto Java.          
Spring Data JPA / Hibernate                      | Facilitan la conexión entre Java y MySQL y permiten operar con 
                                                   los datos mediante objetos. 
JDBC Driver (MySQL Connector/J)                  | Permite que Java se comunique con MySQL.                                                   |
IDE (IntelliJ IDEA, Eclipse o Spring Tool Suite) | Entorno de desarrollo para escribir, ejecutar y depurar el 
												   código Java.                    
Git / GitHub                                     | Permiten controlar versiones del código y trabajar en equipo.                              |

*/



package com.tienda.componentes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ComponentesApplication {

	public static void main(String[] args) {
		SpringApplication.run(ComponentesApplication.class, args);
	}

}

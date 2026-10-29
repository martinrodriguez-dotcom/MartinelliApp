# Martinelli Autos — ERP

**Rama de trabajo:** `adaptacion-rivas-estructura-2026`.

Nueva version modular de Martinelli Autos basada en la estructura funcional de Rivas Auto. Se mantiene sin modificaciones la rama `main`, la imagen `icon.png` y el proyecto original de Martinelli.

## Firebase

El nuevo codigo utiliza exclusivamente `martinelliapp-40269`. No se copian automaticamente registros desde `rivasauto` ni desde `concecionaria-martinelli`. No reutilizar usuarios o credenciales de Rivas.

**Antes de publicar:** crear la base Firestore del proyecto nuevo y definir reglas de seguridad. La autenticación ya fue migrada a Firebase Authentication en esta rama. Configurar el primer usuario administrador y publicar las reglas antes de ingresar datos reales.

Una vez reforzada la autenticacion, crear o importar un usuario administrador autorizado en la base Martinelli. No incluir contraseñas ni secretos en GitHub. La nueva base puede estar vacia inicialmente; la interfaz no generara registros por si sola.

## Modulos

Flota, Caja, Ventas, CRM, Formularios, Personal, Facturacion, Estadisticas, Administracion, Respaldo y Recuperacion.

Los formularios ya no llevan precargados el domicilio ni la ciudad de Rivas: completar datos juridicos correctos de Martinelli antes de emitir un boleto.

## Respaldo local

Los respaldos se guardan localmente con seleccion de carpeta desde Chrome/Edge. El ZIP contiene colecciones Firestore, JSON y la caja en Excel/CSV. Los archivos de Martinelli tienen identificadores de formato separados de los de Rivas. Las restauraciones agregan solo registros faltantes y requieren una copia de seguridad previa.

Las copias programadas requieren navegador abierto, permisos de carpeta e Internet. No son tareas de Windows en segundo plano.

## Verificacion previa al despliegue

1. Validar reglas de Firestore y autenticacion con cuentas de prueba.
2. Comprobar que el proyecto Firebase sea `martinelliapp-40269` en la consola y la app.
3. Verificar flota, caja por usuario, movimientos, formularios, recibos y reportes.
4. Probar exportacion de respaldo y vista previa de recuperacion con datos de prueba.
5. Verificar logo y domicilios de Martinelli, responsive y cache PWA.
6. Publicar solo tras aprobar la integracion de la rama de prueba.

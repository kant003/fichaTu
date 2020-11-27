FichaTu

- acercade: info de la app
- configuration: cambia la conf del sistema
- login: login y logout
- menu:
- page-not-found
- prueba
- security-test

- user-detail:{P:id} datos basicos y fichaje de un usuario dado
  - user-enrollments:{I:uid} lista de matriculas de un usuario
    - enrollment-califications:{P:idEnrollment}  calificaciones de una matricula determinada
    - enrollment-sings:{P:idEnrollment} fichajes en un rango de fecha de una matricula determinada
    - enrollment-justifications: {P:idEnrollment}lista justificaciones de una matricula
      - enrollment-justifications-add-dialog: {IY:date,idEnrollment} dialogo para añadir justificacion a asignatura
      - enrollment-justification-show-file: {IY:idJustification,idEnrollment}  ver el documento(foto) asociado a la justificacion
  - user-sings:{P:idUser} los fichajes de un alumno dado (en todas sus matriculas)
  

- user-list: listado de todos los alumnos
  - user-enrollment-select-dialog:{IY: idAlumno} dialog para seleccionar la matricula del alumno
  - user-enrollments-edit:{P:idAlumno} gestionar las matriculas de un alumno

- subject-list: listado de asignaturas
  - subject-add-dialog: dialog add nueva asignatura
  - subject-sings:{P:idSubject} fichaje actuales de los alumnos en una asignatura
  - subject-order:{P:idSubject} orden de asignaturas
  - subject-califications:{P:idSubject} calificar a todos los alumnos en una asignatura 
    - user-enrollment-califications:{I:idEnrollment} Obtener los datos de una calificacion  
  - subject-schedules:{P:idSubject} horarios de la asignatura
    - subject-schedule-add-dialog:{IY:idSubject} add nuevo horario


#!/bin/bash

# Requisitos:
# - El formulario web debe estar desarrollado en HTML y contener los campos necesarios.
# - Se debe tener acceso a la API de Wolkvox para realizar solicitudes de inserción de datos.

# Configuración:
WOLKVOX_API_URL="https://crm.wolkvox.com/server/API/v2/custom/insert.php"
WOLKVOX_API_TOKEN="1234567889090"

# Función principal que realiza la inserción de datos en el CRM de Wolkvox.
function insert() {
    # Asegurarse de tener la URL del servidor Wolkvox y el token de acceso configurados correctamente.
    if [ -z "$WOLKVOX_API_URL" ] || [ -z "$WOLKVOX_API_TOKEN" ]; then
        echo "Error: Configuración incompleta. Verifique la URL del servidor y el token de acceso."
        exit 1
    fi

    # Ejemplo de solicitud a la API de Wolkvox (reemplazar con la lógica específica):
    curl -X POST -H "Wolkvox-Token: $WOLKVOX_API_TOKEN" -H "Content-Type: application/json" \
        -d '{
            "operation": "ccg-unisanitas",
            "wolkvox-token": "'"$WOLKVOX_API_TOKEN"'",
            "module": "leads",
            "fields": {
                "ID": "",
                "Etapa del ciclo de vida": "Aspirante",
                "Etapa detallada": "Sin gestion",
                "names": "John Doe",
                "Programa académico": "Medicina",
                "Telephone": "123456789",
                "WhatsApp": { "type": "telephone", "value": "987654321", "country": "CO", "code": "+57" },
                "City": "Bogotá",
                "Email": "john.doe@example.com",
                "Url": "https://example.com",
                "Terminos y condiciones": true,
                "Documento": "123456789",
                "Recibo": "REC123",
                "Profesión": "Médico",
                "Estado laboral": "Empleado",
                "Institución": "Unisanitas",
                "status": "Sin gestion",
                "Tipo de Lead": "Pauta",
                "PeriodoAcademico": "2024.1"
            }
        }' "$WOLKVOX_API_URL"

}

# Llamada a la función insert al enviar el formulario, por ejemplo.
insert

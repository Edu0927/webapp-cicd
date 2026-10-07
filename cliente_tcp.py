import socket
import json

HOST = "3.22.114.229"
PORT = 6061

def enviar_mensaje(mensaje):
    try:
        # Crear conexión TCP
        cliente = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

        cliente.connect((HOST, PORT))

        # Enviar mensaje
        cliente.sendall((mensaje + "\n").encode("utf-8"))

        # Recibir respuesta
        respuesta = cliente.recv(4096).decode("utf-8")

        cliente.close()

        return respuesta

    except ConnectionRefusedError:
        return "ERROR: No se pudo conectar al servidor TCP."

    except Exception as error:
        return f"ERROR: {error}"


while True:

    print("\n==============================")
    print("       CLIENTE TCP")
    print("==============================")
    print("1. Insertar producto")
    print("2. Obtener producto")
    print("3. Salir")
    print("==============================")

    opcion = input("Selecciona una opción: ")

    # INSERT
    if opcion == "1":

        print("\n--- INSERTAR PRODUCTO ---")

        nombre = input("Nombre: ")
        precio = float(input("Precio: "))
        categoria = int(input("ID de categoría: "))

        elemento = {
            "name": nombre,
            "price": precio,
            "categoryId": categoria
        }

        mensaje = "{insert:" + json.dumps(elemento) + "}"

        print("\nMensaje enviado:")
        print(mensaje)

        respuesta = enviar_mensaje(mensaje)

        print("\nRespuesta del servidor:")
        print(respuesta)


    # GET
    elif opcion == "2":

        print("\n--- OBTENER PRODUCTO ---")

        producto_id = input("ID del producto: ")

        mensaje = "{get:" + producto_id + "}"

        print("\nMensaje enviado:")
        print(mensaje)

        respuesta = enviar_mensaje(mensaje)

        print("\nRespuesta del servidor:")
        print(respuesta)


    # SALIR
    elif opcion == "3":

        print("\nCliente TCP cerrado.")
        break


    else:

        print("\nOpción no válida.")
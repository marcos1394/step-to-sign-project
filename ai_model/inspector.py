# Contenido para: inspector.py

import pkgutil
import importlib
import inspect
import pysui # El paquete que queremos inspeccionar

def inspect_package(package):
    """
    Recorre un paquete de Python e imprime sus módulos y su contenido público.
    """
    print(f"--- Inspeccionando el paquete: {package.__name__} ---")
    print(f"Ubicación: {package.__file__}")
    print("-" * 30)

    # Usamos walk_packages para encontrar todos los submódulos de forma recursiva
    for importer, modname, ispkg in pkgutil.walk_packages(path=package.__path__,
                                                          prefix=package.__name__ + '.',
                                                          onerror=lambda x: None):
        try:
            # Intentamos importar el módulo encontrado
            module = importlib.import_module(modname)
            print(f"\n✅ Módulo Encontrado: {modname}")
            
            # Buscamos clases y funciones públicas dentro del módulo
            found_items = False
            for name, obj in inspect.getmembers(module):
                if not name.startswith('_'): # Filtramos los elementos privados
                    if inspect.isclass(obj) or inspect.isfunction(obj):
                        # Solo mostramos si el objeto fue definido en ESTE módulo
                        if hasattr(obj, '__module__') and obj.__module__ == modname:
                            item_type = "Clase" if inspect.isclass(obj) else "Función"
                            print(f"    - {name} ({item_type})")
                            found_items = True
            
            if not found_items:
                print("    (Sin clases o funciones públicas definidas aquí)")

        except Exception as e:
            # Algunos módulos pueden fallar al importar, es normal en la inspección
            # print(f"No se pudo inspeccionar {modname}: {e}")
            pass

if __name__ == "__main__":
    inspect_package(pysui)
    print("\n--- Inspección Completa ---")
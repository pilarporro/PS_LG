class TipoNumero:
    Defectivo,Perfecto,Abundante  = range(-1,2,1)
    
    
def clasificaNumeros(numeros=[]):
    clasificaciones=[]

    for numero in numeros:
        clasificaciones.append(clasificaNumero(numero))
    
    return zip(numeros,clasificaciones)
    
    
def clasificaNumero(numero):
    sumaDivisores=calculaSumaDivisores(numero,1)
    if (sumaDivisores>numero):
        clasificacion=TipoNumero.Abundante
    elif (sumaDivisores<numero):
        clasificacion=TipoNumero.Defectivo 
    else:
        clasificacion=TipoNumero.Perfecto    
    return clasificacion


def calculaSumaDivisores(numero, divisor):
    suma=0
    if (divisor<=(numero/2)):
        if (numero%divisor==0):
            suma+=divisor
        suma+=calculaSumaDivisores(numero, divisor+1)
    return suma
    
print clasificaNumeros([3,6,8,12,14])